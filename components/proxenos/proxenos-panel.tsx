"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProxenos } from "@/components/proxenos/proxenos-context";

function ProxenosPanel() {
    const { isOpen, closeProxenos } = useProxenos();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop — click anywhere outside panel to close (both mobile + desktop) */}
                    <motion.div
                        key="proxenos-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeProxenos}
                        className="fixed inset-0 z-30 bg-codex-black/40"
                        aria-hidden="true"
                    />

                    {/* Panel:
                        - Mobile:  full width, starts below navbar (top-16), full remaining height
                        - Desktop: fixed-width sidebar from top-0 to bottom-0
                    */}
                    <motion.aside
                        key="proxenos-panel"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 35 }}
                        className="
                            fixed right-0 z-40 flex flex-col
                            bg-codex-black-soft border-l border-codex-cream/10
                            top-16 bottom-0 w-full
                            md:top-0 md:h-full md:w-[420px]
                        "
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 pt-6 pb-4">
                            <span className="font-mono text-xs tracking-[0.3em] text-codex-amber uppercase">
                                Proxenos
                            </span>
                            <button
                                type="button"
                                onClick={closeProxenos}
                                aria-label="Close Proxenos"
                                className="text-codex-cream-muted hover:text-codex-cream transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="border-b border-codex-cream/10" />

                        {/* Main area — empty state */}
                        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
                            <div className="w-2 h-2 rounded-full bg-codex-amber animate-pulse" />
                            <p className="font-mono text-xs text-codex-cream-muted text-center">
                                Proxenos is being prepared.
                            </p>
                            <p className="font-mono text-xs text-codex-cream/30 text-center">
                                RAG pipeline coming in the next build.
                            </p>
                        </div>

                        {/* Input row — disabled */}
                        <div className="px-4 py-4 border-t border-codex-cream/10 flex items-center gap-2">
                            <Input
                                placeholder="Ask about my work..."
                                disabled
                                className="flex-1 bg-codex-black border-codex-cream/10 text-codex-cream placeholder:text-codex-cream-muted/50 font-mono text-sm opacity-50"
                            />
                            <Button
                                size="icon"
                                disabled
                                className="bg-codex-amber text-codex-black opacity-50"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}

export { ProxenosPanel };
