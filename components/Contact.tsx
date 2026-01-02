"use client";
import React from 'react';
import { resumeData } from '@/data/resume';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Link from 'next/link';
import { Mail, Linkedin, Github, ExternalLink, FileText, MapPin, Phone } from 'lucide-react';

export function Contact() {
    return (
        <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-background">
            <div className="container px-4 md:px-8 max-w-7xl mx-auto relative z-10">
                <div className="mb-12">
                    <h2 className="text-4xl font-bold tracking-tight mb-4 text-gradient">Let's Connect</h2>
                    <p className="text-muted-foreground text-lg">Have an opportunity or want to collaborate? I'd love to hear from you.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {/* Resume Card */}
                    <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <FileText className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Resume</h3>
                                <p className="text-sm text-muted-foreground">Download my latest resume</p>
                            </div>
                        </div>
                        <a href="/resume.pdf" download="Harshit_Chawla_Resume.pdf" className="w-full">
                            <Button variant="outline" className="w-full rounded-full h-11 border-border/50 hover:bg-primary hover:text-primary-foreground">
                                Download Resume
                            </Button>
                        </a>
                    </div>

                    {/* LinkedIn Card */}
                    <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="h-10 w-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                <Linkedin className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">LinkedIn</h3>
                                <p className="text-sm text-muted-foreground">Professional network</p>
                            </div>
                        </div>
                        <Link href={resumeData.links.linkedin} target="_blank" className="w-full">
                            <Button variant="outline" className="w-full rounded-full h-11 border-border/50 hover:bg-blue-600 hover:text-white hover:border-blue-600">
                                Connect on LinkedIn
                            </Button>
                        </Link>
                    </div>

                    {/* GitHub Card */}
                    <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="h-10 w-10 bg-gray-500/10 rounded-full flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                                <Github className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">GitHub</h3>
                                <p className="text-sm text-muted-foreground">Code & projects</p>
                            </div>
                        </div>
                        <Link href={resumeData.links.github} target="_blank" className="w-full">
                            <Button variant="outline" className="w-full rounded-full h-11 border-border/50 hover:bg-foreground hover:text-background hover:border-foreground">
                                View GitHub
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Contact Details Row */}
                <div className="flex flex-col items-center">
                    <h3 className="text-2xl font-bold mb-8">Contact Details</h3>
                    <div className="bg-card border border-border/50 rounded-full py-4 px-8 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full max-w-4xl justify-center">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <MapPin className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">{resumeData.location}</span>
                        </div>

                        <div className="w-px h-8 bg-border hidden md:block" />

                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                                <Mail className="h-4 w-4" />
                            </div>
                            <a href={`mailto:${resumeData.email}`} className="text-sm font-medium hover:text-primary transition-colors">{resumeData.email}</a>
                        </div>

                        <div className="w-px h-8 bg-border hidden md:block" />

                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
                                <Phone className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-medium">{resumeData.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
