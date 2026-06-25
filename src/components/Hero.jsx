// ============================================
// COMPONENTE HERO SECTION
// Arquivo: src/components/Hero.jsx
//
// Seção inicial da landing page com
// headline, subheadline e CTAs
// ============================================

'use client';

import { motion } from 'framer-motion';
import { FiArrowRight, FiMessageCircle, FiPhone } from 'react-icons/fi';
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
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, x: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================
// COMPONENTE HERO
// ============================================
export default function Hero() {
  // ============================================
  // DADOS
  // ============================================
  const highlights = [
    { icon: '✓', text: '10+ anos de experiência' },
    { icon: '✓', text: 'Atendimento humanizado' },
    { icon: '✓', text: 'Resultados comprovados' },
  ];

  // ============================================
  // RENDER
  // ============================================
  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-soft overflow-hidden pt-24 pb-16 lg:pb-0"
    >
      {/* ============================================ */}
      {/* BACKGROUND DECORATIVO */}
      {/* ============================================ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob 1 */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />

        {/* Blob 2 */}
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* ============================================ */}
      {/* CONTEÚDO PRINCIPAL */}
      {/* ============================================ */}
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-6rem)]">
          {/* ============================================ */}
          {/* COLUNA ESQUERDA - TEXTO */}
          {/* ============================================ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
                ✨ Bem-vindo ao seu caminho para a saúde
              </span>
            </motion.div>

            {/* Headline Principal */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="font-sans font-bold text-5xl lg:text-6xl text-neutral-900">
                Fisioterapia,{' '}
                <span className="text-gradient">Pilates</span> &{' '}
                <span className="text-gradient">Bem-estar</span> em um único lugar
              </h1>
            </motion.div>

            {/* Descrição */}
            <motion.p variants={itemVariants} className="text-lg text-neutral-600 max-w-xl">
              Recupere-se de lesões, melhore sua postura e ganhe qualidade de vida com
              profissional qualificada e atendimento personalizado. Consultas em clínica ou
              domicílio.
            </motion.p>

            {/* Highlights */}
            <motion.div variants={containerVariants} className="space-y-3 pt-4">
              {highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-neutral-700 font-medium">{highlight.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              {/* Botão WhatsApp */}
              <a
                href={getWhatsAppWebURL(
                  siteConfig.professional.phone,
                  'Olá! Gostaria de agendar uma avaliação e conhecer seus serviços.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                <FiMessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Agendar no WhatsApp
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Botão Ligar */}
              <a
                href={`tel:${siteConfig.professional.phone}`}
                className="btn-secondary flex items-center justify-center gap-2 group"
              >
                <FiPhone className="w-5 h-5" />
                Ligar Agora
              </a>
            </motion.div>

            {/* Garantia */}
            <motion.div variants={itemVariants} className="pt-4">
              <p className="text-sm text-neutral-600">
                <span className="font-semibold text-primary-600">Primeira consulta:</span>{' '}
                Avaliação gratuita para entender suas necessidades
              </p>
            </motion.div>
          </motion.div>

          {/* ============================================ */}
          {/* COLUNA DIREITA - IMAGEM/DECORAÇÃO */}
          {/* ============================================ */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            {/* Card decorativo com gradient */}
            <div className="relative rounded-2xl overflow-hidden shadow-hard">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-rose-500 opacity-10" />

              {/* Conteúdo do card */}
              <div className="relative p-8 rounded-2xl bg-white border-2 border-primary-100 space-y-6">
                {/* Illustration placeholder */}
                <div className="w-full h-64 rounded-xl bg-gradient-soft flex items-center justify-center">
                  <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="text-6xl"
                  >
                    🧘‍♀️
                  </motion.div>
                </div>

                {/* Informações do card */}
                <div className="space-y-4">
                  <h3 className="font-sans font-bold text-2xl text-neutral-900">
                    Transforme sua Saúde
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Cada sessão é cuidadosamente planejada para seus objetivos
                    específicos de recuperação e bem-estar.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-primary-50 rounded-lg p-4 text-center">
                      <p className="font-bold text-2xl text-primary-600">500+</p>
                      <p className="text-xs text-neutral-600">Pacientes atendidos</p>
                    </div>
                    <div className="bg-rose-50 rounded-lg p-4 text-center">
                      <p className="font-bold text-2xl text-rose-600">98%</p>
                      <p className="text-xs text-neutral-600">Satisfação</p>
                    </div>
                  </div>
                </div>

                {/* CTA dentro do card */}
                <a
                  href={getWhatsAppWebURL(siteConfig.professional.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center gap-2 !py-2 text-sm"
                >
                  <FiMessageCircle className="w-4 h-4" />
                  Começar Agora
                </a>
              </div>
            </div>

            {/* Decoração flutuante */}
            <motion.div
              animate={{
                y: [-20, 20, -20],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-gold-200 opacity-20 blur-2xl"
            />
          </motion.div>
        </div>

        {/* ============================================ */}
        {/* SCROLL INDICATOR */}
        {/* ============================================ */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center hidden lg:block"
        >
          <p className="text-sm text-neutral-600 mb-2">Scroll para explorar</p>
          <div className="w-6 h-10 border-2 border-neutral-300 rounded-full flex items-start justify-center p-2 mx-auto">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="w-1 h-2 bg-primary-600 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
