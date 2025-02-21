import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function RegistraModeratore() {
    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors }
    } = useForm(); 

    const navigate = useNavigate();


    const signupModerator = async (data) => {
        try {
            const requestData = {
                username: data.username,
                email: data.email,
                password: data.password
            };

            await axios.post(
                'http://localhost:3101/auth/moderatori/registrazione', 
                requestData, 
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            console.log("Moderatore registrato con successo!");
            navigate("/successoMod");
        } catch (error) {
            console.error("Errore nella registrazione:", error.response?.data || error.message);
            alert("Registrazione fallita! Verifica i dati e riprova.");
        }
    };

    const password = watch("password");

    return (
        <div>
            <h2>Registra un nuovo Moderatore!</h2>
            <hr />
            <div className='form'>
                <Form onSubmit={handleSubmit(signupModerator)}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Username"
                            {...register("username", { required: "Il campo Username è obbligatorio", maxLength: { value: 32, message: "Massimo 32 caratteri" }})}
                        />
                        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
                    </Form.Group>
                    <br />
                    
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="esempio@mail.com"
                            {...register("email", { 
                                required: "L'email è obbligatoria", 
                                pattern: { value: /^\S+@\S+$/i, message: "Formato email non valido",
                                maxLength: { value: 32, message: "Massimo 32 caratteri"}
                                }
                            })}
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                    </Form.Group>
                    <br />

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Password"
                            {...register("password", { 
                                required: "La password è obbligatoria", 
                                minLength: { value: 8, message: "La password deve avere almeno 8 caratteri" },
                                maxLength: { value: 32, message: "La password non può superare i 32 caratteri" }
                            })}
                        />
                        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                    </Form.Group>
                    <br />

                    <Form.Group>
                        <Form.Label>Conferma Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Conferma Password"
                            {...register("confirmPassword", { 
                                required: "Conferma la password",
                                validate: value => value === password || "Le password non corrispondono"
                            })}
                        />
                        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
                    </Form.Group>
                    <br />

                    <Button 
                        type="submit" 
                        variant="danger"
                    >
                        Registra
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default RegistraModeratore;
