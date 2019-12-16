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

function loadReportsList(reports) {
    reportsElementsList = "";

    reports.forEach(report => {
        reportsElementsList += createReportElement(report);
    });

    window.reportsList.innerHTML = reportsElementsList;
}

function createReportElement(reportData) {
    var attachmentsElement = "<object type='image/svg+xml' data='/icons/attachments.svg'> Anexos </object>";

    var mainElement =
        "<li class='report'> " +
        "<p id=\"txt_info\"> " + reportData.comment + " </p>" +
        "<span><a href='" + reportData.commitLink + "' target='_blank'> Commit </a></span>" +
        (reportData.attachments ? attachmentsElement : "") +
        "<div class='datetimeInfo'>" +
        "<span> " + reportData.date + " </span>" +
        "<span> " + reportData.startTime + " ás " + reportData.endTime + " </span>" +
        "</div>" +
        "</li>" +
        "<hr/>";

    return mainElement;
}