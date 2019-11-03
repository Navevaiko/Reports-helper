var trello = TrelloPowerUp.iframe();

window.addEventListener('load', function() {
    getReports(trello)
        .then(loadReportsList);
});

function loadReportsList(reports){
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
            "<b class='reportTitle'> " + reportData.title +" </b>" +
            "<hr/>" +
            "<p> " + reportData.comment + " </p>" +
            "<a href='"+ reportData.commitLink +"'> Commit </a>" +
            (reportData.attachments? attachmentsElement : "") +
            "<div class='datetimeInfo'>" +
                "<span> "+ reportData.date +" </span>" +
                "<span> "+ reportData.starTime + " ás "+ reportData.endTime  +" </span>" +
            "</div>" +
        "</li>";

    // TODO: Buscar dados dos membros e criar elementos
    // createMembersElement(reportData, mainElement);
    return mainElement;
}

function createMembersElement(reportData, mainElement) {
    var membersElement = "<div class='member'></div>";
    var mainMembersElement = "<div class='members'>";

    reportData.membersIds.forEach(memberId => {
        fetch('/users/' + memberId, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(function (response) {
                console.log(response);
            });
    });
    membersElement += "</div>";

    mainElement.append(membersElement);
}
