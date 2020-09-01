var reportsKey = 'reports';
var reportsVisibility = 'shared'

const exportReports = trello => {
    return trello.popup({
        title: "Download",
        url: 'https://reports-helper.herokuapp.com/reports/download'
    });
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

const getReportsFromCurrentCard = async trello => {
    const pluginData = await trello.getAll();
    console.log('Data: ', pluginData);
    // const reports = [];
    // // let reportsKeys = [];
    // // console.log(pluginData);
    
    // if(pluginData.hasOwnProperty("shared")) {
    //     reportsKeys = Object.keys(pluginData.shared);
    //     cardAll = getAllCard.shared;
    // } else {
    //     reportsKeys = Object.keys(getAllCard);
    // }
    
    // reportsKeys.map(e => {
    //     try {
    //         let reportUni = cardAll[e];
    //         reportsFull.push(reportUni);
    //     } catch {
    //         return;
    //     }
    // })
    // return reportsFull;
}

const showBadge = reports => {
    var reportsCount = reports.length;
    const message = reportsCount === 0? undefined : `${reportsCount} ${(reportsCount > 1 ? "relatórios" : 'relatório')}`;

    return [{
        icon: 'https://reports-helper.herokuapp.com/assets/reports.svg',
        text: message || 'Sem relatórios',
        color: message ? 'green' : 'light-gray'
    }];
}

const resize = (trello, elementId) => trello.render(() => trello.sizeTo(elementId).done());

const getCardDetailsById = trello => trello.card('all');

const clearBoxes = inputs => inputs.forEach(elements => { elements.value = "" })

const trelloAlert = (trello, text, duration, display) => {
    return trello.alert({
        message: text,
        duration: duration,
        display: display
    })
}