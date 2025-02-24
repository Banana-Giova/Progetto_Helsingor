# App Web - React Vite

Questa è l'app web sviluppata con React Vite per permettere ai moderatori di gestire le prenotazioni degli spettacoli teatrali e ai clienti di effettuare prenotazioni online. L'app è facile da configurare e da utilizzare anche per chi non ha molta esperienza con lo sviluppo web.

## **Funzionalità principali**

- **Autenticazione Moderatori:** I moderatori accedono con le proprie credenziali (email e password) per utilizzare le funzionalità riservate, come la gestione delle prenotazioni.
- **Gestione Prenotazioni:** I moderatori possono creare, modificare ed eliminare prenotazioni.
- **Elenco Spettacoli:** Visualizzazione degli spettacoli teatrali disponibili per la prenotazione.
- **Prenotazioni Cliente:** I clienti possono vedere gli spettacoli e fare prenotazioni, direttamente tramite l'interfaccia web.

## **Requisiti**

Per far funzionare questa applicazione, assicurati di avere le seguenti dipendenze installate sul tuo computer:

- **Node.js:**  
  Se non ce l'hai, puoi scaricarlo e installarlo dal [sito ufficiale di Node.js](https://nodejs.org/). Assicurati di avere almeno la versione 14.x o superiore.
  
- **npm:**  
  npm è il gestore di pacchetti per Node.js ed è solitamente incluso quando installi Node.js.

Se riscontri problemi con la versione di Node.js, puoi provare a usare **nvm** (Node Version Manager), uno strumento che ti permette di gestire diverse versioni di Node.js sullo stesso computer. Per installarlo, esegui:
```bash
nvm install node
```

## **Installazione**

Segui questi passaggi per preparare l'app sul tuo computer:

1. **Clonare il repository:**  
   Prima di tutto, devi clonare il progetto dal repository GitHub. Apri il terminale (o prompt dei comandi) e esegui:
   ```bash
   git clone <URL_REPOSITORY>
   cd <NOME_CARTELLA>
   ```

2. **Installare le dipendenze:**  
   Dopo essere entrato nella cartella del progetto, esegui il seguente comando per installare tutte le librerie necessarie:
   ```bash
   npm install
   ```
   Questo comando leggerà il file `package.json` e scaricherà tutte le dipendenze necessarie per far funzionare l'app.

3. **Avviare l'applicazione:**  
   Per avviare l'app in modalità sviluppo (così potrai vederla nel tuo browser), esegui:
   ```bash
   npm run dev
   ```

   Una volta che il server è avviato, l'app sarà visibile su [http://localhost:5173](http://localhost:5173). Se il browser non si apre automaticamente, apri questa URL nel tuo browser.

## **Configurazione**

1. **File di configurazione:**  
   L'app comunica con un server REST per ottenere dati come le prenotazioni. Per farlo, ha bisogno dell'indirizzo del server API. Devi creare un file di configurazione `.env` nella cartella principale del progetto.

   - Vai nella cartella principale del progetto e crea un file chiamato `.env`.
   - All'interno di questo file, aggiungi questa riga:
   ```bash
   VITE_API_URL=http://<IP_SERVER>:3101
   ```
   Sostituisci `<IP_SERVER>` con l'indirizzo del server che gestisce il backend (ad esempio, l'IP del server che gestisce le prenotazioni e i moderatori).

## **Build e Deploy**

Quando sei pronto a pubblicare l'app per gli utenti finali (ad esempio, su un server web), puoi creare una versione ottimizzata dell'app:

1. **Creare una build di produzione:**  
   Esegui il comando:
   ```bash
   npm run build
   ```
   Questo comando creerà una versione pronta per la produzione dell'app nella cartella `dist`.

2. **Caricare sul server:**  
   Una volta creata la build, puoi caricare il contenuto della cartella `dist` sul tuo server. Se non hai un server, puoi utilizzare piattaforme di deploy come **Netlify** o **Vercel** per caricare l'app gratuitamente.

   Netlify e Vercel supportano il deploy diretto dal repository Git, quindi puoi connettere il tuo repository GitHub e loro si occuperanno di tutto il resto.

## **Dipendenze principali**

Ecco alcune delle librerie utilizzate in questo progetto:

- **React**: 18.x (la libreria per costruire l'interfaccia utente).
- **Vite**: 4.x (uno strumento per creare e compilare l'app in modo veloce).
- **React Router DOM**: 6.x (per gestire la navigazione tra le pagine).
- **Axios**: Per fare richieste HTTP al server REST.
- **React Hook Form**: Se utilizzato per gestire i moduli (per esempio, per il login e la gestione delle prenotazioni).

## **Note importanti**

- **Verifica il server API:** Assicurati che il server API sia correttamente configurato e in esecuzione prima di avviare l'app. L'app si collega a questo server per ottenere e inviare dati sulle prenotazioni.
  
- **Modalità sviluppo:** Durante lo sviluppo, puoi usare il comando `npm run dev`, che avvia un server di sviluppo locale. Questo server offre la funzionalità di hot-reloading, cioè ogni volta che fai una modifica al codice, la pagina si aggiorna automaticamente nel browser senza bisogno di ricaricarla manualmente.

- **Errori comuni:** Se ottieni un errore relativo alla connessione con l'API, verifica che il file `.env` contenga l'indirizzo corretto del server. Se non sei sicuro dell'indirizzo, contatta chi gestisce il server API.

- **Strumenti di deployment:** Se il progetto è destinato a un ambiente di produzione, considera l'uso di **Netlify** o **Vercel**. Questi strumenti permettono di fare il deploy facilmente direttamente dalla tua repository Git.