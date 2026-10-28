// ===== FILE: src/pages/admin/A3c_ViewProductPage.jsx =====
// FIGMA FRAME: A3c · View Product   |   URL: /admin/products/:id
// Read-only product details. Edit -> A3b, Delete -> confirmation popup, Back -> A3.
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import ProductImage from '../../components/common/ProductImage'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import Button from '../../components/common/Button'
import Icon from '../../components/common/Icon'
import { useStore } from '../../context/StoreContext'
import { money } from '../../utils/format'

export default function A3c_ViewProductPage() {
  const { id } = useParams()
  const { products, deleteProduct } = useStore()
  const navigate = useNavigate()
  const [confirm, setConfirm] = useState(false)
  const p = products.find((x) => x.id === Number(id))

  return (
    <AdminLayout title="Product Details">
      <Link to="/admin/products" className="back-link"><Icon name="left" size={16} /> Back to Products</Link>
      {!p ? <p className="empty">Product not found.</p> : (
        <div className="card view-card">
          <ProductImage product={p} className="view-card__photo" />
          <div className="view-card__info">
            <span className="pill">{p.category}</span>
            <h2 className="serif">{p.name}</h2>
            <p className="detail__price">{money(p.price)}</p>
            <p className="muted">{p.description}</p>
            <dl className="facts">
              <dt>SKU</dt><dd>PS-{String(p.id).padStart(4, '0')}</dd>
              <dt>Size</dt><dd>{p.size} · Eau de Parfum</dd>
              <dt>Stock</dt><dd>{p.stock} units</dd>
              <dt>Status</dt><dd>{p.stock > 0 ? 'Active' : 'Out of stock'}</dd>
            </dl>
            <div className="form-actions">
              <Button to={`/admin/products/${p.id}/edit`} icon="edit">Edit Product</Button>
              <Button kind="danger" icon="trash" onClick={() => setConfirm(true)}>Delete</Button>
            </div>
          </div>
        </div>
      )}
      <ConfirmDialog open={confirm} title="Delete Product?" message={`Are you sure you want to delete “${p?.name}”? This action cannot be undone.`}
        confirmLabel="Delete Product" onCancel={() => setConfirm(false)}
        onConfirm={() => { deleteProduct(p.id); navigate('/admin/products') }} />
    </AdminLayout>
  )
}
