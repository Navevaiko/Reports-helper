var trello = TrelloPowerUp.iframe();

// resize(trello, '#exportData')

trello.render(function () {
    trello.sizeTo('#exportData').done();
});

window.exportData.addEventListener('submit', function (event) {
    event.preventDefault()
    alert("clicou");


    trello.get('board', 'shared')
        .then(function (data) {
            console.log("-----");
            console.log(JSON.stringify(data, null, 2));
            console.log("-----");
        });

    console.log(trello.iframe)
    console.log(window.exportData.DataView);
    console.log(window.DataTransfer);


    getReports(trello).then(teste);


    trello.closePopup();
});

function teste(data) {
    console.log(teste)
}