var trello = TrelloPowerUp.iframe();

const addFormNewReport = document.getElementById('addForm_newReport')
const formNewReport = document.getElementById('form_newReport')
const btnCancelNewReport = document.getElementById('btn_cancelNewReport')

const inputStartTime = document.getElementById('startTime')
const inputEndTime = document.getElementById('endTime')
const inputStartDate = document.getElementById('startDate')
const inputCommitLink = document.getElementById('commitLink')
const inputComment = document.getElementById('comment')

window.addEventListener('load', async () => loadReportsList(await getReports(trello)));

const loadReportsList = reports => {

    let reportsElementsList = "";
    reports.forEach(report => reportsElementsList += createReportElement(report));

    if(window.reportsList) window.reportsList.innerHTML = reportsElementsList; 
    
    let elementsForRemoval = Array.prototype.slice.call(document.querySelectorAll(".img_remove_report"));
    let elementsForEditing = Array.prototype.slice.call(document.querySelectorAll(".img_edit_report"));

    removeReport(elementsForRemoval)
    editReport(elementsForEditing)
}

// Remoção de um relatório
const removeReport = elements => {

    return elements.map(element => element.addEventListener('click', () => {
        
        trello.alert({
            message: 'Relatório removido com sucesso!',
            duration: 3,
            display: 'error'
        });

        // REMOVENDO RELATÓRIO DA LISTA
        let liReport = element.closest('.li_report') // Elemento para remover
        let olReport = element.closest('#reportsList') // Lista dos elementos

        olReport.removeChild(liReport);
        deleteReport(element.parentNode)
    }))
}

// Edição de um relatório
const editReport = elements => {

    elements.map(element => element.addEventListener('click', () => {

        let paragraphs = element.closest('.li_report').querySelectorAll('p')
        addFormNewReport.style.display = 'none'
        formNewReport.style.display = 'block'

        paragraphs.forEach(({clv = classList.value}) => {

            let classElement = clv

            if(classElement == 'pComment') {
                inputComment.value = el.innerHTML

            } else if (classElement == 'pDate') {
                let dateTime = el.innerHTML.split(' - ')
                let date = dateTime[0].split('/')
                let time = dateTime[1].split(' ás ')

                let dateFormat = `${date[2]}-${date[1]}-${date[0]}`
                let startTime = time[0]
                let endTime = time[1]

                inputStartTime.value = startTime
                inputEndTime.value = endTime
                inputStartDate.value = dateFormat

            } else if (classElement == 'pCommit') {

                let commitHref = el.parentNode.href

                if(el.innerHTML != 'Sem commit') inputCommitLink.value = commitHref
                else inputCommitLink.value = ""
                
            }
        })
    }))
}

const deleteReport = element => {
    let key = element.id;
    trello.remove('card', 'shared', key);
}

//cria uma "li" para listagem dos relatorios no cartão
const createReportElement = reportData => {

    let commitLink = reportData.commitLink;

    if(commitLink.length > 50)
        commitLink = commitLink.substring(0,50) + "..."

    if(!commitLink)
        commitLink = "Sem commit"

    let mainElement =  `<li class='li_report'> 
                            <div class="report">
                                <div class="remove_report" id="${reportData.key}">
                                    <img class="img_edit_report" src="https://icons.iconarchive.com/icons/icons8/windows-8/512/Editing-Edit-icon.png" alt="Editar">
                                    <img class="img_remove_report" src="https://pngimage.net/wp-content/uploads/2018/05/close-png-6.png" alt="Excluir">
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
                                        <a id="commitHref" href="${reportData.commitLink}" target="_blank"><p class="pCommit">${commitLink}</p></a>
                                    </div>
                                </div>
                                ${(reportData.attachments ? "<object type='image/svg+xml' data='/icons/attachments.svg'> Anexos </object>" : "")}
                            </div>
                        </li>`

    return mainElement;
}

// --- NOVO RELATÓRIO --- //
if(addFormNewReport || btnCancelNewReport){
    addFormNewReport.addEventListener('click', () => {

        addFormNewReport.style.display = 'none'
        formNewReport.style.display = 'block'
    })

    btnCancelNewReport.addEventListener('click', () => {
        
        let inputs = [ inputStartTime, inputEndTime, inputStartDate, inputCommitLink, inputComment ]
        clearBoxes(inputs)
        
        addFormNewReport.style.display = 'flex'
        formNewReport.style.display = 'none'
    })
}

window.newReport.addEventListener('submit', async event => {

    event.preventDefault();
    let card = {};

    card = await getCardDetailsById(trello);

    addReport(JSON.stringify(card));
});

const toDate = dateStr => {
    let parts = dateStr.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

const addReport = card => {

    const cardURL = JSON.parse(card).url;
    const membersIds = card.members;
    const title = card.name;
    const labels = card.labels

    const startTime = inputStartTime.value;
    const endTime = inputEndTime.value;
    const commitLink = inputCommitLink.value;
    const comment = inputComment.value;
    const currDate = toDate(inputStartDate.value);

    const dateSplit = currDate.split('/')

    const currDia = dateSplit[0]; 
    const currMes = dateSplit[1]; 
    const currAno = dateSplit[2];

    if(!startTime || !endTime || !comment)
        return alert("Preencha todos os campos!")

    if(currDia == 'undefined' || currMes == 'undefined' || currAno == "") 
        return alert("Insira uma data em 'Dia de tarefa'")

    if(!endTime > startTime)
        return alert('O tempo de início deve ser menor que o tempo de fim da tarefa.');

    let inputs = [ inputStartTime, inputEndTime, inputStartDate, inputCommitLink, inputComment ]
    clearBoxes(inputs)
    
    let report = { currDate, title, cardURL, membersIds, startTime, endTime, commitLink, comment, labels };

    // criar função
    addFormNewReport.style.display = 'flex'
    formNewReport.style.display = 'none'

    trello.alert({
        message: 'Relatório criado com sucesso!',
        duration: 3,
        display: 'success'
    });

    return addNewReport(trello, report)
}

const clearBoxes = inputs => inputs.forEach(elements => { elements.value = "" })