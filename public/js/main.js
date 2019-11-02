TrelloPowerUp.initialize({
    'card-buttons': function(trello, options) {
        return [{
            icon: 'https://navevaiko.github.io/Reports-helper/icons/reports.svg',
            text: 'Novo relatório',
            callback: function(trello) {
                return trello.popup({
                    title: 'Relatório',
                    url: 'new_report.html'
                });
            }
        }] 
    }
});