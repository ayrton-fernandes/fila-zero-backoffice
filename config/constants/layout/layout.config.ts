export interface Logo {
  src: string;
  width: number;
  height: number;
  alt: string;
  title?: string;
}

export const footerLogo: Logo = {
  src: '/logo-secretaria.png',
  width: 187,
  height: 50,
  alt: 'Secretaria. Governo de Pernambuco',
  title: 'Secretaria. Governo de Pernambuco'
};

export const logoPrograma: Logo = {
  src: "/logo-fila-zero.png",
  alt: "Fila Zero",
  title: "Fila Zero",
  width: 220,
  height: 110,
};

export const SIDEBAR_THEME = "sidebar-light";
