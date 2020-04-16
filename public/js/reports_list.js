var trello = TrelloPowerUp.iframe();

const addFormNewReport = document.getElementById('addForm_newReport'),
formNewReport = document.getElementById('form_newReport'),
btnCancelNewReport = document.getElementById('btn_cancelNewReport'),
btnSaveNewReport = document.getElementById('btn_saveNewReport');

const inputStartTime = document.getElementById('startTime'),
inputEndTime = document.getElementById('endTime'),
inputStartDate = document.getElementById('startDate'),
inputCommitLink = document.getElementById('commitLink'),
inputComment = document.getElementById('comment');

window.addEventListener('load', async () => loadReportsList(await getReports(trello)));

const loadReportsList = reports => {

    console.log("Chamada")
    
    let sortReportByDate = [], reportsElementsList = "";

    if(localStorage.getItem('id_report')) localStorage.removeItem('id_report')

    reports.forEach(report => {

        sortReportByDate.push(report)
        sortReportByDate.sort((a, b) => {

            const dateA = a.currDate.split('/'), dateB = b.currDate.split('/'),
            timeA = a.startTime, timeB = b.startTime;

            const timestampReportA = toTimestamp( dateA[2], dateA[1], dateA[0]),
            timestampReportB = toTimestamp(dateB[2], dateB[1], dateB[0]);

            if(timestampReportA > timestampReportB) return -1
            if(timestampReportA == timestampReportB){
                if(timeA > timeB) return -1
                if(timeA < timeB || timeA == timeB) return 1
            }
            if(timestampReportA < timestampReportB) return 1
            return 0
        });
    })

    sortReportByDate.forEach(report => reportsElementsList += createReportElement(report))

    if(window.reportsList) window.reportsList.innerHTML = reportsElementsList; 
    
    let elementsForRemoval = Array.prototype.slice.call(document.querySelectorAll(".img_remove_report"));
    let elementsForEditing = Array.prototype.slice.call(document.querySelectorAll(".img_edit_report"));

    removeReport(elementsForRemoval)
    editReport(elementsForEditing)
}

// Remoção de um relatório
const removeReport = elements => {

    return elements.map(element => element.addEventListener('click', () => {

        if(localStorage.getItem('id_report')){

            trelloAlert(trello, 'Não é possível excluir um relatório em edição', 5, 'warning')
        } else {

            trelloAlert(trello, 'relatório removido com sucesso!', 3, 'error')

            // REMOVENDO RELATÓRIO DA LISTA
            let liReport = element.closest('.li_report') // Elemento para remover
            let olReport = element.closest('#reportsList') // Lista dos elementos

            olReport.removeChild(liReport);
            deleteReport(element.parentNode)
        }
    }))
}

// Jogando os dados de um relatório no formulário para editar
const editReport = elements => {
    
    elements.map(element => element.addEventListener('click', () => {

        localStorage.setItem('id_report', element.parentNode.id)

        let paragraphs = element.closest('.li_report').querySelectorAll('p')

        displayAction(addFormNewReport, formNewReport, 'none', 'block')
        btnSaveNewReport.textContent = "Editar"

        paragraphs.forEach(report => {

            let classElement = report.classList.value

            switch (classElement){
                case 'pComment':
                    inputComment.value = report.innerHTML
                    break;

                case 'pDate':
                    const dateTime = report.innerHTML.split(' - '),
                    time = dateTime[1].split(' ás ');
    
                    const dateFormat = dateToEN(dateTime[0]),
                    startTime = time[0],
                    endTime = time[1];
    
                    inputStartTime.value = startTime
                    inputEndTime.value = endTime
                    inputStartDate.value = dateFormat
                    break;

                case 'pCommit':
                    const commitHref = report.parentNode.href

                    if(report.innerHTML != 'Sem commit') inputCommitLink.value = commitHref
                    else inputCommitLink.value = ""
                    break;
            }
        })
    }))
}
 
const deleteReport = element => trello.remove('card', 'shared', element.id);

//cria uma "li" para listagem dos relatorios no cartão
const createReportElement = reportData => {

    let commitLink = reportData.commitLink;

    if(!commitLink)
        commitLink = "Sem commit"

    if(commitLink.length > 50)
        commitLink = commitLink.substring(0,50) + "..."

    let mainElement =  `<li class='li_report'> 
                            <div class="report">
                                <div class="remove_report" id="${reportData.key}">
                                    <img class="img_edit_report" src="https://icons.iconarchive.com/icons/icons8/windows-8/512/Editing-Edit-icon.png" alt="Editar" title="Editar">
                                    <img class="img_remove_report" src="https://pngimage.net/wp-content/uploads/2018/05/close-png-6.png" alt="Excluir" title="Excluir">
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

if(addFormNewReport || btnCancelNewReport){
    addFormNewReport.addEventListener('click', () => {

        displayAction(addFormNewReport, formNewReport, 'none', 'block')
        btnSaveNewReport.textContent = "Salvar Relatório"

        const date = new Date();

        // Data com 0 na esquerda caso não tenha 2 digitos
        let day = leftPad(date.getDate(), 2),
        month = leftPad((date.getMonth() + 1), 2),
        year = date.getFullYear()

        // Dia de tarefa setado com data atual
        inputStartDate.value = `${year}-${month}-${day}`
    })

    // Cancela ação do formulário e remove localStorage caso tenha
    btnCancelNewReport.addEventListener('click', () => {

        if(localStorage.getItem('id_report')){
            localStorage.removeItem('id_report')
            trelloAlert(trello, 'Edição de relatório cancelada!', 4, 'info')
            
        } else trelloAlert(trello, 'Criação de relatório cancelada!', 4, 'info')
        
        let inputs = [ inputStartTime, inputEndTime, inputStartDate, inputCommitLink, inputComment ]
        clearBoxes(inputs)
        
        displayAction(addFormNewReport, formNewReport, 'flex', 'none')
    })
}

window.newReport.addEventListener('submit', async event => {

    event.preventDefault();
    let card = {};
    card = await getCardDetailsById(trello);

    if(btnSaveNewReport.textContent == 'Editar'){

        let key = localStorage.getItem('id_report')
        let report = document.getElementById(key)
        
        let liReport = report.closest('.li_report') 
        let olReport = report.closest('#reportsList') 
        olReport.removeChild(liReport);

        trello.remove('card', 'shared', key);
        addReport(JSON.stringify(card));

        localStorage.removeItem('id_report')
    } else {
        addReport(JSON.stringify(card));
    }
});

const addReport = card => {

    const cardURL = JSON.parse(card).url;
    const membersIds = card.members;
    const title = card.name;
    const labels = card.labels

    const startTime = inputStartTime.value;
    const endTime = inputEndTime.value;
    const commitLink = inputCommitLink.value;
    const comment = inputComment.value;
    const currDate = dateToPTBR(inputStartDate.value);

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

    displayAction(addFormNewReport, formNewReport, 'flex', 'none')
    trelloAlert(trello, 'Relatório criado com sucesso!', 3, 'success')
    
    return addNewReport(trello, report)
}

const displayAction = (firstElement, secondElement, fisrtDisplay, secondDisplay) => {
    firstElement.style.display = fisrtDisplay
    secondElement.style.display = secondDisplay
}

// Funções para data
const toTimestamp = (year,month,day) => {
    let data = new Date( Date.UTC( year , month - 1 , day , 0 , 0 , 0 ));
    return data.getTime() / 1000;
}