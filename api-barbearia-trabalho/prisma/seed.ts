import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Cria barbeiros com senha hasheada
  const barbeiros = [
    {
      nome: 'Carlos Silva',
      email: 'carlos@barbearia.com',
      senha: await bcrypt.hash('senha123', 10),
      telefone: '(83) 99999-1111',
    },
    {
      nome: 'João Santos',
      email: 'joao@barbearia.com',
      senha: await bcrypt.hash('senha123', 10),
      telefone: '(83) 99999-2222',
    },
    {
      nome: 'Douglas',
      email: 'douglas@barbearia.com',
      senha: await bcrypt.hash('admin123', 10),
      telefone: '(83) 99999-3333',
    },
  ];

  for (const barbeiro of barbeiros) {
    await prisma.barbeiro.upsert({
      where: { email: barbeiro.email },
      update: {},
      create: barbeiro,
    });
    console.log(`✅ Barbeiro ${barbeiro.nome} criado/atualizado`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });