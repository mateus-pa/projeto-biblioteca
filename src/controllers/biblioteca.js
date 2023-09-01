let { livros, identificadorLivro } = require('../bancodedados');

const listarLivros = async function (req, res) {
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