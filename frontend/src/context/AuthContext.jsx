// ===== FILE: src/context/AuthContext.jsx =====
// PURPOSE: who is logged in (customer or admin). Used by Navbar, ProtectedRoute, Login pages.
import { createContext, useContext } from 'react'
import usePersistentState from '../hooks/usePersistentState'
import { useStore } from './StoreContext'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const { users } = useStore()
  const [user, setUser] = usePersistentState('session', null)

  // role = 'Admin' for the admin login page, undefined for customer login
  const login = (identifier, password, role) => {
    const id = identifier.trim().toLowerCase()
    const found = users.find((u) => u.email.toLowerCase() === id || u.name.toLowerCase() === id)
    if (!found) return { ok: false, error: 'Account not found. Check your email or register a new account.' }
    if (found.password !== password) return { ok: false, error: 'Incorrect password. Please try again.' }
    if (role === 'Admin' && found.role !== 'Admin') return { ok: false, error: 'This account is not an admin.' }
    if (role !== 'Admin' && found.role === 'Admin') return { ok: false, error: 'Admins must sign in through the Admin Panel.' }
    const session = { id: found.id, name: found.name, email: found.email, role: found.role }
    setUser(session)
    return { ok: true, user: session }
  }
  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
