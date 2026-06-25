// ============================================
// COMPONENTE SERVICES
// Arquivo: src/components/Services.jsx
//
// Grid de serviços com animações
// ============================================

'use client';

import { motion } from 'framer-motion';
import {
  FiActivity,
  FiAward,
  FiHome,
  FiBarChart2,
  FiTrendingUp,
  FiHeart,
  FiArrowRight,
} from 'react-icons/fi';
import { GiMeditation, GiBodyBalance } from 'react-icons/gi';
import { siteConfig, formatPrice } from '@/lib/siteConfig';
import { getWhatsAppWebURL } from '@/lib/apiIntegrations';

// ============================================
// VARIANTES DE ANIMAÇÃO
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -10,
    boxShadow: '0 20px 40px rgba(168, 85, 247, 0.15)',
    transition: {
      duration: 0.3,
    },
  },
};

// ============================================
// MAPA DE ÍCONES
// ============================================
const iconMap = {
  'FiActivity': FiActivity,
  'GiYogi': GiMeditation,
  'FaWheelchair': GiBodyBalance, // Usando GiBodyBalance como alternativa
  'GiMassage': GiBodyBalance,
  'FiHome': FiHome,
  'FiBarChart2': FiBarChart2,
};

// ============================================
// COMPONENTE SERVICES
// ============================================
export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <div className="container-custom mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-4"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
            Nossos Serviços
          </span>
          <h2 className="font-sans font-bold text-4xl lg:text-5xl text-neutral-900">
            Soluções Completas para Sua{' '}
            <span className="text-gradient">Saúde e Bem-estar</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Oferecemos uma ampla gama de serviços especializados, atendimento em
            clínica ou em sua casa, com profissional qualificada e compassiva.
          </p>
        </motion.div>
      </div>

      {/* ============================================ */}
      {/* GRID DE SERVIÇOS */}
      {/* ============================================ */}
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {siteConfig.services.map((service) => {
            const IconComponent = iconMap[service.icon] || FiAward;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover="hover"
                className="group card-hover card"
              >
                {/* ============================================ */}
                {/* HEADER DO CARD */}
                {/* ============================================ */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary-600" />
                  </div>

                  {service.promotional && (
                    <span className="inline-block px-2 py-1 rounded bg-rose-100 text-rose-700 text-xs font-semibold">
                      Promoção
                    </span>
                  )}
                </div>

                {/* ============================================ */}
                {/* CONTEÚDO DO CARD */}
                {/* ============================================ */}
                <div className="space-y-3 mb-6">
                  <h3 className="font-sans font-bold text-xl text-neutral-900">
                    {service.name}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* ============================================ */}
                {/* INFORMAÇÕES DE PREÇO */}
                {/* ============================================ */}
                <div className="space-y-2 mb-6 pb-6 border-b border-neutral-200">
                  {service.promotional ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary-600">
                          {formatPrice(service.price)}
                        </span>
                        <span className="text-sm text-neutral-500 line-through">
                          {formatPrice(service.promotional)}
                        </span>
                      </div>
                      <p className="text-xs text-rose-600 font-semibold">
                        (Primeiros 3 meses)
                      </p>
                    </>
                  ) : (
                    <p className="text-2xl font-bold text-primary-600">
                      {formatPrice(service.price)}
                    </p>
                  )}

                  <p className="text-xs text-neutral-500">
                    {service.duration} • {service.location}
                  </p>
                </div>

                {/* ============================================ */}
                {/* DETALHES E CTA */}
                {/* ============================================ */}
                <a
                  href={getWhatsAppWebURL(
                    siteConfig.professional.phone,
                    `Gostaria de saber mais sobre ${service.name}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors font-semibold text-sm group/btn"
                >
                  <span>Saiba Mais</span>
                  <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ============================================ */}
      {/* SEÇÃO DE DIFERENCIAIS */}
      {/* ============================================ */}
      <div className="container-custom mt-20 pt-20 border-t border-neutral-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="font-sans font-bold text-3xl text-neutral-900">
            Por que escolher nossos serviços?
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {siteConfig.highlights.map((highlight, idx) => {
            const IconComponent = iconMap[highlight.icon] || FiHeart;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="text-center space-y-3"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-2">
                  <IconComponent className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-neutral-900">
                  {highlight.title}
                </h4>
                <p className="text-sm text-neutral-600">
                  {highlight.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ============================================ */}
      {/* SEÇÃO ATENDIMENTO */}
      {/* ============================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container-custom mt-20"
      >
        <div className="bg-gradient-to-r from-primary-600 to-rose-500 rounded-2xl p-12 text-white text-center space-y-6">
          <h3 className="font-sans font-bold text-3xl lg:text-4xl">
            Pronto para começar sua transformação?
          </h3>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Agende sua avaliação gratuita hoje e descubra como podemos ajudá-lo a
            alcançar seus objetivos de saúde e bem-estar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href={getWhatsAppWebURL(
                siteConfig.professional.phone,
                'Gostaria de agendar uma avaliação gratuita'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg bg-white text-primary-600 font-semibold hover:bg-neutral-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>Agendar Avaliação Gratuita</span>
              <FiArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
