TrelloPowerUp.initialize({
    'card-buttons': function(trello, options) {
        return [{
            icon: 'https://navevaiko.github.io/Reports-helper/icons/reports.svg',
            text: 'Novo relatório',
            callback: showNewReportModal
        }] 
    },
    'card-badges': function(trello, options) {
        return getReports(trello).then(showBadge)
    }
    
});