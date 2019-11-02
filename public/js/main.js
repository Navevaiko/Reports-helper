const REPORT_ICON = 'https://navevaiko.github.io/Reports-helper/icons/reports.svg'

TrelloPowerUp.initialize({
    'card-buttons': function(trello, options) {
        return [{
            icon: REPORT_ICON,
            text: 'Novo relatório',
            callback: function(trello) {
                return trello.modal({
                    title: 'Novo relatório',
                    url: 'new_report',
                    fullscreen: false,
                });
            }
        }] 
    },
    'card-badges': function(trello, options) {
        return trello.get('card', 'shared', 'reports')
            .then(function(report) {
                const reportsCount = report.length;
                
                if(reportsCount != 0) const message = reportsCount + (reportsSize > 1? "relatórios" : 'relatório');

                return [{
                    icon: REPORT_ICON,
                    title: message || 'Sem relatórios',
                    color: 'green' || 'light-gray'
                }]
            });
    }
});