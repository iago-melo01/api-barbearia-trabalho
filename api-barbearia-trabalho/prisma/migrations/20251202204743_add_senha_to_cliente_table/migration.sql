/*
  Warnings:

  - Added the required column `senha` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Primeiro adiciona a coluna como nullable
ALTER TABLE "public"."clientes" ADD COLUMN     "senha" TEXT;

-- Atualiza os registros existentes com uma senha padrão temporária (hash de 'temp123456')
-- Este é um hash bcrypt válido para a senha 'temp123456'
UPDATE "public"."clientes" SET "senha" = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' WHERE "senha" IS NULL;

-- Agora torna a coluna NOT NULL
ALTER TABLE "public"."clientes" ALTER COLUMN "senha" SET NOT NULL;
