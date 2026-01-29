'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ShowcaseProps {
  dict: {
    tag: string;
    title: string;
    description: string;
  };
}

const Showcase = ({ dict }: ShowcaseProps) => {
  const images = [
    {
      src: "/carl-raw-f6wVRC7Y4aI-unsplash.jpg",
      className: "md:col-span-2 md:row-span-2",
      delay: 0.1
    },
    {
      src: "/8cb72ba24912f6fc185c2ec5e97f8b3f3cce12eb.png",
      className: "md:col-span-1 md:row-span-1",
      delay: 0.2
    },
    {
      src: "/22da4f7424356bc87bde97f4481b79932f1f4954.jpg",
      className: "md:col-span-1 md:row-span-2",
      delay: 0.3
    },
    {
      src: "/1287acee185014c2f581f67f2dfd56bafea7012e.jpg",
      className: "md:col-span-1 md:row-span-1",
      delay: 0.4
    },
    {
      src: "/c4f85a9b6c6c290cf23558c8df585c3b8596d2d0.jpg",
      className: "md:col-span-2 md:row-span-1",
      delay: 0.5
    },
    {
      src: "/Greenhouse.webp",
      className: "md:col-span-2 md:row-span-1",
      delay: 0.6
    }
  ];

  return (
    <section id="showcase" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm">{dict.tag}</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            {dict.title}
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {dict.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: img.delay }}
              className={`relative overflow-hidden rounded-3xl border border-border group ${img.className} bg-muted`}
            >
              <motion.div
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: img.delay + 0.2 }}
                className="absolute inset-0 bg-muted z-10 pointer-events-none"
              />
              <Image
                src={img.src}
                alt="Showcase image"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
