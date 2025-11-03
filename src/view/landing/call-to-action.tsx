"use client";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/src/contexts/LanguageContext";

export function CallToAction() {
  const { t } = useLanguage();
  
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-[#F8F5EF]">
      <div className="absolute bottom-0 inset-x-0 w-full h-96 opacity-40">
        <Image
          src="/images/dubai-skyline-30.svg" 
          alt="Dubai Skyline"
          fill
          className="object-bottom"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 lg:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm uppercase text-[#1A1A1A]/70 font-extralight tracking-wider mb-2">
            {t('callToAction.subtitle')}
          </p>
          <h2 className="text-3xl md:text-4xl font-custom mb-4 tracking-wide text-[#1A1A1A]">
            {t('callToAction.title')}
          </h2>
          <p className="text-base md:text-lg font-extralight max-w-4xl mx-auto mb-12 leading-relaxed text-[#333]">
            {t('callToAction.description')}
          </p>
          <div className="flex items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={"/contactUs"}>
                <Button className="w-48 h-11 bg-[#dbbb90] hover:bg-[#C2A17B] text-white font-extralight tracking-wider py-2 px-4 rounded-lg transition-colors uppercase">
                  {t('callToAction.button')}
                </Button>
              </Link>
            </motion.div>
            <a
              href={`https://wa.me/971507815384?text=${encodeURIComponent('Hello, I would like to know more about your properties.')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 text-white"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.11 17.43c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.27-.74.93-.9 1.12-.17.19-.33.21-.6.07-.28-.14-1.16-.43-2.21-1.36-.82-.73-1.37-1.63-1.53-1.9-.16-.27-.02-.42.12-.56.12-.12.27-.32.4-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.48-.85-2.03-.23-.53-.45-.46-.62-.47-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.71.33-.24.26-.93.9-.93 2.2 0 1.3.95 2.56 1.08 2.74.13.18 1.88 2.88 4.56 4.04.64.27 1.14.44 1.53.56.64.2 1.22.18 1.68.11.51-.08 1.58-.65 1.81-1.27.22-.62.22-1.16.16-1.27-.06-.11-.24-.18-.5-.31z"/>
                <path d="M26.54 5.46C23.71 2.63 19.98 1 16 1 8.83 1 2.98 6.29 2.1 13.25c-.27 2.12.1 4.23 1.06 6.13L1 31l11.85-2.1c1.8.93 3.82 1.41 5.87 1.41h.01c6.96 0 12.25-5.85 12.25-13.01 0-3.26-1.37-6.33-3.44-8.84zm-10.82 22.9h-.01c-1.84 0-3.64-.5-5.2-1.44l-.37-.22-7.02 1.24 1.29-6.86-.24-.4c-.87-1.56-1.2-3.35-.96-5.12C3.98 8.2 9.43 3.5 16 3.5c3.51 0 6.8 1.37 9.27 3.86 2.47 2.49 3.83 5.8 3.83 9.34 0 6.65-5.22 11.66-13.38 11.66z"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
