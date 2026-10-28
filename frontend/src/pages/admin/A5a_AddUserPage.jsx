// ===== FILE: src/pages/admin/A5a_AddUserPage.jsx =====
// FIGMA FRAME: A5a · Add User   |   URL: /admin/users/new
import { Link, useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import UserForm from '../../components/admin/UserForm'
import Icon from '../../components/common/Icon'
import { useStore } from '../../context/StoreContext'

export default function A5a_AddUserPage() {
  const { addUser } = useStore()
  const navigate = useNavigate()
  return (
    <AdminLayout title="Add New User">
      <Link to="/admin/users" className="back-link"><Icon name="left" size={16} /> Back to Users</Link>
      <UserForm submitLabel="Save User" onSave={(data) => { addUser(data); navigate('/admin/users') }} />
    </AdminLayout>
  )
}
