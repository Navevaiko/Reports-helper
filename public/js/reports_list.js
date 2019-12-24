var trello = TrelloPowerUp.iframe();

window.addEventListener('load', function () {
    getReports(trello)
        .then(loadReportsList);
});

const loadReportsList = reports => {
    reportsElementsList = "";

    reports.forEach(report => {
        reportsElementsList += createReportElement(report);
    });

    window.reportsList.innerHTML = reportsElementsList;
}

const createListReportElement = reportDatas => reportDatas.map(e => createReportElementToPdf(e));

const createReportElementToPdf = reportData => {

    let tags = reportData.labels.map(e => `<div class="tags" style="background-color: ${e.color};">${e.name}</div>`)

    let members = reportData.members.map(e => {
        let avatar = e.avatarUrl == undefined ? e.avatar : e.avatarUrl;
        return `<div class="name_member">${e.fullName}</div><div class="perfil_member" style="background-image: url(${avatar});"></div><br>`
    });

    let data1 = new Date(`${reportData.date} ${reportData.startTime}`)
    let data2 = new Date(`${reportData.date} ${reportData.endTime}`)

    let fullTime = getHoursDifference(data1, data2);

    let boxHtml = `<div class="report_container">

                    <div class="item_body member">
                        <div class="div_caixa">
                            ${members.join('')}
                        </div>
                    </div>
                    
                    <div class="item_body card">
                        ${reportData.title}
                    </div>
                    
                    <div class="item_body tag">
                        ${tags.join('')}
                    </div>
                    
                    <div class="item_body date">
                        ${reportData.date}<br>
                        ${reportData.startTime} às 
                        ${reportData.endTime}
                    </div>
                    
                    <div class="item_body start_end">
                        ${fullTime}
                    </div>
                    
                    <div class="item_body link">
                        <div class="link_trello">
                            <a class="trello" href="${reportData.commitLink}">
                                Trello:
                            <a>
                            <br>
                            <a class="Commit"
                                href="${reportData.card}">
                                Commit
                            </a>
                        </div>
                    </div>
                    
                    <div class="item_body comment">
                    ${reportData.comment}
                    </div>
                </div>`;

    return boxHtml;
}

const getHoursDifference = (date1, date2) => {
    let result = "?";

    let diff = (date2.getTime() - date1.getTime()) / 1000;
    diff = diff / 60 / 60 / 60;
    console.log(diff);

    if (diff >= 1) {
        result = `${diff.toFixed(2).replace(".", "h")}min`

    } else if (diff < 0) {
        diff *= 60;
        result = `${diff.toFixed(0)}min`
        console.log(minutos)
    }
    console.log(result)

    return result;

};

const createReportElement = reportData => {
    let attachmentsElement = "<object type='image/svg+xml' data='/icons/attachments.svg'> Anexos </object>";
    let mainElement = "";

    mainElement = `<li class='report'> 
                        <p id=\txt_info\">   ${reportData.comment} </p> 
                        <span><a href='  ${reportData.commitLink}' target='_blank'> Commit </a></span>
                        ${(reportData.attachments ? attachmentsElement : "")}
                        <div class='datetimeInfo'> 
                            <span> ${reportData.date} </span> 
                            <span> ${reportData.startTime} ás ${reportData.endTime} </span> 
                        </div>
                    </li><hr/>`;

    return mainElement;
}