const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const router = require('./routes');
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
