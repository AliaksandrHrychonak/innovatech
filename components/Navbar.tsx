'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Leaf } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Navbar = ({ lang, dict }: { lang: string, dict: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: dict.solutions, href: '#solutions' },
    { name: dict.innovation, href: '#innovation' },
    { name: dict.impact, href: '#impact' },
    { name: dict.contact, href: '#contact' },
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'kk', label: 'KK' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg text-primary-foreground group-hover:rotate-12 transition-transform">
              <Leaf size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Innova<span className="text-primary">Tech</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-3 border-l border-border pl-6 ml-2">
              <ThemeToggle />
              <div className="flex items-center gap-1.5">
                {languages.map((l) => (
                  <Link
                    key={l.code}
                    href={`/${l.code}`}
                    className={`text-xs font-bold px-2 py-1 rounded ${lang === l.code ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="#contact"
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-sm"
            >
              {dict.getQuote}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border py-6 px-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-foreground py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center justify-between py-4 border-y border-border">
              <div className="flex items-center gap-4">
                {languages.map((l) => (
                  <Link
                    key={l.code}
                    href={`/${l.code}`}
                    className={`text-sm font-bold px-3 py-2 rounded-lg ${lang === l.code ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <ThemeToggle />
            </div>

            <Link
              href="#contact"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-center font-semibold mt-2"
              onClick={() => setIsOpen(false)}
            >
              {dict.getQuote}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
