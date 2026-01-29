import React from 'react';
import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = ({ dict }: { dict: any }) => {
  return (
    <footer id="contact" className="bg-zinc-950 text-zinc-400 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-lg text-primary-foreground group-hover:rotate-12 transition-transform">
                <Leaf size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Innova<span className="text-primary">Tech</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              {dict.description}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Linkedin size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Instagram size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{dict.solutions}</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Industrial Complexes</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Smart Farming</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Eco-Residential</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Modernization</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Agri-Consulting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{dict.quickLinks}</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Innovation Hub</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Projects Map</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Press Kit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{dict.contact}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary flex-shrink-0" />
                <span>123 Innovation Drive, Tech District, Astana, Kazakhstan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span>+7 (717) 123-45-67</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span>hello@innovatech.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest font-medium">
          <p>© 2026 InnovaTech Greenhouse Systems. {dict.rights}</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">{dict.privacy}</Link>
            <Link href="#" className="hover:text-white transition-colors">{dict.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
