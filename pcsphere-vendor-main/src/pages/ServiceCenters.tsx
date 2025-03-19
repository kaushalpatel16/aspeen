
import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { MapPin, Search, Phone, Clock, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock service center data
const serviceCenters = [
  {
    id: 1,
    name: "PCSPHERE Flagship Service Center",
    address: "123 Tech Avenue, San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    email: "sf.service@pcsphere.com",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM",
    services: ["Hardware Repair", "Software Troubleshooting", "PC Build Services", "Warranty Claims", "Component Testing"],
    coordinates: { lat: 37.7749, lng: -122.4194 },
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 2,
    name: "PCSPHERE New York Service Center",
    address: "456 Digital Street, New York, NY 10001",
    phone: "+1 (555) 234-5678",
    email: "ny.service@pcsphere.com",
    hours: "Monday - Friday: 9:00 AM - 7:00 PM\nSaturday: 10:00 AM - 5:00 PM",
    services: ["Hardware Repair", "Component Upgrades", "Data Recovery", "Warranty Claims", "PC Build Services"],
    coordinates: { lat: 40.7128, lng: -74.0060 },
    image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b2ZmaWNlJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 3,
    name: "PCSPHERE Seattle Service Hub",
    address: "789 Innovation Park, Seattle, WA 98101",
    phone: "+1 (555) 345-6789",
    email: "seattle.service@pcsphere.com",
    hours: "Monday - Friday: 8:30 AM - 6:30 PM\nSaturday: 10:00 AM - 4:00 PM",
    services: ["Hardware Repair", "Liquid Damage Repair", "OS Installations", "PC Building Workshops", "Warranty Claims"],
    coordinates: { lat: 47.6062, lng: -122.3321 },
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 4,
    name: "PCSPHERE Austin Tech Center",
    address: "101 Computing Drive, Austin, TX 78701",
    phone: "+1 (555) 456-7890",
    email: "austin.service@pcsphere.com",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 11:00 AM - 3:00 PM",
    services: ["Hardware Repair", "Component Testing", "Custom PC Building", "Warranty Claims", "Performance Optimization"],
    coordinates: { lat: 30.2672, lng: -97.7431 },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b2ZmaWNlJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 5,
    name: "PCSPHERE Boston Repair Center",
    address: "222 Tech Square, Boston, MA 02110",
    phone: "+1 (555) 567-8901",
    email: "boston.service@pcsphere.com",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM",
    services: ["Hardware Repair", "Water Cooling Setup", "Component Upgrades", "Warranty Claims", "Technical Consulting"],
    coordinates: { lat: 42.3601, lng: -71.0589 },
    image: "https://images.unsplash.com/photo-1577760258779-e787a1733016?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG9mZmljZSUyMGJ1aWxkaW5nfGVufDB8fDB8fHww"
  },
  {
    id: 6,
    name: "PCSPHERE Chicago Service Center",
    address: "333 Digital Avenue, Chicago, IL 60607",
    phone: "+1 (555) 678-9012",
    email: "chicago.service@pcsphere.com",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM",
    services: ["Hardware Repair", "Custom Cable Management", "Overclocking Services", "Warranty Claims", "System Diagnostics"],
    coordinates: { lat: 41.8781, lng: -87.6298 },
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9mZmljZSUyMGJ1aWxkaW5nfGVufDB8fDB8fHww"
  }
];

const states = [...new Set(serviceCenters.map(center => center.address.split(', ')[1].split(' ')[0]))];

const ServiceCenters = () => {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<typeof serviceCenters[0] | null>(null);
  
  // Filter service centers based on search and state filter
  const filteredCenters = serviceCenters.filter(center => {
    const matchesSearch = search === '' || 
      center.name.toLowerCase().includes(search.toLowerCase()) ||
      center.address.toLowerCase().includes(search.toLowerCase());
      
    const matchesState = selectedState === null || 
      center.address.includes(selectedState);
      
    return matchesSearch && matchesState;
  });
  
  return (
    <Layout>
      {/* Header */}
      <div className="pt-28 pb-12 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Service Centers</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit one of our authorized service centers for expert technical support, repairs, and hardware services.
          </p>
        </div>
      </div>
      
      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search service centers by name or location..."
                className="pl-10 pr-4 py-2 w-full border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="md:w-48">
              <select
                value={selectedState || ''}
                onChange={(e) => setSelectedState(e.target.value || null)}
                className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Centers List and Details */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Centers List */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Locations ({filteredCenters.length})</h2>
              
              {/* No results message */}
              {filteredCenters.length === 0 && (
                <div className="bg-secondary p-6 rounded-lg text-center">
                  <p className="text-muted-foreground mb-2">No service centers found</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearch('');
                      setSelectedState(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
              
              {/* Centers list */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredCenters.map(center => (
                  <div
                    key={center.id}
                    className={cn(
                      "bg-white border rounded-lg p-4 cursor-pointer transition-all",
                      selectedCenter?.id === center.id
                        ? "border-primary shadow-md"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setSelectedCenter(center)}
                  >
                    <h3 className="font-semibold">{center.name}</h3>
                    <div className="flex items-start mt-2">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 mr-2" />
                      <p className="text-sm text-muted-foreground">{center.address}</p>
                    </div>
                    <div className="flex items-center mt-2">
                      <Phone className="h-4 w-4 text-muted-foreground shrink-0 mr-2" />
                      <p className="text-sm text-muted-foreground">{center.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Center Details */}
            <div className="lg:col-span-2">
              {selectedCenter ? (
                <div className="bg-white border border-border rounded-lg overflow-hidden">
                  {/* Image */}
                  <div className="h-64 bg-muted">
                    <img
                      src={selectedCenter.image}
                      alt={selectedCenter.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">{selectedCenter.name}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Location Info */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Location Information</h3>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-3" />
                            <p className="text-muted-foreground">{selectedCenter.address}</p>
                          </div>
                          <div className="flex items-start">
                            <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-3" />
                            <p className="text-muted-foreground">{selectedCenter.phone}</p>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-3" />
                            <p className="text-muted-foreground whitespace-pre-line">{selectedCenter.hours}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Services */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Services Offered</h3>
                        <ul className="space-y-2">
                          {selectedCenter.services.map((service, index) => (
                            <li key={index} className="flex items-center">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                              <span className="text-muted-foreground">{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      <Button>
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Button>
                      <Button variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center bg-secondary rounded-lg p-12">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Select a Service Center</h3>
                    <p className="text-muted-foreground max-w-md">
                      Choose a service center from the list to view detailed information, services offered, and contact details.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Information */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Our Service Guarantee</h2>
            <p className="text-muted-foreground mb-8">
              All services performed at PCSPHERE authorized service centers are backed by our 90-day workmanship guarantee. Our technicians are certified professionals with extensive experience in PC hardware repair and troubleshooting.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h3 className="font-medium mb-2">Expert Technicians</h3>
                <p className="text-sm text-muted-foreground">
                  Certified and experienced in all aspects of PC repair and service
                </p>
              </div>
              <div>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <h3 className="font-medium mb-2">Genuine Parts</h3>
                <p className="text-sm text-muted-foreground">
                  Only authentic components used for all repairs and replacements
                </p>
              </div>
              <div>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <h3 className="font-medium mb-2">Quality Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  90-day warranty on all service work performed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-3">Do I need an appointment?</h3>
              <p className="text-muted-foreground">
                While walk-ins are welcome, we recommend scheduling an appointment to minimize wait times. You can book online or call your nearest service center.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-3">What should I bring for repairs?</h3>
              <p className="text-muted-foreground">
                Please bring your device, any accessories relevant to the issue, and proof of purchase if the item is under warranty.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-3">How long do repairs typically take?</h3>
              <p className="text-muted-foreground">
                Minor repairs can often be completed same-day. More complex issues typically take 2-5 business days depending on parts availability.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-3">Are diagnostics free?</h3>
              <p className="text-muted-foreground">
                We offer free basic diagnostics for all customers. Advanced diagnostics may incur a fee that will be credited toward any repairs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceCenters;
