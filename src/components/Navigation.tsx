'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/photography', label: 'Photography' },
    { href: '/postcards', label: 'Postcards' },
    { href: '/projects', label: 'Projects' },
  ];

  return (
    <nav className="bg-[#201d19] border-b border-[#6b5d52] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Home Link */}
          <Link
            href="/"
            className="text-2xl font-bold text-[#d4a574] hover:text-[#e8c8a0] transition-colors"
          >
            ARD
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#e8e4df] hover:text-[#d4a574] transition-colors font-medium text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-[#d4a574] transition-all ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#d4a574] transition-all ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#d4a574] transition-all ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4 pb-4 border-t border-[#6b5d52] pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#e8e4df] hover:text-[#d4a574] transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
