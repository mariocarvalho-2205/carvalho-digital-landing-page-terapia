// ============================================
// UTILITÁRIOS PARA INTEGRAÇÃO COM APIS [CORRIGIDO]
// Arquivo: src/lib/apiIntegrations.js
// ============================================

/**
 * ============================================
 * INTEGRAÇÃO N8N (AUTOMAÇÃO)
 * ============================================
 * 
 * DOCUMENTAÇÃO: https://docs.n8n.io/
 * 
 * CONFIGURAÇÃO:
 * 1. Variáveis no .env.local DEVEM ter NEXT_PUBLIC_
 * 2. Use as URLs fornecidas pelo N8N nos seus webhooks
 * 3. Para TESTE: https://n.msautosystems.tech/webhook-test/carvalho-digital-terapia
 * 4. Para PRODUÇÃO: https://n.msautosystems.tech/webhook/carvalho-digital-terapia
 */

/**
 * Enviar dados de formulário para N8N
 * @param {object} formData - Dados do formulário
 * @param {string} workflowType - Tipo de workflow ('contact', 'appointment', etc)
 * @returns {Promise<object>} Resposta do webhook
 */
export const sendToN8N = async (formData, workflowType = 'contact-form') => {
  try {
    // ✅ CORRIGIDO: Sem aspas em volta da variável de ambiente
    let webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    
    switch (workflowType) {
      case 'contact-form':
        webhookUrl = process.env.NEXT_PUBLIC_N8N_WORKFLOW_CONTACT_FORM || webhookUrl;
        break;
      case 'appointment':
        webhookUrl = process.env.NEXT_PUBLIC_N8N_WORKFLOW_SCHEDULE_APPOINTMENT || webhookUrl;
        break;
      case 'whatsapp':
        webhookUrl = process.env.NEXT_PUBLIC_N8N_WORKFLOW_SEND_WHATSAPP || webhookUrl;
        break;
      default:
        // ✅ CORRIGIDO: Sem aspas! Era "process.env..." (string literal)
        webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    }

    // Validar se a URL está disponível
    if (!webhookUrl) {
      throw new Error(
        `N8N webhook URL não configurada. ` +
        `Adicione NEXT_PUBLIC_N8N_WEBHOOK_URL ao seu .env.local`
      );
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Adicionar autenticação apenas se existir chave configurada
        ...(process.env.NEXT_PUBLIC_N8N_WEBHOOK_AUTH_KEY && {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_N8N_WEBHOOK_AUTH_KEY}`,
        }),
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'landing-page',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`N8N Webhook Error (${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar dados para N8N:', error);
    throw error;
  }
};

/**
 * ============================================
 * INTEGRAÇÃO WHATSAPP API (Meta/Oficial)
 * ============================================
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
          to: phoneNumber.replace(/\D/g, ''),
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

export const getWhatsAppWebURL = (phoneNumber, message = '') => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

/**
 * ============================================
 * FUNÇÕES PARA ESCOLHER ENTRE APIs
 * ============================================
 */

export const sendContactMessage = async (
  phoneNumber,
  message,
  useN8N = true
) => {
  try {
    // ✅ CORRIGIDO: Usar variável com NEXT_PUBLIC_
    if (useN8N && process.env.NEXT_PUBLIC_N8N_WORKFLOW_SEND_WHATSAPP) {
      return await sendToN8N(
        {
          phone: phoneNumber,
          message: message,
        },
        'whatsapp'
      );
    } else {
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

export const isValidPhone = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 15;
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * ============================================
 * UTILITÁRIOS
 * ============================================
 */

export const formatPhoneBR = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 13 && cleaned.startsWith('55')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
  }
  
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
};

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
 * Testar conexão com N8N
 */
export const testN8NWebhook = async () => {
  try {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('❌ N8N URL não configurada em .env.local');
      return false;
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.NEXT_PUBLIC_N8N_WEBHOOK_AUTH_KEY && {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_N8N_WEBHOOK_AUTH_KEY}`,
        }),
      },
      body: JSON.stringify({ 
        test: true,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      console.log('✅ N8N Webhook conectado com sucesso');
      console.log('URL:', webhookUrl);
      return true;
    } else {
      console.error('❌ Erro na conexão com N8N Webhook');
      console.error('Status:', response.status);
      console.error('Response:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('❌ Erro ao testar N8N Webhook:', error);
    return false;
  }
};

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