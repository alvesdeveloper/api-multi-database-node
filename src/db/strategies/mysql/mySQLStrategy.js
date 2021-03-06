const IDb = require('../base/interfaceDb');
const Sequelize = require('sequelize');

class MySQLStrategy extends IDb {
  constructor(connection, schema) {
    super();
    this._db = schema;
    this._connection = connection;
  }

  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options);
    await model.sync();
    return model;
  }

  static async connect() {
    const sequelize = new Sequelize(
      'admin', //database
      'admin', // user
      'admin', //senha
      {
        host: 'localhost',
        dialect: 'mysql',
        // case sensitive
        quoteIdentifiers: false,
        // deprecation warning
        //operatorsAliases: false,
        //disable logging
        logging: false,
        // dialectOptions: {
        //   ssl: true,
      }
    );
    return sequelize;
  }

  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.error('fail!', error);
      return false;
    }
  }

  create(item) {
    return this._db.create(item, {
      raw: true,
    });
  }

  read(item) {
    return this._db.findAll({
      where: item,
      raw: true,
    });
  }

  update(id, item) {
    return this._db.update(item, {
      where: {
        id,
      },
    });
  }
  delete(id) {
    const query = id
      ? {
          id,
        }
      : {};
    return this._db.destroy({
      where: query,
    });
  }
}

module.exports = MySQLStrategy;
