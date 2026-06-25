// ============================================
// GUIA RÁPIDO DE INÍCIO
// Arquivo: QUICK_START.md
// ============================================

# ⚡ Quick Start - Comece em 10 Minutos!

## 1️⃣ Instalação (2 minutos)

```bash
# Clone ou baixe o projeto
git clone <seu-repo>
cd landing-page-terapia

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.local.example .env.local
nano .env.local  # Edite com seus dados
```

## 2️⃣ Customize o Conteúdo (3 minutos)

Edite `src/lib/siteConfig.js`:

```javascript
professional: {
  name: 'Dra. Seu Nome',
  phone: '+55 11 99999-9999',
  email: 'seu@email.com',
  crefito: 'CREFITO: 388275-F',
},

social: {
  whatsapp: '+5511999999999',
  instagram: 'https://instagram.com/seu-perfil',
  // ... outros links
}
```

## 3️⃣ Rode Localmente (1 minuto)

```bash
npm run dev
```

Acessar: `http://localhost:3000` 🎉

## 4️⃣ Integre WhatsApp (5 minutos)

### Opção Rápida (WhatsApp Web)

Nada a fazer! Os links já funcionam. O usuário clica e abre WhatsApp.

### Opção Profissional (WhatsApp API)

1. Criar app em [facebook.com/developers](https://developers.facebook.com)
2. Obter tokens
3. Adicionar em `.env.local`
4. Pronto!

[Ver guia completo em Documentação]

## 5️⃣ Deploy (1 minuto)

### Vercel (MAIS FÁCIL)

```bash
npm install -g vercel
vercel
```

Seguir instruções. Pronto! Site ao vivo em 30 segundos.

### Alternativas:
- Netlify: Conectar GitHub
- Railway: Push e deploy automático
- Seu servidor Linux: `npm run build && npm start`

---

## 📋 Checklist Pré-Produção

- [ ] Nome profissional configurado
- [ ] Telefone e email corretos
- [ ] Links de redes sociais adicionados
- [ ] WhatsApp funcionando
- [ ] Testes no celular
- [ ] Google Analytics configurado (opcional)
- [ ] Domínio customizado

---

## 🔗 Links Importantes

| Recurso | Link |
|---------|------|
| **Documentação Completa** | `README.md` |
| **Integração N8N** | `N8N_INTEGRATION_GUIDE.md` |
| **Código Fonte** | `src/` |
| **Componentes** | `src/components/` |
| **Estilos** | `tailwind.config.js` |

---

## 💬 Precisa de Ajuda?

1. **Erros de build?** → Verifique Node.js 18+
2. **WhatsApp não funciona?** → Edite `.env.local`
3. **Quer adicionar seção?** → Copie um componente existente
4. **Performance lenta?** → Execute `npm run build`

---

## 🎉 Próximas Ações

1. ✅ Customizar conteúdo
2. ✅ Configurar WhatsApp
3. ✅ Fazer deploy
4. ✅ Adicionar Google Analytics
5. ✅ Submeter ao Google Search Console
6. ✅ Monitorar visitantes

---

**Você está pronto! Boa sorte com sua landing page! 🚀**

_Para mais detalhes, veja `README.md`_
