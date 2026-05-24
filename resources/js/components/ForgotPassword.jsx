import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');

    const handleSubmit = () => {
        console.log('Enviar recuperación a:', correo);
        // aquí va tu fetch al backend
    };

    return (
        <div className="forgot-page">

            <header className="header">
                <div className="logo-container">
                    <h2 className="logo">MiFicho</h2>
                </div>
            </header>

            <main className="forgot-main">
                <section className="forgot-container">
                    <div className="forgot-card">

                        <h1 className="forgot-title">Recuperar contraseña</h1>

                        <p className="forgot-subtitle">
                            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
                        </p>

                        <div className="forgot-form">

                            <label className="forgot-label">Correo electrónico</label>
                            <input
                                className="forgot-input"
                                type="email"
                                placeholder="tucorreo@ejemplo.com"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />

                            <button className="forgot-button" onClick={handleSubmit}>
                                Enviar enlace
                            </button>

                            <button className="forgot-back" onClick={() => navigate('/')}>
                                Volver al inicio de sesión
                            </button>

                        </div>

                    </div>
                </section>
            </main>

        </div>
    );
};

export default ForgotPassword;