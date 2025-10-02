// src/services/dashboardService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dashboardService = {

    // Lógica para verificar se o usuário logado pertence à empresa correta
    async checkPermission(usuarioLogadoId, empresaIdParam) {
        // Busca a qual empresa o usuário logado pertence
        const empresaUsuario = await prisma.usuario.findUnique({
            where: { id_usuario: usuarioLogadoId },
            select: { id_empresa: true, tipo_usuario: true }
        });
        // 1. Verifica se o usuário é gestor
        if (empresaUsuario.tipo_usuario !== 'gestor') {
            throw new Error('PERMISSION_DENIED');
        }
        // 2. Verifica se o gestor pertence à empresa que está sendo consultada
        if (empresaUsuario.id_empresa !== empresaIdParam) {
            throw new Error('ACCESS_DENIED_TO_COMPANY');
        }

        return empresaUsuario;
    },

    async getIndicadoresAgregados(usuarioLogadoId, id_empresa_param) {
        // Conversão para o tipo correto (número ou string, dependendo do seu schema)
        const id_empresa = id_empresa_param;

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
        // Se não houver dados, retorna um resultado zerado
        if (respostas.length === 0) {
            return {
                humorMedio: 0,
                energiaMedia: 0,
                estresseMedio: 0,
                totalCheckins: 0
            };
        }
        // Realiza os cálculos de agregação (Lógica de Negócio)
        const totalCheckins = respostas.length;
        const humorMedio = respostas.reduce((sum, r) => sum + r.humor, 0) / totalCheckins;
        const energiaMedia = respostas.reduce((sum, r) => sum + r.energia, 0) / totalCheckins;
        const estresseMedio = respostas.reduce((sum, r) => sum + r.estresse, 0) / totalCheckins;
        // Retorna o resultado
        return {
            humorMedio: parseFloat(humorMedio.toFixed(2)),
            energiaMedia: parseFloat(energiaMedia.toFixed(2)),
            estresseMedio: parseFloat(estresseMedio.toFixed(2)),
            totalCheckins: totalCheckins
        };
    },


    async getUsuariosPorEmpresa(id_empresa_param) {
        // Conversão para o tipo correto
        const id_empresa = id_empresa_param;
        
        // Busca a lista de usuários da empresa
        const usuarios = await prisma.usuario.findMany({
            where: {
                id_empresa: id_empresa
            },
            // Remove campos sensíveis
            select: {
                id_usuario: true,
                nome: true,
                email: true,
                tipo_usuario: true,
            }
        });
        
        return usuarios;
    }
};

module.exports = dashboardService;