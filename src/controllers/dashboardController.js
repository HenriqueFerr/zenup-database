const dashboardService = require('../service/dashboardService');

// Rota para obter indicadores agregados
exports.getIndicadoresAgregados = async (req, res) => {
    const id_empresa = req.params.id; // ID da empresa no URL
    const usuarioLogadoId = req.usuario.id; // ID do usuário injetado pelo middleware

    try {
        // 1. Checagem de Permissão
        await dashboardService.checkPermission(usuarioLogadoId, id_empresa);

        // 2. Chama o Service para obter os dados
        const indicadores = await dashboardService.getIndicadoresAgregados(usuarioLogadoId, id_empresa);

        // 3. Resposta HTTP
        if (indicadores.totalCheckins === 0) {
            return res.status(200).json({
                message: 'Nenhum dado de check-in disponível para esta empresa.',
                indicadores: indicadores
            });
        }

        res.status(200).json({
            message: 'Indicadores agregados gerados com sucesso.',
            indicadores: indicadores
        });

    } catch (error) {
        console.error('Erro ao gerar indicadores agregados:', error.message);

        // Mapeamento de Erros Lançados pelo Service
        if (error.message === 'PERMISSION_DENIED') {
            return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem acessar este recurso.' });
        }
        if (error.message === 'ACCESS_DENIED_TO_COMPANY') {
            return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar os indicadores desta empresa.' });
        }

        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


// Rota para obter lista de usuários
exports.getUsuariosPorEmpresa = async (req, res) => {
    const id_empresa = req.params.id;
    const usuarioLogadoId = req.usuario.id;

    try {
        // 1. Checagem de Permissão (Reutiliza a lógica)
        await dashboardService.checkPermission(usuarioLogadoId, id_empresa);
        // 2. Chama o Service
        const usuarios = await dashboardService.getUsuariosPorEmpresa(id_empresa);
        res.status(200).json({
            message: 'Lista de usuários obtida com sucesso.',
            usuarios: usuarios
        });

    } catch (error) {
        console.error('Erro ao buscar usuários por empresa:', error.message);

        // Mapeamento de erros
        if (error.message === 'PERMISSION_DENIED') {
            return res.status(403).json({ message: 'Acesso negado. Apenas gestores podem visualizar a lista de usuários.' });
        }
        if (error.message === 'ACCESS_DENIED_TO_COMPANY') {
            return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar os usuários desta empresa.' });
        }
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
    getIndicadoresAgregados: exports.getIndicadoresAgregados,
    getUsuariosPorEmpresa: exports.getUsuariosPorEmpresa
}