const { DataTypes } = require('sequelize');
const Sequelize = require('../config/database');
const Livro = require('./Livro');

const Movimentacao = sequelize.define('Movimentacao', {
    tipo: {
        type: DataTypes.ENUM('entrada', 'saida'),
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    data: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

Livro.hasMany(Movimentacao, { foreignKey: 'livro_id' });

Movimentacao.belongsTo(Livro, { foreignKey: 'livro_id' });

module.exports = Movimentacao;