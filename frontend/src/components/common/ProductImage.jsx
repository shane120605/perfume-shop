// ===== FILE: src/components/common/ProductImage.jsx =====
// PURPOSE: shows a perfume photo. If the image file is missing it shows a pink bottle placeholder instead.
import { useState } from 'react'
import Icon from './Icon'
import { productImagePath } from '../../data/images'

export default function ProductImage({ product, src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)
  const url = src || product?.imageUrl || productImagePath(product?.image || 1)
  if (failed) {
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt || product?.name}>
        <Icon name="bottle" size={48} color="#C4707F" strokeWidth={1.25} />
      </div>
    )
  }
  return <img className={className} src={url} alt={alt || product?.name || 'Perfume'} onError={() => setFailed(true)} />
}
