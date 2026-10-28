// ===== FILE: src/components/common/Badge.jsx =====
// PURPOSE: small colored pill. Used for order status (Pending/Delivered/Cancelled) and user role (Admin/Customer)
export default function Badge({ status }) {
  return <span className={`badge badge--${status.toLowerCase()}`}>{status}</span>
}
