// ===== FILE: src/routes/AppRoutes.jsx =====
// PURPOSE: ALL URLs of the website in one place. Each line shows its FIGMA frame code (C1..C10, A1..A6).
import { Routes, Route, Link } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

// CUSTOMER PAGES (Figma section: CUSTOMER SIDE)
import C1_LoginPage from '../pages/customer/C1_LoginPage'
import C2_RegisterPage from '../pages/customer/C2_RegisterPage'
import C3_HomePage from '../pages/customer/C3_HomePage'
import C4_ShopPage from '../pages/customer/C4_ShopPage'
import C5_ProductDetailsPage from '../pages/customer/C5_ProductDetailsPage'
import C6_CartPage from '../pages/customer/C6_CartPage'
import C7_CheckoutPage from '../pages/customer/C7_CheckoutPage'
import C8_OrderConfirmationPage from '../pages/customer/C8_OrderConfirmationPage'
import C9_MyOrdersPage from '../pages/customer/C9_MyOrdersPage'
import C10_OrderDetailsPage from '../pages/customer/C10_OrderDetailsPage'

// ADMIN PAGES (Figma section: ADMIN SIDE)
import A1_AdminLoginPage from '../pages/admin/A1_AdminLoginPage'
import A2_DashboardPage from '../pages/admin/A2_DashboardPage'
import A3_ManageProductsPage from '../pages/admin/A3_ManageProductsPage'
import A3a_AddProductPage from '../pages/admin/A3a_AddProductPage'
import A3b_EditProductPage from '../pages/admin/A3b_EditProductPage'
import A3c_ViewProductPage from '../pages/admin/A3c_ViewProductPage'
import A4_ManageOrdersPage from '../pages/admin/A4_ManageOrdersPage'
import A4a_ViewOrderPage from '../pages/admin/A4a_ViewOrderPage'
import A5_ManageUsersPage from '../pages/admin/A5_ManageUsersPage'
import A5a_AddUserPage from '../pages/admin/A5a_AddUserPage'
import A5b_EditUserPage from '../pages/admin/A5b_EditUserPage'
import A6_SalesReportPage from '../pages/admin/A6_SalesReportPage'

const NotFound = () => (
  <div style={{ padding: 80, textAlign: 'center' }}>
    <h1 className="serif">Page not found</h1>
    <p style={{ margin: '12px 0 24px' }}>The page you are looking for does not exist.</p>
    <Link className="btn btn--primary" to="/">Back to Home</Link>
  </div>
)

export default function AppRoutes() {
  const customerOnly = (el) => <ProtectedRoute>{el}</ProtectedRoute>
  const adminOnly = (el) => <ProtectedRoute role="Admin">{el}</ProtectedRoute>
  return (
    <Routes>
      {/* ---------- CUSTOMER SIDE ---------- */}
      <Route path="/login" element={<C1_LoginPage />} />
      <Route path="/register" element={<C2_RegisterPage />} />
      <Route path="/" element={<C3_HomePage />} />
      <Route path="/shop" element={<C4_ShopPage />} />
      <Route path="/product/:id" element={<C5_ProductDetailsPage />} />
      <Route path="/cart" element={<C6_CartPage />} />
      <Route path="/checkout" element={customerOnly(<C7_CheckoutPage />)} />
      <Route path="/order-confirmation" element={customerOnly(<C8_OrderConfirmationPage />)} />
      <Route path="/my-orders" element={customerOnly(<C9_MyOrdersPage />)} />
      <Route path="/orders/:no" element={customerOnly(<C10_OrderDetailsPage />)} />

      {/* ---------- ADMIN SIDE ---------- */}
      <Route path="/admin/login" element={<A1_AdminLoginPage />} />
      <Route path="/admin" element={adminOnly(<A2_DashboardPage />)} />
      <Route path="/admin/products" element={adminOnly(<A3_ManageProductsPage />)} />
      <Route path="/admin/products/new" element={adminOnly(<A3a_AddProductPage />)} />
      <Route path="/admin/products/:id" element={adminOnly(<A3c_ViewProductPage />)} />
      <Route path="/admin/products/:id/edit" element={adminOnly(<A3b_EditProductPage />)} />
      <Route path="/admin/orders" element={adminOnly(<A4_ManageOrdersPage />)} />
      <Route path="/admin/orders/:no" element={adminOnly(<A4a_ViewOrderPage />)} />
      <Route path="/admin/users" element={adminOnly(<A5_ManageUsersPage />)} />
      <Route path="/admin/users/new" element={adminOnly(<A5a_AddUserPage />)} />
      <Route path="/admin/users/:id/edit" element={adminOnly(<A5b_EditUserPage />)} />
      <Route path="/admin/sales" element={adminOnly(<A6_SalesReportPage />)} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
