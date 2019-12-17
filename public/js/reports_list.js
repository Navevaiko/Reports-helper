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

const createListReportElement = reportDatas => {

    let doc = reportDatas.map(element => createReportElement(element));
    return `<table border=1>${doc.join('')}</table>`;
}


const createReportElementToHtml4 = reportData => {
    let mainElement = "";
    mainElement = `<tr> 
                        <td>${reportData.comment} </td>
                        <td>Commit: ${reportData.commitLink}</td>
                        <td>
                            <table>
                                <tr>
                                    <td>
                                        ${reportData.date} 
                                    </td>
                                </tr> 
                                <tr>
                                    <td>
                                        ${reportData.startTime} ás ${reportData.endTime}
                                    </td>
                                <tr> 
                            </table> 
                        </td>
                    </tr>`;

    return mainElement;
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
                        </div>" 
                    </li><hr/>`;

    return mainElement;
}