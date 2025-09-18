const bcrypt = require('bcrypt');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const saltRounds = 10;

exports.createUser = async (req, res) => {
    try {
        const {nome, email, senha, id_empresa, tipo_usuario} = req.body;

        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        const newUser = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha_hash: hashedPassword,
                id_empresa: id_empresa
            }
        })

        res.status(201).json({
            message: 'Usuário criado com sucesso!',
            user: newUser
        })
    }catch (error) {
        console.error('Erro ao criarr usuário', error)

        if (error.code === 'P2002')
            return res.status(409).json({message: 'Este e-mail já está cadastrado'})
    }
    res.status(500).json({message: 'Erro interno do servidor.'});
};