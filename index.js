'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRouters = require('./src/routes/authRoutes');
const authMiddleware = require('./src/middlewares/auth');
const contactRouters = require('./src/routes/contactRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//test
app.post('/', (req, res) => {
  res.send(req.body);
});

app.use('/api', authRouters.routes);
app.use(authMiddleware);
app.use('/api', contactRouters.routes);

app.listen(config.port, () =>
  console.log('Server is listening on http://localhost:' + config.port)
);
