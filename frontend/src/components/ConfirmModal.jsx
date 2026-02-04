import { createPortal } from "react-dom";

function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
}) {
  if (!isOpen) return null;
  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      <div className="card p-4 shadow rounded-4" style={{ width: "350px" }}>
        <h5 className="mb-2">{title}</h5>
        <p className="text-muted small">{message}</p>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-sm btn-secondary" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn btn-sm btn-primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ConfirmModal;
