var reportsKey = 'reports';
var reportsVisibility = 'shared'

const showTypesDataExport = trello => {
    return trello.popup({
        title: "Download",
        url: 'https://reports-helper.herokuapp.com/type_export'
    })
}

const showDetailsBoard = async trello => {

    import api from './../services/api';

    let members = await trello.board('members');
    let org = await trello.board('idOrganization');
    let board = await trello.board('id');
    // let cards = await trello.cards('all');

    const response = await api.post(`organizations/${org.idOrganization}/projects/${board.id}`);

    console.log(response);

    // console.log("Quadros:")
    // console.log(board.id);
    // console.log("Membros:")
    // console.log([members]);
    // console.log("Organização:")
    // console.log(idOrg.idOrganization);

}

const addNewReport = async (trello, report) => {

    const date = new Date();
    let liArray = [];
    let myKey = `${reportsKey}_${date.getTime()}`
    report.key = myKey

    getReports(trello).then(function (reports) {

        // Ordenando array de relatórios
        reports.push(report);
        reports.sort((a, b) => {
            if(a.currDate > b.currDate) return -1
            if(a.currDate < b.currDate) return 1
            return 0
        });

        const allLiReports = window.reportsList.querySelectorAll('li')
        allLiReports.forEach(element => liArray.push(element))

        if(liArray.length){ // Se existir relatóro

            const lastLiArray = liArray[liArray.length - 1],
            dateNewReport = report.currDate.split('/'),
            startTimeNewReport = report.startTime;

            let timestampNewReport = toTimestamp(dateNewReport[2], dateNewReport[1], dateNewReport[0]);

            // some() - a função para quando retorna verdadeiro
            liArray.some((element, index) => {

                const dateReport = element.querySelectorAll('.pDate')[0],
                dateTime = dateReport.innerHTML.split(' - '),
                dateFormat = dateTime[0].split('/'),
                timeFormat = dateTime[1].split(' ás '),
                startTime = timeFormat[0],
                timestampReport = toTimestamp(dateFormat[2], dateFormat[1], dateFormat[0]);

                // Inserindo relatório e ordenando por data de criação 
                if(timestampNewReport > timestampReport){ 
                    element.insertAdjacentHTML('beforebegin', createReportElement(report));
                    return true;
                } else if (timestampNewReport == timestampReport) {
                    if(startTimeNewReport > startTime || startTimeNewReport == startTime){
                        element.insertAdjacentHTML('beforebegin', createReportElement(report));
                        return true;
                    }
                } else if (element == lastLiArray) { // Inserir por último
                    element.insertAdjacentHTML('afterend', createReportElement(report));
                    return true;
                } else return false;
            })
        } else { // Caso não exista nenhum relatório
            window.reportsList.innerHTML = createReportElement(report)
        }

        let allElements = Array.prototype.slice.call(document.querySelectorAll(".img_remove_report"));
        let elementsForEditing = Array.prototype.slice.call(document.querySelectorAll(".img_edit_report"));

        removeReport(allElements)
        editReport(elementsForEditing)
        
        trello.set('card', reportsVisibility, myKey, report)
            .then(function () {
                console.log("Relatório criado!")           
            })
            .catch(function (error) {
                if(error.message.indexOf("4096") >= 0)
                    alert("Número de caracteres excedido! Você só pode ter 4096 caracteres por card")
                else alert("Ocorreu um erro, por favor tente novamente mais tarde");
            });
    });
}

const getReports = async trello => {
    let getAll = await trello.getAll();
    console.log(trello);
    console.log(trello.getAll());
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