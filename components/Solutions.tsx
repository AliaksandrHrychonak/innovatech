import React from 'react';
import { LayoutGrid, Factory, Home, Settings, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const Solutions = ({ dict }: { dict: any }) => {
  const solutionMeta = [
    { icon: <Factory className="w-8 h-8" />, link: '/solutions/industrial', color: 'bg-primary/10 text-primary' },
    { icon: <LayoutGrid className="w-8 h-8" />, link: '/solutions/smart-farming', color: 'bg-primary/10 text-primary' },
    { icon: <Home className="w-8 h-8" />, link: '/solutions/residential', color: 'bg-primary/10 text-primary' },
    { icon: <Settings className="w-8 h-8" />, link: '/solutions/support', color: 'bg-primary/10 text-primary' },
  ];

  const solutions = dict.items.map((item: any, i: number) => ({
    ...item,
    ...solutionMeta[i]
  }));

  return (
    <section id="solutions" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm">{dict.tag}</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {dict.title}
            </h3>
          </div>
          <p className="text-muted-foreground text-lg max-w-md">
            {dict.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item: any, index: number) => (
            <Link 
              key={index} 
              href={item.link}
              className="group bg-card p-8 rounded-3xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col h-full"
            >
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                {item.title}
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
              </h4>
              <p className="text-muted-foreground leading-relaxed flex-grow">
                {item.description}
              </p>
              <div className="mt-6 pt-6 border-t border-border flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                {dict.learnMore}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
