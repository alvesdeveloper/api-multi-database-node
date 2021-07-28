const Sequelize = require('sequelize');
const ContactSchema = {
  schema: {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(200),
      required: true,
    },
    cellphone: {
      type: Sequelize.STRING(20),
      required: true,
    },
  },
  options: {
    //opcoes para base existente
    tableName: 'TB_CONTACT',
    freezeTableName: false,
    timestamps: false,
  },
};

module.exports = ContactSchema;
