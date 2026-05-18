const HomeStudent = () => {
  return (
    <div className="home-student">

      <header className="header">

        <div className="logo-container">
          <h2 className="logo">MiFicho</h2>
        </div>

        <nav className="nav">
          <a className="nav-link" href="#">Inicio</a>
          <a className="nav-link" href="#">Historial</a>
          <a className="nav-link" href="#">Perfil</a>
        </nav>

      </header>

      <main className="main-content">

        <section className="welcome-section">
          <h1 className="welcome-title">Hola Kevin 👋</h1>
          <p className="welcome-text">
            Tu ficho de hoy está disponible
          </p>
        </section>

        <section className="ticket-section">

          <div className="qr-card">

            <div className="qr-container">
              QR
            </div>

          </div>

          <div className="status-card">

            <h3 className="status-title">
              Estado del ficho
            </h3>

            <p className="status-text">✅ Disponible</p>

            <p className="status-text">
              Fecha: 17/05/2026
            </p>

            <p className="status-text">
              Cafetería Central
            </p>

          </div>

        </section>

        <section className="button-section">

          <button className="buy-button">
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