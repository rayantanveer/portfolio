"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type FormStatus = "idle" | "loading" | "success" | "error";

function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    message: message.trim(),
                }),
            });

            if (!response.ok) {
                const data = (await response.json()) as { error: string };
                setErrorMessage(data.error || "Something went wrong");
                setStatus("error");
                return;
            }

            setStatus("success");
        } catch {
            setErrorMessage("Failed to send message");
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <p className="font-mono text-sm text-codex-amber">
                Message received. I&apos;ll be in touch.
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-codex-black-soft border-codex-cream/10 text-codex-cream placeholder:text-codex-cream-muted/50 font-mono text-sm"
            />
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-codex-black-soft border-codex-cream/10 text-codex-cream placeholder:text-codex-cream-muted/50 font-mono text-sm"
            />
            <Textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="bg-codex-black-soft border-codex-cream/10 text-codex-cream placeholder:text-codex-cream-muted/50 font-mono text-sm resize-none"
            />
            <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-codex-amber text-codex-black font-mono text-sm font-semibold hover:bg-codex-amber/90 transition-colors"
            >
                {status === "loading" ? "Sending..." : "Send"}
            </Button>
            {status === "error" && errorMessage && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
            )}
        </form>
    );
}

export { ContactForm };
