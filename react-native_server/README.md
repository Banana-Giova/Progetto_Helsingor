# App Mobile - React Native

Questa è l'app mobile sviluppata con React Native, pensata per permettere ai moderatori di gestire le prenotazioni degli spettacoli teatrali e ai clienti di effettuare prenotazioni online tramite il loro dispositivo mobile.

## **Funzionalità principali**

- **Autenticazione Moderatori:** I moderatori possono accedere all'app utilizzando le loro credenziali (email e password) per avere accesso alle funzionalità riservate.
- **Gestione Prenotazioni:** I moderatori possono creare, modificare ed eliminare prenotazioni.
- **Elenco Spettacoli:** Visualizzazione degli spettacoli teatrali disponibili per la prenotazione.
- **Prenotazioni Cliente:** I clienti possono visualizzare gli spettacoli e fare prenotazioni direttamente dall'app.

## **Requisiti**

Per far funzionare questa applicazione, assicurati di avere le seguenti dipendenze installate sul tuo computer:

- **Node.js:**  
  Se non hai già Node.js, puoi scaricarlo e installarlo dal [sito ufficiale di Node.js](https://nodejs.org/). Assicurati di avere almeno la versione 14.x o superiore.
  
- **npm:**  
  npm è il gestore di pacchetti per Node.js, ed è incluso quando installi Node.js.

Se hai problemi con la versione di Node.js, puoi usare **nvm** (Node Version Manager), uno strumento che ti permette di gestire diverse versioni di Node.js. Per installarlo e utilizzarlo, esegui il comando:
```bash
nvm install node
```

## **Installazione**

Segui questi passaggi per preparare l'app sul tuo computer:

1. **Clonare il repository:**  
   Prima di tutto, clona il progetto dal repository GitHub nel tuo ambiente di sviluppo. Esegui i seguenti comandi:
   ```bash
   git clone <URL_REPOSITORY>
   cd <NOME_CARTELLA>
   ```

2. **Installare le dipendenze:**  
   Una volta entrato nella cartella del progetto, esegui il comando per installare tutte le librerie necessarie:
   ```bash
   npm install
   ```

3. **Avviare l'applicazione:**  
   Per avviare l'app in modalità sviluppo (per testarla nel tuo dispositivo o in un emulatore), esegui:
   ```bash
   npm start
   ```

   Questo avvierà il server di sviluppo, e vedrai delle opzioni per avviare l'app su **Android**, **iOS** o **Web**.

   - **Avvio su Android:**  
     Se stai usando un dispositivo Android o un emulatore, esegui:
     ```bash
     npm run android
     ```

   - **Avvio su iOS (Mac richiesto):**  
     Se hai un Mac, puoi avviare l'app su un emulatore iOS con:
     ```bash
     npm run ios
     ```

   - **Avvio su Web:**  
     Se preferisci testare l'app direttamente nel browser, puoi usare:
     ```bash
     npm run web
     ```

## **Configurazione**

1. **File di configurazione:**  
   L'app comunica con un server REST per ottenere dati come le prenotazioni e le credenziali dei moderatori. Per configurarla correttamente, crea un file `.env` nella cartella principale del progetto con il seguente contenuto:
   ```bash
   API_URL=http://<IP_SERVER>:3101
   ```
   Sostituisci `<IP_SERVER>` con l'indirizzo del server che gestisce il backend. Questo server è essenziale per l'applicazione, poiché gestisce tutte le prenotazioni e l'autenticazione.

## **Build e Deploy**

Se vuoi creare una versione finale dell'app per distribuirla sugli store (Google Play o App Store), esegui il seguente comando per creare una build:

- **Per Android:**  
  Esegui:
  ```bash
  eas build -p android
  ```
  Questo comando genererà il file APK o AAB da caricare su Google Play.

- **Per iOS (Mac richiesto):**  
  Esegui:
  ```bash
  eas build -p ios
  ```
  Questo comando genererà il file IPA da caricare su App Store. Nota che per fare il deploy su iOS è necessario avere un Mac.

## **Dipendenze principali**

Queste sono le librerie principali utilizzate nel progetto:

- **React Native**: 0.76.7 (la libreria principale per lo sviluppo dell'app mobile).
- **Expo**: 52.0.36 (una piattaforma per facilitare lo sviluppo di app React Native).
- **React Navigation**: 7.0.14 (per gestire la navigazione tra le schermate dell'app).
- **Axios**: Per fare richieste HTTP al server backend.

## **Note importanti**

- **Verifica il server API:**  
  L'app comunica con un server REST per gestire le prenotazioni e le credenziali. Assicurati che il server sia correttamente configurato e in esecuzione prima di avviare l'app.

- **Test su dispositivi reali:**  
  Se vuoi testare l'app su un dispositivo mobile reale, puoi utilizzare l'app **Expo Go** (disponibile su Android e iOS). Expo Go permette di eseguire il codice direttamente sul tuo dispositivo senza dover costruire una versione finale dell'app.

- **Assicurati di avere Node.js e Expo CLI:**  
  Per sviluppare e testare correttamente l'app, è importante che tu abbia installato sia **Node.js** che **Expo CLI**. Expo CLI è lo strumento che ti aiuta a gestire i progetti React Native con Expo.