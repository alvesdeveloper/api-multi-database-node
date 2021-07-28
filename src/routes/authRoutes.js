'use strict';

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const { authenticate } = authController;

router.post('/authenticate', authenticate);

module.exports = {
  routes: router,
};
