TrelloPowerUp.initialize({
    'card-buttons': function (trello, options) {
        return [{
            icon: 'https://reports-helper.herokuapp.com/icons/reports.svg',
            text: 'Novo relatório',
            callback: showNewReportModal
        },
        {
            icon: 'https://reports-helper.herokuapp.com/icons/attachments.svg',
            text: 'Exportar relatório',
            callback: showTypesDataExport

        }]
    },
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
        return {
            icon: {
                dark: "https://reports-helper.herokuapp.com/icons/reportdark.svg",
                light: "https://reports-helper.herokuapp.com/icons/reportligth.svg"
            },
            text: 'Relatório',
            callback: generateReportMaFromBoard,
            // condition: 'always'
        }
    }
});

const generateReportMaFromBoard = () => alert('OI')