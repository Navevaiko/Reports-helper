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
    var startTime = window.startTime.value;
    var endTime = window.endTime.value;
    var commitLink = window.commitLink.value;
    var comment = window.comment.value;
    var cardURL = card.shortUrl;
    var membersIds = card.members;
    var title = card.name;
    var currDate = toDate(window.startDate.value);
    var startDate = window.startDate.value;

    // formatedCurrDate = (currDate.getDate().length == 1 ? "0" : "") + currDate.getDate() + "/" + currDate.getMonth() + "/" + currDate.getFullYear();

    if (startTime && endTime && comment) {
        if (endTime > startTime) {
            var report = {
                currDate,
                title,
                cardURL,
                membersIds,
                startTime,
                startDate,
                endTime,
                commitLink,
                comment
            };

            return addNewReport(trello, report)
        }
        else alert('O tempo de início deve ser menor que o tempo de fim da tarefa.');
    }
    else alert('Preencha todos os campos.');
}