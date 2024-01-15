const { Sequelize } = require('sequelize');
const { ProbeRecord } = require('../models');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './dnsprobe.sqlite',
  logging: false
});

async function initialize() {
  try {
    await sequelize.authenticate();
    await ProbeRecord.sync({ force: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

initialize();

module.exports = (sequelize, DataTypes) => {
  class ProbeRecord extends Sequelize.Model {}
  ProbeRecord.init({
    // model attributes
  }, {
    sequelize,
    modelName: 'ProbeRecord',
    // other model options
  });
  return ProbeRecord;
};
