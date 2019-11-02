var reportsKey = 'reports';

function showNewReportModal(trello) {
    return trello.modal({
        title: 'Novo relatório',
        url: 'new_report',
        fullscreen: false,
    })
}

function addNewReport(report) {
    getReports.then(function(reports) {
        reports.push(report);
        trello.set('card', 'shared', reportsKey, reports)
    })
}

function getReports(trello){
    return trello.get('card', 'shared', reportsKey);
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