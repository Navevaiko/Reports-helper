var trello = TrelloPowerUp.iframe();

// resize(trello, '#exportData')

trello.render(function () {
    trello.sizeTo('#exportData').done();
});

window.exportData.addEventListener('submit', function (event) {
    event.preventDefault()
    alert("clicou");


    let a = trello.get('board', 'shared')
        .then(function (data) {
            console.log("-----");
            console.log(JSON.stringify(data, null, 2));
            console.log("-----");
            return data;
        });
    console.log(a)

    getReports(trello).then(teste);


    trello.closePopup();
});

function teste(data) {
    console.log(data)
}