// ===== FILE: src/components/admin/UserForm.jsx =====
// PURPOSE: the user form used by BOTH "Add User" (A5a) and "Edit User" (A5b)
import { useState } from 'react'
import FormField from '../common/FormField'
import Button from '../common/Button'
import { useStore } from '../../context/StoreContext'

export default function UserForm({ user, onSave, submitLabel }) {
  const { users } = useStore()
  const isEdit = Boolean(user)
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', role: user?.role || '', password: '' })
  const [errors, setErrors] = useState({})
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Enter the full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    else if (users.some((u) => u.id !== user?.id && u.email.toLowerCase() === form.email.trim().toLowerCase())) next.email = 'This email is already used.'
    if (!form.role) next.role = 'Select a role.'
    if (!isEdit && form.password.length < 6) next.password = 'Password must be at least 6 characters.'
    if (isEdit && form.password && form.password.length < 6) next.password = 'Password must be at least 6 characters.'
    setErrors(next)
    if (Object.keys(next).length) return
    const data = { name: form.name.trim(), email: form.email.trim(), role: form.role }
    if (form.password) data.password = form.password // blank on edit = keep the old password
    onSave(data)
  }

  return (
    <form className="card form-card form-card--user" onSubmit={handleSubmit} noValidate>
      <FormField label="Full Name" placeholder="Full name" value={form.name} onChange={set('name')} error={errors.name} />
      <FormField label="Email" type="email" placeholder="name@email.com" value={form.email} onChange={set('email')} error={errors.email} />
      <FormField label="Role" as="select" options={['Admin', 'Customer']} placeholder="Select role" value={form.role} onChange={set('role')} error={errors.role} />
      <FormField label={isEdit ? 'New Password' : 'Password'} type="password"
        placeholder={isEdit ? 'Leave blank to keep current password' : 'Create a password'}
        value={form.password} onChange={set('password')} error={errors.password} />
      <div className="form-actions">
        <Button type="submit">{submitLabel}</Button>
        <Button to="/admin/users" kind="outline">Cancel</Button>
      </div>
    </form>
  )
}
