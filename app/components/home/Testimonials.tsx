'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

// Custom FadeIn Component
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

const testimonials = [
  {
    quote: "NIFE Transport has completely transformed our supply chain. Their ability to handle complex project cargo with such precision is unmatched in the industry.",
    author: "Sarah Jenkins",
    role: "Director of Operations",
    company: "BuildRight Construction",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2069&auto=format&fit=crop",
    rating: 5
  },
  {
    quote: "We needed a partner who could guarantee temperature integrity for our pharmaceutical shipments. NIFE's reefer fleet has never let us down.",
    author: "Michael Chen",
    role: "Logistics Manager",
    company: "MediCare Solutions",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2069&auto=format&fit=crop",
    rating: 5
  },
  {
    quote: "The real-time tracking and 24/7 support give us peace of mind. It's rare to find a carrier that combines technology with such a personal touch.",
    author: "David Rodriguez",
    role: "VP of Supply Chain",
    company: "Global Retail Group",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2069&auto=format&fit=crop",
    rating: 5
  }
];

const partners = [
  "Global Transit", "Apex Logistics", "Dynamic Freight", "EcoMove", "Swift Cargo", "Prime Haul"
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-slate-50 py-24 lg:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-blue-600">
            Trusted Partnerships
          </span>
          <h2 className="text-4xl font-extrabold text-[#1B4965] sm:text-5xl">
            What Our Partners Say
          </h2>
        </FadeIn>

        {/* Testimonial Slider */}
        <FadeIn delay={200} className="relative max-w-4xl mx-auto mb-24">
          <div className="relative h-[400px] sm:h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  index === activeIndex 
                    ? 'opacity-100 translate-x-0 scale-100' 
                    : 'opacity-0 translate-x-8 scale-95 pointer-events-none'
                }`}
              >
                <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-100">
                  <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-50 shadow-md">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-full shadow-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21L14.017 18C14.017 16.0547 14.3301 15.1895 15.6748 14.4785C16.5547 14.0098 17.459 14.0098 18.041 14.0918L18.041 11.9609C16.6348 11.832 15.1104 11.9834 13.916 12.9902C12.7871 13.9443 12.3535 15.2607 12.3535 16.793V21H14.017ZM8.01367 21L8.01367 18C8.01367 16.0547 8.32617 15.1895 9.6709 14.4785C10.5508 14.0098 11.4551 14.0098 12.0371 14.0918L12.0371 11.9609C10.6309 11.832 9.10645 11.9834 7.91211 12.9902C6.7832 13.9443 6.34961 15.2607 6.34961 16.793V21H8.01367Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center sm:text-left flex-1">
                      <div className="flex justify-center sm:justify-start gap-1 mb-4 text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xl sm:text-2xl font-medium text-slate-700 mb-6 italic leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <h4 className="text-lg font-bold text-[#1B4965]">{testimonial.author}</h4>
                        <p className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-blue-600 w-8' : 'bg-slate-300 hover:bg-blue-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </FadeIn>

        {/* Trusted By Strip */}
        <FadeIn delay={400} className="border-t border-slate-200 pt-16">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by industry leaders across North America
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {partners.map((partner, index) => (
              <div key={index} className="text-xl sm:text-2xl font-black text-slate-400 flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-300 rounded-md" /> {/* Placeholder Icon */}
                <span>{partner}</span>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
