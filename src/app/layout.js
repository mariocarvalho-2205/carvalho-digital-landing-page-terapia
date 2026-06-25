// ============================================
// LAYOUT RAIZ - Root Layout
// Arquivo: src/app/layout.js
// 
// Este arquivo define a estrutura HTML básica,
// meta tags para SEO, fontes e providers globais
// ============================================

import { Poppins, Playfair_Display } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/siteConfig.js';

// ============================================
// IMPORTAÇÃO DE FONTES GOOGLE
// ============================================
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['600', '700', '800'],
});

// ============================================
// EXPORTAR METADADOS PARA SEO
// ============================================
export const metadata = {
  // Informações básicas
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  keywords: [
    'fisioterapia',
    'pilates',
    'massoterapia',
    'terapias alternativas',
    'bem-estar',
    'saúde',
    'São Paulo',
  ],

  // ============================================
  // METADADOS OPEN GRAPH (para compartilhamento)
  // ============================================
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.siteName,
        type: 'image/jpeg',
      },
    ],
  },

  // ============================================
  // METADADOS TWITTER
  // ============================================
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/twitter-image.jpg`],
    creator: '@anacarolinaterapias',
  },

  // ============================================
  // OUTROS METADADOS IMPORTANTES
  // ============================================
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Manifesto PWA
  manifest: '/manifest.json',

  // ============================================
  // VERIFICAÇÃO DE PROPRIEDADE (Adicione seus)
  // ============================================
  verification: {
    google: 'seu-codigo-google-verification-aqui',
    yandex: 'seu-codigo-yandex-aqui',
  },

  // ============================================
  // FORMATTERS ESTRUTURADOS
  // ============================================
  alternates: {
    canonical: siteConfig.url,
  },
};

// ============================================
// EXPORT VIEWPORT (Next.js 14+)
// colorScheme, themeColor e viewport agora ficam aqui
// ============================================
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#a855f7',
  colorScheme: 'light',
};

/**
 * Metadados do Twitter (alternativa)
 * Se precisar de mais controle granular
 */
export const twitterMetadata = {
  handle: '@anacarolinaterapias',
  site: '@anacarolinaterapias',
  cardType: 'summary_large_image',
};

// ============================================
// COMPONENTE ROOT LAYOUT
// ============================================
export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${playfairDisplay.variable}`}
    >
      <head>
        {/* ============================================ */}
        {/* FAVICON E ÍCONES */}
        {/* ============================================ */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* ============================================ */}
        {/* DNS PREFETCH E PRECONECT */}
        {/* Otimiza o carregamento de recursos externos */}
        {/* ============================================ */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://graph.instagram.com" />
        <link rel="dns-prefetch" href="https://api.anthropic.com" />

        {/* ============================================ */}
        {/* JSON-LD SCHEMA (Dados estruturados) */}
        {/* Importante para SEO e aparência em buscas */}
        {/* ============================================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Terapias Integradas - Ana Carolina',
              description:
                'Serviços de fisioterapia, pilates e massoterapia em São Paulo',
              url: siteConfig.url,
              telephone: '+5511999999999',
              email: 'contato@terapiasintegradas.com.br',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'São Paulo, SP',
                addressLocality: 'São Paulo',
                addressRegion: 'SP',
                addressCountry: 'BR',
              },
              areaServed: ['São Paulo', 'Região Metropolitana de São Paulo'],
              priceRange: '$$',
              image: `${siteConfig.url}/og-image.jpg`,
              sameAs: [
                'https://instagram.com/anacarolina.terapias',
                'https://facebook.com/terapiasintegradas',
              ],
              // Horários de funcionamento
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
              },
            }),
          }}
        />

        {/* ============================================ */}
        {/* GOOGLE ANALYTICS */}
        {/* Adicione seu ID do Google Analytics */}
        {/* ============================================ */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* ============================================ */}
        {/* GOOGLE TAG MANAGER */}
        {/* ============================================ */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          />
        )}

        {/* ============================================ */}
        {/* PRELOAD DE RECURSOS CRÍTICOS */}
        {/* ============================================ */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-bg.jpg"
          type="image/jpeg"
        />

        {/* ============================================ */}
        {/* TAGS DE VERIFICAÇÃO (Se necessário) */}
        {/* ============================================ */}
        {/* Adicione aqui tags de verificação do Bing, etc */}
      </head>

      <body className="font-sans bg-neutral-50 text-neutral-900">
        {/* ============================================ */}
        {/* GTM NOSCRIPT (para compatibilidade) */}
        {/* ============================================ */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {/* ============================================ */}
        {/* CONTEÚDO DA APLICAÇÃO */}
        {/* ============================================ */}
        <main>{children}</main>
      </body>
    </html>
  );
}
