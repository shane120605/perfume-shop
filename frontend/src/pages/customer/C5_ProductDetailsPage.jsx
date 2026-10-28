// ===== FILE: src/pages/customer/C5_ProductDetailsPage.jsx =====
// FIGMA FRAME: C5 · Product Details   |   URL: /product/:id
// Photo, price, description, quantity selector, "Add to Cart" -> Cart (C6)
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/customer/Navbar'
import Footer from '../../components/customer/Footer'
import ProductImage from '../../components/common/ProductImage'
import QuantityStepper from '../../components/common/QuantityStepper'
import Button from '../../components/common/Button'
import Icon from '../../components/common/Icon'
import { useStore } from '../../context/StoreContext'
import { useCart } from '../../context/CartContext'
import { money } from '../../utils/format'

export default function C5_ProductDetailsPage() {
  const { id } = useParams()
  const { products } = useStore()
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="page"><Navbar />
        <main className="container"><p className="empty">This product could not be found.</p><Button to="/shop">Back to Shop</Button></main>
      </div>
    )
  }

  const outOfStock = product.stock <= 0
  const handleAdd = () => {
    addToCart(product.id, qty)
    navigate('/cart') // Add to Cart -> Cart
  }

  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <Link to="/shop" className="back-link"><Icon name="left" size={16} /> Back to Shop</Link>
        <div className="detail">
          <ProductImage product={product} className="detail__photo" />
          <div className="detail__info">
            <span className="detail__cat">{product.category} · Eau de Parfum</span>
            <h1 className="serif">{product.name}</h1>
            <p className="detail__price">{money(product.price)}</p>
            <p className="detail__desc">{product.description}</p>

            {product.notes && (
              <div className="notes">
                {[['Top', product.notes.top], ['Heart', product.notes.heart], ['Base', product.notes.base]].map(([k, v]) => (
                  <div key={k} className="notes__item"><span>{k}</span><strong>{v}</strong></div>
                ))}
              </div>
            )}

            <div className="detail__qty">
              <label>Quantity:</label>
              <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, product.stock)} />
              <span className={`stock ${product.stock <= 5 ? 'stock--low' : ''}`}>
                {outOfStock ? 'Out of stock' : `${product.stock} in stock`}
              </span>
            </div>

            <Button icon="cart" className="detail__add" onClick={handleAdd} disabled={outOfStock}>Add to Cart</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
