"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PromoPopupProps = {
  imageSrc?: string; // optional promo image
  title?: string;
  subtitle?: string;
  ctaLabel?: string; // label not used when showing price badge
  ctaHref?: string;
  delayMs?: number; // show after delay
  startingFrom?: string; // e.g., "AED 2.5M"
  whatsappPhone?: string; // e.g., 971507815384
  whatsappMessage?: string; // pre-filled message
};

const SESSION_FLAG = "promo-popup-dismissed";

export default function PromoPopup({
  imageSrc = "/727476354.jpg",
  title = "Be the first to own waterfront apartments",
  subtitle = "Explore premium Off Plan Projects in Dubai",
  ctaLabel = "View Projects",
  ctaHref = "/off-plan-projects-in-dubai",
  delayMs = 300,
  startingFrom = "AED 2.5M",
  whatsappPhone = "971507815384",
  whatsappMessage = "Hi Rafaz Properties, I'm interested in your off-plan projects. Please share details.",
}: PromoPopupProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Show on each new session until user closes it
    if (sessionStorage.getItem(SESSION_FLAG) === "1") return;
    const t = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-[2px] px-4">
      <div
        className="relative w-full max-w-[760px] overflow-hidden rounded-2xl shadow-2xl"
        onClick={() => {
          const phone = (whatsappPhone || "").replace(/[^\d]/g, "");
          const waHref = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;
          window.open(waHref, "_blank");
        }}
        role="button"
        aria-label="Open WhatsApp"
      >
        {/* Close */}
        <button
          aria-label="Close promotional popup"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            sessionStorage.setItem(SESSION_FLAG, "1");
            setOpen(false);
          }}
          className="absolute right-3 top-3 z-[20] rounded-full bg-white/95 p-2 text-gray-700 shadow hover:bg-white"
        >
          ✕
        </button>

        {/* Background creative */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={title}
          className="block h-auto w-full rounded-2xl border border-black/30 bg-black object-cover"
          loading="eager"
        />

        {/* Gradient overlay for readability (ensure above image) */}
        <div className="pointer-events-none absolute inset-0 z-[5] rounded-2xl bg-gradient-to-b from-black/60 via-black/35 to-black/60" />

        {/* Text + 'Starting From' button (routes to off-plan) */}
        <div className="absolute inset-0 z-[10] flex items-center justify-center p-8 text-center text-white md:p-10">
          <div className="max-w-[85%] rounded-xl bg-black/30 px-5 py-4 shadow-lg">
            <h2 className="text-2xl font-semibold tracking-wide md:text-3xl drop-shadow">
              {title}
            </h2>
            <p className="mt-2 opacity-95 md:text-lg drop-shadow">{subtitle}</p>
            <Link
              href={ctaHref}
              prefetch={false}
              onClick={(e) => e.stopPropagation()}
              className="mt-6 inline-block rounded-xl bg-[#0b1d2e]/95 px-6 py-3 text-sm font-semibold text-white shadow-md ring-1 ring-white/30"
            >
              STARTING FROM {startingFrom}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


