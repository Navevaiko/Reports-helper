var trello = TrelloPowerUp.iframe();
var cardId = JSON.stringify(trello.getContext()).card;

resize(trello, '#newReport')
console.log(id);
window.newReport.addEventListener('submit', function(event) {
    event.preventDefault();
    
    var startTime = window.startTime.value;
    var endTime = window.endTime.value;
    var commitLink = window.commitLink.value;
    var comment = window.comment.value;
    
    if(startTime && endTime && comment) {
        if(endTime > startTime) {
            var report = { startTime, endTime, commitLink, comment };
             
            return addNewReport(trello, report)
        }
        else alert('O tempo de início deve ser menor que o tempo de fim da tarefa.');
    }
    else alert('Preencha todos os campos.');
});