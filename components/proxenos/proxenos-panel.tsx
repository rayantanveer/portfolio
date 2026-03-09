"use client";

import { Send } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProxenos } from "@/components/proxenos/proxenos-context";

function ProxenosPanel() {
    const { isOpen, closeProxenos } = useProxenos();

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && closeProxenos()}>
            <SheetContent
                side="right"
                className="w-[380px] sm:w-[420px] bg-codex-black-soft border-l border-codex-cream/10 p-0 flex flex-col [&>button]:text-codex-cream-muted [&>button]:hover:text-codex-cream"
            >
                {/* Header */}
                <div className="px-6 pt-6 pb-4">
                    <SheetTitle className="font-mono text-xs tracking-[0.3em] text-codex-amber uppercase text-left">
                        Proxenos
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                        AI assistant panel for querying portfolio content
                    </SheetDescription>
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
            </SheetContent>
        </Sheet>
    );
}

export { ProxenosPanel };
