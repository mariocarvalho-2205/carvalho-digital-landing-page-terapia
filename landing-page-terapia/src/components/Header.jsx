// ============================================
// COMPONENTE HEADER/NAVBAR
// Arquivo: src/components/Header.jsx
//
// Navegação responsiva com animações Framer Motion
// ============================================

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FiMenu,
  FiX,
  FiPhone,
  FiMessageCircle,
  FiHome,
  FiAward,
  FiShoppingBag,
  FiFileText,
  FiMail,
} from 'react-icons/fi';
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
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.2,
    },
  },
};

// ============================================
// COMPONENTE HEADER
// ============================================
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ============================================
  // EFEITOS
  // ============================================
  useEffect(() => {
    // Detectar scroll para mudar estilo do header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ============================================
  // NAVEGAÇÃO LINKS
  // ============================================
  const navLinks = [
    { label: 'Início', href: '#home', icon: FiHome },
    { label: 'Serviços', href: '#services', icon: FiAward },
    { label: 'Preços', href: '#pricing', icon: FiShoppingBag },
    { label: 'Sobre', href: '#about', icon: FiFileText },
    { label: 'Contato', href: '#contact', icon: FiMail },
  ];

  // ============================================
  // FUNÇÃO PARA FECHAR MENU AO CLICAR
  // ============================================
  const handleNavClick = (href) => {
    setIsOpen(false);
    // Scroll para seção (implementar conforme necessário)
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-medium'
          : 'bg-gradient-to-b from-white to-transparent'
      }`}
    >
      <div className="container-custom py-4 flex items-center justify-between">
        {/* ============================================ */}
        {/* LOGO */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <Link href="#home" className="flex items-center gap-2">
            {/* Logo de exemplo - substituir com svg real */}
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-sans font-bold text-primary-700 text-lg leading-none">
                Terapias
              </h1>
              <p className="text-xs text-primary-600 font-medium">Integradas</p>
            </div>
          </Link>
        </motion.div>

        {/* ============================================ */}
        {/* NAVEGAÇÃO DESKTOP */}
        {/* ============================================ */}
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex items-center gap-1"
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={itemVariants}>
              <a
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </a>
            </motion.div>
          ))}
        </motion.nav>

        {/* ============================================ */}
        {/* BOTÕES CTA DESKTOP */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="hidden lg:flex items-center gap-3"
        >
          {/* Botão WhatsApp */}
          <a
            href={getWhatsAppWebURL(siteConfig.professional.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors font-medium text-sm"
            aria-label="Contatar via WhatsApp"
          >
            <FiMessageCircle className="w-5 h-5" />
            <span className="hidden xl:inline">WhatsApp</span>
          </a>

          {/* Botão Ligar */}
          <a
            href={`tel:${siteConfig.professional.phone}`}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors font-medium text-sm"
            aria-label="Ligar para profissional"
          >
            <FiPhone className="w-5 h-5" />
            <span className="hidden xl:inline">Ligar</span>
          </a>
        </motion.div>

        {/* ============================================ */}
        {/* BOTÃO MENU MOBILE */}
        {/* ============================================ */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </motion.button>
      </div>

      {/* ============================================ */}
      {/* MENU MOBILE */}
      {/* ============================================ */}
      {isOpen && (
        <motion.nav
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-hard border-t border-neutral-200"
        >
          <div className="container-custom py-6 flex flex-col gap-4">
            {/* Links de navegação */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.href}
                    variants={itemVariants}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-700 hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium"
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Divisor */}
            <div className="h-px bg-neutral-200 my-2" />

            {/* Botões CTA Mobile */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <motion.a
                variants={itemVariants}
                href={getWhatsAppWebURL(siteConfig.professional.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors font-medium w-full"
              >
                <FiMessageCircle className="w-5 h-5" />
                WhatsApp
              </motion.a>

              <motion.a
                variants={itemVariants}
                href={`tel:${siteConfig.professional.phone}`}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors font-medium w-full"
              >
                <FiPhone className="w-5 h-5" />
                Ligar Agora
              </motion.a>
            </motion.div>

            {/* Informações de contato */}
            <motion.div
              variants={itemVariants}
              className="mt-4 pt-4 border-t border-neutral-200 text-center"
            >
              <p className="text-sm text-neutral-600 mb-2">
                {siteConfig.professional.name}
              </p>
              <p className="text-xs text-neutral-500">
                {siteConfig.professional.crefito}
              </p>
            </motion.div>
          </div>
        </motion.nav>
      )}
    </header>
  );
}
