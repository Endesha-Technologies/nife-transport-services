'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Box, 
  Hammer, 
  Wheat, 
  Truck, 
  Droplet, 
  Anchor, 
  Zap, 
  ShieldCheck, 
  Leaf, 
  ArrowRight
} from 'lucide-react';

// Service Categories Data
const serviceCategories = [
  {
    id: 'general',
    title: 'General & Dry Freight',
    description: 'Reliable transport for standard commercial goods, retail merchandise, and household items.',
    icon: Box,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
    items: [
      { name: 'General Freight', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Household Goods', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Paper Products', image: 'https://images.unsplash.com/photo-1586191582118-2742777db744?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Beverages', image: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2070&auto=format&fit=crop' },
      { name: 'US Mail', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Commodities Dry Bulk', image: 'https://images.unsplash.com/photo-1586191582118-2742777db744?q=80&w=2070&auto=format&fit=crop' }
    ]
  },
  {
    id: 'construction',
    title: 'Construction & Industrial',
    description: 'Heavy-duty logistics for building materials, raw metals, and industrial infrastructure.',
    icon: Hammer,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
    items: [
      { name: 'Building Materials', image: 'https://images.unsplash.com/photo-1586191552066-d521145cf951?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Metal: Sheets, Coils, Rolls', image: 'https://images.unsplash.com/photo-1535063406572-96a6d7741db6?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Logs, Poles, Beams, Lumber', image: 'https://images.unsplash.com/photo-1610547263632-96100905a16d?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Construction Materials', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Utilities', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Water Well Equipment', image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2070&auto=format&fit=crop' }
    ]
  },
  {
    id: 'food-ag',
    title: 'Food & Agriculture',
    description: 'Temperature-controlled and sanitary transport for perishables, livestock, and farm supplies.',
    icon: Wheat,
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop',
    items: [
      { name: 'Fresh Produce', image: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1974&auto=format&fit=crop' },
      { name: 'Refrigerated Food', image: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Meat', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Grain, Feed, Hay', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Livestock', image: 'https://images.unsplash.com/photo-1549400786-1ccd275e6056?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Agricultural/Farm Supplies', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop' }
    ]
  },
  {
    id: 'heavy-specialized',
    title: 'Heavy & Specialized',
    description: 'Expert handling of oversized loads, vehicles, and specialized machinery.',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2076&auto=format&fit=crop',
    items: [
      { name: 'Machinery, Large Objects', image: 'https://images.unsplash.com/photo-1535157412991-2ef801c1748b?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Motor Vehicles', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Drive/Tow Away', image: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Mobile Homes', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Oilfield Equipment', image: 'https://images.unsplash.com/photo-1516937941348-c09639200241?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Intermodal Containers', image: 'https://images.unsplash.com/photo-1494412651409-ae5d985a5fbd?q=80&w=2070&auto=format&fit=crop' }
    ]
  },
  {
    id: 'bulk-hazmat',
    title: 'Bulk & Hazardous',
    description: 'Certified transport for liquids, chemicals, and regulated materials.',
    icon: Droplet,
    image: 'https://images.unsplash.com/photo-1590496793907-494d06b83718?q=80&w=2074&auto=format&fit=crop',
    items: [
      { name: 'Liquids/Gases', image: 'https://images.unsplash.com/photo-1576613109713-0d5353268485?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Chemicals', image: 'https://images.unsplash.com/photo-1605557202138-097824c3f5c4?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Coal/Coke', image: 'https://images.unsplash.com/photo-1599940824399-b87987ce0799?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Garbage/Refuse', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop' },
      { name: 'Passengers', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop' }
    ]
  }
];

const features = [
  {
    title: 'Nationwide Coverage',
    description: 'We operate across all 48 contiguous states with a network of reliable partners.',
    icon: Anchor
  },
  {
    title: 'Real-Time Tracking',
    description: '24/7 visibility of your cargo with our advanced GPS and telematics systems.',
    icon: Zap
  },
  {
    title: 'Safety First',
    description: 'Strict adherence to FMCSA regulations and rigorous safety protocols.',
    icon: ShieldCheck
  },
  {
    title: 'Eco-Friendly',
    description: 'Modern fleet optimized for fuel efficiency and reduced carbon footprint.',
    icon: Leaf
  }
];

export default function ServicesClient() {
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[50vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
            alt="Logistics Fleet"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-white/70 via-white/20 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-50 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-neutral-900">
              Specialized <span className="text-blue-600">Logistics</span><br />
              For Every Industry.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl font-light leading-relaxed">
              From heavy machinery to temperature-controlled goods, we provide tailored transport solutions designed for efficiency and safety.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pb-32 px-4">
        <div className="container mx-auto">
          
          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto pb-4 mb-12 gap-2 no-scrollbar border-b border-gray-200">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`
                  relative px-6 py-4 rounded-t-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-3
                  ${activeTab === category.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}
                `}
              >
                <category.icon className={`w-5 h-5 ${activeTab === category.id ? 'text-blue-600' : 'text-gray-400'}`} />
                {category.title}
                {activeTab === category.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Display */}
          <AnimatePresence mode="wait">
            {serviceCategories.map((category) => (
              category.id === activeTab && (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
                >
                  {/* Left Column: Category Info */}
                  <div className="lg:col-span-4 space-y-8">
                    <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6">
                        <div className="p-3 bg-blue-600 w-fit rounded-xl mb-4 shadow-lg">
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2 text-white">{category.title}</h2>
                      </div>
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                      <h3 className="text-lg font-semibold text-blue-600 mb-3">Overview</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
                        <ArrowRight className="w-4 h-4 text-blue-600" />
                        <span>{category.items.length} Specialized Transport Types Available</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Items Grid */}
                  <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="group relative h-48 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-4 w-full">
                            <p className="font-medium text-white text-sm md:text-base group-hover:text-blue-200 transition-colors">
                              {item.name}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

        </div>
      </section>

      {/* Features Strip */}
      <section className="py-20 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-neutral-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-blue-50">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
            Ready to Get Moving?
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/20">
              Request a Quote
            </button>
            <button className="px-8 py-4 bg-transparent text-neutral-900 border border-gray-300 rounded-lg font-bold hover:bg-neutral-900 hover:text-white transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
