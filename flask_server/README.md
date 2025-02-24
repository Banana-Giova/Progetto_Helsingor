# Server Flask per il Progetto Helsingor

Questo progetto è un server REST sviluppato in Flask, pensato per gestire il sito della compagnia teatrale. Il server espone API per gestire due entità principali: **Prenotazioni** e **Moderatori**.

---

## Indice

- [Introduzione](#introduzione)
- [Requisiti](#requisiti)
- [Installazione](#installazione)
- [Configurazione](#configurazione)
- [Setup del Database](#setup-del-database)
- [Esecuzione del Server](#esecuzione-del-server)
- [API REST](#api-rest)
- [Test e Debug](#test-e-debug)

---

## Introduzione

Il server Flask è stato sviluppato per fornire servizi RESTful che permettono la gestione delle **prenotazioni** per gli spettacoli e la gestione dei **moderatori** del sito. Utilizza **Flask-Restx** per documentare le API e **SQLAlchemy** per interagire con il database.

---

## Requisiti

- **Python 3.8+**
- **pip** per installare i pacchetti
- **virtualenv** per l'enviroment virtuale
- Un database (SQLite per sviluppo; PostgreSQL o MySQL in produzione)

---

## Installazione

1. **Clonare il repository:**

    Aprire in questa cartella (Esame_React_Helsingor/flask_server) un terminale ed incollare i seguenti comandi in bash:

   ```bash
   git clone https://github.com/Banana-Giova/Esame_React_Helsingor.git
   cd Esame_React_Helsingor
   ```

2. **Creare un ambiente virtuale (opzionale ma consigliato):**

    Aprire in questa cartella (Esame_React_Helsingor/flask_server) un terminale ed incollare i seguenti comandi in bash:

   ```bash
   virtualenv venv
   source venv/bin/activate
   ```

   > **Nota:**  Su Windows: ```venv\Scripts\activate```

3. **Installare le dipendenze:**

    Aprire in questa cartella `(Esame_React_Helsingor/flask_server)` un terminale ed incollare i seguenti comandi in bash:

   ```bash
   pip install -r requirements.txt
   ```

---

## Configurazione

1. **File delle variabili d'ambiente:**

    Per creare il file `.env` in modo semplice ed efficace è stato inserito uno script apposito in questa cartella chiamato `utility_script.py`. Tramite tale script è possibile creare il file `.env` sopracitato. 

    Crea un file chiamato `.env` nella root del progetto con il seguente contenuto (modifica i valori in base alle tue necessità):

    Aprire in questa cartella `(Esame_React_Helsingor/flask_server)` un terminale ed incollare i seguenti comandi in bash:

       ```bash
   python utility_script.py
   ```

2. **Sicurezza:**

   - Assicurati che il file `.env` sia incluso in `.gitignore` per evitare di caricare informazioni sensibili.

---

## Setup del Database

1. **Migrazioni:**

   Il progetto utilizza **Flask-Migrate** per gestire le migrazioni del database.

   - **Inizializza le migrazioni (solo la prima volta):**

     ```bash
     flask db init
     ```

   - **Genera la migrazione:**

     ```bash
     flask db migrate -m "Prima migrazione"
     ```

   - **Applica la migrazione:**

     ```bash
     flask db upgrade
     ```

    > **Nota:** In produzione è consigliabile utilizzare un database robusto (come PostgreSQL o MySQL) al posto di SQLite.

2. **Setup del JSON:**

   Il progetto per gestire i dati utilizza anche dei documenti in JSON. 

   - **Estrazione dati dal database:**

    Per estrarre i dati dal server di sviluppo o produzione, se in SQLite3 e se presenti nel file system, bisogna utilizzare `python utility_script.py`. Digitare in input il database che si vuole esportare.

     ```bash
     python utility_script.py
     ```

   - **Referenze e Mail:**

    Per gestire le referenze e le mail future il server utilizza un JSON per ragioni di modularità. Se non già presente creare un file in `/database` chiamato `references_and_mails.json`. Se non già presente inserire all'interno di tale file JSON una parantesi graffa aperta e chiusa, onde evitare eventuali errori di formattazione.

     ```json
     {

     }
     ```

Perfetto! Possiamo aggiungere una sezione nel README con i comandi da eseguire in **Flask Shell** per creare un moderatore iniziale.  

3. **Creazione di un Moderatore Iniziale**  

    Prima di poter accedere all'area moderatori, è necessario creare almeno un moderatore manualmente nel database, per ragioni di sicurezza. Per farlo, segui questi passaggi:  

    - **Avvia Flask Shell:**  

    ```bash
    flask shell
    ```

    - **Importa il modello e il database:**  

    ```python
    from models import Moderatori
    from exts import db
    from werkzeug.security import generate_password_hash

    ```

    - **Crea un moderatore:**  

    ```python
    nuovo_moderatore = Moderatori(
        username="admin",
        email="admin@example.com",
        password=generate_password_hash("password123")
    )
    db.session.add(nuovo_moderatore)
    db.session.commit()

    ```

    - **Verifica la creazione ed esci dallo Shell:**  

    ```python
    Moderatori.query.all()
    quit()

    ```

    Se tutto è andato a buon fine, dovresti vedere il moderatore appena creato.

    ```python
    [<Moderatore a nome 'admin'>]
    ```

    Ora puoi accedere con:  
    - **Username:** `admin`  
    - **Password:** `password123`  

    Una volta effettuato l'accesso, potrai generare i token JWT e gestire altri moderatori tramite API. Non appena sarà stato creato un altro moderatore sarà possibile eliminare questo moderatore necessario solo ad inizializzare il server.

---

## Esecuzione del Server

### Modalità Sviluppo

Per eseguire il server in modalità sviluppo, usa:

```bash
flask run --host=0.0.0.0 --port=3101
```

In questo modo, le modifiche al codice verranno ricaricate automaticamente e verranno visualizzati messaggi di debug.

### Modalità Produzione

Per eseguire il server in produzione, è consigliato usare un server WSGI come **Gunicorn**:``

1. **Avviare il server:**

   ```bash
   gunicorn -b 0.0.0.0:3101 run:app
   ```

---

## API REST

Il server espone le seguenti funzionalità tramite API REST:

- **Prenotazioni:**  
  Gestione delle prenotazioni per gli spettacoli.
  
  - **GET /prenotazioni/:** Recupera tutte le prenotazioni.
  - **POST /prenotazioni/:** Crea una nuova prenotazione.
  - **GET /prenotazioni/<id>:** Recupera una prenotazione.
  - **PUT /prenotazioni/<id>:** Aggiorna una prenotazione esistente.
  - **DELETE /prenotazioni/<id>:** Elimina una prenotazione.

- **Moderatori:**  
  Gestione degli account moderatore.  

  - **GET /auth/moderatori:** Recupera tutti i moderatori. *(Richiede autenticazione)*  
  - **POST /auth/moderatori/registrazione:** Registra un nuovo moderatore.  
  - **POST /auth/moderatori/accesso:** Effettua il login e restituisce i token di accesso.  
  - **GET /auth/moderatori/<username>:** Recupera i dettagli di un moderatore. *(Richiede autenticazione)*  
  - **PUT /auth/moderatori/<username>:** Aggiorna la password di un moderatore. *(Richiede autenticazione)*  
  - **DELETE /auth/moderatori/<username>:** Elimina un moderatore. *(Richiede autenticazione)*  
  - **POST /auth/refresh:** Genera un nuovo token di accesso usando il refresh token. *(Richiede autenticazione)*

> **Documentazione Interattiva:**  
> L'API è documentata in modo interattivo e può essere consultata all'indirizzo:  
> `http://<host>:3101/docs`

---

## Test e Debug

- **Test Manuale:** Utilizza strumenti come **Postman** o **Insomnia** per interagire con le API.
- **Test Automatico:** Il sistema è stato testato con dei test automatici compilati a mano, è possibile replicarli runnando il file `test.py`.
- **Log e Debug:**  
  In modalità sviluppo, il server mostra dettagli di log e messaggi di errore. In produzione, questi messaggi vengono limitati per motivi di sicurezza.