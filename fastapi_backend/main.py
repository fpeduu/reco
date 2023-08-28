from utils import get_payment_conditions
from database import get_debtor_and_condominium

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PaymentCondition(BaseModel):
    entrada: int
    parcelamento: int

@app.get("/", response_model=PaymentCondition)
def get_payment_condition(value: float, days: int):
    conditions = get_payment_conditions(value, days)
    return PaymentCondition(**conditions)

@app.get("/items/{debtor_cpf}/", response_model=PaymentCondition)
def get_payment_from_cpf(debtor_cpf: str):
    devedor, condominio = get_debtor_and_condominium(debtor_cpf)
    value = condominio["valorMensalidade"]
    days = devedor["mensalidadesAtrasadas"]
    conditions = get_payment_conditions(value, days)
    return PaymentCondition(**conditions)
