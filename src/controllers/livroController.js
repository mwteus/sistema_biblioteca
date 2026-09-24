const Livro = require('../models/Livro');

async function cadastrar(req, res) {
    try {
        const { titulo, autor, quantidade_estoque } = req.body;

        const livro = await Livro.create({
            titulo,
            autor,
            quantidade_estoque,
        });

        res.status(201).json(livro);
    } catch (erro) {
        res.status(400).json({
            mensagem: 'Erro ao cadastrar livro',
            erro: erro.message,
        });
    }
}

async function listar(req, res) {
    try {
        const livros = await Livro.findAll();
        res.json(livros);
    } catch (erro) {
        res.status(400).json({
            mensagem: 'Erro ao listar livros',
            erro: erro.message,
        });
    }
}

module.exports = { cadastrar, listar };
