import { useState } from 'react';
import { API_URL } from '../config';


const CreditCard = ({ onSuccess, open, setOpen, amount }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');

    const URL = API_URL

    const today = new Date().toISOString().split('T')[0];

    const handlePay = async () => {
        if (cardNumber.length < 19) {
            setError('Ingresa un número de tarjeta válido');
            return;
        }
        if (cardName.trim().length < 3) {
            setError('Ingresa el nombre del titular');
            return;
        }
        if (expiry.length < 5) {
            setError('Ingresa la fecha de vencimiento');
            return;
        }
        if (cvv.length < 3) {
            setError('Ingresa el CVV');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const user_id = user.id_usuario;

        const response = await fetch(`${URL}/api/insertPay`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, date: today, user_id })
        })
        const text = await response.text()
        console.log(text)

        setOpen(false);
        onSuccess();
    };

    const formatCardNumber = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 16);
        return digits.replace(/(.{4})/g, '$1 ').trim();
    };

    const formatExpiry = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 4);
        if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
        return digits;
    };

    return (
        <>
            {open && (
                <div className="card-overlay">
                    <div className="card-modal">

                        <div className="card-header">
                            <h3 className="card-title">Pagar con tarjeta</h3>
                            <button className="card-close" onClick={() => setOpen(false)}>✕</button>
                        </div>

                        <p className="card-subtitle">Ingresa los datos de tu tarjeta</p>

                        <label className="card-label">Número de tarjeta</label>
                        <input
                            className="card-input"
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        />

                        <label className="card-label">Nombre del titular</label>
                        <input
                            className="card-input"
                            type="text"
                            placeholder="Como aparece en la tarjeta"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                        />

                        <div className="card-row">
                            <div className="card-field">
                                <label className="card-label">Vencimiento</label>
                                <input
                                    className="card-input"
                                    type="text"
                                    placeholder="MM/AA"
                                    maxLength={5}
                                    value={expiry}
                                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                />
                            </div>

                            <div className="card-field">
                                <label className="card-label">CVV</label>
                                <input
                                    className="card-input"
                                    type="password"
                                    placeholder="000"
                                    maxLength={4}
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>
                        </div>

                        {error && <p className="card-error">{error}</p>}

                        <button className="card-button" onClick={handlePay}>
                            Confirmar pago
                        </button>

                    </div>
                </div>
            )}
        </>
    );
};

export default CreditCard;