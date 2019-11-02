var reportsKey = 'reports';
var reportsVisibility = 'shared'

function showNewReportModal(trello) {
    return trello.modal({
        title: 'Novo relatório',
        url: 'new_report',
        fullscreen: false,
    })
}

function addNewReport(trello, report) {
    getReports(trello).then(function(reports) {
        reports.push(report);
        trello.set('card', reportsVisibility, reportsKey, reports)
    })
}

function getReports(trello){
    return trello.get('card', reportsVisibility, reportsKey, []);
}

function showBadge(reports) {
    var reportsCount = reports.length;

    if(reportsCount != 0) 
        var message = reportsCount + " " + (reportsCount > 1? "relatórios" : 'relatório');

    return [{
        icon: 'https://navevaiko.github.io/Reports-helper/icons/reports.svg',
        title: message || 'Sem relatórios',
        color: message? 'green' : 'light-gray'
    }]
}

function resize(trello, elementId) {
    trello.render(function() {
        trello.sizeTo(elementId).done();
    })
}