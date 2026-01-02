"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { resumeData } from '@/data/resume';
import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Connect", href: "#contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={cn(
            "sticky top-0 z-50 w-full border-b transition-all duration-300",
            scrolled
                ? "bg-background/80 backdrop-blur-md border-border/40 shadow-sm"
                : "bg-transparent border-transparent"
        )}>
            <div className="container flex h-16 max-w-7xl items-center justify-between px-4 md:px-8 mx-auto">
                {/* Left Side: Logo & Main Nav */}
                <div className="flex items-center gap-8 lg:gap-12">
                    <Link href="/" className="flex items-center space-x-2 font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity whitespace-nowrap">
                        <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                            {resumeData.name}
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "transition-colors hover:text-primary text-muted-foreground relative group py-2"
                                )}
                            >
                                {item.name}
                                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right Side: Social, Contact, Toggle, Mobile Menu */}
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="hidden lg:flex items-center gap-6 mr-2">
                        <Link href={resumeData.links.linkedin} target="_blank" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            LinkedIn
                        </Link>
                        <Link href={resumeData.links.github} target="_blank" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                            GitHub
                        </Link>
                    </div>

                    <Link href="#contact" className="hidden md:inline-flex">
                        <button className="inline-flex h-10 items-center justify-center rounded-full bg-foreground text-background px-6 text-sm font-medium shadow-md transition-all hover:bg-foreground/90 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                            Contact Me
                        </button>
                    </Link>

                    <ModeToggle />

                    {/* Mobile Menu Button */}
                    <button
                        className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {
                isOpen && (
                    <div className="container md:hidden pb-4 bg-background/95 backdrop-blur-md border-b border-border/40 absolute top-full left-0 w-full animate-in slide-in-from-top-2">
                        <nav className="flex flex-col space-y-4 mt-4 px-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-foreground/80 font-medium transition-colors hover:text-primary py-2 block border-b border-border/10"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )
            }
        </header >
    );
}
