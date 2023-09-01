const express = require('express');

const rotas = express();

const { listarLivros, buscarLivroPorId } = require('./controllers/biblioteca');

rotas.get('/livros', listarLivros);

rotas.get('/livros/:id', buscarLivroPorId);

module.exports = rotas;