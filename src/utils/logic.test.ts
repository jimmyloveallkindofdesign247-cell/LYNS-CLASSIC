import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSubtotal, calculateShipping, calculateTotal, formatCurrency, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from './cart';
import { filterProducts } from './filter';
import { validateBespokeBooking } from './validation';
import { Product, CartItem } from '../types/fashion';

const mockProductA: Product = {
  id: 'prod-1',
  title: 'Midnight Velvet Gown',
  category: 'Evening Wear',
  price: 680,
  description: 'Sculptural luxury evening wear',
  material: '100% Silk Velvet',
  silhouette: 'Architectural one-shoulder drape',
  sizes: ['XS', 'S', 'M', 'L'],
  colors: [{ name: 'Onyx Noir', hex: '#0a0a0a' }],
  inStock: true,
  featured: true,
  image: '/src/assets/images/collection_evening_wear_1792577339344.jpg',
};

const mockProductB: Product = {
  id: 'prod-2',
  title: 'Neon Matrix Trench',
  category: 'Streetwear Couture',
  price: 420,
  description: 'Urban runway tailored oversized coat',
  material: 'Bonded Tech-Wool',
  silhouette: 'Oversized structured silhouette',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: [{ name: 'Deep Carbon', hex: '#18181b' }],
  inStock: true,
  featured: false,
  image: '/src/assets/images/collection_streetwear_couture_1792577340670.jpg',
};

test('Cart calculations: subtotal, shipping, and discount', () => {
  const items: CartItem[] = [
    {
      id: 'prod-1-M-Onyx Noir',
      product: mockProductA,
      selectedSize: 'M',
      selectedColor: 'Onyx Noir',
      quantity: 1,
    },
    {
      id: 'prod-2-L-Deep Carbon',
      product: mockProductB,
      selectedSize: 'L',
      selectedColor: 'Deep Carbon',
      quantity: 2,
    },
  ];

  const subtotal = calculateSubtotal(items);
  // 680 * 1 + 420 * 2 = 680 + 840 = 1520
  assert.equal(subtotal, 1520);

  // Over threshold ($500), shipping should be 0
  const shippingFree = calculateShipping(subtotal);
  assert.equal(shippingFree, 0);

  // Under threshold, shipping should be standard fee
  const shippingUnder = calculateShipping(300);
  assert.equal(shippingUnder, STANDARD_SHIPPING_FEE);

  // Zero cart shipping
  assert.equal(calculateShipping(0), 0);

  // Total with 10% discount
  const total = calculateTotal(subtotal, shippingFree, 10);
  assert.equal(total, 1520 - 152); // 1368
});

test('Currency formatting', () => {
  assert.equal(formatCurrency(680), '$680');
});

test('Product filtering by category and search term', () => {
  const products = [mockProductA, mockProductB];

  // Category filter
  const eveningWear = filterProducts(products, 'Evening Wear');
  assert.equal(eveningWear.length, 1);
  assert.equal(eveningWear[0].title, 'Midnight Velvet Gown');

  // Search filter
  const searchResults = filterProducts(products, 'All', 'Trench');
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'prod-2');

  // Sort by price desc
  const sorted = filterProducts(products, 'All', '', 'price-desc');
  assert.equal(sorted[0].price, 680);
  assert.equal(sorted[1].price, 420);
});

test('Bespoke booking validation', () => {
  const invalid = validateBespokeBooking({
    name: '',
    email: 'bad-email',
    phone: '123',
    collectionInterest: '',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.collectionInterest);

  const valid = validateBespokeBooking({
    name: 'Eleanor Vance',
    email: 'eleanor@example.com',
    phone: '+1 555-019-2834',
    collectionInterest: 'Evening Wear',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
