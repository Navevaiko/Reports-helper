const token = '7b5b4799b2bf79e37560a6cf9499cda16c16226aab2358c3393c6fb979fb2f6f';
const key = '26b36127f3188e42bd1e3d188069bc94';

const memberReportSelect = document.getElementById('memberReport');
const dateInput = document.getElementById('dtReport');

dateInput.valueAsDate = new Date();
fillUserSelect();

function setLoader(loading) {
    const loader = document.createElement('img')
    loader.src = 'https://reports-helper.herokuapp.com/icons/oval_loader.svg';
    
    document.getElementById('button').innerHTML = '';

    if(loading) {
        document.getElementById('button').appendChild(loader);
    }else{
        document.getElementById('button').textContent = 'Gerar relatório';
    }
}

async function getUsersList() {
    const base_url = 'https://api.trello.com/1/organizations/desenvolvimento53265891/members';
    
    const params = {
        key,
        token
    }

    const { data } = await axios.get(base_url, { params })
    return data;
}

async function fillUserSelect() {
    const users = await getUsersList();

    for(index in users) {
        const user = users[index];
        const option = document.createElement('option');
        option.value = user.username;
        option.text = user.fullName;

        memberReportSelect.appendChild(option)
    }
}

function downloadFile(data, filename) {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', filename);

    document.body.appendChild(link);
    link.click();
}

function formatDate(timestamp) {
    const date = new Date(timestamp)

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
      };
    
    return date.toLocaleString('pt-BR', options);
}

document.getElementById('form').onsubmit = async function(e) {
    e.preventDefault();

    const selectedIndex = memberReportSelect.selectedIndex;
    const date = dateInput.value;

    if(selectedIndex !== 0 && date !== '') {
        const selectedUserName = memberReportSelect.options[selectedIndex].value;
        const selecteUserFullName = memberReportSelect.options[selectedIndex].text;

        try {
            setLoader(true);

            const response = await axios.get(`https://api.taskreport.primitecnologia.com/report?user_name=${selectedUserName}&date=${date}`, { responseType: 'blob' });
            const formattedDate = formatDate(date);
            
            setLoader(false);

            downloadFile(response.data, `Relatório ${selecteUserFullName} dia ${formattedDate}.xlsx`);
            
        }catch(error) {
            console.log(error);
            alert('Ocorreu um erro, tente novamente.')
        }
    }else{
        alert('Preencha os campos corretamente');
    }
}