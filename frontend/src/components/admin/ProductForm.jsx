// ===== FILE: src/components/admin/ProductForm.jsx =====
// PURPOSE: the product form used by BOTH "Add Product" (A3a) and "Edit Product" (A3b)
import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from '../common/FormField'
import Button from '../common/Button'
import Icon from '../common/Icon'
import ProductImage from '../common/ProductImage'
import { categories } from '../../data/products'

export default function ProductForm({ product, onSave, submitLabel }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price ?? '',
    stock: product?.stock ?? '',
    size: product?.size || '50 ml',
    description: product?.description || '',
  })
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '')
  const [errors, setErrors] = useState({})
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  // read the chosen image file and keep it as a data URL (preview + saved with the product)
  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 1024 * 1024) return setErrors({ ...errors, image: 'Image must be 1 MB or smaller.' })
    const reader = new FileReader()
    reader.onload = () => setImageUrl(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Enter the product name.'
    if (!form.category) next.category = 'Select a category.'
    if (!(Number(form.price) > 0)) next.price = 'Enter a price greater than 0.'
    if (form.stock === '' || Number(form.stock) < 0) next.stock = 'Enter the stock quantity.'
    setErrors(next)
    if (Object.keys(next).length) return
    onSave({
      ...form,
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      image: product?.image || 1,
      ...(imageUrl ? { imageUrl } : {}),
    })
  }

  const hasImage = imageUrl || product

  return (
    <form className="card form-card form-card--product" onSubmit={handleSubmit} noValidate>
      <div className="form-card__image">
        <label className="field-label">Product Image</label>
        {hasImage ? (
          <ProductImage product={product} src={imageUrl || undefined} className="form-card__preview" />
        ) : (
          <div className="upload-box"><Icon name="upload" size={32} color="#C4707F" /><strong>Click to upload image</strong><small>PNG or JPG, up to 1 MB</small></div>
        )}
        <label className="btn btn--outline btn--sm btn--block upload-btn">
          <Icon name="upload" size={16} /> {hasImage ? 'Change Image' : 'Choose Image'}
          <input type="file" accept="image/*" onChange={handleFile} hidden />
        </label>
        {errors.image && <span className="field__error">{errors.image}</span>}
      </div>

      <div className="form-card__fields">
        <FormField label="Product Name" placeholder="e.g. Rose Éclat" value={form.name} onChange={set('name')} error={errors.name} />
        <div className="two-col">
          <FormField label="Category" as="select" options={categories.filter((c) => c !== 'All')} placeholder="Select category" value={form.category} onChange={set('category')} error={errors.category} />
          <FormField label="Price (₱)" type="number" min="0" step="0.01" placeholder="0.00" value={form.price} onChange={set('price')} error={errors.price} />
        </div>
        <div className="two-col">
          <FormField label="Stock" type="number" min="0" placeholder="0" value={form.stock} onChange={set('stock')} error={errors.stock} />
          <FormField label="Size" placeholder="e.g. 50 ml" value={form.size} onChange={set('size')} />
        </div>
        <FormField label="Description" as="textarea" placeholder="Write a short product description..." value={form.description} onChange={set('description')} />
        <div className="form-actions">
          <Button type="submit">{submitLabel}</Button>
          <Button to="/admin/products" kind="outline">Cancel</Button>
        </div>
      </div>
    </form>
  )
}
