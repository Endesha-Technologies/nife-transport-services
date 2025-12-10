'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Fleet', href: '/fleet' },
  { name: 'Coverage Areas', href: '/coverage-areas' },
  { name: 'Contact Us', href: '/contact-us' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  // Check if we're on the home page
  const isHomePage = pathname === '/';

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Determine if header should be transparent or solid
  const isTransparent = isHomePage && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent' 
          : 'bg-white shadow-lg border-b border-gray-100'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between lg:h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="group flex items-center space-x-3 transition-all duration-300"
              aria-label="NIFE Transport Services - Home"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 lg:h-14 lg:w-14 ${
                isTransparent
                  ? 'bg-white/10 backdrop-blur-md border-2 border-white/20' 
                  : 'bg-[#1B4965] shadow-md'
              }`}>
                <span className="text-2xl font-bold text-white lg:text-3xl">N</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold leading-tight transition-colors duration-300 lg:text-2xl ${
                  isTransparent ? 'text-white' : 'text-gray-900'
                }`}>
                  NIFE Transport
                </span>
                <span className={`text-sm font-medium transition-colors duration-300 lg:text-base ${
                  isTransparent ? 'text-white/90' : 'text-[#1B4965]'
                }`}>
                  Services LLC
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative px-4 py-2.5 text-sm font-semibold transition-all duration-300 lg:px-5 lg:text-base ${
                  isActive(item.href)
                    ? isTransparent
                      ? 'text-white'
                      : 'text-[#1B4965]'
                    : isTransparent
                      ? 'text-white/80 hover:text-white'
                      : 'text-gray-700 hover:text-[#1B4965]'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                <span className="relative z-10">{item.name}</span>
                {/* Hover background effect */}
                <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                  isTransparent
                    ? 'bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100'
                    : 'bg-gray-100 opacity-0 group-hover:opacity-100'
                }`} aria-hidden="true" />
                {/* Active indicator */}
                {isActive(item.href) && (
                  <span className={`absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full transition-all duration-300 ${
                    isTransparent ? 'bg-white' : 'bg-[#1B4965]'
                  }`} aria-hidden="true" />
                )}
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link
              href="/contact-us"
              className={`ml-4 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-300 lg:text-base ${
                isTransparent
                  ? 'bg-white text-[#1B4965] shadow-lg hover:bg-white/90 hover:shadow-xl'
                  : 'bg-[#1B4965] text-white shadow-md hover:bg-[#153a52] hover:shadow-lg'
              }`}
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-lg p-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 md:hidden ${
              isTransparent
                ? 'text-white hover:bg-white/10 backdrop-blur-sm focus:ring-white'
                : 'text-gray-700 hover:bg-gray-100 focus:ring-[#1B4965]'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {/* Animated Hamburger Icon - Larger and more visible */}
            <div className="relative h-7 w-7">
              <span className={`absolute left-0 top-1.5 h-1 w-7 transform rounded-full transition-all duration-300 ${
                isTransparent ? 'bg-white' : 'bg-gray-700'
              } ${isMenuOpen ? 'top-3 rotate-45' : ''}`} />
              <span className={`absolute left-0 top-3 h-1 w-7 rounded-full transition-all duration-300 ${
                isTransparent ? 'bg-white' : 'bg-gray-700'
              } ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 top-4.5 h-1 w-7 transform rounded-full transition-all duration-300 ${
                isTransparent ? 'bg-white' : 'bg-gray-700'
              } ${isMenuOpen ? 'top-3 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="fixed inset-0 top-20 bg-black/40 backdrop-blur-sm" 
            aria-hidden="true" 
            onClick={() => setIsMenuOpen(false)} 
          />
          <div className="fixed left-0 right-0 top-20 bg-white shadow-2xl">
            <div className="space-y-1 px-4 pb-6 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-lg px-4 py-3.5 text-base font-semibold transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-[#1B4965] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#1B4965]'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile CTA Button */}
              <Link
                href="/contact-us"
                className="mt-4 block rounded-lg bg-[#1B4965] px-4 py-3.5 text-center text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#153a52] hover:shadow-lg"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
