"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bgImage.webp"
          alt="Short-Term Rental Background - Dubai Skyline"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="text-white text-sm">
              <Link href="/" className="hover:text-orange-500 transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/service" className="hover:text-orange-500 transition-colors">
                Services
              </Link>
              <span className="mx-2">/</span>
              <span className="underline">Short-Term Rental</span>
            </nav>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight text-left">
            From Finding Your Perfect
            <br />
            <span className="text-orange-500">Holiday Home</span> Or
            <br />
            Transforming it Into A
            <br />
            <span className="text-orange-500">Short-Term Rental,</span>
          </h1>

          {/* Subheading */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-left">
            We've Got You Covered!
          </h2>

          {/* CTA Button */}
          <div className="text-left">
            <Link href="/list-your-property">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-200">
                List your Property
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
