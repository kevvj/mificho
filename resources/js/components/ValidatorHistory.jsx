import Header from './Header';
import { useState, useEffect } from 'react';
import { apiFetch } from '../config';

const ValidatorHistory = () => {
    const [validations, setValidations] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    async function loadValidations(currentOffset) {
        setLoading(true);
        const res = await apiFetch(`/api/allValidations?offset=${currentOffset}`);
        const data = await res.json();
        setLoading(false);
        if (!Array.isArray(data)) return;
        if (data.length < 10) setHasMore(false);
        setValidations(prev => [...prev, ...data]);
        setOffset(currentOffset + data.length);
    }

    useEffect(() => {
        loadValidations(0);
    }, []);

    return (
        <div className="validator-history-page">
            <Header />
            <main className="validator-history-main">

                <section className="validator-history-welcome">
                    <h1 className="validator-history-title">Historial de validaciones</h1>
                    <p className="validator-history-subtitle">Registro de todos los fichos validados</p>
                </section>

                <section className="validator-history-container">
                    {validations.length === 0 && !loading ? (
                        <p className="validator-history-empty">No hay validaciones registradas.</p>
                    ) : (
                        validations.map(v => (
                            <div key={v.id_validacion} className="validator-history-item">
                                <div className="validator-history-info">
                                    <span className="validator-history-student">Ficho #{v.id_ficho}</span>
                                    <span className="validator-history-cafeteria">{v.cafeteria}</span>
                                    <span className="validator-history-date">{v.fecha}</span>
                                </div>
                                <span className="validator-history-status status-valid">
                                    Válido
                                </span>
                            </div>
                        ))
                    )}

                    {loading && <p className="validator-history-empty">Cargando...</p>}

                    {!loading && hasMore && (
                        <button className="seller-button" onClick={() => loadValidations(offset)}>
                            Cargar más
                        </button>
                    )}
                </section>

            </main>
        </div>
    );
};

export default ValidatorHistory;