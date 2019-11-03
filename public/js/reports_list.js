var trello = TrelloPowerUp.iframe();
loadReportsList([
    {
        'date': "02/11/2019",
        'title': "Título",
        'card': "",
        'membersIds': ["585e7d5667e9f38378708ea5", "585e7d5667e9f38378708ea5"],
        'startTime': "07:00",
        'endTime': "17:00",
        'commitLink': "http://localhost:3000/reports_list",
        'comment': "Talk about being security conscious! 😜 Don’t worry, that isn’t a real token. We’re going to leave this as simple as possible so that we don’t get distracted."
    },
    {
        'date': "02/11/2019",
        'title': "Título",
        'card': "",
        'membersIds': ["585e7d5667e9f38378708ea5", "585e7d5667e9f38378708ea5"],
        'startTime': "07:00",
        'endTime': "17:00",
        'commitLink': "http://localhost:3000/reports_list",
        'comment': "Talk about being security conscious! 😜 Don’t worry, that isn’t a real token. We’re going to leave this as simple as possible so that we don’t get distracted."
    },
    {
        'date': "02/11/2019",
        'title': "Título",
        'card': "",
        'membersIds': ["585e7d5667e9f38378708ea5", "585e7d5667e9f38378708ea5"],
        'startTime': "07:00",
        'endTime': "17:00",
        'commitLink': "http://localhost:3000/reports_list",
        'comment': "Talk about being security conscious! 😜 Don’t worry, that isn’t a real token. We’re going to leave this as simple as possible so that we don’t get distracted."
    }
]);

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
            "<a href='"+ reportData.commitLink +"' target='_blank'> Commit </a>" +
            (reportData.attachments? attachmentsElement : "") +
            "<div class='datetimeInfo'>" +
                "<span> "+ reportData.date +" </span>" +
                "<span> "+ reportData.startTime + " ás "+ reportData.endTime  +" </span>" +
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
