"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProxenosPanel } from "@/components/proxenos/proxenos-panel";
import { ProxenosTrigger } from "@/components/proxenos/proxenos-trigger";
import { ProxenosProvider, useProxenos } from "@/components/proxenos/proxenos-context";

// Inner wrapper reads context to animate content margin (desktop only)
function LayoutInner({ children }: { children: React.ReactNode }) {
    const { isOpen } = useProxenos();
    const [isDesktop, setIsDesktop] = useState(false);

    // Detect viewport — only apply push-margin on md+ screens
    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <>
            <Header />
            <motion.div
                animate={{
                    marginRight: isOpen && isDesktop ? "420px" : "0px",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 35 }}
                className="min-h-screen"
            >
                {children}
                <Footer />
            </motion.div>
            <ProxenosPanel />
            <ProxenosTrigger />
        </>
    );
}

function LayoutClient({ children }: { children: React.ReactNode }) {
    return (
        <ProxenosProvider>
            <LayoutInner>{children}</LayoutInner>
        </ProxenosProvider>
    );
}

export { LayoutClient };
