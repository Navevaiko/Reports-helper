var trello = window.TrelloPowerUp.iframe({
    appKey: 'teste-teste',
    appName: 'teste teste'
});

var idBoard = trello.args[0].context.board;

trello.render(function () {
    trello.sizeTo('#exportData').done();
});



const fullTime = json => {

    json.currDate == undefined ? json.currDate = "--/--/----" : json.currDate
    json.startTime == undefined ? json.startTime = "-:--:--" : json.startTime
    json.endTime == undefined ? json.endTime = "-:--:--" : json.endTime
    json.comment == undefined ? json.comment = "Sem comentários" : json.comment

    let data1 = convertToDate(json.currDate, json.startTime);
    let data2 = convertToDate(json.currDate, json.endTime);

    let fullTime = getHoursDifference(data1, data2);

    let newJson = json;
    newJson.duration = fullTime;

    return newJson;
}

window.exportData.addEventListener('submit', async event => {

    event.preventDefault();

    const typeFile = window.typeData.value;

    let context = await getCardContent(trello);

    if (Object.keys(context).length == 1) {

        let cardContent = await getCardContent(trello);
        let card = await getCardDetailsById(trello);

        let dataCard = getDataCardExport(cardContent.card, card);

        trello.closePopup();
        trello.hideCard();

        //adicionando o campo de duração no json

        try {
            dataCard = dataCard.map(e => fullTime(e));

        } catch (error) {
            dataCard = "00:00"

        }

        downloadByType(typeFile, dataCard);

    } else {

        let secret2 = ["26b36127f3188e42bd1e3d188069bc94", "c490a786754dda873bbbe1e2320d3d58", "a8e3f8ce74af51d7ff2618749135b87e", "26b36127f3188e42bd1e3d188069bc94", "c490a786754dda873bbbe1e2320d3d58", "a8e3f8ce74af51d7ff2618749135b87e", "1cff6db2efeb8e2c6d9b26f15e99b6ff", "26b36127f3188e42bd1e3d188069bc94"];
        let token2 = ["57e7066078fcb60ed7c9277d57a861a24e133d64f1e5b98bf9ec974d9565e337", "4a53ac918fce3b3eb9903611a2aca9afa995e775180020890d27851656da8d0f", "ae4d054beaa98e49e67078008f8799213cddfd92db5900716682bf7e4da11331", "57e7066078fcb60ed7c9277d57a861a24e133d64f1e5b98bf9ec974d9565e337", "4a53ac918fce3b3eb9903611a2aca9afa995e775180020890d27851656da8d0f", "ae4d054beaa98e49e67078008f8799213cddfd92db5900716682bf7e4da11331", "2fc25727851421d048f477ef653f036d40eaceddbfc99d937575ebb5b728f930", "57e7066078fcb60ed7c9277d57a861a24e133d64f1e5b98bf9ec974d9565e337"];
        let randon = parseInt((Math.random() * 10).toFixed(0));

        let secret = secret2[randon];
        let token = token2[randon];

        let cards = await axios.get(`https://api.trello.com/1/boards/${idBoard}/cards/?fields=name,labels,members,url&members=true&key=${secret}&token=${token}`);

        let promisseResponse = cards.data.map(card => requestReports(card, token, secret));

        let arrayUnified = await Promise.all(promisseResponse);

        arrayUnified = arrayUnified.flat(2);

        //adicionando o campo de duração no json
        arrayUnified = arrayUnified.map(e => fullTime(e));

        downloadByType(typeFile, arrayUnified);
    }

    trello.alert({
        message: 'Download realizado com sucesso 🎉',
        duration: 3,
    })

});

const requestReports = async (card, token, secret) => {

    let arrayUnified = [];
    const { id } = card;

    const request = await axios.get(`https://api.trello.com/1/cards/${id}/pluginData?key=${secret}&token=${token}`);

    let json = !!request.data[0] ? request.data[0].value : "";

    if (!json == "") {

        json = getReportsAnyKy(JSON.parse(json))

        const jsonUnified = json.map(e => ({ ...e, title: card.name, members: card.members, labels: card.labels }))

        // if(jsonUnified[0].comment){
        //     arrayUnified.push(jsonUnified)
        // }

        console.log("jsonUnified: ")
        console.log(jsonUnified)

        arrayUnified.push(jsonUnified)
    } 

    return arrayUnified;
}

const downloadByType = (type, json) => {

    switch (type) {
        case "CSV":

            json.map((e, i) => json[i].labels = getLabels(e));
            json.map((e, i) => json[i].members = getMembers(e));

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
                                    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
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
                                        Título
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
    mywindow.document.write(`</body></html>`);
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