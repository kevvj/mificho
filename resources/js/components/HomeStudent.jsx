import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';
import { API_URL } from '../config';

const HomeStudent = () => {
  const navigate = useNavigate();
  const [recentHistory, setRecentHistory] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/')
      return
    }

    fetch(`${API_URL}/api/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id_usuario })
    })
      .then(res => res.json())
      .then(data => setRecentHistory(data.slice(0, 3)))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home-student">
      <Header></Header>
      <main className="main-content">

        <section className="welcome-section">
          <h1 className="welcome-title">Hola {JSON.parse(localStorage.getItem('user'))?.nombre}!</h1>
          <p className="welcome-text">Tu ficho de hoy está disponible</p>
        </section>

        <section className="ticket-section">
          <div className="qr-card">
            <div className="qr-container">
              <img className="qr-img" src="qrcode.png"></img>
            </div>
          </div>

          <div className="status-card">
            <h3 className="status-title">Estado del ficho</h3>
            <p className={`status-text ${recentHistory[0]?.detalle_compra[0]?.ficho?.estado === 'Disponible' ? 'status-available' : 'status-used'}`}>
              {recentHistory[0] ? recentHistory[0]?.detalle_compra[0]?.ficho?.estado : 'Sin ficho hoy'}
            </p>
            <p className="status-text">Fecha: {recentHistory[0]?.fecha ?? 'N/A'}</p>
            <p className="status-text">{recentHistory[0]?.cafeteria?.nombre ?? 'N/A'}</p>
          </div>
        </section>

        <section className="button-section">
          <button className="buy-button" onClick={() => navigate('/buyticket')}>
            Comprar ficho
          </button>
        </section>

        <section className="history-section">
          <h3 className="history-title">Historial reciente</h3>
          <div className="history-container">
            {recentHistory.length === 0 ? (
              <div className="history-item">No tienes compras recientes</div>
            ) : (
              recentHistory.map(item => (
                <div key={item.id_compra} className="history-item">
                  {item.fecha} - {item.detalle_compra[0]?.ficho?.estado} - {item.cafeteria?.nombre}
                </div>
              ))
            )}
          </div>
        </section>

      </main>
    </div>
  );
};

export default HomeStudent;