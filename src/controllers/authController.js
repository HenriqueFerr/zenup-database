const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Use uma chave secreta forte para assinar seus tokens JWT.
// Por segurança, armazene isso em uma variável de ambiente (.env).
const JWT_SECRET = process.env.JWT_SECRET || 'uma_chave_secreta_muito_forte_e_aleatoria';

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 1. Encontrar o usuário pelo e-mail
    const usuario = await prisma.usuario.findUnique({
      where: {
        email: email,
      },
      // Seleciona explicitamente a senha para comparação.
      // Por padrão, o Prisma não a retorna por segurança.
      select: {
        id_usuario: true,
        nome: true,
        email: true,
        senha_hash: true,
        tipo_usuario: true,
      },
    });

    // Se o usuário não for encontrado
    if (!usuario) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    // 2. Comparar a senha fornecida com o hash salvo no banco de dados
    const isPasswordValid = await bcrypt.compare(senha, usuario.senha_hash);

    // Se a senha estiver incorreta
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    }

    // 3. Gerar um token de acesso
    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        tipo: usuario.tipo_usuario
      },
      JWT_SECRET,
      {
        expiresIn: '1h' // O token expira em 1 hora
      }
    );

    // 4. Resposta de sucesso
    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token: token,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};