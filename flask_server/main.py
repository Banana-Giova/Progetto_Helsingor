from flask import Flask
from flask_restx import Api #type: ignore
from models import Moderatori, Prenotazioni
from exts import db
from flask_jwt_extended import JWTManager #type: ignore
from prenotazioni import preno_ns
from auth import auth_ns
from flask_cors import CORS #type: ignore

def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)

    CORS(app)
    db.init_app(app)
    JWTManager(app)

    api = Api(app, doc='/docs')
    api.add_namespace(preno_ns)
    api.add_namespace(auth_ns)

    return app