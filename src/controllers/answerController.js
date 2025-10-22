const answerService = require('../service/answerService');

const createResposta = async (req, res) => {
  try {
    const { humor, energia, estresse, resumo } = req.body;
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message : "Usuário não autenticado" });
    }

    const userId = req.user.id;
    if (humor === undefined || energia === undefined || estresse === undefined) {
      return res.status(400).json({ success: false, message: "Campos obrigatórios: humor, energia, estresse" });
    }

    const newResposta = await answerService.createResposta(req.body, userId);
    return res.status(201).json({
      success: true,
      message: 'Resposta registrada com sucesso',
      data: newResposta

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
    createResposta,
};