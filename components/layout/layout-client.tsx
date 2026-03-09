"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProxenosPanel } from "@/components/proxenos/proxenos-panel";
import { ProxenosProvider } from "@/components/proxenos/proxenos-context";

function LayoutClient({ children }: { children: React.ReactNode }) {
    return (
        <ProxenosProvider>
            <Header />
            {children}
            <Footer />
            <ProxenosPanel />
        </ProxenosProvider>
    );
}

export { LayoutClient };
