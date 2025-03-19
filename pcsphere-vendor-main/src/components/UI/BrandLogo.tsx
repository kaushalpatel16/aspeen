
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  name: string;
  logo: string;
  className?: string;
}

const BrandLogo = ({ name, logo, className }: BrandLogoProps) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-center p-4 bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105",
        className
      )}
    >
      <img 
        src={logo} 
        alt={`${name} logo`} 
        className="max-h-10 max-w-full object-contain" 
      />
    </div>
  );
};

export default BrandLogo;
