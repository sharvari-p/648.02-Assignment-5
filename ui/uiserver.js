require('dotenv').config();

const express = require('express');
const path = require('path');

const PORT = process.env.UI_SERVER_PORT;
const app = express();

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };
app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.use(express.static(path.join(__dirname, '/public')));

app.listen(PORT, () => console.log('Listening on PORT', PORT));
