const { Router } = require('express');

const router = Router();

router.get('/', (_, response) => {
    response.sendFile(`${__dirname}/public/views/index.html`)
});

router.get('/reports/new', (_, response) => {
    response.sendFile(`${__dirname}/public/views/new_report.html`)
});

router.get('/reports', (_, response) => {
    response.sendFile(`${__dirname}/public/views/reports_list.html`)
});

router.get('/reports/download', (_, response) => {
    response.sendFile(`${__dirname}/public/views/download_report.html`)
});

router.get('/assets/:assetName', (request, response) => {
    response.sendFile(`${__dirname}/public/asset/${request.params.assetName}`);
});

router.get('/styles/', (_, response) => {
    response.sendFile(`${__dirname}/public/css/report.css`)
});

module.exports = router;