"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { getAllCommunities } from "@/src/api/communities";
import { cn } from "@/src/lib/utils";
import { useLanguage } from "@/src/contexts/LanguageContext";

const communities = [
  {
    id: 1,
    name: "Dubai Marina",
    description: "Where Yachting Meets Urban Living",
    imageQuery: "/images/dubai-marina.webp",
  },
  {
    id: 2,
    name: "Business Bay",
    description: "A Hub of Bustling Activity and Affordable Investment",
    imageQuery: "/images/Palm-Jumeirah.webp",
  },
  {
    id: 3,
    name: "Downtown Dubai",
    description: "Where Iconic Landmarks Meet Luxurious Living",
    imageQuery: "/images/Dubai-Creek-Harbour.webp",
  },
  {
    id: 4,
    name: "Dubai Hills Estate",
    description: "Tranquility Meets Luxury Living",
    imageQuery: "/images/Dubai-Hills-Estate.webp",
  },
  {
    id: 5,
    name: "Palm Jumeirah",
    description: "Iconic Man-Made Island with Luxury Residences",
    imageQuery: "/images/dubai-marina.webp",
  },
  {
    id: 6,
    name: "Jumeirah Lake Towers",
    description: "Vibrant Community with Lake Views",
    imageQuery: "/images/Dubai-Creek-Harbour.webp",
  },
];

export default function Component() {
  const [communities, setCommunities] = useState<any[]>([]);
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await getAllCommunities(1, 20);

        setCommunities(res.communities);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommunities();
  }, []);

  const handleCardClick = (communityName: string) => {
    // Navigate to off-plan page with area filter applied
    router.push(`/off-plan-projects-in-dubai?area=${encodeURIComponent(communityName)}`);
  };
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section - Compact */}
      <section className="py-8 md:py-12 text-center px-4">
        <p className="text-[#D4B88C] text-xs uppercase tracking-widest mb-2 font-light">
          {t('communities.title')}
        </p>
        <h1 className="text-2xl sm:text-3xl font-mono text-gray-800 mb-4 tracking-wide">
          {t('communities.headline')}
        </h1>
        <p className="max-w-3xl mx-auto text-gray-600 text-sm tracking-tight font-light leading-relaxed">
          {t('communities.description')}
        </p>
      </section>

      {/* Communities Section - Compact Grid */}
      <section className="relative pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {communities?.slice(0, 4).map((community: any, idx: number) => (
              <Card 
                key={`${community.id ?? idx}-${idx}`}
                className="relative w-full h-[400px] md:h-[450px] rounded-lg overflow-hidden shadow-md hover:shadow-lg group border-none transition-all duration-300 cursor-pointer"
                onClick={() => handleCardClick(community.name)}
              >
                <CardContent className="p-0 h-full">
                  <Image
                    src={community.photos[0]}
                    alt={community.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                    <h3 className="text-lg md:text-xl font-light mb-2 tracking-wide">
                      {community.name}
                    </h3>
                    <p className="text-xs md:text-sm mb-3 font-light leading-relaxed line-clamp-2">
                      {community.order_description}
                    </p>
                    <div className="w-full border-[0.5px] border-white/30 mb-3" />
                    <Link
                      href={`/off-plan-projects-in-dubai?area=${encodeURIComponent(community.name)}`}
                      onClick={(e) => e.stopPropagation()}
                      className={cn(
                        "relative pb-1 transition-all duration-300 text-primary uppercase text-xs md:text-sm font-light",
                        "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0",
                        "after:bg-primary after:transition-all after:duration-300 hover:after:w-16"
                      )}
                    >
                      EXPLORE
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Button - Compact */}
        <div className="w-full flex justify-center items-center mt-6">
          <Link href={"/communities"}>
            <Button className="min-w-[200px] h-auto bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-light tracking-wider py-3 px-6 rounded-lg transition-colors uppercase text-sm whitespace-nowrap">
              View All Communities
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
