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
    },
    'card-back-section': function(trello, options) {
        return {
            title: 'Relatórios',
            icon: 'https://reports-helper.herokuapp.com/icons/reports.svg',
            content: {
                type: 'iframe',
                url: trello.signUrl(TrelloPowerUp.util.TrelloPowerUp.relativeUrl('reports_list')),
            }
        }
    }
});