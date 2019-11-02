var trello = TrelloPowerUp.iframe();
var context = JSON.stringify(trello.getContext());

resize(trello, '#newReport')

window.newReport.addEventListener('submit', function(event) {
    event.preventDefault();
    var card = {};
    console.log(context);
    getCardDetailsById(trello, context.card)
        .then(function(serializedCard) {
            card = JSON.stringify(serializedCard);
            
            addReport(card);
        })
        .catch(function(error) {
            console.log(error);
            alert('Ocorreu um erro, por favor tente novamente mais tarde');
        });
});

function addReport(card) {
    var startTime = window.startTime.value;
    var endTime = window.endTime.value;
    var commitLink = window.commitLink.value;
    var comment = window.comment.value;
    var cardURL = card.shortUrl;
    var membersIds = card.idMembers;
    var title = card.name;
    var currDate = Date.now();

    formatedCurrDate = (currDate.getDate().length = 1? "0": "") + currDate.getDate() + "/" + currDate.getMonth() + "/" + currDate.getFullYear();

    if(startTime && endTime && comment) {
        if(endTime > startTime) {
            var report = {
                'date': formatedCurrDate,
                'title': title,
                'card': cardURL,
                'membersIds': membersIds,
                'starTime': startTime,
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