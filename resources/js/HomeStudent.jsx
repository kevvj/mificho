import { useNavigate } from 'react-router-dom';
import Header from './Header';
const HomeStudent = () => {
  const navigate = useNavigate()
  return (
    <div className="home-student">

      
      <Header></Header>

      <main className="main-content">

        <section className="welcome-section">
          <h1 className="welcome-title">Hola Kevin!</h1>
          <p className="welcome-text">
            Tu ficho de hoy está disponible
          </p>
        </section>

        <section className="ticket-section">

          <div className="qr-card">

            <div className="qr-container">
              <img className="qr-img" src="qrcode.png"></img>
            </div>

          </div>

          <div className="status-card">

            <h3 className="status-title">
              Estado del ficho
            </h3>

            <p className="status-text">✅ Disponible</p>

            <p className="status-text">
              Fecha: 18/05/2026
            </p>

            <p className="status-text">
              Cafetería Central
            </p>

          </div>

        </section>

        <section className="button-section">

          <button className="buy-button" onClick={() => navigate('/buyticket')}>
            Comprar ficho
          </button>

        </section>

        <section className="history-section">

          <h3 className="history-title">
            Historial reciente
          </h3>

          <div className="history-container">

            <p className="history-item">
              16/05/2026 - Usado - Cafetería Central
            </p>

            <p className="history-item">
              15/05/2026 - Usado - Cafetería Ingeniería
            </p>

          </div>

        </section>

      </main>

    </div>
  )
}

export default HomeStudent