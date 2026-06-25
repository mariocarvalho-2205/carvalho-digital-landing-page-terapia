# 🌸 Terapias Integradas - Landing Page

Landing page profissional para serviços de fisioterapia, pilates e massoterapia. Construída com **Next.js 14**, **Tailwind CSS**, **Framer Motion** e integração com **WhatsApp API** e **N8N**.

---

## 📋 Índice

- [Características](#características)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Integração WhatsApp](#integração-whatsapp)
- [Integração N8N](#integração-n8n)
- [SEO](#seo)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)

---

## ✨ Características

✅ **Design Moderno e Responsivo**
- Mobile-first design
- Animations com Framer Motion
- Paleta de cores profissional (roxo/ouro)

✅ **Seções Completas**
- Hero section com CTA
- Grid de serviços
- Tabela de preços e planos
- Formulário de contato
- Depoimentos
- Footer com redes sociais

✅ **Integração de Comunicação**
- WhatsApp API (Meta/Official)
- N8N para automações
- Formulário de contato
- Validação de dados

✅ **SEO Profissional**
- Meta tags otimizadas
- Schema.org JSON-LD
- Open Graph
- Twitter Cards
- Google Analytics pronto

✅ **Performance**
- Otimização de imagens
- CSS crítico
- Code splitting
- Lazy loading

---

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Git

### Clonar o Repositório

```bash
git clone <seu-repositorio>
cd landing-page-terapia
```

### Instalar Dependências

```bash
npm install
# ou
yarn install
```

### Configurar Variáveis de Ambiente

```bash
cp .env.local.example .env.local
```

Editar `.env.local` com suas informações (ver seção Configuração abaixo).

### Rodar em Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acessar: `http://localhost:3000`

---

## ⚙️ Configuração

### 1. Informações Básicas

Editar `.env.local`:

```env
NEXT_PUBLIC_APP_NAME=Terapias Integradas - Seu Nome
NEXT_PUBLIC_APP_URL=https://seu-dominio.com

NEXT_PUBLIC_PROFESSIONAL_NAME=Dra. Seu Nome
NEXT_PUBLIC_PROFESSIONAL_PHONE=+55 11 99999-9999
NEXT_PUBLIC_PROFESSIONAL_EMAIL=seu-email@example.com
NEXT_PUBLIC_PROFESSIONAL_CREFITO=CREFITO: 388275-F
```

### 2. Redes Sociais

```env
NEXT_PUBLIC_INSTAGRAM=https://instagram.com/seu-perfil
NEXT_PUBLIC_FACEBOOK=https://facebook.com/sua-pagina
NEXT_PUBLIC_LINKEDIN=https://linkedin.com/in/seu-perfil
```

### 3. Google Analytics

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

---

## 💬 Integração WhatsApp

### Opção 1: WhatsApp API (Meta) - RECOMENDADO

**Melhor para:** Automações, mensagens em escala, tracking.

#### Passo 1: Criar Conta no Facebook Developer Portal

1. Ir para [developers.facebook.com](https://developers.facebook.com)
2. Criar novo app
3. Escolher tipo: "Business"

#### Passo 2: Configurar WhatsApp Business API

1. No seu app, adicionar produto "WhatsApp"
2. Obter:
   - **Phone Number ID** (seu número WhatsApp Business)
   - **Business Account ID**
   - **Access Token** (válido por 24h ou refresh token)
3. Verificar seu número de telefone

#### Passo 3: Adicionar ao .env.local

```env
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID=123456789
WHATSAPP_API_TOKEN=seu_token_longo_aqui
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789
NEXT_PUBLIC_WHATSAPP_API_VERSION=v18.0
NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER=+5511999999999
```

#### Passo 4: Usar no Código

```javascript
import { sendWhatsAppMessage } from '@/lib/apiIntegrations';

// Enviar mensagem
await sendWhatsAppMessage('+5511987654321', 'Olá! Como posso ajudá-lo?');
```

#### Documentação Oficial
- [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [Getting Started](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started)

---

### Opção 2: WhatsApp Web (URL)

**Melhor para:** Links simples, CTAs rápidas, sem backend.

```javascript
import { getWhatsAppWebURL } from '@/lib/apiIntegrations';

const url = getWhatsAppWebURL(
  '+5511999999999',
  'Gostaria de agendar uma consulta'
);
// Resultado: https://wa.me/5511999999999?text=Gostaria+de+agendar...
```

Usar em links:
```html
<a href="https://wa.me/5511999999999?text=Olá">Contate-me</a>
```

---

## 🤖 Integração N8N

### O que é N8N?

N8N é plataforma de automação que permite:
- Receber dados de formulários
- Enviar automaticamente via WhatsApp
- Armazenar em banco de dados
- Enviar emails
- Integrar com CRMs, Sheets, etc.

### Opção 1: N8N Cloud

**Mais fácil, sem servidor necessário.**

1. Criar conta em [n8n.io](https://n8n.io)
2. Criar novo workflow
3. Adicionar trigger "Webhook"
4. Copiar URL do webhook

### Opção 2: N8N Self-Hosted

**Mais controle, requer servidor.**

```bash
docker run -it --rm \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### Configurar Webhook no N8N

#### Passo 1: Criar Workflow

1. Novo workflow
2. Adicionar trigger: "Webhook"
3. Método: POST
4. Copiar URL

#### Passo 2: Adicionar Nós

```
Webhook (entrada)
  ↓
Parse JSON
  ↓
WhatsApp (Send Message)
  ↓
Gmail (Send Email)
  ↓
Sheet (Save Data)
```

#### Passo 3: Configurar WhatsApp no N8N

1. Adicionar nó "WhatsApp"
2. Conectar com sua conta Meta
3. Mapear campos:
   - `to`: {{$json.phone}}
   - `text`: {{$json.message}}

#### Passo 4: Adicionar ao .env.local

```env
N8N_WEBHOOK_URL=https://seu-n8n-instance.com/webhook
N8N_WEBHOOK_AUTH_KEY=sua-chave-secreta
N8N_WORKFLOW_CONTACT_FORM=https://seu-n8n-instance.com/webhook/contact-form
N8N_WORKFLOW_SCHEDULE_APPOINTMENT=https://seu-n8n-instance.com/webhook/appointment
N8N_WORKFLOW_SEND_WHATSAPP=https://seu-n8n-instance.com/webhook/send-whatsapp
```

#### Passo 5: Usar no Código

```javascript
import { sendToN8N } from '@/lib/apiIntegrations';

const response = await sendToN8N({
  name: 'João Silva',
  email: 'joao@email.com',
  phone: '+5511999999999',
  message: 'Gostaria de agendar uma consulta'
}, 'contact-form');
```

---

## 📱 Fluxo de Contato Recomendado

```
Usuário preenche formulário
       ↓
Validação no Frontend
       ↓
Enviar para N8N (webhook)
       ↓
N8N recebe dados
       ↓
├─ Enviar via WhatsApp (profissional)
├─ Enviar email (confirmação)
├─ Salvar em Google Sheets
└─ Integrar com CRM
       ↓
Profissional responde via WhatsApp
       ↓
Conversa natural no WhatsApp
```

---

## 🔍 SEO

### Meta Tags Automáticas

Todos os meta tags estão configurados em:
- `src/app/layout.js` - Tags globais
- `src/app/page.js` - Tags específicas da página

### Dados Estruturados (Schema.org)

```json
{
  "@type": "LocalBusiness",
  "name": "Terapias Integradas",
  "telephone": "+5511999999999",
  "url": "https://terapiasintegradas.com.br",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "São Paulo",
    "addressRegion": "SP"
  }
}
```

### Checklist SEO

- ✅ Título e descrição otimizados
- ✅ Headings (H1, H2, H3) estruturados
- ✅ Open Graph e Twitter Cards
- ✅ Schema.org LocalBusiness
- ✅ Sitemap gerado automaticamente
- ✅ Mobile responsivo (Lighthouse)
- ✅ Google Analytics integrado
- ✅ Velocidade otimizada (Core Web Vitals)

### Adicionar Google Analytics

1. Obter ID: `G-XXXXXXXXXX`
2. Adicionar em `.env.local`
3. Reiniciar servidor

### Enviar para Google Search Console

1. Ir para [search.google.com](https://search.google.com/search-console)
2. Adicionar propriedade
3. Validar domínio
4. Submeter sitemap: `/sitemap.xml`

---

## 🎨 Customização

### Cores

Editar `tailwind.config.js`:

```javascript
colors: {
  primary: { ... },      // Roxo principal
  rose: { ... },        // Rosa/Magenta
  gold: { ... },        // Ouro
}
```

### Fontes

Editar `src/app/layout.js`:

```javascript
import { Poppins, Playfair_Display } from 'next/font/google';
```

### Conteúdo

Editar `src/lib/siteConfig.js`:

```javascript
export const siteConfig = {
  professional: { ... },
  services: [ ... ],
  plans: [ ... ],
}
```

---

## 🚀 Deploy

### Vercel (Recomendado)

1. Push código para GitHub
2. Conectar Vercel a seu repositório
3. Adicionar variáveis de ambiente no Vercel Dashboard
4. Deploy automático em cada push

```bash
vercel
```

### Outros Hosts

- **Netlify**: `npm run build`
- **Railway**: `npm run build && npm start`
- **Heroku**: `npm start` (requer Procfile)
- **Servidor Linux**: usar PM2 ou similar

### Variáveis de Ambiente

Adicionar no seu host:

```
WHATSAPP_API_TOKEN=xxx
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID=xxx
N8N_WEBHOOK_URL=xxx
etc...
```

---

## 📊 Performance

### Checklist Otimização

- ✅ Next.js 14 com App Router
- ✅ Tailwind CSS (production build)
- ✅ Imagens otimizadas (AVIF, WebP)
- ✅ Lazy loading de componentes
- ✅ Code splitting automático
- ✅ CSS crítico inlinizado
- ✅ Compressão gzip/brotli
- ✅ Cache headers configurados

### Medir Performance

```bash
npm run build
npm run start
# Usar lighthouse: https://pagespeed.web.dev
```

---

## 🐛 Troubleshooting

### Erro: "WhatsApp API Token Inválido"

**Solução:**
- Verificar token em Facebook Developer Portal
- Token expira a cada 24h (usar refresh token)
- Adicionar permissão `whatsapp_business_messaging`

### Erro: "Webhook N8N não responde"

**Solução:**
- Verificar URL do webhook está correta
- Testar manualmente: `curl -X POST https://seu-webhook.com`
- Verificar firewall/proxy
- Usar ngrok para testar localmente

### Email não chega

**Solução:**
- Verificar SMTP credentials
- Adicionar seu domínio na whitelist do Gmail
- Usar [nodemailer](https://nodemailer.com)

### Imagens não carregam

**Solução:**
- Adicionar imagens em `/public/images/`
- Usar componente `Image` do Next.js
- Verificar permissões de arquivo

---

## 📚 Recursos Úteis

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [N8N Docs](https://docs.n8n.io/)
- [Vercel Docs](https://vercel.com/docs)

---

## 💡 Dicas Finais

1. **Teste tudo localmente primeiro** antes de fazer deploy
2. **Use variáveis de ambiente** para dados sensíveis (nunca no código)
3. **Monitore Analytics** para entender seu público
4. **A/B teste** diferentes CTAs e copy
5. **Manutença regular** de dependências (`npm update`)
6. **Backup** de dados e códigos
7. **HTTPS sempre** - é obrigatório para WhatsApp API

---

## 👨‍💻 Suporte

Para dúvidas:
- Verificar documentação oficial dos serviços
- Consultar comunidade Next.js/Tailwind
- Abrir issue no repositório do projeto

---

## 📝 Licença

Este projeto é fornecido como template. Customize e use livremente para seu negócio.

---

## ❤️ Feito com Amor

Criado para ajudar profissionais de saúde a crescer seu negócio online.

**Sucesso em sua jornada! 🌟**
