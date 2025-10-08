"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scaleIn";
  delay?: number;
}

export default function LazySection({
  children,
  className = "",
  threshold = 0.1,
  rootMargin = "50px",
  animation = "fadeIn",
  delay = 0
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible) {
          setIsVisible(true);
          setHasBeenVisible(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, rootMargin, hasBeenVisible]);

  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    };

    switch (animation) {
      case "slideUp":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        };
      case "slideLeft":
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 }
        };
      case "slideRight":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 }
        };
      case "scaleIn":
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 }
        };
      default:
        return baseVariants;
    }
  };

  return (
    <div ref={sectionRef} className={className}>
      {hasBeenVisible ? (
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={getAnimationVariants()}
          transition={{
            duration: 0.6,
            delay,
            ease: "easeOut"
          }}
        >
          {children}
        </motion.div>
      ) : (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      )}
    </div>
  );
}
