"use client";

import React from 'react';
import Image from 'next/image';

const technologies = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'LangChain', icon: '/langchain.png' },
    { name: 'Hugging Face', icon: '/huggingface.png' },
    { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
];

export function TechStack() {
    return (
        <section className="py-24 relative overflow-hidden bg-background/50">
            <div className="container px-4 md:px-8 max-w-7xl mx-auto mb-12">
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-gradient">Tech Stack</h2>
                <p className="text-muted-foreground text-lg">Tools and technologies I use to build intelligent systems.</p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex gap-8 py-4">
                    {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-border/50 shadow-sm min-w-[140px] hover:border-primary/50 transition-colors"
                        >
                            <div className="h-16 w-16 relative flex items-center justify-center">
                                <Image
                                    src={tech.icon}
                                    alt={tech.name}
                                    width={64}
                                    height={64}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <span className="font-medium text-sm text-foreground/80">{tech.name}</span>
                        </div>
                    ))}
                </div>

                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />
            </div>
        </section>
    );
}
