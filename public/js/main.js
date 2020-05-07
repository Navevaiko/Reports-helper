const api = require('./../services/api');

window.TrelloPowerUp.initialize({
    'card-buttons': function (trello, options) {
        return [
            {
                icon: 'https://reports-helper.herokuapp.com/icons/attachments.svg',
                text: 'Exportar relatório',
                callback: showTypesDataExport
            }
        ]
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
        return [
            {
                icon: {
                    dark: "https://reports-helper.herokuapp.com/icons/reportdark.svg",
                    light: "https://reports-helper.herokuapp.com/icons/reportligth.svg"
                },
                text: 'Exportar relatório',
                callback: showTypesDataExport,
            },
            {
                text: 'Salvar Quadro',
                callback: trello => {
                    console.log("Botão apertado");
                    // let members = await trello.board('members');
                    // let org = await trello.board('idOrganization');
                    // let board = await trello.board('id');
                    // // let cards = await trello.cards('all');

                    // const response = await api.post(`organizations/${org.idOrganization}/projects/${board.id}`);

                    // console.log(response);
                }
            }
        ]
    }
});
