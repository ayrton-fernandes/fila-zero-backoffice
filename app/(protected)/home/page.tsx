"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/features/auth/useAuth";
import { useMenu } from "@/hooks/features/menu/useMenu";
import { MenuUser } from "@/domain/types/menuUser";
import { Typography } from "@uigovpe/components";
import { getImagePath } from "@/utils/getImagePath";

export default function Home() {
    const { user } = useAuth();
    const { menus } = useMenu();
    
    const collectSubmenuNames = (items: MenuUser[] | null | undefined): Set<string> => {
        const names = new Set<string>();
        if (!items) return names;
        const walk = (arr: MenuUser[]) => {
            for (const it of arr) {
                if (it.submenus && it.submenus.length) {
                    for (const c of it.submenus) {
                        if (c.displayName) names.add(c.displayName);
                    }
                    walk(it.submenus);
                }
            }
        };
        walk(items);
        return names;
    };

    const submenuNames = collectSubmenuNames(menus);

    const quickMenuItems = menus
        .filter(m => !submenuNames.has(m.displayName))
        .map(m => {
            const firstSub = m.submenus && m.submenus.length ? m.submenus.find(s => !!s.url) : undefined;
            const link = firstSub ? getImagePath(firstSub.url ?? "") : getImagePath(m.url ?? "");
            return { id: String(m.id), label: m.displayName, link };
        })
        .slice(0, 12);

    // Adapted profile label logic for the mock user structure
    const profileLabel = user?.profile || "-";

    return (
        <div className="p-6">
            <div className="md:flex-row items-start md:items-center gap-6">
                <div>
                    <Typography variant="h3">{`Bem-vindo${user ? `, ${user.name}` : ""} ao Backoffice`}</Typography>
                    <Typography variant="p" className="text-sm mt-1">Tipo de usuário: {profileLabel}</Typography>
                </div>

                <div className="w-full md:w-auto mt-3">
                    <Typography variant="h5" size="small" fontWeight="bold">Acesso rápido</Typography>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {quickMenuItems.length ? (
                            quickMenuItems.map(mi => (
                                <Link key={mi.id} href={mi.link ?? "#"} className="text-indigo-600 hover:underline px-2 py-1">
                                    {mi.label}
                                </Link>
                            ))
                        ) : (
                            <span className="text-gray-500">{user ? "Nenhuma página disponível" : "Carregando..."}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
