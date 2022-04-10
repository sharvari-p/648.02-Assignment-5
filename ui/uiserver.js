/* eslint-disable linebreak-style */

const express = require('express');
require('dotenv').config();
const path = require('path');

const app = express();

app.use(express.static('public'));

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

const port = process.env.UI_SERVER_PORT || 8000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`UI started on port ${port}`);
});
