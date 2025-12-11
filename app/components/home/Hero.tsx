'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Full list of services from ServicesSummary
const services = [
  { 
    title: 'General Freight', 
    description: 'Standard shipping for palletized goods and general merchandise.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Household Goods', 
    description: 'Safe transport for residential moves and furniture.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Metal Sheets & Coils', 
    description: 'Specialized flatbed transport for industrial metal products.',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=2069&auto=format&fit=crop'
  },
  { 
    title: 'Motor Vehicles', 
    description: 'Secure car hauling for dealerships and private owners.',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Drive/Tow Away', 
    description: 'Professional drivers to move your vehicles directly.',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Logs & Lumber', 
    description: 'Heavy-duty transport for forestry and construction timber.',
    image: 'https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Building Materials', 
    description: 'Timely delivery of construction supplies to job sites.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Mobile Homes', 
    description: 'Oversized load expertise for manufactured housing.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Heavy Machinery', 
    description: 'Lowboy and RGN services for industrial equipment.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Fresh Produce', 
    description: 'Temperature-controlled reefer units for farm-fresh goods.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Liquids & Gases', 
    description: 'Certified tanker transport for bulk liquids and chemicals.',
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2079&auto=format&fit=crop'
  },
  { 
    title: 'Intermodal Containers', 
    description: 'Drayage services for port and rail container moves.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Passengers', 
    description: 'Safe and comfortable charter transport services.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop'
  },
  { 
    title: 'Oilfield Equipment', 
    description: 'Hot shot and heavy haul for the energy sector.',
    image: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Livestock', 
    description: 'Compassionate transport for cattle and other livestock.',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=2073&auto=format&fit=crop'
  },
  { 
    title: 'Grain & Feed', 
    description: 'Hopper bottom trailers for bulk agricultural products.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Coal & Coke', 
    description: 'Bulk transport for mining and industrial energy resources.',
    image: 'https://images.unsplash.com/photo-1599939571322-792a326991f2?q=80&w=2065&auto=format&fit=crop'
  },
  { 
    title: 'Meat Products', 
    description: 'Strict cold chain compliance for meat and poultry.',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Garbage & Refuse', 
    description: 'Waste management logistics and disposal transport.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'US Mail', 
    description: 'Contract carrier services for postal routes.',
    image: 'https://images.unsplash.com/photo-1566847438217-76e82d383f84?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Chemicals', 
    description: 'Hazmat-certified drivers for industrial chemicals.',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop'
  },
  { 
    title: 'Dry Bulk Commodities', 
    description: 'Pneumatic tankers for cement, sand, and powders.',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop'
  },
  { 
    title: 'Refrigerated Food', 
    description: 'Frozen and chilled food distribution.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074&auto=format&fit=crop'
  },
  { 
    title: 'Beverages', 
    description: 'Secure transport for bottled drinks and liquid bulk.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=2069&auto=format&fit=crop'
  },
  { 
    title: 'Paper Products', 
    description: 'Dry van services for paper rolls and packaging.',
    image: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Utilities', 
    description: 'Infrastructure support and utility pole transport.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Agricultural Supplies', 
    description: 'Farm equipment and fertilizer delivery services.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Construction Equipment', 
    description: 'Heavy haul for excavators, dozers, and cranes.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    title: 'Water Well Equipment', 
    description: 'Drilling rig and pipe transport to remote sites.',
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2079&auto=format&fit=crop'
  }
];

export default function Hero() {
  const [activeService, setActiveService] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-slate-50">
      {/* Bright Background Image with Drive Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 animate-drive" // Custom drive animation
          style={{ transform: `translateY(${scrollY * 0.2}px) scale(1.1)` }} // Parallax + Scale for animation room
        >
          <Image
            src="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2072&auto=format&fit=crop"
            alt="NIFE Transport Truck on Highway"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {/* Professional Gradient Overlay - Black for cinematic/industrial feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content Column */}
          <div className="max-w-2xl text-white text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6 mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">Reliable Nationwide Shipping</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              Moving Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                Business Forward
              </span>
            </h1>
            
            <p className="text-lg text-blue-50 mb-8 leading-relaxed max-w-lg font-medium mx-auto lg:mx-0">
              We deliver more than just freight. We deliver peace of mind with on-time performance, real-time tracking, and dedicated support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/contact-us" 
                className="inline-flex justify-center items-center px-8 py-4 rounded-xl bg-white text-[#1B4965] font-bold text-lg shadow-xl hover:bg-blue-50 transition-all transform hover:-translate-y-1"
              >
                Get a Quote
              </Link>
              <Link 
                href="/services" 
                className="inline-flex justify-center items-center px-8 py-4 rounded-xl bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-[#1B4965] transition-all"
              >
                Our Services
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm font-medium text-blue-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>98% On-Time</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Service Spotlight Column */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md ml-auto transform transition-all hover:scale-[1.02] relative overflow-hidden border border-white/40 backdrop-blur-sm">
              
              {/* Tech Pattern Background */}
              <div className="absolute inset-0 opacity-[0.03]" 
                style={{ 
                  backgroundImage: 'radial-gradient(#1B4965 1px, transparent 1px)', 
                  backgroundSize: '20px 20px' 
                }} 
              />
              
              {/* Decorative Gradient Blob */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Service Spotlight</h3>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                
                <div className="h-64 relative">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-500 transform ${
                        index === activeService 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-8 pointer-events-none'
                      }`}
                    >
                      {/* Featured Image instead of Icon */}
                      <div className="relative w-full h-32 rounded-xl overflow-hidden mb-6 shadow-md">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <h4 className="text-2xl font-bold text-slate-800 mb-2">{service.title}</h4>
                      <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
                    </div>
                  ))}
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-1.5 mt-6 overflow-hidden">
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveService(index)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === activeService ? 'w-6 bg-[#1B4965]' : 'w-1.5 bg-gray-200 hover:bg-gray-300'
                      }`}
                      aria-label={`View service ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-400">Need something else?</span>
                  <Link href="/services" className="text-sm font-bold text-[#1B4965] hover:text-blue-700 flex items-center gap-1 transition-colors">
                    View All Services
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes drive {
          0% { transform: scale(1.1) translateX(0); }
          50% { transform: scale(1.15) translateX(-2%); }
          100% { transform: scale(1.1) translateX(0); }
        }
        .animate-drive {
          animation: drive 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
