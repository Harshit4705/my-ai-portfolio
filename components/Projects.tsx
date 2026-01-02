"use client";
import React from 'react';
import { resumeData } from '@/data/resume';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from './ui/button';
import { Github, ExternalLink } from 'lucide-react';

export function Projects() {
    return (
        <section id="projects" className="py-32 relative">
            <div className="container px-4 md:px-8 max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-start gap-4 mb-16"
                >
                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gradient">Featured Projects</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">Things I've built, crafted with precision and passion.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resumeData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="glass-card rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                        >
                            <div className="aspect-video w-full bg-muted/20 relative overflow-hidden group-hover:bg-muted/30 transition-colors">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <>
                                        {/* Abstract Pattern for Placeholder */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-50" />
                                        <div className="absolute inset-0 flex items-center justify-center text-primary/20 font-black text-6xl select-none group-hover:scale-110 transition-transform duration-500">
                                            {project.title.substring(0, 2).toUpperCase()}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="p-8 flex flex-col flex-1">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <Badge key={t} variant="secondary" className="bg-secondary/50 backdrop-blur-sm border-white/5 font-normal text-xs">{t}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-muted-foreground mb-6 line-clamp-3 text-sm flex-1 leading-relaxed">{project.description}</p>

                                <div className="flex items-center gap-3 mt-auto">
                                    {project.link && (
                                        <Link href={project.link} target="_blank" className="w-full">
                                            <Button variant="outline" className="w-full gap-2 rounded-full border-white/10 hover:bg-white/5 h-10">
                                                {project.link.includes('github') ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                                                View Code
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
