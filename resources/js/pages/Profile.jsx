import Header from '../components/Header';
import { useState } from 'react';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [name, setName] = useState(user?.nombre || 'Kevin Tapias');
    const [email, setEmail] = useState(user?.correo || 'kevin@universidad.edu.co');
    const [editing, setEditing] = useState(false);

    const handleSave = () => {
        setEditing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div className="profile-page">
            <Header />
            <main className="profile-main">

                <section className="profile-welcome">
                    <h1 className="profile-title">Mi Perfil</h1>
                    <p className="profile-subtitle">Gestiona tu información personal</p>
                </section>

                <section className="profile-card">
                    <div className="profile-avatar">
                        <span className="avatar-initials">{name.charAt(0).toUpperCase()}</span>
                    </div>

                    <div className="profile-info">

                        <div className="profile-field">
                            <label className="profile-label">Nombre</label>
                            {editing ? (
                                <input
                                    className="profile-input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            ) : (
                                <span className="profile-value">{name}</span>
                            )}
                        </div>

                        <div className="profile-field">
                            <label className="profile-label">Correo</label>
                            {editing ? (
                                <input
                                    className="profile-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            ) : (
                                <span className="profile-value">{email}</span>
                            )}
                        </div>

                        <div className="profile-field">
                            <label className="profile-label">Tipo de usuario</label>
                            <span className="profile-value profile-role">{user?.tipo_usuario || 'estudiante'}</span>
                        </div>

                    </div>

                    <div className="profile-actions">
                        {editing ? (
                            <>
                                <button className="profile-button save" onClick={handleSave}>Guardar</button>
                                <button className="profile-button cancel" onClick={() => setEditing(false)}>Cancelar</button>
                            </>
                        ) : (
                            <button className="profile-button edit" onClick={() => setEditing(true)}>Editar perfil</button>
                        )}
                    </div>

                </section>

                <section className="profile-logout-section">
                    <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
                </section>

            </main>
        </div>
    );
};

export default Profile;