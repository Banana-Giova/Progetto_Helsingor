import secrets
import sys

choice = input("1. Generazione nuova key\n2. Pulizia del file .env per push su GitHub\n0. Esci\n\n>>> ")

try:
    int(choice)
except Exception:
    sys.exit(0)

match int(choice):
    case 1:
        with open('flask_server/.env', mode='w') as writer:
            writer.write("SECRET_KEY = " + secrets.token_hex(12))
    case 2:
        with open('flask_server/.env', mode='w') as writer:
            writer.write("")
    case _:
        sys.exit(0)