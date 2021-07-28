'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const { PORT, HOST, HOST_URL, SECRET } = process.env;

assert(PORT, 'PORT is require');
assert(HOST, 'HOST is required');

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  secret: SECRET,
};
