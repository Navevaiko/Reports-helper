var trello = TrelloPowerUp.iframe();

resize(trello, '#newReport')

window.newReport.addEventListener('submit', async event => {
    event.preventDefault();
    var card = {};

    card = await getCardDetailsById(trello);

    addReport(JSON.stringify(card));
    console.log(card);
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
    let cardURL = card.shortUrl;
    let membersIds = card.members;
    let title = card.name;
    let labels = card.labels
    let currDate = toDate(window.startDate.value);
    let date = window.startDate.value;

    // formatedCurrDate = (currDate.getDate().length == 1 ? "0" : "") + currDate.getDate() + "/" + currDate.getMonth() + "/" + currDate.getFullYear();

    if (startTime && endTime && comment) {
        if (endTime > startTime) {
            let report = {
                currDate,
                title,
                cardURL,
                membersIds,
                startTime,
                date,
                endTime,
                commitLink,
                comment,
                labels
            };

            return addNewReport(trello, report)
        }
        else alert('O tempo de início deve ser menor que o tempo de fim da tarefa.');
    }
    else alert('Preencha todos os campos.');
}