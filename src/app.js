const express = require('express');
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());


// Importação das suas rotas
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const answerRoutes = require('./routes/answerRouter');
const dashboardRoutes = require('./routes/dashboardRouter');


// Uso das rotas e prefixo /api para cada rota criada
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/answer', answerRoutes);
app.use('/api/dashboard', dashboardRoutes);


// Porta que o servidor vai escutar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

//http://localhost:3000/api/users e a rota que quer entrar