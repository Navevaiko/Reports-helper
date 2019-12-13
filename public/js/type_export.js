var trello = TrelloPowerUp.iframe();
var json;
// resize(trello, '#exportData')

trello.render(function () {
    trello.sizeTo('#exportData').done();
});

window.exportData.addEventListener('submit', async event => {
    event.preventDefault()

    json = await trello.getAll()
    console.log(json)




    trello.closePopup();
});

