
const generateReportMaFromBoard = () => alert('OI')

var WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
var BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';

var onBtnClick = function (t, opts) {
    console.log('Someone clicked the button');
};

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
    // 'board-buttons': function (trello, options) {
    //     return {
    //         icon: {
    //             dark: "https://reports-helper.herokuapp.com/icons/reportdark.svg",
    //             light: "https://reports-helper.herokuapp.com/icons/reportligth.svg"
    //         },
    //         text: 'TESETE',
    //         callback: generateReportMaFromBoard,
    //         condition: 'always'
    //     }
    // }
    'board-buttons': function (t, opts) {
        return [{
            // we can either provide a button that has a callback function
            icon: {
                dark: WHITE_ICON,
                light: BLACK_ICON
            },
            text: 'Callback',
            callback: onBtnClick,
            condition: 'edit'
        }, {
            // or we can also have a button that is just a simple url
            // clicking it will open a new tab at the provided url
            icon: {
                dark: WHITE_ICON,
                light: BLACK_ICON
            },
            text: 'URL',
            condition: 'always',
            url: 'https://trello.com/inspiration',
            target: 'Inspiring Boards' // optional target for above url
        }];
    }
});
