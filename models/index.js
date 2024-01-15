const Sequelize = require('sequelize');
const ProbeRecordModel = require('./ProbeRecord');

// Export init function to initialize all models
const initModels = (sequelize) => {
    const ProbeRecord = ProbeRecordModel(sequelize, Sequelize.DataTypes);

    // Initialize other models here if you have any

    return {
        ProbeRecord,
    };
};

module.exports = {
    initModels,
};
