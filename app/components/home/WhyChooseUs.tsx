'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

// Custom FadeIn Component (reused pattern for consistency)
const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const benefits = [
  {
    title: '98% On-Time Delivery',
    description: 'Our optimized routing and dedicated fleet ensure your cargo arrives exactly when expected, minimizing downtime.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Tracking',
    description: 'Full visibility into your shipment\'s journey with our advanced GPS and telematics systems. Know where your freight is 24/7.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: 'Certified Safety',
    description: 'Our drivers are rigorously trained and certified. We maintain the highest safety ratings to protect your valuable assets.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: '24/7 Dedicated Support',
    description: 'No automated bots. Speak to real logistics experts whenever you need assistance, day or night.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-gradient-to-br from-[#1B4965] to-[#0B253A] pb-24 lg:pb-32 pt-32 lg:pt-48 overflow-hidden">
      {/* Wave Transition from Previous Section */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px] sm:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>

      {/* World Map Background Image */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          alt="World map background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Visual */}
          <FadeIn className="relative h-[500px] lg:h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop"
              alt="Modern logistics fleet on highway"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f2e] via-transparent to-transparent opacity-80" />
            
            {/* Floating Stats Card */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row justify-between items-center text-white gap-4 md:gap-0">
                <div className="text-center md:text-left">
                  <p className="text-xs md:text-sm font-medium text-blue-200 uppercase tracking-wider">Annual Miles</p>
                  <p className="text-2xl md:text-3xl font-bold">2.5M+</p>
                </div>
                <div className="h-px w-full md:h-10 md:w-px bg-white/20" />
                <div className="text-center md:text-left">
                  <p className="text-xs md:text-sm font-medium text-blue-200 uppercase tracking-wider">Clients Served</p>
                  <p className="text-2xl md:text-3xl font-bold">500+</p>
                </div>
                <div className="h-px w-full md:h-10 md:w-px bg-white/20" />
                <div className="text-center md:text-left">
                  <p className="text-xs md:text-sm font-medium text-blue-200 uppercase tracking-wider">States Covered</p>
                  <p className="text-2xl md:text-3xl font-bold">48</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Content */}
          <div className="space-y-12 text-center lg:text-left">
            <FadeIn delay={200}>
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold uppercase tracking-wider mb-4 border border-blue-500/30">
                Why Partner With Us
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                Logistics Excellence <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  You Can Count On
                </span>
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed mx-auto lg:mx-0 max-w-2xl lg:max-w-none">
                In a fast-paced world, you need a logistics partner that moves as fast as you do. We combine cutting-edge technology with old-fashioned reliability to deliver a shipping experience that sets the standard.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <FadeIn key={index} delay={300 + (index * 100)}>
                  <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center lg:items-start">
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-sm text-blue-200 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={700} className="pt-4">
              <Link 
                href="/about" 
                className="inline-flex items-center text-white font-bold text-lg hover:text-blue-300 transition-colors group justify-center lg:justify-start"
              >
                Learn more about our company
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
