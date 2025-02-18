import unittest
from main import create_app
from config import TestConfig
from exts import db

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
            status_code = signup_response.status_code

            self.assertEqual(status_code, 201)

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
        pass

    def test_auth_delete(self):
        pass

#----------------------------------------------
#Prenotazioni Tests

    def get_all_prenotazioni(self):
        response = self.client.get('/prenotazie')
        print(response.json)

    def get_one_prenotazione(self):
        pass

    def modify_prenotazione(self):
        pass

    def delete_prenotazione(self):
        pass

#----------------------------------------------

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

if __name__ == "__main__":
    unittest.main()