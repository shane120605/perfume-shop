// ===== FILE: src/main.jsx | PURPOSE: app entry. Wraps everything with Router + data providers =====
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { StoreProvider } from './context/StoreContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import './styles/global.css'
import './styles/customer.css'
import './styles/admin.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
)
