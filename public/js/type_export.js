var trello = TrelloPowerUp.iframe();

trello.render(function () {
    trello.sizeTo('#exportData').done();
});

window.exportData.addEventListener('submit', async event => {
    event.preventDefault()

    let json = await trello.getAll()


    console.log(json)



    // let nameFile = window.typeData.value

    // download(`data${nameFile}`, JSON.stringify(dataJson))

    // trello.closePopup();
});

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
