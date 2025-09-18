const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const respostasRoutes = require('./routes/respostasRoutes');
const dicasRoutes = require('./routes/dicasRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', respostasRoutes);
app.use('/api', dicasRoutes);
app.use('/api', dashboardRoutes);