'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Filter, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  location: string;
  lat: number;
  lng: number;
  area: string;
  type: string;
  year: string;
  image: string;
  description: string;
}

const ProjectsMap = ({ dict }: { dict: any }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Sample projects data - replace with real data
  const projects: Project[] = [
    {
      id: 1,
      title: 'Промышленный комплекс',
      location: 'Московская область, РФ',
      lat: 55.75,
      lng: 37.62,
      area: '15 Га',
      type: 'industrial',
      year: '2023',
      image: '/carl-raw-f6wVRC7Y4aI-unsplash.jpg',
      description: 'Крупный тепличный комплекс с полной автоматизацией',
    },
    {
      id: 2,
      title: 'Фермерское хозяйство',
      location: 'Минская область, BY',
      lat: 53.90,
      lng: 27.56,
      area: '3.5 Га',
      type: 'farm',
      year: '2022',
      image: '/8cb72ba24912f6fc185c2ec5e97f8b3f3cce12eb.png',
      description: 'Экологичное фермерское хозяйство',
    },
    {
      id: 3,
      title: 'Рассадный комплекс',
      location: 'Алматы, KZ',
      lat: 43.24,
      lng: 76.92,
      area: '8 Га',
      type: 'seedling',
      year: '2023',
      image: '/22da4f7424356bc87bde97f4481b79932f1f4954.jpg',
      description: 'Специализированный рассадный комплекс',
    },
    {
      id: 4,
      title: 'Салатная линия',
      location: 'Санкт-Петербург, РФ',
      lat: 59.93,
      lng: 30.36,
      area: '2 Га',
      type: 'industrial',
      year: '2021',
      image: '/1287acee185014c2f581f67f2dfd56bafea7012e.jpg',
      description: 'Высокотехнологичное производство салатов',
    },
  ];

  const projectTypes = [
    { id: 'all', label: dict.all || 'Все проекты', color: 'bg-primary' },
    { id: 'industrial', label: dict.industrial || 'Промышленные', color: 'bg-blue-500' },
    { id: 'farm', label: dict.farm || 'Фермерские', color: 'bg-green-500' },
    { id: 'seedling', label: dict.seedling || 'Рассадные', color: 'bg-amber-500' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.type === filter);

  return (
    <>
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-primary text-sm font-semibold">
              <MapPin className="w-4 h-4" />
              {dict.tag}
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {dict.title}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              {dict.description}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {projectTypes.map((type) => (
              <Button
                key={type.id}
                onClick={() => setFilter(type.id)}
                variant={filter === type.id ? 'default' : 'outline'}
                className="rounded-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                {type.label}
              </Button>
            ))}
          </div>

          {/* Map Visualization */}
          <div className="max-w-6xl mx-auto mb-12">
            <Card className="overflow-hidden border shadow-sm">
              <CardContent className="p-0">
                <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

                  {/* Professional grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, currentColor 1px, transparent 1px),
                        linear-gradient(to bottom, currentColor 1px, transparent 1px)
                      `,
                      backgroundSize: '60px 60px'
                    }}
                  />

                  {/* Subtle connection lines between projects */}
                  <svg className="absolute inset-0 w-full h-full opacity-[0.15] dark:opacity-[0.25] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="connectionLine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                        <stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="20%" y1="35%" x2="35%" y2="30%" stroke="url(#connectionLine)" strokeWidth="1.5" className="text-primary"/>
                    <line x1="35%" y1="30%" x2="70%" y2="55%" stroke="url(#connectionLine)" strokeWidth="1.5" className="text-primary"/>
                    <line x1="30%" y1="20%" x2="35%" y2="30%" stroke="url(#connectionLine)" strokeWidth="1.5" className="text-primary"/>
                  </svg>

                  {/* Project markers with better positioning */}
                  {filteredProjects.map((project, index) => {
                    // Better positioning logic for CIS region
                    let position = { x: 50, y: 50 };

                    if (project.location.includes('Москов')) {
                      position = { x: 35, y: 30 };
                    } else if (project.location.includes('Минск')) {
                      position = { x: 20, y: 35 };
                    } else if (project.location.includes('Алматы')) {
                      position = { x: 70, y: 55 };
                    } else if (project.location.includes('Санкт-Петербург')) {
                      position = { x: 30, y: 20 };
                    }

                    return (
                      <motion.div
                        key={project.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
                        className="absolute cursor-pointer group z-10"
                        style={{ left: `${position.x}%`, top: `${position.y}%` }}
                        onClick={() => setSelectedProject(project)}
                      >
                        {/* Subtle pulse rings */}
                        <div className="absolute inset-0 w-10 h-10 -translate-x-1 -translate-y-1">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-20 animate-ping" style={{ animationDuration: '3s' }}></span>
                        </div>

                        <div className="relative">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-all duration-300 border-2 border-background">
                            <MapPin className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg z-20">
                            <p className="text-xs font-semibold text-foreground">{project.title}</p>
                            <p className="text-xs text-muted-foreground">{project.location}</p>
                            <p className="text-xs text-primary font-medium mt-1">{project.area}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Minimalist Legend */}
                  <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md border border-border/50 rounded-xl px-4 py-3 shadow-sm">
                    <p className="text-xs font-medium mb-1.5 text-foreground/80">{dict.mapNote || 'География СНГ'}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="font-medium">{filteredProjects.length} {dict.all || 'проектов'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer"
              >
                <Card className="h-full hover:border-primary/50 hover:shadow-xl transition-all group overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 right-3">{project.year}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                      <div className="text-sm font-bold text-foreground">
                        {project.area}
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-3xl max-w-2xl w-full relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 w-full">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-4 left-4">{selectedProject.year}</Badge>
              </div>

              <div className="p-8 space-y-4">
                <h3 className="text-3xl font-bold text-foreground">
                  {selectedProject.title}
                </h3>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedProject.location}
                  </div>
                  <Badge variant="outline">{selectedProject.area}</Badge>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.description}
                </p>

                <Button className="w-full rounded-2xl">
                  {dict.viewDetails || 'Подробнее о проекте'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsMap;
