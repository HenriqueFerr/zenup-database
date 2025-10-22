const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // Instância para interagir com o DB
const bcrypt = require('bcrypt'); // Para comparação de senha (segurança)
const jwt = require('jsonwebtoken'); // Para geração de tokens JWT

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
        const usuario = await prisma.usuario.findUnique({
            where: { email },
            select: {
                id_usuario: true,
                nome: true,
                email: true,
                senha_hash: true,
                tipo_usuario: true,
            },
        });

        if (!usuario) {
            throw new Error('AUTH_INVALID'); 
        }

        const isPasswordValid = await bcrypt.compare(senha, usuario.senha_hash);

        if (!isPasswordValid) {
            throw new Error('AUTH_INVALID'); 
        }

        const payload = {
            id: usuario.id_usuario,
            tipo_usuario: usuario.tipo_usuario
        };

        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' } // O token expira em 1 hora
        );

        const { senha_hash, ...userWithoutHash } = usuario;

        return { token, user: userWithoutHash };
    },
};

module.exports = authService;