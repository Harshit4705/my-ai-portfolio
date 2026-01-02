"use client";
import React from 'react';
import { resumeData } from '@/data/resume';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { TypewriterEffect } from '@/components/ui/TypewriterEffect';
import { Zap, Code, Terminal, Cpu, BrainCircuit, Bot, Search, Network } from 'lucide-react';

export function Hero() {
    return (
        <section className="py-20 md:py-32 lg:py-40 flex flex-col justify-center min-h-[90vh] relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen" />

            <div className="container px-4 md:px-8 relative z-10 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Text */}
                    <div className="flex flex-col items-start gap-6 text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm font-medium border-primary/20 bg-primary/10 text-primary rounded-full">
                                {resumeData.title}
                            </Badge>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]"
                        >
                            {resumeData.name}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <TypewriterEffect text="A passionate AI/ML Engineer building intelligent systems with next-gen LLMs & Agents." />
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-base text-muted-foreground/80 max-w-[500px]"
                        >
                            {resumeData.summary.substring(0, 150)}...
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 mt-4"
                        >
                            <Link href="#contact">
                                <Button size="lg" className="rounded-full h-12 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                                    Contact Me
                                </Button>
                            </Link>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground px-4">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span>Available for new projects</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Image/Visuals */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative block mt-12 lg:mt-0"
                    >
                        <div className="relative w-full aspect-square max-w-[500px] ml-auto">
                            {/* Background blob/glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-purple-600/30 rounded-full blur-[80px]" />

                            <div className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl group">
                                {/* User Image */}
                                <img
                                    src="/me.jpg"
                                    alt="Harshit Chawla"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Overlay Gradient for text readability if needed, though mostly relying on stickers */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating Cards (Stickers) - Positioned around the image */}

                            {/* Top Right Sticker */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -right-6 top-10 z-20 bg-background/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl flex items-center gap-3 animate-float"
                            >
                                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-500">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium">Focus</p>
                                    <p className="text-sm font-bold">AI Agents</p>
                                </div>
                            </motion.div>

                            {/* Bottom Left Sticker */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="absolute -left-6 bottom-20 z-20 bg-background/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl flex items-center gap-3 animate-float-delayed"
                            >
                                <div className="bg-purple-500/20 p-2 rounded-lg text-purple-500">
                                    <BrainCircuit className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium">Expertise</p>
                                    <p className="text-sm font-bold">Deep Learning</p>
                                </div>
                            </motion.div>

                            {/* Bottom Right Sticker */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="absolute -right-2 bottom-6 z-20 bg-background/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl animate-bounce-slow"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="flex -space-x-2">
                                        <div className="h-6 w-6 rounded-full bg-red-500 border-2 border-background flex items-center justify-center text-[8px] text-white">Py</div>
                                        <div className="h-6 w-6 rounded-full bg-yellow-500 border-2 border-background flex items-center justify-center text-[8px] text-white">JS</div>
                                        <div className="h-6 w-6 rounded-full bg-green-500 border-2 border-background flex items-center justify-center text-[8px] text-white">AI</div>
                                    </div>
                                    <span className="text-xs font-bold ml-1">Stack</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section >
    );
}
