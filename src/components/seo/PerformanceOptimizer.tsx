"use client";

import { useEffect } from "react";

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalImages = [
        '/images/logo.png',
        '/images/hero-bg.jpg',
        '/favicon.png'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    preloadCriticalResources();

    // Optimize font loading
    const optimizeFonts = () => {
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          document.documentElement.classList.add('fonts-loaded');
        });
      }
    };

    optimizeFonts();

    // Service Worker registration for caching
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Cleanup
    return () => {
      imageObserver.disconnect();
    };
  }, []);

  return null;
}

// Performance monitoring utilities
export const performanceUtils = {
  // Measure Core Web Vitals
  measureWebVitals: () => {
    if (typeof window !== 'undefined' && 'web-vitals' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }
  },

  // Optimize images
  optimizeImage: (src: string, width?: number, quality: number = 80) => {
    if (src.startsWith('/')) {
      return `${src}?w=${width || 800}&q=${quality}`;
    }
    return src;
  },

  // Lazy load component
  lazyLoad: (importFunc: () => Promise<any>) => {
    return React.lazy(importFunc);
  }
};
