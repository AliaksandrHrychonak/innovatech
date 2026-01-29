'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, motion, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Factory, LayoutGrid, Home } from 'lucide-react';

import Greenhouse3D from './Greenhouse3D';

interface ProductData {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  stats: { label: string; value: string }[];
  color: string;
}

const Hero = ({ dict }: { dict: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const productMeta = [
    { icon: <Zap className="text-primary" />, color: "#16a34a" },
    { icon: <Factory className="text-primary" />, color: "#2563eb" },
    { icon: <LayoutGrid className="text-primary" />, color: "#059669" },
    { icon: <Home className="text-primary" />, color: "#d97706" }
  ];

  const products = dict.products.map((p: any, i: number) => ({
    ...p,
    ...productMeta[i]
  }));
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setScrollProgress(latest);
      const index = Math.min(
        Math.floor(latest * products.length),
        products.length - 1
      );
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, currentIndex, products.length]);


  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -z-10" />
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-primary text-sm font-semibold w-fit">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    {products[currentIndex].subtitle}
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                      {products[currentIndex].title.split(' ')[0]} <br />
                      <span className="text-primary italic">
                        {products[currentIndex].title.split(' ').slice(1).join(' ')}
                      </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                      {products[currentIndex].description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 group">
                      {dict.exploreSolutions}
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                    {products[currentIndex].stats.map((stat: any, i: number) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden">
                <Greenhouse3D 
                  progress={scrollProgress} 
                  color={products[currentIndex].color} 
                />
                
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 left-8 bg-background/90 backdrop-blur px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-border"
                >
                  <div className="bg-primary/20 p-2 rounded-lg text-primary">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{dict.quality}</span>
                    <span className="text-sm font-bold text-foreground">{dict.euStandards}</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-12 right-8 bg-background/90 backdrop-blur px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-border"
                >
                  <div className="bg-primary/20 p-2 rounded-lg text-primary">
                    <Zap size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{dict.innovation}</span>
                    <span className="text-sm font-bold text-foreground">{dict.aiDriven}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
