// ===== FILE: src/utils/format.js | PURPOSE: money + date helpers used everywhere =====
export const money = (n) =>
  '₱' + Number(n || 0).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// '2025-05-20' -> 'May 20, 2025'
export const formatDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export const todayISO = () => new Date().toISOString().slice(0, 10)
