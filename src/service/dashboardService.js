const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const dashboardService = {

    async checkPermission(usuarioLogadoId, empresaIdParam) {
        const empresaUsuario = await prisma.usuario.findUnique({
            where: { id_usuario: usuarioLogadoId },
            select: { id_empresa: true, tipo_usuario: true }
        });

        if (empresaUsuario.tipo_usuario !== 'gestor') {
            throw new Error('PERMISSION_DENIED');
        }
        if (empresaUsuario.id_empresa !== empresaIdParam) {
            throw new Error('ACCESS_DENIED_TO_COMPANY');
        }

        return empresaUsuario;
    },

    async getIndicadoresAgregados(usuarioLogadoId, id_empresa_param) {
        const id_empresa = id_empresa_param;

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
        if (respostas.length === 0) {
            return {
                humorMedio: 0,
                energiaMedia: 0,
                estresseMedio: 0,
                totalCheckins: 0
            };
        }
        const totalCheckins = respostas.length;
        const humorMedio = respostas.reduce((sum, r) => sum + r.humor, 0) / totalCheckins;
        const energiaMedia = respostas.reduce((sum, r) => sum + r.energia, 0) / totalCheckins;
        const estresseMedio = respostas.reduce((sum, r) => sum + r.estresse, 0) / totalCheckins;
        return {
            humorMedio: parseFloat(humorMedio.toFixed(2)),
            energiaMedia: parseFloat(energiaMedia.toFixed(2)),
            estresseMedio: parseFloat(estresseMedio.toFixed(2)),
            totalCheckins: totalCheckins
        };
    },


    async getUsuariosPorEmpresa(id_empresa_param) {
        const id_empresa = id_empresa_param;
        const usuarios = await prisma.usuario.findMany({
            where: {
                id_empresa: id_empresa
            },
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