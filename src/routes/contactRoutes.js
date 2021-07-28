'use strict';

const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');

const { getContactList, getContactListByName, addContact } = contactController;

router.get('/contact', getContactList);
router.get('/contact/:name', getContactListByName);
router.post('/contact', addContact);

module.exports = {
  routes: router,
};
