require('dotenv').config();

const express = require('express');

const app = express();

const api = require('./api/apiHander');

api.installHandler(app);

app.listen(process.env.API_SERVER_PORT, () => console.log('Listening on PORT', process.env.API_SERVER_PORT));
