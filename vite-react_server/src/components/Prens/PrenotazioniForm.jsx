import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PrenotazioniForm() {
    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
    } = useForm();
    
    const navigate = useNavigate();
    const postiPren = watch("posti_pren");

    const onSubmit = async (data) => {
        try {
            const requestData = {
                nominativo: data.nominativo,
                email: data.email,
                giorno_scelto: data.giorno_scelto,
                telefono: data.telefono || null,
                posti_pren: Number(data.posti_pren),
                posti_bimbi: Number(data.posti_bimbi),
                via_mail: data.via_mail === "true",
                donazioni: data.donazioni || null,
                referente: data.referente || null,
                mail_future: data.mail_future === "true"
            };

            await axios.post(
                'http://localhost:3101/prenotazioni/', 
                requestData, 
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log("Prenotazione registrata con successo!");
            navigate("/successo");
        } catch (error) {
            console.error("Errore nella prenotazione:", error.response?.data || error.message);
            alert("Prenotazione fallita! Verifica i dati e riprova.");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-lg p-4 bg-dark text-light">
                <h2 className="text-center mb-4">Prenota il tuo spettacolo!</h2>
                <hr className="border-light"/>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    {/* Nominativo */}
                    <Form.Group className="mb-3">
                        <Form.Label>Nominativo</Form.Label>
                        <Form.Control 
                            type="text"
                            className="bg-secondary text-light border-0"
                            placeholder="Il tuo nominativo"
                            {...register("nominativo", { required: "Il nominativo è obbligatorio", maxLength: 32 })}
                        />
                        {errors.nominativo && <p className="text-warning">{errors.nominativo.message}</p>}
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email"
                            className="bg-secondary text-light border-0"
                            placeholder="esempio@mail.com"
                            {...register("email", { required: "L'email è obbligatoria", pattern: /^\S+@\S+$/i, maxLength: 64 })}
                        />
                        {errors.email && <p className="text-warning">{errors.email.message}</p>}
                    </Form.Group>

                    {/* Giorno scelto */}
                    <Form.Group className="mb-3">
                        <Form.Label>Giorno scelto</Form.Label>
                        <Form.Control 
                            type="text"
                            className="bg-secondary text-light border-0"
                            placeholder="Ad esempio, 2024-05-21"
                            {...register("giorno_scelto", { required: "Il giorno scelto è obbligatorio", maxLength: 32 })}
                        />
                        {errors.giorno_scelto && <p className="text-warning">{errors.giorno_scelto.message}</p>}
                    </Form.Group>

                    {/* Telefono */}
                    <Form.Group className="mb-3">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control 
                            type="text"
                            className="bg-secondary text-light border-0"
                            placeholder="Facoltativo"
                            {...register("telefono", { maxLength: 16 })}
                        />
                        {errors.telefono && <p className="text-warning">{errors.telefono.message}</p>}
                    </Form.Group>

                    {/* Posti prenotati & Posti bambini */}
                    <div className="row">
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Posti prenotati</Form.Label>
                            <Form.Control 
                                type="number"
                                className="bg-secondary text-light border-0"
                                {...register("posti_pren", { required: "Il numero di posti è obbligatorio", min: 1 })}
                            />
                            {errors.posti_pren && <p className="text-warning">{errors.posti_pren.message}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Di cui bambini</Form.Label>
                            <Form.Control 
                                type="number"
                                className="bg-secondary text-light border-0"
                                {...register("posti_bimbi", { required: "Obbligatorio", min: 0, validate: value => (postiPren && Number(value) >= Number(postiPren)) ? "I posti bambini devono essere inferiori" : true })}
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
                            placeholder="Facoltativo"
                            {...register("donazioni", { maxLength: 64 })}
                        />
                    </Form.Group>

                    {/* Referente */}
                    <Form.Group className="mb-3">
                        <Form.Label>Referente</Form.Label>
                        <Form.Control 
                            type="text"
                            className="bg-secondary text-light border-0"
                            placeholder="Facoltativo"
                            {...register("referente", { maxLength: 64 })}
                        />
                    </Form.Group>

                    {/* Eticket */}
                    <Form.Group className="mb-3 text-center">
                        <Form.Label>Vuoi ricevere il biglietto via mail?</Form.Label>
                        <div className="d-flex justify-content-center gap-3">
                            <Form.Check 
                                type="radio"
                                label="Sì"
                                value="true"
                                {...register("via_mail", { required: "Seleziona un'opzione" })}
                            />
                            <Form.Check 
                                type="radio"
                                label="No"
                                value="false"
                                {...register("via_mail", { required: "Seleziona un'opzione" })}
                            />
                        </div>
                        {errors.via_mail && <p className="text-warning">{errors.via_mail.message}</p>}
                    </Form.Group>

                    {/* Mail future */}
                    <Form.Group className="mb-3 text-center">
                        <Form.Label>Vuoi ricevere mail per spettacoli futuri?</Form.Label>
                        <div className="d-flex justify-content-center gap-3">
                            <Form.Check 
                                type="radio"
                                label="Sì"
                                value="true"
                                {...register("mail_future", { required: "Seleziona un'opzione" })}
                            />
                            <Form.Check 
                                type="radio"
                                label="No"
                                value="false"
                                {...register("mail_future", { required: "Seleziona un'opzione" })}
                            />
                        </div>
                        {errors.mail_future && <p className="text-warning">{errors.mail_future.message}</p>}
                    </Form.Group>

                    {/* Bottone Prenotazione */}
                    <div className="text-center">
                        <Button type="submit" variant="outline-light" className="w-100">
                            📅 Prenota il tuo posto
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default PrenotazioniForm;
