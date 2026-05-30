import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { API_URL } from '../config';


const PurchaseHistory = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        fetch(`${API_URL}/api/history`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id_usuario })
        })
            .then(res => res.json())
            .then(data => {
                setHistory(data)
                console.log(data)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="history-page">

            <Header />

            <main className="history-main">
                <section className="history-container">
                    <h1 className="history-title">Historial de compras</h1>

                    {history.length === 0 ? (
                        <p className="history-empty">No tienes compras registradas.</p>
                    ) : (
                        history.map((item) => (
                            <div key={item.id_compra} className="history-card">

                                <div className="history-card-header">
                                    <span className="history-date">{item.fecha}</span>
                                    <span className="history-total">${Number(item.total).toLocaleString('es-CO')}</span>
                                </div>

                                <div className="history-details">
                                    <div key={item.detalle_compra[0].id_detalle} className="history-detail-item">
                                        <span className="history-detail-label">Cantidad</span>
                                        <span className="history-detail-value">{item.detalle_compra[0].cantidad}</span>

                                        <span className="history-detail-label">Precio por ficho</span>
                                        <span className="history-detail-value">${Number(item.detalle_compra[0].ficho.precio).toLocaleString('es-CO')}</span>

                                        <span className="history-detail-label">Estado</span>
                                        <span className={`history-status ${item.detalle_compra[0].ficho.estado === 'Disponible' ? 'history-status--disponible' : 'history-status--usado'}`}>
                                            {item.detalle_compra[0].ficho.estado}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        ))
                    )}
                </section>
            </main>

        </div>
    );
};


const mockHistorial = [
    {
        id_compra: 1,
        fecha: '2026-05-18',
        total: 10000,
        detalles: [
            { id_detalle: 1, cantidad: 2, ficho: { precio: 5000, estado: 'usado' } },
        ],
    },
];

export default PurchaseHistory;