let { livros, identificadorLivro } = require('../bancodedados');

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

module.exports = {
    listarLivros,
    buscarLivroPorId
}