// ===== FILE: src/pages/admin/A4_ManageOrdersPage.jsx =====
// FIGMA FRAME: A4 · Manage Orders   |   URL: /admin/orders
// Customer info, order total, status, "View Order" -> A4a. Status chips filter the table.
import { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import { useStore } from '../../context/StoreContext'
import { formatDate, money } from '../../utils/format'

const FILTERS = ['All', 'Pending', 'Delivered', 'Cancelled']

export default function A4_ManageOrdersPage() {
  const { orders } = useStore()
  const [filter, setFilter] = useState('All')
  const rows = [...orders].sort((a, b) => b.no - a.no).filter((o) => filter === 'All' || o.status === filter)

  return (
    <AdminLayout title="Manage Orders">
      <div className="page-head">
        <div><h2 className="serif">Orders</h2><p className="muted">{orders.length} total orders</p></div>
        <div className="chips">
          {FILTERS.map((f) => <button key={f} type="button" className={`chip ${f === filter ? 'chip--active' : ''}`} onClick={() => setFilter(f)}>{f}</button>)}
        </div>
      </div>

      <div className="table-card">
        <table className="table">
          <thead><tr><th>Order No.</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {rows.map((o) => (
              <tr key={o.no}>
                <td>#{o.no}</td>
                <td><strong>{o.customer}</strong><br /><small className="muted">{o.email}</small></td>
                <td>{formatDate(o.date)}</td><td>{money(o.total)}</td><td><Badge status={o.status} /></td>
                <td><Button to={`/admin/orders/${o.no}`} kind="outline" size="sm" icon="eye">View Order</Button></td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan="6" className="empty">No {filter.toLowerCase()} orders.</td></tr>}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
