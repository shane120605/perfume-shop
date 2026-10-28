# Perfume Shop – React + Vite (Front End)

Front end of the **Online Perfume Shop System**, built from the Figma prototype
(Customer side C1–C10 + Admin side A1–A6). No backend: all data is sample data saved in the browser (localStorage).

## How to run (VS Code)
1. Open the `perfume-shop` folder in VS Code  (File → Open Folder)
2. Open the terminal (Ctrl + `) and run:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:5173

> Needs Node.js 18+ (https://nodejs.org).

## Add the perfume photos (optional but recommended)
Export the 5 images from the **Image Assets** section of the Figma file and put them in `public/images/`
(exact names are in `public/images/README.txt`). Without them the site shows a pink bottle placeholder.

## Demo accounts
| Role     | Login              | Password      |
|----------|--------------------|---------------|
| Customer | juan@shop.com      | password123   |
| Admin    | admin (or admin@shop.com) | admin123 |

You can also create a new customer on the Register page.
Admin login page: http://localhost:5173/admin/login  (or the small link on the customer login page).
Admin sidebar → **Settings** resets all demo data.

---

## FOLDER MAP  (what is each folder / file?)

```
perfume-shop/
├── index.html                 HTML entry (loads fonts + main.jsx)
├── package.json               project + dependencies
├── vite.config.js             Vite settings
├── public/images/             <-- PUT PERFUME PHOTOS HERE (hero.png, perfume-1..4.png)
└── src/
    ├── main.jsx               app entry: Router + data providers + CSS
    ├── App.jsx                root: scroll-to-top + routes
    │
    ├── routes/                ★ ALL URLS
    │   ├── AppRoutes.jsx          every page URL (each line shows its Figma code)
    │   └── ProtectedRoute.jsx     login guard (customer / admin)
    │
    ├── context/               ★ APP STATE ("database" + login + cart)
    │   ├── StoreContext.jsx       products, users, orders + add/edit/delete functions
    │   ├── AuthContext.jsx        login / logout / who is signed in
    │   └── CartContext.jsx        shopping cart
    │
    ├── data/                  ★ SAMPLE DATA
    │   ├── products.js            12 sample perfumes + categories
    │   ├── users.js               sample users (admin + customers)
    │   ├── orders.js              sample orders
    │   └── images.js              image paths
    │
    ├── hooks/usePersistentState.js    useState that saves to localStorage
    ├── utils/format.js                money (₱) + date helpers
    │
    ├── styles/                ★ CSS
    │   ├── global.css             colors/fonts (Figma tokens), buttons, forms, cards, modal
    │   ├── customer.css           customer pages only
    │   └── admin.css              admin pages only
    │
    ├── components/            ★ REUSABLE PIECES
    │   ├── common/                used by both sides
    │   │   ├── Icon.jsx  Button.jsx  Badge.jsx  FormField.jsx
    │   │   ├── ProductImage.jsx  QuantityStepper.jsx  ConfirmDialog.jsx (delete popup)
    │   ├── customer/              Navbar.jsx  Footer.jsx  ProductCard.jsx  AuthLayout.jsx
    │   └── admin/                 AdminLayout.jsx (sidebar+top bar)  ProductForm.jsx  UserForm.jsx
    │
    └── pages/                 ★ ONE FILE = ONE FIGMA FRAME
        ├── customer/
        └── admin/
```

## FIGMA FRAME → FILE → URL

### Customer side (`src/pages/customer/`)
| Figma frame | File | URL |
|---|---|---|
| C1 · Customer Login | `C1_LoginPage.jsx` | `/login` |
| C2 · Register | `C2_RegisterPage.jsx` | `/register` |
| C3 · Home | `C3_HomePage.jsx` | `/` |
| C4 · Shop (Product Browsing) | `C4_ShopPage.jsx` | `/shop` |
| C5 · Product Details | `C5_ProductDetailsPage.jsx` | `/product/:id` |
| C6 · Shopping Cart | `C6_CartPage.jsx` | `/cart` |
| C7 · Checkout | `C7_CheckoutPage.jsx` | `/checkout` (login required) |
| C8 · Order Confirmation | `C8_OrderConfirmationPage.jsx` | `/order-confirmation` |
| C9 · My Orders | `C9_MyOrdersPage.jsx` | `/my-orders` (login required) |
| C10 · Order Details | `C10_OrderDetailsPage.jsx` | `/orders/:no` (login required) |

### Admin side (`src/pages/admin/`)
| Figma frame | File | URL |
|---|---|---|
| A1 · Admin Login | `A1_AdminLoginPage.jsx` | `/admin/login` |
| A2 · Admin Dashboard | `A2_DashboardPage.jsx` | `/admin` |
| A3 · Manage Products (+ A3d delete popup) | `A3_ManageProductsPage.jsx` | `/admin/products` |
| A3a · Add Product | `A3a_AddProductPage.jsx` | `/admin/products/new` |
| A3b · Edit Product | `A3b_EditProductPage.jsx` | `/admin/products/:id/edit` |
| A3c · View Product | `A3c_ViewProductPage.jsx` | `/admin/products/:id` |
| A4 · Manage Orders | `A4_ManageOrdersPage.jsx` | `/admin/orders` |
| A4a · View Order | `A4a_ViewOrderPage.jsx` | `/admin/orders/:no` |
| A5 · Manage Users (+ A5c delete popup) | `A5_ManageUsersPage.jsx` | `/admin/users` |
| A5a · Add User | `A5a_AddUserPage.jsx` | `/admin/users/new` |
| A5b · Edit User | `A5b_EditUserPage.jsx` | `/admin/users/:id/edit` |
| A6 · Sales Report | `A6_SalesReportPage.jsx` | `/admin/sales` |

Every file starts with a comment like `// FIGMA FRAME: C3 · Home | URL: /` so you can identify it quickly.

## Customer flow
Home → **Shop Now** → Shop → product card → **Add to Cart** → Cart → **Checkout** → **Place Order** → Confirmation → **My Orders** → **View Order**
(Register → Login. Login / Sign Up buttons are in the Home navbar.)

## Admin flow
Admin Login → Dashboard → sidebar (Products / Orders / Users / Reports).
Add / Edit / View open forms; Delete shows a confirmation popup and really removes the item.
