var trello = TrelloPowerUp.iframe();

resize(trello, '#newReport')

window.newReport.addEventListener('submit', async event => {
    event.preventDefault();
    var card = {};

    card = await getCardDetailsById(trello);

    addReport(JSON.stringify(card));
});

const toDate = dateStr => {
    var parts = dateStr.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

const addReport = card => {
    let startTime = window.startTime.value;
    let endTime = window.endTime.value;
    let commitLink = window.commitLink.value;
    let comment = window.comment.value;
    let cardURL = JSON.parse(card).url;
    let membersIds = card.members;
    let title = card.name;
    let labels = card.labels
    let currDate = toDate(window.startDate.value);

    console.log(currDate)

    if (startTime && endTime && comment) {

        let dateSplit = currDate.split("/")

        if(dateSplit[0] != undefined || dateSplit[1] != undefined || dateSplit[2] != ""){

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
        } else {
            alert("Por favor, insira uma data em 'Início de tarefa'")
        }
    }
    else alert('Preencha todos os campos.');
}