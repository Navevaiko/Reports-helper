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

const addNewReport = async (trello, report) => {

    let date = new Date();
    let myKey = `${reportsKey}_${date.getTime()}`
    let reportsElementsList = "";

    report.key = myKey
    getReports(trello).then(function (reports) {

        reports.push(report);
        reports.sort((a, b) => {
            if(a.currDate > b.currDate) return -1
            if(a.currDate < b.currDate) return 1
            return 0
        });

        let allLiReports = window.reportsList.querySelectorAll('li')

        allLiReports.map(element => {

            let dateReport = element.querySelectorAll('.pDate')[0]

            const dateTime = dateReport.innerHTML.split(' - ')
            const dateFormat = dateTime[0];

            if(!report.currDate < dateFormat){
                console.log("É maior")
            }
                // element.insertAdjacentHTML('beforebegin', report);
        })

        console.log(allLiReports)

        reports.forEach(report => {

            reportsElementsList += createReportElement(report)

        })

        console.log(reportsElementsList)

        window.reportsList.innerHTML += createReportElement(report)

        let allElements = Array.prototype.slice.call(document.querySelectorAll(".img_remove_report"));
        let elementsForEditing = Array.prototype.slice.call(document.querySelectorAll(".img_edit_report"));

        removeReport(allElements)
        editReport(elementsForEditing)
        
        trello.set('card', reportsVisibility, myKey, report)
            .then(function () {
                console.log("Relatório criado!")           
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

const concatMyKeyInObj = card => {}

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

const resize = (trello, elementId) => trello.render(() => trello.sizeTo(elementId).done());

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

// Funções para data
const leftPad = (value, totalWidth, paddingChar) => {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
};
const dateToEN = date => date.split('/').reverse().join('-');
const dateToPTBR = date => date.split('-').reverse().join('/');

// Limpa caixas de texto
const clearBoxes = inputs => inputs.forEach(elements => { elements.value = "" })

// Alert do Trello
const trelloAlert = (trello, text, duration, display) => {
    return trello.alert({
        message: text,
        duration: duration,
        display: display
    })
}