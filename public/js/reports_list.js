console.log("reports_list chamada...")

var trello = TrelloPowerUp.iframe();

var teste = document.querySelector('#button-test')
var reportsList = document.querySelector('#reportsList')

teste.addEventListener('click', function() {
    reportsList.innerHTML += "<h1>CONTEÚDO INSERIDO</h1>"
})

//ao carregar a pg
window.addEventListener('load', async () => {
    loadReportsList(await getReports(trello))
});

window.onbeforeunload = function() {
    return alert("Fechou modal")
};

//Cria a lista para exibição dos elementos no cartão
const loadReportsList = reports => {

    reportsElementsList = "";

    reports.forEach(report => {
        reportsElementsList += createReportElement(report);
    });
    
    window.reportsList.innerHTML = reportsElementsList; 

    let allElements = Array.prototype.slice.call(document.querySelectorAll(".remove_report"));

    console.log(allElements)

    allElements.map(element => element.addEventListener('click', () => {

        var report = element.parentNode
        var reportsList = report.parentNode

        console.log(reportsList)

        reportsList.removeChild(report);

        deleteReport(element)
    }))
}

const createListReportElement = reportDatas => reportDatas.map(e => createReportElementToPdf(e));

const convertToDate = (date, hours) => {

    let dataArray = date.split('/');
    let dateFormat = `${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`;

    return new Date(`${dateFormat} ${hours}`);
}

// função que cria um elemento html de acordo com um jsom em formato correto
const createReportElementToPdf = reportData => {

    // -------  tratamento de valores ultilizados para criar a pagina html

    let tags = reportData.labels.map(e => `<div class="tags" style="background-color: ${e.color};">${e.name}</div>`);

    let members = reportData.members.map(e => {
        let avatar = e.avatarUrl === undefined ? e.avatar : `${e.avatarUrl}/50.png`;
        return `<div class="name_member">${e.fullName}</div><div class="perfil_member" style="background-image: url(${avatar});"></div><br>`;
    });

    let cardUrl = reportData.card === undefined ? reportData.url : reportData.card;



    let data1 = convertToDate(reportData.currDate, reportData.startTime);
    let data2 = convertToDate(reportData.currDate, reportData.endTime);

    let fullTime = getHoursDifference(data1, data2);

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

//retorna a diferença entre horas, espera receber dois obj Date
const getHoursDifference = (date1, date2) => {

    let result = "00h00min";
    let diff;

    try {
        diff = (date2.getTime() - date1.getTime()) / 1000 / 60 / 60;
        
    } catch (error) {
        // return result;
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

const confirmationDeletion = element => {

}

const deleteReport = element => {
    let key = element.id;
    trello.remove('card', 'shared', key);
}

//cria uma "li" para listagem dos relatorios no cartão
const createReportElement = reportData => {
    let attachmentsElement = "<object type='image/svg+xml' data='/icons/attachments.svg'> Anexos </object>";
    let mainElement = "";

    mainElement = `<li class='report'> 
                        <div style="width: 100%">
                            <p id=\txt_info\">   ${reportData.comment} </p> 
                            <span><a href='  ${reportData.commitLink}' target='_blank'> Commit </a></span>
                            ${(reportData.attachments ? attachmentsElement : "")}
                            <div class='datetimeInfo'> 
                                <span> ${reportData.currDate} </span> 
                                <span> ${reportData.startTime} ás ${reportData.endTime} </span> 
                            </div>
                            <div class="remove_report" id="${reportData.key}">X</div>
                        </div>
                        <hr>
                    </li>`;

    return mainElement;
}