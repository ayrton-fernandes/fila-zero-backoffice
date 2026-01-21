import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "@uigovpe/styles";
import "../styles/globals.css";
import "../styles/theme.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fila Zero - Backoffice",
  description: "Sistema de gestão Fila Zero",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
