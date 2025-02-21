import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'
import PrivateRoute from "./components/PrivateRoute";
import HomePage from './components/Home'

import Spettacoli from './components/Spettacoli'

import PrenotazioniForm from './components/Prens/PrenotazioniForm'
import ViewPrenotazioni from './components/Prens/ViewPrenotazioni'
import ModificaPrenotazione from './components/Prens/ModificaPrenotazione';
import EliminaPrenotazione from './components/Prens/EliminaPrenotazione';


import RegistraModeratore from './components/Mods/Registra_Moderatore'
import LoginModeratore from './components/Mods/Login_Moderatore'
import AreaModeratori from './components/Mods/AreaModeratori'
import ViewModeratori from './components/Mods/ViewModeratori';
import ModificaModeratore from './components/Mods/ModificaModeratore';
import EliminaModeratore from './components/Mods/EliminaModeratore';

import Logout from './components/Mods/Logout';
import Successo from './components/Successo'
import SuccessoMod from './components/Mods/SuccessoMod'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spettacoli" element={<Spettacoli />} />

          <Route path="/prenotazioni/form" element={<PrenotazioniForm />} />

          <Route path="/moderatori/login" element={<LoginModeratore />} />

          <Route element={<PrivateRoute/>}>
            <Route path="/moderatori/logout" element={<Logout />} />
            <Route path="/moderatori/area" element={<AreaModeratori />} />

            <Route path="/moderatori/registra" element={<RegistraModeratore />} />
            <Route path="/successoMod" element={<SuccessoMod />} />
            <Route path="/moderatori/visualizza" element={<ViewModeratori />} />
            <Route path="/moderatori/modifica" element={<ModificaModeratore />} />
            <Route path="/moderatori/elimina" element={<EliminaModeratore />} />

            <Route path="/prenotazioni/visualizza" element={<ViewPrenotazioni />} />
            <Route path="/prenotazioni/modifica" element={<ModificaPrenotazione />} />
            <Route path="/prenotazioni/elimina" element={<EliminaPrenotazione />} />

          </Route>

          <Route path="/successo" element={<Successo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
