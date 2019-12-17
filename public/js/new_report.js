let trello = TrelloPowerUp.iframe();

resize(trello, '#newReport')

window.newReport.addEventListener('submit', function (event) {
    event.preventDefault();
    var card = {};

    getCardDetailsById(trello)
        .then(function (serializedCard) {
            card = JSON.stringify(serializedCard);
            console.log(card);
            addReport(card);
        })
        .catch(function (error) {
            console.log(error);
            alert('Ocorreu um erro, por favor tente novamente mais tarde');
        });
});
function toDate(dateStr) {
    var parts = dateStr.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function addReport(card) {
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
                'date': currDate,
                'title': title,
                'card': cardURL,
                'membersIds': membersIds,
                'startTime': startTime,
                'startDate': startDate,
                'endTime': endTime,
                'commitLink': commitLink,
                'comment': comment
            };

            return addNewReport(trello, report)
        }
        else alert('O tempo de início deve ser menor que o tempo de fim da tarefa.');
    }
    else alert('Preencha todos os campos.');
}