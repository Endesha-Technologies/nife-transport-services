'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

// Enhanced cargo list with images and descriptions
const cargoItems = [
  { 
    name: 'General Freight', 
    icon: '📦', 
    description: 'Standard shipping for palletized goods and general merchandise.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Household Goods', 
    icon: '🏠',
    description: 'Safe transport for residential moves and furniture.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Metal Sheets & Coils', 
    icon: '⚙️',
    description: 'Specialized flatbed transport for industrial metal products.',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=2069&auto=format&fit=crop'
  },
  { 
    name: 'Motor Vehicles', 
    icon: '🚗',
    description: 'Secure car hauling for dealerships and private owners.',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Drive/Tow Away', 
    icon: '🚙',
    description: 'Professional drivers to move your vehicles directly.',
    image: 'https://images.unsplash.com/photo-1562920616-0b61f6c87925?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Logs & Lumber', 
    icon: '🪵',
    description: 'Heavy-duty transport for forestry and construction timber.',
    image: 'https://images.unsplash.com/photo-1588619461336-68f5d9f434b9?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Building Materials', 
    icon: '🏗️',
    description: 'Timely delivery of construction supplies to job sites.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Mobile Homes', 
    icon: '🏘️',
    description: 'Oversized load expertise for manufactured housing.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Heavy Machinery', 
    icon: '🏭',
    description: 'Lowboy and RGN services for industrial equipment.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Fresh Produce', 
    icon: '🥬',
    description: 'Temperature-controlled reefer units for farm-fresh goods.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Liquids & Gases', 
    icon: '💧',
    description: 'Certified tanker transport for bulk liquids and chemicals.',
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2079&auto=format&fit=crop'
  },
  { 
    name: 'Intermodal Containers', 
    icon: '📦',
    description: 'Drayage services for port and rail container moves.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Passengers', 
    icon: '👥',
    description: 'Safe and comfortable charter transport services.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop'
  },
  { 
    name: 'Oilfield Equipment', 
    icon: '🛢️',
    description: 'Hot shot and heavy haul for the energy sector.',
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Livestock', 
    icon: '🐄',
    description: 'Compassionate transport for cattle and other livestock.',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=2073&auto=format&fit=crop'
  },
  { 
    name: 'Grain & Feed', 
    icon: '🌾',
    description: 'Hopper bottom trailers for bulk agricultural products.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Coal & Coke', 
    icon: '⚫',
    description: 'Bulk transport for mining and industrial energy resources.',
    image: 'https://images.unsplash.com/photo-1599939571322-792a326991f2?q=80&w=2065&auto=format&fit=crop'
  },
  { 
    name: 'Meat Products', 
    icon: '🥩',
    description: 'Strict cold chain compliance for meat and poultry.',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Garbage & Refuse', 
    icon: '♻️',
    description: 'Waste management logistics and disposal transport.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'US Mail', 
    icon: '✉️',
    description: 'Contract carrier services for postal routes.',
    image: 'https://images.unsplash.com/photo-1566847438217-76e82d383f84?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Chemicals', 
    icon: '🧪',
    description: 'Hazmat-certified drivers for industrial chemicals.',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop'
  },
  { 
    name: 'Dry Bulk Commodities', 
    icon: '📊',
    description: 'Pneumatic tankers for cement, sand, and powders.',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop'
  },
  { 
    name: 'Refrigerated Food', 
    icon: '❄️',
    description: 'Frozen and chilled food distribution.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074&auto=format&fit=crop'
  },
  { 
    name: 'Beverages', 
    icon: '🥤',
    description: 'Secure transport for bottled drinks and liquid bulk.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=2069&auto=format&fit=crop'
  },
  { 
    name: 'Paper Products', 
    icon: '📄',
    description: 'Dry van services for paper rolls and packaging.',
    image: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Utilities', 
    icon: '⚡',
    description: 'Infrastructure support and utility pole transport.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Agricultural Supplies', 
    icon: '🚜',
    description: 'Farm equipment and fertilizer delivery services.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Construction Equipment', 
    icon: '🏗️',
    description: 'Heavy haul for excavators, dozers, and cranes.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    name: 'Water Well Equipment', 
    icon: '💦',
    description: 'Drilling rig and pipe transport to remote sites.',
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2079&auto=format&fit=crop'
  },
];



// Custom FadeIn Component for Scroll Animations
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

export default function ServicesSummary() {
  // Split cargo items into two rows for the ticker
  const row1 = cargoItems.slice(0, Math.ceil(cargoItems.length / 2));
  const row2 = cargoItems.slice(Math.ceil(cargoItems.length / 2));

  return (
    <section className="relative bg-white pb-24 lg:pb-32">
      {/* Clean Curve Transition from Hero */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden z-10 -mt-10 sm:-mt-16 lg:-mt-20">
        <svg 
          className="relative block w-full h-10 sm:h-16 lg:h-20" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="#ffffff" 
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40">
        
        {/* Integrated Header & Services Section */}
        <div className="mb-24 flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <FadeIn className="order-2 lg:order-1 text-center lg:text-left">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-blue-600 shadow-sm border border-blue-100 mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
              </span>
              Comprehensive Logistics
            </span>
            
            <h2 className="mb-6 text-3xl font-extrabold text-[#1B4965] sm:text-4xl lg:text-5xl tracking-tight">
              Freight Solutions Built for <br className="hidden xl:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Reliability & Speed
              </span>
            </h2>
            
            <p className="text-gray-600 mb-8 leading-relaxed text-lg mx-auto lg:mx-0 max-w-2xl lg:max-w-none">
              From the warehouse floor to the open road, our operations are powered by precision and care. We don&apos;t just drive trucks; we manage the entire lifecycle of your freight with dedicated teams for packing, loading, and specialized handling.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                  🏗️
                </div>
                <div>
                  <h4 className="font-bold text-[#1B4965]">Expert Handling</h4>
                  <p className="text-sm text-gray-600">Professional loading, packing, and forklift services to ensure cargo safety from dock to door.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                  🚛
                </div>
                <div>
                  <h4 className="font-bold text-[#1B4965]">Diverse Fleet</h4>
                  <p className="text-sm text-gray-600">From flatbeds to reefers, we have the right truck for every specific need, maintained to the highest standards.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                  👨‍✈️
                </div>
                <div>
                  <h4 className="font-bold text-[#1B4965]">Dedicated Drivers</h4>
                  <p className="text-sm text-gray-600">Experienced professionals committed to on-time, safe delivery and exceptional service.</p>
                </div>
              </div>
            </div>

            <Link 
              href="/services" 
              className="inline-flex items-center justify-center rounded-xl bg-[#1B4965] px-8 py-4 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700"
            >
              Explore Our Services
            </Link>
          </FadeIn>

          {/* Right Column: Enhanced Image Collage */}
          <div className="relative h-[500px] sm:h-[700px] w-full order-1 lg:order-2 perspective-1000">
             {/* Image 1: Main Truck (Top Right) */}
             <FadeIn delay={200} className="absolute top-0 right-0 w-3/4 h-[55%] sm:h-1/2 rounded-2xl overflow-hidden shadow-2xl z-10">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                  alt="Heavy Haul Truck"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
             </FadeIn>

             {/* Image 2: Warehouse/Loading (Bottom Left) */}
             <FadeIn delay={400} className="absolute bottom-12 left-0 w-3/5 h-[45%] sm:h-2/5 rounded-2xl overflow-hidden shadow-2xl z-20 border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070&auto=format&fit=crop"
                  alt="Warehouse Operations"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
             </FadeIn>

             {/* Image 3: Driver/Action (Center Overlay) */}
             <FadeIn delay={600} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-2xl z-30 border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1617720366949-6f374b87d13c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Professional Driver"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
             </FadeIn>

             {/* Image 4: Expedited/Small (Top Left) */}
             <FadeIn delay={300} className="absolute top-12 left-0 w-28 h-24 lg:top-20 lg:left-4 lg:w-48 lg:h-40 rounded-xl overflow-hidden shadow-xl z-10 border-2 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2070&auto=format&fit=crop"
                  alt="Expedited Transport"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
             </FadeIn>

             {/* Image 5: Forklift/Loading (Bottom Right) */}
             <FadeIn delay={500} className="absolute bottom-8 right-0 w-28 h-28 sm:bottom-0 sm:right-8 sm:w-48 sm:h-48 rounded-xl overflow-hidden shadow-xl z-20 border-2 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop"
                  alt="Loading Operations"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
             </FadeIn>

             {/* Image 6: Flatbed/Industrial (Middle Right Edge) */}
             <FadeIn delay={700} className="absolute top-1/2 right-0 translate-x-4 -translate-y-12 w-40 h-40 rounded-xl overflow-hidden shadow-xl z-20 border-2 border-white hidden xl:block">
                <Image
                  src="https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=2069&auto=format&fit=crop"
                  alt="Industrial Transport"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
             </FadeIn>

             {/* Image 7: Port/Global (Top Center) */}
             <FadeIn delay={350} className="absolute top-4 left-1/3 w-48 h-32 rounded-xl overflow-hidden shadow-xl z-15 border-2 border-white hidden lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1494412574643-35d324698420?q=80&w=2070&auto=format&fit=crop"
                  alt="Global Logistics"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
             </FadeIn>

             {/* Image 8: Logistics Planning (Bottom Center-Left) */}
             <FadeIn delay={450} className="absolute bottom-32 left-1/3 w-32 h-32 rounded-lg overflow-hidden shadow-xl z-25 border-2 border-white hidden lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
                  alt="Logistics Planning"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
             </FadeIn>

             {/* Image 9: Technology/Tracking (Middle Left Edge) */}
             <FadeIn delay={650} className="absolute top-1/2 left-0 -translate-x-6 w-36 h-36 rounded-xl overflow-hidden shadow-xl z-20 border-2 border-white hidden xl:block">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                  alt="Logistics Technology"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
             </FadeIn>
             
             {/* Decorative Blobs */}
             <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-blue-100 rounded-full -z-10 blur-3xl opacity-50" />
             <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-100 rounded-full -z-10 blur-3xl opacity-50" />
          </div>
        </div>

        {/* Infinite Scroll Ticker */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <FadeIn className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1B4965]">
              Comprehensive Cargo Capabilities
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-500">Handling 28+ specialized freight types daily</p>
          </FadeIn>

          {/* Row 1 */}
          <FadeIn delay={200} className="mb-4 overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />
            
            <div className="flex gap-3 sm:gap-4 animate-scroll-left w-max hover:[animation-play-state:paused]">
              {[...row1, ...row1, ...row1].map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex items-center gap-2 sm:gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 sm:px-6 sm:py-4 shadow-sm transition-all hover:shadow-md hover:border-blue-100 hover:bg-white"
                >
                  <span className="text-xl sm:text-2xl">{item.icon}</span>
                  <span className="whitespace-nowrap text-sm sm:text-base font-semibold text-gray-700">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Row 2 */}
          <FadeIn delay={400} className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />
            
            <div className="flex gap-3 sm:gap-4 animate-scroll-right w-max hover:[animation-play-state:paused]">
              {[...row2, ...row2, ...row2].map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex items-center gap-2 sm:gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 sm:px-6 sm:py-4 shadow-sm transition-all hover:shadow-md hover:border-blue-100 hover:bg-white"
                >
                  <span className="text-xl sm:text-2xl">{item.icon}</span>
                  <span className="whitespace-nowrap text-sm sm:text-base font-semibold text-gray-700">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* CTA Section */}
        <FadeIn delay={600} className="relative overflow-hidden rounded-3xl bg-[#1B4965] px-6 py-12 sm:px-16 sm:py-16 text-center shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Ready to Streamline Your Logistics?
            </h2>
            <p className="mb-8 sm:mb-10 text-base sm:text-lg text-blue-100">
              Get a competitive quote today. Our team is standing by to provide the reliable service your business deserves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-[#1B4965] shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-transparent px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-white transition-colors hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </FadeIn>

      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }

        @keyframes scroll-right {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
      `}</style>
    </section>
  );
}