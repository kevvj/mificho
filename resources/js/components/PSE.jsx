import { useState } from 'react';
import { API_URL } from '../config';


const PSE = ({ onSuccess, open, setOpen, amount, error, setError, setShowError, coffeeShopId }) => {
    const [bank, setBank] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [personType, setPersonType] = useState('');

    const URL = API_URL

    const today = new Date().toLocaleString('sv-SE');

    const handlePay = async () => {
        if (!bank) {
            setError('Selecciona un banco');
            return;
        }
        if (!documentType) {
            setError('Selecciona el tipo de documento');
            return;
        }
        if (documentNumber.length < 5) {
            setError('Ingresa tu número de documento');
            return;
        }
        if (!personType) {
            setError('Selecciona el tipo de persona');
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
                <div className="pse-overlay">
                    <div className="pse-modal">

                        <div className="pse-header">
                            <button className="pse-close" onClick={() => setOpen(false)}>✕</button>
                        </div>

                        <img className="pse-logo" src="/pse.png" alt="PSE" />

                        <p className="pse-subtitle">Ingresa tus datos para pagar con PSE</p>

                        <label className="pse-label">Banco</label>
                        <select
                            className="pse-input"
                            value={bank}
                            onChange={(e) => setBank(e.target.value)}
                        >
                            <option value="">Selecciona tu banco</option>
                            <option value="bancolombia">Bancolombia</option>
                            <option value="davivienda">Davivienda</option>
                            <option value="bogota">Banco de Bogotá</option>
                            <option value="nequi">Nequi</option>
                            <option value="bbva">BBVA</option>
                            <option value="occidente">Banco de Occidente</option>
                        </select>

                        <label className="pse-label">Tipo de documento</label>
                        <select
                            className="pse-input"
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}
                        >
                            <option value="">Selecciona</option>
                            <option value="cc">Cédula de ciudadanía</option>
                            <option value="ce">Cédula de extranjería</option>
                            <option value="nit">NIT</option>
                            <option value="passport">Pasaporte</option>
                        </select>

                        <label className="pse-label">Número de documento</label>
                        <input
                            className="pse-input"
                            type="text"
                            placeholder="123456789"
                            maxLength={15}
                            value={documentNumber}
                            onChange={(e) => setDocumentNumber(e.target.value.replace(/\D/g, ''))}
                        />

                        <label className="pse-label">Tipo de persona</label>
                        <select
                            className="pse-input"
                            value={personType}
                            onChange={(e) => setPersonType(e.target.value)}
                        >
                            <option value="">Selecciona</option>
                            <option value="natural">Natural</option>
                            <option value="juridica">Jurídica</option>
                        </select>

                        {error && <p className="pse-error">{error}</p>}

                        <button className="pse-button" onClick={handlePay}>
                            Confirmar pago
                        </button>

                    </div>
                </div>
            )}
        </>
    );
};

export default PSE;