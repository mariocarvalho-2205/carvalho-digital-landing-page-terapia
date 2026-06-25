// ============================================
// GUIA DE INTEGRAÇÃO N8N
// Arquivo: N8N_INTEGRATION_GUIDE.md
//
// Passo a passo para configurar automações
// ============================================

# 🤖 Guia Completo: Integração N8N

## O que é N8N?

**N8N** é uma plataforma open-source para automação de workflows sem código.

### Vantagens:
- ✅ Integração com 400+ aplicações
- ✅ Interface visual (no-code)
- ✅ Webhooks para receber dados
- ✅ Condições e loops
- ✅ Self-hosted ou cloud
- ✅ Muito mais barato que alternativas

---

## 📋 Opções de Instalação

### 1. N8N Cloud (MAIS FÁCIL)

1. Ir para [n8n.io](https://n8n.io)
2. Sign up (versão free disponível)
3. Começar a criar workflows imediatamente
4. URL público automático para webhooks

**Pros:**
- Sem servidor necessário
- Sempre online
- Suporte incluído

**Contras:**
- Menos controle
- Custo com escalabilidade

---

### 2. N8N Self-Hosted (MAIS CONTROLE)

#### Docker Compose (Recomendado)

```yaml
# docker-compose.yml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=seu-dominio.com
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - N8N_WEBHOOK_TUNNEL_URL=https://seu-dominio.com/
      - GENERIC_TIMEZONE=America/Sao_Paulo
      - DB_TYPE=postgres
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PASSWORD=sua_senha
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PORT=5432
    volumes:
      - ~/.n8n:/home/node/.n8n
    depends_on:
      - postgres

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: n8n
      POSTGRES_PASSWORD: sua_senha
      POSTGRES_DB: n8n
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Rodar:
```bash
docker-compose up -d
```

Acessar: `https://seu-dominio.com`

---

## 🎯 Workflows Recomendados

### Workflow 1: Receber Contato + Enviar WhatsApp

```
Entrada:
  - Webhook (recebe POST do formulário)
  - Dados: name, email, phone, message, service

Processamento:
  - Formatar mensagem
  - Validar telefone

Ação:
  - Enviar via WhatsApp Business API
  - Salvar em Google Sheets
  - Enviar email confirmação

Saída:
  - Resposta 200 OK ao frontend
```

**Criar no N8N:**

1. **Webhook (Trigger)**
   - Tipo: Webhook
   - Método: POST
   - Copiar URL: `https://seu-n8n.com/webhook/contact-form`

2. **Parse JSON**
   - Input: `$json.body`
   - Mapear campos do formulário

3. **WhatsApp (Send)**
   - Integração: WhatsApp Business API
   - Número: `{{ $json.phone }}`
   - Mensagem: `Novo contato: {{ $json.name }}. Mensagem: {{ $json.message }}`

4. **Google Sheets (Append)**
   - Spreadsheet: Criar nova ou existente
   - Sheet: "Contatos"
   - Colunas: name, email, phone, service, date

5. **Gmail (Send)**
   - From: seu-email@gmail.com
   - To: `{{ $json.email }}`
   - Subject: "Recebemos seu contato!"
   - Body: HTML com confirmação

6. **Responder ao Webhook**
   - Status: 200
   - Response: `{ "success": true, "message": "Dados recebidos" }`

---

### Workflow 2: Agendamento de Consulta

```
Entrada:
  - Dados: nome, email, telefone, data, horário, serviço

Processamento:
  - Validar data (não é no passado)
  - Verificar disponibilidade
  - Gerar link de confirmação

Ações:
  - Enviar WhatsApp com link de confirmação
  - Adicionar no Google Calendar
  - Salvar em banco de dados
  - Enviar email com detalhes

Confirmação:
  - Usuário clica link
  - Webhook de confirmação ativa
  - Salvar confirmação
```

**Configuração:**

1. **Webhook - Receber agendamento**
2. **Validação de data**
   - Tipo: "Execute Once" (IF)
   - Condição: data > hoje
3. **Google Calendar (Create)**
   - Calendar: Seu calendário
   - Event title: `Consulta - {{ $json.name }}`
   - Start time: `{{ $json.date }} {{ $json.time }}`
   - Duration: 60 minutes
4. **WhatsApp + Google Sheets + Email**

---

### Workflow 3: Follow-up Automático

```
Entrada:
  - Verificar planilha diariamente
  - Filtrar contatos sem resposta há 3 dias

Ação:
  - Enviar mensagem de follow-up via WhatsApp
  - Registrar data do follow-up

Agendamento:
  - Cron: 09:00 AM todo dia
```

---

## 🔌 Integrações Principais

### WhatsApp Business API

**Configurar:**
1. No N8N, adicionar nó "WhatsApp"
2. Credenciais: 
   - `apiToken`: Seu access token
   - `phoneNumberId`: Seu ID
3. Mapear campos:
   - To: Número destino
   - Message: Texto

**Exemplo:**
```
To: {{ $json.phone }}
Message: Olá {{ $json.name }}, recebemos seu contato!
```

---

### Google Sheets

**Configurar:**
1. Conectar conta Google
2. Escolher spreadsheet
3. Mapear colunas

**Exemplo:**
```
Row content:
- name: {{ $json.name }}
- email: {{ $json.email }}
- phone: {{ $json.phone }}
- service: {{ $json.service }}
- date: {{ $now.toLocaleString() }}
```

---

### Gmail

**Configurar:**
1. Conectar conta Gmail
2. Permitir "Less secure app access"
3. Mapear campos

**Exemplo:**
```
From: seu-email@gmail.com
To: {{ $json.email }}
Subject: Confirmação de contato
Body: 
  <h2>Oi {{ $json.name }}!</h2>
  <p>Recebemos seu contato.</p>
  <p>Responderemos em breve!</p>
```

---

### Google Calendar

**Configurar:**
1. Conectar conta Google
2. Escolher calendário
3. Adicionar evento

```
Title: Consulta de Fisioterapia - {{ $json.name }}
Date: {{ $json.date }}
Time: {{ $json.time }}
Duration: 60 minutes
```

---

### CRM (Opcional)

Para salvar contatos em CRM:

**Pipedrive:**
```
- Lead source: Landing Page
- Name: {{ $json.name }}
- Email: {{ $json.email }}
- Phone: {{ $json.phone }}
- Custom fields: service, source
```

**Salesforce:**
```
- Last Name: {{ $json.name }}
- Email: {{ $json.email }}
- Phone: {{ $json.phone }}
```

---

## 🔑 Configurar Credenciais

### WhatsApp (Meta)

1. [Facebook Developer Portal](https://developers.facebook.com)
2. Seu App > WhatsApp > Configuration
3. Copiar:
   - **Phone Number ID**: `123456789`
   - **Access Token**: `EAAx...` (token longo)
   - **Business Account ID**: `987654321`

**Adicionar no N8N:**
- WhatsApp > Credentials > Create New
- Phone Number ID: ...
- Access Token: ...
- Business Account ID: ...

---

### Google APIs

1. [Google Cloud Console](https://console.cloud.google.com)
2. Criar projeto novo
3. Ativar APIs:
   - Google Sheets API
   - Google Calendar API
   - Gmail API
4. Criar Service Account
5. Fazer download JSON com chaves
6. Adicionar no N8N

---

## 📊 Exemplo: Workflow Completo

```
[Webhook] ← Formulário da landing page
    ↓
[Parse JSON] ← Dados brutos do formulário
    ↓
[Validação] ← Verificar phone e email
    ↓
    ├─→ [WhatsApp] → Enviar para profissional
    ├─→ [Google Sheets] → Salvar contatos
    ├─→ [Gmail] → Email confirmação
    └─→ [Delay] → Aguardar 5 minutos
            ↓
        [Gmail] → Email follow-up
            ↓
        [HTTP] → Responder ao frontend
```

---

## 🧪 Testar Webhook

### Opção 1: cURL

```bash
curl -X POST https://seu-n8n.com/webhook/contact-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "+5511999999999",
    "service": "fisioterapia",
    "message": "Teste de webhook"
  }'
```

### Opção 2: Postman

1. Criar request POST
2. URL: seu webhook
3. Body: JSON com dados
4. Enviar

### Opção 3: Aplicação

Testar com:
```javascript
const response = await sendToN8N({
  name: 'Teste',
  email: 'teste@test.com',
  phone: '+5511999999999',
  message: 'Teste'
}, 'contact-form');
```

---

## 🔐 Segurança

### 1. Validação de Webhook

Adicionar autenticação:

```javascript
// No N8N: Webhook > Authentication
// Tipo: Basic Auth
// Username: seu-username
// Password: sua-senha-forte
```

No frontend:
```javascript
const response = await fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + btoa('username:password'),
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

### 2. Rate Limiting

No N8N:
- Adicionar nó "Limit"
- Max requests: 10 por minuto
- Respeitar limites da API

### 3. Validação de Dados

Sempre validar:
```
- Email: Regex
- Telefone: 10-15 dígitos
- Mensagem: 10-1000 caracteres
- Spam: Verificar palavras bloqueadas
```

---

## 📈 Monitoramento

### Logs

1. N8N Dashboard > Executions
2. Ver histórico de execuções
3. Verificar erros

### Alertas

Adicionar notificação de erro:
```
IF (Error) THEN Send Email Alert
Subject: "⚠️ Erro no webhook de contatos"
To: seu-email@gmail.com
```

---

## 💡 Dicas Avançadas

### 1. Reutilizar Workflows

Usar "Sub Workflows" para não repetir código:
- Criar workflow base (ex: "Validar Dados")
- Chamar de outros workflows

### 2. Variáveis Globais

Armazenar constantes:
```
- Números de telefone
- Emails
- URLs
- Configurações
```

### 3. Backup

Exportar workflows regularmente:
```
Menu > Export Workflow > Save JSON
```

### 4. Versionamento

Renomear versões:
```
"contact-workflow-v1.0"
"contact-workflow-v1.1"
"contact-workflow-v2.0"
```

---

## 🚀 Próximos Passos

1. ✅ Criar conta N8N
2. ✅ Conectar WhatsApp
3. ✅ Criar primeiro webhook
4. ✅ Testar com formulário
5. ✅ Adicionar Google Sheets
6. ✅ Adicionar Email
7. ✅ Deploy em produção
8. ✅ Monitorar execuções

---

## 📚 Recursos

- [N8N Docs](https://docs.n8n.io/)
- [N8N Community](https://community.n8n.io/)
- [Workflow Templates](https://n8n.io/workflows)
- [WhatsApp API Docs](https://developers.facebook.com/docs/whatsapp)

---

## ❓ FAQ

**P: Qual é o limite de mensagens?**
A: Depende do seu plano WhatsApp Business. Geralmente 1000+ por dia.

**P: Posso testar localmente?**
A: Sim, use ngrok: `ngrok http 5678` para expor localhost.

**P: E se o webhook cair?**
A: N8N tenta re-enviar automaticamente (filas).

**P: Quanto custa N8N Cloud?**
A: Free até 100 execuções/mês. Pago a partir disso.

---

## 🎉 Sucesso!

Agora você tem automações poderosas para sua landing page!

**Qualquer dúvida, consulte a documentação oficial.**
