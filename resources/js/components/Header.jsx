import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">

            <div className="logo-container">
                <h2 className="logo" onClick={() => navigate('/home')}>MiFicho</h2>
            </div>

            <nav className="nav">
                <a className="nav-link" href="home">Inicio</a>
                <a className="nav-link" href="history" >Historial</a>
                <a className="nav-link" href="" onClick={() => navigate('/')}>Perfil</a>
            </nav>

        </header>
    )
}
export default Header