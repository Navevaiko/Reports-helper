var trello = TrelloPowerUp.iframe();

trello.render(function () {
    trello.sizeTo('#exportData').done();
});

window.exportData.addEventListener('submit', async event => {

    event.preventDefault()
    const typeFile = window.typeData.value;;
    let dataCard;

    let context = await getCardContent(trello);


    if (Object.keys(context).length == 1) {
        alert("busca por obj")
        const cardContent = getCardContent(trello);
        const card = await getCardDetailsById(trello);

        dataCard = getDataCardExport(cardContent.card, card);

        trello.closePopup();
        trello.hideCard();

        downloadByType(typeFile, dataCard.data);

    } else {
        let secret = "5bad37ffdf5d8cf03d17a42f87a65ebd";
        let token = "36322a845604eb43c155a9c4378e74713b5e9bd5d486f8c421ae3698b08b3d3c";
        let idBoard = "JX5SpQ1P";

        let cards = await axios.get(`https://api.trello.com/1/boards/${idBoard}/cards/?fields=name,labels,members,plugindata&members=true&key=${secret}&token=${token}`);


        cards.data.map(async card => {
            const { id } = card;

            const request = await axios.get(`https://api.trello.com/1/cards/${id}/pluginData?key=${secret}&token=${token}`);

            card.reports = !!request.data[0] ? request.data[0].value : "";

            return card;
        });
        dataCard = cards
        console.log(cards);
        console.log(dataCard);

        let allReports = dataCard.map(data => data.reports)

        console.log(allReports);

        downloadByType(typeFile, allReports);
    }



    trello.alert({
        message: 'Download realizado com sucesso 🎉',
        duration: 3,
    })

});

const inflateDataCard = async (card, secret, token) => {

};

const downloadByType = (type, json) => {
    switch (type) {
        case "CSV":
            json[0].labels = getLabels(json[0]);
            json[0].members = getMembers(json[0]);

            JSONToCSVConvertor(json, "Relatorio.csv", true);

            break;
        case "JSON":
            download(`Relatorio.json`, JSON.stringify(json));

            break;
        default:
        case "PDF":
            let content = createListReportElement(json).join('');
            openWindowForPdf(content);

            break;
    }
}

const getLabels = json => json.labels.map(e => e.name).join(" - ");

const getMembers = json => json.members.map(e => e.fullName).join(" - ");

const openWindowForPdf = content => {
    var mywindow = window.open('', 'Print', 'height=900,width=1100');

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
                                setTimeout(() => { window.print(); window.close(); }, 1500);
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
                                </div>`);
    mywindow.document.write(content);
    ywindow.document.write(`</body></html>`);
    mywindow.document.close();
}

const download = (filename, text) => {
    let element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

const JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';

    CSV += ReportTitle + '\r\n\n';

    if (ShowLabel) {
        var row = "";

        for (var index in arrData[0]) {
            row += index + ';';
        }

        row = row.slice(0, -1);
        CSV += row + '\r\n';
    }
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '";';
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