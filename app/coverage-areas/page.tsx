'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// --- Components ---

// 1. Interactive Map Component (Dynamically Imported)
const InteractiveMap = dynamic(() => import('../components/coverage/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-slate-50 rounded-3xl flex items-center justify-center text-slate-900 border border-slate-200">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-slate-500">Loading Network Map...</p>
      </div>
    </div>
  ),
});

interface RegionCardProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  delay: number;
}

// 2. Region Card Component
const RegionCard = ({ title, description, features, image, delay }: RegionCardProps) => (
  <div 
    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="relative h-48 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white z-20">{title}</h3>
    </div>
    <div className="p-6">
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
            <span className="mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// --- Main Page ---

export default function CoverageAreasPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="relative bg-[#1B4965] py-20 lg:py-32 overflow-hidden">
        {/* Image Mesh Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 opacity-60 transform -skew-y-6 scale-125 origin-center">
             {/* Row 1 */}
             <div className="relative h-full w-full"><Image src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop" alt="City" fill className="object-cover" /></div>
             <div className="relative h-full w-full"><Image src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop" alt="Highway" fill className="object-cover" /></div>
             <div className="relative h-full w-full"><Image src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop" alt="City Night" fill className="object-cover" /></div>
             {/* Row 2 */}
             <div className="relative h-full w-full"><Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" alt="Warehouse" fill className="object-cover" /></div>
             <div className="relative h-full w-full"><Image src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop" alt="Truck" fill className="object-cover" /></div>
             <div className="relative h-full w-full"><Image src="https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=2068&auto=format&fit=crop" alt="City" fill className="object-cover" /></div>
          </div>
          
          {/* Gradient Overlay - Neutral */}
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/90 via-slate-900/50 to-slate-900/90"></div>

          {/* Animated Trucks Overlay */}
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
             {/* Truck 1 */}
             <div className="absolute top-1/3 left-[-10%] animate-[drive_20s_linear_infinite]">
                <svg className="w-16 h-16 text-white/80 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
             </div>
             {/* Truck 2 (Reverse) */}
             <div className="absolute top-2/3 right-[-10%] animate-[drive-reverse_25s_linear_infinite]">
                <svg className="w-12 h-12 text-white/80 transform scale-x-[-1] drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
             </div>
          </div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white mb-6 border border-white/20 backdrop-blur-sm">
              Global Reach, Local Expertise
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-xl">
              Connecting <span className="text-blue-300">North America</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-6 leading-relaxed drop-shadow-md font-medium">
              From the bustling ports of Vancouver to the industrial hubs of Mexico City, Nife Transport Services delivers seamless cross-border logistics solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="relative -mt-16 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-7xl">
          <InteractiveMap />
        </div>
      </section>

      {/* Regions Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1B4965] sm:text-4xl">Our Service Regions</h2>
            <p className="mt-4 text-lg text-gray-600">Comprehensive coverage tailored to your supply chain needs.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <RegionCard 
              title="United States"
              image="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop"
              description="Coast-to-coast coverage connecting major industrial hubs, ports, and distribution centers with speed and reliability."
              features={[
                "48-State Direct Service",
                "Regional Short-Haul & Last Mile",
                "Intermodal Drayage at Major Ports",
                "Expedited Team Service Available"
              ]}
              delay={0}
            />
            <RegionCard 
              title="Mexico Cross-Border"
              image="https://images.unsplash.com/photo-1518182170546-0766bc6f9213?q=80&w=2070&auto=format&fit=crop"
              description="Seamless door-to-door service between the US and Mexico, navigating customs complexities with ease."
              features={[
                "Direct Trailer Service (No Transload)",
                "C-TPAT Certified Carrier",
                "Bilingual Dispatch Team",
                "Daily Crossings at Laredo & El Paso"
              ]}
              delay={200}
            />
            <RegionCard 
              title="Canada Cross-Border"
              image="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2011&auto=format&fit=crop"
              description="Connecting the US market to key Canadian provinces including Ontario, Quebec, and British Columbia."
              features={[
                "PARS/PAPS Electronic Processing",
                "Bonded Carrier Status",
                "Winter-Equipped Fleet",
                "Toronto & Vancouver Daily Lanes"
              ]}
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {[
              { label: 'Cities Served', value: '500+' },
              { label: 'Border Crossings', value: '12k+' },
              { label: 'On-Time Rate', value: '98%' },
              { label: 'Active Trucks', value: '250+' },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-[#1B4965] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Ready to Move Your Freight?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Check our availability in your area and get a competitive quote instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#1B4965] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Get a Quote
            </Link>
            <Link 
              href="/fleet"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-transparent px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/10"
            >
              View Our Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* Global Styles for Custom Animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </main>
  );
}