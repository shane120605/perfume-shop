// ===== FILE: src/components/common/ConfirmDialog.jsx =====
// PURPOSE: the "Delete ...?" popup (Figma A3d Delete Product + A5c Delete User)
import Icon from './Icon'
import Button from './Button'

export default function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="dlg-title" onClick={(e) => e.stopPropagation()}>
        <div className="modal__icon"><Icon name="alert" size={28} color="#B84A4A" /></div>
        <h2 id="dlg-title" className="serif">{title}</h2>
        <p>{message}</p>
        <div className="modal__actions">
          <Button kind="outline" onClick={onCancel}>Cancel</Button>
          <Button kind="danger" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  )
}
