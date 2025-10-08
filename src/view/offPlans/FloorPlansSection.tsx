"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { Expand, Bed, Bath, SquareGanttChart, Download } from "lucide-react";

interface FloorPlansSectionProps {
  property: any;
}

export default function FloorPlansSection({ property }: FloorPlansSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock floor plans data - replace with actual data from property
  const floorPlans = [
    {
      id: 1,
      name: "Studio",
      area: "450 sq ft",
      bedrooms: 0,
      bathrooms: 1,
      price: "AED 450,000",
      image: "/images/floorplan1.jpg",
      features: ["Open plan living", "Modern kitchen", "Balcony access"]
    },
    {
      id: 2,
      name: "1 Bedroom",
      area: "650 sq ft",
      bedrooms: 1,
      bathrooms: 1,
      price: "AED 650,000",
      image: "/images/floorplan2.jpg",
      features: ["Spacious bedroom", "Walk-in closet", "Private balcony"]
    },
    {
      id: 3,
      name: "2 Bedroom",
      area: "950 sq ft",
      bedrooms: 2,
      bathrooms: 2,
      price: "AED 950,000",
      image: "/images/floorplan3.jpg",
      features: ["Master suite", "Guest bedroom", "Living area", "Kitchen island"]
    },
    {
      id: 4,
      name: "3 Bedroom",
      area: "1,250 sq ft",
      bedrooms: 3,
      bathrooms: 2,
      price: "AED 1,250,000",
      image: "/images/floorplan4.jpg",
      features: ["Master suite", "Two bedrooms", "Open kitchen", "Large balcony"]
    }
  ];

  const visiblePlans = isExpanded ? floorPlans : floorPlans.slice(0, 2);

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
            Floor Plans & Layouts
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our thoughtfully designed floor plans that maximize space and comfort
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Floor Plan Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="overflow-hidden shadow-lg rounded-lg">
              <div className="relative h-96 bg-gray-100">
                <Image
                  src={floorPlans[selectedPlan]?.image || "/images/placeholder.jpg"}
                  alt={`${floorPlans[selectedPlan]?.name} floor plan`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white rounded-lg"
                  >
                    <Expand className="w-4 h-4 mr-2" />
                    View Full Size
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {floorPlans[selectedPlan]?.name}
                  </h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {floorPlans[selectedPlan]?.area}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-primary mb-4">
                  {floorPlans[selectedPlan]?.price}
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Bed className="w-4 h-4 mr-2" />
                    {floorPlans[selectedPlan]?.bedrooms} Bed
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Bath className="w-4 h-4 mr-2" />
                    {floorPlans[selectedPlan]?.bathrooms} Bath
                  </div>
                  <div className="flex items-center text-gray-600">
                    <SquareGanttChart className="w-4 h-4 mr-2" />
                    {floorPlans[selectedPlan]?.area}
                  </div>
                </div>
                <Button className="w-full rounded-lg">
                  <Download className="w-4 h-4 mr-2" />
                  Download Floor Plan
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Floor Plan List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {visiblePlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 rounded-lg ${
                    selectedPlan === index 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedPlan(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">
                          {plan.name}
                        </h4>
                        <p className="text-sm text-gray-600">{plan.area}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {plan.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          Starting from
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-3">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Bed className="w-4 h-4 mr-1" />
                        {plan.bedrooms}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Bath className="w-4 h-4 mr-1" />
                        {plan.bathrooms}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {plan.features.map((feature, featureIndex) => (
                        <Badge 
                          key={featureIndex}
                          variant="outline" 
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {floorPlans.length > 2 && (
              <Button
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full rounded-lg"
              >
                {isExpanded ? 'Show Less' : `Show All ${floorPlans.length} Plans`}
              </Button>
            )}
          </motion.div>
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Standard Features Across All Units
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bed className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Premium Finishes</h4>
              <p className="text-sm text-gray-600">High-quality materials and modern finishes throughout</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <SquareGanttChart className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Smart Home Ready</h4>
              <p className="text-sm text-gray-600">Pre-wired for smart home automation systems</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bath className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Energy Efficient</h4>
              <p className="text-sm text-gray-600">LED lighting and energy-efficient appliances included</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
