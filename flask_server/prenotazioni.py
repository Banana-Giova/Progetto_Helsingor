from flask_restx import Resource, Namespace, fields #type:ignore
from models import *
from methods import *
from datetime import datetime
from flask import Flask, request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required #type: ignore

preno_ns = Namespace('prenotazioni', description = "A namespace for our Prenotazioni.")

prenotazioni_model = preno_ns.model(
    "Prenotazioni",
    {
        "id": fields.Integer(),
        "nominativo": fields.String(required=True, max_length=32),
        "email": fields.String(required=True, max_length=64),
        "giorno_scelto": fields.String(required=True, max_length=32),
        "telefono": fields.String(required=False, max_length=16),
        "posti_pren": fields.Integer(required=True),
        "posti_bimbi": fields.Integer(required=True),
        "via_mail": fields.Boolean(required=True),
        "donazioni": fields.String(required=False, max_length=64),
        "referente": fields.String(required=False, max_length=64),
        "mail_future": fields.Boolean(required=True),
        "istante": fields.Integer(required=True)
    }
)

@preno_ns.route('/', methods=['GET', 'POST'])
class PrenotazioniResource(Resource):
    
    @jwt_required()
    @preno_ns.marshal_list_with(prenotazioni_model)
    def get(self):
        #Get all the prenotazioni
        prenotazioni = Prenotazioni.query.all()
        return prenotazioni

    @preno_ns.expect(prenotazioni_model)
    def post(self):
        data = request.get_json()
        
        new_prenotazione = Prenotazioni(
            nominativo = data.get('nominativo'),
            email = data.get('email'),
            giorno_scelto = data.get('giorno_scelto'),
            telefono = data.get('telefono'),
            posti_pren = data.get('posti_pren'),
            posti_bimbi = data.get('posti_bimbi'),
            via_mail = data.get('via_mail'),
            donazioni = data.get('donazioni'),
            istante = int(datetime.now().timestamp())
        )
        new_prenotazione.save()
        
        #Implements JSON for referenti and mail
        refyes_refno = data.get('referente')
        referente = f"Referente di {new_prenotazione.nominativo} => {refyes_refno if refyes_refno != None and refyes_refno != '' else 'Nessuno'}"
        mfyes_mfno = data.get('mail_future')
        mail_future = f"L'utente desidera mail in futuro, ecco la sua mail: '{new_prenotazione.email}'" if mfyes_mfno else "L'utente non desidera mail in futuro"


        references_and_mails = load_refama()
        references_and_mails[new_prenotazione.id] = (referente, mail_future)
        write_refama(references_and_mails)

        return make_response(jsonify({"message":"Prenotazione effettuata con successo!"}), 201)


#Prenotazioni with ID
@preno_ns.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
class PrenotazioniResource(Resource):

    @jwt_required()
    @preno_ns.marshal_with(prenotazioni_model)
    def get(self, id):
        #Get a prenotazione by id
        prenotazione = Prenotazioni.query.get_or_404(id)
        return prenotazione
    
    @jwt_required()
    def put(self, id):
        #Update a prenotazione by id
        up_prenotazione:Prenotazioni = Prenotazioni.query.get_or_404(id)

        data = request.get_json()

        up_prenotazione.update(
            email = data.get('email'),
            giorno_scelto = data.get('giorno_scelto'),
            telefono = data.get('telefono'),
            posti_pren = data.get('posti_pren'),
            posti_bimbi = data.get('posti_bimbi'),
            via_mail = data.get('via_mail'),
            donazioni = data.get('donazioni')
            )
        
        refyes_refno = data.get('referente')
        referente = f"Referente di {up_prenotazione.nominativo} => {refyes_refno if refyes_refno != None and refyes_refno != '' else 'Nessuno'}"
        mfyes_mfno = data.get('mail_future')
        mail_future = f"L'utente desidera mail in futuro, ecco la sua mail: '{up_prenotazione.email}'" if mfyes_mfno else "L'utente non desidera mail in futuro"

        references_and_mails = load_refama()
        references_and_mails[up_prenotazione.id] = (referente, mail_future)
        write_refama(references_and_mails)

        return jsonify({"message":"Prenotazione aggiornata con successo!"})

    @jwt_required()
    def delete(self, id):
        #Delete a prenotazione by id
        del_prenotazione:Prenotazioni = Prenotazioni.query.get_or_404(id)

        del_prenotazione.delete()
        return make_response(jsonify({"message":"Prenotazione eliminata con successo!"}), 204)

@preno_ns.route('/hello', methods=['GET'])
class HelloResource(Resource):
    def get(self):
        return {"message":"Hello World"}