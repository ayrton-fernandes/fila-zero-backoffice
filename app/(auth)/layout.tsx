'use client'

import { footerLogo } from "@/config/constants/layout/layout.config";
import Footer from "@/components/layout/footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-screen">
      <main className="flex h-full flex-col">
        <div className="flex-1">
          {children}
        </div>
        <Footer footerLogo={footerLogo} />
      </main>
    </div>
  )
}
