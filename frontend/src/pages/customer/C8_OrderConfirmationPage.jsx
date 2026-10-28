// ===== FILE: src/pages/customer/C8_OrderConfirmationPage.jsx =====
// FIGMA FRAME: C8 · Order Confirmation   |   URL: /order-confirmation
// Shows order number + total. "Back to Home" -> C3, "View My Orders" -> C9
import { Navigate, useLocation } from 'react-router-dom'
import Navbar from '../../components/customer/Navbar'
import Button from '../../components/common/Button'
import Icon from '../../components/common/Icon'
import { money } from '../../utils/format'

export default function C8_OrderConfirmationPage() {
  const { state } = useLocation()
  const order = state?.order
  if (!order) return <Navigate to="/" replace /> // opened directly without placing an order

  return (
    <div className="page">
      <Navbar />
      <main className="confirm">
        <div className="confirm__check"><Icon name="check" size={48} color="#C4707F" strokeWidth={2.25} /></div>
        <h1 className="serif">Order Placed!</h1>
        <p className="muted">Your order has been successfully placed.</p>
        <div className="card confirm__card">
          <div className="summary__row"><span>Order No. :</span><strong>#{order.no}</strong></div>
          <div className="summary__row"><span>Payment</span><strong>{order.payment}</strong></div>
          <div className="summary__row"><span>Ship to</span><strong>{order.customer}</strong></div>
          <hr />
          <div className="summary__row summary__total"><span>Total :</span><strong>{money(order.total)}</strong></div>
        </div>
        <div className="confirm__actions">
          <Button to="/">Back to Home</Button>
          <Button to="/my-orders" kind="outline">View My Orders</Button>
        </div>
      </main>
    </div>
  )
}
