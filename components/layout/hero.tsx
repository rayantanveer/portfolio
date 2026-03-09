"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useProxenos } from "@/components/proxenos/proxenos-context";

interface HeroProps {
    name: string;
    title: string;
    shortBio: string;
}

function Hero({ name, title, shortBio }: HeroProps) {
    const containerRef = useRef<HTMLElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const { openProxenos } = useProxenos();

    const backgroundImage = useTransform(
        [mouseX, mouseY],
        ([x, y]) =>
            `radial-gradient(600px at ${x}px ${y}px, rgba(232,168,62,0.06), transparent 80%)`
    );

    function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex flex-col justify-center px-6"
        >
            {/* Cursor bloom overlay */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0"
                style={{ backgroundImage }}
            />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl w-full">
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-codex-cream">
                    {name}
                </h1>
                <p className="font-mono text-sm text-codex-amber tracking-widest uppercase mt-4">
                    {title}
                </p>
                <p className="text-codex-cream-muted max-w-md mt-4 leading-relaxed">
                    {shortBio}
                </p>
                <div className="flex items-center gap-4 mt-8">
                    <Button
                        asChild
                        className="bg-codex-amber text-codex-black font-mono text-sm font-semibold hover:bg-codex-amber/90"
                    >
                        <Link href="/projects">View Work</Link>
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={openProxenos}
                        className="font-mono text-sm text-codex-cream-muted hover:text-codex-cream"
                    >
                        Ask Proxenos
                    </Button>
                </div>
            </div>
        </section>
    );
}

export { Hero };
