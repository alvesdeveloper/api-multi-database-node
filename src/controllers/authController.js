'use strict';
const jwt = require('jsonwebtoken');

const config = require('../../config');
const clientData = require('../utils/clientData');

function generateToken(params = {}) {
  return jwt.sign(params, config.secret, {
    expiresIn: 86400, //1 dia
  });
}

const authenticate = async (req, res, next) => {
  try {
    const { client } = req.body;
    const validClient = clientData.getClientByName(client);

    if (!validClient)
      return res.status(400).send({ error: 'Cliente não encontrado' });

    //enviando o token gerado
    res.send({
      validClient,
      token: generateToken({ validClient: validClient }),
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  authenticate,
};
