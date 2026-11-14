import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../config';


const INITIAL_SHOW = 6;

const TablePanel = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [showCompras, setShowCompras] = useState(INITIAL_SHOW);
    const [cafeterias, setCafeterias] = useState([
        { id_cafeteria: 1, nombre: 'Cafetería Central', ubicacion: 'Bloque A piso 1' },
        { id_cafeteria: 2, nombre: 'Cafetería Laboratorios', ubicacion: 'Bloque de Laboratorios piso 1' },
    ]);
    const [showAddCafeteria, setShowAddCafeteria] = useState(false);
    const [newCafeteria, setNewCafeteria] = useState({ nombre: '', ubicacion: '' });

    const [showUsers, setShowUsers] = useState(INITIAL_SHOW);
    const [users, setUsers] = useState([]);

    const [tickets, setTickets] = useState([]);
    const [showTickets, setShowTickets] = useState(INITIAL_SHOW);

    const [purchases, setPurchases] = useState([]);
    const [showPurchases, setShowPurchases] = useState(INITIAL_SHOW);

    const [showAddCoffeeShop, setShowAddCoffeeShop] = useState(false);
    const [newCoffeeShop, setNewCoffeeShop] = useState({ name: '', location: '' });

    const [coffeeShops, setCoffeeShops] = useState([]);
    useEffect(() => {
        apiFetch(`/api/users`)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    useEffect(() => {
        apiFetch(`/api/fichos`)
            .then(res => res.json())
            .then(data => setTickets(data));
    }, []);

    useEffect(() => {
        apiFetch(`/api/allPurchases`)
            .then(res => res.json())
            .then(data => setPurchases(data));
    }, []);

    useEffect(() => {
        apiFetch(`/api/coffeestores`)
            .then(res => res.json())
            .then(data => setCoffeeShops(data));
    }, []);

    useEffect(() => {
        if (user?.tipo_usuario === 'estudiante' || !user) {
            navigate('/home');
        }
    }, []);

    const handleStatusChange = (id, newStatus) => {
        setTickets(prev => prev.map(t => t.id_ficho === id ? { ...t, estado: newStatus } : t));

        apiFetch(`/api/updateTicket`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus })
        });
    };



    async function handleAddCoffeeShop() {
        if (!newCoffeeShop.name || !newCoffeeShop.location) return;
        const res = await apiFetch(`/api/insertCoff`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newCoffeeShop.name, location: newCoffeeShop.location })
        });
        if (!res.ok) return;
        setNewCoffeeShop({ name: '', location: '' });
        setShowAddCoffeeShop(false);
        apiFetch(`/api/coffeestores`)
            .then(res => res.json())
            .then(data => setCoffeeShops(data));
    }

    async function handleInvalidateOld() {
        const res = await apiFetch(`/api/invalidateOld`, { method: 'POST' });
        const data = await res.json();
        if (!res.ok) return;
        apiFetch(`/api/fichos`)
            .then(res => res.json())
            .then(data => setTickets(data));
    }

    return (
        <>
            <Header></Header>
            <div className="panel-page">
                <main className="panel-main">

                    <section className="panel-welcome">
                        <h1 className="panel-title">Panel de control</h1>
                        <p className="panel-subtitle">Visualiza y gestiona la información del sistema</p>
                    </section>

                    {/* Usuarios */}
                    <section className="panel-table-section">
                        <h3 className="panel-table-title">Usuarios</h3>
                        <div className="panel-table-wrapper">
                            <table className="panel-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Tipo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.slice(0, showUsers).map(u => (
                                        <tr key={u.id_usuario}>
                                            <td>{u.id_usuario}</td>
                                            <td>{u.nombre}</td>
                                            <td>{u.correo}</td>
                                            <td><span className={`panel-badge panel-badge--${u.tipo_usuario}`}>{u.tipo_usuario}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {showUsers < users.length && (
                            <button className="panel-expand" onClick={() => setShowUsers(prev => prev + 6)}>
                                Ver más
                            </button>
                        )}
                    </section>

                    {/* Fichos */}
                    <section className="panel-table-section">
                        <div className="panel-table-header">
                            <h3 className="panel-table-title">Fichos</h3>
                            <button className="panel-add-button" onClick={handleInvalidateOld}>
                                Invalidar vencidos
                            </button>
                        </div>
                        <div className="panel-table-wrapper">
                            <table className="panel-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Precio</th>
                                        <th>Estado</th>
                                        <th>Fecha creación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.slice(0, showTickets).map(t => (
                                        <tr key={t.id_ficho}>
                                            <td>{t.id_ficho}</td>
                                            <td>${Number(t.precio).toLocaleString('es-CO')}</td>
                                            <td>
                                                <select
                                                    className="panel-select"
                                                    value={t.estado}
                                                    onChange={(e) => handleStatusChange(t.id_ficho, e.target.value)}
                                                >
                                                    <option>Disponible</option>
                                                    <option>Usado</option>
                                                    <option>Vencido</option>
                                                </select>
                                            </td>
                                            <td>{t.fecha_creacion}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {showTickets < tickets.length && (
                            <button className="panel-expand" onClick={() => setShowTickets(prev => prev + 6)}>
                                Ver más
                            </button>
                        )}
                    </section>

                    {/* Compras */}
                    <section className="panel-table-section">
                        <h3 className="panel-table-title">Compras</h3>
                        <div className="panel-table-wrapper">
                            <table className="panel-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Total</th>
                                        <th>Fecha</th>
                                        <th>ID Usuario</th>
                                        <th>ID Cafetería</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchases.slice(0, showPurchases).map(p => (
                                        <tr key={p.id_compra}>
                                            <td>{p.id_compra}</td>
                                            <td>${Number(p.total).toLocaleString('es-CO')}</td>
                                            <td>{p.fecha}</td>
                                            <td>{p.id_usuario}</td>
                                            <td>{p.id_cafeteria}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {showPurchases < purchases.length && (
                            <button className="panel-expand" onClick={() => setShowPurchases(prev => prev + 6)}>
                                Ver más
                            </button>
                        )}
                    </section>

                    {/* Cafeterías */}
                    <section className="panel-table-section">
                        <div className="panel-table-header">
                            <h3 className="panel-table-title">Cafeterías</h3>
                            <button className="panel-add-button" onClick={() => setShowAddCoffeeShop(!showAddCoffeeShop)}>
                                {showAddCoffeeShop ? 'Cancelar' : '+ Agregar cafetería'}
                            </button>
                        </div>

                        {showAddCoffeeShop && (
                            <div className="panel-add-form">
                                <input
                                    className="panel-form-input"
                                    type="text"
                                    placeholder="Nombre de la cafetería"
                                    value={newCoffeeShop.name}
                                    onChange={(e) => setNewCoffeeShop(prev => ({ ...prev, name: e.target.value }))}
                                />
                                <input
                                    className="panel-form-input"
                                    type="text"
                                    placeholder="Ubicación"
                                    value={newCoffeeShop.location}
                                    onChange={(e) => setNewCoffeeShop(prev => ({ ...prev, location: e.target.value }))}
                                />
                                <button className="panel-form-submit" onClick={handleAddCoffeeShop}>
                                    Guardar
                                </button>
                            </div>
                        )}

                        <div className="panel-table-wrapper">
                            <table className="panel-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Ubicación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coffeeShops.map(c => (
                                        <tr key={c.id_cafeteria}>
                                            <td>{c.id_cafeteria}</td>
                                            <td>{c.nombre}</td>
                                            <td>{c.ubicacion}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default TablePanel;

