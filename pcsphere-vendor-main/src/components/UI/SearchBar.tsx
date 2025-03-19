
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { allProducts } from '@/data/products';

interface SearchBarProps {
  variant?: 'header' | 'mobile' | 'expanded';
  isScrolled?: boolean;
  className?: string;
}

const SearchBar = ({ variant = 'header', isScrolled, className }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Filter products based on search term
  const filteredProducts = searchValue.trim() === '' 
    ? [] 
    : allProducts.filter(product => 
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  
  // Handle search form submission
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setOpen(false);
      setSearchValue('');
    }
  };
  
  // Handle product selection
  const handleSelectProduct = (productId: string) => {
    // In a real app, this would navigate to the product detail page
    navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    setOpen(false);
    setSearchValue('');
  };
  
  // Determine search bar styles based on variant
  const getSearchBarStyles = () => {
    switch (variant) {
      case 'expanded':
        return 'w-full bg-secondary';
      case 'mobile':
        return 'w-full bg-secondary';
      case 'header':
      default:
        return cn(
          'hidden sm:flex items-center rounded-full px-3 py-1.5 transition-all duration-300',
          isScrolled ? 'bg-secondary' : 'bg-white/90 backdrop-blur-md'
        );
    }
  };
  
  return (
    <>
      <div 
        className={cn(
          getSearchBarStyles(),
          'search-focus',
          className
        )}
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent border-none outline-none ml-2 w-36 lg:w-48 text-sm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
          ref={inputRef}
        />
      </div>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <form onSubmit={handleSubmit}>
          <CommandInput 
            placeholder="Search products..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
        </form>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {filteredProducts.length > 0 && (
            <CommandGroup heading="Products">
              {filteredProducts.slice(0, 5).map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => handleSelectProduct(product.id)}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded overflow-hidden mr-2">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">${product.price}</p>
                    </div>
                  </div>
                </CommandItem>
              ))}
              {filteredProducts.length > 5 && (
                <CommandItem onSelect={() => handleSubmit()}>
                  <span className="text-sm text-muted-foreground">
                    View all {filteredProducts.length} results
                  </span>
                </CommandItem>
              )}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
