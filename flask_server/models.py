from exts import db

class Prenotazione(db.Model):
    id = db.Column(db.Integer(), primary_key = True)
    cognome = db.Column(db.String(), nullable = False)
    posti_pren = db.Column(db.Integer(), nullable = False)

    def __repr__(self):
        return f"<Prenotazione id = {self.id}, cognome = {self.cognome}, posti prenotati = {self.posti_pren} >"
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, posti_pren):
        self.posti_pren = posti_pren