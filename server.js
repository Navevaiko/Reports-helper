require('dotenv/config');

const express = require('express');
const cors = require('cors');

const routes = require('./routes')

const app = express();
app.use(cors({ origin: 'https://trello.com' }));
app.use(express.static('public'))
app.use('/', routes)

app.listen(process.env.PORT);