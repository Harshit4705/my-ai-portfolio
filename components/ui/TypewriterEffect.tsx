"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const TypewriterEffect = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text.charAt(index));
                setIndex((prev) => prev + 1);
            }, 30); // Speed of typing
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <span className="text-xl text-muted-foreground md:text-2xl max-w-[600px] font-light leading-relaxed">
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[2px] h-[1em] bg-primary align-middle ml-1"
            />
        </span>
    );
};
