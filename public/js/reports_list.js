var trello = TrelloPowerUp.iframe();
// loadReportsList([
// {
//     'date': "02/11/2019",
//     'title': "Título",
//     'card': "",
//     'membersIds': ["585e7d5667e9f38378708ea5", "585e7d5667e9f38378708ea5"],
//     'startTime': "07:00",
//     'endTime': "17:00",
//     'commitLink': "http://localhost:3000/reports_list",
//     'comment': "Talk about being security conscious!"
// }
// ]}
// loadReportsList([]);

window.addEventListener('load', function () {
    getReports(trello)
        .then(loadReportsList);
});

const loadReportsList = reports => {
    reportsElementsList = "";

    reports.forEach(report => {
        reportsElementsList += createReportElement(report);
    });

    window.reportsList.innerHTML = reportsElementsList;
}


const createListReportElement = reportDatas => reportDatas.map(e => createReportElementToPdf(e));






const createReportElementToPdf = async reportData => {
    let tags = reportData.labels.map(e => `<div class="tags" style="background-color: ${e.color};">${e.name}</div>`)
    let members = reportData.members.map(e => `<div class="name_member">${e.fullName}</div><div class="perfil_member" style="background-image: url(${e.avatar});"></div><br>`);
    let fullTime = "diferença de tempo aqui";

    let boxHtml = `<div class="report_container">
                    <!-- delimitador 1-->
                    <div class="item_body member">
                        <div class="div_caixa">
                            ${members.join('')}
                        </div>
                    </div>
                    <!-- delimitador 2-->
                    <div class="item_body card">
                        ${reportData.title}
                    </div>
                    <!-- delimitador 3-->
                    <div class="item_body tag">
                        ${tags.join('')}
                    </div>
                    <!-- delimitador 4-->
                    <div class="item_body date">
                        ${reportData.date}<br>
                        ${reportData.startTime} às 
                        ${reportData.endTime}
                    </div>
                    <!-- delimitador 5-->
                    <div class="item_body start_end">
                        ${fullTime}
                    </div>
                    <!-- delimitador 6-->
                    <div class="item_body link">
                        <div class="link_trello">
                            <a class="trello" href="${reportData.commitLink}">
                                Trello:
                            <a>
                            <br>
                            <a class="Commit"
                                href="${reportData.card}">
                                Commit
                            </a>
                        </div>
                    </div>
                    <!-- delimitador 7-->
                    <div class="item_body comment">
                    ${reportData.comment}
                    </div>
                </div>`;
    return boxHtml;
}

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