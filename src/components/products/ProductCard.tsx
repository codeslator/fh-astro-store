import type { ProductWithImages } from '@/interfaces';
import { useState, type FC } from 'react';

interface ProductCardProps {
  product: ProductWithImages;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const images = product.images.split(',').map((img) => {
    return img.startsWith('http') ? img : `${import.meta.env.PUBLIC_URL}/images/products/${img}`;
  });

  const [currentImage, setCurrentImage] = useState<string>(images[0]);


  const handleMouseEnter = () => {
    if (images.length > 1) {
      setCurrentImage(images[1]);
    }
  }

  const handleMouseLeave = () => {
    setCurrentImage(images[0]);
  }

  return (
    <a href={`/products/${product.slug}`}>
      <img
        src={currentImage}
        alt={product.title}
        className="h-[350px] object-contain"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <h4>{product.title}</h4>
      <p>${product.price}</p>
    </a>
  );
};

export default ProductCard;