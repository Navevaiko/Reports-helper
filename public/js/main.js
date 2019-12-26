const generateReportMaFromBoard = async (trello, options) => {
    let teste = await axios.get("https://api.trello.com/1/boards/JX5SpQ1P/cards/?fields=name,labels,members,plugindata&members=true&member_fields=fullName&key=5bad37ffdf5d8cf03d17a42f87a65ebd&token=36322a845604eb43c155a9c4378e74713b5e9bd5d486f8c421ae3698b08b3d3c&tag=true");
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
            text: 'Exportar relatório',
            callback: showTypesDataExport,
        }
    }
});
