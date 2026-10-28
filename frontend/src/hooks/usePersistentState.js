// ===== FILE: src/hooks/usePersistentState.js | PURPOSE: useState that saves to localStorage =====
// So your demo data (cart, products, orders) is still there after a page refresh.
import { useEffect, useState } from 'react'

export default function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem('perfume-shop:' + key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem('perfume-shop:' + key, JSON.stringify(value))
    } catch {
      /* storage full or blocked - ignore */
    }
  }, [key, value])
  return [value, setValue]
}
