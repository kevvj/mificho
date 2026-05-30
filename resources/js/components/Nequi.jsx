import { useState } from 'react';
import { API_URL } from '../config';

const Nequi = ({ onSuccess, open, setOpen, amount, error, setError, setShowError, coffeeShopId  }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [dynamicKey, setDynamicKey] = useState('');
    const [notRobot, setNotRobot] = useState(false);

    const URL = API_URL


    const today = new Date().toLocaleString('sv-SE');

    const handlePay = async () => {
        if (phone.length < 10) {

            setError("Ingresa un número válido")

            return;
        }
        if (password.length < 3) {
            setError("Ingresa tu contraseña")
            return;
        }
        if (dynamicKey.length < 6) {

            setError("La clave dinámica debe tener 6 dígitos")

            return;
        }
        if (!notRobot) {
            setError("Confirma que no eres un robot")

            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const user_id = user.id_usuario;

        const response = await fetch(`${URL}/api/insertPay`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, date: today, user_id, coffeeShopId })
        });

        const data = await response.json();

        if (response.status === 400) {
            setError(data.error);
            setShowError(true)
            setOpen(false);
            return;
        }

        setOpen(false);
        onSuccess();
    };

    return (
        <>
            {open && (
                <div className="nequi-overlay">
                    <div className="nequi-modal">

                        <div className="nequi-header">
                            <button className="nequi-close" onClick={() => setOpen(false)}>✕</button>
                        </div>

                        <img className="nequi-logo" src="/nequi.jpg" alt="Nequi" />

                        <p className="nequi-subtitle">
                            Ingresa tus datos de Nequi
                        </p>

                        <label className="nequi-label">Número de celular</label>
                        <input
                            className="nequi-input"
                            type="tel"
                            placeholder="300 000 0000"
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <label className="nequi-label">Contraseña</label>
                        <input
                            className="nequi-input"
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label className="nequi-label">Clave dinámica</label>
                        <input
                            className="nequi-input"
                            type="text"
                            placeholder="000000"
                            maxLength={6}
                            value={dynamicKey}
                            onChange={(e) => setDynamicKey(e.target.value)}
                        />

                        <div className="nequi-robot">
                            <input
                                type="checkbox"
                                id="notRobot"
                                checked={notRobot}
                                onChange={(e) => setNotRobot(e.target.checked)}
                            />
                            <label htmlFor="notRobot">No soy un robot</label>
                        </div>

                        {error}

                        <button className="nequi-button" onClick={handlePay}>
                            Confirmar pago
                        </button>

                    </div>
                </div>
            )}
        </>
    );
};

export default Nequi;