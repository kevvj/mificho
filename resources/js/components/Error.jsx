const ErrorAlert = ({ message, onContinue, open, setOpen }) => {
    return (
        <>
            {open && (
                <div className="error-overlay">
                    <div className="error-modal">
                        <p className="error-message">{message}</p>
                        <button className="error-button" onClick={onContinue}>
                            Continuar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ErrorAlert;