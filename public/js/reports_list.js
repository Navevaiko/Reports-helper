var trello = TrelloPowerUp.iframe();

//ao carregar a pg
window.addEventListener('load', function () {
    getReports(trello)
        .then(loadReportsList);
});

//Cria a lista para exibição dos elementos no cartão
const loadReportsList = reports => {
    reportsElementsList = "";

    reports.forEach(report => {
        reportsElementsList += createReportElement(report);
    });

    window.reportsList.innerHTML = reportsElementsList;
}

const createListReportElement = reportDatas => reportDatas.map(e => createReportElementToPdf(e));

// função que cria um elemento html de acordo com um jsom em formato correto
const createReportElementToPdf = reportData => {


    // -------  tratamento de valores ultilizados para criar a pagina html

    let tags = reportData.labels.map(e => `<div class="tags" style="background-color: ${e.color};">${e.name}</div>`)

    let members = reportData.members.map(e => {
        let avatar = e.avatarUrl === undefined ? e.avatar : e.avatarUrl;
        return `<div class="name_member">${e.fullName}</div><div class="perfil_member" style="background-image: url(${avatar});"></div><br>`
    });

    let cardUrl = reportData.card === undefined ? reportData.url : reportData.card;

    let data1 = new Date(`${reportData.date} ${reportData.startTime}`)
    let data2 = new Date(`${reportData.date} ${reportData.endTime}`)

    console.log("data1", data1)

    let fullTime = getHoursDifference(data1, data2);

    // -------

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
                        ${reportData.date}<br>
                        ${reportData.startTime} às 
                        ${reportData.endTime}
                    </div>
                    
                    <div class="item_body start_end">
                        ${fullTime}
                    </div>
                    
                    <div class="item_body link">
                        <div class="link_trello">
                            <a class="trello" href="${reportData.commitLink}">
                                Trello:
                            <a>
                            <br>
                            <a class="Commit"
                                href="${cardUrl}">
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
    let result = "?";
    let diff;

    try {
        diff = (date2.getTime() - date1.getTime()) / 1000 / 60 / 60;
    } catch (error) {
        return result;
    }

    if (!typeof (diff) === "number") {
        return result;
    }

    if (diff >= 1) {
        result = `${diff.toFixed(2).replace(".", "h")}min`
    } else {
        diff *= 60;
        result = `${diff.toFixed(0)}min`

        console.log("minutos else", result)
    }

    return result;
};

//cria uma "li" para listagem dos relatorios no cartão
const createReportElement = reportData => {
    let attachmentsElement = "<object type='image/svg+xml' data='/icons/attachments.svg'> Anexos </object>";
    let mainElement = "";

    mainElement = `<li class='report'> 
                        <p id=\txt_info\">   ${reportData.comment} </p> 
                        <span><a href='  ${reportData.commitLink}' target='_blank'> Commit </a></span>
                        ${(reportData.attachments ? attachmentsElement : "")}
                        <div class='datetimeInfo'> 
                            <span> ${reportData.date} </span> 
                            <span> ${reportData.startTime} ás ${reportData.endTime} </span> 
                        </div>
                    </li><hr/>`;

    return mainElement;
}