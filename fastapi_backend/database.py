from pymongo import MongoClient
from dotenv import load_dotenv
import os

def get_database():
    load_dotenv()
    config = {**os.environ}
    CONNECTION_STRING = config["MONGODB_URI"]
    client = MongoClient(CONNECTION_STRING)
    
    return client['reco']

def get_debtor_and_condominium(debtor_cpf: str) -> tuple[dict, dict]:
    database = get_database()
    debtors_collection = database["devedores"]
    condominiums_collection = database["condominios"]
    debtor = debtors_collection.find_one({ "cpf": debtor_cpf })
    condominium = condominiums_collection.find_one({
        "cnpj": debtor["cnpjCondominium"]
    })
    return debtor, condominium
