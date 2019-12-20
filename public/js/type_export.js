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

async function downloadByType(type, json) {
    console.log(json)


    switch (type) {
        case "CSV":
            json.labels = json.labels.join('')
            json.members = json.members.join('')
            JSONToCSVConvertor(json, "Relatorio.csv", true)

            break;
        case "JSON":
            download(`Relatorio.json`, JSON.stringify(json))

            break;
        default:
        case "PDF":
            let content = createListReportElement(json).join('');

            var mywindow = window.open('', 'Print', 'height=600,width=800');

            mywindow.document.write(`<!DOCTYPE html>
                                        <html lang="en">
                                        <head>
                                            <meta charset="UTF-8">
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                            <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                            <link rel="stylesheet" type="text/css" href="https://reports-helper.herokuapp.com/reportstyle">
                                            <title>Relátorio</title>
                                        </head><body>`);

            mywindow.document.write(`<script>
                                        window.onload = () => {
                                            window.print();
                                            window.close();
                                        }
                                    </script>
                                    <div class="container">
                                        <!--delimitador do header-->
                                        <div class="container_header">
                                            <div class="item_header member">
                                                Membros
                                            </div>
                                            <div class="item_header card">
                                                Cartão
                                            </div>
                                            <div class="item_header tag">
                                                Etiquetas
                                            </div>
                                            <div class="item_header date">
                                                Data
                                            </div>
                                            <div class="item_header start_end">
                                                Duração
                                            </div>
                                            <div class="item_header link">
                                                Links
                                            </div>
                                            <div class="item_header comment">
                                                Comentário
                                            </div>
                                        </div>
                                        `);
            mywindow.document.write(content);
            ywindow.document.write(`</body></html>`);

            mywindow.document.close();
            mywindow.focus();
            // mywindow.onload = () => {
            //     mywindow.print();
            //     mywindow.close();
            // }


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