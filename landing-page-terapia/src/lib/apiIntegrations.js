// ============================================
// UTILITÁRIOS PARA INTEGRAÇÃO COM APIS
// Arquivo: src/lib/apiIntegrations.js
//
// Este arquivo contém funções para integrar com:
// - WhatsApp Business API (Meta)
// - N8N (Automação)
// - Formulários de contato
// ============================================

/**
 * ============================================
 * INTEGRAÇÃO WHATSAPP API (Meta/Oficial)
 * ============================================
 * 
 * DOCUMENTAÇÃO: https://developers.facebook.com/docs/whatsapp/cloud-api
 * 
 * CONFIGURAÇÃO:
 * 1. Criar app no Facebook Developer Portal
 * 2. Solicitar acesso ao WhatsApp Business API
 * 3. Obter:
 *    - Phone Number ID
 *    - Business Account ID
 *    - Access Token
 * 4. Armazenar em .env.local
 */

/**
 * Enviar mensagem via WhatsApp API (Meta)
 * @param {string} phoneNumber - Número do destinatário (+55 11 999999999)
 * @param {string} message - Mensagem a enviar
 * @returns {Promise<object>} Resposta da API
 * 
 * Opção 1: WhatsApp API Oficial (Recomendado)
 */
export const sendWhatsAppMessage = async (phoneNumber, message) => {
  try {
    const response = await fetch(
      `https://graph.instagram.com/${process.env.NEXT_PUBLIC_WHATSAPP_API_VERSION}/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: phoneNumber.replace(/\D/g, ''), // Remove caracteres não numéricos
          type: 'text',
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`WhatsApp API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar mensagem WhatsApp:', error);
    throw error;
  }
};

/**
 * Enviar mensagem via WhatsApp Web (URL)
 * Alternativa: Redireciona para WhatsApp Web
 * Útil para CTA em landing pages
 * 
 * @param {string} phoneNumber - Número (+5511999999999)
 * @param {string} message - Mensagem pré-preenchida
 * @returns {string} URL do WhatsApp
 */
export const getWhatsAppWebURL = (phoneNumber, message = '') => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

/**
 * ============================================
 * INTEGRAÇÃO N8N (AUTOMAÇÃO)
 * ============================================
 * 
 * DOCUMENTAÇÃO: https://docs.n8n.io/
 * 
 * CONFIGURAÇÃO:
 * 1. Criar conta em n8n.io (cloud) ou self-hosted
 * 2. Criar webhooks para:
 *    - Receber formulários de contato
 *    - Agendar consultas
 *    - Enviar mensagens via WhatsApp
 * 3. Copiar URL dos webhooks para .env.local
 * 4. Adicionar autenticação se necessário
 */

/**
 * Enviar dados de formulário para N8N
 * @param {object} formData - Dados do formulário
 * @param {string} workflowType - Tipo de workflow ('contact', 'appointment', etc)
 * @returns {Promise<object>} Resposta do webhook
 */
export const sendToN8N = async (formData, workflowType = 'contact-form') => {
  try {
    // Definir URL do webhook baseado no tipo
    let webhookUrl = process.env.N8N_WEBHOOK_URL;
    
    switch (workflowType) {
      case 'contact-form':
        webhookUrl = process.env.N8N_WORKFLOW_CONTACT_FORM;
        break;
      case 'appointment':
        webhookUrl = process.env.N8N_WORKFLOW_SCHEDULE_APPOINTMENT;
        break;
      case 'whatsapp':
        webhookUrl = process.env.N8N_WORKFLOW_SEND_WHATSAPP;
        break;
      default:
        webhookUrl = "process.env.N8N_WEBHOOK_URL";
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Adicionar autenticação se necessário
        ...(process.env.N8N_WEBHOOK_AUTH_KEY && {
          'Authorization': `Bearer ${process.env.N8N_WEBHOOK_AUTH_KEY}`,
        }),
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'landing-page',
      }),
    });

    if (!response.ok) {
      throw new Error(`N8N Webhook Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar dados para N8N:', error);
    throw error;
  }
};

/**
 * ============================================
 * FUNÇÕES PARA ESCOLHER ENTRE APIs
 * ============================================
 */

/**
 * Enviar mensagem com automação
 * Tenta N8N primeiro, depois WhatsApp API
 * 
 * OPÇÃO 1: Usar N8N + WhatsApp (Recomendado para maior automação)
 * - N8N processa dados
 * - N8N envia via WhatsApp
 * 
 * OPÇÃO 2: Enviar direto pela WhatsApp API
 * - Mais rápido
 * - Menos flexibilidade
 */
export const sendContactMessage = async (
  phoneNumber,
  message,
  useN8N = true
) => {
  try {
    if (useN8N && process.env.N8N_WORKFLOW_SEND_WHATSAPP) {
      // Opção 1: Enviar via N8N (mais automação)
      return await sendToN8N(
        {
          phone: phoneNumber,
          message: message,
        },
        'whatsapp'
      );
    } else {
      // Opção 2: Enviar direto pela WhatsApp API (mais rápido)
      return await sendWhatsAppMessage(phoneNumber, message);
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error;
  }
};

/**
 * ============================================
 * INTEGRAÇÃO COM FORMULÁRIOS
 * ============================================
 */

/**
 * Processar submissão de formulário de contato
 * Envia para N8N que dispara automações
 */
export const handleContactFormSubmit = async (formData) => {
  try {
    const processedData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject || 'Consulta geral',
      message: formData.message,
      service: formData.service || 'geral',
      timestamp: new Date().toISOString(),
    };

    // Enviar para N8N
    const response = await sendToN8N(processedData, 'contact-form');

    return {
      success: true,
      message: 'Mensagem enviada com sucesso!',
      data: response,
    };
  } catch (error) {
    console.error('Erro ao processar formulário:', error);
    return {
      success: false,
      message: 'Erro ao enviar mensagem. Tente novamente.',
      error: error.message,
    };
  }
};

/**
 * ============================================
 * VALIDAÇÕES
 * ============================================
 */

/**
 * Validar formato de número de telefone
 * @param {string} phone - Número de telefone
 * @returns {boolean} Se é válido
 */
export const isValidPhone = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '');
  // Aceita números com 10-15 dígitos (padrão internacional)
  return cleanPhone.length >= 10 && cleanPhone.length <= 15;
};

/**
 * Validar email
 * @param {string} email - Email
 * @returns {boolean} Se é válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * ============================================
 * UTILITÁRIOS
 * ============================================
 */

/**
 * Formatar número de telefone brasileiro
 * @param {string} phone - Número bruto
 * @returns {string} Número formatado
 */
export const formatPhoneBR = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  
  // Formato: +55 11 99999-9999
  if (cleaned.length === 13 && cleaned.startsWith('55')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
  }
  
  // Formato: (11) 99999-9999
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
};

/**
 * Log seguro de erros (sem expor dados sensíveis)
 */
export const logError = (context, error) => {
  if (process.env.DEBUG_MODE === 'true') {
    console.error(`[${context}]`, error);
  }
};

/**
 * ============================================
 * TESTES (para desenvolvimento)
 * ============================================
 */

/**
 * Testar conexão com WhatsApp API
 */
export const testWhatsAppAPI = async () => {
  try {
    const response = await fetch(
      `https://graph.instagram.com/${process.env.NEXT_PUBLIC_WHATSAPP_API_VERSION}/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
        },
      }
    );

    if (response.ok) {
      console.log('✅ WhatsApp API conectada com sucesso');
      return true;
    } else {
      console.error('❌ Erro na conexão com WhatsApp API');
      return false;
    }
  } catch (error) {
    console.error('❌ Erro ao testar WhatsApp API:', error);
    return false;
  }
};

/**
 * Testar conexão com N8N
 */
export const testN8NWebhook = async () => {
  try {
    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.N8N_WEBHOOK_AUTH_KEY && {
          'Authorization': `Bearer ${process.env.N8N_WEBHOOK_AUTH_KEY}`,
        }),
      },
      body: JSON.stringify({ test: true }),
    });

    if (response.ok) {
      console.log('✅ N8N Webhook conectado com sucesso');
      return true;
    } else {
      console.error('❌ Erro na conexão com N8N Webhook');
      return false;
    }
  } catch (error) {
    console.error('❌ Erro ao testar N8N Webhook:', error);
    return false;
  }
};
