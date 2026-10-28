// ===== FILE: src/data/images.js | PURPOSE: image paths (files live in /public/images) =====
export const heroImage = '/images/hero.png'
// product.image is a number 1-4 -> /images/perfume-1.png ... perfume-4.png
export const productImagePath = (n) => `/images/perfume-${n}.png`
