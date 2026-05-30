import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Nequi from '../components/Nequi';
import { useState, useEffect } from 'react';
import CreditCard from '../components/CreditCard';
import PSE from '../components/PSE';
import PurchaseSuccess from '../components/PurchaseSuccess';
import ErrorAlert from '../components/Error';
import { API_URL } from '../config';
const BuyTicket = () => {
  const [openNequi, setOpenNequi] = useState(false);
  const [openCredicCard, setOpenCreditCard] = useState(false);
  const [openPSE, setOpenPSE] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(1)
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState("")

  const [amount, setAmount] = useState(1000)

  const navigate = useNavigate()

  const today = new Date().toISOString().split('T')[0];

  const [coffeeShops, setCoffeeShops] = useState([]);
  const [selectedCoffeeShop, setSelectedCoffeeShop] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/coffeestores`)
      .then(res => res.json())
      .then(data => {
        setCoffeeShops(data);
        setSelectedCoffeeShop(data[0]?.id_cafeteria);
      })
      .catch(err => console.log(err));
  }, []);

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

            <div className="ticket-info-item">
              <span className="ticket-label">Coffee Shop</span>
              <select
                className="cafeteria-select"
                value={selectedCoffeeShop}
                onChange={(e) => setSelectedCoffeeShop(Number(e.target.value))}
              >
                {coffeeShops.map(c => (
                  <option key={c.id_cafeteria} value={c.id_cafeteria}>
                    {c.nombre}
                  </option>
                ))}
              </select>
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


      <Nequi open={openNequi} setOpen={setOpenNequi} onSuccess={onSuccess} amount={amount} error={error} setError={setError} setShowError={setShowError} coffeeShopId ={selectedCoffeeShop}></Nequi>
      <CreditCard open={openCredicCard} setOpen={setOpenCreditCard} onSuccess={onSuccess} amount={amount} error={error} setError={setError} setShowError={setShowError} coffeeShopId ={selectedCoffeeShop}></CreditCard>
      <PSE open={openPSE} setOpen={setOpenPSE} onSuccess={onSuccess} amount={amount} setError={setError} error={error} setShowError={setShowError} coffeeShopId ={selectedCoffeeShop}></PSE>
      {purchaseSuccess && <PurchaseSuccess onContinue={onContinue}></PurchaseSuccess>}
      <ErrorAlert open={showError} setOpen={setShowError} message={error} onContinue={() => setShowError(false)}></ErrorAlert>
    </div>
  )
}

export default BuyTicket