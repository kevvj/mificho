import Header from './Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ValidatorHistory = () => {
    const navigate = useNavigate();

    const mockValidations = [
        { id: 1, student: 'Kevin Tapias', cafeteria: 'Cafetería Central', date: '2026-05-30 07:30:00', status: 'Válido' },
        { id: 2, student: 'Danna Banda', cafeteria: 'Cafetería Central', date: '2026-05-30 07:45:00', status: 'Válido' },
        { id: 3, student: 'Dana Hernandez', cafeteria: 'Cafetería Laboratorios', date: '2026-05-30 08:00:00', status: 'Inválido' },
        { id: 4, student: 'Jose Perez', cafeteria: 'Cafetería Central', date: '2026-05-29 12:00:00', status: 'Válido' },
        { id: 5, student: 'Alejandra Lopez', cafeteria: 'Cafetería Laboratorios', date: '2026-05-29 12:30:00', status: 'Válido' },
    ];

    return (
        <div className="validator-history-page">
            <Header />
            <main className="validator-history-main">

                <section className="validator-history-welcome">
                    <h1 className="validator-history-title">Historial de validaciones</h1>
                    <p className="validator-history-subtitle">Registro de todos los fichos validados</p>
                </section>

                <section className="validator-history-container">
                    {mockValidations.length === 0 ? (
                        <p className="validator-history-empty">No hay validaciones registradas.</p>
                    ) : (
                        mockValidations.map(v => (
                            <div key={v.id} className="validator-history-item">
                                <div className="validator-history-info">
                                    <span className="validator-history-student">{v.student}</span>
                                    <span className="validator-history-cafeteria">{v.cafeteria}</span>
                                    <span className="validator-history-date">{v.date}</span>
                                </div>
                                <span className={`validator-history-status ${v.status === 'Válido' ? 'status-valid' : 'status-invalid'}`}>
                                    {v.status}
                                </span>
                            </div>
                        ))
                    )}
                </section>

            </main>
        </div>
    );
};

export default ValidatorHistory;