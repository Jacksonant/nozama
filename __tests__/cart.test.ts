import { useCart } from '@/store/cart'
import { Product, ProductColor } from '@/lib/types'

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  price: '10.99',
  price_sign: '$',
  currency: 'USD',
  product_type: 'lipstick',
  brand: 'test-brand',
  api_featured_image: 'test.jpg',
  image_link: 'test.jpg',
  product_link: 'test-link',
  website_link: 'test-website',
  description: 'Test description',
  rating: 4.5,
  category: 'makeup',
  tag_list: ['test', 'lipstick'],
  created_at: '2023-01-01T00:00:00.000Z',
  updated_at: '2023-01-01T00:00:00.000Z',
  product_api_url: 'test-api-url',
  product_colors: [
    { hex_value: '#FF0000', colour_name: 'red' },
    { hex_value: '#00FF00', colour_name: 'green' }
  ]
}

const mockColor: ProductColor = { hex_value: '#FF0000', colour_name: 'red' }

describe('Cart Store', () => {
  beforeEach(() => {
    useCart.getState().clearCart()
  })

  test('adds new item to cart', () => {
    const { addItem } = useCart.getState()
    
    addItem(mockProduct, mockColor, 2)
    
    const { items } = useCart.getState()
    expect(items).toHaveLength(1)
    expect(items[0].product.id).toBe(1)
    expect(items[0].quantity).toBe(2)
    expect(items[0].selectedVariant?.color?.hex_value).toBe('#FF0000')
  })

  test('updates quantity for existing item', () => {
    const { addItem } = useCart.getState()
    
    addItem(mockProduct, mockColor, 1)
    addItem(mockProduct, mockColor, 2)
    
    const { items } = useCart.getState()
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(3)
  })

  test('removes item from cart', () => {
    const { addItem, removeItem, items } = useCart.getState()
    
    addItem(mockProduct, mockColor, 1)
    removeItem(mockProduct.id, { color: mockColor })
    
    expect(items).toHaveLength(0)
  })

  test('updates item quantity', () => {
    const { addItem, updateQuantity } = useCart.getState()
    
    addItem(mockProduct, mockColor, 1)
    updateQuantity(mockProduct.id, 5, { color: mockColor })
    
    const { items } = useCart.getState()
    expect(items[0].quantity).toBe(5)
  })

  test('removes item when quantity is 0', () => {
    const { addItem, updateQuantity, items } = useCart.getState()
    
    addItem(mockProduct, mockColor, 1)
    updateQuantity(mockProduct.id, 0, { color: mockColor })
    
    expect(items).toHaveLength(0)
  })

  test('calculates total correctly', () => {
    const { addItem } = useCart.getState()
    
    addItem(mockProduct, mockColor, 2)
    
    const { total } = useCart.getState()
    expect(total).toBe(21.98)
  })
})