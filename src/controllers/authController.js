const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        // Verifica se email e senha foram enviados
        if (!email || !senha) {
            return res.status(400).json({
                mensagem: 'Email e senha são obrigatórios'
            });
        }

        // Procura o usuário pelo email
        const usuario = await Usuario.findOne({
            where: { email }
        });

        // Verifica se o usuário existe
        if (!usuario) {
            return res.status(401).json({
                mensagem: 'Email ou senha inválidos'
            });
        }

        // Compara a senha informada com a senha criptografada do banco
        const senhaConfere = await bcrypt.compare(
            senha,
            usuario.senha
        );

        // Verifica se a senha está correta
        if (!senhaConfere) {
            return res.status(401).json({
                mensagem: 'Email ou senha inválidos'
            });
        }

        // Cria o token
        const token = jwt.sign(
            {
                id: usuario.id,
                tipo: usuario.tipo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '8h'
            }
        );

        // Retorna sucesso
        return res.status(200).json({
            mensagem: 'Login realizado com sucesso',
            token
        });

    } catch (erro) {
        console.error('Erro no login:', erro);

        return res.status(500).json({
            mensagem: 'Erro ao fazer login',
            erro: erro.message
        });
    }
}

module.exports = {
    login
};