// ===== FILE: src/pages/admin/A3a_AddProductPage.jsx =====
// FIGMA FRAME: A3a · Add Product   |   URL: /admin/products/new
// Empty product form. Save -> back to A3.
import { Link, useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import ProductForm from '../../components/admin/ProductForm'
import Icon from '../../components/common/Icon'
import { useStore } from '../../context/StoreContext'

export default function A3a_AddProductPage() {
  const { addProduct } = useStore()
  const navigate = useNavigate()
  return (
    <AdminLayout title="Add New Product">
      <Link to="/admin/products" className="back-link"><Icon name="left" size={16} /> Back to Products</Link>
      <ProductForm submitLabel="Save Product" onSave={(data) => { addProduct(data); navigate('/admin/products') }} />
    </AdminLayout>
  )
}
