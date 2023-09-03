from config import BOT_TOKEN, SITE_URL
from models import MemoryAgreement
from chatbot_utils import *
from messages import *
from api import *
import telebot

chats_memory: dict[str, MemoryAgreement] = dict()
bot = telebot.TeleBot(BOT_TOKEN)

@bot.message_handler(commands=['start'])
def handler_0_start_conversation(message):
    chat_id: int = message.chat.id

    debitor_cpf = extract_debitor_cpf(message.text)
    if debitor_cpf is None:
        return bot.send_message(chat_id, NO_CPF_MSG)

    infos = fetch_debitor_infos(debitor_cpf)
    if infos is None:
        return bot.send_message(chat_id, DEBTOR_NOT_FOUND_MSG)

    reply_msg = NEW_DEBTOR_INFOS_MSG.format(infos.debtor_name,
                                            infos.condominium_name,
                                            infos.total_debt_value,
                                            infos.late_days
                                            ).replace(",", ".")
    message_data = bot.send_message(chat_id, reply_msg, 
                                    reply_markup=start_redo_markup)

    message_id = message_data.json["message_id"]
    chats_memory[chat_id] = MemoryAgreement(**infos.model_dump(), 
                                            message_id=message_id)

@bot.callback_query_handler(func=lambda call: "start" in call.data)
def callback_1_fetch_minimum(call):
    global chats_memory

    chat_id: int = call.message.chat.id
    user_data = chats_memory.get(chat_id)
    if user_data is None: return bot.send_message(chat_id, ECHO_MSG)

    debtor_cpf = user_data.debtor_cpf
    response = fetch_debitor_minimum_limit(debtor_cpf)
    if response is None:
        return bot.answer_callback_query(call.id, ERROR_MSG)

    total_debt = user_data.total_debt_value
    user_data.max_installments = response.max_installments
    user_data.min_entry_percent = response.min_entry_percent / 100
    user_data.installments = int(response.max_installments / 2)
    user_data.entry = total_debt * user_data.min_entry_percent * 2

    message_id = user_data.message_id
    reply_msg = ASK_ENTRY_MSG.format(user_data.entry).replace(",", ".")
    bot.edit_message_text(reply_msg, chat_id, message_id, 
                          reply_markup=entry_markup)

@bot.callback_query_handler(func=lambda call: "entry" in call.data)
def callback_2_handle_entry(call):
    global chats_memory

    chat_id: int = call.message.chat.id
    user_data = chats_memory.get(chat_id)
    if user_data is None: return bot.send_message(chat_id, ECHO_MSG)

    entry = user_data.entry
    message_id = user_data.message_id
    agreement_total = user_data.total_debt_value
    min_entry = user_data.min_entry_percent * agreement_total

    if call.data == "entry_confirmar":
        max_installments = user_data.max_installments / 2
        reply_msg = ASK_INSTALLMENTS_MSG.format(int(max_installments))
        return bot.edit_message_text(reply_msg, chat_id, message_id,
                                     reply_markup=installments_markup)

    _, action, value = call.data.split("_")
    value = int(value) if action == "increase" else int(value) * -1

    new_entry = max(min(entry + value, agreement_total), min_entry)
    if new_entry == entry:
        return bot.answer_callback_query(call.id, MAX_LIMIT_MSG)

    user_data.entry = new_entry
    reply_msg = ASK_ENTRY_MSG.format(new_entry).replace(",", ".")
    bot.edit_message_text(reply_msg, chat_id, message_id, 
                          reply_markup=entry_markup)

@bot.callback_query_handler(func=lambda call: "installments" in call.data)
def callback_3_handle_installments(call):
    global chats_memory

    chat_id: int = call.message.chat.id
    user_data = chats_memory.get(chat_id)
    if user_data is None: return bot.send_message(chat_id, ECHO_MSG)

    message_id = user_data.message_id
    if call.data == "installments_confirmar":
        entry = user_data.entry
        installments = user_data.installments
        reply_msg = ASK_CONFIRMATION_MSG.format(entry, installments)
        return bot.edit_message_text(reply_msg, chat_id, message_id,
                                     reply_markup=confirmation_markup)

    if "increase" in call.data:
        new_installments = user_data.installments + 1
    else:
        new_installments = user_data.installments - 1

    max_installments = user_data.max_installments
    new_installments = max(1, min(new_installments, max_installments))
    if user_data.installments == new_installments:
        return bot.answer_callback_query(call.id, MAX_LIMIT_MSG)

    user_data.installments = new_installments
    reply_msg = ASK_INSTALLMENTS_MSG.format(new_installments)
    return bot.edit_message_text(reply_msg, chat_id, message_id,
                                 reply_markup=installments_markup)

@bot.callback_query_handler(func=lambda call: "confirmation" in call.data)
def callback_4_handle_confirmation(call):
    global chats_memory

    chat_id: int = call.message.chat.id
    user_data = chats_memory.get(chat_id)
    if user_data is None: return bot.send_message(chat_id, ECHO_MSG)

    entry = user_data.entry
    message_id = user_data.message_id
    installments = user_data.installments
    if call.data == "confirmation_yes":
        debtor_cpf = user_data.debtor_cpf
        post_agreement(debtor_cpf, entry, installments)

        url_link = f"{SITE_URL}/proposal/{debtor_cpf}/confirmation/"
        reply_markup = get_confirmation_markup(url_link)
        reply_msg = FINISH_AGREEMENT_MSG.format(url_link)
        return bot.edit_message_text(reply_msg, chat_id, message_id,
                                     reply_markup=reply_markup)

    return bot.edit_message_text(RETRY_AGREEMENT_MSG, chat_id, message_id,
                                 reply_markup=modification_markup)

@bot.callback_query_handler(func=lambda call: "modification" in call.data)
def callback_5_handle_modification(call):
    global chats_memory

    chat_id: int = call.message.chat.id
    user_data = chats_memory.get(chat_id)
    if user_data is None: return bot.send_message(chat_id, ECHO_MSG)

    entry = user_data.entry
    message_id = user_data.message_id
    installments = user_data.installments

    if call.data == "modification_entry":
        reply_msg = ASK_ENTRY_MSG.format(entry)
        return bot.edit_message_text(reply_msg, chat_id, message_id,
                                     reply_markup=start_redo_markup)
    
    elif call.data == "modification_installments":
        reply_msg = ASK_INSTALLMENTS_MSG.format(installments)
        return bot.edit_message_text(reply_msg, chat_id, message_id,
                                     reply_markup=installments_markup)
    
    reply_msg = ASK_CONFIRMATION_MSG.format(entry, installments)
    return bot.edit_message_text(reply_msg, chat_id, message_id,
                                 reply_markup=confirmation_markup)

@bot.message_handler(func=lambda message: True)
def echo_all(message):
    bot.send_message(message.chat.id, ECHO_MSG)

bot.infinity_polling()
