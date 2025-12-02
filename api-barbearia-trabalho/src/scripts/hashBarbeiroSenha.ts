import { prisma } from '../database/prisma';
import bcrypt from 'bcrypt';

/**
 * Script para hashear a senha de um barbeiro existente
 * Uso: tsx src/scripts/hashBarbeiroSenha.ts <email> <senha_em_texto_plano>
 */

const email = process.argv[2];
const senhaPlana = process.argv[3];

if (!email || !senhaPlana) {
  console.error('Uso: tsx src/scripts/hashBarbeiroSenha.ts <email> <senha_em_texto_plano>');
  process.exit(1);
}

async function hashSenha() {
  try {
    const barbeiro = await prisma.barbeiro.findFirst({
      where: { email },
    });

    if (!barbeiro) {
      console.error(`Barbeiro com email ${email} não encontrado`);
      process.exit(1);
    }

    const senhaHash = await bcrypt.hash(senhaPlana, 10);

    await prisma.barbeiro.update({
      where: { id: barbeiro.id },
      data: { senha: senhaHash },
    });

    console.log(`✅ Senha do barbeiro ${email} foi hasheada com sucesso!`);
    console.log(`Agora você pode fazer login com a senha: ${senhaPlana}`);
  } catch (error: any) {
    console.error('Erro ao hashear senha:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

hashSenha();

