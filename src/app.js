const express = require('express');
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient(); // <--- inicialização do banco de dados (prisma)

// Middleware
app.use(express.json());

// Exemplo de rota que usa Prisma
/* app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}); */

// Importação das suas rotas
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const answerRoutes = require('./routes/answerRouter');
const dashboardRoutes = require('./routes/dashboardRouter');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/answer', answerRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));