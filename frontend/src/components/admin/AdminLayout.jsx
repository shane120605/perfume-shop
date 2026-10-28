// ===== FILE: src/components/admin/AdminLayout.jsx =====
// PURPOSE: frame shared by ALL admin pages: left sidebar (Dashboard, Products, Orders, Users, Reports, Settings) + top bar.
// Usage: <AdminLayout title="Manage Products"> ...page content... </AdminLayout>
import { NavLink, useNavigate } from 'react-router-dom'
import Icon from '../common/Icon'
import { useAuth } from '../../context/AuthContext'
import { useStore } from '../../context/StoreContext'

const MENU = [
  { to: '/admin', label: 'Dashboard', icon: 'dash', end: true },
  { to: '/admin/products', label: 'Products', icon: 'box' },
  { to: '/admin/orders', label: 'Orders', icon: 'bag' },
  { to: '/admin/users', label: 'Users', icon: 'users' },
  { to: '/admin/sales', label: 'Reports', icon: 'chart' },
]

export default function AdminLayout({ title, children }) {
  const { logout } = useAuth()
  const { resetDemoData } = useStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }
  // "Settings" -> reset the demo data back to the original sample data
  const handleSettings = () => {
    if (window.confirm('Reset all demo data (products, users, orders) back to the original sample data?')) resetDemoData()
  }

  return (
    <div className="admin">
      <aside className="sidebar">
        <div className="sidebar__logo">
          <Icon name="bottle" size={28} color="#C4707F" />
          <div><strong className="serif">Perfume Shop</strong><small>Admin Panel</small></div>
        </div>
        <nav className="sidebar__menu" aria-label="Admin">
          {MENU.map((m) => (
            <NavLink key={m.to} to={m.to} end={m.end} className="menu-item">
              <Icon name={m.icon} size={20} /> {m.label}
            </NavLink>
          ))}
          <button type="button" className="menu-item" onClick={handleSettings}><Icon name="gear" size={20} /> Settings</button>
        </nav>
        <button type="button" className="menu-item sidebar__logout" onClick={handleLogout}><Icon name="out" size={20} /> Logout</button>
      </aside>

      <div className="admin__main">
        <header className="topbar">
          <h1 className="serif">{title}</h1>
          <div className="topbar__user"><span className="avatar">A</span> Admin</div>
        </header>
        <div className="admin__content">{children}</div>
      </div>
    </div>
  )
}
