import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import authAxios from "../../authAxios";
import "bootstrap/dist/css/bootstrap.min.css";

const EditPrenotazione = () => {
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm();
  
  const postiPren = watch("posti_pren");

  const onSubmit = async (data) => {
    if (!id.trim()) {
      setMessage("⚠️ Inserisci un ID prenotazione valido.");
      return;
    }

    try {
      await authAxios.put(`/prenotazioni/${id}`, {
        email: data.email,
        giorno_scelto: data.giorno_scelto,
        telefono: data.telefono || null,
        posti_pren: Number(data.posti_pren),
        posti_bimbi: Number(data.posti_bimbi),
        via_mail: data.via_mail === "true",
        donazioni: data.donazioni || null,
        referente: data.referente || null,
        mail_future: data.mail_future === "true"
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
        <hr className="border-light"/>
        
        {/* ID Prenotazione (prima del form) */}
        <Form.Group className="mb-3">
          <Form.Label>ID Prenotazione</Form.Label>
          <Form.Control 
            type="text"
            className="bg-secondary text-light border-0"
            placeholder="Inserisci l'ID della prenotazione"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email"
              className="bg-secondary text-light border-0"
              placeholder="esempio@mail.com"
              {...register("email", { pattern: /^\S+@\S+$/i, maxLength: 64 })}
            />
            {errors.email && <p className="text-warning">{errors.email.message}</p>}
          </Form.Group>

          {/* Giorno scelto */}
          <Form.Group className="mb-3">
            <Form.Label>Giorno Scelto</Form.Label>
            <Form.Control 
              type="text"
              className="bg-secondary text-light border-0"
              placeholder="Es. 2024-05-12"
              {...register("giorno_scelto", { maxLength: 32 })}
            />
            {errors.giorno_scelto && <p className="text-warning">{errors.giorno_scelto.message}</p>}
          </Form.Group>

          {/* Telefono */}
          <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control 
              type="tel"
              className="bg-secondary text-light border-0"
              placeholder="Inserisci il numero di telefono"
              {...register("telefono", { maxLength: 16 })}
            />
            {errors.telefono && <p className="text-warning">{errors.telefono.message}</p>}
          </Form.Group>

          {/* Posti prenotati & Posti bambini */}
          <div className="row">
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Posti Prenotati</Form.Label>
              <Form.Control 
                type="number"
                className="bg-secondary text-light border-0"
                {...register("posti_pren", { min: 1 })}
              />
              {errors.posti_pren && <p className="text-warning">{errors.posti_pren.message}</p>}
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>Di cui Bambini</Form.Label>
              <Form.Control 
                type="number"
                className="bg-secondary text-light border-0"
                {...register("posti_bimbi", { 
                  min: 0, 
                  validate: value => (postiPren && Number(value) >= Number(postiPren)) ? "I posti bambini devono essere inferiori" : true 
                })}
              />
              {errors.posti_bimbi && <p className="text-warning">{errors.posti_bimbi.message}</p>}
            </Form.Group>
          </div>

          {/* Donazioni */}
          <Form.Group className="mb-3">
            <Form.Label>Donazioni</Form.Label>
            <Form.Control 
              type="text"
              className="bg-secondary text-light border-0"
              placeholder="Inserisci l'importo o il tipo di donazione"
              {...register("donazioni", { maxLength: 64 })}
            />
          </Form.Group>

          {/* Referente */}
          <Form.Group className="mb-3">
            <Form.Label>Referente</Form.Label>
            <Form.Control 
              type="text"
              className="bg-secondary text-light border-0"
              placeholder="Nome del referente"
              {...register("referente", { maxLength: 64 })}
            />
          </Form.Group>

          {/* Ricevi aggiornamenti via mail */}
          <Form.Group className="mb-3 text-center">
            <Form.Label>Ricevi aggiornamenti via mail</Form.Label>
            <div className="d-flex justify-content-center gap-3">
              <Form.Check 
                type="radio"
                label="Sì"
                value="true"
                {...register("via_mail")}
              />
              <Form.Check 
                type="radio"
                label="No"
                value="false"
                {...register("via_mail")}
              />
            </div>
          </Form.Group>

          {/* Desidera ricevere mail in futuro */}
          <Form.Group className="mb-3 text-center">
            <Form.Label>Desidera ricevere mail in futuro</Form.Label>
            <div className="d-flex justify-content-center gap-3">
              <Form.Check 
                type="radio"
                label="Sì"
                value="true"
                {...register("mail_future")}
              />
              <Form.Check 
                type="radio"
                label="No"
                value="false"
                {...register("mail_future")}
              />
            </div>
          </Form.Group>

          {/* Bottone di Modifica */}
          <div className="text-center">
            <Button type="submit" variant="outline-light" className="w-100">
              ✏️ Modifica Prenotazione
            </Button>
          </div>
        </Form>

        {message && <div className="alert alert-secondary mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default EditPrenotazione;