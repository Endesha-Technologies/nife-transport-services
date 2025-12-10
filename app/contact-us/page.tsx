'use client';

import { useState } from 'react';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        freightType: '',
        pickupLocation: '',
        deliveryLocation: '',
        estimatedWeight: '',
        preferredDate: '',
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
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    company: '',
                    freightType: '',
                    pickupLocation: '',
                    deliveryLocation: '',
                    estimatedWeight: '',
                    preferredDate: '',
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
            <section className="relative bg-gradient-to-br from-[#1B4965] via-[#2a5f7f] to-[#1B4965] pt-20 lg:pt-24">
                <div className="absolute inset-0 overflow-hidden opacity-10">
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
                    <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                            </span>
                            <span className="text-sm font-semibold text-white">Available 24/7</span>
                        </div>

                        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                            Get in <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">Touch</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90">
                            Ready to ship? Request a free quote or contact our team for personalized freight solutions
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Information Cards */}
            <section className="py-12 lg:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="group rounded-xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-[#1B4965]/30 hover:shadow-lg"
                            >
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1B4965]/10 text-[#1B4965] transition-all group-hover:scale-110 group-hover:bg-[#1B4965] group-hover:text-white">
                                    {info.icon}
                                </div>
                                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-600">
                                    {info.title}
                                </h3>
                                {info.link ? (
                                    <a
                                        href={info.link}
                                        className="mb-1 block text-base font-semibold text-gray-900 transition-colors hover:text-[#1B4965]"
                                        target={info.link.startsWith('http') ? '_blank' : undefined}
                                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    >
                                        {info.details}
                                    </a>
                                ) : (
                                    <p className="mb-1 text-base font-semibold text-gray-900">{info.details}</p>
                                )}
                                <p className="text-sm text-gray-500">{info.subtext}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content: Form and Map */}
            <section className="pb-16 lg:pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Contact Form */}
                        <div>
                            <div className="mb-8">
                                <h2 className="mb-3 text-3xl font-bold text-gray-900">Request a Quote</h2>
                                <p className="text-lg text-gray-600">
                                    Fill out the form below and our team will get back to you with a customized quote within 24 hours.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-gray-700">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all focus:border-[#1B4965] focus:outline-none focus:ring-2 focus:ring-[#1B4965]/20"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all focus:border-[#1B4965] focus:outline-none focus:ring-2 focus:ring-[#1B4965]/20"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                {/* Email and Phone */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all focus:border-[#1B4965] focus:outline-none focus:ring-2 focus:ring-[#1B4965]/20"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all focus:border-[#1B4965] focus:outline-none focus:ring-2 focus:ring-[#1B4965]/20"
                                            placeholder="(555) 123-4567"
                                        />
                                    </div>
                                </div>

                                {/* Company and Freight Type */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="company" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all focus:border-[#1B4965] focus:outline-none focus:ring-2 focus:ring-[#1B4965]/20"
                                            placeholder="Your Company"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="freightType" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Freight Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="freightType"
                                            name="freightType"
                                            value={formData.freightType}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all focus:border-[#1B4965] focus:outline-none focus:ring-2 focus:ring-[#1B4965]/20"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="dry-van">Dry Van</option>
                                            <option value="refrigerated">Refrigerated</option>
                                            <option value="flatbed">Flatbed</option>
                                            <option value="step-deck">Step Deck</option>
                                            <option value="straight-truck">Straight Truck</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Pickup and Delivery Locations */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="pickupLocation" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Pickup Location <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="pickupLocation"
                                            name="pickupLocation"
                                            value={formData.pickupLocation}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all focus:border-[#1B4965] focus:outline-none focus:ring-2 focus:ring-[#1B4965]/20"
                                            placeholder="City, State or ZIP"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="deliveryLocation" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Delivery Location <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="deliveryLocation"
                                            name="deliveryLocation"
                                            value={formData.deliveryLocation}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all focus:border-[#1B4965] focus:outline-none focus:ring-2 focus:ring-[#1B4965]/20"
                                            placeholder="City, State or ZIP"
                                        />
                                    </div>
                                </div>

                                {/* Weight and Date */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="estimatedWeight" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Estimated Weight (lbs)
                                        </label>
                                        <input
                                            type="text"
                                            id="estimatedWeight"
                                            name="estimatedWeight"
                                            value={formData.estimatedWeight}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all focus:border-[#1B4965] focus:outline-none focus:ring-2 focus:ring-[#1B4965]/20"
                                            placeholder="e.g., 10,000"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="preferredDate" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Preferred Pickup Date
                                        </label>
                                        <input
                                            type="date"
                                            id="preferredDate"
                                            name="preferredDate"
                                            value={formData.preferredDate}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all focus:border-[#1B4965] focus:outline-none focus:ring-2 focus:ring-[#1B4965]/20"
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Additional Details
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-all focus:border-[#1B4965] focus:outline-none focus:ring-2 focus:ring-[#1B4965]/20"
                                        placeholder="Tell us more about your shipping needs, special requirements, or any questions you have..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={formStatus === 'submitting'}
                                        className="group relative w-full overflow-hidden rounded-lg bg-[#1B4965] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#153a52] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                                    >
                                        {formStatus === 'submitting' ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : formStatus === 'success' ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Quote Submitted!
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                Submit Quote Request
                                                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </span>
                                        )}
                                    </button>

                                    {formStatus === 'success' && (
                                        <p className="mt-3 text-sm text-green-600">
                                            Thank you! We'll contact you within 24 hours.
                                        </p>
                                    )}
                                </div>

                                {/* Privacy Note */}
                                <p className="text-sm text-gray-500">
                                    By submitting this form, you agree to our{' '}
                                    <a href="#" className="font-semibold text-[#1B4965] hover:underline">
                                        Privacy Policy
                                    </a>
                                    . We respect your privacy and will never share your information.
                                </p>
                            </form>
                        </div>

                        {/* Office Information & Map */}
                        <div className="space-y-8">
                            {/* Office Locations */}
                            <div>
                                <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Location</h2>

                                {officeLocations.map((location, index) => (
                                    <div
                                        key={index}
                                        className="mb-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg"
                                    >
                                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1B4965]/10 px-4 py-2">
                                            <svg className="h-4 w-4 text-[#1B4965]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span className="text-sm font-semibold text-[#1B4965]">{location.name}</span>
                                        </div>

                                        <h3 className="mb-2 text-xl font-bold text-gray-900">{location.region}</h3>
                                        <div className="mb-3 space-y-1 text-gray-700">
                                            <p className="font-medium">{location.address}</p>
                                            <p>{location.city}</p>
                                        </div>
                                        <p className="mb-4 text-sm text-gray-600">{location.description}</p>

                                        <a
                                            href="https://maps.google.com/?q=3733+Freedom+Dr+Charlotte+NC+28208"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B4965] transition-colors hover:text-[#153a52]"
                                        >
                                            Get Directions
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
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

                            {/* Quick Contact CTA */}
                            <div className="rounded-2xl border-2 border-[#1B4965]/20 bg-gradient-to-br from-[#1B4965]/5 to-transparent p-8">
                                <h3 className="mb-3 text-xl font-bold text-gray-900">Need Immediate Assistance?</h3>
                                <p className="mb-6 text-gray-700">
                                    Our dispatch team is available 24/7 for urgent shipping needs and time-sensitive deliveries.
                                </p>
                                <div className="space-y-3">
                                    <a
                                        href="tel:+17048199964"
                                        className="flex items-center justify-center gap-3 rounded-lg bg-[#1B4965] px-6 py-4 text-base font-semibold text-white transition-all hover:bg-[#153a52] hover:shadow-lg"
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Call (704) 819-9964
                                    </a>
                                    <a
                                        href="mailto:info@nifetransport.com"
                                        className="flex items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white px-6 py-4 text-base font-semibold text-gray-900 transition-all hover:border-[#1B4965] hover:bg-gray-50"
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send Email
                                    </a>
                                </div>
                            </div>

                            {/* Service Coverage Info */}
                            <div className="rounded-2xl bg-white border border-gray-200 p-8 shadow-lg">
                                <h3 className="mb-4 text-lg font-bold text-gray-900">Service Coverage</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1B4965]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <div>
                                            <p className="font-semibold text-gray-900">Nationwide Coverage</p>
                                            <p className="text-sm text-gray-600">All 48 contiguous United States</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1B4965]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <div>
                                            <p className="font-semibold text-gray-900">Primary Markets</p>
                                            <p className="text-sm text-gray-600">Southeast, Mid-Atlantic, Midwest regions</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1B4965]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <div>
                                            <p className="font-semibold text-gray-900">Expedited Services</p>
                                            <p className="text-sm text-gray-600">Time-critical deliveries available</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}