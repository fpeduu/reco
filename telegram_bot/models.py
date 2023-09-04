from pydantic import BaseModel

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

class PaymentCondition(BaseModel):
    min_entry_percent: float = -1
    max_installments: int = -1

class DebtorInfos(BaseModel):
    total_debt_value: float
    condominium_name: str
    debtor_name: str
    debtor_cpf: str
    late_days: int

class MemoryAgreement(DebtorInfos, PaymentCondition):
    installments: int = 0
    entry: float = 0
    message_id: int
