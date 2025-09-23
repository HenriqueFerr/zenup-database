const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client'); // <- AQUI!
const prisma = new PrismaClient(); // <- É importante instanciar o prisma aqui
const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {
    const { nome, email, senha, id_empresa, tipo_usuario } = req.body;

    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const newUser = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha_hash: hashedPassword,
        id_empresa: id_empresa ? Number(id_empresa) : null,
        ...(tipo_usuario ? { tipo_usuario } : {}), // opcional, se existir no schema
      }
});

    return res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: newUser
    });
  } catch (error) {
    console.error('Erro ao criar usuário', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Este e-mail já está cadastrado' });
    }
    return res.status(500).json({ message: 'Erro interno do servidor.' });
    };
}
