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
    let myKey = `${reportsKey}_${date.getTime()}`
    report.key = myKey
    getReports(trello).then(function (reports) {
        reports.push(report);

        let date = new Date();

        console.log("myKey sendo salva", myKey)

        trello
            .set('card', reportsVisibility, myKey, report)
            .then(function () { trello.closeModal(); })
            .catch(function (error) {
                console.log(error);
                alert("Ocorreu um erro, por favor tente novamente mais tarde");
            });

    });
}

const getReports = trello => {
    getReportsAnyKy(trello);
    return trello.get('card', reportsVisibility, reportsKey, [])

};

const getReportsAnyKy = async trello => {
    let getAll = await getCardContent(trello);
    concatMyKeyInObj(getAll)
}

const concatMyKeyInObj = card => {
    let reportsKeys = Object.keys(card.card.shared);
    console.log(card.card.shared)
    console.log(reportsKeys);
}

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