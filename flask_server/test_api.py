import unittest
from main import create_app
from config import TestConfig
from exts import db
from werkzeug.security import generate_password_hash, check_password_hash

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client(self)

        with self.app.app_context():
            #db.init_app(self.app)
            db.create_all()

        with self.client:
            self.client.post(
            '/auth/moderatori/registrazione',
            json={"username": "test_uggine",
                  "email": "test_ardo@test.com",
                  "password": "Testamento30"}
            )
            login_response = self.client.post(
                '/auth/moderatori/accesso',
                json={"username": "test_uggine",
                      "password": "Testamento30"}
            )
            access_token = login_response.json['access_token']
            self.headers = {
                'Authorization': f'Bearer {access_token}'
            }

            self.client.post(
                '/prenotazioni/',
                json={
                    "id": 1,
                    "nominativo": "John Doe",
                    "email": "john.doe@example.com",
                    "giorno_scelto": "2023-04-10",
                    "telefono": "555-555-5555",
                    "posti_pren": 2,
                    "posti_bimbi": 0,
                    "via_mail": True,
                    "donazioni": None,
                    "istante": 1681142400  
                    }
            )


#----------------------------------------------
#Auth Moderatori Tests

    def test_signup(self):
        with self.client:
            signup_response = self.client.post(
                '/auth/moderatori/registrazione',
                json={"username": "test_halos",
                      "email": "test_ino@test.com",
                      "password": "Testaccio03"}
            )
            self.assertEqual(signup_response.status_code, 201)


    def test_login(self):
        login_response = self.client.post(
            '/auth/moderatori/accesso',
            json={"username": "test_uggine",
                  "password": "Testamento30"}
        )
        json:dict = login_response.json
        self.assertTrue(json.get('access_token'))


    def test_auth_get_all(self):
        self.client.post(
            '/auth/moderatori/registrazione',
            json={"username": "peppe",
                  "email": "bomber@test.com",
                  "password": "CAARK398"}
        )
        response = self.client.get('/auth/moderatori', headers=self.headers)
        self.assertEqual(response.json[1]['username'], 'peppe')


    def test_auth_get_one(self):
        response = self.client.get(
            '/auth/moderatori/test_uggine',
            headers=self.headers
        )
        self.assertEqual(response.json['email'], "test_ardo@test.com")


    def test_auth_put(self):
        self.client.put(
            '/auth/moderatori/test_uggine',
            headers=self.headers,
            json={"password":"bingus"}
        )
        response = self.client.get(
            '/auth/moderatori/test_uggine',
            headers=self.headers
        )
        self.assertTrue(check_password_hash(response.json['password'], 'bingus'))


    def test_auth_delete(self):
        self.client.post(
            '/auth/moderatori/registrazione',
            json={"username": "peppe",
                  "email": "bomber@test.com",
                  "password": "CAARK398"}
        )
        response = self.client.delete('/auth/moderatori/peppe', headers=self.headers)
        self.assertEqual(response.status_code, 204)

        

#----------------------------------------------
#Prenotazioni Tests

    def test_add_prenotazione(self):
        pren_response = self.client.post(
                '/prenotazioni/',
                json={
                    "id": 2,
                    "nominativo": "Jane Smith",
                    "email": "jane.smith@example.com",
                    "giorno_scelto": "2023-04-11",
                    "telefono": None,
                    "posti_pren": 2,
                    "posti_bimbi": 1,
                    "via_mail": False,
                    "donazioni": "5.00",
                    "istante": 1681228800
                    }
            )
        self.assertEqual(pren_response.status_code, 201)

    def test_get_all_prenotazioni(self):
        with self.client:
            response = self.client.get('/prenotazioni/',
                                       headers=self.headers)
            self.assertEqual(response.json[0]["email"], "john.doe@example.com")

    def test_get_one_prenotazione(self):
        with self.client:
            response = self.client.get('/prenotazioni/1',
                                       headers=self.headers)
            self.assertEqual(response.json["email"], "john.doe@example.com")
        

    def test_modify_prenotazione(self):
        with self.client:
            self.client.post(
                '/prenotazioni/',
                json={
                    "id": 2,
                    "nominativo": "Jane Smith",
                    "email": "jane.smith@example.com",
                    "giorno_scelto": "2023-04-11",
                    "telefono": None,
                    "posti_pren": 2,
                    "posti_bimbi": 1,
                    "via_mail": False,
                    "donazioni": "5.00",
                    "istante": 1681228800
                    }
            )
            self.client.put('/prenotazioni/2',
                                       json={
                                        "email": "jane.smith@example.com",
                                        "giorno_scelto": "2023-04-11",
                                        "telefono": None,
                                        "posti_pren": 3,
                                        "posti_bimbi": 1,
                                        "via_mail": True,
                                        "donazioni": "4.00"
                                       },
                                       headers=self.headers)
            response = self.client.get('/prenotazioni/2',
                                       headers=self.headers)
            self.assertEqual(response.json["via_mail"], True)

    def test_delete_prenotazione(self):
        self.client.post(
        '/prenotazioni/',
        json={
            "id": 2,
            "nominativo": "Jane Smith",
            "email": "jane.smith@example.com",
            "giorno_scelto": "2023-04-11",
            "telefono": None,
            "posti_pren": 2,
            "posti_bimbi": 1,
            "via_mail": False,
            "donazioni": "5.00",
            "istante": 1681228800
            }
        )
        delete_response = self.client.delete('/prenotazioni/2',
                            headers=self.headers)
        self.assertEqual(delete_response.status_code, 204)

            

#----------------------------------------------

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

if __name__ == "__main__":
    unittest.main()