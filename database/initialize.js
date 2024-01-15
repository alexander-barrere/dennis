const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const sequelize = require('./sequelize');
const models = require('../models');

const databaseDir = path.join(__dirname, '.');
const databasePath = path.join(databaseDir, './dnsprobe.sqlite');

if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
}

sequelize.options.storage = databasePath;

async function initialize() {
  try {
    await sequelize.authenticate();
    
    // Use initModels function instead of accessing models directly
    const initializedModels = models.initModels(sequelize);
    
    for (let modelName in initializedModels) {
      if (initializedModels.hasOwnProperty(modelName)) {
        await initializedModels[modelName].sync({ force: true });
      }
    }
    
    console.log('Connection has been established successfully and database tables are created.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = initialize;
