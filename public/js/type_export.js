var trello = TrelloPowerUp.iframe();


trello.render(function () {
    trello.sizeTo('#exportData').done();
});

window.exportData.addEventListener('submit', async event => {

    event.preventDefault()

    let cardContent = await getCardContent(trello);
    let card = await getCardDetailsById(trello);

    let dataCard = getDataCardExport(cardContent.card, card);

    const typeFile = window.typeData.value;

    trello.closePopup();
    trello.hideCard();

    downloadByType(typeFile, dataCard)

    trello.alert({
        message: 'Download realizado com sucesso 🎉',
        duration: 3,
    })

});

function downloadByType(type, json) {

    switch (type) {
        case "CSV":
            JSONToCSVConvertor(json, "Relatorio.csv", true)

            break;
        case "JSON":
            download(`Relatorio.json`, JSON.stringify(json))

            break;
        default:
        case "PDF":
            let e = createListReportElement(json)
            let html = document.createElement("ul").append(e);
            html.innerHTML = e.join('')
            console.log(e, "eeeeeee")
            console.log(html, "html")
            window.print(html)
            break;
    }

}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';

    CSV += ReportTitle + '\r\n\n';

    if (ShowLabel) {
        var row = "";

        for (var index in arrData[0]) {
            row += index + ',';
        }

        row = row.slice(0, -1);
        CSV += row + '\r\n';
    }
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }
    download(ReportTitle, CSV)
} 