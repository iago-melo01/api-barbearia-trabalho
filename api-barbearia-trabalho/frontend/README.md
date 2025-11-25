# Frontend - Sistema de Barbearia

Frontend desenvolvido em React com TypeScript e Vite para o sistema de gerenciamento de barbearia.

## 🚀 Tecnologias

- React 18
- TypeScript
- Vite
- React Router DOM
- Axios

## 📁 Estrutura de Pastas

```
frontend/src/
├── assets/          # Imagens e recursos estáticos
├── components/      # Componentes reutilizáveis
│   ├── Layout.tsx
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── Table.tsx
│   └── FormInput.tsx
├── config/          # Configurações
│   └── api.ts       # Configuração do Axios
├── hooks/           # Hooks customizados
│   └── useApi.ts
├── pages/           # Páginas da aplicação
│   ├── Dashboard.tsx
│   ├── Clientes.tsx
│   ├── Barbeiros.tsx
│   ├── Servicos.tsx
│   ├── Agendamentos.tsx
│   └── Avaliacoes.tsx
├── schemas/         # Schemas de validação
│   └── validation.ts
├── services/        # Serviços de API
│   ├── clienteService.ts
│   ├── barbeiroService.ts
│   ├── servicoService.ts
│   ├── agendamentoService.ts
│   └── avaliacaoService.ts
├── types/           # Tipos TypeScript
│   └── index.ts
├── App.tsx          # Componente principal
├── App.css
├── main.tsx         # Entry point
└── index.css        # Estilos globais
```

## 🛠️ Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure a URL da API (opcional):
Crie um arquivo `.env` na raiz do frontend:
```
VITE_API_URL=http://localhost:3000
```

Por padrão, a aplicação usa `http://localhost:3000` como URL da API.

## 🏃 Executando

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta se 5173 estiver em uso).

## 📦 Build para Produção

Para criar o build de produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

## 🎨 Funcionalidades

- ✅ Dashboard com estatísticas
- ✅ CRUD completo de Clientes
- ✅ CRUD completo de Barbeiros
- ✅ CRUD completo de Serviços
- ✅ CRUD completo de Agendamentos
- ✅ CRUD completo de Avaliações
- ✅ Interface moderna e responsiva
- ✅ Modais para criação/edição
- ✅ Tabelas interativas
- ✅ Tratamento de erros

## 🔗 Rotas

- `/` - Dashboard
- `/clientes` - Gerenciamento de Clientes
- `/barbeiros` - Gerenciamento de Barbeiros
- `/servicos` - Gerenciamento de Serviços
- `/agendamentos` - Gerenciamento de Agendamentos
- `/avaliacoes` - Gerenciamento de Avaliações

## 📝 Notas

- Certifique-se de que a API backend está rodando antes de iniciar o frontend
- A API deve estar configurada para aceitar requisições CORS do frontend
- Todos os endpoints da API devem estar funcionando corretamente
