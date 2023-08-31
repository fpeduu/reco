from telebot import util, apihelper, TeleBot

# markups
agreement_redo_markup = util.quick_markup({
    "Sim": {"callback_data": "redo_sim"},
    "Não": {"callback_data": "redo_nao"}
})

installments_markup = util.quick_markup({
    "-": {"callback_data": "installments_decrease"},
    "+": {"callback_data": "installments_increase"},
    "confirmar": {"callback_data": "installments_confirmar"}
}, row_width=2)

entry_markup = util.quick_markup({
    "-100": {"callback_data": "entry_decrease_100"},
    "-10": {"callback_data": "entry_decrease_10"},
    "-1": {"callback_data": "entry_decrease_1"},
    "1+": {"callback_data": "entry_increase_1"},
    "10+": {"callback_data": "entry_increase_10"},
    "100+": {"callback_data": "entry_increase_100"},
    "confirmar": {"callback_data": "entry_confirmar"}
}, row_width=6)


# utility functions
def start_agreement(bot: TeleBot, chat_id, user_data):
    debt_value = user_data[chat_id]["agreement"]["total_value"]
    condominium_name = user_data[chat_id]["condominium"]["nome"]
    
    bot.send_message(chat_id,
        f"Identificamos que você possui uma dívida de R${debt_value:.2f} com o condomínio {condominium_name}.")
    
    get_agreement_entry(bot, chat_id, user_data)

def get_agreement_entry(bot: TeleBot, chat_id, user_data):
    current_entry = user_data[chat_id]["agreement"]["entry"]
    user_data[chat_id]["agreement"]["editing"] = True
    bot.send_message(chat_id,
        "Primeiro, edite o valor de entrada que você sugere pagar:")
    bot.send_message(chat_id, f"Valor de entrada: {current_entry:.2f}", reply_markup=entry_markup)
    
def get_agreement_installments(bot: TeleBot, chat_id, user_data):
    agreement_installments = user_data[chat_id]["agreement"]["installments"]
    user_data[chat_id]["agreement"]["editing"] = True
    bot.send_message(chat_id,
        "Agora, edite a quantidade de parcelas em que você sugere dividir o acordo:")
    bot.send_message(chat_id, f"Quantidade de parcelas: {agreement_installments}", reply_markup=installments_markup)

def decrease_entry(user_data, value, min_value):
    new_value = user_data["agreement"]["entry"] - value
    user_data["agreement"]["entry"] = max(min_value, new_value)

def increase_entry(user_data, value, max_value):
    new_value = user_data["agreement"]["entry"] + value
    user_data["agreement"]["entry"] = min(max_value, new_value)

def decrease_installments(user_data):
    new_value = user_data["agreement"]["installments"] - 1
    user_data["agreement"]["installments"] = max(1, new_value)

def increase_installments(user_data, max_value):
    new_value = user_data["agreement"]["installments"] + 1
    user_data["agreement"]["installments"] = min(max_value, new_value)

def send_entry_markup(bot: TeleBot, editing: bool, new_entry: float, chat_id: int, message_id: int, callback, *args):
    try:
        if editing:
            bot.edit_message_text(f"Valor de entrada: {new_entry:.2f}", chat_id, message_id, reply_markup=entry_markup)
        else:
            bot.edit_message_text(f"Valor de entrada: {new_entry:.2f}", chat_id, message_id)
            callback(*args)
    except apihelper.ApiTelegramException:
        pass

def send_installments_markup(bot: TeleBot, editing: bool, new_installments: int, chat_id: int, message_id: int, callback, *args):
    try:
        if editing:
            bot.edit_message_text(f"Quantidade de parcelas: {new_installments}", chat_id, message_id, reply_markup=installments_markup)
        else:
            bot.edit_message_text(f"Quantidade de parcelas: {new_installments}", chat_id, message_id)
            callback(*args)
    except apihelper.ApiTelegramException:
        pass

def send_agreement_redo_markup(bot: TeleBot, chat_id: int):
    try:
        bot.send_message(chat_id,
            "Você já possui um acordo em andamento. Deseja propor um novo acordo?", reply_markup=agreement_redo_markup)
    except apihelper.ApiTelegramException:
        pass