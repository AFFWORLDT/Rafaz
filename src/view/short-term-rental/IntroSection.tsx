"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

export default function IntroSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 leading-tight">
              Exceptional Dubai Holiday Homes and Expert Short-Term Rental Services
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Whether you're seeking the perfect holiday home or looking to transform your property into a lucrative short-term rental, we're here to help.
            </p>

            <Link href="/list-your-property">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-200">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="order-first lg:order-last">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/building.jpg"
                alt="Dubai skyline and modern cityscape"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

