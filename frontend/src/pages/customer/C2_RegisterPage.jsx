// ===== FILE: src/pages/customer/C2_RegisterPage.jsx =====
// FIGMA FRAME: C2 · Register   |   URL: /register
// Register -> creates a Customer account -> goes back to Login (C1).
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/customer/AuthLayout'
import FormField from '../../components/common/FormField'
import Button from '../../components/common/Button'
import { useStore } from '../../context/StoreContext'

export default function C2_RegisterPage() {
  const { users, addUser } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    else if (users.some((u) => u.email.toLowerCase() === form.email.trim().toLowerCase())) next.email = 'This email is already registered.'
    if (form.password.length < 6) next.password = 'Password must be at least 6 characters.'
    setErrors(next)
    if (Object.keys(next).length) return
    addUser({ name: form.name.trim(), email: form.email.trim(), password: form.password, role: 'Customer' })
    navigate('/login', { state: { registered: true } }) // Register -> Login
  }

  return (
    <AuthLayout title="Create Account" subtitle="Join Perfume Shop and find your signature scent.">
      <form onSubmit={handleSubmit} className="auth__form" noValidate>
        <FormField label="Full Name" icon="user" placeholder="Full Name" value={form.name} onChange={set('name')} error={errors.name} />
        <FormField label="Email" icon="mail" type="email" placeholder="Email" value={form.email} onChange={set('email')} error={errors.email} />
        <FormField label="Password" icon="lock" type="password" placeholder="Password" value={form.password} onChange={set('password')} error={errors.password} />
        <Button type="submit" block>Register</Button>
      </form>
      <p className="auth__foot">Already have an account? <Link to="/login">Login</Link></p>
    </AuthLayout>
  )
}
