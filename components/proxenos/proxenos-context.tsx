"use client";

import { createContext, useContext, useState } from "react";

interface ProxenosContextValue {
    isOpen: boolean;
    openProxenos: () => void;
    closeProxenos: () => void;
}

const ProxenosContext = createContext<ProxenosContextValue | null>(null);

function ProxenosProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <ProxenosContext.Provider
            value={{
                isOpen,
                openProxenos: () => setIsOpen(true),
                closeProxenos: () => setIsOpen(false),
            }}
        >
            {children}
        </ProxenosContext.Provider>
    );
}

function useProxenos() {
    const context = useContext(ProxenosContext);
    if (!context)
        throw new Error("useProxenos must be used within ProxenosProvider");
    return context;
}

export { ProxenosProvider, useProxenos };
