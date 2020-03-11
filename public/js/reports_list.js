var trello = TrelloPowerUp.iframe();

//ao carregar a pg
window.addEventListener('load', async () => {
    loadReportsList(await getReports(trello))
});

//Cria a lista para exibição dos elementos no cartão
const loadReportsList = reports => {

    reportsElementsList = "";

    reports.forEach(report => {
        reportsElementsList += createReportElement(report);
    });

    window.reportsList.innerHTML = reportsElementsList; 

    let allElements = Array.prototype.slice.call(document.querySelectorAll(".img_remove_report"));

    removeReport(allElements)
}

const removeReport = elements => {

    return elements.map(element => element.addEventListener('click', () => {

        // REMOVENDO RELATÓRIO DA LISTA
        let report = element.parentNode
        let reportDiv = report.parentNode
        let reportElement = reportDiv.parentNode
        let reportsList = reportElement.parentNode

        reportsList.removeChild(reportElement);
        deleteReport(element.parentNode)
    }))
}

const createListReportElement = reportDatas => reportDatas.map(e => createReportElementToPdf(e));

const convertToDate = (date, hours) => {

    let dataArray = date.split('/');
    let dateFormat = `${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`;

    return new Date(`${dateFormat} ${hours}`);
}

// função que cria um elemento html de acordo com um jsom em formato correto
const createReportElementToPdf = reportData => {

    // -------  tratamento de valores ultilizados para criar a pagina html
    let tags = reportData.labels.map(e => `<div class="tags" style="background-color: ${e.color};">${e.name}</div>`);

    let members = reportData.members.map(e => {
        let avatar = e.avatarUrl === undefined ? e.avatar : `${e.avatarUrl}/50.png`;
        return `<div class="name_member">${e.fullName}</div><div class="perfil_member" style="background-image: url(${avatar});"></div><br>`;
    });

    let data1 = convertToDate(reportData.currDate, reportData.startTime);
    let data2 = convertToDate(reportData.currDate, reportData.endTime);

    let fullTime = getHoursDifference(data1, data2);

    // elemento html 
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
                        ${reportData.currDate}<br>
                        ${reportData.startTime} às 
                        ${reportData.endTime}
                    </div>
                    
                    <div class="item_body start_end">
                        ${fullTime}
                    </div>
                    
                    <div class="item_body link">
                        <div class="link_trello">
                            <a class="trello" href="${reportData.cardURL}">
                                Trello
                            <a>
                            <br>
                            <a class="Commit"
                                href="${reportData.commitLink}">
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

//retorna a diferença entre horas, espera receber dois obj Date
const getHoursDifference = (date1, date2) => {

    let result = "00h00min";
    let diff;

    try {
        diff = (date2.getTime() - date1.getTime()) / 1000 / 60 / 60;
        
    } catch (error) {
        // return result;
        return error
    }

    //verificando possivel erro 
    if (!diff && diff != 0 || date1 == "Invalid Date" || date2 == "Invalid Date") {
        return result;
    }

    // tratrar o formato da string de retorno

    if (diff >= 1) {

        let diffStr = diff.toString();

        let array = diffStr.split(".");
        let min = "00";

        if (array.length > 1) {
            min = parseInt(array[1]) * 0.6;
            min = parseInt(min.toString().length == 1 ? `${min}0` : min.toString().substr(0, 2));
        }

        let hours = parseInt(array[0]);

        result = `${hours}h${min}min`
    } else {
        diff *= 60;
        result = `${diff.toFixed(0)}min`
    }

    return result;
};

const confirmationDeletion = element => {}

const deleteReport = element => {
    let key = element.id;
    trello.remove('card', 'shared', key);
}

//cria uma "li" para listagem dos relatorios no cartão
const createReportElement = reportData => {
    let attachmentsElement = "<object type='image/svg+xml' data='/icons/attachments.svg'> Anexos </object>";
    let mainElement = "";

    var commitLink = reportData.commitLink;

    if(commitLink.length > 50)
        commitLink = commitLink.substring(0,50) + "..."

    if(!commitLink)
        commitLink = "Sem commit"

    mainElement =  `<li class='li_report'> 
                        <div class="report">
                            <div class="remove_report" id="${reportData.key}">
                                <img class="img_remove_report" src="https://pngimage.net/wp-content/uploads/2018/05/close-png-6.png" alt="">
                            </div>
                            <div class="comment_report">
                                <h3>Comentário: </h3>
                                <p class="pComment">${reportData.comment}</p>
                            </div>
                            <div class="details_report">
                                <div class="date_details">
                                    <h3>Data: </h3>
                                    <p class="pDate">${reportData.currDate} - ${reportData.startTime} ás ${reportData.endTime}</p>
                                </div>
                                <div class="commit_details">
                                    <h3>Commit: </h3>
                                    <a href="${reportData.commitLink}" target="_blank"><p class="pCommit">${commitLink}</p></a>
                                </div>
                            </div>
                            ${(reportData.attachments ? attachmentsElement : "")}
                        </div>
                    </li>`

    return mainElement;
}

// --- NOVO RELATÓRIO --- //
const addFormNewReport = document.getElementById('btn_newReport')
const formNewReport = document.getElementById('form_newReport')
const btnCancelNewReport = document.getElementById('btn_cancelNewReport')

let inputStartTime = document.getElementById('startTime')
let inputEndTime = document.getElementById('endTime')
let inputStartDate = document.getElementById('startDate')
let inputCommitLink = document.getElementById('commitLink')
let inputComment = document.getElementById('comment')

addFormNewReport.addEventListener('click', () => {
    addFormNewReport.style.display = 'none'
    formNewReport.style.display = 'block'
})

btnCancelNewReport.addEventListener('click', () => {
    
    inputStartTime.value = ""; inputEndTime.value = ""; inputStartDate.value = ""; inputCommitLink.value = ""; inputComment.value = "";
    addFormNewReport.style.display = 'flex'; formNewReport.style.display = 'none'
})

window.newReport.addEventListener('submit', async event => {
    event.preventDefault();
    var card = {};

    card = await getCardDetailsById(trello);

    addReport(JSON.stringify(card));
});

const toDate = dateStr => {
    let parts = dateStr.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

const addReport = card => {

    let startTime = window.startTime.value;
    let endTime = window.endTime.value;
    let commitLink = window.commitLink.value;
    let comment = window.comment.value;
    let cardURL = JSON.parse(card).url;
    let membersIds = card.members;
    let title = card.name;
    let labels = card.labels
    let currDate = toDate(window.startDate.value);

    dateSplit = currDate.split('/')

    currDia = dateSplit[0]; currMes = dateSplit[1]; currAno = dateSplit[2];

    if (!startTime && endTime && comment)
        return alert("Preencha todos os campos!")

    if(currDia == 'undefined' || currMes == 'undefined' || currAno == "") 
        return alert("Insira uma data em 'Início da tarefa'")

    if(!endTime > startTime) 
        return alert('O tempo de início deve ser menor que o tempo de fim da tarefa.');

    let report = { currDate, title, cardURL, membersIds, startTime, endTime, commitLink, comment, labels };

    inputStartTime.value = ""; inputEndTime.value = ""; inputStartDate.value = ""; inputCommitLink.value = ""; inputComment.value = "";
    addFormNewReport.style.display = 'flex'; formNewReport.style.display = 'none'

    trello.alert({
        message: 'Relatório removido com sucesso!',
        duration: 3,
        display: 'success'
      });

    return addNewReport(trello, report)
}