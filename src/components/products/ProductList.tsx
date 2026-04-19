import type { ProductWithImages } from '@/interfaces';
import type { FC } from 'react';
import { ProductCard } from '.';

interface ProductListProps {
  products: ProductWithImages[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 place-items-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;