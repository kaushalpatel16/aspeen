
import { useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/UI/ProductCard';
import BrandLogo from '@/components/UI/BrandLogo';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const featuredProducts = [
  {
    id: "fp1",
    name: "AMD Ryzen 9 7950X3D Processor",
    price: 699.99,
    originalPrice: 799.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3B1fGVufDB8fDB8fHww",
    category: "Processors",
    isFeatured: true
  },
  {
    id: "fp2",
    name: "NVIDIA GeForce RTX 4090 Graphics Card",
    price: 1599.99,
    originalPrice: 1699.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3B1fGVufDB8fDB8fHww",
    category: "Graphics Cards",
    isFeatured: true
  },
  {
    id: "fp3",
    name: "ASUS ROG Maximus Z790 Hero Motherboard",
    price: 629.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW90aGVyYm9hcmR8ZW58MHx8MHx8fDA%3D",
    category: "Motherboards",
    isFeatured: true
  },
  {
    id: "fp4",
    name: "G.SKILL Trident Z5 RGB 32GB DDR5 6000MHz RAM",
    price: 189.99,
    originalPrice: 219.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFtfGVufDB8fDB8fHww",
    category: "Memory",
    isFeatured: true
  }
];

const topRatedProducts = [
  {
    id: "tr1",
    name: "Samsung 990 PRO 2TB NVMe SSD",
    price: 199.99,
    originalPrice: 249.99,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1607462771105-512a2b6a0d72?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHNzZHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Storage"
  },
  {
    id: "tr2",
    name: "Corsair RM850x 850W 80+ Gold Modular PSU",
    price: 139.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1662955676561-46c3c63df047?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBvd2VyJTIwc3VwcGx5fGVufDB8fDB8fHww",
    category: "Power Supplies"
  },
  {
    id: "tr3",
    name: "Noctua NH-D15 CPU Cooler",
    price: 99.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3B1JTIwY29vbGVyfGVufDB8fDB8fHww",
    category: "Cooling"
  },
  {
    id: "tr4",
    name: "Lian Li O11 Dynamic EVO Mid-Tower Case",
    price: 169.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587202372762-f68b7789943a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXB1dGVyJTIwY2FzZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Cases"
  }
];

const newReleases = [
  {
    id: "nr1",
    name: "Intel Core i9-14900K Processor",
    price: 589.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1555618254-3a96d71578bd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNwdXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Processors",
    isNew: true
  },
  {
    id: "nr2",
    name: "AMD Radeon RX 7900 XTX Graphics Card",
    price: 999.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542393533-4c4c4593dcfa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdwdXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Graphics Cards",
    isNew: true
  },
  {
    id: "nr3",
    name: "Seagate FireCuda 530 4TB NVMe SSD",
    price: 399.99,
    originalPrice: 449.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1602139137618-463a77a81fc8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3NkfGVufDB8fDB8fHww",
    category: "Storage",
    isNew: true
  },
  {
    id: "nr4",
    name: "Corsair Dominator Platinum RGB 64GB DDR5 7200MHz",
    price: 349.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFtfGVufDB8fDB8fHww",
    category: "Memory",
    isNew: true
  }
];

const topSellingProducts = [
  {
    id: "ts1",
    name: "Samsung 970 EVO Plus 1TB NVMe SSD",
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1541029071515-94ae455a28ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNzZHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Storage",
    isTopSelling: true
  },
  {
    id: "ts2",
    name: "AMD Ryzen 5 7600X Processor",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3B1fGVufDB8fDB8fHww",
    category: "Processors",
    isTopSelling: true
  },
  {
    id: "ts3",
    name: "Corsair Vengeance RGB Pro 32GB DDR4 3600MHz",
    price: 109.99,
    originalPrice: 139.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFtfGVufDB8fDB8fHww",
    category: "Memory",
    isTopSelling: true
  },
  {
    id: "ts4",
    name: "NVIDIA GeForce RTX 4070 Graphics Card",
    price: 599.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1587202372555-e9832bc99190?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdwdXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Graphics Cards",
    isTopSelling: true
  }
];

const brands = [
  { name: "AMD", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/2560px-AMD_Logo.svg.png" },
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/2560px-Intel_logo_%282006-2020%29.svg.png" },
  { name: "NVIDIA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png" },
  { name: "ASUS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/2560px-ASUS_Logo.svg.png" },
  { name: "MSI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/MSI_Logo.svg/2560px-MSI_Logo.svg.png" },
  { name: "Corsair", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Corsair_logo.svg/2560px-Corsair_logo.svg.png" }
];

const Index = () => {
  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach(section => {
      section.classList.add('opacity-0', 'translate-y-10');
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1600&auto=format&fit=crop&q=80" 
            alt="PC Components" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
              Premium PC Components
              <br />
              <span className="text-primary">For Enthusiasts</span>
            </h1>
            <p className="mt-4 text-lg text-white/80 animate-fade-in" style={{ animationDelay: '300ms' }}>
              Build your dream PC with high-performance hardware from the world's leading brands.
            </p>
            <div className="mt-8 flex space-x-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Explore Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 reveal-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/category" className="flex items-center text-sm font-medium text-primary hover:text-primary/80">
              <span>View All</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-secondary reveal-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Top Brands</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
            {brands.map((brand) => (
              <BrandLogo key={brand.name} {...brand} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Products */}
      <section className="py-16 reveal-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Top Rated Products</h2>
            <Link to="/category" className="flex items-center text-sm font-medium text-primary hover:text-primary/80">
              <span>View All</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Hot New Releases */}
      <section className="py-16 reveal-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Hot New Releases</h2>
            <Link to="/category" className="flex items-center text-sm font-medium text-primary hover:text-primary/80">
              <span>View All</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newReleases.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="py-16 bg-secondary reveal-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Top Selling Products</h2>
            <Link to="/category" className="flex items-center text-sm font-medium text-primary hover:text-primary/80">
              <span>View All</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSellingProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative reveal-section">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60" />
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1600&auto=format&fit=crop&q=80" 
            alt="PC Setup" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your Dream PC?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Get expert advice and premium components to create the perfect setup for your needs.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
