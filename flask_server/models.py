from typing import *
from sqlalchemy import *
from sqlalchemy.orm import *
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from exts import *

class Base(DeclarativeBase):
    pass

class Moderatori(db.Model):
    __tablename__ = "Moderatori"
    
    username: Mapped[str] = mapped_column(db.String(32), primary_key=True)
    email: Mapped[str] = mapped_column(db.String(64), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(db.String(256), unique=True, nullable=False)

    def __repr__(self):
        return f"<Moderatore a nome {self.username!r}>"
    
    def _validate_password(self):
        if len(self.password) > 256:
            raise ValueError("La password non può superare i 256 caratteri.")

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e

    def update(self, password):
        self.password = password

        self._validate_password()

        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            raise e
        except Exception as e:
            db.session.rollback()
            raise e




class Prenotazioni(db.Model):
    __tablename__ = "Prenotazioni"

    id: Mapped[int] = mapped_column(primary_key=True)
    nominativo: Mapped[str] = mapped_column(db.String(32))
    email: Mapped[str] = mapped_column(db.String(64))
    giorno_scelto: Mapped[str] = mapped_column(db.String(32))
    telefono: Mapped[Optional[str]] = mapped_column(db.String(16), nullable=True)
    posti_pren: Mapped[int] = mapped_column(db.Integer, nullable=False)
    posti_bimbi: Mapped[int] = mapped_column(db.Integer, nullable=False)
    via_mail: Mapped[bool] = mapped_column(db.Boolean, nullable=False)
    donazioni: Mapped[Optional[str]] = mapped_column(db.String(64), nullable=True)
    istante: Mapped[int] = mapped_column(db.Integer, nullable=False)

    __table_args__ = (
        CheckConstraint('posti_pren > 0', name='check_positive_posti'),
        CheckConstraint('posti_bimbi < posti_pren', name='check_posti_bimbi_validity')
    )

    def __repr__(self):
        return f"<Prenotazione a ID = {self.id!r}, Nominativo = {self.nominativo!r}>"
    
    def _validate_nominativo(self):
        if len(self.nominativo) > 32:
            raise ValueError("Il nominativo non può superare i 32 caratteri.")
        
    def _validate_email(self):
        if len(self.email) > 64:
            raise ValueError("L'email non può superare i 64 caratteri.")
        
    def _validate_giorno_scelto(self):
        if len(self.giorno_scelto) > 32:
            raise ValueError("Il campo giorno scelto non può superare i 32 caratteri.")
        
    def _validate_telefono(self):
        if self.telefono and len(self.telefono) > 16:
            raise ValueError("Il telefono non può superare i 16 caratteri.")
        
    def _validate_donazioni(self):
        if self.donazioni and len(self.donazioni) > 64:
            raise ValueError("Le donazioni non possono superare i 64 caratteri.")
        
    def _validate_posti(self):
        if self.posti_bimbi >= self.posti_pren:
            raise ValueError("I posti per i bambini non possono essere superiori ai posti totali.")


    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e

    def update(self, email, giorno_scelto, telefono, posti_pren, posti_bimbi, via_mail, donazioni):
        self.email = email
        self.giorno_scelto = giorno_scelto
        self.telefono = telefono
        self.posti_pren = posti_pren
        self.posti_bimbi = posti_bimbi
        self.via_mail = via_mail
        self.donazioni = donazioni

        self._validate_nominativo()
        self._validate_email()
        self._validate_giorno_scelto()
        self._validate_telefono()
        self._validate_posti()
        self._validate_donazioni()

        try:
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()
            raise e
        except Exception as e:
            db.session.rollback()
            raise e