import os
from main import create_app
from config import DevConfig, ProdConfig
from models import Moderatori, Prenotazioni
from flask_migrate import Migrate
from exts import db

config_class = ProdConfig if os.getenv("FLASK_ENV") == "production" else DevConfig

app = create_app(config_class)

@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Moderatori": Moderatori,
        "Prenotazioni": Prenotazioni
    }

migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3101)
