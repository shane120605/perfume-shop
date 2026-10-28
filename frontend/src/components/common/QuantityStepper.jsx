// ===== FILE: src/components/common/QuantityStepper.jsx | PURPOSE: the  [ - 1 + ]  control (Product Details + Cart) =====
import Icon from './Icon'

export default function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="stepper">
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>
        <Icon name="minus" size={16} />
      </button>
      <span>{value}</span>
      <button type="button" aria-label="Increase quantity" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  )
}
