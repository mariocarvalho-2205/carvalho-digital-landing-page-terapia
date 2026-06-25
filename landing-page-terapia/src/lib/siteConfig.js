// ============================================
// CONFIGURAÇÕES GLOBAIS DO SITE
// Arquivo: src/lib/siteConfig.js
//
// Centralize informações do site aqui para
// evitar repetição e facilitar manutenção
// ============================================

export const siteConfig = {
  // ============================================
  // INFORMAÇÕES BÁSICAS DO SITE
  // ============================================
  siteName: 'Terapias Integradas',
  title: 'Terapias Integradas - Fisioterapia, Pilates e Massoterapia em São Paulo',
  description:
    'Serviços de fisioterapia, pilates e massoterapia com abordagem integrativa. Atendimento domiciliar e em clínica. Profissional qualificada e humanizada.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://terapiaanacarolina.com.br',
  lang: 'pt-BR',

  // ============================================
  // INFORMAÇÕES DO PROFISSIONAL
  // ============================================
  professional: {
    name: process.env.NEXT_PUBLIC_PROFESSIONAL_NAME || 'Dra. Ana Carolina Silva',
    phone: process.env.NEXT_PUBLIC_PROFESSIONAL_PHONE || '+55 11 99999-9999',
    email: process.env.NEXT_PUBLIC_PROFESSIONAL_EMAIL || 'contato@terapiaanacarolina.com.br',
    crefito: process.env.NEXT_PUBLIC_PROFESSIONAL_CREFITO || 'CREFITO: 123456-F',
    address: process.env.NEXT_PUBLIC_PROFESSIONAL_ADDRESS || 'São Paulo, SP - Brasil',
    bio: 'Fisioterapeuta especializada em terapias integrativas, pilates clínico e massoterapia. Com experiência de mais de 10 anos atendendo pacientes em clínica e domicílio.',
  },

  // ============================================
  // LINKS DE REDES SOCIAIS
  // ============================================
  social: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER || '+5511999999999',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || 'https://instagram.com/anacarolina.terapias',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK || 'https://facebook.com/terapiasintegradas',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN || 'https://linkedin.com/in/anacarolinaterapias',
    youtube: 'https://youtube.com/@terapiasintegradas',
  },

  // ============================================
  // SERVIÇOS PRINCIPAIS
  // ============================================
  services: [
    {
      id: 'fisioterapia-clinica',
      name: 'Fisioterapia em Clínica',
      description: 'Tratamento especializado para dores, lesões e reabilitação funcional',
      icon: 'FiActivity',
      price: 110.0,
      duration: '50 min',
      location: 'Clínica',
    },
    {
      id: 'pilates-mat',
      name: 'Pilates MAT',
      description: 'Exercícios de pilates em colchonete para alongamento e fortalecimento',
      icon: 'GiYogi',
      price: 70.0,
      duration: '60 min',
      location: 'Clínica / Domicílio',
      promotional: 90.0,
    },
    {
      id: 'pilates-maquina',
      name: 'Pilates Máquina',
      description: 'Pilates com aparelhos para maior intensidade e resultados',
      icon: 'FaWheelchair',
      price: 140.0,
      duration: '60 min',
      location: 'Clínica',
      promotional: 160.0,
    },
    {
      id: 'massoterapia',
      name: 'Massoterapia',
      description: 'Diferentes técnicas de massagem para relaxamento e alívio de tensões',
      icon: 'GiMassage',
      price: 110.0,
      duration: '60 min',
      location: 'Clínica / Domicílio',
    },
    {
      id: 'fisioterapia-domiciliar',
      name: 'Fisioterapia Domiciliar',
      description: 'Atendimento personalizado na comodidade da sua casa',
      icon: 'FiHome',
      price: 110.0,
      duration: 'Avulso',
      location: 'Domicílio',
    },
    {
      id: 'avaliacao-postural',
      name: 'Avaliação Postural',
      description: 'Avaliação completa para montar plano terapêutico personalizado',
      icon: 'FiBarChart2',
      price: 130.0,
      duration: '50 min',
      location: 'Clínica',
    },
  ],

  // ============================================
  // PLANOS MENSAIS
  // ============================================
  plans: [
    {
      id: 'pilates-plan-8',
      name: 'Plano Pilates',
      type: 'Pilates MAT',
      sessions: 8,
      frequency: '2x por semana',
      duration: '1 mês',
      price: 70.0,
      promotion: true,
      features: [
        'Mais consistência, melhores resultados',
        'Maior qualidade de vida para seu dia a dia',
      ],
    },
    {
      id: 'fisioterapia-plan-5',
      name: 'Plano Fisioterapia',
      type: 'Fisioterapia Domiciliar',
      sessions: 5,
      frequency: '2x por semana',
      duration: '1 mês',
      price: 100.0,
      promotion: false,
      features: [
        'Acompanhamento contínuo para alívio de dores',
        'Melhoria funcional e mais independência',
      ],
    },
    {
      id: 'fisioterapia-plan-10',
      name: 'Plano Intensivo',
      type: 'Fisioterapia Domiciliar',
      sessions: 10,
      frequency: '2x por semana',
      duration: '1 mês',
      price: 90.0,
      promotion: false,
      features: [
        'Acompanhamento contínuo para alívio de dores',
        'Melhoria funcional e mais independência',
      ],
    },
  ],

  // ============================================
  // DIFERENCIAIS
  // ============================================
  highlights: [
    {
      title: 'Humanizado e Personalizado',
      description: 'Cada atendimento é adaptado às suas necessidades específicas',
      icon: 'FiHeart',
    },
    {
      title: 'Profissional Qualificada',
      description: 'Formação contínua e atualizada nas melhores técnicas',
      icon: 'FiAward',
    },
    {
      title: 'Resultados Comprovados',
      description: 'Milhares de pacientes satisfeitos e recuperados',
      icon: 'FiTrendingUp',
    },
    {
      title: 'Atendimento Domiciliar',
      description: 'Comodidade de ser atendido na sua casa',
      icon: 'FiHome',
    },
  ],

  // ============================================
  // DEPOIMENTOS
  // ============================================
  testimonials: [
    {
      id: 1,
      name: 'Mariana Costa',
      role: 'Paciente - Fisioterapia',
      image: '/images/testimonial-1.jpg',
      text: 'A Ana Carolina é uma profissional extraordinária. Consegui me livrar das dores nas costas após 3 meses de tratamento. Super recomendo!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Roberto Silva',
      role: 'Paciente - Pilates',
      image: '/images/testimonial-2.jpg',
      text: 'Pilates mudou minha vida. Ganho força, flexibilidade e ainda fico mais relaxado. Ana Carolina acompanha cada movimento.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Lucia Oliveira',
      role: 'Paciente - Massoterapia',
      image: '/images/testimonial-3.jpg',
      text: 'As massagens são terapêuticas mesmo! Saio de cada sessão como nova, sem tensões. Muito atencioso o atendimento.',
      rating: 5,
    },
  ],

  // ============================================
  // HORÁRIOS DE FUNCIONAMENTO
  // ============================================
  businessHours: [
    { day: 'Segunda', hours: '09:00 - 18:00' },
    { day: 'Terça', hours: '09:00 - 18:00' },
    { day: 'Quarta', hours: '09:00 - 18:00' },
    { day: 'Quinta', hours: '09:00 - 18:00' },
    { day: 'Sexta', hours: '09:00 - 18:00' },
    { day: 'Sábado', hours: '09:00 - 14:00' },
    { day: 'Domingo', hours: 'Fechado' },
  ],

  // ============================================
  // VALORES DE SEO
  // ============================================
  seo: {
    keywords: [
      'fisioterapia São Paulo',
      'pilates em SP',
      'massoterapia profissional',
      'fisioterapeuta domiciliar',
      'terapias alternativas',
      'bem-estar saúde',
    ],
    author: 'Terapias Integradas',
    publisher: 'Terapias Integradas',
  },

  // ============================================
  // CORES BRAND
  // ============================================
  colors: {
    primary: '#a855f7',
    primaryDark: '#7e22ce',
    rose: '#ff6b35',
    gold: '#f59e0b',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
};

// ============================================
// FUNÇÃO AUXILIAR PARA FORMATAR VALORES
// ============================================
export const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

// ============================================
// FUNÇÃO PARA GERAR META TAGS
// ============================================
export const generateMetaTags = (title, description, image = null) => {
  return {
    title: `${title} | ${siteConfig.siteName}`,
    description,
    image: image || `${siteConfig.url}/og-image.jpg`,
  };
};
