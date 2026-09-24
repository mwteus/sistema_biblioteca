const express = require('express');
const sequelize = require('./config/database');
const clienteRoutes = require('./routes/clienteRoutes');
const authRoutes = require('./routes/authRoutes');
const livroRoutes = require('./routes/livroRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(clienteRoutes);
app.use(usuarioRoutes);
app.use(authRoutes);
app.use(livroRoutes);
app.use(movimentacaoRoutes);

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados');
    await sequelize.sync();
    console.log('Modelos sincronizados com o banco');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  } catch (erro) {
    console.error(
      'Erro ao iniciar o sistema:',
      erro.message
    );
  }
}

iniciarServidor();