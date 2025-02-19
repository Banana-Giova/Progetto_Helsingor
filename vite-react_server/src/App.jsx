import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'
import HomePage from './components/Home'
import Spettacoli from './components/Spettacoli'
import Prenotazioni from './components/Prenotazioni'
import Moderatori from './components/Moderatori'
import axios from 'axios'
import { useState } from 'react'
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
          <Route path="/prenotazioni" element={<Prenotazioni />} />
          <Route path="/moderatori" element={<Moderatori />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
