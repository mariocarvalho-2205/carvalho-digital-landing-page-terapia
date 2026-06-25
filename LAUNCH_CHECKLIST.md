// ============================================
// CHECKLIST DE LANÇAMENTO
// Arquivo: LAUNCH_CHECKLIST.md
//
// Verifique cada item antes de ir ao vivo
// ============================================

# ✅ Checklist de Lançamento

Antes de lançar sua landing page em produção, verifique tudo neste checklist!

---

## 📝 Configuração de Conteúdo

### Profissional
- [ ] Nome completo correto
- [ ] Fotografia de perfil adicionada
- [ ] Biografia completa e profissional
- [ ] Credenciais (CREFITO) verificadas
- [ ] Email verificado e válido
- [ ] Telefone com WhatsApp ativo

### Informações Gerais
- [ ] Descrição do site clara
- [ ] Meta tags preenchidas
- [ ] Palavras-chave relevantes
- [ ] Descrição SEO otimizada
- [ ] Imagem Open Graph (1200x630px)

### Serviços
- [ ] Todos os 6 serviços com descrição
- [ ] Preços atualizados (BRL)
- [ ] Ícones apropriados
- [ ] Benefícios listados
- [ ] Duração de cada sessão clara

### Planos
- [ ] 3 planos com preços
- [ ] Features listadas
- [ ] Descrição clara do diferencial
- [ ] Frequência recomendada
- [ ] Valores promocionais corretos

### Horários de Funcionamento
- [ ] Dias de funcionamento
- [ ] Horários de atendimento
- [ ] Informações sobre agendamento
- [ ] Resposta esperada (SLA)

---

## 📱 Design e UX

### Responsividade
- [ ] Testado em iPhone 12
- [ ] Testado em iPhone 13 Pro Max
- [ ] Testado em Samsung Galaxy S21
- [ ] Testado em iPad
- [ ] Testado em Desktop 1920px
- [ ] Testado em Desktop 2560px
- [ ] Nenhum overflow horizontal
- [ ] Nenhum texto cortado

### Visual
- [ ] Logo em alta qualidade
- [ ] Cores consistentes
- [ ] Tipografia legível
- [ ] Espaçamento adequado
- [ ] Botões visíveis e clicáveis
- [ ] Contraste suficiente (WCAG AA)
- [ ] Imagens otimizadas
- [ ] Nenhuma imagem faltando

### Interatividade
- [ ] Animações suaves
- [ ] Transições fluidas
- [ ] Hover states visíveis
- [ ] Botões respondendo ao clique
- [ ] Links destacados
- [ ] Cursor muda em elementos interativos

---

## 🔗 Links e Navegação

### Links Internos
- [ ] Links de menu funcionam
- [ ] Scroll para seções funciona
- [ ] Âncoras (#) funcionam
- [ ] Nenhum 404 interno

### Links Externos
- [ ] Instagram abre corretamente
- [ ] Facebook abre corretamente
- [ ] LinkedIn abre corretamente
- [ ] Links abrem em aba nova (_blank)

### Botões de Ação
- [ ] Botão WhatsApp funciona
- [ ] Botão Ligar funciona
- [ ] Botões "Saiba Mais" funcionam
- [ ] Botões de CTA destacados
- [ ] Links dinâmicos com mensagens corretas

---

## 💬 Formulário de Contato

### Campos
- [ ] Nome (obrigatório)
- [ ] Email (obrigatório, validado)
- [ ] Telefone (obrigatório, validado)
- [ ] Serviço (dropdown com opções)
- [ ] Mensagem (opcional, 10+ caracteres)
- [ ] ReCAPTCHA (opcional)

### Validação
- [ ] Valida email em tempo real
- [ ] Valida telefone brasileiro
- [ ] Mostra mensagens de erro claras
- [ ] Aceita números com ou sem formatação
- [ ] Não permite envio sem dados obrigatórios

### Envio
- [ ] Integração N8N funcionando
- [ ] WhatsApp recebe mensagem
- [ ] Email de confirmação chega
- [ ] Google Sheets atualiza
- [ ] Mensagem de sucesso exibida
- [ ] Form reseta após envio
- [ ] Tratamento de erros funciona

### Testes
- [ ] Testar com dados válidos
- [ ] Testar com dados inválidos
- [ ] Testar com caracteres especiais
- [ ] Testar com acentuação
- [ ] Testar envio duplicado
- [ ] Verificar spam (não marcar como spam)

---

## 🌐 SEO

### Meta Tags
- [ ] Title tag (60 caracteres)
- [ ] Meta description (160 caracteres)
- [ ] Charset UTF-8
- [ ] Viewport configurado
- [ ] Canonical URL

### Open Graph
- [ ] og:title
- [ ] og:description
- [ ] og:image (1200x630px)
- [ ] og:url
- [ ] og:type

### Twitter Cards
- [ ] twitter:card
- [ ] twitter:title
- [ ] twitter:description
- [ ] twitter:image

### Structured Data (JSON-LD)
- [ ] LocalBusiness schema
- [ ] Telefone
- [ ] Endereço
- [ ] Horários de funcionamento
- [ ] Avaliações (se houver)

### Sitemap e Robots
- [ ] Sitemap.xml gerado
- [ ] Robots.txt configurado
- [ ] Allow: / e Disallow: vazio
- [ ] Sitemap ref no robots.txt

### Keywords
- [ ] Palavras-chave no H1
- [ ] Palavras-chave no título
- [ ] Palavras-chave na descrição
- [ ] Palavra-chave na URL
- [ ] LSI keywords naturais

### Links
- [ ] Nenhum link quebrado
- [ ] Links internos com âncora descritiva
- [ ] Links externos com rel="noopener"
- [ ] Links com texto descritivo

---

## ⚡ Performance

### Velocidade
- [ ] Lighthouse score > 80
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] FCP < 1.8s
- [ ] TTFB < 600ms

### Imagens
- [ ] Todas em WebP/AVIF
- [ ] Responsive (srcset)
- [ ] Lazy loaded
- [ ] Alt text preenchido
- [ ] Tamanho apropriado
- [ ] Comprimidas (< 100KB)

### CSS e JS
- [ ] CSS crítico inlinizado
- [ ] Code splitting funciona
- [ ] JS minificado
- [ ] CSS minificado
- [ ] Nenhuma biblioteca não utilizada

### Caching
- [ ] Cache headers configurados
- [ ] Cache-Control: public, max-age
- [ ] ETag gerado
- [ ] Compressão gzip ativada

---

## 🔒 Segurança

### HTTPS
- [ ] URL começa com https://
- [ ] Certificado válido
- [ ] Sem avisos de segurança
- [ ] HSTS ativado
- [ ] Mixed content corrigido

### Headers de Segurança
- [ ] Content-Security-Policy
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] X-XSS-Protection

### Dados
- [ ] Variáveis sensíveis em .env
- [ ] Nenhum token no código
- [ ] .env.local no .gitignore
- [ ] Sem dados pessoais em logs
- [ ] Validação de inputs

### Credenciais
- [ ] WhatsApp token válido
- [ ] N8N webhook autorizado
- [ ] Rate limiting ativado
- [ ] CORS configurado corretamente
- [ ] Senhas fortes usadas

---

## 📊 Analytics e Tracking

### Google Analytics
- [ ] Conta criada
- [ ] Tag adicionada
- [ ] Conversões rastreadas
- [ ] Eventos mapeados
- [ ] Funis configurados
- [ ] Segmentos criados
- [ ] Dados fluindo corretamente

### Google Search Console
- [ ] Site adicionado
- [ ] Propriedade verificada
- [ ] Sitemap submetido
- [ ] URLs indexadas
- [ ] Sem erros críticos
- [ ] Mobile friendly validado

### Google Tag Manager
- [ ] Container criado
- [ ] Tags configuradas
- [ ] Triggers funcionando
- [ ] Variaáveis mapeadas
- [ ] Events enviando
- [ ] Preview funcionando

### Tracking de Conversões
- [ ] Clique em WhatsApp rastreado
- [ ] Form submission rastreado
- [ ] Chamada rastreado
- [ ] E-mail enviado rastreado
- [ ] Metas em Analytics

---

## 🧪 Testes Funcionais

### Navegador
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Funcionalidades
- [ ] Scroll suave
- [ ] Menu abre/fecha
- [ ] Dropdowns funcionam
- [ ] Modais abrem/fecham
- [ ] Acordeões expandem
- [ ] Carroséis navegam

### Formulário
- [ ] Campo valida obrigatório
- [ ] Email valida formato
- [ ] Telefone valida formato
- [ ] Mensagem de sucesso exibe
- [ ] Mensagem de erro exibe
- [ ] Form pode enviar novamente
- [ ] Captcha funciona (se usado)

### Integração
- [ ] WhatsApp abre link
- [ ] Mensagem pré-preenchida
- [ ] Email abre cliente
- [ ] Telefone abre discador
- [ ] Links sociais abrem

---

## 📲 Mobile Específico

### Tela e Interação
- [ ] Touch-friendly buttons (min 44x44px)
- [ ] Sem pinch-zoom necessário
- [ ] Gestos funcionam (swipe, etc)
- [ ] Keyboard não sobrepõe conteúdo
- [ ] Inputs aparentam corretamente
- [ ] Select dropdown funciona

### Orientação
- [ ] Funciona em portrait
- [ ] Funciona em landscape
- [ ] Rotation não quebra layout
- [ ] Nenhum conteúdo faltando

### Velocidade
- [ ] Carrega rápido em 3G
- [ ] Carrega rápido em 4G
- [ ] Imagens comprimidas
- [ ] Sem excesso de JS

---

## 🎯 Conversão

### CTA
- [ ] Call-to-action visível
- [ ] CTA contrastante
- [ ] CTA copy convincente
- [ ] CTA acima do fold
- [ ] CTA repetida em várias seções

### Trust Signals
- [ ] Informações de contato clara
- [ ] Credenciais visíveis
- [ ] CREFITO exibido
- [ ] Experiência mencionada
- [ ] Depoimentos inclusos

### Redução de Fricção
- [ ] Formulário curto
- [ ] Poucos campos obrigatórios
- [ ] Progresso visual do form
- [ ] Erro explicado claramente
- [ ] Confirmação de envio

---

## 📧 Email

### Configuração
- [ ] Email testado
- [ ] Gmail/Outlook testado
- [ ] Assunto descritivo
- [ ] Remetente correto
- [ ] Template responsivo
- [ ] Links funcionam no email

### Conteúdo
- [ ] Mensagem clara
- [ ] CTA visível
- [ ] Logo do profissional
- [ ] Contato incluído
- [ ] Social links

---

## 🔄 Variáveis de Ambiente

### Produção
- [ ] `.env.local` não commitado
- [ ] Todas as vars preenchidas
- [ ] Nenhuma var vazia (se obrigatória)
- [ ] Tokens válidos
- [ ] URLs corretas (sem localhost)

### Teste
- [ ] Testar com diferentes envs
- [ ] Testar build sem vars
- [ ] Testar build com vars incorretas
- [ ] Verificar fallbacks

---

## 🚀 Antes do Lançamento Final

### 24 Horas Antes
- [ ] Backup completo do código
- [ ] Backup do banco de dados
- [ ] Plano de rollback
- [ ] Contato de suporte pronto
- [ ] Monitoramento preparado

### Dia do Lançamento
- [ ] Comunicado pronto
- [ ] Redes sociais agendadas
- [ ] Email aos contatos agendado
- [ ] Pessoa responsável disponível
- [ ] Monitoramento ativo

### Depois do Lançamento
- [ ] Verificar erros em tempo real
- [ ] Responder a mensagens
- [ ] Monitorar performance
- [ ] Coletar feedback
- [ ] Documentar issues

---

## 📞 Suporte Pós-Lançamento

### Primeiros 7 Dias
- [ ] Responder todos os contatos
- [ ] Corrigir bugs críticos
- [ ] Otimizar com base em feedback
- [ ] Adicionar melhorias rápidas
- [ ] Monitorar conversões

### Primeira Semana
- [ ] Verificar analytics
- [ ] Otimizar títulos/descrições
- [ ] Testar A/B (opcional)
- [ ] Adicionar mais conteúdo
- [ ] Preparar blog/news

### Primeiro Mês
- [ ] Análise completa de dados
- [ ] Otimizações baseadas em dados
- [ ] Novas features
- [ ] Expansão de conteúdo
- [ ] Plano de marketing

---

## 🎉 Parabéns!

Você passou no checklist! Seu site está pronto para ir ao vivo!

**Próximos passos:**
1. ✅ Fazer deploy
2. ✅ Divulgar
3. ✅ Coletar leads
4. ✅ Converter em clientes
5. ✅ Crescer o negócio

---

## 📊 Rastrear Sucesso

Defina métricas:
- KPI: Conversões por semana
- KPI: Tempo médio no site
- KPI: Taxa de rejeição
- KPI: Cost per lead (se pago)
- KPI: ROI (retorno do investimento)

---

## ✨ Bom Lançamento!

Você consegue! 🚀

**Qualquer dúvida, consulte a documentação ou contato suporte.**
