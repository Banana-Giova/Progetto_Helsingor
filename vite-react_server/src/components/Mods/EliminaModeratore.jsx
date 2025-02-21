import React, { useState } from "react";
import authAxios from "../../authAxios";

const EliminaModeratore = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!username.trim()) {
      setMessage("Inserisci un nome utente valido.");
      return;
    }

    if (!window.confirm(`Sei sicuro di voler eliminare il moderatore "${username}"?`)) {
      return;
    }

    try {
      await authAxios.delete(`auth/moderatori/${username}`);
      setMessage(`Moderatore "${username}" eliminato con successo.`);
      setUsername("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Errore nell'eliminazione.");
    }
  };

  return (
    <div>
      <h2>Elimina Moderatore</h2>
      <hr/>
      <input
        type="text"
        placeholder="Nome utente"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br/><br/>
      <button className="btn btn-danger" onClick={handleDelete}>Elimina</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EliminaModeratore;
