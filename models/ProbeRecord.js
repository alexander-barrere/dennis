const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ProbeRecord extends Model {}

  ProbeRecord.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    domain: { type: DataTypes.STRING, allowNull: false },
    record_type: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.JSON, allowNull: false },
    probed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    sequelize,
    modelName: 'ProbeRecord',
    timestamps: false,
    tableName: 'probe_records'
  });

  return ProbeRecord;
}
