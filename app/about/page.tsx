'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// --- CUSTOM HOOKS & UTILS ---

function use3DTilt(ref: React.RefObject<HTMLDivElement | null>, intensity = 15) {
    const [transform, setTransform] = useState('');
    const [shine, setShine] = useState('');

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Inverted for natural feel
            const rotateX = ((y - centerY) / centerY) * -intensity;
            const rotateY = ((x - centerX) / centerX) * intensity;

            setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
            setShine(`radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.8), transparent 80%)`);
        };

        const handleMouseLeave = () => {
            setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
            setShine('');
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref, intensity]);

    return { transform, shine };
}

function useScrollParallax(speed = 0.5) {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY * speed);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return offset;
}

function useReveal(threshold = 0.1) {
    const [isRevealed, setIsRevealed] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsRevealed(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isRevealed };
}

// --- ADVANCED COMPONENTS ---

const TiltCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { transform, shine } = use3DTilt(ref, 10);

    return (
        <div
            ref={ref}
            className={`relative transition-transform duration-100 ease-out transform-gpu ${className}`}
            style={{ transform }}
        >
            <div
                className="absolute inset-0 pointer-events-none z-10 rounded-3xl opacity-60 mix-blend-overlay"
                style={{ background: shine }}
            />
            {children}
        </div>
    );
};


const Counter3D = ({ end, label }: { end: number, label: string }) => {
    const { ref, isRevealed } = useReveal();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isRevealed) return;
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);

            setCount(Math.floor(start + (end - start) * ease));

            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isRevealed, end]);

    return (
        <div ref={ref} className="text-center group perspective-500">
            <div className={`transition-all duration-1000 transform ${isRevealed ? 'rotateX-0 opacity-100' : 'rotateX-45 opacity-0'}`}>
                <div className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 mb-2 drop-shadow-lg tabular-nums">
                    {count}{end === 100 || end === 98 ? '%' : '+'}
                </div>
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-gray-300 group-hover:text-white transition-colors">
                    {label}
                </div>
            </div>
        </div>
    );
};

const EngineeringShowcase = ({ fleetData, activeFleetIndex }: { fleetData: any[], activeFleetIndex: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { transform, shine } = use3DTilt(ref, 5); // Subtle tilt

    return (
        <div
            ref={ref}
            className="relative h-[500px] w-full transform-gpu transition-transform duration-100 ease-out"
            style={{ transform }}
        >
            <div
                className="absolute inset-0 border border-gray-100 rounded-3xl bg-gray-50/50 backdrop-blur-sm pointer-events-none"
                style={{ background: shine }}
            >
                {/* Tech Decorators */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#1B4965]" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#1B4965]" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#1B4965]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#1B4965]" />
            </div>

            <div className="relative h-full w-full p-4">
                {fleetData.map((fleet, idx) => {
                    const isActive = idx === activeFleetIndex;
                    if (!isActive) return null;

                    return (
                        <div
                            key={idx}
                            className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up"
                        >
                            <Image
                                src={fleet.img}
                                alt={fleet.name}
                                fill
                                className="object-cover"
                            />

                            {/* Specs Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent">
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="flex items-end justify-between border-b border-white/20 pb-4 mb-4">
                                        <div>
                                            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1 block">Vehicle Spec</span>
                                            <h3 className="text-3xl font-black text-white">{fleet.name}</h3>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-gray-400 font-mono text-xs uppercase block">Status</span>
                                            <span className="text-green-400 font-bold text-sm flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                                Operational
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 font-medium leading-relaxed max-w-md">
                                        {fleet.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default function About() {
    const heroParallax = useScrollParallax(0.3);
    const bgParallax = useScrollParallax(0.05);

    const [activeFleetIndex, setActiveFleetIndex] = useState(0);

    const fleetData = [
        { name: "Dry Van", desc: "Versatile protection for general freight.", img: "/images/img2.jpg" },
        { name: "Refrigerated", desc: "Climate control for sensitive goods.", img: "/images/img1.jpg" },
        { name: "Flatbed", desc: "Heavy-duty for oversized loads.", img: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2072&auto=format&fit=crop" },
        { name: "Step Deck", desc: "Height clearance for tall cargo.", img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop" },
        { name: "Straight Truck", desc: "Agile urban delivery solutions.", img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop" }
    ];

    return (
        <div className="min-h-screen bg-white overflow-x-hidden text-gray-900 selection:bg-cyan-200">

            {/* HERO SECTION - CINEMATIC BACKGROUND */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
                {/* High-Quality Background Image with Ken Burns Effect */}
                {/* Background Video */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-cover w-full h-full opacity-80"
                    >
                        <source src="/images/vid.mp4" type="video/mp4" />
                    </video>
                    {/* Modern Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
                </div>

                {/* Hero Content Overlay */}
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20" ref={heroParallax.ref as any}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-6 drop-shadow-2xl">
                        NIFE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Transport</span><br />
                        {/* Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">Excellence</span>. */}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 font-medium max-w-2xl mx-auto tracking-wide drop-shadow-md">
                        Built on Trust, Driven by Excellence.
                    </p>
                </div>


            </section>

            {/* BACKGROUND INFORMATION SECTION - A WORD ABOUT US */}
            <section className="relative pt-24 pb-12 bg-white overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-[0.015]">
                        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#1B4965 1px, transparent 1px), linear-gradient(90deg, #1B4965 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        {/* Left Side - Professional Truck Image */}
                        <div className="relative group" data-aos="fade-right">
                            {/* Main Image Container */}
                            <div className="relative h-[400px] lg:h-[500px] rounded-sm overflow-hidden shadow-xl">
                                <Image
                                    src="/images/img.jpg"
                                    alt="NIFE Truck Transport Services"
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] ease-out"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right Side - Background Information */}
                        <div className="relative" data-aos="fade-left">

                            <div className="w-fit mx-auto lg:mx-0">
                                <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold font-oswald text-gray-900 uppercase leading-none mb-8 tracking-tight text-center">
                                    A WORD ABOUT US AND HOW WE<br />
                                    CAN HELP YOU
                                </h2>
                            </div>

                            {/* Content Paragraphs - Black Text */}
                            <div className="space-y-6 text-gray-800">
                                <p className="text-base md:text-lg leading-relaxed">
                                    Truck Transport provides <span className="font-bold">reliable and safe</span> local and long-distance truck hauling services nationwide. We have the expertise and equipment to ship light, medium, and heavy-duty trucks. A unique thing about us is our <span className="font-bold">more than 13 years of experience</span> shipping standard, heavy-duty, oversized, and commercial trucks, you can rest assured your shipment is in the hands of professionals.
                                </p>

                                <p className="text-base md:text-lg leading-relaxed">
                                    We have a team of <span className="font-bold">highly dedicated logistics experts</span> and a high-capability fleet of carriers to ensure unmatched truck transport solutions tailored to every client's needs. We obtain all the required paperwork and permits so you can have the <span className="font-bold">best truck-hauling experience</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* MISSION & VALUE PROPOSITION - CARD DESIGN */}
            <section className="relative py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8">

                        {/* MISSION CARD */}
                        <TiltCard className="h-[400px]">
                            <div className="relative h-full group overflow-hidden rounded-sm shadow-2xl">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <Image
                                        src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop"
                                        alt="Mission Background"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Dark Overlay for Maximum Readability */}
                                    <div className="absolute inset-0 bg-black/80 group-hover:bg-black/70 transition-all duration-500" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full flex flex-col items-center justify-end p-8 pb-12 text-center">
                                    <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-wider drop-shadow-lg">
                                        Our Mission
                                    </h3>
                                    <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium max-w-lg drop-shadow-md">
                                        At Nife Transport, our mission is to provide top-notch quality truck shipping services that exceed customer expectations. We strive to deliver unparalleled reliability, professionalism, and exceptional service in every project we undertake, ensuring complete customer satisfaction.
                                    </p>
                                </div>
                            </div>
                        </TiltCard>

                        {/* VALUE PROPOSITION CARD */}
                        <TiltCard className="h-[400px]">
                            <div className="relative h-full group overflow-hidden rounded-sm shadow-2xl">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <Image
                                        src="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2072&auto=format&fit=crop"
                                        alt="Value Proposition Background"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Dark Overlay for Maximum Readability */}
                                    <div className="absolute inset-0 bg-black/80 group-hover:bg-black/70 transition-all duration-500" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full flex flex-col items-center justify-end p-8 pb-12 text-center">
                                    <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-wider drop-shadow-lg">
                                        Value Proposition
                                    </h3>
                                    <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium max-w-lg drop-shadow-md">
                                        With over 13 years of experience, Nife Transport is dedicated to providing reliable and efficient shipping solutions for all types of trucks. Whether you are shipping a standard truck, a heavy-duty truck, or a commercial truck, we ensure your vehicle arrives safely and timely at its destination.
                                    </p>
                                </div>
                            </div>
                        </TiltCard>

                    </div>
                </div>
            </section>

            {/* CORE PILLARS - MODERN PROFESSIONAL GRID */}
            <section className="relative py-12 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[#1B4965] font-black text-sm uppercase tracking-[0.2em] mb-3 block">What Drives Us</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 drop-shadow-sm">
                            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B4965] to-cyan-600">Pillars</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: 'Precision',
                                desc: 'Engineering precision in every delivery. Calculated routes, optimized miles.',
                                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
                                color: 'bg-blue-600'
                            },
                            {
                                title: 'Integrity',
                                desc: 'Radical transparency. Your cargo, your data, your complete peace of mind.',
                                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                                color: 'bg-[#1B4965]'
                            },
                            {
                                title: 'Innovation',
                                desc: 'Pioneering the future of freight with AI routing and predictive tech.',
                                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                                color: 'bg-cyan-500'
                            },
                            {
                                title: 'Sustainability',
                                desc: 'Moving forward responsibly. Commitment to eco-friendly logistics.',
                                icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                                color: 'bg-green-600'
                            }
                        ].map((pillar, idx) => (
                            <TiltCard key={idx}>
                                <div className="h-full group relative bg-white p-8 rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-teal-500 overflow-hidden">
                                    <div className={`absolute top-0 left-0 w-1 h-full ${pillar.color} group-hover:w-full transition-all duration-500 opacity-100 group-hover:opacity-5`} />
                                    <div className={`absolute bottom-0 left-0 w-full h-1 ${pillar.color} scale-x-0 group-hover:scale-x-100 transition-all duration-500`} />

                                    <div className={`w-14 h-14 mb-6 rounded-2xl ${pillar.color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                        <svg className={`w-7 h-7 ${pillar.color.replace('bg-', 'text-')}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={pillar.icon} />
                                        </svg>
                                    </div>

                                    <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[#1B4965] transition-colors">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                        {pillar.desc}
                                    </p>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>


            {/* FLEET - MODERN ENGINEERING SHOWCASE */}
            <section className="relative py-12 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-20">
                    {/* Text & Selector Side */}
                    <div className="lg:w-1/2">
                        <div className="mb-10">
                            <span className="text-amber-500 font-black text-sm uppercase tracking-[0.2em] mb-2 block animate-pulse">Licensed, Bonded, and Insured</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight drop-shadow-sm">
                                Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B4965] to-cyan-600">Engineering</span>
                            </h2>
                            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
                                Explore our fleet of state-of-the-art vehicles equipped for any challenge.
                            </p>
                        </div>

                        {/* Modern Pill/Tag Selector */}
                        <div className="flex flex-wrap gap-6 mb-8">
                            {fleetData.map((fleet, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveFleetIndex(idx)}
                                    className={`px-8 py-4 rounded-full text-base font-bold tracking-wide transition-all duration-300 border-2 flex items-center gap-3 ${activeFleetIndex === idx
                                        ? 'bg-[#1B4965] border-[#1B4965] text-white shadow-xl scale-105'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#1B4965] hover:text-[#1B4965] hover:bg-gray-50'
                                        }`}
                                >
                                    {activeFleetIndex === idx ? (
                                        <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-[#1B4965]" />
                                    )}
                                    {fleet.name}
                                </button>
                            ))}
                        </div>

                        {/* Quick Specs / Description based on selection */}
                        <div className="p-8 bg-white rounded-3xl border border-gray-200 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <svg className="w-5 h-5 text-[#1B4965]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-gray-900 text-lg">Fleet Specifications</h4>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {fleetData[activeFleetIndex].desc}
                            </p>
                            <div className="mt-6">
                                <Link href="/fleet" className="inline-flex items-center font-bold text-[#1B4965] hover:text-cyan-600 transition-colors group">
                                    View Full Fleet Details
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                    </div>

                    {/* Display Side - Technical Showcase */}
                    <div className="lg:w-1/2">
                        <EngineeringShowcase fleetData={fleetData} activeFleetIndex={activeFleetIndex} />
                    </div>
                </div>
            </section>


        </div>
    );
}
