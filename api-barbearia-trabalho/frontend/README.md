# Frontend - Sistema de Barbearia

Interface React + TypeScript construída com Vite para gerenciar clientes, barbeiros, serviços, agendamentos e avaliações da barbearia.

---

## ✅ Pré-requisitos

- Node.js 18 LTS ou superior (recomendado Node 20.x)  
- npm 10+ (instalado junto com o Node)  
- API backend rodando em `http://localhost:3000` ou outra URL acessível

> Verifique sua versão com `node -v` e `npm -v`. Caso utilize `nvm`, rode `nvm use 20`.

---

## ⚙️ Passo a passo para rodar

1. **Entre na pasta do frontend**
   ```bash
   cd frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure a URL da API (opcional)**
   - Crie um arquivo `.env` na pasta `frontend/` (mesmo nível do `package.json`);
   - Adicione a variável abaixo ajustando a URL conforme seu backend:
     ```
     VITE_API_URL=http://localhost:3000
     ```
   - Se o arquivo não existir, o app assume `http://localhost:3000`.

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador**
   - Por padrão: `http://localhost:5173`
   - A porta pode mudar se 5173 já estiver ocupada; o terminal mostrará a URL correta.

---

## 📦 Outros scripts úteis

| Comando           | Descrição                                                     |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Sobe o servidor Vite com hot reload.                          |
| `npm run build`   | Gera o build de produção em `frontend/dist`.                  |
| `npm run preview` | Serve o build gerado para validar antes de publicar.          |
| `npm run lint`    | Executa ESLint com as regras definidas em `eslint.config.js`. |

---

## 🗂️ Estrutura principal (`frontend/src`)

```
src/
├── assets/          # Logo, ícones e outros estáticos
├── components/      # Componentes reutilizáveis (Layout, Button, Modal, Table etc.)
├── config/          # Configurações globais (ex.: instância Axios)
├── hooks/           # Hooks customizados (ex.: useApi)
├── pages/           # Páginas (Dashboard, Clientes, Barbeiros, Serviços, Agendamentos, Avaliações)
├── schemas/         # Schemas de validação
├── services/        # Requisições à API separadas por domínio
├── types/           # Tipagens compartilhadas
├── App.tsx          # Raiz de rotas e layout
└── main.tsx         # Entrada Vite + ReactDOM
```

---

## 🚀 Funcionalidades confirmadas

- Dashboard com indicadores iniciais
- CRUD completo para Clientes, Barbeiros, Serviços, Agendamentos e Avaliações
- Formulários validados e exibidos em modais
- Tabelas responsivas com ações de editar/excluir
- Tratamento simples de erros e carregamento

---

## 🔗 Rotas disponíveis

- `/` – Dashboard  
- `/clientes` – Gestão de clientes  
- `/barbeiros` – Gestão de barbeiros  
- `/servicos` – Gestão de serviços  
- `/agendamentos` – Gestão de agendamentos  
- `/avaliacoes` – Gestão de avaliações

---

## 📝 Observações importantes

- Garanta que o backend esteja iniciado antes de abrir o frontend.  
- O backend precisa liberar CORS para o host/porta do Vite.  
- Ao gerar o build (`npm run build`), sirva a pasta `dist/` com qualquer servidor estático (por exemplo, `npm run preview`, `npx serve dist`, Nginx, etc.).

Pronto! Com esses passos você consegue instalar, configurar e executar o frontend localmente. Bons testes! 🎯
