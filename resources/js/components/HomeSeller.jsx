import Header from '../components/Header';
import { useState, useEffect } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import { apiFetch } from '../config';

const HomeSeller = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [query, setQuery] = useState('');
    const [foundUser, setFoundUser] = useState(null);
    const [coffeeShops, setCoffeeShops] = useState([]);
    const [selectedCoffeeShop, setSelectedCoffeeShop] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [recentSales, setRecentSales] = useState([]);

    useEffect(() => {
        apiFetch(`/api/recentSales`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setRecentSales(data);
            });
    }, []);

    useEffect(() => {
        apiFetch(`/api/coffeestores`)
            .then(res => res.json())
            .then(data => setCoffeeShops(data));
    }, []);

    async function handleFindUser() {
        setError('');
        setFoundUser(null);
        setSuccessMessage('');
        if (!query.trim()) return setError('Ingresa un ID o correo');
        const res = await apiFetch(`/api/findUser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await res.json();
        if (!res.ok) return setError(data.error);
        setFoundUser(data);
    }

    function handleOpenModal() {
        setError('');
        if (!foundUser) return setError('Primero busca un estudiante');
        if (!selectedCoffeeShop) return setError('Selecciona una cafetería');
        setShowModal(true);
    }

    function handleCancel() {
        setShowModal(false);
    }

    async function handleConfirm() {
        setShowModal(false);
        setLoading(true);
        const res = await apiFetch(`/api/insertPay`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: foundUser.id_usuario,
                amount: 1000,
                date: new Date().toLocaleString('sv-SE'),
                coffeeShopId: selectedCoffeeShop
            })
        });
        const data = await res.json();
        setLoading(false);
        if (!res.ok) return setError(data.error);
        setSuccessMessage(`Ficho vendido exitosamente a ${foundUser.nombre}`);
        setFoundUser(null);
        setQuery('');
        setSelectedCoffeeShop('');

        apiFetch(`/api/recentSales`)
            .then(res => res.json())
            .then(data => setRecentSales(data));
    }

    return (
        <div className="home-seller">
            <Header />
            <main className="seller-main">

                <section className="seller-welcome">
                    <h1 className="seller-title">Panel de Ventas</h1>
                    <p className="seller-subtitle">Gestiona la venta presencial de fichos</p>
                </section>

                <section className="seller-sell">
                    <h3 className="seller-sell-title">Vender ficho</h3>
                    <p className="seller-sell-subtitle">Ingresa el ID o correo del estudiante</p>

                    <div className="seller-sell-form">
                        <input
                            className="seller-input"
                            type="text"
                            placeholder="ID o correo del estudiante"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleFindUser()}
                        />
                        <button className="seller-button-search" onClick={handleFindUser}>
                            Buscar
                        </button>
                    </div>

                    {foundUser && (
                        <div className="seller-found-user">
                            <span className="seller-found-label">Estudiante encontrado:</span>
                            <span className="seller-found-name">{foundUser.nombre}</span>
                            <span className="seller-found-email">{foundUser.correo}</span>
                        </div>
                    )}

                    {foundUser && (
                        <div className="seller-cafeteria-row">
                            <select
                                className="seller-input"
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
                            <button className="seller-button" onClick={handleOpenModal} disabled={loading}>
                                {loading ? 'Procesando...' : 'Vender ficho'}
                            </button>
                        </div>
                    )}

                    {error && <p className="seller-error">{error}</p>}
                    {successMessage && <p className="seller-success">{successMessage}</p>}
                </section>

                <section className="seller-recent">
                    <h3 className="seller-recent-title">Ventas recientes</h3>
                    <div className="seller-recent-list">
                        {recentSales.map(sale => (
                            <div key={sale.id_compra} className="seller-sale-item">
                                <div className="seller-sale-info">
                                    <span className="seller-sale-student">{sale.nombre}</span>
                                    <span className="seller-sale-cafeteria">{sale.cafeteria}</span>
                                </div>
                                <span className="seller-sale-time">{sale.fecha}</span>
                                <span className="seller-sale-amount">${sale.total.toLocaleString('es-CO')}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {showModal && (
                    <ConfirmModal
                        message="¿Seguro que quieres continuar? Recuerda que una vez vendas este ficho, el estudiante no podrá comprar otro ficho más por hoy."
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                )}

            </main>
        </div>
    );
};


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

export default HomeSeller;