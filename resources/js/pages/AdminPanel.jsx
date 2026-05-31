import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const mockUsuarios = [
    { id_usuario: 1, nombre: 'Kevin Tapias', correo: 'kevin@universidad.edu.co', tipo_usuario: 'estudiante' },
    { id_usuario: 2, nombre: 'Danna Banda', correo: 'danna@universidad.edu.co', tipo_usuario: 'estudiante' },
    { id_usuario: 3, nombre: 'Dana Hernandez', correo: 'dana@universidad.edu.co', tipo_usuario: 'estudiante' },
    { id_usuario: 4, nombre: 'Jose Perez', correo: 'jose@universidad.edu.co', tipo_usuario: 'vendedor' },
    { id_usuario: 5, nombre: 'Alejandra Lopez', correo: 'alejandra@universidad.edu.co', tipo_usuario: 'validador' },
    { id_usuario: 6, nombre: 'Carlos Ruiz', correo: 'carlos@universidad.edu.co', tipo_usuario: 'estudiante' },
    { id_usuario: 7, nombre: 'Maria Garcia', correo: 'maria@universidad.edu.co', tipo_usuario: 'estudiante' },
    { id_usuario: 8, nombre: 'Luis Martinez', correo: 'luis@universidad.edu.co', tipo_usuario: 'estudiante' },
];

const mockFichos = [
    { id_ficho: 1, precio: 1000, estado: 'Disponible', fecha_creacion: '2026-05-30 07:30:00' },
    { id_ficho: 2, precio: 1000, estado: 'Usado', fecha_creacion: '2026-05-30 07:45:00' },
    { id_ficho: 3, precio: 1000, estado: 'Disponible', fecha_creacion: '2026-05-30 08:00:00' },
    { id_ficho: 4, precio: 1000, estado: 'Vencido', fecha_creacion: '2026-05-29 12:00:00' },
    { id_ficho: 5, precio: 1000, estado: 'Disponible', fecha_creacion: '2026-05-29 12:30:00' },
    { id_ficho: 6, precio: 1000, estado: 'Usado', fecha_creacion: '2026-05-28 07:30:00' },
    { id_ficho: 7, precio: 1000, estado: 'Disponible', fecha_creacion: '2026-05-28 08:00:00' },
    { id_ficho: 8, precio: 1000, estado: 'Usado', fecha_creacion: '2026-05-27 07:30:00' },
];

const mockCompras = [
    { id_compra: 1, total: 1000, fecha: '2026-05-30', id_usuario: 1, id_cafeteria: 1 },
    { id_compra: 2, total: 1000, fecha: '2026-05-30', id_usuario: 2, id_cafeteria: 2 },
    { id_compra: 3, total: 1000, fecha: '2026-05-29', id_usuario: 3, id_cafeteria: 1 },
    { id_compra: 4, total: 1000, fecha: '2026-05-29', id_usuario: 1, id_cafeteria: 2 },
    { id_compra: 5, total: 1000, fecha: '2026-05-28', id_usuario: 4, id_cafeteria: 1 },
    { id_compra: 6, total: 1000, fecha: '2026-05-28', id_usuario: 2, id_cafeteria: 2 },
    { id_compra: 7, total: 1000, fecha: '2026-05-27', id_usuario: 5, id_cafeteria: 1 },
    { id_compra: 8, total: 1000, fecha: '2026-05-27', id_usuario: 3, id_cafeteria: 2 },
];

const INITIAL_SHOW = 6;

const TablePanel = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [showUsuarios, setShowUsuarios] = useState(INITIAL_SHOW);
    const [showFichos, setShowFichos] = useState(INITIAL_SHOW);
    const [showCompras, setShowCompras] = useState(INITIAL_SHOW);
    const [fichos, setFichos] = useState(mockFichos);
    const [cafeterias, setCafeterias] = useState([
        { id_cafeteria: 1, nombre: 'Cafetería Central', ubicacion: 'Bloque A piso 1' },
        { id_cafeteria: 2, nombre: 'Cafetería Laboratorios', ubicacion: 'Bloque de Laboratorios piso 1' },
    ]);
    const [showAddCafeteria, setShowAddCafeteria] = useState(false);
    const [newCafeteria, setNewCafeteria] = useState({ nombre: '', ubicacion: '' });

    useEffect(() => {
        if (user?.tipo_usuario === 'estudiante' || !user) {
            navigate('/home');
        }
    }, []);

    const handleEstadoChange = (id, newEstado) => {
        setFichos(prev => prev.map(f => f.id_ficho === id ? { ...f, estado: newEstado } : f));
    };

    const handleAddCafeteria = () => {
        if (!newCafeteria.nombre || !newCafeteria.ubicacion) return;
        const newId = cafeterias.length + 1;
        setCafeterias(prev => [...prev, { id_cafeteria: newId, ...newCafeteria }]);
        setNewCafeteria({ nombre: '', ubicacion: '' });
        setShowAddCafeteria(false);
    };

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
                                    {mockUsuarios.slice(0, showUsuarios).map(u => (
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
                        {showUsuarios < mockUsuarios.length && (
                            <button className="panel-expand" onClick={() => setShowUsuarios(prev => prev + 6)}>
                                Ver más
                            </button>
                        )}
                    </section>

                    {/* Fichos */}
                    <section className="panel-table-section">
                        <h3 className="panel-table-title">Fichos</h3>
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
                                    {fichos.slice(0, showFichos).map(f => (
                                        <tr key={f.id_ficho}>
                                            <td>{f.id_ficho}</td>
                                            <td>${Number(f.precio).toLocaleString('es-CO')}</td>
                                            <td>
                                                <select
                                                    className="panel-select"
                                                    value={f.estado}
                                                    onChange={(e) => handleEstadoChange(f.id_ficho, e.target.value)}
                                                >
                                                    <option>Disponible</option>
                                                    <option>Usado</option>
                                                    <option>Vencido</option>
                                                </select>
                                            </td>
                                            <td>{f.fecha_creacion}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {showFichos < fichos.length && (
                            <button className="panel-expand" onClick={() => setShowFichos(prev => prev + 6)}>
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
                                    {mockCompras.slice(0, showCompras).map(c => (
                                        <tr key={c.id_compra}>
                                            <td>{c.id_compra}</td>
                                            <td>${Number(c.total).toLocaleString('es-CO')}</td>
                                            <td>{c.fecha}</td>
                                            <td>{c.id_usuario}</td>
                                            <td>{c.id_cafeteria}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {showCompras < mockCompras.length && (
                            <button className="panel-expand" onClick={() => setShowCompras(prev => prev + 6)}>
                                Ver más
                            </button>
                        )}
                    </section>

                    {/* Cafeterías */}
                    <section className="panel-table-section">
                        <div className="panel-table-header">
                            <h3 className="panel-table-title">Cafeterías</h3>
                            <button className="panel-add-button" onClick={() => setShowAddCafeteria(!showAddCafeteria)}>
                                {showAddCafeteria ? 'Cancelar' : '+ Agregar cafetería'}
                            </button>
                        </div>

                        {showAddCafeteria && (
                            <div className="panel-add-form">
                                <input
                                    className="panel-form-input"
                                    type="text"
                                    placeholder="Nombre de la cafetería"
                                    value={newCafeteria.nombre}
                                    onChange={(e) => setNewCafeteria(prev => ({ ...prev, nombre: e.target.value }))}
                                />
                                <input
                                    className="panel-form-input"
                                    type="text"
                                    placeholder="Ubicación"
                                    value={newCafeteria.ubicacion}
                                    onChange={(e) => setNewCafeteria(prev => ({ ...prev, ubicacion: e.target.value }))}
                                />
                                <button className="panel-form-submit" onClick={handleAddCafeteria}>
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
                                    {cafeterias.map(c => (
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