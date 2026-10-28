// ===== FILE: src/App.jsx | PURPOSE: root component. Scrolls to top on page change, shows routes =====
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return <AppRoutes />
}
