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

    console.log("Card: ")
    console.log(card)

    console.log("tempo inicial: " + startTime)
    console.log("tempo final: " + endTime)
    console.log("Commit: " + commitLink)
    console.log("Comentário: " + comment)
    console.log("URL do Card: " + cardURL)
    console.log("Membros IDS: " + membersIds)
    console.log("Titulo: " + title)
    console.log("labels: " + labels)
    console.log("Data: " + currDate)

    dateSplit = currDate.split('/')

    dia = dateSplit[0]
    mes = dateSplit[1]
    ano = dateSplit[2]

    if(dia != undefined || mes != undefined || ano != "") {

        if (startTime && endTime && comment) {

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
    
                alert("Sucesso!")

                // return addNewReport(trello, report)
            } else {
                alert('O tempo de início deve ser menor que o tempo de fim da tarefa.');
            }
        }

    } else {
       alert("Preencha todos os campos!")
    }
}