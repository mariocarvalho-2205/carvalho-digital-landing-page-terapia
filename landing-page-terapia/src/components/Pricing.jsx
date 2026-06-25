// ============================================
// COMPONENTE PRICING
// Arquivo: src/components/Pricing.jsx
//
// Seção de preços e planos com toggle
// ============================================

'use client';

import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
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
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    y: -15,
    scale: 1.02,
    transition: {
      duration: 0.3,
    },
  },
};

// ============================================
// COMPONENTE PRICING
// ============================================
export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-neutral-50">
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
            Planos e Preços
          </span>
          <h2 className="font-sans font-bold text-4xl lg:text-5xl text-neutral-900">
            Invista em Sua <span className="text-gradient">Saúde</span>
          </h2>
          <p className="text-lg text-neutral-600">
            Escolha o plano que melhor se adequa às suas necessidades e objetivos.
            Primeira sessão é avaliação gratuita.
          </p>
        </motion.div>

        {/* ============================================ */}
        {/* TABELA DE PREÇOS */}
        {/* ============================================ */}
        <div className="mb-16">
          <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-soft">
            <table className="w-full">
              {/* Header */}
              <thead className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-lg">
                    Serviço
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-lg hidden sm:table-cell">
                    Sessão Avulsa
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-lg hidden md:table-cell">
                    Promoção
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-lg">
                    Ação
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-neutral-200">
                {siteConfig.services.map((service, idx) => (
                  <tr
                    key={service.id}
                    className={`hover:bg-primary-50 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-neutral-900">
                          {service.name}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {service.duration}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center hidden sm:table-cell">
                      <p className="text-xl font-bold text-primary-600">
                        {formatPrice(service.price)}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-center hidden md:table-cell">
                      {service.promotional ? (
                        <>
                          <p className="text-xl font-bold text-rose-600">
                            {formatPrice(service.price)}
                          </p>
                          <p className="text-xs text-neutral-500 line-through">
                            {formatPrice(service.promotional)}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-neutral-500">-</p>
                      )}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <a
                        href={getWhatsAppWebURL(
                          siteConfig.professional.phone,
                          `Gostaria de agendar: ${service.name}`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors text-sm font-semibold"
                      >
                        <span>Agendar</span>
                        <FiArrowRight className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================ */}
        {/* PLANOS MENSAIS */}
        {/* ============================================ */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="font-sans font-bold text-3xl text-neutral-900 mb-2">
              Planos Mensais com Desconto
            </h3>
            <p className="text-neutral-600">
              Comprometa-se com sua saúde e economize com nossos planos mensais
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {siteConfig.plans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                whileHover="hover"
                className={`relative card ${
                  plan.id === 'fisioterapia-plan-10'
                    ? 'ring-2 ring-primary-600 shadow-hard'
                    : ''
                }`}
              >
                {/* Badge Recomendado */}
                {plan.id === 'fisioterapia-plan-10' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-primary-600 text-white text-xs font-bold whitespace-nowrap">
                    ⭐ Mais Popular
                  </div>
                )}

                {/* Header do Plano */}
                <div className="mb-6">
                  <h3 className="font-sans font-bold text-2xl text-neutral-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-neutral-600">{plan.type}</p>
                </div>

                {/* Preço */}
                <div className="mb-6 pb-6 border-b border-neutral-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary-600">
                      {formatPrice(plan.price)}
                    </span>
                    <span className="text-neutral-600 text-sm">/mês</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2">
                    {plan.sessions} sessões • {plan.frequency} • {plan.duration}
                  </p>
                </div>

                {/* Benefícios */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <FiCheck className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={getWhatsAppWebURL(
                    siteConfig.professional.phone,
                    `Gostaria de aderir ao plano: ${plan.name}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full px-6 py-3 rounded-lg font-semibold text-center transition-all ${
                    plan.id === 'fisioterapia-plan-10'
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                  }`}
                >
                  Contratar Plano
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ============================================ */}
        {/* FAQ / INFORMAÇÕES ADICIONAIS */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-soft"
        >
          <h3 className="font-sans font-bold text-2xl text-neutral-900 mb-8">
            Informações Importantes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-neutral-900">
                ✅ Primeira Consulta
              </h4>
              <p className="text-neutral-600 text-sm">
                Avaliação completa gratuita. Entendemos suas necessidades,
                limitações e objetivos para montar um plano personalizado.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-neutral-900">
                ✅ Flexibilidade
              </h4>
              <p className="text-neutral-600 text-sm">
                Altere de plano a qualquer momento. Sem cancelamentos
                automáticos. Você tem controle total.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-neutral-900">
                ✅ Local
              </h4>
              <p className="text-neutral-600 text-sm">
                Escolha entre atendimento em clínica ou domiciliar. Maior
                comodidade e adaptação ao seu estilo de vida.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-neutral-900">
                ✅ Profissional Qualificada
              </h4>
              <p className="text-neutral-600 text-sm">
                {siteConfig.professional.name} • {siteConfig.professional.crefito}
                • Especializada em terapias integrativas
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
