# Progetto_Helsingor-React

Questo progetto ha come obiettivo la gestione delle prenotazioni per la compagnia teatrale Teatro Stabile Helsingor, offrendo sia un'applicazione mobile che una web. Il sistema è composto da un **backend** che gestisce le prenotazioni e le credenziali dei moderatori, e da due frontend separati, uno per l'app mobile sviluppata con **React Native** e uno per l'app web sviluppata con **React Vite**.

## **Struttura del Progetto**

Il progetto è diviso in tre cartelle principali:

1. **`flask_server`**:  
   Contiene il backend basato su Flask che gestisce le prenotazioni degli spettacoli e le credenziali dei moderatori.  
   **Funzionalità principali**:
   - Gestione delle prenotazioni (creazione, modifica, cancellazione).
   - Autenticazione e gestione dei moderatori.
   - Esposizione delle API RESTful per comunicare con i frontend.

2. **`react-native_server`**:  
   Contiene il frontend mobile sviluppato con **React Native**. Consente ai moderatori di gestire le prenotazioni tramite dispositivi mobili (Android e iOS), mentre i clienti possono prenotare gli spettacoli.
   **Funzionalità principali**:
   - Login per i moderatori.
   - Gestione delle prenotazioni da parte dei moderatori.
   - Visualizzazione degli spettacoli e prenotazioni da parte dei clienti.

3. **`vite-react_server`**:  
   Contiene il frontend web sviluppato con **React Vite**. Permette di visualizzare gli spettacoli e fare prenotazioni tramite un browser web. I moderatori possono anche accedere per gestire le prenotazioni.
   **Funzionalità principali**:
   - Login per i moderatori.
   - Gestione delle prenotazioni da parte dei moderatori.
   - Visualizzazione degli spettacoli e prenotazioni da parte dei clienti.

## **Panoramica delle Funzionalità del Progetto**

Il progetto consente la gestione completa delle prenotazioni teatrali, suddivisa in due principali gruppi di utenti:

- **Moderatori**: Possono accedere al sistema tramite login e gestire le prenotazioni degli spettacoli. Possono anche visualizzare e modificare le informazioni sugli spettacoli.
- **Clienti**: Possono visualizzare gli spettacoli in programmazione e fare prenotazioni direttamente dal sito web o dall'app mobile.

Le funzionalità principali che vengono gestite dai server sono:
- **Gestione delle prenotazioni**: Creazione, modifica ed eliminazione delle prenotazioni degli spettacoli.
- **Autenticazione**: Accesso e gestione delle credenziali per i moderatori.
- **Visualizzazione degli spettacoli**: I clienti e i moderatori possono visualizzare la lista degli spettacoli disponibili per la prenotazione.

## **Istruzioni per l'uso**

Ogni cartella del progetto contiene un file README che fornisce istruzioni dettagliate su come configurare, sviluppare, eseguire e distribuire ciascun componente del progetto. Di seguito trovi la descrizione dei README nelle rispettive cartelle:

1. **README in `flask_server`**:  
   Contiene le istruzioni per l'installazione e l'esecuzione del server Flask, che gestisce il backend per le prenotazioni e l'autenticazione dei moderatori.

2. **README in `react-native_server`**:  
   Contiene le istruzioni per l'installazione e l'esecuzione dell'app mobile sviluppata con **React Native**, che permette ai moderatori di gestire le prenotazioni e ai clienti di prenotare gli spettacoli.

3. **README in `vite-react_server`**:  
   Contiene le istruzioni per l'installazione e l'esecuzione dell'app web sviluppata con **React Vite**, che consente la gestione delle prenotazioni tramite un browser web.

## **Come Iniziare**

1. **Clonare il repository**:  
   Clona l'intero repository con il comando:
   ```bash
   git clone <URL_REPOSITORY>
   cd <NOME_CARTELLA>
   ```

2. **Navigare nelle cartelle specifiche**:  
   Per ogni componente del progetto (backend o frontend), troverai una cartella separata con un README. Naviga nella cartella pertinente per trovare le istruzioni dettagliate di installazione e configurazione.

   - Per il server Flask: naviga nella cartella `flask_server`.
   - Per l'app mobile React Native: naviga nella cartella `react-native_server`.
   - Per l'app web React Vite: naviga nella cartella `vite-react_server`.

## **Note Aggiuntive**

- **Backend (Flask)**: Il backend RESTful gestisce tutte le funzionalità di autenticazione e prenotazione. Assicurati che il server backend sia correttamente configurato e in esecuzione prima di avviare le app frontend.
- **Frontend (React Native e React Vite)**: Entrambi i frontend si collegano al server Flask tramite API RESTful. Assicurati che l'URL del server sia configurato correttamente nei file `.env` di ciascun frontend.
