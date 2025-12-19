'use client';

import ProductCard from './ProductCard';
import { Product } from '@/types/product';

type Props = {
  title: string;
  products: Product[];
  showMore?: boolean;
  categoryId: string;
};

const CategorySection = ({ title, products, showMore, categoryId }: Props) => {
  return (
    <section id={categoryId} className="py-16">
      <h2 className="text-3xl text-center mb-8">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-10">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {showMore && (
        <div className="text-center mt-8 text-gray-600 cursor-pointer">
          More
        </div>
      )}
    </section>
  );
};

export default CategorySection;
