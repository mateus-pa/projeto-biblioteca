![Bibliotecas](/images/bibliotecas.png)

<p align="center"><b>Projeto API "Bibliotecas" - Node.js</b></p>

## Sobre

Este projeto visa exercitar alguns conceitos de Back-end estudados ao longo do curso de desenvolvimento de software, com foco em Back-end, da Cubos academy. Sendo alguns desses conceitos:
- API Rest
- Programação assíncrona
- Function Async/await
- CRUD
- JSON
- Fs/promises
- Persistência de dados
- Framework Express.js

## Features
- Rota get para listar livros e filtar por query params autor ou query params ano
- Rota get para buscar livro por ID
- Rota put para substituir livro pelo ISBN (dentre as propriedades, apenas o ID é retornado sem alterações)
- Rota post para adicionar novos livros ao bancodedados.js ou adicionar mais livros em estoque, caso o ISBN seja igual
- Rota post utilizando o ISBN para buscar as informações necessárias para gerar o JSON do livro
- Rota delete para remover livros do bancodedados.js ou retirar mais livros do estoque, caso o ISBN seja igual
- Persistência de dados com fs/promises

## Tecnologias
- Javascript
- Node.js
- Express.js

## Requisitos
- npm instalado na sua máquina
- node instalado na sua máquina

## Como instalar
- Clone este repositório em qualquer pasta que desejar
- Abra o seu terminal na mesma página criada e digite:
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
  
![Rotas](/images/rotasBibliotecas.png)

## Rotas Controllers
- [GET] /livros
 ```javascript
const listarLivros = async function (req, res) {
    const { autor, ano } = req.query;

    // query filtrar por autor
    if (autor) {
        if (parseInt(autor)) {
            return res.status(400).json({ mensagem: 'O valor do parâmetro autor da URL não pode ser um número.' });
        }

        const livrosEncontrados = livros.filter(function (livroBuscado) {
            const autorEncontrado = livroBuscado.autores.some(function (autorBuscado) {
                return autorBuscado === autor;
            });

            return autorEncontrado;
        });

        return res.status(200).json(livrosEncontrados);
    }

    // query filtrar por ano
    if (ano) {
        if (!parseInt(ano)) {
            return res.status(400).json({ mensagem: 'O valor do parâmetro ano da URL não é um número válido.' });
        }

        const livrosEncontrados = livros.filter(function (livroBuscado) {
            return livroBuscado.ano === parseInt(ano);
        });

        return res.status(200).json(livrosEncontrados);
    }

    // livros sem query
    return res.status(200).json(livros);
}
```
- [GET] /livros/:id
```javascript
const buscarLivroPorId = async function (req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });
    }

    const livroBuscado = livros.find(function (livro) {
        return livro.id === parseInt(id);
    });

    if (!livroBuscado) {
        return res.status(404).json({ mensagem: 'Não existe livro para o ID informado.' });
    }

    return res.status(200).json(livroBuscado);
}
```
- [PUT] /livros/:id
```javascript
const substituirLivro = async function (req, res) {
    const { id } = req.params;
    const { isbn, qtdEmEstoque } = req.body;

    // verificar se ID é um número
    if (isNaN(id)) {
        return res.status(400).json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });
    }

    if (!qtdEmEstoque || qtdEmEstoque < 1) {
        return res.status(400).json({ mensagem: 'O livro precisa possuir ao menos uma unidade em estoque para poder ser registrado.' });
    }

    if (!isbn || isNaN(isbn) || isbn.length !== 10) {
        return res.status(400).json({ mensagem: 'O livro precisa possuir um código ISBN númerico de 10 dígitos.' });
    }

    // verifica se existe livro com o respectivo ID
    let livroBuscado = livros.find(function (livro) {
        return livro.id === parseInt(id);
    });

    if (!livroBuscado) {
        return res.status(404).json({ mensagem: "Não existe livro a ser substituído para o ID informado." });
    }

    // buscar dados livro pelo ISBN
    isbnLibrary.resolve(isbn, function (err, book) {
        if (err) {
            return res.status(404).json({ mensagem: 'ISBN inválido! Não existe livro correspondente a este ISBN.' });
        }

        livroBuscado.titulo = book.title;
        livroBuscado.autores = [...book.authors];
        livroBuscado.editora = book.publisher;
        livroBuscado.ano = parseInt(book.publishedDate);
        livroBuscado.isbn = parseInt(isbn);
        livroBuscado.qtdEmEstoque = parseInt(qtdEmEstoque);

        return res.status(200).json({ mensagem: 'Livro substituido com sucesso!' });
    });
}
```