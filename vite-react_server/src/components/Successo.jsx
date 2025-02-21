import React from 'react'
import { Link } from 'react-router-dom';

function Successo() {
    return(
        <div className='container'>
            <h1>Operazione eseguita con successo!</h1>
            <hr></hr>
            <Link to='/' className="btn btn-danger">Torna alla homepage</Link>
        </div>
    )
}

export default Successo