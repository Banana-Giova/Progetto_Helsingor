from flask import Flask, render_template, request, redirect, jsonify # type: ignore
from flask_restx import Api, Resource, fields #type: ignore
from config import *
from models import *
from exts import *
import json
import requests
from datetime import date
from flask_migrate import Migrate #type: ignore

app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)
migrate = Migrate(app,db)
api = Api(app, doc='/docs')

def load_refama():
    with open('references_and_mails.json', 'r') as f:
        return json.load(f)

def write_refama(dati):
    with open('references_and_mails.json', 'w') as f:
        json.dump(dati, f)

moderatori_model = api.model(
    "Moderatori",
    {
        "username":fields.String(max_length=32),
        "password":fields.String(required=True, max_length=32)
    }
)

prenotazioni_model = api.model(
    "Prenotazioni",
    {
        "id": fields.Integer(),
        "nominativo": fields.String(required=True, max_length=32),
        "email": fields.String(required=True, max_length=64),
        "telefono": fields.String(required=False, max_length=16),
        "posti_pren": fields.Integer(required=True),
        "posti_bimbi": fields.Integer(required=True),
        "via_mail": fields.Boolean(required=True),
        "donazioni": fields.String(required=False, max_length=64)
    }
)

@api.route('/moderatori', methods=['GET', 'POST'])
class ModeratoriResource(Resource):
    
    @api.marshal_list_with(moderatori_model)
    def get(self):
        #Get all the moderatori
        moderatori = Moderatori.query.all()
        return moderatori

    @api.marshal_with(moderatori_model)
    def post(self):
        #Make a new moderatore
        data = request.get_json()

        new_moderatore = Moderatori(
            username = data.get('username'),
            password = data.get('password')
        )
        new_moderatore.save()

        return new_moderatore, 201

@api.route('/moderatori/<string:username>', methods=['GET', 'PUT', 'DELETE'])
class ModeratoriResource(Resource):
    @api.marshal_with(moderatori_model)
    def get(self, username):
        #Get a moderatore by username
        moderatore = Moderatori.query.get_or_404(username)
        return moderatore

    @api.marshal_with(moderatori_model)
    def put(self, username):
        #Update a moderatore by username
        up_moderatore:Moderatori = Moderatori.query.get_or_404(username)

        data = request.get_json()

        up_moderatore.update(
            password = data.get('password'))
        
        return up_moderatore

    @api.marshal_with(moderatori_model)
    def delete(self, username):
        #Delete a moderatore by username
        del_moderatore:Moderatori = Moderatori.query.get_or_404(username)

        del_moderatore.delete()
        return del_moderatore

#Prenotazionie w/o ID
@api.route('/prenotazioni', methods=['GET', 'POST'])
class PrenotazioniResource(Resource):
    
    @api.marshal_list_with(prenotazioni_model)
    def get(self):
        #Get all the prenotazioni
        prenotazioni = Prenotazioni.query.all()
        return prenotazioni

    @api.marshal_with(prenotazioni_model)
    def post(self):
        #Make a new prenotazione
        #ONLY IF PRENOTAZIONI ARE DISPONIBILI
        data = request.get_json()
        
        new_prenotazione = Prenotazioni(
            nominativo = data.get('nominativo'),
            email = data.get('email'),
            telefono = data.get('telefono'),
            posti_pren = data.get('posti_pren'),
            posti_bimbi = data.get('posti_bimbi'),
            via_mail = data.get('via_mail'),
            donazioni = data.get('donazioni'),
        )
        new_prenotazione.save()
        
        #Implements JSON for referenti and mail
        refyes_refno = data.get('referente')
        referente = refyes_refno if refyes_refno != None and refyes_refno != "" else "Nessuno"
        mfyes_mfno = data.get('mail_future')
        mail_future = f"L'utente desidera mail in futuro, ecco la sua mail: '{new_prenotazione.email}'" if mfyes_mfno else "L'utente non desidera mail in futuro"

        references_and_mails = load_refama()
        references_and_mails[new_prenotazione.id] = (f"Referente di {new_prenotazione.nominativo} => {referente}", mail_future)
        write_refama(references_and_mails)

        return new_prenotazione, 201


#Prenotazioni with ID
@api.route('/prenotazioni/<int:id>', methods=['GET', 'PUT', 'DELETE'])
class PrenotazioniResource(Resource):

    @api.marshal_with(prenotazioni_model)
    def get(self, id):
        #Get a prenotazione by id
        prenotazione = Prenotazioni.query.get_or_404(id)
        return prenotazione

    @api.marshal_with(prenotazioni_model)
    def put(self, id):
        #Update a prenotazione by id
        up_prenotazione:Prenotazioni = Prenotazioni.query.get_or_404(id)

        data = request.get_json()

        up_prenotazione.update(
            email = data.get('email'),
            telefono = data.get('telefono'),
            posti_pren = data.get('posti_pren'),
            posti_bimbi = data.get('posti_bimbi'),
            via_mail = data.get('via_mail'),
            donazioni = data.get('donazioni'))
        
        refyes_refno = data.get('referente')
        referente = refyes_refno if refyes_refno != None and refyes_refno != "" else "Nessuno"
        mfyes_mfno = data.get('mail_future')
        mail_future = f"L'utente desidera mail in futuro, ecco la sua mail: '{up_prenotazione.email}'" if mfyes_mfno else "L'utente non desidera mail in futuro"

        references_and_mails = load_refama()
        references_and_mails[up_prenotazione.id] = (f"Referente di {up_prenotazione.nominativo} => {referente}", mail_future)
        write_refama(references_and_mails)

        return up_prenotazione

    @api.marshal_with(prenotazioni_model)
    def delete(self, id):
        #Delete a prenotazione by id
        del_prenotazione:Prenotazioni = Prenotazioni.query.get_or_404(id)

        del_prenotazione.delete()
        return del_prenotazione


    
@api.route('/', methods=['GET'])
class HelloResource(Resource):
    def get(self):
        return {"message":"Hello World"}



@app.shell_context_processor
def make_shell_context():
    return {
        "db":db,
        "Moderatori":Moderatori,
        "Prenotazioni":Prenotazioni
    }

#api run segment
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=6041)