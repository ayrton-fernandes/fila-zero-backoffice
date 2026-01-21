"use client";

import { useCallback } from "react";

type ToastSeverity = "success" | "info" | "warn" | "error";

interface ToastProps {
    severity: ToastSeverity;
    summary: string;
    detail?: string;
    life?: number;
}

export function useToast() {
    const toast = useCallback((props: ToastProps) => {
        const { severity, summary, detail } = props;
        const emoji = {
            success: "✅",
            error: "❌",
            warn: "⚠️",
            info: "ℹ️",
        }[severity];

        console.log(`${emoji} [${severity.toUpperCase()}] ${summary}`, detail);
        // Uncomment to use alert if desired
        // alert(`${summary}\n${detail}`);
    }, []);

    return { toast };
}