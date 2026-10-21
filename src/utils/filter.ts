import { Product, ProductCategory } from '../types/fashion';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

export function filterProducts(
  products: Product[],
  category: ProductCategory,
  searchQuery: string = '',
  sortBy: SortOption = 'featured'
): Product[] {
  let result = products.slice();

  if (category !== 'All') {
    result = result.filter((p) => p.category === category);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    );
  }

  switch (sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'featured':
    default:
      // Featured items first, maintaining relative order
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }

  return result;
}
