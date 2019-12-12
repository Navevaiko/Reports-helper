var trello = TrelloPowerUp.iframe();

// resize(trello, '#exportData')

t.render(function (t) {
    t.sizeTo('#exportData').done();
});

window.exportData.addEventListener('submit', function (event) {
    event.preventDefault()
    alert("clicou");
    return "Ola"
});