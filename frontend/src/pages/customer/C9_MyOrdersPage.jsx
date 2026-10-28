// ===== FILE: src/pages/customer/C9_MyOrdersPage.jsx =====
// FIGMA FRAME: C9 · My Orders   |   URL: /my-orders   (login required)
// List of the logged-in customer's orders with status. "View Order" -> C10
import Navbar from '../../components/customer/Navbar'
import Footer from '../../components/customer/Footer'
import ProductImage from '../../components/common/ProductImage'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import { useAuth } from '../../context/AuthContext'
import { useStore } from '../../context/StoreContext'
import { formatDate, money } from '../../utils/format'

export default function C9_MyOrdersPage() {
  const { user } = useAuth()
  const { orders, products } = useStore()
  const mine = orders.filter((o) => o.email.toLowerCase() === user.email.toLowerCase()).sort((a, b) => b.no - a.no)

  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <h1 className="serif">My Orders</h1>
        <p className="muted">Track your recent purchases and their status.</p>

        {mine.length === 0 ? (
          <div className="empty-card">
            <h2 className="serif">No orders yet</h2>
            <p>When you place an order, it will show up here.</p>
            <Button to="/shop">Start Shopping</Button>
          </div>
        ) : (
          <div className="orders">
            {mine.map((o) => {
              const first = products.find((p) => p.id === o.items[0].productId)
              const names = o.items.map((i) => products.find((p) => p.id === i.productId)?.name || 'Item').join(', ')
              return (
                <article key={o.no} className="order-row">
                  <ProductImage product={first} className="order-row__thumb" />
                  <div className="order-row__id"><h3 className="serif">#{o.no}</h3><span>{formatDate(o.date)}</span></div>
                  <p className="order-row__items">{names}</p>
                  <Badge status={o.status} />
                  <strong className="order-row__total">{money(o.total)}</strong>
                  <Button to={`/orders/${o.no}`} kind="outline" size="sm">View Order</Button>
                </article>
              )
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
