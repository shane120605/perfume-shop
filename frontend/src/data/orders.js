// ===== FILE: src/data/orders.js | PURPOSE: seed (sample) ORDERS =====
// Used by: My Orders (C9), Order Details (C10), Admin Orders (A4/A4a), Dashboard (A2), Sales Report (A6)
// items = [[productId, quantity], ...]  -> total is computed from seed product prices
import { seedProducts } from './products'

const price = (id) => seedProducts.find((p) => p.id === id).price

const make = (no, customer, email, date, status, items, payment = 'Cash on Delivery') => ({
  no,
  customer,
  email,
  date, // YYYY-MM-DD
  status, // Pending | Delivered | Cancelled
  payment,
  phone: '0917 123 4567',
  address: '24 Rizal Street, Barangay Poblacion, Liloan, Cebu',
  items: items.map(([productId, qty]) => ({ productId, qty, price: price(productId) })),
  total: items.reduce((sum, [id, qty]) => sum + price(id) * qty, 0),
})

export const seedOrders = [
  make(12345, 'Juan Dela Cruz', 'juan@shop.com', '2025-05-20', 'Pending', [[1, 1], [4, 1]]),
  make(12344, 'Ana Santos', 'ana@shop.com', '2025-05-18', 'Delivered', [[2, 1]]),
  make(12343, 'Maria Lopez', 'maria@shop.com', '2025-05-15', 'Delivered', [[5, 1], [4, 1]]),
  make(12342, 'Carlo Reyes', 'carlo@shop.com', '2025-05-12', 'Cancelled', [[3, 1]]),
  make(12341, 'Liza Mendoza', 'liza@shop.com', '2025-05-09', 'Delivered', [[6, 1]], 'GCash / Online Payment'),
  make(12340, 'Ana Santos', 'ana@shop.com', '2025-05-06', 'Delivered', [[8, 2]]),
  make(12339, 'Maria Lopez', 'maria@shop.com', '2025-05-03', 'Delivered', [[7, 3]]),
  make(12338, 'Carlo Reyes', 'carlo@shop.com', '2025-05-28', 'Pending', [[10, 1]]),
  make(12337, 'Liza Mendoza', 'liza@shop.com', '2025-05-25', 'Delivered', [[9, 2]]),
  make(12336, 'Juan Dela Cruz', 'juan@shop.com', '2025-05-23', 'Delivered', [[11, 1], [12, 1]]),
  make(12335, 'Ana Santos', 'ana@shop.com', '2025-05-30', 'Pending', [[1, 2]]),
  make(12334, 'Juan Dela Cruz', 'juan@shop.com', '2025-05-14', 'Delivered', [[6, 1], [7, 1]]),
]
