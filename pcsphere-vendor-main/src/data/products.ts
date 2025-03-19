
// Export products data to be used across the application
export const allProducts = [
  // Processors
  {
    id: "p1",
    name: "AMD Ryzen 9 7950X3D Processor",
    price: 699.99,
    originalPrice: 799.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3B1fGVufDB8fDB8fHww",
    category: "Processors",
    isFeatured: true
  },
  {
    id: "p2",
    name: "Intel Core i9-14900K Processor",
    price: 589.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1555618254-3a96d71578bd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNwdXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Processors",
    isNew: true
  },
  {
    id: "p3",
    name: "AMD Ryzen 5 7600X Processor",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3B1fGVufDB8fDB8fHww",
    category: "Processors",
    isTopSelling: true
  },
  
  // Graphics Cards
  {
    id: "g1",
    name: "NVIDIA GeForce RTX 4090 Graphics Card",
    price: 1599.99,
    originalPrice: 1699.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3B1fGVufDB8fDB8fHww",
    category: "Graphics Cards",
    isFeatured: true
  },
  {
    id: "g2",
    name: "AMD Radeon RX 7900 XTX Graphics Card",
    price: 999.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542393533-4c4c4593dcfa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdwdXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Graphics Cards",
    isNew: true
  },
  {
    id: "g3",
    name: "NVIDIA GeForce RTX 4070 Graphics Card",
    price: 599.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1587202372555-e9832bc99190?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdwdXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Graphics Cards",
    isTopSelling: true
  },
  
  // Motherboards
  {
    id: "m1",
    name: "ASUS ROG Maximus Z790 Hero Motherboard",
    price: 629.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW90aGVyYm9hcmR8ZW58MHx8MHx8fDA%3D",
    category: "Motherboards",
    isFeatured: true
  },
  {
    id: "m2",
    name: "MSI MPG X670E Carbon WiFi Motherboard",
    price: 479.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW90aGVyYm9hcmR8ZW58MHx8MHx8fDA%3D",
    category: "Motherboards"
  },
  
  // Memory
  {
    id: "mem1",
    name: "G.SKILL Trident Z5 RGB 32GB DDR5 6000MHz RAM",
    price: 189.99,
    originalPrice: 219.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFtfGVufDB8fDB8fHww",
    category: "Memory",
    isFeatured: true
  },
  {
    id: "mem2",
    name: "Corsair Dominator Platinum RGB 64GB DDR5 7200MHz",
    price: 349.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFtfGVufDB8fDB8fHww",
    category: "Memory",
    isNew: true
  },
  {
    id: "mem3",
    name: "Corsair Vengeance RGB Pro 32GB DDR4 3600MHz",
    price: 109.99,
    originalPrice: 139.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFtfGVufDB8fDB8fHww",
    category: "Memory",
    isTopSelling: true
  },
  
  // Storage
  {
    id: "s1",
    name: "Samsung 990 PRO 2TB NVMe SSD",
    price: 199.99,
    originalPrice: 249.99,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1607462771105-512a2b6a0d72?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHNzZHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Storage"
  },
  {
    id: "s2",
    name: "Seagate FireCuda 530 4TB NVMe SSD",
    price: 399.99,
    originalPrice: 449.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1602139137618-463a77a81fc8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3NkfGVufDB8fDB8fHww",
    category: "Storage",
    isNew: true
  },
  {
    id: "s3",
    name: "Samsung 970 EVO Plus 1TB NVMe SSD",
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1541029071515-94ae455a28ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNzZHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Storage",
    isTopSelling: true
  },
  
  // Power Supplies
  {
    id: "ps1",
    name: "Corsair RM850x 850W 80+ Gold Modular PSU",
    price: 139.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1662955676561-46c3c63df047?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBvd2VyJTIwc3VwcGx5fGVufDB8fDB8fHww",
    category: "Power Supplies"
  },
  
  // Cases
  {
    id: "c1",
    name: "Lian Li O11 Dynamic EVO Mid-Tower Case",
    price: 169.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587202372762-f68b7789943a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXB1dGVyJTIwY2FzZXxlbnwwfHwwfHx8MA%3D%3D",
    category: "Cases"
  },
  
  // Cooling
  {
    id: "cool1",
    name: "Noctua NH-D15 CPU Cooler",
    price: 99.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587202372583-49330a15584d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3B1JTIwY29vbGVyfGVufDB8fDB8fHww",
    category: "Cooling"
  }
];

// Categories
export const categories = [
  { id: 'processors', name: 'Processors' },
  { id: 'graphics-cards', name: 'Graphics Cards' },
  { id: 'motherboards', name: 'Motherboards' },
  { id: 'memory', name: 'Memory' },
  { id: 'storage', name: 'Storage' },
  { id: 'power-supplies', name: 'Power Supplies' },
  { id: 'cases', name: 'Cases' },
  { id: 'cooling', name: 'Cooling' },
  { id: 'peripherals', name: 'Peripherals' }
];
