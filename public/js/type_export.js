var trello = TrelloPowerUp.iframe();

// resize(trello, '#exportData')

trello.render(function () {
    trello.sizeTo('#exportData').done();
});

window.exportData.addEventListener('submit', function (event) {
    event.preventDefault()
    alert("clicou");
    console.log(trello.get('card', 'shared', 'newReport'))
    console.log(trello)
    console.log(trello.exportData)

    trello.closePopup();
});