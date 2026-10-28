// ===== FILE: src/pages/admin/A3b_EditProductPage.jsx =====
// FIGMA FRAME: A3b · Edit Product   |   URL: /admin/products/:id/edit
// Product form filled with the current values. Save Changes -> back to A3.
import { Link, useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import ProductForm from '../../components/admin/ProductForm'
import Icon from '../../components/common/Icon'
import { useStore } from '../../context/StoreContext'

export default function A3b_EditProductPage() {
  const { id } = useParams()
  const { products, updateProduct } = useStore()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === Number(id))

  return (
    <AdminLayout title="Edit Product">
      <Link to="/admin/products" className="back-link"><Icon name="left" size={16} /> Back to Products</Link>
      {product ? (
        <ProductForm key={product.id} product={product} submitLabel="Save Changes"
          onSave={(data) => { updateProduct(product.id, data); navigate('/admin/products') }} />
      ) : <p className="empty">Product not found.</p>}
    </AdminLayout>
  )
}
