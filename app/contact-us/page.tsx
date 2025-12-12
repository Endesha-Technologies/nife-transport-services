'use client';

import { useState } from 'react';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        pickupLocation: '',
        deliveryLocation: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            setFormStatus('success');
            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    pickupLocation: '',
                    deliveryLocation: '',
                    message: ''
                });
                setFormStatus('idle');
            }, 3000);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: 'Phone',
            details: '(704) 819-9964',
            link: 'tel:+17048199964',
            subtext: 'Mon-Fri 8am-6pm, Sat 9am-3pm EST'
        },
        {
            icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Email',
            details: 'info@nifetransport.com',
            link: 'mailto:info@nifetransport.com',
            subtext: 'We respond within 24 hours'
        },
        {
            icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Address',
            details: '3733 Freedom Dr, Charlotte, NC 28208',
            link: 'https://maps.google.com/?q=3733+Freedom+Dr+Charlotte+NC+28208',
            subtext: 'United States'
        },
        {
            icon: (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Business Hours',
            details: '24/7 Dispatch Available',
            link: null,
            subtext: 'Emergency services available'
        }
    ];

    const officeLocations = [
        {
            name: 'Headquarters',
            address: '3733 Freedom Dr',
            city: 'Charlotte, NC 28208',
            region: 'Southeast Region',
            description: 'Our main operations center serving the entire Southeast'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-900">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <img
                        src="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?q=80&w=2072&auto=format&fit=crop"
                        alt="Contact NIFE Transport"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-oswald uppercase tracking-tight drop-shadow-2xl">
                        Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">NIFE Transport</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto tracking-wide">
                        Ready to move your freight? Let's talk business.
                    </p>
                </div>
            </section>



            {/* Main Content: Form and Map */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Contact Form */}
                        <div>
                            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
                                {/* Decorative top accent */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1B4965] to-cyan-500" />

                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold font-oswald text-gray-900 uppercase">
                                        Send a Message
                                    </h2>
                                    <p className="text-gray-500 mt-2">
                                        Fill in the details below and we'll get back to you immediately.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    {/* Name & Email Field Group */}
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="group">
                                            <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500 font-oswald group-focus-within:text-[#1B4965] transition-colors">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base font-medium text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#1B4965] focus:ring-4 focus:ring-[#1B4965]/10 outline-none transition-all duration-300"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div className="group">
                                            <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500 font-oswald group-focus-within:text-[#1B4965] transition-colors">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base font-medium text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#1B4965] focus:ring-4 focus:ring-[#1B4965]/10 outline-none transition-all duration-300"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Field */}
                                    <div className="group">
                                        <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500 font-oswald group-focus-within:text-[#1B4965] transition-colors">
                                            Phone <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base font-medium text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#1B4965] focus:ring-4 focus:ring-[#1B4965]/10 outline-none transition-all duration-300"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    {/* Locations Group */}
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="group">
                                            <label htmlFor="pickupLocation" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500 font-oswald group-focus-within:text-[#1B4965] transition-colors">
                                                Pickup Location <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="pickupLocation"
                                                    name="pickupLocation"
                                                    value={formData.pickupLocation}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 pl-11 text-base font-medium text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#1B4965] focus:ring-4 focus:ring-[#1B4965]/10 outline-none transition-all duration-300"
                                                    placeholder="City, State or Zip"
                                                />
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1B4965] transition-colors">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <label htmlFor="deliveryLocation" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500 font-oswald group-focus-within:text-[#1B4965] transition-colors">
                                                Delivery Location <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="deliveryLocation"
                                                    name="deliveryLocation"
                                                    value={formData.deliveryLocation}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 pl-11 text-base font-medium text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#1B4965] focus:ring-4 focus:ring-[#1B4965]/10 outline-none transition-all duration-300"
                                                    placeholder="City, State or Zip"
                                                />
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1B4965] transition-colors">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="group">
                                        <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500 font-oswald group-focus-within:text-[#1B4965] transition-colors">
                                            Details
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base font-medium text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#1B4965] focus:ring-4 focus:ring-[#1B4965]/10 outline-none transition-all duration-300 resize-none"
                                            placeholder="Tell us about the freight characteristics..."
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={formStatus === 'submitting'}
                                            className="w-full bg-gradient-to-r from-[#1B4965] to-cyan-800 text-white font-oswald font-bold uppercase tracking-widest text-lg py-5 px-8 rounded-xl shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/40 hover:-translate-y-1 hover:brightness-110 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group-hover:gap-4"
                                        >
                                            {formStatus === 'submitting' ? (
                                                'Processing...'
                                            ) : (
                                                <>
                                                    Get Your Quote
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>

                                        {formStatus === 'success' && (
                                            <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200 text-center animate-fade-in-up">
                                                <p className="text-green-800 font-bold">
                                                    Request received! We'll allow 24h for a response.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Office Information & Map */}
                        {/* Office Information & Map */}
                        <div className="space-y-8">

                            <div className="mb-8">
                                <h2 className="mb-3 text-3xl font-bold text-gray-900">Our Location</h2>
                                <p className="text-lg text-gray-600">
                                    3733 Freedom Dr, Charlotte, NC 28208
                                </p>
                            </div>

                            {/* Map Placeholder */}
                            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg top-0">
                                <div className="aspect-[4/3] w-full">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.9847634916774!2d-80.91691!3d35.20982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88569f5e2e0d0d0d%3A0x0!2s3733%20Freedom%20Dr%2C%20Charlotte%2C%20NC%2028208!5e0!3m2!1sen!2sus!4v1234567890"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="NIFE Transport Services LLC Location"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}