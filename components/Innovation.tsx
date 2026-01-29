import React from 'react';
import { Cpu, Droplets, Sun, Thermometer } from 'lucide-react';

const Innovation = ({ dict }: { dict: any }) => {
  const featureIcons = [
    <Cpu key="cpu" className="w-6 h-6" />,
    <Sun key="sun" className="w-6 h-6" />,
    <Droplets key="droplets" className="w-6 h-6" />,
    <Thermometer key="thermometer" className="w-6 h-6" />,
  ];

  const features = dict.features.map((f: any, i: number) => ({
    ...f,
    icon: featureIcons[i]
  }));

  return (
    <section id="innovation" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-primary font-bold tracking-wider uppercase text-sm">{dict.tag}</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
                  {dict.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {dict.description}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {features.map((f: any, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{f.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all group">
                {dict.whitepaper}
                <span className="w-8 h-px bg-primary group-hover:w-12 transition-all" />
              </button>
            </div>
          </div>

          <div className="lg:pl-12">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="aspect-[4/5] bg-muted rounded-3xl overflow-hidden shadow-lg border-2 border-border relative group">
                   <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                   <div className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">{dict.labels.automation}</div>
                </div>
                <div className="aspect-square bg-muted rounded-3xl overflow-hidden shadow-lg border-2 border-border relative group">
                   <div className="absolute inset-0 bg-green-900/5 group-hover:bg-transparent transition-colors" />
                   <div className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">{dict.labels.sustainability}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-3xl overflow-hidden shadow-lg border-2 border-border relative group">
                   <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-colors" />
                   <div className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">{dict.labels.hydraulics}</div>
                </div>
                <div className="aspect-[4/5] bg-muted rounded-3xl overflow-hidden shadow-lg border-2 border-border relative group">
                   <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
                   <div className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">{dict.labels.integration}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovation;
