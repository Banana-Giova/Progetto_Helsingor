import React, { useEffect, useState } from 'react';
import authAxios from '../../authAxios'; // Assicurati che il percorso sia corretto

const ViewPrenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrenotazioni = async () => {
      try {
        const response = await authAxios.get('/prenotazioni/');
        const data = response.data;
        if (Array.isArray(data)) {
          setPrenotazioni(data);
        } else if (data && Array.isArray(data.prenotazioni)) {
          setPrenotazioni(data.prenotazioni);
        } else {
          setPrenotazioni([]);
        }
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrenotazioni();
  }, []);

  if (loading) {
    return <div>Caricamento in corso...</div>;
  }

  if (error) {
    return (
      <div>
        Errore:{" "}
        {typeof error === "object" ? JSON.stringify(error) : error}
      </div>
    );
  }

  return (
    <div>
      <h2>Lista delle Prenotazioni</h2>
      {prenotazioni.length === 0 ? (
        <p>Nessuna prenotazione trovata.</p>
      ) : (
        prenotazioni.map((prenotazione) => (
          <div
            key={prenotazione.id}
            className="single-prenotazione"
          >
            <h3>{prenotazione.nominativo}</h3>
            <p>
              <strong>ID:</strong> {prenotazione.id}
            </p>
            <p>
              <strong>Giorno scelto:</strong> {prenotazione.giorno_scelto}
            </p>
            <p>
              <strong>Posti prenotati:</strong> {prenotazione.posti_pren}
            </p>
            <p>
              <strong>Posti per bambini:</strong> {prenotazione.posti_bimbi}
            </p>
            <p>
              <strong>Telefono:</strong>{" "}
              {prenotazione.telefono || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {prenotazione.email}
            </p>
            <p>
              <strong>Riceve e-ticket via mail:</strong>{" "}
              {prenotazione.via_mail ? "Sì" : "No"}
            </p>
            <p>
              <strong>Istante:</strong> {prenotazione.istante}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewPrenotazioni;
