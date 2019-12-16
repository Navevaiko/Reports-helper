var trello = TrelloPowerUp.iframe();


trello.render(function () {
    trello.sizeTo('#exportData').done();
});

window.exportData.addEventListener('submit', async event => {
    event.preventDefault()

    let json = await trello.getAll()

    let nameFile = window.typeData.value;
    downloadByType(nameFile, json)

    trello.hideCard();

    trello.alert({
        message: 'Download realizado com sucesso 🎉',
        duration: 3,
    })

    trello.closePopup();
});

function downloadByType(type, json) {

    switch (type) {
        case "CSV":
            JSONToCSVConvertor(json.card.shared.reports, "Relatorio.csv", true)

            break;
        case "JSON":
            download(`Relatorio.json`, JSON.stringify(json.card.shared.reports))

            break;
        default:
        case "PDF":
            alert("vai baixar")
            console.log(window.reportsList)
            let pdf = new jsPDF();
            pdf.fromHTML(window.reportsList);
            pdf.save("Relatorio.pdf")

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