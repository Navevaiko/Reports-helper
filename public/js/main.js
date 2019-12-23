const generateReportMaFromBoard = async (trello, options) => {

    let get1 = await trello.get();
    let get2 = await trello.get('board', 'shared')
    let getall = await trello.getall();
    let card = await trello.card('all');

    console.log(get1);
    console.log(get2);
    console.log(getall);
    console.log(card);
}

window.TrelloPowerUp.initialize({
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
            text: 'TESETE',
            callback: generateReportMaFromBoard,
        }
    }
});
