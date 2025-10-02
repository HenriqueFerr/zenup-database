const answerService = require('../service/answerService');

exports.createResposta = async (req, res) => {
  try {
    const { humor, energia, estresse, resumo } = req.body;
    const userId = req.user.id; // Obtém o ID do usuário logado do token
    
    if (humor === undefined || energia === undefined || estresse === undefined) {
      return res.status(400).json({ message: "Campos obrigatórios: humor, energia, estresse" });
    }

    const newResposta = await answerService.createResposta(req.body, userId);
    return res.status(201).json({
      message: 'Resposta registrada com sucesso',

    });
  } catch (error) {
    console.error('Erro ao criar resposta:', error);

    if (error.message.includes('Falha ao registrar')) {
      return res.status(500).json({ message: error.message });
    }

    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};


module.exports = {
    createResposta: exports.createResposta,
};