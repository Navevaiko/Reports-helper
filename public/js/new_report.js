var trello = TrelloPowerUp.iframe();

resize(trello, '#newReport')

window.newReport.addEventListener('submit', async event => {
    event.preventDefault();
    var card = {};

    card = await getCardDetailsById(trello);

    list = document.getElementById(reportsList)

    console.log(list)

    addReport(JSON.stringify(card));
});

const toDate = dateStr => {
    var parts = dateStr.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

const addReport = card => {

    console.log(reportList)

    let startTime = window.startTime.value;
    let endTime = window.endTime.value;
    let commitLink = window.commitLink.value;
    let comment = window.comment.value;
    let cardURL = JSON.parse(card).url;
    let membersIds = card.members;
    let title = card.name;
    let labels = card.labels
    let currDate = toDate(window.startDate.value);

    dateSplit = currDate.split('/')

    currDia = dateSplit[0]; currMes = dateSplit[1]; currAno = dateSplit[2];

    if (startTime && endTime && comment) {

        if(currDia == 'undefined' || currMes == 'undefined' || currAno == "") return alert("Insira uma data em 'Início da tarefa'")

        if (endTime > startTime) {
            let report = {
                currDate,
                title,
                cardURL,
                membersIds,
                startTime,
                endTime,
                commitLink,
                comment,
                labels
            };

            return addNewReport(trello, report)
        } else {
            alert('O tempo de início deve ser menor que o tempo de fim da tarefa.');
        }
    }
    else alert("Preencha todos os campos!")
}