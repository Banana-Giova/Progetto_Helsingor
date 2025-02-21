import React, { useState } from "react";
import authAxios from "../../authAxios";

const ModificaModeratore = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!username) {
      setError("Inserisci il nome utente!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Le password non coincidono!");
      return;
    }

    try {
      setLoading(true);
      const response = await authAxios.put(`auth/moderatori/${username}`, {
        password: password,
      });

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Errore durante l'aggiornamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px", background: "#222", color: "#fff" }}>
      <h2>Modifica Password Moderatore</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Nome Utente:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Nuova Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Conferma Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
          {loading ? "Aggiornamento in corso..." : "Modifica Password"}
        </button>
      </form>
    </div>
  );
};

export default ModificaModeratore;
