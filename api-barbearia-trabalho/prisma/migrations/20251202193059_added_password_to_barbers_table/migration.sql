/*
  Warnings:

  - Added the required column `senha` to the `barbeiros` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."barbeiros" ADD COLUMN     "senha" TEXT NOT NULL;
