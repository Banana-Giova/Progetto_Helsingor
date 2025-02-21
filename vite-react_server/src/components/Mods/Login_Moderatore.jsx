import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginModeratore() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();
    const navigate = useNavigate();

    const loginForm = async (data) => {
        try {
            const requestData = {
                username: data.username,
                password: data.password
            };

            const response = await axios.post(
                'http://localhost:3101/auth/moderatori/accesso', 
                requestData, 
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log("Login avvenuto con successo:", response.data);
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('refreshToken', response.data.refresh_token);
            
            navigate("/successoMod");
        } catch (error) {
            console.error("Errore nel login:", error.response?.data || error.message);
            alert("Login fallito! Verifica le credenziali e riprova.");
        }
    };

    return (
        <div>
            <h2>Sei un Moderatore? Accedi qui sotto!</h2>
            <hr /><br />
            <div className='form'>
                <Form onSubmit={handleSubmit(loginForm)}> 
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Username"
                            {...register("username", { 
                                required: "Il campo Username è obbligatorio",
                                maxLength: { value: 32, message: "Massimo 32 caratteri" }
                            })}
                        />
                        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
                    </Form.Group>
                    <br />

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            {...register("password", { 
                                required: "La password è obbligatoria",
                                minLength: { value: 8, message: "Minimo 8 caratteri" },
                                maxLength: { value: 32, message: "Massimo 32 caratteri" }
                            })}
                        />
                        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                    </Form.Group>
                    <br />

                    <Button type="submit" variant="danger">Login</Button>
                </Form>
            </div>
        </div>
    );
}

export default LoginModeratore;
