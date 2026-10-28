// ===== FILE: src/pages/admin/A1_AdminLoginPage.jsx =====
// FIGMA FRAME: A1 · Admin Login   |   URL: /admin/login
// Login -> Dashboard (A2).  "Back to User Login" -> C1.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormField from '../../components/common/FormField'
import Button from '../../components/common/Button'
import Icon from '../../components/common/Icon'
import { useAuth } from '../../context/AuthContext'

export default function A1_AdminLoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.username.trim() || !form.password) return setError('Enter your username and password.')
    const result = login(form.username, form.password, 'Admin')
    if (!result.ok) return setError(result.error)
    navigate('/admin')
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit} noValidate>
        <div className="admin-login__logo"><Icon name="bottle" size={36} color="#C4707F" /></div>
        <h1 className="serif">Perfume Shop</h1>
        <p className="admin-login__label">Admin Panel</p>
        <FormField label="Username" icon="user" placeholder="Username (or admin email)" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <FormField label="Password" icon="lock" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="notice notice--error" role="alert">{error}</p>}
        <Button type="submit" block>Login</Button>
        <p className="auth__hint">Demo admin: admin / admin123</p>
        <Link to="/login" className="admin-login__back">Back to User Login</Link>
      </form>
    </div>
  )
}
