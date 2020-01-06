var reportsKey = 'reports';
var reportsVisibility = 'shared'

const showNewReportModal = trello => {
    return trello.modal({
        title: 'Novo relatório',
        url: 'new_report',
        fullscreen: false,
    })
}

const showTypesDataExport = trello => {
    return trello.popup({
        title: "Download",
        url: 'https://reports-helper.herokuapp.com/type_export'
    })
}

const addNewReport = (trello, report) => {
    getReports(trello).then(function (reports) {
        reports.push(report);

        trello
            .set('card', reportsVisibility, reportsKey, reports)
            .then(function () { trello.closeModal(); })
            .catch(function (error) {
                console.log(error);
                alert("Ocorreu um erro, por favor tente novamente mais tarde");
            });

    });
}

const getReports = trello => trello.get('card', reportsVisibility, reportsKey, []); console.log("o que é é", trello.get('card', reportsVisibility, reportsKey, []));


const showBadge = reports => {
    var reportsCount = reports.length;

    if (reportsCount != 0)
        var message = `${reportsCount} ${(reportsCount > 1 ? "relatórios" : 'relatório')}`;

    return [{
        icon: 'https://reports-helper.herokuapp.com/icons/reports.svg',
        text: message || 'Sem relatórios',
        color: message ? 'green' : 'light-gray'
    }]
}

const resize = (trello, elementId) => {
    trello.render(function () {
        trello.sizeTo(elementId).done();
    })
}

const getCardDetailsById = trello => trello.card('all');

const getCardContent = trello => trello.getAll()

const getDataCardExport = (cardContent, card) => {

    let result = cardContent.shared.reports.map(e => {
        e.members = card.members;
        e.title = card.name;
        e.card = card.url;
        e.labels = card.labels;

        return e;
    });

    return result;
}