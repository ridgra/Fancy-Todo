require('dotenv').config();
const express = require('express');
const errHandler = require('./middlewares/errHandler');
const router = require('./routes');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
app.use(errHandler);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
