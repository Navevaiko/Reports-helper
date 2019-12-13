var trello = TrelloPowerUp.iframe();

// resize(trello, '#exportData')

trello.render(function () {
    trello.sizeTo('#exportData').done();
});

window.exportData.addEventListener('submit', async event => {
    event.preventDefault()
    alert("clicou");


    let a = await trello.getAll()
    console.log(a)




    trello.closePopup();
});

