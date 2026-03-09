import { Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/layout/contact-form";

const SOCIAL_LINKS = [
    {
        label: "GitHub",
        href: "https://github.com/rayantanveer",
        icon: Github,
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/rayan-tanveer",
        icon: Linkedin,
    },
    {
        label: "Email",
        href: "mailto:rayanjamie321@gmail.com",
        icon: Mail,
    },
];

function Footer() {
    return (
        <footer className="border-t border-codex-cream/10 mt-24 pt-12 pb-8">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left — Social links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-serif text-codex-cream text-lg mb-2">
                            Connect
                        </h3>
                        {SOCIAL_LINKS.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={
                                        link.href.startsWith("mailto:")
                                            ? undefined
                                            : "_blank"
                                    }
                                    rel={
                                        link.href.startsWith("mailto:")
                                            ? undefined
                                            : "noopener noreferrer"
                                    }
                                    className="flex items-center gap-3 font-mono text-sm text-codex-cream-muted hover:text-codex-amber transition-colors w-fit"
                                >
                                    <Icon className="h-4 w-4" />
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>

                    {/* Right — Contact form */}
                    <div>
                        <h3 className="font-serif text-codex-cream text-lg mb-4">
                            Get in touch
                        </h3>
                        <ContactForm />
                    </div>
                </div>

                {/* Bottom copyright */}
                <div className="mt-12 pt-6 border-t border-codex-cream/5">
                    <p className="font-mono text-xs text-codex-cream/20 text-center">
                        &copy; {new Date().getFullYear()} Rayan Tanveer. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export { Footer };
