import Header from '../components/Header';

const HomeSeller = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const mockStats = [
        { label: 'Fichos vendidos hoy', value: 18 },
        { label: 'Total recaudado hoy', value: '$18.000' },
        { label: 'Fichos vendidos este mes', value: 142 },
    ];

    const mockRecentSales = [
        { id: 1, student: 'Kevin Tapias', cafeteria: 'Cafetería Central', time: '07:30', amount: '$1.000' },
        { id: 2, student: 'Danna Banda', cafeteria: 'Cafetería Central', time: '07:45', amount: '$1.000' },
        { id: 3, student: 'Dana Hernandez', cafeteria: 'Cafetería Laboratorios', time: '08:00', amount: '$1.000' },
    ];

    return (
        <div className="home-seller">
            <Header />
            <main className="seller-main">

                <section className="seller-welcome">
                    <h1 className="seller-title">Panel de Ventas</h1>
                    <p className="seller-subtitle">Gestiona la venta presencial de fichos</p>
                </section>

                <section className="seller-stats">
                    {mockStats.map((stat, i) => (
                        <div key={i} className="stat-card">
                            <span className="stat-number">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </section>

                <section className="seller-sell">
                    <h3 className="seller-sell-title">Vender ficho</h3>
                    <p className="seller-sell-subtitle">Ingresa el ID o correo del estudiante</p>
                    <div className="seller-sell-form">
                        <input className="seller-input" type="text" placeholder="ID o correo del estudiante" />
                        <button className="seller-button">Vender ficho</button>
                    </div>
                </section>

                <section className="seller-recent">
                    <h3 className="seller-recent-title">Ventas recientes</h3>
                    <div className="seller-recent-list">
                        {mockRecentSales.map(sale => (
                            <div key={sale.id} className="seller-sale-item">
                                <div className="seller-sale-info">
                                    <span className="seller-sale-student">{sale.student}</span>
                                    <span className="seller-sale-cafeteria">{sale.cafeteria}</span>
                                </div>
                                <span className="seller-sale-time">{sale.time}</span>
                                <span className="seller-sale-amount">{sale.amount}</span>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default HomeSeller;