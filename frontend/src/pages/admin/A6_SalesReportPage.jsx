// ===== FILE: src/pages/admin/A6_SalesReportPage.jsx =====
// FIGMA FRAME: A6 · Sales Report   |   URL: /admin/sales
// Date filter + Total Sales + bar chart (weekly if range <= ~3 months, otherwise monthly). Cancelled orders are not counted.
import { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import Icon from '../../components/common/Icon'
import { useStore } from '../../context/StoreContext'
import { money } from '../../utils/format'

const DAY = 864e5
const asDate = (iso) => new Date(iso + 'T00:00:00')

// groups the orders into bars (weekly or monthly)
function buildBuckets(orders, from, to) {
  const start = asDate(from)
  const days = Math.round((asDate(to) - start) / DAY)
  if (days <= 93) {
    const n = Math.floor(days / 7) + 1
    const buckets = Array.from({ length: n }, (_, i) => ({
      label: new Date(start.getTime() + i * 7 * DAY).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: 0,
    }))
    orders.forEach((o) => { buckets[Math.floor((asDate(o.date) - start) / (7 * DAY))].value += o.total })
    return { unit: 'Week', buckets }
  }
  const map = new Map()
  const cur = new Date(start.getFullYear(), start.getMonth(), 1)
  while (cur <= asDate(to) && map.size < 36) {
    map.set(cur.getFullYear() + '-' + cur.getMonth(), { label: cur.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }), value: 0 })
    cur.setMonth(cur.getMonth() + 1)
  }
  orders.forEach((o) => { const d = asDate(o.date); const b = map.get(d.getFullYear() + '-' + d.getMonth()); if (b) b.value += o.total })
  return { unit: 'Month', buckets: [...map.values()] }
}

export default function A6_SalesReportPage() {
  const { orders } = useStore()
  const [from, setFrom] = useState('2025-05-01')
  const [to, setTo] = useState('2025-05-31')
  const validRange = from && to && from <= to

  const inRange = validRange ? orders.filter((o) => o.status !== 'Cancelled' && o.date >= from && o.date <= to) : []
  const total = inRange.reduce((sum, o) => sum + o.total, 0)
  const avg = inRange.length ? total / inRange.length : 0
  const { unit, buckets } = validRange ? buildBuckets(inRange, from, to) : { unit: 'Week', buckets: [] }
  const max = Math.max(1, ...buckets.map((b) => b.value))

  return (
    <AdminLayout title="Sales Report">
      <div className="page-head">
        <div><h2 className="serif">Sales Overview</h2><p className="muted">Revenue for the selected period</p></div>
        <div className="date-filter">
          <Icon name="cal" size={18} color="#C4707F" />
          <input type="date" value={from} max={to} onChange={(e) => setFrom(e.target.value)} aria-label="From date" />
          <span>–</span>
          <input type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} aria-label="To date" />
        </div>
      </div>

      {!validRange && <p className="notice notice--error">Choose a start date that is before the end date.</p>}

      <div className="stat-grid stat-grid--3">
        <div className="stat-card stat-card--big"><span className="stat-card__icon"><Icon name="chart" size={24} color="#C4707F" /></span><div><small>Total Sales</small><strong className="serif">{money(total)}</strong></div></div>
        <div className="stat-card"><span className="stat-card__icon"><Icon name="bag" size={24} color="#C4707F" /></span><div><small>Total Orders</small><strong className="serif">{inRange.length}</strong></div></div>
        <div className="stat-card"><span className="stat-card__icon"><Icon name="tag" size={24} color="#C4707F" /></span><div><small>Average Order</small><strong className="serif">{money(avg)}</strong></div></div>
      </div>

      <section className="card pad chart-card">
        <div className="chart-card__head"><h3 className="serif">Sales by {unit}</h3><small className="muted">Amount in PHP</small></div>
        {buckets.length === 0 || total === 0 ? (
          <p className="empty">No sales in this period. Try a wider date range.</p>
        ) : (
          <div className="bars" role="img" aria-label={`Bar chart of sales by ${unit.toLowerCase()}`}>
            {buckets.map((b, i) => (
              <div key={b.label + i} className="bars__col">
                <small>₱{(b.value / 1000).toFixed(1)}k</small>
                <div className={`bars__bar ${b.value === max ? 'bars__bar--top' : ''}`} style={{ height: `${Math.max(2, (b.value / max) * 170)}px` }} />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </AdminLayout>
  )
}
