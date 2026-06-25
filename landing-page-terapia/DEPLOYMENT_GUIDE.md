// ============================================
// GUIA DE DEPLOYMENT
// Arquivo: DEPLOYMENT_GUIDE.md
//
// Instruções passo a passo para deploy em produção
// ============================================

# 🚀 Guia de Deployment

Deploy seu landing page em produção de forma segura e profissional.

---

## 🎯 Opções de Deploy

| Plataforma | Dificuldade | Custo | Recomendação |
|-----------|-----------|------|--------------|
| **Vercel** | ⭐ Fácil | Grátis/Pago | ✅ MELHOR |
| **Netlify** | ⭐ Fácil | Grátis/Pago | ✅ BOA |
| **Railway** | ⭐⭐ Médio | Pago | ✅ BOA |
| **Servidor Linux** | ⭐⭐⭐ Difícil | Pago | Avançado |

---

## 🟢 Opção 1: Vercel (RECOMENDADO)

Vercel é a empresa criadora do Next.js. Deploy é automático e super fácil.

### Passo 1: Criar Conta

1. Ir para [vercel.com](https://vercel.com)
2. Sign up com GitHub/GitLab/Bitbucket
3. Confirmar email

### Passo 2: Conectar Repositório

1. Dashboard > New Project
2. Selecionar repositório
3. Vercel detecta automaticamente Next.js
4. Clicar "Deploy"

### Passo 3: Adicionar Domínio

1. Project Settings > Domains
2. Adicionar seu domínio customizado
3. Seguir instruções de DNS

**Registrar Domínio em:**
- [Namecheap](https://www.namecheap.com)
- [GoDaddy](https://www.godaddy.com)
- [Registro.br](https://www.registro.br) (para .br)

### Passo 4: Variáveis de Ambiente

1. Settings > Environment Variables
2. Adicionar `.env.local`:
   ```
   WHATSAPP_API_TOKEN=xxx
   NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID=xxx
   N8N_WEBHOOK_URL=xxx
   [... outros campos ...]
   ```
3. Clicar "Save"

### Passo 5: Deploy Automático

1. Push code para GitHub
2. Vercel automaticamente:
   - Detecta mudanças
   - Faz build
   - Testa
   - Deploy para produção

**Pronto! Site ao vivo em ~2 minutos! 🎉**

### Checklist Vercel

- [ ] Conta criada
- [ ] GitHub conectado
- [ ] Projeto importado
- [ ] Build bem-sucedido
- [ ] Variáveis de ambiente adicionadas
- [ ] Domínio customizado configurado
- [ ] HTTPS funcionando
- [ ] Analytics habilitado

---

## 🔵 Opção 2: Netlify

Alternativa ao Vercel, também bem fácil.

### Passo 1: Criar Conta

1. [netlify.com](https://netlify.com)
2. Sign up
3. Confirmar email

### Passo 2: Conectar Repositório

1. New site from Git
2. Escolher GitHub/GitLab
3. Autorizar Netlify
4. Selecionar repositório

### Passo 3: Configurar Build

Build command: `npm run build`
Publish directory: `.next`

### Passo 4: Variáveis de Ambiente

Site settings > Build & deploy > Environment
Adicionar suas vars

### Passo 5: Deploy

1. Clicar "Deploy site"
2. Aguardar build (2-3 min)
3. Site ao vivo!

### Adicionar Domínio

Site settings > Domain management
Seguir instruções

**Netlify Documentation:**
- [Getting Started](https://docs.netlify.com)
- [Deploy Next.js](https://docs.netlify.com/framework-guides/next-js)

---

## 🟠 Opção 3: Railway

Plataforma moderna para deploy de aplicações.

### Passo 1: Criar Conta

1. [railway.app](https://railway.app)
2. Sign up com GitHub
3. Confirmar

### Passo 2: Novo Projeto

1. Dashboard > New Project
2. Deploy from GitHub
3. Selecionar repositório

### Passo 3: Configuração

Railway detecta automaticamente Next.js

Variáveis de ambiente:
```
WHATSAPP_API_TOKEN=xxx
[... etc ...]
```

### Passo 4: Deploy

1. Criar `Procfile`:
```
web: npm start
```

2. Railway automaticamente:
   - Faz build
   - Deploy
   - Cria URL público

### Adicionar Domínio

Project > Settings > Custom Domain

**Railway Docs:**
- [Deploy Next.js](https://docs.railway.app/frameworks/nextjs)
- [Environment Variables](https://docs.railway.app/develop/variables)

---

## 🔴 Opção 4: Servidor Linux (Avançado)

Para quem quer máximo controle.

### Pré-requisitos

- Servidor Linux (Ubuntu 20.04+)
- Node.js 18+
- PM2 ou Similar
- Nginx ou Apache
- SSL/HTTPS

### Passo 1: Preparar Servidor

```bash
# SSH no servidor
ssh root@seu-servidor

# Atualizar sistema
apt update && apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Instalar PM2 (gerenciador de processos)
npm install -g pm2

# Instalar Nginx
apt install -y nginx
```

### Passo 2: Clonar e Preparar

```bash
# Clonar repositório
cd /var/www
git clone <seu-repo> landing-page-terapia

# Entrar no diretório
cd landing-page-terapia

# Instalar dependências
npm install

# Build
npm run build
```

### Passo 3: Variáveis de Ambiente

```bash
# Criar .env.production
nano .env.production

# Adicionar:
WHATSAPP_API_TOKEN=xxx
[... etc ...]
```

### Passo 4: PM2 Configuration

```bash
# Criar ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'landing-page-terapia',
      script: './node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/landing-page-terapia',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
};
EOF

# Iniciar com PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Passo 5: Nginx Configuration

```bash
# Criar config
nano /etc/nginx/sites-available/terapiasintegradas

# Adicionar:
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Salvar com Ctrl+X, Y, Enter
```

```bash
# Ativar site
ln -s /etc/nginx/sites-available/terapiasintegradas \
      /etc/nginx/sites-enabled/

# Testar config
nginx -t

# Recarregar Nginx
systemctl reload nginx
```

### Passo 6: SSL/HTTPS (Let's Encrypt)

```bash
# Instalar Certbot
apt install -y certbot python3-certbot-nginx

# Gerar certificado
certbot certonly --nginx -d seu-dominio.com -d www.seu-dominio.com

# Auto-renovar
systemctl enable certbot.timer
systemctl start certbot.timer
```

### Passo 7: Atualizar Nginx com SSL

```bash
# Editar config
nano /etc/nginx/sites-available/terapiasintegradas

# Adicionar:
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu-dominio.com www.seu-dominio.com;

    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Testar e recarregar
nginx -t
systemctl reload nginx
```

### Atualizar Código

```bash
# Pull latest
cd /var/www/landing-page-terapia
git pull origin main

# Reinstalar se necessário
npm install

# Build
npm run build

# Restart PM2
pm2 restart landing-page-terapia
```

---

## ✅ Checklist Pré-Produção

### Código
- [ ] Build sem erros: `npm run build`
- [ ] Sem console.errors
- [ ] Sem warnings
- [ ] ESLint passa: `npm run lint`

### Variáveis de Ambiente
- [ ] Todos os `.env` preenchidos
- [ ] Tokens válidos
- [ ] Nenhum token no código

### Segurança
- [ ] HTTPS/SSL ativado
- [ ] Headers de segurança
- [ ] Rate limiting configurado
- [ ] Validação de inputs

### Performance
- [ ] Lighthouse score > 80
- [ ] Imagens otimizadas
- [ ] Cache headers
- [ ] Code splitting funciona

### Funcionalidade
- [ ] Formulário funciona
- [ ] WhatsApp abre
- [ ] Email envia
- [ ] Links funcionam
- [ ] Mobile responsivo
- [ ] Animações suaves

### Analytics
- [ ] Google Analytics adicionado
- [ ] Conversões rastreadas
- [ ] Events configurados

### SEO
- [ ] Meta tags corretas
- [ ] Schema.org JSON-LD
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Open Graph

---

## 📊 Monitoramento Pós-Deploy

### Ferramentas Recomendadas

| Ferramenta | Propósito |
|-----------|-----------|
| Google Analytics | Tráfego e conversões |
| Sentry | Erros em produção |
| UptimeRobot | Monitorar se site está online |
| Google Search Console | Indexação |
| PageSpeed Insights | Performance |

### Google Analytics

1. [analytics.google.com](https://analytics.google.com)
2. Criar property nova
3. Copiar ID: `G-XXXXXXXXXX`
4. Adicionar em `.env.local`
5. Reiniciar servidor

### Sentry (Error Tracking)

1. [sentry.io](https://sentry.io)
2. Sign up
3. Criar projeto Next.js
4. Instalar: `npm install @sentry/nextjs`
5. Configurar em `next.config.js`

### UptimeRobot

1. [uptimerobot.com](https://uptimerobot.com)
2. New Monitor
3. URL: seu-dominio.com
4. Recebe alerta se cair

---

## 🔧 Troubleshooting Deploy

### Erro: "Build failed"

**Solução:**
```bash
npm install
npm run build
# Verificar errors
```

### Erro: "Variáveis de ambiente não encontradas"

**Solução:**
- Verificar `.env.local`
- Adicionar em configuração do host
- Restart servidor

### Erro: "WhatsApp API não funciona"

**Solução:**
- Verificar token em Facebook Developer
- Verificar phone number ID
- Testar localmente primeiro

### Site lento

**Solução:**
```bash
npm run build
# Usar CDN
# Otimizar imagens
# Habilitar caching
```

### Erro de CORS

**Solução:**
- Adicionar headers no `next.config.js`
- Whitelist domínios
- Usar proxy no N8N

---

## 📈 Roadmap Pós-Deployment

### Semana 1
- [ ] Monitorar analytics
- [ ] Testar tudo em produção
- [ ] Corrigir bugs
- [ ] Coletar feedback

### Mês 1
- [ ] Otimizar com base em dados
- [ ] Adicionar mais conteúdo
- [ ] Fazer A/B testing
- [ ] Melhorar conversão

### Mês 2+
- [ ] Adicionar novas seções
- [ ] Integração com mais ferramentas
- [ ] Expandir para outras plataformas
- [ ] Escalar marketing

---

## 💡 Dicas Finais

1. **Faça backup** do código e dados
2. **Monitore** performance e erros
3. **Atualize** dependências regularmente
4. **Teste** antes de fazer deploy
5. **Tenha** plano de contingência

---

## 📚 Recursos Úteis

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Netlify Docs](https://docs.netlify.com)
- [Railway Docs](https://docs.railway.app)
- [Nginx Docs](https://nginx.org/en/docs)

---

## 🎉 Sucesso!

Seu site está ao vivo em produção! 🚀

**Próximos passos:**
1. Divulgar nas redes sociais
2. Otimizar com Google Ads
3. Fazer SEO
4. Coletar leads
5. Converter em clientes

---

**Boa sorte! Você consegue! 💪**
