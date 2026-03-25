"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useProxenos } from "@/components/proxenos/proxenos-context";

function ProxenosTrigger() {
    const { isOpen, openProxenos } = useProxenos();

    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.button
                    type="button"
                    onClick={openProxenos}
                    aria-label="Open Proxenos assistant"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.08 }}
                    className="fixed bottom-6 right-6 z-40 group"
                >
                    {/* Outer glow ring */}
                    <span className="absolute inset-0 rounded-full bg-codex-amber/20 animate-ping" />
                    {/* Orb */}
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-codex-amber shadow-lg shadow-codex-amber/20">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-codex-black font-semibold uppercase">
                            ASK
                        </span>
                    </span>
                    {/* Tooltip */}
                    <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap bg-codex-black-soft border border-codex-cream/10 rounded-sm px-3 py-1.5 font-mono text-xs text-codex-cream opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        Ask Proxenos
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}

export { ProxenosTrigger };
