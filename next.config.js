/** @type {import('next').NextConfig} */

const nextConfig = {
  // ============================================
  // OTIMIZAÇÕES DE PERFORMANCE
  // ============================================
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false,

  // ============================================
  // CONFIGURAÇÃO DE IMAGENS
  // ============================================
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ============================================
  // HEADERS PARA SEO E SEGURANÇA
  // ============================================
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
    ];
  },

  // ============================================
  // REWRITE PARA WHATSAPP API
  // ============================================
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        {
          source: '/api/whatsapp/:path*',
          destination: 'https://graph.instagram.com/:path*',
        },
      ],
    };
  },

  // ============================================
  // VARIÁVEIS DE AMBIENTE PUBLIC
  // ============================================
  publicRuntimeConfig: {
    appName: process.env.NEXT_PUBLIC_APP_NAME,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    whatsappPhoneNumberId: process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID,
    whatsappBusinessNumber: process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER,
    whatsappApiVersion: process.env.NEXT_PUBLIC_WHATSAPP_API_VERSION,
  },

  // ============================================
  // VARIÁVEIS DE AMBIENTE PRIVADAS
  // ============================================
  serverRuntimeConfig: {
    whatsappApiToken: process.env.WHATSAPP_API_TOKEN,
    whatsappBusinessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    n8nWebhookUrl: process.env.N8N_WEBHOOK_URL,
    n8nWebhookAuthKey: process.env.N8N_WEBHOOK_AUTH_KEY,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
  },

  // ============================================
  // WEBPACK CUSTOMIZADO
  // ============================================
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      minimize: true,
    };
    return config;
  },

  // ============================================
  // EXPERIMENTAL FEATURES
  // ============================================
  experimental: {
    optimizePackageImports: ['react-icons', 'framer-motion'],
  },
};

module.exports = nextConfig;
