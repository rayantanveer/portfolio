"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { label: "Projects", href: "/projects" },
    { label: "Stack", href: "/stack" },
];

interface NavProps {
    className?: string;
}

function Nav({ className }: NavProps) {
    const pathname = usePathname();

    return (
        <nav className={cn("hidden md:flex items-center gap-8", className)}>
            {NAV_LINKS.map((link) => {
                const isActive =
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

                return (
                    <Link
                        key={link.href}
                        href={link.href}
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
    );
}

export { Nav, NAV_LINKS };
