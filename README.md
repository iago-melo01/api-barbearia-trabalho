1️⃣ Clone o repositório
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo

2️⃣ Instale as dependências
npm install

3️⃣ Crie o arquivo .env

Na raiz do projeto, crie um arquivo chamado .env e adicione a variável de ambiente com a URL do seu banco Supabase:

DATABASE_URL="postgresql://postgres:oqRiiFGUA2fbqNLf@db.pvuwutgrsnzbzxfvzued.supabase.co:5432/postgres?schema=public&sslmode=require"

⚠️ Atenção: nunca compartilhe sua DATABASE_URL publicamente.
Para projetos públicos, use variáveis de ambiente seguras.

4️⃣ Inicialize o Prisma
npx prisma init


Esse comando cria a pasta prisma/ e o arquivo schema.prisma.
Edite o arquivo conforme suas tabelas (ex: Cliente, Servico, Agendamento, etc).

5️⃣ Execute as migrações

Crie o schema do banco com o Prisma:

npx prisma migrate dev --name init


Isso vai gerar o banco de dados automaticamente no Supabase.

6️⃣ Gere o client do Prisma
npx prisma generate

7️⃣ Rode o servidor
npm run dev


Por padrão, o servidor rodará em:

http://localhost:3000

📡 Endpoints da API (Exemplo)
➕ Criar Cliente

POST /clientes

Body (JSON):
{
  "nome": "Iago",
  "email": "iago@gmail.com",
  "senha": "iago0406",
  "telefone": "8333333333"
}

Resposta:
{
  "message": "Cliente criado com sucesso!"
}

🛠️ Scripts úteis
Comando	Descrição
npm run dev	Inicia o servidor em modo desenvolvimento
npm run build	Compila o TypeScript
npm start	Executa o projeto compilado
npx prisma studio	Abre o painel visual do Prisma (CRUD via navegador)
