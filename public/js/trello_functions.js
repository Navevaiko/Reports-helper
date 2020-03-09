console.log("trello_functions chamada...")

var reportsKey = 'reports';
var reportsVisibility = 'shared'

const showNewReportModal = trello => { 

    resize(trello, '#newReport')

    window.newReport.addEventListener('submit', async event => {

        console.log(event)
        console.log("Clicou")

        // event.preventDefault();
        // var card = {};
    
        // card = await getCardDetailsById(trello);
    
        // addReport(JSON.stringify(card));
    });
     
    return trello.modal({
        title: 'Novo relatório',
        url: 'new_report',
        fullscreen: false,
    })
}

const showConfirmationDialogue = trello => {
    return trello.popup({
        title: "Excluir relátorio?",
        url: 'https://reports-helper.herokuapp.com/confirmation'
    })
}

const showTypesDataExport = trello => {
    return trello.popup({
        title: "Download",
        url: 'https://reports-helper.herokuapp.com/type_export'
    })
}

const addNewReport = (trello, report) => {

    let date = new Date();
    let myKey = `${reportsKey}_${date.getTime()}`

    report.key = myKey
    getReports(trello).then(function (reports) {
        reports.push(report);

        trello
            .set('card', reportsVisibility, myKey, report)
            .then(function () {
                trello.closeModal();                 
            })
            .catch(function (error) {
                alert("Ocorreu um erro, por favor tente novamente mais tarde");

                console.log(error)
            });

    });
}

const getReports = async trello => {
    let getAll = await trello.getAll();
    return getReportsAnyKy(getAll.card);
}


const getReportsAnyKy = getAllCard => {

    let reportsFull = [];
    let reportsKeys = [];
    let cardAll = getAllCard;

    if (getAllCard) {
        if (getAllCard.hasOwnProperty("shared")) {
            reportsKeys = Object.keys(getAllCard.shared);
            cardAll = getAllCard.shared;
        } else {
            reportsKeys = Object.keys(getAllCard);
        }

    }


    reportsKeys.map(e => {
        try {
            let reportUni = cardAll[e];
            reportsFull.push(reportUni);
        } catch {
            return;
        }
    })
    return reportsFull;
}

const concatMyKeyInObj = card => {

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
    //tratar dados
    cardContent = getReportsAnyKy(cardContent);

    let result = cardContent.map(e => {
        e.members = card.members;
        e.title = card.name;
        e.card = card.url;
        e.labels = card.labels;

        return e;
    });

    return result;
}