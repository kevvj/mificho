import { useNavigate } from 'react-router-dom';
const BuyTicket = () => {
  const navigate = useNavigate()
  return (
    <div className="buy-ticket-page">

      <header className="header">

        <div className="logo-container">
          <h2 className="logo">MiFicho</h2>
        </div>

        <nav className="nav">
          <a className="nav-link" href="#">Inicio</a>
          <a className="nav-link" href="#">Historial</a>
          <a className="nav-link" href="#" onClick={() => navigate('/')}>Perfil</a>
        </nav>

      </header>

      <main className="buy-ticket-main">

        <section className="buy-ticket-container">

          <div className="buy-ticket-card">

            <h1 className="buy-ticket-title">
              Comprar ficho
            </h1>

            <p className="buy-ticket-subtitle">
              Compra tu ficho de comida del día
            </p>

            <div className="ticket-info">

              <div className="ticket-info-item">
                <span className="ticket-label">
                  Precio
                </span>

                <span className="ticket-value">
                  $5.000
                </span>
              </div>

              <div className="ticket-info-item">
                <span className="ticket-label">
                  Fecha
                </span>

                <span className="ticket-value">
                  18/05/2026
                </span>
              </div>

              <div className="ticket-info-item">
                <span className="ticket-label">
                  Estado
                </span>

                <span className="ticket-value available">
                  Disponible para compra
                </span>
              </div>

            </div>

            <div className="payment-methods">

              <h3 className="payment-title">
                Método de pago
              </h3>

              <div className="payment-options">

                <button className="payment-button">
                  Nequi
                </button>

                <button className="payment-button">
                  Tarjeta
                </button>

                <button className="payment-button">
                  PSE
                </button>

              </div>

            </div>

            <button className="confirm-button" onClick={() => navigate('/home')}>
              Confirmar compra
            </button>

          </div>

        </section>

      </main>

    </div>
  )
}

export default BuyTicket