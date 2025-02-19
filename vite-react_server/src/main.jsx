import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";


const App=()=>{
    
    useEffect(
        ()=>{
            fetch('/prenotazioni/hello')
            .then(response=>response.json())
            .then(data=>{console.log(data)
                setMessage(data.message)
            })
            .catch(err=>console.log(err))
        },[]
    )

    const [message, setMessage]=useState('')
    return (
        <div className="app">
            {message}
        </div>
        )
}


ReactDOM.createRoot(<App/>, document.getElementById('root'));