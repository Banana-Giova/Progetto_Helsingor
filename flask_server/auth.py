from flask_restx import Resource, Namespace, fields #type:ignore
from models import *
from flask import Flask, request, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required #type: ignore

auth_ns = Namespace('auth', description = "A namespace for our Authentication.")

moderatori_model = auth_ns.model(
    "Moderatori",
    {
        "username":fields.String(max_length=32),
        "email":fields.String(max_length=64),
        "password":fields.String(required=True, max_length=32)
    }
)

login_model = auth_ns.model(
    "Login",
    {
        "username":fields.String(max_length=32),
        "password":fields.String(required=True, max_length=32)
    }
)

@auth_ns.route('/moderatori', methods=['GET'])
class ModeratoriResource(Resource):
    
    @auth_ns.marshal_list_with(moderatori_model)
    @jwt_required()
    def get(self):
        #Get all the moderatori
        moderatori = Moderatori.query.all()
        return moderatori

@auth_ns.route('/moderatori/registrazione', methods=['POST'])
class ModeratoriResource(Resource):
    
    @auth_ns.expect(moderatori_model)
    def post(self):
        #Make a new moderatore
        data = request.get_json()
        
        user_check = Moderatori.query.filter_by(username=data.get('username')).first()
        if user_check:
            return jsonify({"message":f"Esiste già un moderatore chiamato {data.get('username')}!"})
        email_check = Moderatori.query.filter_by(email=data.get('email')).first()
        if email_check:
            return jsonify({"message":f"Esiste già un moderatore con {data.get('email')} come email assegnata!"})

        new_moderatore = Moderatori(
            username = data.get('username'),
            email = data.get('email'),
            password = generate_password_hash(data.get('password'))
        )
        new_moderatore.save()

        return make_response(jsonify(
            {"message":"Moderatore creato con successo!"}),
            201)
    
@auth_ns.route('/moderatori/accesso', methods=['POST'])
class ModeratoriResource(Resource):

    @auth_ns.expect(login_model)
    def post(self):
        #Sign-in for moderatori
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user_check = Moderatori.query.filter_by(username=username).first()

        if user_check and check_password_hash(user_check.password, password):
            access_token = create_access_token(identity = user_check.username)
            refresh_token = create_refresh_token(identity = user_check.username)
            
            return jsonify(
                {"message":"Login effettuato con successo!","access_token":access_token, "refresh_token":refresh_token}
            )
        elif user_check and not check_password_hash(user_check.password, password):
            return {"messagge":"Password errata!"}
        else:
            return {"messagge":"Login fallito."}
        
@auth_ns.route('/moderatori/<string:username>', methods=['GET', 'PUT', 'DELETE'])
class ModeratoriResource(Resource):

    @jwt_required()
    @auth_ns.marshal_with(moderatori_model)
    def get(self, username):
        #Get a moderatore by username
        moderatore = Moderatori.query.filter_by(username=username).first()
        if moderatore is None:
            return {'message': 'Moderatore non trovato'}, 404
        return moderatore

    @jwt_required()
    def put(self, username):
        #Update a moderatore by username
        up_moderatore:Moderatori = Moderatori.query.get_or_404(username)

        data = request.get_json()

        up_moderatore.update(
            password = generate_password_hash(data.get('password'))
            )
        
        return jsonify({"message":"Password aggiornata con successo!"})

    @jwt_required()
    def delete(self, username):
        #Delete a moderatore by username
        del_moderatore:Moderatori = Moderatori.query.get_or_404(username)

        del_moderatore.delete()
        return make_response(jsonify(
            {"message":"Moderatore eliminato con successo!"}),
            204)
    
    