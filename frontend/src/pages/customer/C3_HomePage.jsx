// ===== FILE: src/pages/customer/C3_HomePage.jsx =====
// FIGMA FRAME: C3 · Home   |   URL: /
// Navbar + hero banner + "Shop Now" (-> C4) + Featured Products (card -> C5)
import { Link } from 'react-router-dom'
import Navbar from '../../components/customer/Navbar'
import Footer from '../../components/customer/Footer'
import ProductCard from '../../components/customer/ProductCard'
import ProductImage from '../../components/common/ProductImage'
import Button from '../../components/common/Button'
import Icon from '../../components/common/Icon'
import { useStore } from '../../context/StoreContext'
import { heroImage } from '../../data/images'

export default function C3_HomePage() {
  const { products } = useStore()
  const featured = products.slice(0, 4)

  return (
    <div className="page">
      <Navbar />
      <main>
        {/* HERO BANNER */}
        <section className="hero">
          <ProductImage src={heroImage} alt="Perfume bottle with roses" className="hero__photo" />
          <div className="hero__text">
            <span className="hero__eyebrow">New collection</span>
            <h1 className="serif">Discover Your Signature Scent</h1>
            <p>Elegant, long-lasting fragrances for every moment.</p>
            <Button to="/shop" kind="dark">Shop Now</Button>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="section">
          <div className="section__head">
            <h2 className="serif">Featured Products</h2>
            <Link to="/shop" className="link-arrow">View All <Icon name="right" size={16} /></Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* ABOUT (the navbar's ABOUT link scrolls here) */}
        <section className="section about" id="about">
          <h2 className="serif">About Perfume Shop</h2>
          <p>
            We are a small online perfume shop for people who love a scent that feels like them.
            Every bottle is 50 ml of carefully selected Eau de Parfum, delivered to your door.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
