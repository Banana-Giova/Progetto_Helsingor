from main import create_app
from config import Config, DevConfig, ProdConfig, TestConfig
from models import Moderatori, Prenotazioni
from flask_migrate import Migrate #type: ignore
from exts import db

app = create_app(DevConfig)

@app.shell_context_processor
def make_shell_context():
    return {
        "db":db,
        "Moderatori":Moderatori,
        "Prenotazioni":Prenotazioni
    }
migrate = Migrate(app,db)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3101)