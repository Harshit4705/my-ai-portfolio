import React from 'react';
import { resumeData } from '@/data/resume';

export function Footer() {
    return (
        <footer className="py-6 md:py-8 border-t border-border/40">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-6">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by <span className="font-semibold text-foreground">{resumeData.name}</span>.
                    The source code is available on <a href={resumeData.links.github} target="_blank" className="font-medium underline underline-offset-4">GitHub</a>.
                </p>
            </div>
        </footer>
    );
}
