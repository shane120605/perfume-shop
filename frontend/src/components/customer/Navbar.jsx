// ===== FILE: src/components/customer/Navbar.jsx =====
// PURPOSE: top navigation bar of every customer page (logo, HOME / SHOP / ABOUT, Login / Sign Up, search, cart, account)
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Icon from '../common/Icon'
import Button from '../common/Button'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo serif">Perfume Shop</Link>

      <nav className="navbar__links" aria-label="Main">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <a href="/#about">About</a>
      </nav>

      <div className="navbar__actions">
        {user ? (
          <>
            <span className="navbar__hello">Hi, {user.name.split(' ')[0]}</span>
            <Button kind="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button to="/login" kind="outline" size="sm">Login</Button>
            <Button to="/register" size="sm">Sign Up</Button>
          </>
        )}
        <Link to="/shop" aria-label="Search products" className="navbar__icon"><Icon name="search" size={22} /></Link>
        <Link to="/cart" aria-label="Shopping cart" className="navbar__icon navbar__cart">
          <Icon name="cart" size={22} />
          {count > 0 && <span className="navbar__badge">{count}</span>}
        </Link>
        <Link to={user ? '/my-orders' : '/login'} aria-label="My orders" className="navbar__icon"><Icon name="user" size={22} /></Link>
      </div>
    </header>
  )
}
