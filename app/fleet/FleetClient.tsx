'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  Thermometer, 
  Box, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  ChevronRight, 
  X,
  Scale,
  Maximize,
  Info,
  ArrowRight
} from 'lucide-react';

// Fleet Data
const truckCategories = [
    {
        id: 1,
        name: 'Dry Van Trailers',
        shortDesc: 'The standard for general freight.',
        description: 'Our most versatile units for general freight and temperature-stable cargo. Perfect for retail goods, electronics, and non-perishable food items. These trailers are fully enclosed to protect your shipment from the elements.',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
        specs: {
            length: '53 feet',
            capacity: '45,000 lbs',
            volume: '3,800 cu ft',
        },
        cargoTypes: ['Consumer Electronics', 'Retail Goods', 'Textiles', 'Non-perishable Food', 'Paper Products', 'Auto Parts'],
        icon: Box,
        color: 'bg-blue-600'
    },
    {
        id: 2,
        name: 'Refrigerated Trailers',
        shortDesc: 'Temperature-controlled excellence.',
        description: 'State-of-the-art temperature-controlled units maintaining -20°F to 70°F. Essential for perishable goods, pharmaceuticals, and sensitive chemicals requiring strict temperature adherence.',
        image: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1974&auto=format&fit=crop',
        specs: {
            length: '53 feet',
            capacity: '43,000 lbs',
            temperature: '-20°F to 70°F',
        },
        cargoTypes: ['Frozen Foods', 'Fresh Produce', 'Pharmaceuticals', 'Floral Products', 'Chemicals'],
        icon: Thermometer,
        color: 'bg-cyan-500'
    },
    {
        id: 3,
        name: 'Flatbed Trailers',
        shortDesc: 'For oversized and heavy loads.',
        description: 'Open deck trailers designed for oversized loads, construction materials, and machinery that cannot be loaded from a dock. Equipped with straps and chains for secure transport.',
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop',
        specs: {
            length: '48-53 feet',
            capacity: '48,000 lbs',
            width: '8.5 feet',
        },
        cargoTypes: ['Construction Materials', 'Heavy Machinery', 'Steel & Pipe', 'Lumber', 'Oversized Equipment'],
        icon: Truck,
        color: 'bg-orange-500'
    },
    {
        id: 4,
        name: 'Heavy Haul',
        shortDesc: 'Extreme capacity for extreme loads.',
        description: 'Specialized equipment for super-heavy and over-dimensional freight. Our heavy haul fleet includes multi-axle trailers capable of transporting massive industrial components.',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop',
        specs: {
            length: 'Varies',
            capacity: '80,000+ lbs',
            type: 'Multi-axle',
        },
        cargoTypes: ['Industrial Turbines', 'Mining Equipment', 'Bridge Beams', 'Transformers'],
        icon: Scale,
        color: 'bg-red-600'
    }
];

const stats = [
    { label: 'Trucks in Fleet', value: '500+', icon: Truck },
    { label: 'Years of Service', value: '25+', icon: Clock },
    { label: 'States Covered', value: '48', icon: MapPin },
    { label: 'On-Time Delivery', value: '99%', icon: ShieldCheck },
];

export default function FleetClient() {
    const [selectedTruck, setSelectedTruck] = useState<typeof truckCategories[0] | null>(null);

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-blue-100">
            
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop" 
                        alt="Fleet Hero" 
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                </div>
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Power in <span className="text-blue-400">Motion</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 font-light">
                            A modern, diverse fleet engineered to deliver your cargo safely, on time, every time.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors flex items-center gap-2 mx-auto"
                            onClick={() => document.getElementById('fleet-grid')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Explore Our Fleet <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white relative z-20 -mt-20 container mx-auto px-4 rounded-xl shadow-xl max-w-6xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-gray-500 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Fleet Grid Section */}
            <section id="fleet-grid" className="py-24 px-4 container mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
                            Our Specialized Vehicles
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            From temperature-sensitive goods to oversized machinery, we have the right equipment for the job.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {truckCategories.map((truck, index) => (
                        <motion.div
                            key={truck.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-[400px] md:h-[500px]
                                ${index === 0 || index === 3 ? 'md:col-span-2' : 'md:col-span-1'}
                            `}
                            onClick={() => setSelectedTruck(truck)}
                        >
                            <div className="absolute inset-0">
                                <Image 
                                    src={truck.image} 
                                    alt={truck.name} 
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            </div>
                            
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${truck.color} text-white shadow-lg`}>
                                        <truck.icon className="w-3 h-3" /> {truck.name}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2">{truck.name}</h3>
                                    <p className="text-gray-200 mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {truck.shortDesc}
                                    </p>
                                    <div className="flex items-center gap-2 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 translate-y-4 group-hover:translate-y-0">
                                        <span className="border-b-2 border-white/30 pb-0.5 group-hover:border-white transition-colors">View Details</span> <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features / Why Choose Us */}
            <section className="py-24 bg-gray-900 text-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl font-bold mb-6">Modern Technology & Safety</h2>
                                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                    Our fleet isn't just about trucks; it's about the technology that powers them. 
                                    We invest heavily in safety systems, real-time tracking, and eco-friendly innovations 
                                    to ensure your cargo arrives safely and sustainably.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        'Real-time GPS Tracking & Telematics',
                                        'Collision Mitigation Systems',
                                        'Fuel-Efficient Aerodynamic Designs',
                                        '24/7 Maintenance Support'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                                <ShieldCheck className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-200">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                        <div className="md:w-1/2 relative">
                            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border-4 border-gray-800 shadow-2xl">
                                <Image 
                                    src="https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?q=80&w=2018&auto=format&fit=crop" 
                                    alt="Truck Dashboard" 
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Floating Badge */}
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-6 -left-6 bg-blue-600 p-6 rounded-xl shadow-xl"
                            >
                                <p className="text-3xl font-bold">100%</p>
                                <p className="text-sm text-blue-100">ELD Compliant</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal for Truck Details */}
            <AnimatePresence>
                {selectedTruck && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedTruck(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedTruck(null)}
                                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="relative h-64 md:h-80">
                                <Image 
                                    src={selectedTruck.image} 
                                    alt={selectedTruck.name} 
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-6 left-6 md:left-10 text-white">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedTruck.name}</h2>
                                    <p className="text-lg text-gray-200">{selectedTruck.shortDesc}</p>
                                </div>
                            </div>

                            <div className="p-6 md:p-10">
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div>
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                                            <Info className="w-5 h-5 text-blue-600" /> Description
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-8">
                                            {selectedTruck.description}
                                        </p>

                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                                            <Maximize className="w-5 h-5 text-blue-600" /> Specifications
                                        </h3>
                                        <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                                            {Object.entries(selectedTruck.specs).map(([key, value]) => (
                                                <div key={key} className="flex justify-between border-b border-gray-200 last:border-0 pb-2 last:pb-0">
                                                    <span className="text-gray-500 capitalize">{key}</span>
                                                    <span className="font-semibold text-gray-900">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                                            <Box className="w-5 h-5 text-blue-600" /> Common Cargo
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {selectedTruck.cargoTypes.map((cargo, i) => (
                                                <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                                                    {cargo}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="bg-blue-600 text-white p-6 rounded-xl">
                                            <h4 className="font-bold text-lg mb-2">Need this truck?</h4>
                                            <p className="text-blue-100 mb-4 text-sm">
                                                Our team is ready to schedule your shipment with our {selectedTruck.name} fleet.
                                            </p>
                                            <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors">
                                                Request Quote
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
