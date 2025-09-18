/*
  Warnings:

  - The primary key for the `dicas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_conversa` on the `dicas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `dominio` on the `empresas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dominio_email]` on the table `Empresas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dominio_email` to the `Empresas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Empresas_dominio_key` ON `empresas`;

-- AlterTable
ALTER TABLE `dicas` DROP PRIMARY KEY,
    MODIFY `id_conversa` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_conversa`);

-- AlterTable
ALTER TABLE `empresas` DROP COLUMN `dominio`,
    ADD COLUMN `dominio_email` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Empresas_dominio_email_key` ON `Empresas`(`dominio_email`);
