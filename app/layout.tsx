import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
    weight: "400",
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-instrument-serif",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Rayan Tanveer — Portfolio",
    description:
        "Full Stack Developer building at the intersection of product thinking and AI engineering.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`dark ${instrumentSerif.variable} ${GeistSans.variable} ${GeistMono.variable}`}
        >
            <body className="bg-codex-black text-codex-cream antialiased">
                {children}
            </body>
        </html>
    );
}
