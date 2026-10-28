// ===== FILE: src/components/common/Button.jsx =====
// PURPOSE: the one button used everywhere. kind = primary | dark | outline | soft | danger
// Pass `to="/path"` to make it a link, otherwise it is a normal <button>.
import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function Button({ kind = 'primary', size, block, icon, to, children, className = '', ...rest }) {
  const cls = `btn btn--${kind} ${size === 'sm' ? 'btn--sm' : ''} ${block ? 'btn--block' : ''} ${className}`
  const content = (
    <>
      {icon && <Icon name={icon} size={size === 'sm' ? 15 : 18} />}
      {children}
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>
  return <button type="button" className={cls} {...rest}>{content}</button>
}
