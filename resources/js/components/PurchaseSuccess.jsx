const PurchaseSuccess = ({ onContinue }) => {
    return (
        <div className="success-overlay">
            <div className="success-card">

                <div className="success-icon">✓</div>

                <h1 className="success-title">¡Compra exitosa!</h1>

                <p className="success-subtitle">
                    Tu ficho ha sido comprado correctamente.
                </p>

                <button className="success-button" onClick={onContinue}>
                    Continuar
                </button>

            </div>
        </div>
    );
};

export default PurchaseSuccess;