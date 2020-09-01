const token = '57e7066078fcb60ed7c9277d57a861a24e133d64f1e5b98bf9ec974d9565e337';
const key = '26b36127f3188e42bd1e3d188069bc94';

const memberReportSelect = document.getElementById('memberReport');
const dateInput = document.getElementById('dtReport');

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
            const response = await axios.get(`http://localhost:3022/report?user_name=${selectedUserName}&date=${date}`, { responseType: 'blob' });
            const formattedDate = formatDate(date);

            downloadFile(response.data, `Relatório ${selecteUserFullName} dia ${formattedDate}.xlsx`);
        }catch(error) {
            console.log(error);
            alert('Ocorreu um erro, tente novamente.')
        }
    }else{
        alert('Preencha os campos corretamente');
    }
}