let { livros, identificadorLivro } = require('../bancodedados');
const isbnLibrary = require('node-isbn');

const listarLivros = async function (req, res) {
    const { autor, ano } = req.query;

    // query filtrar por autor
    if (autor) {
        if (parseInt(autor)) {
            return res.status(400).json({ mensagem: 'O valor do parâmetro autor da URL não pode ser um número.' });
        }

        const livrosEncontrados = livros.filter(await function (livroBuscado) {
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

        const livrosEncontrados = livros.filter(await function (livroBuscado) {
            return livroBuscado.ano === parseInt(ano);
        });

        return res.status(200).json(livrosEncontrados);
    }

    // livros sem query
    return res.status(200).json(livros);
}

const buscarLivroPorId = async function (req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: 'O valor do parâmetro ID da URL não é um número válido.' });
    }

    const livroBuscado = livros.find(await function (livro) {
        return livro.id === parseInt(id);
    });

    if (!livroBuscado) {
        return res.status(404).json({ mensagem: 'Não existe livro para o ID informado.' });
    }

    return res.status(200).json(livroBuscado);
}

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
    let livroBuscado = livros.find(await function (livro) {
        return livro.id === parseInt(id);
    });

    if (!livroBuscado) {
        return res.status(404).json({ mensagem: "Não existe livro a ser substituído para o ID informado." });
    }

    // buscar dados livro pelo ISBN
    isbnLibrary.resolve(isbn, await function (err, book) {
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

module.exports = {
    listarLivros,
    buscarLivroPorId,
    substituirLivro
}