from telebot import util

start_redo_markup = util.quick_markup({
    "Iniciar negociação": {"callback_data": "start_agreement"},
}, row_width=1)

confirmation_markup = util.quick_markup({
    "Sim": {"callback_data": "confirmation_yes"},
    "Não": {"callback_data": "confirmation_false"}
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

modification_markup = util.quick_markup({
    "Alterar entrada": {"callback_data": "modification_entry"},
    "Alterar parcelas": {"callback_data": "modification_installments"},
    "Confirmar Acordo": {"callback_data": "modification_confirmar"}
}, row_width=2)

def get_confirmation_markup(url_link: str):
    return util.quick_markup({
        "Fazer download": {
            "callback_data": "confirmation_download",
            "url": url_link
        }}, row_width=1)

def extract_debitor_cpf(text: str):
    """ Extracts the unique_code from the sent /start command. """
    return text.split()[1] if len(text.split()) > 1 else None
