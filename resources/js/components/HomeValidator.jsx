import Header from '../components/Header';
import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { API_URL } from '../config';

const HomeValidator = () => {
    const [cameraActive, setCameraActive] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [scanError, setScanError] = useState('');
    const [recentValidations, setRecentValidations] = useState([]);
    const [coffeeShops, setCoffeeShops] = useState([]);
    const [selectedCoffeeShop, setSelectedCoffeeShop] = useState('');
    const scannerRef = useRef(null);

    useEffect(() => {
        fetch(`${API_URL}/api/coffeestores`)
            .then(res => res.json())
            .then(data => setCoffeeShops(data));

        fetch(`${API_URL}/api/recentValidations`)
            .then(res => res.json())
            .then(data => { if (Array.isArray(data)) setRecentValidations(data); });
    }, []);

    async function handleScan(ticketId) {
        setScanError('');
        setScanResult(null);
        const res = await fetch(`${API_URL}/api/validateTicket`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticket_id: ticketId, coffee_shop_id: selectedCoffeeShop })
        });
        const data = await res.json();
        stopCamera();
        if (!res.ok) {
            setScanError(data.error);
        } else {
            setScanResult('Ficho validado exitosamente');
            fetch(`${API_URL}/api/recentValidations`)
                .then(r => r.json())
                .then(d => { if (Array.isArray(d)) setRecentValidations(d); });
        }
    }

    function startCamera() {
        if (!selectedCoffeeShop) {
            setScanError('Selecciona una cafetería primero');
            return;
        }
        setScanError('');
        setScanResult(null);
        setCameraActive(true);
        setTimeout(() => {
            const html5QrCode = new Html5Qrcode('qr-reader');
            scannerRef.current = html5QrCode;
            html5QrCode.start(
                { facingMode: 'environment' },
                { fps: 10, qrbox: { width: 200, height: 200 } },
                (decodedText) => { handleScan(decodedText); },
                () => {}
            ).catch(() => setScanError('No se pudo acceder a la cámara'));
        }, 100);
    }

    function stopCamera() {
        if (scannerRef.current) {
            scannerRef.current.stop().then(() => {
                scannerRef.current = null;
                setCameraActive(false);
            }).catch(() => setCameraActive(false));
        }
    }

    return (
        <div className="home-validator">
            <Header />
            <main className="validator-main">

                <section className="validator-welcome">
                    <h1 className="validator-title">Panel de Validación</h1>
                    <p className="validator-subtitle">Escanea el código QR del estudiante para validar su ficho</p>
                </section>

                <section className="validator-scanner">
                    <h3 className="scanner-title">Escanear QR</h3>
                    <div className="scanner-box">

                        <select
                            className="scanner-select"
                            value={selectedCoffeeShop}
                            onChange={e => setSelectedCoffeeShop(e.target.value)}
                        >
                            <option value="">Selecciona una cafetería</option>
                            {coffeeShops.map(cs => (
                                <option key={cs.id_cafeteria} value={cs.id_cafeteria}>
                                    {cs.nombre}
                                </option>
                            ))}
                        </select>

                        {!cameraActive && (
                            <div className="scanner-placeholder">
                                <p>📷</p>
                                <p className="scanner-text">Cámara desactivada</p>
                            </div>
                        )}

                        <div id="qr-reader" style={{ width: '250px', display: cameraActive ? 'block' : 'none' }}></div>

                        {scanResult && <p className="scanner-success">{scanResult}</p>}
                        {scanError && <p className="scanner-error">{scanError}</p>}

                        <button className="scanner-button" onClick={cameraActive ? stopCamera : startCamera}>
                            {cameraActive ? 'Desactivar cámara' : 'Activar cámara'}
                        </button>

                    </div>
                </section>

                <section className="validator-history">
                    <h3 className="validator-history-title">Validaciones recientes</h3>
                    <div className="validator-history-list">
                        {recentValidations.length === 0 ? (
                            <p className="scanner-text">No hay validaciones recientes</p>
                        ) : (
                            recentValidations.map(v => (
                                <div key={v.id_validacion} className="validation-item">
                                    <span className="validation-student">Ficho #{v.id_ficho}</span>
                                    <span className="validation-cafeteria">{v.cafeteria}</span>
                                    <span className="validation-time">{v.fecha}</span>
                                </div>
                            ))
                        )}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default HomeValidator;

