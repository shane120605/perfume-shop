// ===== FILE: src/pages/admin/A5b_EditUserPage.jsx =====
// FIGMA FRAME: A5b · Edit User   |   URL: /admin/users/:id/edit
import { Link, useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import UserForm from '../../components/admin/UserForm'
import Icon from '../../components/common/Icon'
import { useStore } from '../../context/StoreContext'

export default function A5b_EditUserPage() {
  const { id } = useParams()
  const { users, updateUser } = useStore()
  const navigate = useNavigate()
  const user = users.find((u) => u.id === Number(id))
  return (
    <AdminLayout title="Edit User">
      <Link to="/admin/users" className="back-link"><Icon name="left" size={16} /> Back to Users</Link>
      {user ? (
        <UserForm key={user.id} user={user} submitLabel="Save Changes" onSave={(data) => { updateUser(user.id, data); navigate('/admin/users') }} />
      ) : <p className="empty">User not found.</p>}
    </AdminLayout>
  )
}
