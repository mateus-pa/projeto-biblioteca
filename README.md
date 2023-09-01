<p align="center"><b>Projeto API Biblioteca - Node.js</b></p>

## Sobre
Este projeto visa exercitar conceitos de Back-end como:
- API Rest
- Programação assíncrona
- CRUD
- JSON

## Features
- Rota get para listar livros e filtar por query params autor ou query params ano
- Rota get para buscar livro por ID
- Rota put para substituir livro pelo ISBN (dentre as propriedades, apenas o ID é retornado sem alterações)
- Rota post para adicionar novos livros ao bancodedados.js ou adicionar mais livros em estoque, caso o ISBN seja igual
- Rota post utilizando o ISBN para buscar as informações necessárias para gerar o JSON do livro
- Rota delete para remover livros do bancodedados.js ou retirar mais livros do estoque, caso o ISBN seja igual

## Tecnologias
- Javascript
- Node.js
- Express.js

## Requisitos
- npm instalado na sua máquina
- node instalado na sua máquna

## Como instalar
- Clone este repositório em qualquer pasta que desejar
- Abra o seu terminal na mesma página criada e digite...
```
npm install
```

Após esperar um tempo, todas as dependências para rodar este server estarão instaladas
- Agora você só precisa iniciar um server de desenvolvimento escrevendo
```
npm run dev
```
**Lembre-se, este projeto não utiliza um banco de dados.**

## Rotas
- [GET] /livros
- [GET] /livros/:id
- [PUT] /livros/:id