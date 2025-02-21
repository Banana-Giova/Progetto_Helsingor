import React from 'react'
import { Link } from 'react-router-dom';

function HomePage() {
    return(
        <div className='container'>
            <h1>Benvenuto al Teatro Stabile di Helsingor!</h1>
            <hr></hr>
            <Link to='/prenotazioni/form' className="btn btn-danger">Prenota ora!</Link>
        </div>
    )
}

export default HomePage