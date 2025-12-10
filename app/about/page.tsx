'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration]);

    return (
        <div ref={counterRef} className="tabular-nums">
            {count}{suffix}
        </div>
    );
}

export default function About() {
    const [activeFleet, setActiveFleet] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fleetTypes = [
        {
            name: 'Dry Van Trailers',
            capacity: '53 ft | 45,000 lbs',
            description: 'Our versatile dry van trailers are perfect for general freight, providing secure and weather-protected transportation for a wide range of goods.',
            features: ['Climate controlled option', 'GPS tracking', 'Liftgate available', 'Secure cargo area'],
            ideal: 'Consumer goods, electronics, packaged products'
        },
        {
            name: 'Refrigerated Trailers',
            capacity: '53 ft | 43,000 lbs',
            description: 'Temperature-controlled reefer trailers maintain precise climate control from -20°F to +70°F, ensuring your temperature-sensitive cargo arrives in perfect condition.',
            features: ['Multi-temperature zones', 'Real-time temp monitoring', 'Backup refrigeration', 'FDA compliant'],
            ideal: 'Perishable foods, pharmaceuticals, frozen goods'
        },
        {
            name: 'Flatbed Trailers',
            capacity: '48-53 ft | 48,000 lbs',
            description: 'Open-deck flatbeds for oversized or irregularly shaped cargo that requires easy loading from any angle.',
            features: ['Tarping available', 'Oversized load capable', 'Multiple tie-down points', 'Specialized permits'],
            ideal: 'Construction materials, machinery, steel products'
        },
        {
            name: 'Step Deck Trailers',
            capacity: '53 ft | 45,000 lbs',
            description: 'Lower deck height allows for taller freight while maintaining legal height restrictions.',
            features: ['Extra height clearance', 'Ramp capability', 'Heavy-duty construction', 'Versatile loading'],
            ideal: 'Heavy equipment, tall machinery, industrial goods'
        },
        {
            name: 'Straight Trucks',
            capacity: '24-26 ft | 12,500 lbs',
            description: 'Ideal for local and regional deliveries, our straight trucks provide flexibility for smaller loads and tight delivery schedules.',
            features: ['Liftgate equipped', 'Urban access', 'Same-day capability', 'Multiple stops'],
            ideal: 'LTL freight, local deliveries, urban areas'
        }
    ];

    const values = [
        {
            title: 'Reliability',
            description: 'We deliver on our promises with 98% on-time delivery rate, ensuring your cargo reaches its destination when expected.',
            stat: '98%',
            icon: (
                <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: 'Security',
            description: 'Your freight is protected with comprehensive insurance, GPS tracking, and vetted professional drivers.',
            stat: '$100K',
            icon: (
                <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        },
        {
            title: 'Efficiency',
            description: 'Optimized routing and modern fleet management technology ensure cost-effective and timely deliveries.',
            stat: '24/7',
            icon: (
                <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: 'Customer Service',
            description: '24/7 support from our dedicated team ensures you always have a reliable partner for your logistics needs.',
            stat: '100%',
            icon: (
                <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Clean White and Green */}
            <section className="relative overflow-hidden pt-20 lg:pt-24">
                {/* Blurred Background Elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div
                        className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl"
                        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                    />
                    <div
                        className="absolute top-1/3 -left-20 h-[500px] w-[500px] rounded-full bg-green-400/15 blur-3xl"
                        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
                    />
                    <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />
                </div>

                {/* Truck Image Background - More subtle */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <img
                        src="/images/three-trucks-hero.png"
                        alt="NIFE Transport Fleet"
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                <div className="relative z-20 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
                    <div className="max-w-4xl">
                        {/* Badge */}
                        <div className="mb-8 inline-flex items-center gap-3 rounded-full border-2 border-emerald-200 bg-white/80 px-6 py-3 backdrop-blur-xl shadow-lg shadow-emerald-100/50">
                            <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"></div>
                            <span className="text-sm font-bold uppercase tracking-wider text-gray-900">Nationwide Freight Solutions</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="mb-6 text-5xl font-black leading-[1.1] text-gray-900 sm:text-6xl lg:text-7xl">
                            Professional Freight
                            <br />
                            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                                Transportation Excellence
                            </span>
                        </h1>

                        <p className="mb-10 max-w-2xl text-xl font-medium leading-relaxed text-gray-700 lg:text-2xl">
                            NIFE Transport Services delivers reliable, efficient freight solutions across America with cutting-edge technology and unwavering commitment to excellence.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/contact-us"
                                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-10 py-5 text-lg font-black text-white shadow-2xl shadow-emerald-600/30 transition-all hover:scale-105 hover:shadow-emerald-600/40"
                            >
                                Get Free Quote
                                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <a
                                href="tel:+17048199964"
                                className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-gray-300 bg-white/80 px-10 py-5 text-lg font-black text-gray-900 backdrop-blur-xl transition-all hover:border-emerald-600 hover:bg-emerald-50"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                (704) 819-9964
                            </a>
                        </div>

                        {/* Stats - Glassmorphism Cards */}
                        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {[
                                { value: 500, suffix: '+', label: 'Monthly Deliveries' },
                                { value: 98, suffix: '%', label: 'On-Time Rate' },
                                { value: 50, suffix: '+', label: 'Fleet Vehicles' },
                                { value: 48, suffix: '', label: 'States Served' }
                            ].map((stat, idx) => (
                                <div key={idx} className="rounded-2xl border border-emerald-200/50 bg-white/60 p-5 backdrop-blur-xl shadow-lg transition-all hover:scale-105 hover:border-emerald-300 hover:shadow-xl">
                                    <div className="text-3xl font-black text-emerald-600">
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Professional Capabilities */}
            <section className="relative py-20 lg:py-32">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/30 to-white" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <div className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-6 py-2">
                            <span className="text-sm font-bold uppercase tracking-widest text-emerald-700">Why Choose NIFE</span>
                        </div>
                        <h2 className="mb-6 text-4xl font-black text-gray-900 sm:text-5xl lg:text-6xl">
                            Unmatched
                            <br />
                            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                Professional Excellence
                            </span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600">
                            Industry-leading capabilities backed by cutting-edge technology
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Credentials & Compliance */}
                        <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-10 shadow-xl transition-all duration-500 hover:scale-105 hover:border-emerald-200 hover:shadow-2xl">
                            <div className="absolute right-0 top-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl transition-all duration-500 group-hover:bg-emerald-400/20" />
                            <div className="relative">
                                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-2xl shadow-emerald-500/30">
                                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="mb-4 text-2xl font-black text-gray-900">Licensed & Certified</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>FMCSA Licensed & DOT Registered</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>$100,000 Cargo Insurance Coverage</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Fully Compliant Safety Standards</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Professional Driver Background Checks</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Advanced Technology */}
                        <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-10 shadow-xl transition-all duration-500 hover:scale-105 hover:border-emerald-200 hover:shadow-2xl">
                            <div className="absolute right-0 top-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-green-400/10 blur-3xl transition-all duration-500 group-hover:bg-green-400/20" />
                            <div className="relative">
                                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-2xl shadow-green-500/30">
                                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="mb-4 text-2xl font-black text-gray-900">Cutting-Edge Technology</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Real-Time GPS Fleet Tracking</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Advanced Route Optimization</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Electronic Logging Devices (ELD)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Automated Load Monitoring Systems</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Operational Excellence */}
                        <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-10 shadow-xl transition-all duration-500 hover:scale-105 hover:border-emerald-200 hover:shadow-2xl">
                            <div className="absolute right-0 top-0 -mr-10 -mt-10 h-40 w-40 rounded-full bg-teal-400/10 blur-3xl transition-all duration-500 group-hover:bg-teal-400/20" />
                            <div className="relative">
                                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-2xl shadow-teal-500/30">
                                    <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="mb-4 text-2xl font-black text-gray-900">Proven Performance</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>98% On-Time Delivery Record</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>24/7 Dispatch & Customer Support</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Experienced Professional Drivers</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Nationwide Service Coverage</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Metrics Banner - Green Gradient */}
                    <div className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-12 shadow-2xl shadow-emerald-600/30">
                        <div className="grid gap-8 md:grid-cols-4">
                            {[
                                {
                                    number: '500+', label: 'Successful Deliveries Monthly', icon: (
                                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    )
                                },
                                {
                                    number: '50+', label: 'Modern Fleet Vehicles', icon: (
                                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                    )
                                },
                                {
                                    number: '100%', label: 'DOT Compliance Rate', icon: (
                                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    )
                                },
                                {
                                    number: '24/7', label: 'Customer Support', icon: (
                                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )
                                }
                            ].map((metric, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-xl">
                                        {metric.icon}
                                    </div>
                                    <div className="mb-2 text-5xl font-black text-white">{metric.number}</div>
                                    <div className="text-sm font-bold text-white/90">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="relative overflow-hidden bg-gradient-to-b from-white to-emerald-50/30 py-20 lg:py-32">
                <div className="absolute inset-0 -z-10 opacity-30">
                    <div className="h-full w-full" style={{
                        backgroundImage: 'radial-gradient(circle, rgb(16 185 129) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <div className="mb-4 inline-block rounded-full border border-emerald-200 bg-white px-6 py-2">
                            <span className="text-sm font-bold uppercase tracking-widest text-emerald-700">What Drives Us</span>
                        </div>
                        <h2 className="mb-6 text-4xl font-black text-gray-900 sm:text-5xl lg:text-6xl">
                            Our <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Purpose</span>
                        </h2>
                    </div>

                    <div className="mb-20 grid gap-8 lg:grid-cols-2">
                        {/* Mission */}
                        <div className="group relative overflow-hidden rounded-3xl border-2 border-emerald-200/50 bg-white/80 p-12 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:border-emerald-300 hover:shadow-2xl">
                            <div className="absolute right-0 top-0 -mr-12 -mt-12 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-2xl shadow-emerald-500/50">
                                    <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="mb-5 text-3xl font-black text-gray-900">Our Mission</h3>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    To provide exceptional freight transportation services through reliability, innovation, and unwavering commitment to customer satisfaction. We strive to be the logistics partner that businesses can depend on, delivering their goods safely and efficiently across America.
                                </p>
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="group relative overflow-hidden rounded-3xl border-2 border-emerald-200/50 bg-white/80 p-12 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:border-emerald-300 hover:shadow-2xl">
                            <div className="absolute right-0 top-0 -mr-12 -mt-12 h-48 w-48 rounded-full bg-green-400/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-2xl shadow-green-500/50">
                                    <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <h3 className="mb-5 text-3xl font-black text-gray-900">Our Vision</h3>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    To be recognized as the premier freight transportation company in the United States, known for our professionalism, cutting-edge technology, and dedication to building lasting partnerships with our clients. We envision a future where NIFE Transport is synonymous with trust and excellence.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Core Values */}
                    <div>
                        <h3 className="mb-12 text-center text-3xl font-black text-gray-900">Core Values</h3>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {values.map((value, idx) => (
                                <div key={idx} className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-white/80 p-8 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-emerald-300 hover:shadow-2xl">
                                    <div className="absolute right-0 top-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                                    <div className="relative">
                                        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 p-4 shadow-2xl shadow-emerald-500/30 transition-transform duration-500 group-hover:scale-110">
                                            <div className="text-white">
                                                {value.icon}
                                            </div>
                                        </div>
                                        <div className="mb-3 text-3xl font-black text-emerald-600">{value.stat}</div>
                                        <h4 className="mb-3 text-xl font-bold text-gray-900">{value.title}</h4>
                                        <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Fleet Overview */}
            <section className="py-20 lg:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <div className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-6 py-2">
                            <span className="text-sm font-bold uppercase tracking-widest text-emerald-700">Our Fleet</span>
                        </div>
                        <h2 className="mb-6 text-4xl font-black text-gray-900 sm:text-5xl lg:text-6xl">
                            State-of-the-Art
                            <br />
                            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                Transportation Solutions
                            </span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600">
                            Premium vehicles equipped with cutting-edge technology for every shipping requirement
                        </p>
                    </div>

                    {/* Fleet Type Selector */}
                    <div className="mb-12 overflow-x-auto pb-4">
                        <div className="flex gap-4 sm:justify-center">
                            {fleetTypes.map((fleet, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveFleet(idx)}
                                    className={`whitespace-nowrap rounded-xl px-8 py-4 text-sm font-black transition-all duration-300 ${activeFleet === idx
                                            ? 'scale-105 bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-2xl shadow-emerald-600/30'
                                            : 'border-2 border-gray-300 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50'
                                        }`}
                                >
                                    {fleet.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Fleet Details Card */}
                    <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-200 bg-white shadow-2xl">
                        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 to-white opacity-50" />
                        <div className="relative p-12 lg:p-16">
                            <div className="grid gap-16 lg:grid-cols-2">
                                {/* Left Content */}
                                <div>
                                    <div className="mb-8 inline-flex items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-4 text-white shadow-xl shadow-emerald-600/30">
                                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span className="text-xl font-black">{fleetTypes[activeFleet].capacity}</span>
                                    </div>

                                    <h3 className="mb-6 text-4xl font-black text-gray-900 lg:text-5xl">
                                        {fleetTypes[activeFleet].name}
                                    </h3>

                                    <p className="mb-10 text-xl leading-relaxed text-gray-700">
                                        {fleetTypes[activeFleet].description}
                                    </p>

                                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 shadow-inner">
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="h-3 w-3 rounded-full bg-emerald-600" />
                                            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900">
                                                Ideal Applications
                                            </h4>
                                        </div>
                                        <p className="text-xl font-bold text-gray-900">{fleetTypes[activeFleet].ideal}</p>
                                    </div>
                                </div>

                                {/* Right Content - Features */}
                                <div>
                                    <div className="mb-8 flex items-center gap-3">
                                        <div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-600" />
                                        <h4 className="text-2xl font-black text-gray-900">Premium Features</h4>
                                    </div>

                                    <div className="space-y-5">
                                        {fleetTypes[activeFleet].features.map((feature, idx) => (
                                            <div key={idx} className="group flex items-start gap-5 rounded-2xl border-2 border-gray-200 bg-white p-6 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-xl">
                                                <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-lg font-bold text-gray-900">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-10 shadow-lg">
                                        <h4 className="mb-4 text-2xl font-black text-gray-900">Ready to Ship?</h4>
                                        <p className="mb-8 text-lg text-gray-600">
                                            Get a customized quote tailored to your specific freight requirements
                                        </p>
                                        <Link
                                            href="/contact-us"
                                            className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-10 py-5 text-lg font-black text-white shadow-2xl shadow-emerald-600/30 transition-all duration-300 hover:scale-105"
                                        >
                                            Request Free Quote
                                            <svg className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fleet Stats */}
                    <div className="mt-16 grid gap-8 sm:grid-cols-3">
                        {[
                            {
                                label: 'Fleet Vehicles',
                                value: '50+',
                                icon: (
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                )
                            },
                            {
                                label: 'DOT Compliant',
                                value: '100%',
                                icon: (
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                )
                            },
                            {
                                label: 'GPS Tracking',
                                value: '24/7',
                                icon: (
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )
                            }
                        ].map((stat, idx) => (
                            <div key={idx} className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 p-10 text-center shadow-2xl shadow-emerald-600/30 transition-all duration-500 hover:scale-105">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                <div className="relative">
                                    <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                                        {stat.icon}
                                    </div>
                                    <div className="mb-3 text-5xl font-black text-white">{stat.value}</div>
                                    <div className="text-sm font-bold uppercase tracking-widest text-white/90">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 py-24">
                <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 2px)',
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                    <div className="mb-8 inline-flex items-center gap-3 rounded-full border-2 border-white/20 bg-white/10 px-8 py-3 backdrop-blur-2xl">
                        <div className="h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50" />
                        <span className="text-base font-bold text-white">Join Our Growing Family</span>
                    </div>

                    <h2 className="mb-8 text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
                        Experience the
                        <br />
                        NIFE Difference
                    </h2>

                    <p className="mb-12 text-2xl font-medium text-white/95">
                        Join hundreds of satisfied customers who trust us with their most important shipments
                    </p>

                    <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
                        <Link
                            href="/contact-us"
                            className="group relative overflow-hidden rounded-xl border-2 border-white bg-white px-12 py-6 text-xl font-black text-emerald-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/20"
                        >
                            <span className="relative flex items-center gap-3">
                                Get Free Quote
                                <svg className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </Link>

                        <a
                            href="tel:+17048199964"
                            className="group flex items-center gap-4 rounded-xl border-2 border-white/30 bg-white/10 px-12 py-6 text-xl font-black text-white backdrop-blur-2xl transition-all duration-300 hover:border-white/50 hover:bg-white/20"
                        >
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            (704) 819-9964
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}