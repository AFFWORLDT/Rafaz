"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Bed, 
  Bath, 
  SquareGanttChart, 
  Calendar,
  ArrowRight
} from "lucide-react";

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

interface RelatedProjectsSectionProps {
  property: any;
}

export default function RelatedProjectsSection({ property }: RelatedProjectsSectionProps) {
  // Mock related projects data - replace with actual API call
  const relatedProjects = [
    {
      id: 1,
      name: "Marina Heights",
      developer: "Emaar Properties",
      location: "Dubai Marina",
      price: "AED 850,000",
      area: "1,200 sq ft",
      bedrooms: 2,
      bathrooms: 2,
      handover: "Q4 2025",
      image: "/images/property1.jpeg",
      status: "Under Construction",
      type: "Apartment"
    },
    {
      id: 2,
      name: "Downtown Views",
      developer: "Sobha Realty",
      location: "Downtown Dubai",
      price: "AED 1,200,000",
      area: "1,500 sq ft",
      bedrooms: 3,
      bathrooms: 2,
      handover: "Q2 2026",
      image: "/images/property2.jpeg",
      status: "Pre-Launch",
      type: "Apartment"
    },
    {
      id: 3,
      name: "Business Bay Towers",
      developer: "Damac Properties",
      location: "Business Bay",
      price: "AED 950,000",
      area: "1,350 sq ft",
      bedrooms: 2,
      bathrooms: 2,
      handover: "Q3 2025",
      image: "/images/property3.jpeg",
      status: "Under Construction",
      type: "Apartment"
    },
    {
      id: 4,
      name: "JBR Residences",
      developer: "Nakheel",
      location: "Jumeirah Beach Residence",
      price: "AED 1,100,000",
      area: "1,400 sq ft",
      bedrooms: 2,
      bathrooms: 2,
      handover: "Q1 2026",
      image: "/images/property1.jpeg",
      status: "Pre-Launch",
      type: "Apartment"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Related Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore similar investment opportunities in the same area and price range
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {relatedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg group overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant="secondary" 
                      className={`${
                        project.status === 'Pre-Launch' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {project.type}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{project.developer}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xl font-bold text-primary">
                      {project.price}
                    </div>
                    <div className="text-sm text-gray-600">
                      {project.area}
                    </div>
                  </div>

                  <div className="flex gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {project.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {project.bathrooms}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.handover}
                    </div>
                  </div>

                  <Link href={`/off-plan-projects-in-dubai/details/${formatPropertyNameForUrl(project.project_name || project.property_name || project.name || '') || project.id}`}>
                    <Button className="w-full rounded-lg group-hover:bg-primary/90 transition-colors">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/off-plan-projects-in-dubai">
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-lg px-8 py-3"
            >
              View All Off-Plan Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Investment Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Investment Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-2 font-semibold text-gray-800">Project</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-800">Price</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-800">Area</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-800">Handover</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-800">Status</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {relatedProjects.map((project, index) => (
                  <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-2">
                      <div>
                        <div className="font-semibold text-gray-800">{project.name}</div>
                        <div className="text-sm text-gray-600">{project.developer}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 font-semibold text-primary">{project.price}</td>
                    <td className="py-4 px-2 text-gray-700">{project.area}</td>
                    <td className="py-4 px-2 text-gray-700">{project.handover}</td>
                    <td className="py-4 px-2">
                      <Badge 
                        variant="secondary" 
                        className={`${
                          project.status === 'Pre-Launch' 
                            ? 'bg-orange-100 text-orange-800' 
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {project.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <Link href={`/off-plan-projects-in-dubai/details/${formatPropertyNameForUrl(project.project_name || project.property_name || project.name || '') || project.id}`}>
                        <Button size="sm" variant="outline" className="rounded-lg">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
