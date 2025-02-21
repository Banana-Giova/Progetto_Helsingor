import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Titolo a sinistra */}
        <Link className="navbar-brand" to="/">Teatro Stabile Helsingor</Link>
        
        {/* Bottone per dispositivi mobili */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Contenuto della navbar */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item border-start ps-2">
              <Link className="nav-link" to="/spettacoli">Spettacoli Programmati</Link>
            </li>
            <li className="nav-item border-start ps-2">
              <Link className="nav-link" to="/prenotazioni/form">Prenotazioni</Link>
            </li>
            <li className="nav-item border-start ps-2">
              <Link className="nav-link" to="/moderatori/area">Area Moderatori</Link>
            </li>
            <li className="nav-item border-start ps-2">
              <Link className="nav-link" to="moderatori/logout">Log Out</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
