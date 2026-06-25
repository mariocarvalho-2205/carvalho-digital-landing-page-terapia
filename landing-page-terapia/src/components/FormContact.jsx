// ============================================
// COMPONENTE FORM DE CONTATO [CORRIGIDO] funcionando
// Arquivo: src/components/FormContact.jsx
// ============================================

'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSend,
  FiAlertCircle,
  FiCheckCircle,
  FiPhone,
  FiMail,
  FiUser,
  FiMessageSquare,
  FiCalendar,
} from 'react-icons/fi';
import { siteConfig } from '@/lib/siteConfig';
import {
  sendToN8N,
  sendWhatsAppMessage,
  isValidPhone,
  isValidEmail,
} from '@/lib/apiIntegrations';

// ============================================
// VARIANTES DE ANIMAÇÃO
// ============================================
const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.05,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const messageVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

// ============================================
// COMPONENTE FORM
// ============================================
export default function FormContact() {
  // ============================================
  // HOOK DO FORMULÁRIO
  // ============================================
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef(null);

  // ============================================
  // SERVIÇOS PARA DROPDOWN
  // ============================================
  const services = [
    { value: 'geral', label: 'Consulta Geral' },
    { value: 'fisioterapia', label: 'Fisioterapia' },
    { value: 'pilates', label: 'Pilates' },
    { value: 'massoterapia', label: 'Massoterapia' },
    { value: 'fisioterapia-domiciliar', label: 'Fisioterapia Domiciliar' },
  ];

  // ============================================
  // FUNÇÃO DE SUBMISSÃO
  // ============================================
  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Validações adicionais
      if (!isValidPhone(data.phone)) {
        throw new Error('Número de telefone inválido');
      }

      if (!isValidEmail(data.email)) {
        throw new Error('Email inválido');
      }

      // ============================================
      // ✅ CORRIGIDO: Usar NEXT_PUBLIC_ para cliente
      // ============================================
      const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      const hasN8N = n8nWebhookUrl && n8nWebhookUrl.trim() !== '';

      if (hasN8N) {
        try {
          // Enviar para N8N com tratamento de erro
          const n8nResponse = await sendToN8N(
            {
              name: data.name,
              email: data.email,
              phone: data.phone,
              service: data.service,
              message: data.message,
            },
            'contact-form'
          );

          console.log('✅ Formulário enviado para N8N com sucesso:', n8nResponse);
        } catch (n8nError) {
          // Log do erro mas não para a execução se possível
          console.warn('⚠️ Erro ao enviar para N8N:', n8nError);

          // Fallback: enviar direto via WhatsApp API (se disponível)
          if (process.env.WHATSAPP_API_TOKEN) {
            try {
              const whatsappMessage = `
*Novo Contato - Formulário Landing Page*

*Nome:* ${data.name}
*Email:* ${data.email}
*Telefone:* ${data.phone}
*Serviço:* ${data.service}
*Mensagem:* ${data.message}
              `.trim();

              await sendWhatsAppMessage(
                siteConfig.professional.phone,
                whatsappMessage
              );
              console.log('✅ Fallback: Mensagem enviada via WhatsApp API');
            } catch (waError) {
              console.error('❌ Fallback também falhou:', waError);
              throw new Error(
                'N8N e WhatsApp API falharam. ' +
                'Verifique a configuração em .env.local'
              );
            }
          }
        }
      } else {
        throw new Error(
          'N8N não está configurado. ' +
          'Adicione NEXT_PUBLIC_N8N_WEBHOOK_URL ao seu .env.local'
        );
      }

      // ============================================
      // SUCESSO
      // ============================================
      setSuccessMessage(
        'Mensagem enviada com sucesso! Entraremos em contato em breve.'
      );
      reset();

      // Limpar mensagem após 5 segundos
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('❌ Erro ao enviar formulário:', error);
      setErrorMessage(
        error.message || 'Erro ao enviar mensagem. Tente novamente.'
      );

      // Limpar mensagem após 5 segundos
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        {/* ============================================ */}
        {/* HEADER */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-4 mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
            Vamos Conversar
          </span>
          <h2 className="font-sans font-bold text-4xl lg:text-5xl text-neutral-900">
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Preencha o formulário abaixo e responderei em breve. Você também pode
            ligar ou enviar mensagem via WhatsApp.
          </p>
        </motion.div>

        {/* ============================================ */}
        {/* GRID PRINCIPAL */}
        {/* ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ============================================ */}
          {/* COLUNA ESQUERDA - INFORMAÇÕES */}
          {/* ============================================ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-sans font-bold text-2xl text-neutral-900 mb-6">
                Informações de Contato
              </h3>

              {/* Item de contato */}
              <div className="space-y-6">
                {/* Telefone */}
                <motion.a
                  href={`tel:${siteConfig.professional.phone}`}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <FiPhone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Telefone</p>
                    <p className="text-neutral-600">
                      {siteConfig.professional.phone}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Seg-Sex: 9h às 18h
                    </p>
                  </div>
                </motion.a>

                {/* Email */}
                <motion.a
                  href={`mailto:${siteConfig.professional.email}`}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Email</p>
                    <p className="text-neutral-600">
                      {siteConfig.professional.email}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Respondo em até 24h
                    </p>
                  </div>
                </motion.a>

                {/* Horários */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <FiCalendar className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Horários</p>
                    <p className="text-neutral-600 text-sm mt-2 space-y-1">
                      {siteConfig.businessHours.map((h) => (
                        <span key={h.day} className="block">
                          <span className="font-medium">{h.day}:</span> {h.hours}
                        </span>
                      ))}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Profissional Info */}
            <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-rose-50 p-6 border border-primary-100">
              <p className="font-semibold text-neutral-900 mb-2">
                {siteConfig.professional.name}
              </p>
              <p className="text-sm text-neutral-600 mb-3">
                {siteConfig.professional.bio}
              </p>
              <p className="text-xs text-primary-600 font-semibold">
                {siteConfig.professional.crefito}
              </p>
            </div>
          </motion.div>

          {/* ============================================ */}
          {/* COLUNA DIREITA - FORMULÁRIO */}
          {/* ============================================ */}
          <motion.div
            ref={formRef}
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card shadow-medium"
          >
            {/* Mensagens de sucesso/erro */}
            <AnimatePresence>
              {successMessage && (
                <motion.div
                  variants={messageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3"
                >
                  <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-700">{successMessage}</p>
                </motion.div>
              )}

              {errorMessage && (
                <motion.div
                  variants={messageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-center gap-3"
                >
                  <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Formulário */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Nome */}
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  <FiUser className="w-4 h-4 inline mr-2" />
                  Seu Nome *
                </label>
                <input
                  type="text"
                  placeholder="Ana Silva"
                  {...register('name', {
                    required: 'Nome é obrigatório',
                    minLength: {
                      value: 3,
                      message: 'Nome deve ter pelo menos 3 caracteres',
                    },
                  })}
                  className={`${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  <FiMail className="w-4 h-4 inline mr-2" />
                  Seu Email *
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  {...register('email', {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email inválido',
                    },
                  })}
                  className={`${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              {/* Telefone */}
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  <FiPhone className="w-4 h-4 inline mr-2" />
                  Seu Telefone *
                </label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  {...register('phone', {
                    required: 'Telefone é obrigatório',
                    validate: (value) => {
                      if (!isValidPhone(value)) {
                        return 'Telefone inválido';
                      }
                      return true;
                    },
                  })}
                  className={`${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </motion.div>

              {/* Serviço */}
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  <FiCalendar className="w-4 h-4 inline mr-2" />
                  Qual serviço você tem interesse?
                </label>
                <select
                  {...register('service')}
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                >
                  {services.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Mensagem */}
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  <FiMessageSquare className="w-4 h-4 inline mr-2" />
                  Sua Mensagem
                </label>
                <textarea
                  placeholder="Conte-me um pouco mais sobre o que você está procurando..."
                  {...register('message', {
                    minLength: {
                      value: 10,
                      message: 'Mensagem deve ter pelo menos 10 caracteres',
                    },
                  })}
                  className={`${errors.message ? 'border-red-500' : ''}`}
                />
                {errors.message && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </motion.div>

              {/* Botão Submit */}
              <motion.button
                variants={fieldVariants}
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <span>Enviar Mensagem</span>
                    <FiSend className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              {/* Disclaimer */}
              <p className="text-xs text-neutral-500 text-center">
                Seus dados estão seguros e serão usados apenas para responder sua
                mensagem.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}