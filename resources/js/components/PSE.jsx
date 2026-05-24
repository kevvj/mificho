import { useState } from 'react';

const PSE = ({ onSuccess, open, setOpen }) => {
    const [bank, setBank] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [personType, setPersonType] = useState('');
    const [error, setError] = useState('');

    const handlePay = () => {
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