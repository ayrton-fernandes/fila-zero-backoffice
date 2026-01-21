"use client";

import Image from "next/image";
import styles from "./index.module.scss";
import { getImagePath } from "@/utils/getImagePath";

type FooterLogo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type FooterProps = {
  footerLogo: FooterLogo;
};

export default function Footer({ footerLogo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <section className={styles.footer}>
      <div className={styles.footerContainer}>
        <span className={styles.footerText}>
          © {currentYear} Fila Zero - Todos os direitos reservados
        </span>

        <div className={styles.footerLogoContainer}>
          <Image
            src={getImagePath(footerLogo.src)}
            width={footerLogo.width}
            height={footerLogo.height}
            alt={footerLogo.alt}
          />
        </div>
      </div>
    </section>
  );
}
