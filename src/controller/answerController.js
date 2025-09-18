const { PrismaClient } = req('@prisma/client');
const prisma = new PrismaClient();

exports.createResposta = async (req, res) => {
  try {
    const { humor, energia, estresse, resumo } = req.body;
    const id_usuario = req.usuario.id;

    //verifica o preenchimento dos cards
    if (humor === undefined || energia === undefined || estresse === undefined) {
      return res.status(400).json({ message: 'Campos humor, energia e estresse são obrigatórios.' });
    }

    // registra no banco
    const newResposta = await prisma.respostas.create({
      data: {
        humor: humor,
        energia: energia,
        estresse: estresse,
        resumo: resumo,
        id_usuario: id_usuario,
      },
    });

    res.status(201).json({
      message: 'Resposta registrada com sucesso!',
      resposta: newResposta,
    });
  } catch (error) {
    console.error('Erro ao registrar resposta:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};