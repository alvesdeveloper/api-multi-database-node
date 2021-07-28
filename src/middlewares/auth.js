const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'Token não informado' });

  //verificando se o token está no formato válido, dividindo ele em duas partes
  const parts = authHeader.split(' ');

  //verificando se foi dividio em duas partes
  if (!parts.lenght === 2)
    return res.status(401).send({ error: 'Token com erro' });

  //vamos desestruturar as partes
  const [scheme, token] = parts;

  //vamos verificar se o "Bearer" veio na primeira parte
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token mal formatado' });

  //verifica se o token é valido
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token inválido' });

    req.validClient = decoded.validClient;
    return next();
  });
};
