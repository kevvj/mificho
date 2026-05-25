import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const mockHistorial = [
    {
        id_compra: 1,
        fecha: '2026-05-18',
        total: 10000,
        detalles: [
            { id_detalle: 1, cantidad: 2, ficho: { precio: 5000, estado: 'usado' } },
        ],
    },
    {
        id_compra: 2,
        fecha: '2026-05-17',
        total: 5000,
        detalles: [
            { id_detalle: 2, cantidad: 1, ficho: { precio: 5000, estado: 'disponible' } },
        ],
    },
    {
        id_compra: 3,
        fecha: '2026-05-15',
        total: 15000,
        detalles: [
            { id_detalle: 3, cantidad: 3, ficho: { precio: 5000, estado: 'usado' } },
        ],
    },
];

const PurchaseHistory = () => {
    const navigate = useNavigate();

    return (
        <div className="history-page">

            <Header />

            <main className="history-main">
                <section className="history-container">

                    <h1 className="history-title">Historial de compras</h1>

                    {mockHistorial.length === 0 ? (
                        <p className="history-empty">No tienes compras registradas.</p>
                    ) : (
                        mockHistorial.map((compra) => (
                            <div key={compra.id_compra} className="history-card">

                                <div className="history-card-header">
                                    <span className="history-date">{compra.fecha}</span>
                                    <span className="history-total">${compra.total.toLocaleString('es-CO')}</span>
                                </div>

                                <div className="history-details">
                                    {compra.detalles.map((detalle) => (
                                        <div key={detalle.id_detalle} className="history-detail-item">
                                            <span className="history-detail-label">Cantidad</span>
                                            <span className="history-detail-value">{detalle.cantidad}</span>

                                            <span className="history-detail-label">Precio por ficho</span>
                                            <span className="history-detail-value">${detalle.ficho.precio.toLocaleString('es-CO')}</span>

                                            <span className="history-detail-label">Estado</span>
                                            <span className={`history-status ${detalle.ficho.estado === 'usado' ? 'history-status--usado' : 'history-status--disponible'}`}>
                                                {detalle.ficho.estado}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))
                    )}

                </section>
            </main>

        </div>
    );
};

export default PurchaseHistory;