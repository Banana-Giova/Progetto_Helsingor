import React, { useState } from "react";
import authAxios from "../../authAxios";
import "bootstrap/dist/css/bootstrap.min.css";

const EditPrenotazione = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [giornoScelto, setGiornoScelto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [postiPren, setPostiPren] = useState("");
  const [postiBimbi, setPostiBimbi] = useState("");
  const [viaMail, setViaMail] = useState(false);
  const [donazioni, setDonazioni] = useState("");
  const [referente, setReferente] = useState("");
  const [mailFuture, setMailFuture] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    if (!id.trim()) {
      setMessage("⚠️ Inserisci un ID prenotazione valido.");
      return;
    }

    try {
      await authAxios.put(`/prenotazioni/${id}`, {
        email,
        giorno_scelto: giornoScelto,
        telefono,
        posti_pren: postiPren,
        posti_bimbi: postiBimbi,
        via_mail: viaMail,
        donazioni,
        referente,
        mail_future: mailFuture,
      });

      setMessage("✅ Prenotazione aggiornata con successo!");
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Errore durante la modifica.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 bg-dark text-light">
        <h2 className="text-center mb-4">Modifica Prenotazione</h2>

        <div className="mb-3">
          <label className="form-label">ID Prenotazione</label>
          <input
            type="text"
            className="form-control bg-secondary text-light border-0"
            placeholder="Inserisci l'ID della prenotazione"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control bg-secondary text-light border-0"
            placeholder="Inserisci la nuova email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Giorno Scelto</label>
          <input
            type="text"
            className="form-control bg-secondary text-light border-0"
            placeholder="Es. 2024-05-12"
            value={giornoScelto}
            onChange={(e) => setGiornoScelto(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Telefono</label>
          <input
            type="tel"
            className="form-control bg-secondary text-light border-0"
            placeholder="Inserisci il numero di telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Posti Prenotati</label>
            <input
              type="number"
              className="form-control bg-secondary text-light border-0"
              value={postiPren}
              onChange={(e) => setPostiPren(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Di cui Bambini</label>
            <input
              type="number"
              className="form-control bg-secondary text-light border-0"
              value={postiBimbi}
              onChange={(e) => setPostiBimbi(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Donazioni</label>
          <input
            type="text"
            className="form-control bg-secondary text-light border-0"
            placeholder="Inserisci l'importo o il tipo di donazione"
            value={donazioni}
            onChange={(e) => setDonazioni(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Referente</label>
          <input
            type="text"
            className="form-control bg-secondary text-light border-0"
            placeholder="Nome del referente"
            value={referente}
            onChange={(e) => setReferente(e.target.value)}
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={viaMail}
            onChange={() => setViaMail(!viaMail)}
          />
          <label className="form-check-label">Ricevi aggiornamenti via mail</label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={mailFuture}
            onChange={() => setMailFuture(!mailFuture)}
          />
          <label className="form-check-label">Desidera ricevere mail in futuro</label>
        </div>

        <button className="btn btn-outline-light w-100" onClick={handleUpdate}>
          ✏️ Modifica Prenotazione
        </button>

        {message && <div className="alert alert-secondary mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default EditPrenotazione;
