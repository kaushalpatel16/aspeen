
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/UI/ProductCard';
import { Button } from '@/components/ui/button';
import { allProducts, categories } from '@/data/products';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState(allProducts);
  
  // Filter products based on search query
  useEffect(() => {
    if (query) {
      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts([]);
    }
  }, [query]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="pt-8 pb-4">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-muted-foreground">
            {products.length} results for "{query}"
          </p>
        </div>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">No products found</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We couldn't find any products matching your search. Try different keywords or browse our categories.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.slice(0, 6).map((category) => (
                <Button 
                  key={category.id}
                  variant="outline"
                  asChild
                >
                  <Link to={`/category#${category.id}`}>
                    {category.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
