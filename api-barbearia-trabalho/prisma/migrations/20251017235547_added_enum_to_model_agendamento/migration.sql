-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('AGENDADO', 'CONCLUIDO', 'CANCELADO');

-- AlterTable
ALTER TABLE "public"."agendamentos" ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'AGENDADO';
