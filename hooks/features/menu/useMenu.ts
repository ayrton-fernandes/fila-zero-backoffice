import { MOCK_MENU_ITEMS } from "@/config/menuItems";
import { mapMenuToSidebarSections } from "@/utils/mapMenuToSidebarSections";
import { useMemo } from "react";

export function useMenu() {
    const menus = MOCK_MENU_ITEMS;
    const sidebarSections = useMemo(() => mapMenuToSidebarSections(menus), [menus]);

    return {
        menus,
        sidebarSections,
        loading: false,
    };
}
