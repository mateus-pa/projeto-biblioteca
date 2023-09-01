<p align="center"><b>Projeto API Biblioteca - Node.js</b></p>

## About
Este projeto visa exercitar conceitos de Back-end como:
- API Rest
- Programação assíncrona
- CRUD
- JSON

## Features
- Rota get para listar livros e filtar por query autor ou query ano
- Rota get para buscar livro por ID
- Rota put para substituir livro (retorna ID e ISBN sem alterações)
- Rota patch para alterar dados do livro (exceto ID e ISBN)
- Rota create para adicionar novos livros ao bancodedados.js ou adicionar mais livros em estoque, caso o ISBN seja igual
- Rota create utilizando o ISBN para buscar as informações necessárias para gerar o JSON do livro
- Rota delete para remover livros do bancodedados.js ou retirar mais livros do estoque, caso o ISBN seja igual

## Techs
- Javascript
- Node.js
- Express.js

## Requirements
- npm installed on your machine
- node installed on your machine

## How to install
- Clone this repository on any folder that you want
- Open your terminal on the same folder and type...
```
npm install
```

After a while, all dependencies for run this project will be installed
- Now you just need to start a development server typing
```
npm start
```
**Remember, this project don't need an database.**

## Routes
- [GET] /livros
- [GET] /livros/{id}