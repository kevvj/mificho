import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Nequi from './Nequi';
import { useState } from 'react';
import CreditCard from './CreditCard';
import PSE from './PSE';
import PurchaseSuccess from './PurchaseSuccess';
const BuyTicket = () => {
  const [openNequi, setOpenNequi] = useState(false);
  const [openCredicCard, setOpenCreditCard] = useState(false);
  const [openPSE, setOpenPSE] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(1)
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const navigate = useNavigate()

  const today = new Date().toISOString().split('T')[0];

  const handleButton = () => {
    if (selectedMethod === 0) {
      setOpenNequi(true)
    }

    if (selectedMethod === 1) {
      setOpenCreditCard(true)
    }

    if (selectedMethod === 2) {
      setOpenPSE(true)
    }
  }

  const onSuccess = () => {
    setPurchaseSuccess(true)
    console.log(purchaseSuccess)
  }

  const onContinue = () => {
    setPurchaseSuccess(false)
  }


  return (
    <div className="buy-ticket-page">

      <Header></Header>


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
                  $1.000
                </span>
              </div>

              <div className="ticket-info-item">
                <span className="ticket-label">
                  Fecha
                </span>

                <span className="ticket-value">
                  {today}
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

                <button className={selectedMethod === 0 ? "payment-button selected" : "payment-button"} onClick={() => setSelectedMethod(0)}>
                  Nequi
                </button>

                <button className={selectedMethod === 1 ? "payment-button selected" : "payment-button"} onClick={() => setSelectedMethod(1)}>
                  Tarjeta
                </button>

                <button className={selectedMethod === 2 ? "payment-button selected" : "payment-button"} onClick={() => setSelectedMethod(2)}>
                  PSE
                </button>




              </div>

            </div>

            <button className="confirm-button" onClick={() => handleButton()}>
              Pagar
            </button>

          </div>

        </section>

      </main>


      <Nequi open={openNequi} setOpen={setOpenNequi} onSuccess={onSuccess}></Nequi>
      <CreditCard open={openCredicCard} setOpen={setOpenCreditCard} onSuccess={onSuccess}></CreditCard>
      <PSE open={openPSE} setOpen={setOpenPSE} onSuccess={onSuccess}></PSE>
      {purchaseSuccess && <PurchaseSuccess onContinue={onContinue}></PurchaseSuccess>}
    </div>
  )
}

export default BuyTicket