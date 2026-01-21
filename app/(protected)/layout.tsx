"use client";

import { useAuth } from "@/hooks/features/auth/useAuth";
import { useMenu } from "@/hooks/features/menu/useMenu";
import { PageProvider, usePage } from "@/context/page/page-context";
import {
  AdminSideBar,
  AdminUserBar,
  AppLayout,
  GovBar,
  Icon,
  MenuAction,
} from "@uigovpe/components";
import { getImagePath } from "@/utils/getImagePath";

// Componente interno que usa os hooks
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { sidebarSections } = useMenu();
  const { breadcrumb } = usePage();

  // Logo exibida no rodapé da barra lateral
  const footerSidebarLogo = {
    src: getImagePath("/logo-secretaria.png"), // Ensure this image exists or use a placeholder
    alt: "Logo GovPE",
    width: 179,
    height: 48,
  };

  // Logo principal exibida na barra lateral
  const sidebarLogo = {
    src: getImagePath("/logo-fila-zero.png"), // Ensure this image exists
    alt: "Fila Zero",
    width: 220,
    height: 110,
  };

  // Ações do menu do usuário (avatar)
  const userMenuActions: MenuAction = [
    {
      label: "Sair",
      icon: <Icon icon="logout" />,
      command: logout,
    },
  ];

  return (
    <AppLayout>
      {/* Barra superior do Governo de PE */}
      <GovBar />
      <AppLayout.MainLayout>
        {/* Barra lateral de navegação da área administrativa */}
        <AdminSideBar
          theme="primary"
          sections={sidebarSections}
          version="1.0.0"
          title="Fila Zero"
          footerSidebarLogo={footerSidebarLogo}
          logo={sidebarLogo}
        />

        <AppLayout.ContentSection>
          {/* Barra do usuário com breadcrumb dinâmico e ações */}
          <AdminUserBar
            user={{
              name: user?.name ?? "",
              profile: user?.profile ?? "",
            }}
            menuActions={userMenuActions}
            breadcrumb={breadcrumb}
          />
          <AppLayout.MainContent>
            <AppLayout.PageContent>{children}</AppLayout.PageContent>
          </AppLayout.MainContent>
        </AppLayout.ContentSection>
      </AppLayout.MainLayout>
    </AppLayout>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageProvider>
      <LayoutContent>{children}</LayoutContent>
    </PageProvider>
  );
}
