import Header from '../components/Header';

const SellerHistory = () => {
    const mockSales = [
        { id: 1, student: 'Kevin Tapias', cafeteria: 'Cafetería Central', date: '2026-05-30 07:30:00', amount: '$1.000' },
        { id: 2, student: 'Danna Banda', cafeteria: 'Cafetería Central', date: '2026-05-30 07:45:00', amount: '$1.000' },
        { id: 3, student: 'Dana Hernandez', cafeteria: 'Cafetería Laboratorios', date: '2026-05-30 08:00:00', amount: '$1.000' },
        { id: 4, student: 'Jose Perez', cafeteria: 'Cafetería Central', date: '2026-05-29 12:00:00', amount: '$1.000' },
        { id: 5, student: 'Alejandra Lopez', cafeteria: 'Cafetería Laboratorios', date: '2026-05-29 12:30:00', amount: '$1.000' },
    ];

    return (
        <div className="seller-history-page">
            <Header />
            <main className="seller-history-main">

                <section className="seller-history-welcome">
                    <h1 className="seller-history-title">Historial de ventas</h1>
                    <p className="seller-history-subtitle">Registro de todos los fichos vendidos</p>
                </section>

                <section className="seller-history-container">
                    {mockSales.length === 0 ? (
                        <p className="seller-history-empty">No hay ventas registradas.</p>
                    ) : (
                        mockSales.map(sale => (
                            <div key={sale.id} className="seller-history-item">
                                <div className="seller-history-info">
                                    <span className="seller-history-student">{sale.student}</span>
                                    <span className="seller-history-cafeteria">{sale.cafeteria}</span>
                                    <span className="seller-history-date">{sale.date}</span>
                                </div>
                                <span className="seller-history-amount">{sale.amount}</span>
                            </div>
                        ))
                    )}
                </section>

            </main>
        </div>
    );
};

export default SellerHistory;