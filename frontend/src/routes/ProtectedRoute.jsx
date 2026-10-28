// ===== FILE: src/routes/ProtectedRoute.jsx =====
// PURPOSE: blocks pages unless logged in. role="Admin" -> admin pages, otherwise customer pages.
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (role === 'Admin') {
    if (!user || user.role !== 'Admin') return <Navigate to="/admin/login" replace />
    return children
  }
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}
