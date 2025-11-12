import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

// URL Formatting Function
// Converts project names to URL-friendly slugs with underscores
function formatPropertyNameForUrl(name: string): string {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters (keeps spaces and hyphens)
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/-/g, '_') // Normalize hyphens to underscores
    .replace(/_+/g, '_') // Remove duplicate underscores
    .trim();
}

interface PropertyData {
  id?: string | number;
  name?: string;
  title?: string;
  project_name?: string;
  property_name?: string;
  location?: {
    city?: string;
    community?: string;
  };
  newParam?: {
    price?: number;
        totalUnits?: number;

  };
  photos?: string[];
  area_id?: string;

}

export default function PropertyCard({ data }: { data?: PropertyData }) {
    const router = useRouter();
    
    const handleCardClick = () => {
      if (!data) return;
      
      // Use name first (as API returns name, not project_name)
      const projectName = data?.name || data?.title || data?.project_name || data?.property_name || `Property ${data?.id || 'Unknown'}`;
      
      if (!projectName || projectName.startsWith('Property ')) {
        console.warn('PropertyCard - Property missing name field:', data);
      }
      
      const projectSlug = formatPropertyNameForUrl(projectName);
      
      console.log('PropertyCard - Card clicked:', {
        id: data?.id,
        name: data?.name,
        title: data?.title,
        project_name: data?.project_name,
        property_name: data?.property_name,
        finalName: projectName,
        slug: projectSlug,
        url: `/off-plan-projects-in-dubai/details/${projectSlug}`
      });
      
      // Always route to off-plan details page (this component is used for off-plan properties)
      const url = `/off-plan-projects-in-dubai/details/${projectSlug}`;
      router.push(url);
    };
    
  return (
    <Card 
      className="overflow-hidden border-none p-0 shadow-sm border-2 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300" 
      onClick={handleCardClick}
    >
      <div className="relative w-full h-96 overflow-hidden group">
        <Image
          src={data?.photos?.[0] ?? "/placeholder.jpg"}
          alt={`Image of ${data?.name}`}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        {data?.newParam?.totalUnits ? (
          <div className="absolute bottom-4 left-4 bg-white text-xs font-light tracking-wider px-3 py-1 rounded-full shadow-md uppercase">
            {data.newParam.totalUnits} UNITS
          </div>
        ) : null}
        <div className="absolute bottom-4 right-4 bg-white text-sm font-light px-3 py-1 rounded-full shadow-md text-[#1A202C]">
          FROM {data?.newParam?.price?.toLocaleString() ?? "N/A"}
          <span className="font-light text-gray-500 ml-1">د.إ</span>
        </div>
      </div>
      <CardContent className="p-6">
        <CardTitle className="text-2xl font-mono font-light text-[#1A202C] mb-2 tracking-wide">
          {data?.name ?? "Unnamed Property"}
        </CardTitle>
        <p className="text-sm uppercase tracking-wider text-primary font-light">
          {`${data?.location?.community ?? ""}${
            data?.location?.community && data?.location?.city ? ", " : ""
          }${data?.location?.city ?? ""}`}
        </p>
      </CardContent>
    </Card>
  );
}
