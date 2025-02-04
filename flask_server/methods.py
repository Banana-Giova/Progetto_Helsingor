import json

def load_refama():
    with open('references_and_mails.json', 'r') as f:
        return json.load(f)

def write_refama(dati):
    with open('references_and_mails.json', 'w') as f:
        json.dump(dati, f)