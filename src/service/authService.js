// src/services/authService.js

// 1. Importações e Inicialização
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // Instância para interagir com o DB
const bcrypt = require('bcrypt'); // Para comparação de senha (segurança)
const jwt = require('jsonwebtoken'); // Para geração de tokens JWT

// 2. Chave Secreta do JWT
// (Idealmente, isso viria de um arquivo de configuração centralizado)
const JWT_SECRET = process.env.JWT_SECRET || 'uma_chave_secreta_muito_forte_e_aleatoria';

// 3. Objeto Auth Service
const authService = {
    /**
     * Tenta logar um usuário com as credenciais fornecidas.
     * A responsabilidade é: encontrar, validar e gerar token.
     * @param {string} email - O e-mail do usuário.
     * @param {string} senha - A senha não criptografada do usuário.
     * @returns {object} - { token, user: { id_usuario, nome, email, tipo_usuario } }
     * @throws {Error} - Se o e-mail/senha for inválido ou ocorrer um erro de DB.
     */
    async login({ email, senha }) {
        // 3.1. Busca o usuário no banco de dados
        const usuario = await prisma.usuario.findUnique({
            where: { email },
            // Selecionamos a senha_hash explicitamente para a validação
            select: {
                id_usuario: true,
                nome: true,
                email: true,
                senha_hash: true,
                tipo_usuario: true,
            },
        });

        // 3.2. Validação 1: Usuário não encontrado
        if (!usuario) {
            // Lançamos um erro específico que o Controller pode tratar
            throw new Error('AUTH_INVALID'); 
        }

        // 3.3. Validação 2: Comparação da senha
        // Compara a senha fornecida com o hash salvo (processo de segurança)
        const isPasswordValid = await bcrypt.compare(senha, usuario.senha_hash);

        if (!isPasswordValid) {
            // Lançamos o mesmo erro para não dar dica se o problema é o e-mail ou a senha
            throw new Error('AUTH_INVALID'); 
        }

        // 3.4. Geração do Token JWT
        // O payload (conteúdo) do token
        const payload = {
            id: usuario.id_usuario,
            tipo: usuario.tipo_usuario
        };

        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' } // O token expira em 1 hora
        );

        // 3.5. Limpa e retorna os dados
        // Remove o hash da senha antes de retornar os dados do usuário
        const { senha_hash, ...userWithoutHash } = usuario;

        return { token, user: userWithoutHash };
    },
};

// 4. Exportação
module.exports = authService;