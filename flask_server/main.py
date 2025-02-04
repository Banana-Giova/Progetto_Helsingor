from flask import Flask # type: ignore
from flask_restx import Api #type: ignore
from models import *
from exts import *
from methods import *
from flask_jwt_extended import JWTManager #type: ignore
from flask_migrate import Migrate #type: ignore
from prenotazioni import preno_ns
from auth import auth_ns

def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    migrate = Migrate(app,db)
    JWTManager(app)

    api = Api(app, doc='/docs')
    api.add_namespace(preno_ns)
    api.add_namespace(auth_ns)

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db":db,
            "Moderatori":Moderatori,
            "Prenotazioni":Prenotazioni
        }

    return app