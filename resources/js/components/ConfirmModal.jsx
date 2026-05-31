// ConfirmModal.jsx
export default function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <p className="modal-message">{message}</p>
                <div className="modal-buttons">
                    <button className="modal-cancel" onClick={onCancel}>Cancelar</button>
                    <button className="modal-confirm" onClick={onConfirm}>Continuar</button>
                </div>
            </div>
        </div>
    );
}