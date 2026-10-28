// ===== FILE: src/pages/customer/C6_CartPage.jsx =====
// FIGMA FRAME: C6 · Shopping Cart   |   URL: /cart
// Quantity controls, remove item (trash), total, "Checkout" -> C7
import Navbar from '../../components/customer/Navbar'
import Footer from '../../components/customer/Footer'
import ProductImage from '../../components/common/ProductImage'
import QuantityStepper from '../../components/common/QuantityStepper'
import Button from '../../components/common/Button'
import Icon from '../../components/common/Icon'
import { useCart } from '../../context/CartContext'
import { money } from '../../utils/format'

export default function C6_CartPage() {
  const { lines, count, subtotal, setQty, removeFromCart } = useCart()

  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <div className="title-row">
          <h1 className="serif">My Cart</h1>
          <span className="muted">{count} {count === 1 ? 'item' : 'items'}</span>
        </div>

        {lines.length === 0 ? (
          <div className="empty-card">
            <Icon name="cart" size={40} color="#C4707F" strokeWidth={1.25} />
            <h2 className="serif">Your cart is empty</h2>
            <p>Find a scent you love and add it to your cart.</p>
            <Button to="/shop">Browse the Shop</Button>
          </div>
        ) : (
          <div className="cart">
            <section className="card cart__list" aria-label="Cart items">
              {lines.map(({ product, qty }) => (
                <article key={product.id} className="cart__item">
                  <ProductImage product={product} className="cart__photo" />
                  <div className="cart__info">
                    <h3 className="serif">{product.name}</h3>
                    <p>{product.category} · Eau de Parfum {product.size}</p>
                    <strong>{money(product.price)}</strong>
                  </div>
                  <QuantityStepper value={qty} onChange={(v) => setQty(product.id, v)} max={Math.max(1, product.stock)} />
                  <strong className="cart__line">{money(product.price * qty)}</strong>
                  <button type="button" className="icon-btn" aria-label={`Remove ${product.name}`} onClick={() => removeFromCart(product.id)}>
                    <Icon name="trash" size={22} />
                  </button>
                </article>
              ))}
            </section>

            <aside className="card summary">
              <h2 className="serif">Order Summary</h2>
              <div className="summary__row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
              <div className="summary__row"><span>Shipping</span><strong>Free</strong></div>
              <hr />
              <div className="summary__row summary__total"><span>Total:</span><strong>{money(subtotal)}</strong></div>
              <Button to="/checkout" block>Checkout</Button>
              <Button to="/shop" kind="outline" block>Continue Shopping</Button>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
