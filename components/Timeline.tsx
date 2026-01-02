"use client";
import React from 'react';
import { resumeData } from '@/data/resume';
import { motion } from 'framer-motion';

export function Timeline() {
    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            {/* Background blobs for depth */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none opacity-30" />

            <div className="container px-4 md:px-8 max-w-7xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Experience Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-start gap-4 mb-10"
                        >
                            <h2 className="text-3xl font-bold tracking-tight text-gradient">Experience</h2>
                        </motion.div>

                        <div className="relative border-l border-white/10 ml-3 space-y-12">
                            {resumeData.experience.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative pl-8 md:pl-10"
                                >
                                    <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                    <div className="flex flex-col gap-3 p-5 rounded-xl transition-colors hover:bg-white/5 border border-transparent hover:border-white/5">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                            <h3 className="text-xl font-bold">{item.role}</h3>
                                            <span className="text-xs font-mono bg-secondary/50 px-2 py-1 rounded text-primary/80 border border-white/5">{item.date}</span>
                                        </div>
                                        <h4 className="text-base font-medium text-muted-foreground">{item.company}</h4>
                                        <ul className="list-disc list-outside ml-4 text-muted-foreground/80 space-y-2 text-sm leading-relaxed">
                                            {item.description.map((desc, i) => (
                                                <li key={i}>{desc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-start gap-4 mb-10"
                        >
                            <h2 className="text-3xl font-bold tracking-tight text-gradient">Education</h2>
                        </motion.div>

                        <div className="relative border-l border-white/10 ml-3 space-y-12">
                            {resumeData.education.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative pl-8 md:pl-10"
                                >
                                    <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-muted-foreground ring-4 ring-background" />
                                    <div className="flex flex-col gap-3 p-5 rounded-xl transition-colors hover:bg-white/5 border border-transparent hover:border-white/5">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                            <h3 className="text-xl font-bold">{item.school}</h3>
                                            <span className="text-xs font-mono bg-secondary/50 px-2 py-1 rounded text-muted-foreground border border-white/5">{item.date}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-base text-primary/90">{item.degree}</h4>
                                            <span className="text-sm text-muted-foreground font-medium">{item.score}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
