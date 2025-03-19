
import { useState, useEffect } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isTopSelling?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  rating,
  image,
  category,
  isNew = false,
  isFeatured = false,
  isTopSelling = false,
}: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Format price with commas
  const formatPrice = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  };
  
  // Calculate discount percentage
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  return (
    <div 
      className={cn(
        "product-card product-card-hover group",
        "flex flex-col h-full"
      )}
    >
      {/* Image container with badges */}
      <div className="relative overflow-hidden rounded-t-xl">
        {/* Product image with blur loading effect */}
        <div 
          className={cn(
            "blur-load w-full aspect-square bg-muted",
            imageLoaded && "loaded"
          )}
          style={{ backgroundImage: `url(${image})` }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="chip bg-primary text-white text-xs">
              New
            </span>
          )}
          {isFeatured && (
            <span className="chip bg-black text-white text-xs">
              Featured
            </span>
          )}
          {isTopSelling && (
            <span className="chip bg-amber-500 text-white text-xs">
              Top Selling
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="chip bg-red-500 text-white text-xs">
              -{discountPercentage}%
            </span>
          )}
        </div>
        
        {/* Quick action button */}
        <div className="absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button size="icon" className="bg-white text-primary hover:bg-white hover:text-primary/80 shadow-md h-9 w-9 rounded-full">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-grow p-4 bg-card">
        {/* Category */}
        <Link to={`/category#${category.toLowerCase()}`}>
          <span className="text-xs text-muted-foreground hover:text-primary transition-colors">
            {category}
          </span>
        </Link>
        
        {/* Product name */}
        <Link to={`/product/${id}`} className="mt-1 mb-1">
          <h3 className="font-medium text-base line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="flex items-center mt-auto pt-2">
          <span className="font-semibold">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-muted-foreground line-through text-sm ml-2">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
        
        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(rating) 
                    ? "text-amber-400 fill-amber-400" 
                    : "text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">({rating})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
