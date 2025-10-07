-- CreateTable
CREATE TABLE "public"."clientes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."barbeiros" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "barbeiros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."servicos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."agendamentos" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "barbeiroId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."avaliacoes" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "barbeiroId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "public"."clientes"("email");

-- AddForeignKey
ALTER TABLE "public"."agendamentos" ADD CONSTRAINT "agendamentos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agendamentos" ADD CONSTRAINT "agendamentos_barbeiroId_fkey" FOREIGN KEY ("barbeiroId") REFERENCES "public"."barbeiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agendamentos" ADD CONSTRAINT "agendamentos_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "public"."servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."avaliacoes" ADD CONSTRAINT "avaliacoes_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."avaliacoes" ADD CONSTRAINT "avaliacoes_barbeiroId_fkey" FOREIGN KEY ("barbeiroId") REFERENCES "public"."barbeiros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."avaliacoes" ADD CONSTRAINT "avaliacoes_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "public"."servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
