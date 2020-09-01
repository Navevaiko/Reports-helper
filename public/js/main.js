// window.TrelloPowerUp.initialize({
//     'card-badges': function (trello, _) {
//         return getReports(trello).then(showBadge)
//     },
//     'card-back-section': function (trello, _) {
//         return {
//             title: 'Relatórios',
//             icon: 'https://reports-helper.herokuapp.com/assets/reports.svg',
//             content: {
//                 type: 'iframe',
//                 url: trello.signUrl(window.TrelloPowerUp.util.relativeUrl('reports')),
//             }
//         }
//     },
//     'board-buttons': function (_, _) {
//         return [
//             {
//                 icon: {
//                     dark: "https://reports-helper.herokuapp.com/icons/reportdark.svg",
//                     light: "https://reports-helper.herokuapp.com/icons/reportligth.svg"
//                 },
//                 text: 'Exportar relatório',
//                 callback: exportReports,
//             }
//         ]
//     }
// });
const t = window.TrelloPowerUp.iframe();
t.getAll();

// getReportsFromCurrentCard(window.TrelloPowerUp.iframe());