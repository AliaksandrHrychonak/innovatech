import React from 'react';
import { Globe2, Users2, Award, Building2 } from 'lucide-react';

const Impact = ({ dict }: { dict: any }) => {
  const statIcons = [
    <Globe2 key="globe" className="w-5 h-5" />,
    <Users2 key="users" className="w-5 h-5" />,
    <Award key="award" className="w-5 h-5" />,
    <Building2 key="building" className="w-5 h-5" />,
  ];

  const stats = dict.stats.map((s: any, i: number) => ({
    ...s,
    icon: statIcons[i]
  }));

  return (
    <section id="impact" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-32" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-primary-foreground/80 font-bold tracking-wider uppercase text-sm mb-4">{dict.tag}</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {dict.title}
          </h3>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            {dict.description}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s: any, i: number) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 p-8 rounded-3xl group hover:bg-white/20 transition-all">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <div className="text-4xl font-bold mb-2">{s.value}</div>
              <div className="text-primary-foreground/60 font-medium uppercase tracking-wider text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-white/10 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           {/* Placeholder for partner logos */}
           <span className="text-2xl font-bold italic tracking-tighter">PARTNER ONE</span>
           <span className="text-2xl font-bold italic tracking-tighter">GLOBAL AGRI</span>
           <span className="text-2xl font-bold italic tracking-tighter">TECH SYSTEMS</span>
           <span className="text-2xl font-bold italic tracking-tighter">CIS LOGISTICS</span>
           <span className="text-2xl font-bold italic tracking-tighter">NATURE PLUS</span>
        </div>
      </div>
    </section>
  );
};

export default Impact;
