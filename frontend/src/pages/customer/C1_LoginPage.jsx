// ===== FILE: src/pages/customer/C1_LoginPage.jsx =====
// FIGMA FRAME: C1 · Customer Login   |   URL: /login
// Login -> Home (C3).  "Register" -> C2.  "Admin Panel" link -> A1.
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/customer/AuthLayout'
import FormField from '../../components/common/FormField'
import Button from '../../components/common/Button'
import { useAuth } from '../../context/AuthContext'

export default function C1_LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ identifier: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.identifier.trim() || !form.password) return setError('Enter your email or username and your password.')
    const result = login(form.identifier, form.password)
    if (!result.ok) return setError(result.error)
    navigate(location.state?.from || '/') // go back to the page they wanted, or Home
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to continue shopping your favorite scents.">
      {location.state?.registered && <p className="notice notice--success">Account created. You can log in now.</p>}
      <form onSubmit={handleSubmit} className="auth__form" noValidate>
        <FormField label="Email or Username" icon="user" placeholder="Email or Username" value={form.identifier}
          onChange={(e) => setForm({ ...form, identifier: e.target.value })} />
        <FormField label="Password" icon="lock" type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="notice notice--error" role="alert">{error}</p>}
        <Button type="submit" block>Login</Button>
      </form>
      <p className="auth__foot">Don't have an account? <Link to="/register">Register</Link></p>
      <p className="auth__hint">Demo customer: juan@shop.com / password123</p>
      <Link className="auth__admin" to="/admin/login">Admin? Open the Admin Panel</Link>
    </AuthLayout>
  )
}
