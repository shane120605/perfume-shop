// ===== FILE: src/pages/customer/C4_ShopPage.jsx =====
// FIGMA FRAME: C4 · Shop (Product Browsing)   |   URL: /shop
// "Shop Now" from Home lands here. Search box + category chips filter the grid. Card -> C5.
import { useState } from 'react'
import Navbar from '../../components/customer/Navbar'
import Footer from '../../components/customer/Footer'
import ProductCard from '../../components/customer/ProductCard'
import Icon from '../../components/common/Icon'
import { useStore } from '../../context/StoreContext'
import { categories } from '../../data/products'

export default function C4_ShopPage() {
  const { products } = useStore()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const visible = products.filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      p.name.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <div className="shop__head">
          <div>
            <h1 className="serif">Our Collection</h1>
            <p className="muted">Showing {visible.length} of {products.length} fragrances</p>
          </div>
          <div className="input-wrap input-wrap--icon shop__search">
            <Icon name="search" size={18} className="input-wrap__icon" />
            <input className="input" placeholder="Search perfumes..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search perfumes" />
          </div>
        </div>

        <div className="chips" role="tablist" aria-label="Categories">
          {categories.map((c) => (
            <button key={c} type="button" className={`chip ${c === category ? 'chip--active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="empty">No perfumes match your search. Try another name or category.</p>
        ) : (
          <div className="product-grid">
            {visible.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
