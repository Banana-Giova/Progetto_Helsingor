import React from 'react'
import { Link } from 'react-router-dom';

function SuccessoMod() {
    return(
        <div className='container'>
            <h1>Operazione eseguita con successo!</h1>
            <hr></hr>
            <Link to='/moderatori/area' className="btn btn-danger">Accedi all'area moderatori!</Link>
        </div>
    )
}

export default SuccessoMod