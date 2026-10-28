// ===== FILE: src/context/StoreContext.jsx =====
// PURPOSE: the "database" of the app (products, users, orders) + functions to change them.
// Data is saved in localStorage, so it survives page refresh. (No backend needed.)
import { createContext, useContext } from 'react'
import usePersistentState from '../hooks/usePersistentState'
import { seedProducts } from '../data/products'
import { seedUsers } from '../data/users'
import { seedOrders } from '../data/orders'
import { todayISO } from '../utils/format'

const StoreContext = createContext(null)
export const useStore = () => useContext(StoreContext)

const nextId = (list) => list.reduce((max, x) => Math.max(max, x.id), 0) + 1

export function StoreProvider({ children }) {
  const [products, setProducts] = usePersistentState('products-v1', seedProducts)
  const [users, setUsers] = usePersistentState('users-v1', seedUsers)
  const [orders, setOrders] = usePersistentState('orders-v1', seedOrders)

  // ----- PRODUCTS (Admin A3 / A3a / A3b) -----
  const addProduct = (data) => {
    const product = { ...data, id: nextId(products) }
    setProducts([...products, product])
    return product
  }
  const updateProduct = (id, data) => setProducts(products.map((p) => (p.id === id ? { ...p, ...data } : p)))
  const deleteProduct = (id) => setProducts(products.filter((p) => p.id !== id))

  // ----- USERS (Admin A5 / A5a / A5b + Register C2) -----
  const addUser = (data) => {
    const user = { ...data, id: nextId(users) }
    setUsers([...users, user])
    return user
  }
  const updateUser = (id, data) => setUsers(users.map((u) => (u.id === id ? { ...u, ...data } : u)))
  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id))

  // ----- ORDERS (Checkout C7, Admin A4/A4a) -----
  const placeOrder = ({ user, lines, shipping, payment }) => {
    const no = orders.reduce((max, o) => Math.max(max, o.no), 12330) + 1
    const order = {
      no,
      customer: shipping.fullName,
      email: user.email,
      date: todayISO(),
      status: 'Pending',
      payment,
      phone: shipping.phone,
      address: `${shipping.address}, ${shipping.city}`,
      items: lines.map((l) => ({ productId: l.product.id, qty: l.qty, price: l.product.price })),
      total: lines.reduce((sum, l) => sum + l.product.price * l.qty, 0),
    }
    setOrders([order, ...orders])
    // reduce stock of purchased products
    setProducts(
      products.map((p) => {
        const line = lines.find((l) => l.product.id === p.id)
        return line ? { ...p, stock: Math.max(0, p.stock - line.qty) } : p
      })
    )
    return order
  }
  const updateOrderStatus = (no, status) => setOrders(orders.map((o) => (o.no === no ? { ...o, status } : o)))

  const resetDemoData = () => {
    setProducts(seedProducts)
    setUsers(seedUsers)
    setOrders(seedOrders)
  }

  const value = {
    products, users, orders,
    addProduct, updateProduct, deleteProduct,
    addUser, updateUser, deleteUser,
    placeOrder, updateOrderStatus, resetDemoData,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
