"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  MapPin, 
  Shield, 
  Clock, 
  Users, 
  Building,
  DollarSign,
  Star
} from "lucide-react";

interface InvestmentReasonsSectionProps {
  property: any;
}

export default function InvestmentReasonsSection({ property }: InvestmentReasonsSectionProps) {
  const investmentReasons = [
    {
      icon: TrendingUp,
      title: "High ROI Potential",
      description: "Expected 8-12% annual rental yield with strong capital appreciation",
      stats: "12% ROI",
      color: "text-green-600"
    },
    {
      icon: MapPin,
      title: "Prime Location",
      description: "Strategically located in Dubai's fastest-growing district",
      stats: "Downtown Dubai",
      color: "text-blue-600"
    },
    {
      icon: Shield,
      title: "Developer Guarantee",
      description: "Backed by RERA regulations and developer warranties",
      stats: "100% Secure",
      color: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Early Investment",
      description: "Get in early with pre-launch prices and exclusive benefits",
      stats: "Pre-Launch",
      color: "text-orange-600"
    },
    {
      icon: Users,
      title: "Growing Demand",
      description: "High demand from expats and investors in the area",
      stats: "95% Occupancy",
      color: "text-indigo-600"
    },
    {
      icon: Building,
      title: "Quality Construction",
      description: "Built by renowned developers with premium materials",
      stats: "Premium Quality",
      color: "text-red-600"
    }
  ];

  const marketStats = [
    { label: "Average Rental Yield", value: "8.5%", trend: "+2.1%" },
    { label: "Capital Appreciation", value: "15%", trend: "+5.2%" },
    { label: "Occupancy Rate", value: "94%", trend: "+3.1%" },
    { label: "Average Rent", value: "AED 120K", trend: "+8.5%" }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            Why Invest in This Project?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the compelling reasons that make this project an exceptional investment opportunity
          </p>
        </motion.div>

        {/* Investment Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {investmentReasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg group">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors`}>
                    <reason.icon className={`w-8 h-8 ${reason.color}`} />
                  </div>
                  <CardTitle className="text-xl text-gray-800 mb-2">
                    {reason.title}
                  </CardTitle>
                  <Badge 
                    variant="secondary" 
                    className="w-fit mx-auto bg-primary/10 text-primary border-primary/20"
                  >
                    {reason.stats}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Market Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 mb-16"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Market Performance & Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {stat.label}
                </div>
                <div className="flex items-center justify-center text-green-600 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.trend}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Investment Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <Card className="border-0 shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 mb-4">
                Investment Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <Star className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Tax-Free Returns</h4>
                    <p className="text-sm text-gray-600">No income tax on rental income or capital gains</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <DollarSign className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Currency Stability</h4>
                    <p className="text-sm text-gray-600">AED pegged to USD provides currency stability</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <Shield className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Legal Protection</h4>
                    <p className="text-sm text-gray-600">Strong legal framework protecting investor rights</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <Users className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Residency Visa</h4>
                    <p className="text-sm text-gray-600">Eligible for UAE residency visa with property investment</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 mb-4">
                Future Growth Potential
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">Expo 2020 Legacy</h4>
                    <p className="text-sm text-gray-600">Continued development and infrastructure</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    +25%
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">Dubai 2040 Vision</h4>
                    <p className="text-sm text-gray-600">Strategic development plan</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    +40%
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">Infrastructure Projects</h4>
                    <p className="text-sm text-gray-600">Metro expansion and new highways</p>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    +15%
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-800">Tourism Growth</h4>
                    <p className="text-sm text-gray-600">Increasing tourist and business visitors</p>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    +30%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
