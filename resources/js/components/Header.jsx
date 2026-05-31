import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <header className="header">

            <div className="logo-container">
                <h2 className="logo" onClick={() => navigate('/home')}>MiFicho</h2>
            </div>

            <nav className="nav">
                <a className="nav-link" href="/home">Inicio</a>
                <a className="nav-link" href="/history">Historial</a>
                {(user?.tipo_usuario === 'vendedor' || user?.tipo_usuario === 'validador') && (
                    <a className="nav-link" onClick={() => navigate('/adminpanel')}>Panel</a>
                )}
                <a className="nav-link" onClick={() => navigate('/profile')}>Perfil</a>
            </nav>

        </header>
    )
}
export default Header