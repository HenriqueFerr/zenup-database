const dashboardService = require('../service/dashboardService');
const { getRecommendationPhrase } = require('../service/phrasesService');

const { getRecommendationPhrase } = require('../service/phrasesService'); 

exports.getIndicadoresAgregados = async (req, res) => {
    const id_empresa = parseInt(req.params.id); 
    const usuarioLogadoId = req.usuario.id;

    try {
        await dashboardService.checkPermission(usuarioLogadoId, id_empresa);

        const indicadores = await dashboardService.getIndicadoresAgregados(id_empresa);

        if (indicadores.totalCheckins === 0) {
            return res.status(200).json({
                message: 'Nenhum dado de check-in disponível para esta empresa.',
                indicadores: indicadores
            });
        }
        
        // integração da lógica de recomendação de frases.
        const recomendacaoHumor = getRecommendationPhrase('humor', indicadores.humorMedio);
        const recomendacaoEstresse = getRecommendationPhrase('estresse', indicadores.estresseMedio);
        const recomendacaoEnergia = getRecommendationPhrase('energia', indicadores.energiaMedia);


        res.status(200).json({
            message: 'Indicadores agregados gerados com sucesso.',
            indicadores: {
                ...indicadores,
                recomendacaoHumor: recomendacaoHumor,
                recomendacaoEstresse: recomendacaoEstresse,
                recomendacaoEnergia: recomendacaoEnergia,
            }
        });

    } catch (error) {
        console.error('Erro ao gerar indicadores agregados:', error.message); //

        if (error.message === 'PERMISSION_DENIED') { //
            return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem acessar este recurso.' }); //
        }
        if (error.message === 'ACCESS_DENIED_TO_COMPANY') { //
            return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar os indicadores desta empresa.' }); //
        }

        res.status(500).json({ message: 'Erro interno do servidor.' }); //
    }
};

exports.getUsuariosPorEmpresa = async (req, res) => {
    const id_empresa = req.params.id;
    const usuarioLogadoId = req.usuario.id;

    try {
        await dashboardService.checkPermission(usuarioLogadoId, id_empresa);
        const usuarios = await dashboardService.getUsuariosPorEmpresa(id_empresa);
        res.status(200).json({
            message: 'Lista de usuários obtida com sucesso.',
            usuarios: usuarios
        });

    } catch (error) {
        console.error('Erro ao buscar usuários por empresa:', error.message);

        if (error.message === 'PERMISSION_DENIED') {
            return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem visualizar a lista de usuários.' });
        }
        if (error.message === 'ACCESS_DENIED_TO_COMPANY') {
            return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar os usuários desta empresa.' });
        }
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
