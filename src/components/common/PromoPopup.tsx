"use client";

import { useEffect, useState } from "react";
import PopupLeadForm from "./PopupLeadForm";

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
  whatsappPhone = "971501608106",
  whatsappMessage = "Hi Rafaz Properties, I'm interested in your off-plan projects. Please share details.",
}: PromoPopupProps) {
  const [open, setOpen] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Show on each new session until user closes it
    if (sessionStorage.getItem(SESSION_FLAG) === "1") return;
    const t = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  const handlePopupClick = () => {
    setOpen(false);
    setShowEnquiryForm(true);
  };

  const handleCloseEnquiryForm = () => {
    setShowEnquiryForm(false);
    sessionStorage.setItem(SESSION_FLAG, "1");
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-[2px] px-4">
          <div
            className="relative w-full max-w-[760px] overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
            onClick={handlePopupClick}
            role="button"
            aria-label="Open Enquiry Form"
          >
            {/* Close - Bigger button */}
            <button
              aria-label="Close promotional popup"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                sessionStorage.setItem(SESSION_FLAG, "1");
                setOpen(false);
              }}
              className="absolute right-4 top-4 z-[20] rounded-full bg-white/95 p-3 text-gray-700 shadow-lg hover:bg-white text-xl font-bold w-10 h-10 flex items-center justify-center"
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

            {/* Text only - clicking popup opens enquiry form */}
            <div className="absolute inset-0 z-[10] flex items-center justify-center p-8 text-center text-white md:p-10">
              <div className="max-w-[85%] rounded-xl bg-black/30 px-5 py-4 shadow-lg">
                <h2 className="text-2xl font-semibold tracking-wide md:text-3xl drop-shadow">
                  {title}
                </h2>
                <p className="mt-2 opacity-95 md:text-lg drop-shadow">{subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Form Popup */}
      <PopupLeadForm
        isOpen={showEnquiryForm}
        onClose={handleCloseEnquiryForm}
        source="Promo Popup"
        title="Enquire Now for More Details"
        subtitle="Premium developments with flexible payment plans"
      />
    </>
  );
}


