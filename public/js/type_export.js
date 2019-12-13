var trello = TrelloPowerUp.iframe();

// resize(trello, '#exportData')

trello.render(function () {
    trello.sizeTo('#exportData').done();
});

window.exportData.addEventListener('submit', function (event) {
    event.preventDefault()
    alert("clicou");

    console.log(trello.iframe)
    console.log(window.exportData.DataView);
    console.log(window.exportData.DataView.options);
    console.log(window.DataTransfer);
    console.log(window.DataView());


    trello.closePopup();
});