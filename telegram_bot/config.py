from dotenv import load_dotenv
import os

load_dotenv()

BOT_TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]
SERVER_URL = os.environ["SERVER_URL"]
SITE_URL = os.environ["SITE_URL"]

PORT = int(os.environ.get("PORT", 8443))
SECRET = os.environ.get("SECRET", "secret")
HEROKU_APP_NAME = os.environ["HEROKU_APP_NAME"]
