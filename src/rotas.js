const express = require('express');

const rotas = express();

const { listarLivros, buscarLivroPorId, substituirLivro } = require('./controllers/biblioteca');

rotas.get('/livros', listarLivros);

rotas.get('/livros/:id', buscarLivroPorId);

rotas.put('/livros/:id', substituirLivro);

module.exports = rotas;