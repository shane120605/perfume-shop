// ===== FILE: src/components/common/FormField.jsx =====
// PURPOSE: label + input/select/textarea + error text. Used by every form in the app.
// as = 'input' (default) | 'select' | 'textarea'     options = ['A','B'] for select
import Icon from './Icon'

export default function FormField({ label, icon, as = 'input', options = [], error, id, className = '', ...props }) {
  const fieldId = id || 'f-' + String(label || props.name || '').toLowerCase().replace(/\W+/g, '-')
  let control
  if (as === 'select') {
    control = (
      <select id={fieldId} className="input" {...props}>
        <option value="">{props.placeholder || 'Select...'}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    )
  } else if (as === 'textarea') {
    control = <textarea id={fieldId} className="input input--area" rows={4} {...props} />
  } else {
    control = <input id={fieldId} className="input" {...props} />
  }
  return (
    <div className={`field ${error ? 'field--error' : ''} ${className}`}>
      {label && <label htmlFor={fieldId}>{label}</label>}
      <div className={`input-wrap ${icon ? 'input-wrap--icon' : ''}`}>
        {icon && <Icon name={icon} size={18} className="input-wrap__icon" />}
        {control}
      </div>
      {error && <span className="field__error">{error}</span>}
    </div>
  )
}
