var reportsKey = 'reports';
var reportsVisibility = 'shared'

const showNewReportModal = trello => {
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

    let attachmentsElement = "<object type='image/svg+xml' data='/icons/attachments.svg'> Anexos </object>";

    mainElement = `<li class='report'> 
                        <p id=\txt_info\">   ${report.comment} </p> 
                        <span><a href='  ${report.commitLink}' target='_blank'> Commit </a></span>
                        ${(report.attachments ? attachmentsElement : "")}
                        <div class='datetimeInfo'> 
                            <span> ${report.currDate} </span> 
                            <span> ${report.startTime} ás ${report.endTime} </span> 
                        </div>
                        <div class="remove_report" id="${report.key}">X</div>
                    </li><hr/>`;

    window.reportsList.innerHTML += mainElement;

    console.log(mainElement)

    let date = new Date();
    let myKey = `${reportsKey}_${date.getTime()}`

    report.key = myKey
    getReports(trello).then(function (reports) {
        reports.push(report);

        trello
            .set('card', reportsVisibility, myKey, report)
            .then(function () { trello.closeModal(); })
            .catch(function (error) {
                alert("Ocorreu um erro, por favor tente novamente mais tarde");
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