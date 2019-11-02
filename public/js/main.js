TrelloPowerUp.initialize({
    'card-buttons': (trello, options) => (
        [{
            icon: 'https://navevaiko.github.io/Reports-helper/icons/reports.svg',
            text: 'Novo relatório',
            callback: (trello) => {
                return t.popup({
                    title: 'Relatório',
                    url: 'new_report.html'
                });
            }
        }]
    )
});