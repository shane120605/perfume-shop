// ===== FILE: src/pages/admin/A2_DashboardPage.jsx =====
// FIGMA FRAME: A2 · Admin Dashboard   |   URL: /admin
// Total Products / Orders / Users / Sales (calculated from the data) + recent orders table
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Icon from '../../components/common/Icon'
import { useStore } from '../../context/StoreContext'
import { formatDate, money } from '../../utils/format'

export default function A2_DashboardPage() {
  const { products, orders, users } = useStore()
  const sales = orders.filter((o) => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0)
  const recent = [...orders].sort((a, b) => b.no - a.no).slice(0, 5)

  const stats = [
    { label: 'Total Products', value: products.length, icon: 'box' },
    { label: 'Total Orders', value: orders.length, icon: 'bag' },
    { label: 'Total Users', value: users.length, icon: 'users' },
    { label: 'Total Sales', value: money(sales), icon: 'chart' },
  ]

  return (
    <AdminLayout title="Dashboard">
      <div className="stat-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <span className="stat-card__icon"><Icon name={s.icon} size={24} color="#C4707F" /></span>
            <div><small>{s.label}</small><strong className="serif">{s.value}</strong></div>
          </div>
        ))}
      </div>

      <div className="page-head">
        <div><h2 className="serif">Recent Orders</h2><p className="muted">Latest customer orders</p></div>
        <Button to="/admin/orders" kind="soft" size="sm">View all Orders</Button>
      </div>

      <div className="table-card">
        <table className="table">
          <thead><tr><th>Order No.</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {recent.map((o) => (
              <tr key={o.no}>
                <td>#{o.no}</td><td>{o.customer}</td><td>{formatDate(o.date)}</td><td>{money(o.total)}</td>
                <td><Badge status={o.status} /></td>
                <td><Button to={`/admin/orders/${o.no}`} kind="outline" size="sm">View</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
