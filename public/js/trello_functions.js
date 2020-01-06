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

        let date = new Date();
        let myKey = `${reportsKey}_${date.getTime()}`

        console.log("myKey sendo salva", myKey)

        trello
            .set('card', reportsVisibility, myKey, reports)
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
    let getAll = await trello.getAll();

    console.log(Object.keys(getAll))
    console.log(getAll[6])
    console.log(getAll._bitField);
    console.log(getAll.E);


    concatMyKeyInObj(getAll)

}

const concatMyKeyInObj = reports => {
    console.log("Reports in concatMyKeyInObj", reports)
    return reports;
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