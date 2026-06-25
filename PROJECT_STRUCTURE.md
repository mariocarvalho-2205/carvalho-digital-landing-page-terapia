// ============================================
// ESTRUTURA DO PROJETO
// Arquivo: PROJECT_STRUCTURE.md
// ============================================

# 📁 Estrutura do Projeto

```
landing-page-terapia/
│
├── 📄 package.json                    # Dependências e scripts
├── 📄 .env.local                     # Variáveis de ambiente (não commitar)
├── 📄 .env.local.example             # Template do .env.local
├── 📄 .gitignore                     # Arquivos ignorados pelo git
├── 📄 .eslintrc.json                 # Configuração ESLint
│
├── 📄 next.config.js                 # Configuração Next.js
├── 📄 tailwind.config.js             # Configuração Tailwind CSS
├── 📄 postcss.config.js              # Configuração PostCSS
│
├── 📚 README.md                      # Documentação completa
├── 📚 QUICK_START.md                 # Guia rápido de início
├── 📚 N8N_INTEGRATION_GUIDE.md       # Guia de integração N8N
├── 📚 PROJECT_STRUCTURE.md           # Este arquivo
│
├── 📁 src/
│   │
│   ├── 📁 app/                       # App Router do Next.js 14
│   │   ├── 📄 layout.js              # Layout raiz com metadados SEO
│   │   ├── 📄 page.js                # Página principal
│   │   └── 📄 globals.css            # Estilos globais
│   │
│   ├── 📁 components/                # Componentes React reutilizáveis
│   │   ├── 📄 Header.jsx             # Navegação e menu
│   │   ├── 📄 Hero.jsx               # Seção hero/banner
│   │   ├── 📄 Services.jsx           # Grid de serviços
│   │   ├── 📄 Pricing.jsx            # Tabela de preços e planos
│   │   ├── 📄 FormContact.jsx        # Formulário de contato
│   │   └── 📄 Footer.jsx             # Rodapé
│   │
│   └── 📁 lib/                       # Utilitários e configurações
│       ├── 📄 siteConfig.js          # Configurações globais do site
│       └── 📄 apiIntegrations.js     # Funções para integração com APIs
│
├── 📁 public/                        # Arquivos estáticos (servidos diretamente)
│   ├── 📁 images/                    # Imagens (adicione aqui)
│   ├── 📁 fonts/                     # Fontes customizadas
│   ├── 📄 favicon.ico                # Ícone do site
│   ├── 📄 manifest.json              # PWA manifest
│   └── 📄 robots.txt                 # Instruções para bots
│
└── 📁 .next/                         # Build output (gerado automaticamente)
```

---

## 📋 Descrição de Cada Arquivo

### Configuração (Root)

| Arquivo | Propósito |
|---------|-----------|
| `package.json` | Dependências npm e scripts |
| `.env.local` | Variáveis de ambiente (não commitar) |
| `.gitignore` | Arquivos não versionados |
| `.eslintrc.json` | Linting de código |
| `next.config.js` | Configuração Next.js |
| `tailwind.config.js` | Temas e cores Tailwind |
| `postcss.config.js` | Processamento CSS |

### Documentação

| Arquivo | Conteúdo |
|---------|----------|
| `README.md` | Documentação completa do projeto |
| `QUICK_START.md` | Guia para começar em 10 minutos |
| `N8N_INTEGRATION_GUIDE.md` | Guia detalhado de integração N8N |

### Código Fonte (`src/`)

#### App Layer (`src/app/`)

```
layout.js
├── Metadados SEO globais
├── Importação de fontes Google
├── Google Analytics
├── JSON-LD schema
└── Estrutura HTML base

page.js
├── Integra todos os componentes
├── Metadados específicos
└── Exporta componentes principais

globals.css
├── Reset de estilos
├── Variáveis CSS
├── Tipografia
├── Animações
├── Componentes customizados
└── Acessibilidade
```

#### Componentes (`src/components/`)

```
Header.jsx
├── Navegação responsiva
├── Menu mobile
├── Botões CTA (WhatsApp, Ligar)
└── Animações Framer Motion

Hero.jsx
├── Banner principal
├── Headlines e copy
├── Highlights
├── CTAs
├── Decorações animadas
└── Stats

Services.jsx
├── Grid de serviços
├── Cards com ícones
├── Preços
├── Botões "Saiba Mais"
└── Diferenciais

Pricing.jsx
├── Tabela de preços
├── Planos mensais
├── Comparison cards
└── Informações adicionais

FormContact.jsx
├── Formulário com validação
├── Integração WhatsApp API
├── Integração N8N
├── Mensagens de sucesso/erro
└── Informações de contato

Footer.jsx
├── Links rápidos
├── Redes sociais
├── Informações de contato
├── Copyright
└── Links legais
```

#### Biblioteca (`src/lib/`)

```
siteConfig.js
├── Configurações globais
├── Profissional info
├── Serviços e preços
├── Planos
├── Horários
├── Depoimentos
├── Funções auxiliares
└── SEO keywords

apiIntegrations.js
├── Funções WhatsApp API
├── Funções N8N
├── Validações
├── Formatações
├── Utilitários
└── Testes (dev)
```

### Arquivos Públicos (`public/`)

```
images/
├── og-image.jpg (para redes sociais)
├── twitter-image.jpg
├── hero-bg.jpg (hero section)
├── testimonial-*.jpg (depoimentos)
└── [adicione suas imagens aqui]

favicon.ico (ícone do site)
manifest.json (PWA)
robots.txt (SEO)
```

---

## 🔄 Fluxo de Dados

```
Usuário acessa landing page
            ↓
Next.js carrega página (layout.js + page.js)
            ↓
Renderiza componentes:
├─ Header (navegação)
├─ Hero (banner)
├─ Services (serviços)
├─ Pricing (preços)
├─ FormContact (formulário)
└─ Footer (rodapé)
            ↓
Usuário interage (clica em botão)
            ↓
FormContact:
├─ Valida dados (apiIntegrations.js)
├─ Envia para N8N (webhook)
└─ N8N processa e envia via WhatsApp
```

---

## 📊 Componentes e Suas Responsabilidades

### Header
- ✅ Navegação principal
- ✅ Menu responsivo
- ✅ Botões CTA
- ✅ Logo/branding
- ✅ Sticky no scroll

### Hero
- ✅ Primeira impressão
- ✅ Headlines
- ✅ Descrição
- ✅ CTAs principais
- ✅ Highlights (3 pontos)
- ✅ Imagem/decoração

### Services
- ✅ Grid de 6 serviços
- ✅ Ícones
- ✅ Descrição
- ✅ Preço
- ✅ Links "Saiba Mais"
- ✅ Seção de diferenciais
- ✅ Call-to-action final

### Pricing
- ✅ Tabela de preços
- ✅ 3 planos mensais
- ✅ Comparação de features
- ✅ Informações adicionais
- ✅ Responsivo

### FormContact
- ✅ 5 campos (nome, email, phone, service, message)
- ✅ Validação em tempo real
- ✅ Integração WhatsApp API
- ✅ Integração N8N
- ✅ Mensagens de sucesso/erro
- ✅ Informações de contato ao lado

### Footer
- ✅ Links rápidos
- ✅ Contato
- ✅ Redes sociais
- ✅ Copyright
- ✅ Links legais

---

## 🎨 Temas e Estilos

### Paleta de Cores

```
Primary (Roxo): #a855f7
├─ Light: #f3e8ff
├─ Dark: #7e22ce
└─ Gradient: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)

Rose (Magenta): #ff6b35
Gold (Amarelo): #f59e0b
Success (Verde): #10b981
Error (Vermelho): #ef4444
```

### Tipografia

```
Headings: Playfair Display (serif)
Body: Poppins (sans-serif)
Sizes: 6xl, 5xl, 4xl, 3xl, 2xl, xl, lg, base, sm, xs
```

---

## 🚀 Scripts Disponíveis

```bash
npm run dev        # Rodar em desenvolvimento (port 3000)
npm run build      # Fazer build para produção
npm start          # Rodar build de produção
npm run lint       # Validar código com ESLint
npm run export     # Export estático (opcional)
```

---

## 📈 Performance

### Otimizações Implementadas

- ✅ Image optimization (next/image)
- ✅ Code splitting automático
- ✅ CSS crítico inlinizado
- ✅ Lazy loading de componentes
- ✅ Minificação de CSS/JS
- ✅ Compressão de assets
- ✅ Cache headers
- ✅ SEO otimizado

### Métricas Core Web Vitals

Alvo:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

Testar em: [PageSpeed Insights](https://pagespeed.web.dev)

---

## 🔒 Segurança

### Implementado

- ✅ HTTPS em produção
- ✅ Content Security Policy
- ✅ Validação de inputs
- ✅ Rate limiting no N8N
- ✅ Tokens em environment variables
- ✅ .env.local no .gitignore
- ✅ Sanitização de dados

### Checklist Segurança

- [ ] Nunca commitar .env.local
- [ ] Usar HTTPS em produção
- [ ] Validar todos os inputs
- [ ] Usar rate limiting
- [ ] Manter dependências atualizadas
- [ ] Fazer backup de dados

---

## 📱 Responsividade

### Breakpoints Tailwind

```
xs: 0px
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Testado em

- ✅ Mobile (iPhone, Android)
- ✅ Tablet (iPad, Android tablet)
- ✅ Desktop (1920px+)

---

## 🧪 Testes

### Checklist de Testes

- [ ] Formulário funciona
- [ ] WhatsApp abre corretamente
- [ ] Email chega
- [ ] Mobile responsivo
- [ ] Animações suaves
- [ ] Links funcionam
- [ ] Imagens carregam
- [ ] Performance boa (Lighthouse)

---

## 📚 Recursos Externos

### Documentação

- [Next.js 14](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com)

### APIs

- [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [N8N](https://docs.n8n.io)
- [Google Analytics](https://analytics.google.com)

---

## 🔄 Git Workflow

```bash
# Criar branch
git checkout -b feature/nova-secao

# Fazer mudanças
# ...

# Commit
git add .
git commit -m "feat: nova seção adicionada"

# Push
git push origin feature/nova-secao

# Pull request
# ...

# Merge e deploy
```

---

## 💾 Backup e Versionamento

### Importante Fazer Backup De:

- `.env.local` (em local seguro)
- `src/lib/siteConfig.js` (dados profissional)
- Código customizado
- Banco de dados (Google Sheets)

### Versionamento

```
v1.0.0 - Lançamento inicial
v1.1.0 - Novos serviços adicionados
v2.0.0 - Redesign completo
```

---

## 🎯 Próximos Passos

1. Customizar conteúdo (`siteConfig.js`)
2. Adicionar imagens (`public/images/`)
3. Configurar WhatsApp
4. Configurar N8N
5. Fazer deploy
6. Testar em produção
7. Monitorar analytics

---

## ❓ Dúvidas Frequentes

**P: Como adicionar um novo serviço?**
R: Editar `siteConfig.js` > services array

**P: Como mudar as cores?**
R: Editar `tailwind.config.js` > colors

**P: Como adicionar uma nova página?**
R: Criar arquivo em `src/app/[pagename]/page.js`

**P: Como mudar fontes?**
R: Editar `src/app/layout.js` > imports de fonts

---

## 📞 Suporte

Se tiver dúvidas:
1. Verificar README.md
2. Consultar documentação oficial
3. Abrir issue no repositório
4. Procurar comunidade online

---

**Boa sorte com seu projeto! 🚀**
