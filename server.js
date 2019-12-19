require('dotenv/config');

const express = require('express');
const cors = require('cors');
var requestCreator = require("request");

const app = express();
app.use(cors({ origin: 'https://trello.com' }));

app.use(express.static('public'))

app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/public/views/index.html`)
});

app.get('/new_report', (request, response) => {
    response.sendFile(`${__dirname}/public/views/new_report.html`)
});

app.get('/reports_list', (request, response) => {
    response.sendFile(`${__dirname}/public/views/reports_list.html`)
});

app.get('/type_export', (request, response) => {
    response.sendFile(`${__dirname}/public/views/type_export.html`)
});

app.get('/icons/:imageName', (request, response) => {
    response.sendFile(`${__dirname}/public/icons/${request.params.imageName}`);
});

app.get('/reportstyle', (request, response) => {
    response.sendFile(`${__dirname}/public/css/report.css`);
});

const listener = app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
});