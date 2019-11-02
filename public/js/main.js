TrelloPowerUp.initialize({
    'card-buttons': function(trello, options) {
        return [{
            icon: 'https://reports-helper.herokuapp.com/icons/reports.svg',
            text: 'Novo relatório',
            callback: showNewReportModal
        }] 
    },
    'card-badges': function(trello, options) {
        return getReports(trello).then(showBadge)
    }
    
});