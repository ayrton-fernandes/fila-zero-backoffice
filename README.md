# 🚀 Fila Zero - Backoffice

Sistema de gestão Fila Zero com autenticação e painel administrativo.

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

```bash
# Instalar dependências
npm install
```

## ▶️ Executar

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## 🔐 Acesso

- **URL**: http://localhost:3000
- **Página Inicial**: Redireciona para `/login`

### Credenciais de Teste (Mock)

Como ainda não temos API, o login aceita qualquer email válido:

- **Email**: `teste@email.com` (ou qualquer email válido)
- **Senha**: `123456` (mínimo 6 caracteres, sem espaços)

## 📁 Estrutura do Projeto

```
fila-zero-backoffice/
├── app/                    # Rotas Next.js (App Router)
│   ├── (auth)/            # Rotas de autenticação
│   ├── (protected)/       # Rotas protegidas
│   └── providers.tsx      # Providers globais
├── components/            # Componentes React
├── domain/               # Camada de domínio
├── hooks/                # Custom hooks
├── services/             # Serviços (API)
├── utils/                # Utilitários e validações
└── middleware.ts         # Middleware de autenticação
```

## 🛡️ Autenticação

### Fluxo de Autenticação

1. Usuário acessa rota protegida sem token → Redireciona para `/login`
2. Usuário faz login → Token salvo no cookie `token`
3. Usuário autenticado acessa `/login` → Redireciona para `/home`
4. Usuário faz logout → Remove token e redireciona para `/login`

## ✅ Validações (Zod)

- **Email**: Formato válido de email
- **Senha**: Mínimo 6 caracteres, máximo 20, sem espaços

## 🔄 Próximas Etapas

1. Substituir mock do login por API real
2. Implementar "Esqueci a senha"
3. Adicionar dashboard com dados
4. Implementar gestão de usuários

## 📝 Convenções de Código

- **Funções/variáveis/classes**: Inglês
- **Textos/labels/mensagens**: Português
- **TypeScript**: Evitar `any`

---

**Desenvolvido com ❤️ para Fila Zero**
