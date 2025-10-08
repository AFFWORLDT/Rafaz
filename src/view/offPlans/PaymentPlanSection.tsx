"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { motion } from "framer-motion";

interface PaymentPlanSectionProps {
  property: any;
}

export default function PaymentPlanSection({ property }: PaymentPlanSectionProps) {
  // Mock payment plan data - replace with actual data from property
  const paymentPlans = [
    {
      phase: "Booking",
      percentage: "5%",
      amount: "AED 50,000",
      description: "Reserve your unit with initial booking amount",
      timeline: "Upon booking"
    },
    {
      phase: "Construction Start",
      percentage: "10%",
      amount: "AED 100,000",
      description: "First installment upon construction commencement",
      timeline: "Q2 2024"
    },
    {
      phase: "Foundation Complete",
      percentage: "15%",
      amount: "AED 150,000",
      description: "Payment upon foundation completion",
      timeline: "Q3 2024"
    },
    {
      phase: "Structure Complete",
      percentage: "20%",
      amount: "AED 200,000",
      description: "Payment upon structural completion",
      timeline: "Q4 2024"
    },
    {
      phase: "Handover",
      percentage: "50%",
      amount: "AED 500,000",
      description: "Final payment upon handover",
      timeline: "Q2 2025"
    }
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
            Flexible Payment Plans
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our flexible payment options designed to make your investment journey smooth and affordable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paymentPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
                <CardHeader className="text-center pb-4">
                  <Badge 
                    variant="secondary" 
                    className="w-fit mx-auto mb-2 bg-primary/10 text-primary border-primary/20"
                  >
                    Phase {index + 1}
                  </Badge>
                  <CardTitle className="text-xl text-gray-800">{plan.phase}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {plan.percentage}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                      {plan.amount}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 text-sm">
                    {plan.description}
                  </p>
                  <div className="text-sm text-gray-500 font-medium">
                    {plan.timeline}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Payment Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Additional Benefits
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  No interest charges during construction
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Flexible payment schedule options
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Early bird discounts available
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Post-handover payment plans
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Financing Options
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Bank financing available
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Developer financing options
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Investment partnership programs
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Corporate investment packages
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
