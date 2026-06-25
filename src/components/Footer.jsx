// ============================================
// COMPONENTE FOOTER
// Arquivo: src/components/Footer.jsx
//
// Footer com informações, links sociais e copyright
// ============================================

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FiInstagram,
  FiFacebook,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart,
} from 'react-icons/fi';
import { siteConfig } from '@/lib/siteConfig';

// ============================================
// VARIANTES DE ANIMAÇÃO
// ============================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

// ============================================
// COMPONENTE FOOTER
// ============================================
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Início', href: '#home' },
    { label: 'Serviços', href: '#services' },
    { label: 'Preços', href: '#pricing' },
    { label: 'Contato', href: '#contact' },
  ];

  const socialLinks = [
    {
      icon: FiInstagram,
      href: siteConfig.social.instagram,
      label: 'Instagram',
      color: 'hover:text-pink-500',
    },
    {
      icon: FiFacebook,
      href: siteConfig.social.facebook,
      label: 'Facebook',
      color: 'hover:text-blue-600',
    },
    {
      icon: FiLinkedin,
      href: siteConfig.social.linkedin,
      label: 'LinkedIn',
      color: 'hover:text-blue-700',
    },
    {
      icon: FiMail,
      href: `mailto:${siteConfig.professional.email}`,
      label: 'Email',
      color: 'hover:text-primary-600',
    },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-100 pt-20 pb-8">
      <div className="container-custom">
        {/* ============================================ */}
        {/* CONTEÚDO PRINCIPAL */}
        {/* ============================================ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pb-12 border-b border-neutral-700"
        >
          {/* ============================================ */}
          {/* COLUNA 1 - MARCA */}
          {/* ============================================ */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <div>
                <h3 className="font-bold text-white">Terapias Integradas</h3>
                <p className="text-xs text-neutral-400">Saúde e bem-estar</p>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Oferecendo serviços de fisioterapia, pilates e massoterapia com
              profissionalismo e dedicação.
            </p>
          </motion.div>

          {/* ============================================ */}
          {/* COLUNA 2 - LINKS RÁPIDOS */}
          {/* ============================================ */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-semibold text-white text-lg">Menu</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-neutral-400 hover:text-primary-400 transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* ============================================ */}
          {/* COLUNA 3 - CONTATO */}
          {/* ============================================ */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-semibold text-white text-lg">Contato</h4>
            <div className="space-y-3">
              <a
                href={`tel:${siteConfig.professional.phone}`}
                className="flex items-center gap-2 text-neutral-400 hover:text-primary-400 transition-colors text-sm"
              >
                <FiPhone className="w-4 h-4 flex-shrink-0" />
                {siteConfig.professional.phone}
              </a>
              <a
                href={`mailto:${siteConfig.professional.email}`}
                className="flex items-center gap-2 text-neutral-400 hover:text-primary-400 transition-colors text-sm"
              >
                <FiMail className="w-4 h-4 flex-shrink-0" />
                {siteConfig.professional.email}
              </a>
              <div className="flex items-start gap-2 text-neutral-400 text-sm">
                <FiMapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <span>{siteConfig.professional.address}</span>
              </div>
            </div>
          </motion.div>

          {/* ============================================ */}
          {/* COLUNA 4 - REDES SOCIAIS */}
          {/* ============================================ */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-semibold text-white text-lg">Siga-nos</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    className={`w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-600 hover:text-white transition-all ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* ============================================ */}
        {/* BOTTOM - COPYRIGHT */}
        {/* ============================================ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4 text-center text-neutral-400 text-sm"
        >
          <div className="flex items-center justify-center gap-1">
            <span>© {currentYear} {siteConfig.siteName}.</span>
            <span className="text-neutral-600">Todos os direitos reservados.</span>
          </div>

          {/* Info Profissional */}
          <motion.div variants={itemVariants} className="text-xs text-neutral-500">
            <p>
              {siteConfig.professional.name} • {siteConfig.professional.crefito}
            </p>
          </motion.div>

          {/* Links Legais */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 text-xs"
          >
            <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
              Política de Privacidade
            </a>
            <span className="text-neutral-700">•</span>
            <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
              Termos de Serviço
            </a>
            <span className="text-neutral-700">•</span>
            <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
              Cookies
            </a>
          </motion.div>

          {/* Made with love */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-1 pt-2">
            <span>Feito com</span>
            <FiHeart className="w-4 h-4 text-rose-500" />
            <span>para sua saúde</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
