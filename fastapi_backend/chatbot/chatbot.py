from chatbot.chatbot_utils import *
from database import get_debtor_and_condominium
from dotenv import load_dotenv
from pydantic import BaseModel
import os
import telebot
import httpx


load_dotenv()

# initial config
def get_chat_bot():
    config = {**os.environ}
    BOT_TOKEN = config["TELEGRAM_BOT_TOKEN"]
    return telebot.TeleBot(BOT_TOKEN)

bot = get_chat_bot()


# models
class UserAgreement(BaseModel):
    editing: bool
    installments: int
    entry: float
    total_value: float
    max_installments: int
    min_entry: float

class UserData(BaseModel):
    user: dict
    condominium: dict
    agreement: UserAgreement


# fectchs
SERVER_URL = os.environ["SERVER_URL"]

def fetch_user_conditions(debtor_cpf: str):
    response = httpx.get(f"{SERVER_URL}/items/{debtor_cpf}/")
    return response.json()

def fetch_user_agreement(debtor_cpf: str):
    if debtor_cpf == "0":
        return None
    
    return {
        "id": 1,
        "usuarioEmail": "abc@gmail.com",
        "cpfDevedor": debtor_cpf,
        "dataAcordo": "2021-10-10T00:00:00Z",
        "status": "EM ANÁLISE",
        "valor": 1560.43,
        "juros": 1,
        "diaPagamento": 5,
        "entrada": 0.3 * 1560.43,
        "qtdParcelas": 6,
        "descricao": "acordo 1",
    }

def update_user_agreement(user_data: dict):
    pass

# data
commands = {
    "help": "Mostra os comandos disponíveis",
    "start": "Inicia o bot",
    "acordo": "Inicia um novo acordo"
}

user_data = {}


# handlers

#start command handler
@bot.message_handler(commands=['start'])
def handle_start(message):
    bot.send_message(message.chat.id, f"Olá, {message.from_user.first_name}\nDigite /help para ver os comandos disponíveis.")


# help command handler
@bot.message_handler(commands=['help'])
def send_help(message):
    bot.send_message(message.chat.id,
        "Comandos disponíveis:\n" + "\n".join([f"/{command} - {description}" for command, description in commands.items()]))


# acordo command handlers
@bot.message_handler(commands=['acordo'])
# get the user cpf to start the agreement
def get_user_cpf(message):
    bot.send_message(message.chat.id, "Por favor, digite seu CPF:")
    bot.register_next_step_handler_by_chat_id(message.chat.id, get_user_conditions)

# get user conditions from the IA
def get_user_conditions(message):
    global user_data
    debtor_cpf = message.text

    if debtor_cpf == "cancelar":
        bot.send_message(message.chat.id, "Operação cancelada.")
        return

    try:
        user_conditions = fetch_user_conditions(debtor_cpf)
    except:
        bot.send_message(message.chat.id, "Não foi possível identificar o CPF informado. Por favor, tente novamente.")
        bot.register_next_step_handler_by_chat_id(message.chat.id, get_user_conditions)
        return
    
    debtor, condominium = get_debtor_and_condominium(debtor_cpf)
    get_agreement(user_data, message.chat.id, debtor, condominium, user_conditions)

# start the agreement
def get_agreement(user_data: dict, chat_id: int, debtor, condominium, user_conditions):
    user_data[chat_id] = UserData(
        user=debtor,
        condominium=condominium,
        agreement=UserAgreement(
            editing=False,
            installments=1,
            entry=0,
            total_value=0,
            max_installments=0,
            min_entry=0
        )
    ).model_dump()

    user_agreement = fetch_user_agreement(debtor["cpf"])
    if user_agreement is not None:
        min_entry = 0.01 * user_conditions["entrada"] * user_agreement["valor"]
        user_data[chat_id]["agreement"] = UserAgreement(
            editing=False,
            installments=min(user_agreement["qtdParcelas"], user_conditions["parcelamento"]),
            entry=max(user_agreement["entrada"], min_entry),
            total_value=user_agreement["valor"],
            max_installments=user_conditions["parcelamento"],
            min_entry=min_entry
        ).model_dump()
        send_agreement_redo_markup(bot, chat_id)
    else:
        debt_value = debtor["mensalidadesAtrasadas"] * condominium["valorMensalidade"]
        min_entry = 0.01 * user_conditions["entrada"] * debt_value
        user_data[chat_id]["agreement"] = UserAgreement(
            editing=True,
            installments=1,
            entry=min_entry,
            total_value=debt_value,
            max_installments=user_conditions["parcelamento"],
            min_entry=min_entry
        ).model_dump()
        start_agreement(bot, chat_id, user_data)

# end the agreement
def handle_user_agreement(chat_id):
    try:
        update_user_agreement(user_data[chat_id])
        bot.send_message(chat_id, f"""Acordo definido:
    Entrada:{user_data[chat_id]['agreement']['entry']:.2f}
    Parcelas:{user_data[chat_id]['agreement']['installments']}""")
    except Exception as e:
        print(e)


# redo agreement markup callback handler
@bot.callback_query_handler(func=lambda call: "redo" in call.data)
def handle_redo_agreement(call):
    global user_data

    match call.data:
        case "redo_sim":
            start_agreement(bot, call.message.chat.id, user_data)
        case "redo_nao":
            bot.send_message(call.message.chat.id, "Ok, então vamos continuar com o acordo atual.")


# entry markup callback handler
@bot.callback_query_handler(func=lambda call: "entry" in call.data)
def handle_entry(call):
    global user_data
    cur_user_data = user_data[call.message.chat.id]
    agreement_total = cur_user_data["agreement"]["total_value"]
    min_entry = cur_user_data["agreement"]["min_entry"]

    match call.data:
        case "entry_decrease_1":
            decrease_entry(cur_user_data, 1, min_entry)
        case "entry_decrease_10":
            decrease_entry(cur_user_data, 10, min_entry)
        case "entry_decrease_100":
            decrease_entry(cur_user_data, 100, min_entry)
        case "entry_increase_1":
            increase_entry(cur_user_data, 1, agreement_total)
        case "entry_increase_10":
            increase_entry(cur_user_data, 10, agreement_total)
        case "entry_increase_100":
            increase_entry(cur_user_data, 100, agreement_total)
        case "entry_confirmar":
            cur_user_data["agreement"]["editing"] = False

    new_entry = cur_user_data["agreement"]["entry"]
    editing = cur_user_data["agreement"]["editing"]

    send_entry_markup(bot, editing, new_entry, call.message.chat.id, call.message.message_id,
                        get_agreement_installments, bot, call.message.chat.id, user_data)


# installments markup callback handler
@bot.callback_query_handler(func=lambda call: "installments" in call.data)
def handle_installments(call):
    global user_data
    cur_user_data = user_data[call.message.chat.id]
    max_installments = cur_user_data["agreement"]["max_installments"]

    match call.data:
        case "installments_decrease":
            decrease_installments(cur_user_data)
        case "installments_increase":
            increase_installments(cur_user_data, max_installments)
        case "installments_confirmar":
            cur_user_data["agreement"]["editing"] = False

    new_installments = cur_user_data["agreement"]["installments"]
    editing = cur_user_data["agreement"]["editing"]

    send_installments_markup(bot, editing, new_installments, call.message.chat.id, call.message.message_id,
                            handle_user_agreement, call.message.chat.id)


# other messages handler
@bot.message_handler(func=lambda message: True)
def echo_all(message):
    bot.send_message(message.chat.id,
        "Sinto muito, não entendi o que você quis dizer. Tente digitar /help para ver os comandos disponíveis.")


# bot start
bot.infinity_polling()