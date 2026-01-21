"use client";

import { Icon } from "@uigovpe/components";
import { getImagePath } from "@/utils/getImagePath";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useMenu } from "@/hooks/features/menu/useMenu";

export type BreadcrumbItem = {
  label: string;
  url?: string;
};

export type BreadcrumbHome = {
  label?: string;
  url?: string;
  template?: React.ReactNode;
};

export type BreadcrumbData = {
  home?: BreadcrumbHome;
  items: BreadcrumbItem[];
};

export type PageContextType = {
  breadcrumb: BreadcrumbData;
  setBreadcrumb: (items: BreadcrumbData) => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

const DEFAULT_BREADCRUMB_NAMES: Record<string, string> = {
  "/dashboard": "Início",
  "/gestao-usuarios": "Gestão de Usuários",
  "/gestao": "Gestão",
};

const MAIN_ROUTES = [
  "dashboard",
  "gestao-usuarios",
  "gestao",];

function getBasePath(path: string): string {
  if (!path || path === "/") return "/dashboard";

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return "/dashboard";

  const match = segments.find(segment => MAIN_ROUTES.includes(segment));
  return `/${match || segments[0]}`;
}

export function PageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { menus } = useMenu();

  const getBreadcrumbName = useCallback((segment: string): string => {
    const foundMenu = menus.find(menu => menu.url.includes(segment));
    return foundMenu?.displayName ?? DEFAULT_BREADCRUMB_NAMES[`/${segment}`] ?? segment;
  }, [menus]);

  // Função para verificar se um segmento é um ID numérico
  const isNumericId = (segment: string): boolean => {
    return /^\d+$/.test(segment);
  };

  const computedBreadcrumb = useMemo((): BreadcrumbData => {
    const homeUrl = getBasePath(pathname);

    const breadcrumb: BreadcrumbData = {
      home: {
        template: (
          <Link className="p-menuitem-link" href={homeUrl}>
            <Icon icon="home" className="p-menuitem-text" />
          </Link>
        ),
        label: "Home",
        url: homeUrl,
      },
      items: [],
    };

    if (pathname === "/dashboard") return breadcrumb;

    const paths = pathname.split("/").filter(Boolean);
    
    // Filtrar segmentos que são IDs numéricos
    const filteredPaths = paths.filter(segment => !isNumericId(segment));

    breadcrumb.items = filteredPaths.map((segment, index) => ({
      label: getBreadcrumbName(segment),
      url: index < filteredPaths.length - 1 ? getImagePath(`/${paths.slice(0, paths.indexOf(segment) + 1).join("/")}`) : undefined,
    }));

    return breadcrumb;
  }, [pathname, getBreadcrumbName]);

  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbData>(computedBreadcrumb);

  useEffect(() => {
    setBreadcrumb(prev => {
      const sameHome = prev.home?.url === computedBreadcrumb.home?.url;
      const sameItems =
        prev.items.length === computedBreadcrumb.items.length &&
        prev.items.every(
          (item, i) =>
            item.label === computedBreadcrumb.items[i].label &&
            item.url === computedBreadcrumb.items[i].url
        );

      if (sameHome && sameItems) return prev;

      return computedBreadcrumb;
    });
  }, [computedBreadcrumb]);

  const value = useMemo(() => ({ breadcrumb, setBreadcrumb }), [breadcrumb]);

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export function usePage() {
  const context = useContext(PageContext);
  if (!context) throw new Error("usePage deve ser usado dentro de um PageProvider");
  return context;
}