var trello = TrelloPowerUp.iframe();
var json;
// resize(trello, '#exportData')

trello.render(function () {
    trello.sizeTo('#exportData').done();
});

window.exportData.addEventListener('submit', async event => {
    event.preventDefault()

    json = await trello.getAll()
    dataJson = JSON.parse(json.card.shared);

    let nameFile = window.typeData.value

    download(`data${nameFile}`, JSON.stringify(dataJson))

    trello.closePopup();
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