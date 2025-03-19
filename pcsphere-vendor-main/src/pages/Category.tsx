
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import ProductCard from '@/components/UI/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { allProducts, categories } from '@/data/products';
import { Checkbox } from '@/components/ui/checkbox';

const Category = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [products, setProducts] = useState(allProducts);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  
  // New state for availability and features
  const [availability, setAvailability] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  
  // Extract category from URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && categories.some(cat => cat.id === hash)) {
      setActiveCategory(hash);
    } else {
      setActiveCategory(null);
    }
  }, [location.hash]);
  
  // Filter products based on active category and filters
  useEffect(() => {
    let filtered = [...allProducts];
    
    // Filter by category
    if (activeCategory) {
      const categoryName = categories.find(cat => cat.id === activeCategory)?.name;
      filtered = filtered.filter(product => product.category === categoryName);
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by brands if any selected
    if (selectedBrands.length > 0) {
      // Extract brand from product name for demo purposes
      // In a real app, products would have a brand property
      filtered = filtered.filter(product => {
        const brand = product.name.split(' ')[0]; // Get first word as brand
        return selectedBrands.includes(brand);
      });
    }
    
    // Filter by availability
    if (availability.length > 0) {
      if (availability.includes('in-stock') && !availability.includes('out-of-stock')) {
        // Only show in-stock items (for demo, consider all as in stock except those with originalPrice)
        filtered = filtered.filter(product => !product.originalPrice);
      } else if (!availability.includes('in-stock') && availability.includes('out-of-stock')) {
        // Only show out-of-stock items (for demo, consider items with originalPrice as previously out of stock)
        filtered = filtered.filter(product => product.originalPrice);
      }
      // If both or none are selected, show all
    }
    
    // Filter by features
    if (features.length > 0) {
      filtered = filtered.filter(product => {
        if (features.includes('on-sale') && !product.originalPrice) {
          return false;
        }
        if (features.includes('new-arrival') && !product.isNew) {
          return false;
        }
        if (features.includes('top-rated') && product.rating < 4.8) {
          return false;
        }
        return true;
      });
    }
    
    // Sort products
    switch (sortOption) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered = filtered.filter(p => p.isNew).concat(filtered.filter(p => !p.isNew));
        break;
      case 'featured':
      default:
        filtered = filtered.filter(p => p.isFeatured).concat(filtered.filter(p => !p.isFeatured));
        break;
    }
    
    setProducts(filtered);
  }, [activeCategory, priceRange, selectedBrands, sortOption, availability, features]);
  
  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  
  // Toggle availability option
  const toggleAvailability = (option: string) => {
    if (availability.includes(option)) {
      setAvailability(availability.filter(a => a !== option));
    } else {
      setAvailability([...availability, option]);
    }
  };
  
  // Toggle feature option
  const toggleFeature = (option: string) => {
    if (features.includes(option)) {
      setFeatures(features.filter(f => f !== option));
    } else {
      setFeatures([...features, option]);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 2000]);
    setSelectedBrands([]);
    setAvailability([]);
    setFeatures([]);
    setSortOption('featured');
  };

  // Get brands from products for the filter
  const availableBrands = Array.from(
    new Set(allProducts.map(product => product.name.split(' ')[0]))
  );

  return (
    <Layout>
      {/* Category Header */}
      <div className="pt-24 pb-8 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            {activeCategory 
              ? categories.find(cat => cat.id === activeCategory)?.name 
              : 'All Products'
            }
          </h1>
          <div className="flex overflow-x-auto py-4 scrollbar-hide space-x-4 md:flex-wrap">
            <Button 
              variant={activeCategory === null ? "default" : "outline"} 
              className="whitespace-nowrap"
              onClick={() => {
                window.location.hash = '';
                setActiveCategory(null);
              }}
            >
              All Products
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="whitespace-nowrap"
                onClick={() => {
                  window.location.hash = category.id;
                  setActiveCategory(category.id);
                }}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Product Listing */}
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Mobile Toggle */}
            <div className="md:hidden flex justify-between items-center mb-4">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort:</span>
                <select 
                  className="bg-secondary rounded-md py-2 px-3 text-sm"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            
            {/* Filters - Sidebar */}
            <div 
              className={cn(
                "w-full md:w-64 md:block",
                !showFilters && "hidden"
              )}
            >
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset
                  </Button>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Price Range</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                  {/* This is a simplified range slider. In a real app, you'd use a proper range slider component */}
                  <input 
                    type="range" 
                    min="0" 
                    max="2000" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full mt-2"
                  />
                </div>
                
                {/* Brands */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Brands</h4>
                  <div className="space-y-2">
                    {availableBrands.map((brand) => (
                      <div key={brand} className="flex items-center">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <label htmlFor={`brand-${brand}`} className="ml-2 text-sm cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Availability */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Availability</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="in-stock"
                        checked={availability.includes('in-stock')}
                        onCheckedChange={() => toggleAvailability('in-stock')}
                      />
                      <label htmlFor="in-stock" className="ml-2 text-sm cursor-pointer">
                        In Stock
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="out-of-stock"
                        checked={availability.includes('out-of-stock')}
                        onCheckedChange={() => toggleAvailability('out-of-stock')}
                      />
                      <label htmlFor="out-of-stock" className="ml-2 text-sm cursor-pointer">
                        Out of Stock
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Features</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="on-sale"
                        checked={features.includes('on-sale')}
                        onCheckedChange={() => toggleFeature('on-sale')}
                      />
                      <label htmlFor="on-sale" className="ml-2 text-sm cursor-pointer">
                        On Sale
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="new-arrival"
                        checked={features.includes('new-arrival')}
                        onCheckedChange={() => toggleFeature('new-arrival')}
                      />
                      <label htmlFor="new-arrival" className="ml-2 text-sm cursor-pointer">
                        New Arrival
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="top-rated"
                        checked={features.includes('top-rated')}
                        onCheckedChange={() => toggleFeature('top-rated')}
                      />
                      <label htmlFor="top-rated" className="ml-2 text-sm cursor-pointer">
                        Top Rated
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort and Results (desktop) */}
              <div className="hidden md:flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {products.length} products
                </p>
                
                <div className="flex items-center">
                  <span className="text-sm mr-2">Sort by:</span>
                  <select 
                    className="bg-secondary rounded-md py-2 px-3 text-sm"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
              
              {/* Products */}
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try changing your filters or browse all products.
                  </p>
                  <Button onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
              
              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-1">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>
                  <Button variant="default" size="icon" className="h-8 w-8">
                    1
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    2
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    3
                  </Button>
                  <span className="mx-1">...</span>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    10
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
