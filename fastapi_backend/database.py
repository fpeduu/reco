from pymongo import MongoClient
from dotenv import load_dotenv
from faker import Faker
import os

def get_database():
    load_dotenv()
    config = {**os.environ}
    CONNECTION_STRING = config["MONGODB_URI"]
    client = MongoClient(CONNECTION_STRING)
    
    return client['reco']

def get_debtor_infos(debtor_cpf: str) -> dict:
    faker = Faker("pt_BR")

    return {
        "mensalidadesAtrasadas": faker.random_int(min=1, max=30),
        "valorMensalidade": faker.random_int(min=100, max=10000),
        "nomeCondominio": faker.company(),
        "nome": faker.name(),
    }

    database = get_database()
    debtors_collection = database["devedores"]
    condominiums_collection = database["condominios"]
    debtor = debtors_collection.find_one({ "cpf": debtor_cpf })
    condominium = condominiums_collection.find_one({
        "cnpj": debtor["cnpjCondominium"]
    })
    return {
        "mensalidadesAtrasadas": debtor["mensalidadesAtrasadas"],
        "valorMensalidade": condominium["valorMensalidade"],
        "nomeCondominio": condominium["nome"],
        "nome": debtor["nome"],
    }

def create_agreement(debtor_cpf: str, entry: float, installments: int):
    agreement = {
        "entrada": entry,
        "cpfDevedor": debtor_cpf,
        "parcelas": installments,
    }
    return agreement

    database = get_database()
    agreements_collection = database["acordos"]
    return agreements_collection.insert_one(agreement)