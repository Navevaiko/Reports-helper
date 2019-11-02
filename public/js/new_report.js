const trello = TrelloPowerUp.iframe();

trello.render(function() {
    trello.sizeTo('#newReport').done();
});

window.newReport.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const startTime = window.startTime.value;
    const endTime = window.endTime.value;
    const commitLink = window.commitLink.value;
    const comment = window.comment.value;
    
    if(startTime && endTime && comment) {
        if(endTime > startTime) {
            const report = { startTime, endTime, commitLink, comment };

            return trello.set('card', 'shared', 'reports', report)
                .then(() => {
                    trello.closeModal();
                });
        }else{
            trello.alert({
                message: 'O tempo de início deve ser menor que o tempo de fim da tarefa.',
                duration: 5,
                display: 'error'
            });
        }
    }else{
        trello.alert({
            message: 'Preencha todos os campos.',
            duration: 5,
            display: 'error'
        });
    }
});