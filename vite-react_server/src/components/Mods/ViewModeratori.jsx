import React, { useEffect, useState } from 'react';
import authAxios from '../../authAxios'; // Assicurati che il percorso sia corretto

const ViewModeratori = () => {
  const [moderatori, setModeratori] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModeratori = async () => {
      try {
        const response = await authAxios.get('auth/moderatori');
        const data = response.data;
        if (Array.isArray(data)) {
          setModeratori(data);
        } else if (data && Array.isArray(data.moderatori)) {
          setModeratori(data.moderatori);
        } else {
          setModeratori([]);
        }
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModeratori();
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
      <h2>Lista dei Moderatori</h2>
      {moderatori.length === 0 ? (
        <p>Nessun moderatore trovato.</p>
      ) : (
        moderatori.map((moderatore) => (
          <div
            key={moderatore.id}
            className="single-moderatore"
          >
            <h3>{moderatore.username}</h3>
            <p>
              <strong>Email:</strong> {moderatore.email}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewModeratori;
