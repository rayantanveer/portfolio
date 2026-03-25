"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Nav, NAV_LINKS } from "@/components/layout/nav";

function Header() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-codex-black/80 backdrop-blur-sm border-b border-codex-cream/5">
            <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
                {/* Left — Developer name */}
                <Link
                    href="/"
                    className="font-serif text-codex-cream text-lg tracking-wide"
                >
                    Rayan Tanveer
                </Link>

                {/* Center — Desktop nav */}
                <Nav />

                {/* Right — Mobile hamburger only */}
                <div className="flex items-center md:hidden">
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <button
                                type="button"
                                className="flex items-center justify-center h-8 w-8 text-codex-cream-muted hover:text-codex-cream transition-colors"
                                aria-label="Open navigation menu"
                            >
                                <Menu className="h-5 w-5" />
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="bg-codex-black border-codex-cream/10 w-[280px]"
                        >
                            <SheetTitle className="font-serif text-codex-cream text-lg mb-8">
                                Navigation
                            </SheetTitle>
                            <nav className="flex flex-col gap-6">
                                {NAV_LINKS.map((link) => {
                                    const isActive =
                                        pathname === link.href ||
                                        pathname.startsWith(`${link.href}/`);
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={cn(
                                                "font-mono text-sm transition-colors",
                                                isActive
                                                    ? "text-codex-amber"
                                                    : "text-codex-cream-muted hover:text-codex-cream"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

export { Header };
