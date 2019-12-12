var trello = TrelloPowerUp.iframe();

// resize(trello, '#exportData')

t.render(function () {
    t.sizeTo('#exportData').done();
});

window.exportData.addEventListener('submit', function (event) {
    alert("clicou")
});