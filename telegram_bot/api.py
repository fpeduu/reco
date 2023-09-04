from models import PaymentCondition, DebtorInfos
from dotenv import load_dotenv
import httpx, traceback
import os

load_dotenv()

SERVER_URL = os.environ["SERVER_URL"]

def fetch_debitor_infos(debtor_cpf: str) -> DebtorInfos:
    try:
        response = httpx.get(f"{SERVER_URL}/debtor/{debtor_cpf}/")
        return DebtorInfos(**response.json())
    except:
        traceback.print_exc()

def fetch_debitor_minimum_limit(debtor_cpf: str) -> PaymentCondition:
    try:
        response = httpx.get(f"{SERVER_URL}/minimum/{debtor_cpf}/")
        return PaymentCondition(**response.json())
    except:
        traceback.print_exc()

def post_agreement(debtor_cpf: str, entry: float, installments: int):
    try:
        response = httpx.post(f"{SERVER_URL}/agreement/{debtor_cpf}/",
            json = { "entry": entry, "installments": installments })
        return response.json()
    except:
        traceback.print_exc()
