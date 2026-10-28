// ===== FILE: src/pages/customer/C10_OrderDetailsPage.jsx =====
// FIGMA FRAME: C10 · Order Details   |   URL: /orders/:no   (login required)
// Items, totals, status tracker, shipping address. "Back to My Orders" -> C9
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/customer/Navbar'
import Footer from '../../components/customer/Footer'
import ProductImage from '../../components/common/ProductImage'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Icon from '../../components/common/Icon'
import { useAuth } from '../../context/AuthContext'
import { useStore } from '../../context/StoreContext'
import { formatDate, money } from '../../utils/format'

const STEPS = ['Order Placed', 'Processing', 'Shipped', 'Delivered']
const PROGRESS = { Pending: 2, Delivered: 4, Cancelled: 0 } // how many steps are done

export default function C10_OrderDetailsPage() {
  const { no } = useParams()
  const { user } = useAuth()
  const { orders, products } = useStore()
  const order = orders.find((o) => o.no === Number(no) && o.email.toLowerCase() === user.email.toLowerCase())

  if (!order) {
    return (
      <div className="page"><Navbar />
        <main className="container"><p className="empty">Order not found.</p><Button to="/my-orders">Back to My Orders</Button></main>
      </div>
    )
  }
  const done = PROGRESS[order.status] ?? 1

  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <Link to="/my-orders" className="back-link"><Icon name="left" size={16} /> Back to My Orders</Link>
        <div className="title-row">
          <h1 className="serif">Order #{order.no}</h1>
          <Badge status={order.status} />
          <span className="muted">Placed on {formatDate(order.date)}</span>
        </div>

        <div className="cart">
          <section className="card pad">
            <h2 className="serif">Items</h2>
            {order.items.map((it) => {
              const p = products.find((x) => x.id === it.productId)
              return (
                <div key={it.productId} className="summary__item summary__item--big">
                  <ProductImage product={p} className="summary__thumb summary__thumb--big" />
                  <div><h3 className="serif">{p?.name || 'Item'}</h3><span className="muted">Qty {it.qty} · Eau de Parfum {p?.size}</span></div>
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
              <h2 className="serif">Order Status</h2>
              {order.status === 'Cancelled' ? (
                <p className="notice notice--error">This order was cancelled.</p>
              ) : (
                <ol className="timeline">
                  {STEPS.map((s, i) => (
                    <li key={s} className={i < done ? 'timeline__step timeline__step--done' : 'timeline__step'}>
                      <span className="timeline__dot">{i < done && <Icon name="check" size={14} color="#fff" strokeWidth={3} />}</span>
                      <div><strong>{s}</strong><small>{i === 0 ? formatDate(order.date) : i < done ? 'Done' : 'Pending'}</small></div>
                    </li>
                  ))}
                </ol>
              )}
            </section>
            <section className="card pad">
              <h2 className="serif">Shipping Address</h2>
              <p><strong>{order.customer}</strong></p>
              <p className="muted">{order.address}</p>
              <p className="muted">{order.phone} · {order.payment}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
