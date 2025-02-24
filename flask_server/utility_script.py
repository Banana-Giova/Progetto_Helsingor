import secrets
import sys
import sqlite3
import json

choice = input("1. Generazione nuova secret key e generazione dei dati dell'enviroment di development\n2. Generazione nuova secret key e generazione dei dati dell'enviroment di produzione\n3. Conversione da database in SQLite3 a database in JSON, per il server Dev\n4. Conversione da database in SQLite3 a database in JSON, per il server Prod\n0. Esci\n\n>>> ")

def convert_db_to_json(db_path, json_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    
    data = {}
    for table_name in tables:
        table_name = table_name[0]
        cursor.execute(f"SELECT * FROM {table_name}")
        
        columns = [description[0] for description in cursor.description]
        
        rows = cursor.fetchall()
        
        data[table_name] = [dict(zip(columns, row)) for row in rows]
    
    with open(json_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)
    
    conn.close()
    print(f"Conversion completed to {json_path}")

try:
    int(choice)
except Exception:
    sys.exit(0)

match int(choice):
    case 1:
        with open('.env', mode='w') as writer:
            writer.write("SECRET_KEY=" + secrets.token_hex(12) + "\nSQLALCHEMY_TRACK_MODIFICATIONS=False\nFLASK_APP=run.py\nFLASK_ENV=development")
    case 2:
        with open('.env', mode='w') as writer:
            writer.write("SECRET_KEY=" + secrets.token_hex(12) + "\nSQLALCHEMY_TRACK_MODIFICATIONS=False\nFLASK_APP=run.py\nFLASK_ENV=production")
    case 3:
        convert_db_to_json("database/dev.db", "database/dev-database.json")
    case 4:
        convert_db_to_json("database/prod.db", "database/prod-database.json")
    case _:
        sys.exit(0)