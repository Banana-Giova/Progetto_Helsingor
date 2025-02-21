import React from 'react'
import { Link } from 'react-router-dom'

function AreaModeratori() {
    return(
        <div>
            <h1>Benvenuto nell'Area Moderatori!</h1>
            <hr/><br/>
            <Link to='/prenotazioni/visualizza' className="btn btn-danger">Visualizza le prenotazioni</Link>
            <br/><br/>
            <Link to='/prenotazioni/modifica' className="btn btn-danger">Modifica una prenotazione</Link>
            <br></br><br></br>
            <Link to='/prenotazioni/elimina' className="btn btn-danger">Elimina una prenotazione</Link>
            <br/><hr/><br/>
            <Link to='/moderatori/registra' className="btn btn-danger">Registra un nuovo moderatore</Link>
            <br/><br/>
            <Link to='/moderatori/visualizza' className="btn btn-danger">Visualizza tutti i moderatori</Link>
            <br/><br/>
            <Link to='/moderatori/modifica' className="btn btn-danger">Cambia la password di un moderatore</Link>
            <br/><br/>
            <Link to='/moderatori/elimina' className="btn btn-danger">Elimina un moderatore</Link>
        </div>
    )
}

export default AreaModeratori