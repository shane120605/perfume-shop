// ===== FILE: src/pages/admin/A4a_ViewOrderPage.jsx =====
// FIGMA FRAME: A4a · View Order   |   URL: /admin/orders/:no
// Order items, customer info, update status. "Save Status" -> back to A4.
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import FormField from '../../components/common/FormField'
import Icon from '../../components/common/Icon'
import { useStore } from '../../context/StoreContext'
import { formatDate, money } from '../../utils/format'

export default function A4a_ViewOrderPage() {
  const { no } = useParams()
  const { orders, products, updateOrderStatus } = useStore()
  const navigate = useNavigate()
  const order = orders.find((o) => o.no === Number(no))
  const [status, setStatus] = useState(order?.status || 'Pending')

  return (
    <AdminLayout title="Order Details">
      <Link to="/admin/orders" className="back-link"><Icon name="left" size={16} /> Back to Orders</Link>
      {!order ? <p className="empty">Order not found.</p> : (
        <>
          <div className="title-row"><h2 className="serif">Order #{order.no}</h2><Badge status={order.status} /><span className="muted">Placed on {formatDate(order.date)}</span></div>
          <div className="two-panel">
            <section className="card pad">
              <h3 className="serif">Order Items</h3>
              {order.items.map((it) => {
                const p = products.find((x) => x.id === it.productId)
                return (
                  <div key={it.productId} className="summary__item">
                    <div><strong>{p?.name || 'Item'}</strong><br /><small className="muted">Qty {it.qty} · {money(it.price)}</small></div>
                    <strong>{money(it.price * it.qty)}</strong>
                  </div>
                )
              })}
              <hr />
              <div className="summary__row"><span>Subtotal</span><strong>{money(order.total)}</strong></div>
              <div className="summary__row"><span>Shipping</span><strong>Free</strong></div>
              <div className="summary__row summary__total"><span>Total</span><strong>{money(order.total)}</strong></div>
            </section>

            <div className="stack">
              <section className="card pad">
                <h3 className="serif">Customer</h3>
                <p><strong>{order.customer}</strong></p>
                <p className="muted">{order.email} · {order.phone}</p>
                <p className="muted">{order.address}</p>
                <p className="muted">Payment: {order.payment}</p>
              </section>
              <section className="card pad">
                <h3 className="serif">Update Status</h3>
                <FormField label="Order Status" as="select" options={['Pending', 'Delivered', 'Cancelled']} value={status} onChange={(e) => setStatus(e.target.value)} />
                <Button block onClick={() => { updateOrderStatus(order.no, status); navigate('/admin/orders') }}>Save Status</Button>
              </section>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  )
}
