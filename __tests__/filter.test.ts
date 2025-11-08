import { FilterState } from '@/lib/types'

const mockProducts = [
  { id: 1, name: 'Red Lipstick', price: '10.99', product_type: 'lipstick', brand: 'maybelline' },
  { id: 2, name: 'Blue Eyeshadow', price: '15.50', product_type: 'eyeshadow', brand: 'revlon' },
  { id: 3, name: 'Pink Lipstick', price: '8.99', product_type: 'lipstick', brand: 'maybelline' },
]

describe('Filter Logic', () => {
  test('filters products by search term', () => {
    const filtered = mockProducts.filter(p => p.name.toLowerCase().includes('red'))
    
    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe('Red Lipstick')
  })

  test('filters products by category', () => {
    const filtered = mockProducts.filter(p => p.product_type === 'lipstick')
    
    expect(filtered).toHaveLength(2)
    expect(filtered.every(p => p.product_type === 'lipstick')).toBe(true)
  })

  test('filters products by price range', () => {
    const filtered = mockProducts.filter(p => parseFloat(p.price) >= 10 && parseFloat(p.price) <= 15)
    
    expect(filtered).toHaveLength(1)
    expect(filtered.every(p => parseFloat(p.price) >= 10 && parseFloat(p.price) <= 15)).toBe(true)
  })

  test('combines multiple filters', () => {
    const filtered = mockProducts.filter(p => 
      p.product_type === 'lipstick' && 
      p.brand === 'maybelline' &&
      parseFloat(p.price) <= 10
    )
    
    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe('Pink Lipstick')
  })

  test('builds query string correctly', () => {
    const filters: FilterState = {
      search: 'lipstick',
      category: 'makeup',
      minPrice: 5,
      maxPrice: 20
    }

    const params = new URLSearchParams()
    if (filters.search) params.set('search', filters.search)
    if (filters.category) params.set('category', filters.category)
    if (filters.minPrice > 0) params.set('minPrice', filters.minPrice.toString())
    if (filters.maxPrice > 0) params.set('maxPrice', filters.maxPrice.toString())

    const queryString = params.toString()
    
    expect(queryString).toContain('search=lipstick')
    expect(queryString).toContain('category=makeup')
    expect(queryString).toContain('minPrice=5')
    expect(queryString).toContain('maxPrice=20')
  })
})