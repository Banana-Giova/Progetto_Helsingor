import React, { useState } from "react";
import authAxios from "../../authAxios";

const EliminaPrenotazione = () => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!id.trim()) {
      setMessage("Inserisci un ID valido.");
      return;
    }

    if (!window.confirm(`Sei sicuro di voler eliminare la prenotazione "${id}"?`)) {
      return;
    }

    try {
      await authAxios.delete(`prenotazioni/${id}`);
      setMessage(`Prenotazione "${id}" eliminata con successo.`);
      setId("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Errore nell'eliminazione.");
    }
  };

  return (
    <div>
      <h2>Elimina Prenotazione</h2>
      <hr/>
      <input
        type="text"
        placeholder="Valore ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      /><br/><br/>
      <button className="btn btn-danger" onClick={handleDelete}>Elimina</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EliminaPrenotazione;
