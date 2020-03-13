var trello = window.TrelloPowerUp.iframe({
    appKey: 'teste-teste',
    appName: 'teste teste'
});

var idBoard = trello.args[0].context.board;

trello.render(function () {
    trello.sizeTo('#exportData').done();
});

const fullTime = json => {

    json.currDate == undefined ? json.currDate = "00/00/0000" : json.currDate
    json.startTime == undefined ? json.startTime = "0:00:00" : json.startTime
    json.endTime == undefined ? json.endTime = "0:00:00" : json.endTime
    json.comment == undefined ? json.comment = "Sem comentários" : json.comment

    let initialDate = convertToDate(json.currDate, json.startTime);
    let finalDate = convertToDate(json.currDate, json.endTime);

    let fullTime = getHoursDifference(initialDate, finalDate);

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

        console.log("dataCard: ")
        console.log(dataCard)

        trello.closePopup();
        trello.hideCard();

        //adicionando o campo de duração no json
        try {
            dataCard = dataCard.map(e => fullTime(e));

            console.log("dataCard2: ")
            console.log(dataCard)

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

        console.log("cards: ")
        console.log(cards)

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

    console.log(request.data[1])
    console.log(request.data[1].value)

    let json = !!request.data[0] ? request.data[0].value : "";

    console.log(json)

    if (!json == "") {

        json = getReportsAnyKy(JSON.parse(json))

        const jsonUnified = json.map(e => ({ e, title: card.name, members: card.members, labels: card.labels }))

        // Apenas mostrando cards que possuem relatórios
        if(jsonUnified[0])
            if(jsonUnified[0].comment)
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

        case "PDF":
            let content = createListReportElement(json).join('');
            openWindowForPdf(content);
            break;
            
        default:
            break;
    }
}

const getLabels = json => json.labels.map(e => e.name).join(" - ");

const getMembers = json => json.members.map(e => e.fullName).join(" - ");

const createListReportElement = reportDatas => reportDatas.map(e => createReportElementToPdf(e));

const createReportElementToPdf = reportData => {

    // -------  tratamento de valores ultilizados para criar a pagina html
    let tags = reportData.labels.map(e => `<div class="tags" style="background-color: ${e.color};">${e.name}</div>`);

    let members = reportData.members.map(e => {
        let avatar = e.avatarUrl === undefined ? e.avatar : `${e.avatarUrl}/50.png`;
        return `<div class="name_member">${e.fullName}</div><div class="perfil_member" style="background-image: url(${avatar});"></div><br>`;
    });

    let initialDate = convertToDate(reportData.currDate, reportData.startTime);
    let finalDate = convertToDate(reportData.currDate, reportData.endTime);

    let fullTime = getHoursDifference(initialDate, finalDate);

    // elemento html 
    let boxHtml = `<div class="report_container">
                    <div class="item_body member">
                        <div class="div_caixa">
                            ${members.join('')}
                        </div>
                    </div>
                    
                    <div class="item_body card">
                        ${reportData.title}
                    </div>
                    
                    <div class="item_body tag">
                        ${tags.join('')}
                    </div>
                    
                    <div class="item_body date">
                        ${reportData.currDate}<br>
                        ${reportData.startTime} às 
                        ${reportData.endTime}
                    </div>
                    
                    <div class="item_body start_end">
                        ${fullTime}
                    </div>
                    
                    <div class="item_body link">
                        <div class="link_trello">
                            <a class="trello" href="${reportData.cardURL}">
                                Trello
                            <a>
                            <br>
                            <a class="Commit"
                                href="${reportData.commitLink}">
                                Commit
                            </a>
                        </div>
                    </div>
                    
                    <div class="item_body comment">
                    ${reportData.comment}
                    </div>
                </div>`;

    return boxHtml;
}

const convertToDate = (date, hours) => {

    let dataArray = date.split('/');
    let dateFormat = `${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`;

    return new Date(`${dateFormat} ${hours}`);
}

//retorna a diferença entre horas, espera receber dois obj Date
const getHoursDifference = (date1, date2) => {

    let diff, result = "00h00min"

    try {
        diff = (date2.getTime() - date1.getTime()) / 1000 / 60 / 60;
    } catch (error) {
        return error
    }

    //verificando possivel erro 
    if (!diff && diff != 0 || date1 == "Invalid Date" || date2 == "Invalid Date") {
        return result;
    }

    // tratrar o formato da string de retorno
    if (diff >= 1) {

        let diffStr = diff.toString();

        let array = diffStr.split(".");
        let min = "00";

        if (array.length > 1) {
            min = parseInt(array[1]) * 0.6;
            min = parseInt(min.toString().length == 1 ? `${min}0` : min.toString().substr(0, 2));
        }

        let hours = parseInt(array[0]);

        result = `${hours}h${min}min`
    } else {
        diff *= 60;
        result = `${diff.toFixed(0)}min`
    }

    return result;
};

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