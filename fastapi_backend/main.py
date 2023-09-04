from database import get_debtor_infos, create_agreement
from utils import get_payment_conditions

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class DebtorInfos(BaseModel):
    total_debt_value: float
    condominium_name: str
    debtor_name: str
    debtor_cpf: str
    late_days: int

class PaymentCondition(BaseModel):
    max_installments: int
    min_entry_percent: float

class Agreement(BaseModel):
    entry: float
    installments: int

@app.get("/debtor/{debtor_cpf}/")
def fetch_debtor_infos(debtor_cpf: str):
    infos = get_debtor_infos(debtor_cpf)
    late_days = infos["mensalidadesAtrasadas"]
    total_debt = late_days * infos["valorMensalidade"]

    return DebtorInfos(
        condominium_name=infos["nomeCondominio"],
        total_debt_value=total_debt,
        debtor_name=infos["nome"],
        debtor_cpf=debtor_cpf,
        late_days=late_days,
    )

@app.get("/minimum/{debtor_cpf}/", response_model=PaymentCondition)
def fetch_payment_from_cpf(debtor_cpf: str):
    infos = get_debtor_infos(debtor_cpf)
    days = infos["mensalidadesAtrasadas"]
    value = infos["valorMensalidade"]
    conditions = get_payment_conditions(value, days)
    return PaymentCondition(**conditions)

@app.post("/agreement/{debtor_cpf}/")
def post_agreement(debtor_cpf: str, agreement: Agreement):
    entry = agreement.entry
    installments = agreement.installments
    return create_agreement(debtor_cpf, entry, installments)
