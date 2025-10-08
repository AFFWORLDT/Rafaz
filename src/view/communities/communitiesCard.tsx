import { Card, CardContent } from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CommunityData {
  city: string;
  photos: string[];
  latitude: number;
  longitude: number;
  name: string;
  sell_properties_count: number;
  rent_properties_count: number;
  projects_count: number;
  pool_projects_count: number;
  total_count: number;
  assigned_agents: any[];
}

export default function CommunitiesCard({ data }: { data: CommunityData }) {
  const router = useRouter();
  return (
    <Card
      className="relative w-[95%] h-[380px] rounded-2xl overflow-hidden shadow-xl group border border-white/20 cursor-pointer luxury-hover"
      onClick={() =>
        router.push(`/communities/details/${encodeURIComponent(data?.name)}`)
      }
    >
      <CardContent className="p-0 h-full">
        <Image
          src={data?.photos?.[0] || "/images/placeholder.jpg"}
          alt={`Image of ${data?.name}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end text-white">
          <h3 className="text-2xl sm:text-3xl font-serif mb-2 tracking-wide">
            {data?.name}
          </h3>
          
          {/* Property counts */}
          <div className="flex flex-wrap gap-2 mb-3">
            {data?.total_count > 0 && (
              <span className="px-2 py-1 bg-[#dbbb90]/20 text-[#dbbb90] text-xs rounded-full border border-[#dbbb90]/30">
                {data.total_count} Properties
              </span>
            )}
            {data?.city && (
              <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">
                {data.city}
              </span>
            )}
          </div>
          
          <div className="w-full border-[0.5px] border-white/30 mb-4" />

          <Link
            href={`/communities/details/${encodeURIComponent(data?.name)}`}
            className={cn(
              "relative pb-1 transition-all duration-300 text-[#dbbb90] uppercase text-base font-serif",
              "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0",
              "after:bg-[#dbbb90] after:transition-all after:duration-300 hover:after:w-20"
            )}
          >
            Explore Community
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
