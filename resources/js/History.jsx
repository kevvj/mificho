import { useNavigate } from 'react-router-dom';
import Header from './Header';
const PurchaseHistory = () => {
    const navigate = useNavigate();

    return (
        <div className="buy-ticket-page">

                  <Header></Header>


            <main className="buy-ticket-main">
                <section className="buy-ticket-container">

                    <h1 className="buy-ticket-title">Historial de compras</h1>

                    {mockHistorial.length === 0 ? (
                        <p className="buy-ticket-subtitle">No tienes compras registradas.</p>
                    ) : (
                        mockHistorial.map((compra) => (
                            <div key={compra.id_compra} className="buy-ticket-card" style={{ marginBottom: '1rem' }}>

                                <div className="ticket-info">

                                    <div className="ticket-info-item">
                                        <span className="ticket-label">Fecha</span>
                                        <span className="ticket-value">{compra.fecha}</span>
                                    </div>

                                    <div className="ticket-info-item">
                                        <span className="ticket-label">Total</span>
                                        <span className="ticket-value">${compra.total.toLocaleString('es-CO')}</span>
                                    </div>

                                    {compra.detalles.map((detalle) => (
                                        <div key={detalle.id_detalle}>
                                            <div className="ticket-info-item">
                                                <span className="ticket-label">Cantidad de fichos</span>
                                                <span className="ticket-value">{detalle.cantidad}</span>
                                            </div>
                                            <div className="ticket-info-item">
                                                <span className="ticket-label">Precio por ficho</span>
                                                <span className="ticket-value">${detalle.ficho.precio.toLocaleString('es-CO')}</span>
                                            </div>
                                            <div className="ticket-info-item">
                                                <span className="ticket-label">Estado</span>
                                                <span className={`ticket-value ${detalle.ficho.estado === 'usado' ? '' : 'available'}`}>
                                                    {detalle.ficho.estado}
                                                </span>
                                            </div>
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

export default PurchaseHistory;