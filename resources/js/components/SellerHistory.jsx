import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { apiFetch } from '../config';

const SellerHistory = () => {
    const [sales, setSales] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    async function loadSales(currentOffset) {
        setLoading(true);
        const res = await apiFetch(`/api/allSales?offset=${currentOffset}`);
        const data = await res.json();
        setLoading(false);
        if (!res.ok || !Array.isArray(data)) return;
        if (data.length < 10) setHasMore(false);
        setSales(prev => [...prev, ...data]);
        setOffset(currentOffset + data.length);
    }
    
    useEffect(() => {
        loadSales(0);
    }, []);

    return (
        <div className="seller-history-page">
            <Header />
            <main className="seller-history-main">

                <section className="seller-history-welcome">
                    <h1 className="seller-history-title">Historial de ventas</h1>
                    <p className="seller-history-subtitle">Registro de todos los fichos vendidos</p>
                </section>

                <section className="seller-history-container">
                    {sales.length === 0 && !loading ? (
                        <p className="seller-history-empty">No hay ventas registradas.</p>
                    ) : (
                        sales.map(sale => (
                            <div key={sale.id_compra} className="seller-history-item">
                                <div className="seller-history-info">
                                    <span className="seller-history-student">{sale.nombre}</span>
                                    <span className="seller-history-cafeteria">{sale.cafeteria}</span>
                                    <span className="seller-history-date">{sale.fecha}</span>
                                </div>
                                <span className="seller-history-amount">${sale.total.toLocaleString('es-CO')}</span>
                            </div>
                        ))
                    )}

                    {loading && <p className="seller-history-empty">Cargando...</p>}

                    {!loading && hasMore && (
                        <button className="seller-button" onClick={() => loadSales(offset)}>
                            Cargar más
                        </button>
                    )}
                </section>

            </main>
        </div>
    );
};

export default SellerHistory;