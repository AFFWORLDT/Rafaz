import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  ownPortal_agent_Id?: string;
  agent?: {
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
  };
}

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

export default function OffPlanCard({ data }: { data?: PropertyData }) {
    const router = useRouter();
    
    const handleCardClick = () => {
      // Use name first (as API returns name, not project_name)
      // Ensure we always have a name, even if we have to generate one
      const projectName = data?.name || data?.title || data?.project_name || data?.property_name || `Property ${data?.id || 'Unknown'}`;
      console.log('OffPlanCard - Project data:', { 
        id: data?.id, 
        name: data?.name, 
        title: data?.title,
        project_name: data?.project_name, 
        property_name: data?.property_name,
        projectName 
      });
      const projectSlug = formatPropertyNameForUrl(projectName);
      console.log('OffPlanCard - Formatted slug:', projectSlug);
      
      // Always use slug, never fall back to ID
      const url = `/off-plan-projects-in-dubai/details/${projectSlug}`;
      console.log('OffPlanCard - Final URL:', url);
      router.push(url);
    };
    
  return (
    <Card className="overflow-hidden border-none p-0 shadow-sm border-2 rounded-lg" onClick={handleCardClick}>
      <div className="relative w-full h-96 overflow-hidden group">
        <Image
          src={data?.photos?.[0] ?? "/placeholder.jpg"}
          alt={`Image of ${data?.name}`}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        {data?.newParam?.totalUnits ? (
          <div className="absolute bottom-4 left-4 bg-white text-sm font-light tracking-wider px-3 py-1 rounded-full shadow-md uppercase">
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
        <div className="flex items-end justify-between">
          <p className="text-sm uppercase tracking-wider text-primary font-light">
            {`${data?.location?.community ?? ""}${
              data?.location?.community && data?.location?.city ? ", " : ""
            }${data?.location?.city ?? ""}`}
          </p>
          
          {/* Agent Avatar - Bottom Right Corner */}
          <div className="flex items-center justify-center">
            {data?.agent?.avatar ? (
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#dbbb90] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <Image
                  src={data.agent.avatar}
                  alt={data.agent.name || "Agent"}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dbbb90] to-[#C2A17B] flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
