import Header from '../components/Header';

const HomeValidator = () => {
    const recentValidations = [
        { id: 1, student: 'Kevin Tapias', cafeteria: 'Cafetería Central', time: '07:30', status: 'Válido' },
        { id: 2, student: 'Danna Banda', cafeteria: 'Cafetería Central', time: '07:45', status: 'Válido' },
        { id: 3, student: 'Dana Hernandez', cafeteria: 'Cafetería Laboratorios', time: '08:00', status: 'Inválido' },
    ];

    return (
        <div className="home-validator">
            <Header />
            <main className="validator-main">

                <section className="validator-welcome">
                    <h1 className="validator-title">Panel de Validación</h1>
                    <p className="validator-subtitle">Escanea el código QR del estudiante para validar su ficho</p>
                </section>

                <section className="validator-stats">
                    <div className="stat-card">
                        <span className="stat-number">24</span>
                        <span className="stat-label">Fichos validados hoy</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">2</span>
                        <span className="stat-label">Fichos inválidos</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">12</span>
                        <span className="stat-label">Fichos disponibles</span>
                    </div>
                </section>

                <section className="validator-scanner">
                    <h3 className="scanner-title">Escanear QR</h3>
                    <div className="scanner-box">
                        <div className="scanner-placeholder">
                            <p>📷</p>
                            <p className="scanner-text">Cámara desactivada</p>
                        </div>
                        <button className="scanner-button">Activar cámara</button>
                    </div>
                </section>

                <section className="validator-history">
                    <h3 className="validator-history-title">Validaciones recientes</h3>
                    <div className="validator-history-list">
                        {recentValidations.map(v => (
                            <div key={v.id} className="validation-item">
                                <span className="validation-student">{v.student}</span>
                                <span className="validation-cafeteria">{v.cafeteria}</span>
                                <span className="validation-time">{v.time}</span>
                                <span className={`validation-status ${v.status === 'Válido' ? 'status-valid' : 'status-invalid'}`}>
                                    {v.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default HomeValidator;