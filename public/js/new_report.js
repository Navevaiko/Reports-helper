const trello = TrelloPowerUp.iframe();

resize(trello, '#newReport')

window.newReport.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const startTime = window.startTime.value;
    const endTime = window.endTime.value;
    const commitLink = window.commitLink.value;
    const comment = window.comment.value;
    
    if(startTime && endTime && comment) {
        if(endTime > startTime) {
            const report = { startTime, endTime, commitLink, comment };

            return addNewReport(trello, report)
        }
        else alert('O tempo de início deve ser menor que o tempo de fim da tarefa.');
    }
    else alert('Preencha todos os campos.');
});