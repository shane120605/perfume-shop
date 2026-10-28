// ===== FILE: src/components/customer/AuthLayout.jsx =====
// PURPOSE: shared layout for Login (C1) and Register (C2): navbar + photo on the left + form card on the right
import Navbar from './Navbar'
import Icon from '../common/Icon'
import { heroImage } from '../../data/images'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="page">
      <Navbar />
      <main className="auth">
        <div className="auth__photo" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="auth__tagline">
            <h2 className="serif">Smell Good, Feel Good</h2>
            <p>Discover fragrances made to be remembered.</p>
          </div>
        </div>
        <div className="auth__panel">
          <div className="auth__card">
            <Icon name="bottle" size={34} color="#C4707F" />
            <h1 className="serif">{title}</h1>
            <p className="auth__sub">{subtitle}</p>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
