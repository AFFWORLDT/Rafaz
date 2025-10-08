import { NextRequest, NextResponse } from 'next/server';
import { SEO_KEYWORDS } from '@/src/lib/seo';

export async function GET(
  request: NextRequest,
  { params }: { params: { keyword: string } }
) {
  try {
    const keyword = params.keyword;
    
    // Find matching SEO keyword
    const seoKeyword = SEO_KEYWORDS.find(k => 
      k.keyword.toLowerCase().replace(/\s+/g, '-') === keyword.toLowerCase()
    );

    if (!seoKeyword) {
      return NextResponse.json(
        { error: 'Keyword not found' },
        { status: 404 }
      );
    }

    // Mock property data - replace with actual database query
    const properties = await getPropertiesByKeyword(seoKeyword);

    return NextResponse.json({
      keyword: seoKeyword.keyword,
      description: seoKeyword.description,
      category: seoKeyword.category,
      relatedKeywords: seoKeyword.relatedKeywords,
      properties: properties,
      total: properties.length
    });

  } catch (error) {
    console.error('Error fetching keyword properties:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function getPropertiesByKeyword(seoKeyword: any) {
  // Mock data - replace with actual database query
  const mockProperties = [
    {
      id: 1,
      title: "Luxury Marina Apartment",
      location: "Dubai Marina",
      price: 1200000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      property_type: "APARTMENT",
      photos: ["/images/property1.jpeg"],
      developer: "Emaar Properties",
      handover_date: "2025-12-01",
      status: "Under Construction"
    },
    {
      id: 2,
      title: "Premium Downtown Residence",
      location: "Downtown Dubai",
      price: 1800000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      property_type: "APARTMENT",
      photos: ["/images/property2.jpeg"],
      developer: "Sobha Realty",
      handover_date: "2026-06-01",
      status: "Pre-Launch"
    },
    {
      id: 3,
      title: "Business Bay Tower",
      location: "Business Bay",
      price: 950000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      property_type: "APARTMENT",
      photos: ["/images/property3.jpeg"],
      developer: "Damac Properties",
      handover_date: "2025-09-01",
      status: "Under Construction"
    },
    {
      id: 4,
      title: "JBR Beachfront Apartment",
      location: "JBR",
      price: 1350000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1300,
      property_type: "APARTMENT",
      photos: ["/images/property1.jpeg"],
      developer: "Nakheel",
      handover_date: "2026-03-01",
      status: "Pre-Launch"
    },
    {
      id: 5,
      title: "Palm Jumeirah Villa",
      location: "Palm Jumeirah",
      price: 3500000,
      bedrooms: 4,
      bathrooms: 4,
      area: 2500,
      property_type: "VILLA",
      photos: ["/images/property2.jpeg"],
      developer: "Nakheel",
      handover_date: "2025-12-01",
      status: "Under Construction"
    },
    {
      id: 6,
      title: "Downtown Penthouse",
      location: "Downtown Dubai",
      price: 4500000,
      bedrooms: 3,
      bathrooms: 3,
      area: 2000,
      property_type: "PENTHOUSE",
      photos: ["/images/property3.jpeg"],
      developer: "Emaar Properties",
      handover_date: "2026-08-01",
      status: "Pre-Launch"
    }
  ];

  // Filter properties based on keyword category and related keywords
  let filteredProperties = mockProperties;

  if (seoKeyword.category === 'location') {
    // Filter by location
    const locationKeywords = seoKeyword.relatedKeywords.filter((kw: string) => 
      kw.includes('Marina') || kw.includes('Downtown') || kw.includes('Business') || 
      kw.includes('JBR') || kw.includes('Palm')
    );
    
    if (locationKeywords.length > 0) {
      filteredProperties = mockProperties.filter(property => 
        locationKeywords.some((keyword: string) => 
          property.location.toLowerCase().includes(keyword.toLowerCase().split(' ')[0])
        )
      );
    }
  } else if (seoKeyword.category === 'property_type') {
    // Filter by property type
    const typeKeywords = seoKeyword.relatedKeywords.filter((kw: string) => 
      kw.includes('apartment') || kw.includes('villa') || kw.includes('penthouse')
    );
    
    if (typeKeywords.length > 0) {
      filteredProperties = mockProperties.filter(property => 
        typeKeywords.some((keyword: string) => 
          property.property_type.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  } else if (seoKeyword.category === 'investment') {
    // For investment keywords, return all properties
    filteredProperties = mockProperties;
  }

  return filteredProperties;
}
