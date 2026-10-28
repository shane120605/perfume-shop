// ===== FILE: src/context/CartContext.jsx =====
// PURPOSE: shopping cart (Add to Cart C5, Cart C6, Checkout C7). Saved in localStorage.
import { createContext, useContext } from 'react'
import usePersistentState from '../hooks/usePersistentState'
import { useStore } from './StoreContext'

const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {
  const { products } = useStore()
  const [items, setItems] = usePersistentState('cart-v1', []) // [{ productId, qty }]

  const stockOf = (id) => products.find((p) => p.id === id)?.stock ?? 99

  const addToCart = (productId, qty = 1) => {
    const max = stockOf(productId)
    const existing = items.find((i) => i.productId === productId)
    if (existing) {
      setItems(items.map((i) => (i.productId === productId ? { ...i, qty: Math.min(max, i.qty + qty) } : i)))
    } else {
      setItems([...items, { productId, qty: Math.min(max, qty) }])
    }
  }
  const setQty = (productId, qty) =>
    setItems(items.map((i) => (i.productId === productId ? { ...i, qty: Math.max(1, Math.min(stockOf(productId), qty)) } : i)))
  const removeFromCart = (productId) => setItems(items.filter((i) => i.productId !== productId))
  const clearCart = () => setItems([])

  // lines = cart items joined with the full product info
  const lines = items
    .map((i) => ({ product: products.find((p) => p.id === i.productId), qty: i.qty }))
    .filter((l) => l.product)
  const count = lines.reduce((n, l) => n + l.qty, 0)
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0)

  return (
    <CartContext.Provider value={{ lines, count, subtotal, addToCart, setQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
