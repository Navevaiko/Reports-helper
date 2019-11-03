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

app.get('/icons/:imageName', (request, response) => {
    response.sendFile(`${__dirname}/public/icons/${request.params.imageName}`);
});

app.get('/users/:id', (request, response) => {
    // TODO: Refatorar código e criar autenticação do usuário
    var options = {
      method: 'GET',
      url: 'https://api.trello.com/1/members/' + request.params.id,
      qs: {
        boardBackgrounds: 'none',
        boardsInvited_fields: 'name,closed,idOrganization,pinned',
        boardStars: 'false',
        cards: 'none',
        customBoardBackgrounds: 'none',
        customEmoji: 'none',
        customStickers: 'none',
        fields: 'all',
        organizations: 'none',
        organization_fields: 'all',
        organization_paid_account: 'false',
        organizationsInvited: 'none',
        organizationsInvited_fields: 'all',
        paid_account: 'false',
        savedSearches: 'false',
        tokens: 'none',
        key: process.env.API_KEY,
        token: '93eda3e8338d9c160e0e8a5e59fe1ac7b0562ad855329d9048df471764aff372'
      }
    };
    
    requestCreator(options, function (error, resp, body) {
      if (error) throw new Error(error);
      response.json(JSON.parse(body));
    });
});

const listener = app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`)
});