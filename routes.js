const { Router } = require('express');

const router = Router();

router.get('/new_report', (request, response) => {
    response.sendFile(`${__dirname}/public/views/new_report.html`)
});

router.get('/reports_list', (request, response) => {
    response.sendFile(`${__dirname}/public/views/reports_list.html`)
});

router.get('/type_export', (request, response) => {
    response.sendFile(`${__dirname}/public/views/type_export.html`)
});

router.get('/icons/:imageName', (request, response) => {
    response.sendFile(`${__dirname}/public/icons/${request.params.imageName}`);
});

router.get('/reportstyle', (request, response) => {
    response.sendFile(`${__dirname}/public/css/report.css`)
})

router.get('/', (request, response) => {
    response.sendFile(`${__dirname}/public/views/index.html`)
});

module.exports = router;