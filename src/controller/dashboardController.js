const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Rota para obter indicadores agregados
exports.getIndicadoresAgregados = async (req, res) => {
  try {
    const id_empresa = req.params.id;
    const usuarioLogado = req.usuario;

    // Apenas gestores podem acessar esta rota
    if (usuarioLogado.tipo !== 'gestor') {
      return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem acessar este recurso.' });
    }

    // Apenas gestores da empresa em questão podem acessar os indicadores
    const empresaUsuario = await prisma.usuario.findUnique({
      where: { id_usuario: usuarioLogado.id },
      select: { id_empresa: true }
    });

    if (empresaUsuario.id_empresa !== id_empresa) {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar os indicadores desta empresa.' });
    }

    // Busca as respostas de todos os colaboradores da empresa
    const respostas = await prisma.respostas.findMany({
      where: {
        usuario: {
          id_empresa: id_empresa
        }
      },
      select: {
        humor: true,
        energia: true,
        estresse: true,
      }
    });

    // Calcula os indicadores médios
    if (respostas.length === 0) {
      return res.status(200).json({
        message: 'Nenhum dado de check-in disponível para esta empresa.',
        indicadores: {
          humorMedio: 0,
          energiaMedia: 0,
          estresseMedio: 0,
          totalCheckins: 0
        }
      });
    }

    const totalCheckins = respostas.length;
    const humorMedio = respostas.reduce((sum, r) => sum + r.humor, 0) / totalCheckins;
    const energiaMedia = respostas.reduce((sum, r) => sum + r.energia, 0) / totalCheckins;
    const estresseMedio = respostas.reduce((sum, r) => sum + r.estresse, 0) / totalCheckins;

    res.status(200).json({
      message: 'Indicadores agregados gerados com sucesso.',
      indicadores: {
        humorMedio: parseFloat(humorMedio.toFixed(2)),
        energiaMedia: parseFloat(energiaMedia.toFixed(2)),
        estresseMedio: parseFloat(estresseMedio.toFixed(2)),
        totalCheckins: totalCheckins
      }
    });

  } catch (error) {
    console.error('Erro ao gerar indicadores agregados:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};