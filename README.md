# Reports-helper
<!-- Creating, analysing and downloading reports was never that easy. -->

> Criar, analisar e baixar relatórios pelo Trello nunca foi tão fácil!!!



##  Como adicinonar ao quadro do Trello o Reports-helper  


1. Clique no botão Power-Ups no menu de um quadro para abrir o diretório de power-ups.

2. Na barra de pesquisa digite ``Reports-helper`` e clique em "Adicionar" ao lado para você adicionar ao quadro.

3. Clique no ícone de engrenagem ao lado do botão "Adicionar" para editar as configurações e vincular as contas dos aplicativos que você está integrando ao quadro do Trello.

4. Em cada cartão do quadro deverá aparecer o status de relatório. Quando isso ocorrer é só usar as funcionalidades do Reports-helper.

### Funcionalidades
1. Criar relatórios diarios
    > É possível criar relatórios com os as informações do cartão e algumas informações que são inseridas manualmente.   
    ![Cadastro de relatório](https://reports-helper.herokuapp.com/icons/new-report.png) 
    
2. Exportação de relatorioss
    > É possível exportar os relatórios de cada cartão ou do quadro inteiro nos fomatos.
    * **PDF**:  
    ![PDF](https://reports-helper.herokuapp.com/icons/export-report-pdf.png)
    ---
    * **JSON**:  
    ```json
    {
        "currDate":"27/12/2019",
        "startTime":"07:00",
        "endTime":"16:00",
        "commitLink":"https://trello.com/c/jeFHgiW53/1-teste-1#",
        "comment":"Iniciado a exportação dos dados",
        "members":[ 
            { 
                "id":"5cc19dd532df1158cd793sd8b7",
                "fullName":"Washington",
                "username":"washington336",
                "initials":"W",
                "avatar":"https://trello-avatars.s3.amazonaws.com/291f3563eb7b20f796b54285c57fc136/170.png"
            }
        ],
        "title":"Fazer exportação dos dados",
        "card":"https://trello.com/c/jmEZtyRf/9-fazer-exporta%C3%A7%C3%A3o-dos-importados",
        "labels":[ 
            { 
                "id":"5defa5b68bdee58e0df659ba",
                "name":"Desenvolvendo",
                "color":"orange"
            },
            { 
                "id":"5defa5b68bdee58e0df659b9",
                "name":"Urgente",
                "color":"red"
            },
            { 
                "id":"5defa5b68bdee58e0df659c0",
                "name":"Finalizando",
                "color":"blue"
            }
        ],
        "duration":"9h00min"
    }
    ...
    ]
    ```
    ---
    * **CSV**:  
    ```csv 
        currDate;startTime;endTime;commitLink;comment;members;title;card;labels;duration
        "27/12/2019";"07:00";"09:50";"https://github.com/washingtonSampaioVieira?tab=followers";"Está é somente mais uma das tarefas que está sendo feita de modo que eu consiga escrever sem mesmo ao olhar a tela e depois de um tempo consigo.";"Washington";"Fazer exportação dos importados";"https://trello.com/c/jmEZtyRf/9-fazer-exporta%C3%A7%C3%A3o-dos-importados";"Laranja - Urgente - Azul Caneta";"2h83min";
    ``` 
3. Visão geral do quadro
    > O Reports-helper da a opção de ter uma visão geral do quadro. ``(em construção)``

### Veja mais sobre Power-Ups
> [https://blog.trello.com/br/trello-power-ups-para-todos](https://blog.trello.com/br/trello-power-ups-para-todos)
