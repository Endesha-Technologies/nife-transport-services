'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          // Disable parallax on mobile for better performance and positioning
          transform: !isMobile ? `translateY(${scrollY * 0.5}px)` : 'none',
        }}
      >
        {/* Responsive Background Images using Next.js Image */}
        {isMobile ? (
          <Image
            src="/images/banner-truck-mobile.avif"
            alt="Freight truck on highway"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : (
          <Image
            src="/images/banner-truck.avif"
            alt="Freight truck on highway"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center 40%' }}
            sizes="100vw"
          />
        )}
        {/* Gradient overlay - darker on mobile for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B4965]/85 via-[#1B4965]/80 to-[#0a1f2e]/90 md:from-[#1B4965]/75 md:via-[#1B4965]/70 md:to-[#0a1f2e]/80" />
      </div>

      {/* Animated Gradient Overlay - very subtle */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#1B4965]/40 via-transparent to-[#1B4965]/40 animate-pulse-slow" />

      {/* Geometric Shapes - moved behind content */}
      <div className="absolute inset-0 z-10 overflow-hidden opacity-10">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 sm:py-28 md:py-32 lg:px-8 lg:py-36">
          <div className="text-center">
            {/* Animated Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 sm:mb-8 sm:px-5 sm:py-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
              </span>
              <span className="text-xs font-semibold text-white sm:text-sm">Professional Freight Services</span>
            </div>

            {/* Main Heading with Gradient Text */}
            <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:mb-5 sm:text-4xl md:text-5xl lg:mb-6 lg:text-6xl xl:text-7xl 2xl:text-8xl">
              Reliable Freight
              <br />
              <span className="relative inline-block">
                <span className="absolute -inset-1 block bg-gradient-to-r from-white/20 to-transparent blur-xl"></span>
                <span className="relative bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Shipping Solutions
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto mb-8 max-w-3xl px-4 text-base leading-relaxed text-white/95 sm:mb-10 sm:px-0 sm:text-lg md:text-xl lg:mb-12 lg:text-2xl">
              Your trusted partner for efficient, on-time delivery solutions. 
              <br className="hidden sm:block" />
              From coast to coast, we move your freight with care and precision.
            </p>

            {/* CTA Buttons */}
            <div className="mb-12 flex flex-col items-center justify-center gap-3 px-4 sm:mb-16 sm:flex-row sm:gap-4 sm:px-0 md:mb-20">
              <Link
                href="/contact-us"
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#1B4965] shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/30 sm:w-auto sm:px-8 sm:py-4 sm:text-base lg:px-10 lg:py-5 lg:text-lg"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white to-blue-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Get a Free Quote
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/services"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/20 sm:w-auto sm:px-8 sm:py-4 sm:text-base lg:px-10 lg:py-5 lg:text-lg"
              >
                Explore Services
                <svg
                  className="h-4 w-4 transition-transform group-hover:rotate-45 sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Stats Section with Enhanced Cards */}
            <div className="mt-12 grid grid-cols-1 gap-4 px-4 sm:mt-16 sm:grid-cols-3 sm:gap-6 sm:px-0 md:mt-20 lg:mt-24 lg:gap-8">
              <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:bg-white/15 hover:shadow-2xl sm:p-7 lg:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-1 text-4xl font-bold text-white sm:mb-2 sm:text-5xl lg:text-6xl">500+</div>
                  <div className="text-sm font-semibold text-white/90 sm:text-base">Deliveries Monthly</div>
                  <div className="mt-2 h-1 w-12 rounded-full bg-white/40 transition-all duration-500 group-hover:w-full sm:mt-3 sm:w-16"></div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:bg-white/15 hover:shadow-2xl sm:p-7 lg:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-1 text-4xl font-bold text-white sm:mb-2 sm:text-5xl lg:text-6xl">98%</div>
                  <div className="text-sm font-semibold text-white/90 sm:text-base">On-Time Delivery</div>
                  <div className="mt-2 h-1 w-12 rounded-full bg-white/40 transition-all duration-500 group-hover:w-full sm:mt-3 sm:w-16"></div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:bg-white/15 hover:shadow-2xl sm:p-7 lg:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-1 text-4xl font-bold text-white sm:mb-2 sm:text-5xl lg:text-6xl">24/7</div>
                  <div className="text-sm font-semibold text-white/90 sm:text-base">Customer Support</div>
                  <div className="mt-2 h-1 w-12 rounded-full bg-white/40 transition-all duration-500 group-hover:w-full sm:mt-3 sm:w-16"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator - hidden on mobile */}
      <div className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 animate-bounce sm:bottom-8 sm:block lg:bottom-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/80">Scroll Down</span>
          <svg
            className="h-5 w-5 text-white/80 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
