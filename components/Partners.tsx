'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const Partners = ({ dict }: { dict: any }) => {
  return (
    <section id="partners" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-primary text-sm font-semibold mb-6">
            <Award className="w-4 h-4" />
            {dict.tag}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {dict.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {dict.description}
          </p>
        </div>

        {/* Scientific Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">{dict.scientificPartnersTitle}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dict.scientificPartners.map((partner: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:scale-110 transition-transform">
                    {partner.abbreviation}
                  </div>
                  {partner.url && (
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <h4 className="font-semibold text-sm leading-snug mb-2">{partner.name}</h4>
                <p className="text-xs text-muted-foreground">{partner.country}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Association Membership */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{dict.associationTitle}</h3>
            <p className="text-muted-foreground text-lg mb-8">{dict.associationDescription}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {dict.associations.map((assoc: any, index: number) => (
                <div
                  key={index}
                  className="bg-background border border-border rounded-xl px-6 py-3 font-semibold hover:border-primary/50 transition-all"
                >
                  {assoc.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
