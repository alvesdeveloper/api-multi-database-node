'use strict';
const Context = require('../db/strategies/base/contextStrategy');
const Postgres = require('../db/strategies/postgres/postgresSQLStrategy');
const Mysql = require('../db/strategies/mysql/mySQLStrategy');

const ContactSchemaPG = require('../db/strategies/postgres/schemas/contactSchema');
const ContactSchemaMySQL = require('../db/strategies/mysql/schemas/contactSchema');

const clientData = require('../utils/clientData');

const getContactList = async (req, res, next) => {
  try {
    const database = clientData.getDatabaseByClient(req.validClient);
    const result = await _execActionDB(
      req,
      database,
      'list',
      _getSchemaByDatabase(database)
    );

    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getContactListByName = async (req, res, next) => {
  try {
    const contactName = req.params.name;

    const database = clientData.getDatabaseByClient(req.validClient);
    const result = await _execActionDB(
      contactName,
      database,
      'listByName',
      _getSchemaByDatabase(database)
    );

    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addContact = async (req, res) => {
  try {
    const database = clientData.getDatabaseByClient(req.validClient);

    const { contacts } = req.body;

    const contactsConverted = contacts.map((contact) => {
      return clientData.formatContact(database, contact);
    });

    const result = await _execActionDB(
      contactsConverted,
      database,
      'add',
      _getSchemaByDatabase(database)
    );

    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

async function _execActionDB(req, dataBase, action, schema) {
  let result;
  let context;

  if (dataBase === 'postgres') {
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, schema);
    context = new Context(new Postgres(connection, model));
  } else if (dataBase === 'mysql') {
    const connection = await Mysql.connect();
    const model = await Mysql.defineModel(connection, schema);
    context = new Context(new Mysql(connection, model));
  }

  switch (action) {
    case 'list':
      result = await context.read();
      break;

    case 'listByName':
      result = await context.read({ name: req });
      break;

    case 'add':
      for (let contato of req) {
        result = await context.create(contato);
      }
      break;

    default:
      result = { error: 'Ação inválida' };
  }

  return result;
}

function _getSchemaByDatabase(database) {
  if (database === 'postgres') {
    return ContactSchemaPG;
  } else if (database === 'mysql') {
    return ContactSchemaMySQL;
  }
}

module.exports = {
  getContactList,
  addContact,
  getContactListByName,
};
