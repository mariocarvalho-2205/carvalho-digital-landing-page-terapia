// ============================================
// PÁGINA PRINCIPAL
// Arquivo: src/app/page.js
//
// Integra todos os componentes da landing page
// ============================================

import { DefaultSeo } from 'next-seo';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import FormContact from '@/components/FormContact';
import Footer from '@/components/Footer';
import { siteConfig } from '@/lib/siteConfig';

// ============================================
// EXPORTAR METADADOS
// ============================================
export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

// ============================================
// COMPONENTE PÁGINA RAIZ
// ============================================
export default function Home() {
  return (
    <>
      {/* ============================================ */}
      {/* HEADER/NAVEGAÇÃO */}
      {/* ============================================ */}
      <Header />

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <Hero />

      {/* ============================================ */}
      {/* SEÇÃO DE SERVIÇOS */}
      {/* ============================================ */}
      <Services />

      {/* ============================================ */}
      {/* SEÇÃO DE PREÇOS */}
      {/* ============================================ */}
      <Pricing />

      {/* ============================================ */}
      {/* SEÇÃO DE CONTATO */}
      {/* ============================================ */}
      <FormContact />

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <Footer />
    </>
  );
}
