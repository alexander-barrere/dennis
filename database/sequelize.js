const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './dnsprobe.sqlite',
  logging: false
});

module.exports = sequelize;
