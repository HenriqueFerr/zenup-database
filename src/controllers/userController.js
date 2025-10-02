const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client'); // <- AQUI!
const prisma = new PrismaClient(); // <- É importante instanciar o prisma aqui
const saltRounds = 10;
const userService = require('../service/userService');

const userController = {
  async createUser(req, res) {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json({
        message: 'Usuário criado com sucesso!',
        user: newUser
      });
    }catch (error) {
      console.error('Erro ao criar usuário: ', error);
      if (error.mensage === 'Este e-mail já está cadastrado.') {
        return res.status(409).json({ message: error.message});
      }
      return res.status(500).json({message: 'Error interno do servidor.'});
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    }catch (error) {
      console.error('Erro ao buscar usuários: ', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.'});
      }
    }catch(error) {
      console.error('Erro ao buscar usuário: ', error);
      res.status(500).json({ message: 'Erro interno do servidor.'});
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await userService.updateUser(parseInt(req.params.id), req.body);
      res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: updatedUser});
    } catch (error) {
      console.error('Erro ao atualizar usuário: ', error);
    }
  },

  async deleteUser(req, res) {
    try {
      await userService.deleteUser(parseInt(req.params.id));
      res.status(200).json ({ message: 'Usuário deletado com sucesso!'});
    } catch (error) {
      console.error('Erro ao deletar usuário: ', error);
      res.status(500).json({ message: 'Erro interno do servidor.'});
    }
  }
};

module.exports = userController;
