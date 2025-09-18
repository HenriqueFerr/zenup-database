-- CreateTable
CREATE TABLE `Empresas` (
    `id_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_empresa` VARCHAR(255) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `plano` VARCHAR(191) NULL,
    `dominio` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Empresas_cnpj_key`(`cnpj`),
    UNIQUE INDEX `Empresas_dominio_key`(`dominio`),
    PRIMARY KEY (`id_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipes` (
    `id_equipe` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_equipe` VARCHAR(255) NOT NULL,
    `descricao` VARCHAR(255) NULL,
    `id_empresa` INTEGER NOT NULL,

    PRIMARY KEY (`id_equipe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_funcionario` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha_hash` VARCHAR(191) NOT NULL,
    `tipo_usuario` VARCHAR(191) NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `id_empresa` INTEGER NOT NULL,
    `id_equipe` INTEGER NOT NULL,

    UNIQUE INDEX `Usuarios_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Questionarios` (
    `id_questionario` INTEGER NOT NULL AUTO_INCREMENT,
    `id_equipe` INTEGER NOT NULL,

    PRIMARY KEY (`id_questionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Respostas` (
    `id_resposta` INTEGER NOT NULL AUTO_INCREMENT,
    `data_resposta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `humor` VARCHAR(191) NOT NULL,
    `energia` VARCHAR(191) NOT NULL,
    `estresse` VARCHAR(191) NOT NULL,
    `id_questionario` INTEGER NOT NULL,

    PRIMARY KEY (`id_resposta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dicas` (
    `id_conversa` VARCHAR(191) NOT NULL,
    `resumo` VARCHAR(191) NOT NULL,
    `data_conversa` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_questionario` INTEGER NOT NULL,

    PRIMARY KEY (`id_conversa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conversa_IA` (
    `id_conversa` INTEGER NOT NULL AUTO_INCREMENT,
    `resumo` VARCHAR(255) NOT NULL,
    `data_conversa` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_conversa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Equipes` ADD CONSTRAINT `Equipes_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `Empresas`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `Empresas`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_id_equipe_fkey` FOREIGN KEY (`id_equipe`) REFERENCES `Equipes`(`id_equipe`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Questionarios` ADD CONSTRAINT `Questionarios_id_equipe_fkey` FOREIGN KEY (`id_equipe`) REFERENCES `Equipes`(`id_equipe`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respostas` ADD CONSTRAINT `Respostas_id_questionario_fkey` FOREIGN KEY (`id_questionario`) REFERENCES `Questionarios`(`id_questionario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dicas` ADD CONSTRAINT `Dicas_id_questionario_fkey` FOREIGN KEY (`id_questionario`) REFERENCES `Questionarios`(`id_questionario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversa_IA` ADD CONSTRAINT `Conversa_IA_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
