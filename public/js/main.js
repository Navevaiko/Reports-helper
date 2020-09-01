window.TrelloPowerUp.initialize({
    'card-badges': function (trello, options) {
        return getReports(trello).then(showBadge)
    },
    'card-back-section': function (trello, options) {
        return {
            title: 'Relatórios',
            icon: 'https://reports-helper.herokuapp.com/icons/reports.svg',
            content: {
                type: 'iframe',
                url: trello.signUrl(window.TrelloPowerUp.util.relativeUrl('reports_list')),
            }
        }
    },
    'board-buttons': function (trello, options) {
        return [
            {
                icon: {
                    dark: "https://reports-helper.herokuapp.com/icons/reportdark.svg",
                    light: "https://reports-helper.herokuapp.com/icons/reportligth.svg"
                },
                text: 'Exportar relatório',
                callback: showDataExport,
            }
        ]
    }
});
