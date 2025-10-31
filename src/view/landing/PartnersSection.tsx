"use client";

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Render a single logo file from /public/PartnerLogo exactly as named
function FileLogo({ file }: { file: string }) {
  const [hide, setHide] = useState(false)
  if (hide) return null
  const src = `/PartnerLogo/${encodeURIComponent(file)}`
  return (
    <img
      src={src}
      alt=""
      width={140}
      height={60}
      loading="lazy"
      className="object-contain w-[120px] h-[52px] min-w-[120px] grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      onError={() => setHide(true)}
    />
  )
}

function PartnersSection() {
  // HARD-CODED list of files located in /public/PartnerLogo (include extensions)
  const FILES: string[] = [
    'emaar_logo-resize.webp',
    'damac_logo-resize.webp',
    'dubai-holding_logo-resize.webp',
    'meraas_logo-resize.webp',
    'azizi_logo-resize.webp',
    'nakheel_logo-resize.webp',
    'nshama_logo-resize.webp',
    'select-group_logo-resize.webp',
    'sobha_logo-resize.webp',
    'aldar_logo-resize.webp',
    'acube-developments_logo-resize.webp',
    'imtiaz_logo-resize.webp',
    'majid-al-futtaim_logo-resize.webp',
    'binghatti_logo-resize.webp',
    'omniyat_logo-resize.webp'
  ]

  const [logos, setLogos] = useState<string[]>(FILES)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [itemsPerView, setItemsPerView] = useState(1)

  // responsive items per view
  useEffect(() => {
    const calc = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 375
      if (w >= 1024) setItemsPerView(7) // laptop/desktop
      else if (w >= 640) setItemsPerView(3) // tablets
      else setItemsPerView(1) // phones
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % logos.length)
    }, 2500)
    return () => clearInterval(id)
  }, [logos.length, paused])

  return (
    <section className="py-8 sm:py-10 bg-gradient-to-r from-[#F8F6F0] via-white to-[#F2EEE8] border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-[#05162d] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Trusted Partners
          </h2>
        </div>

        {/* Carousel (responsive items per view) */}
        <div
          className="relative flex items-center justify-center h-[56px] sm:h-[64px] md:h-[72px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${index}-${itemsPerView}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="flex items-center justify-center gap-6 sm:gap-8 md:gap-10"
            >
              {Array.from({ length: itemsPerView }).map((_, k) => {
                const file = logos[(index + k) % logos.length]
                return (
                  <div key={k} className="flex items-center justify-center">
                    <FileLogo file={file} />
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            aria-label="Previous"
            className="absolute left-0 sm:left-2 p-2 text-gray-400 hover:text-gray-600"
            onClick={() => setIndex((i) => (i - 1 + logos.length) % logos.length)}
          >
            ‹
          </button>
          <button
            aria-label="Next"
            className="absolute right-0 sm:right-2 p-2 text-gray-400 hover:text-gray-600"
            onClick={() => setIndex((i) => (i + 1) % logos.length)}
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {logos.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-[#c8b180]' : 'w-2 bg-gray-300'}`}
              onClick={() => setIndex(i)}
            />)
          )}
        </div>
      </div>

      {/* No marquee styles needed */}
    </section>
  )
}

export default PartnersSection