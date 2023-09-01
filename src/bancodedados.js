const livros = [
    {
        id: 1,
        titulo: 'Código limpo: Habilidades práticas do Agile Software',
        autores: [
            'Robert Cecil Martin'
        ],
        editora: "Alta Books",
        ano: 2009,
        numPaginas: 425,
        isbn: 8576082675,
        qtdEmEstoque: 1
    },
    {
        id: 2,
        titulo: 'Scrum: A arte de fazer o dobro do trabalho na metade do tempo',
        autores: [
            'Jeff Sutherland',
            'J. J. Sutherland'
        ],
        editora: "Sextante",
        ano: 2019,
        numPaginas: 256,
        isbn: 8543107164,
        qtdEmEstoque: 2
    }
];

const identificadorLivro = 3;

module.exports = {
    livros,
    identificadorLivro
}