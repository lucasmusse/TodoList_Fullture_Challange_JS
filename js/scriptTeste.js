let logado = JSON.parse(sessionStorage.getItem("logado")) || false;

if (!logado) {
    window.location = "login.html"
}


const ul = document.querySelector('#ul')

let form = document.querySelector('#form');
form.addEventListener("submit", submissao);

let listaAtividades = obtemLocalStorage();
atualizaDOM();

/* ---------------------Obtem os dados do input ----------------------------- */

function obterDados() {
    let atividade = form.querySelector('#atividade').value;
    if (validacao(atividade)) {
        okForm()
        return atividade
    } else {
        erroForm()
    };
};

/* --------------------- Muda cor do input (chamando as funções em obterDados()) ----------------------------- */

function erroForm() {
    let inputAtividade = form.querySelector('#atividade');
    inputAtividade.classList.add("inputErro");
};

function okForm() {
    let inputAtividade = form.querySelector('#atividade');
    inputAtividade.classList.remove("inputErro");
};

/* -------------Validação (valida se foi colocada alguma informação no input) ------------------ */

const validacao = function (atividade) {
    if (atividade) {
        return true
    } else {
        return false
    };
};

/* --------------------------Cria e insere no DOM------------------------------ */

function inserirNoDOM(atividade) {
    // pegando a ul que já existe no html
    const ul = document.querySelector('ul');

    // Criando os elementos html
    const todo = document.createElement("div");
    const todoItem = document.createElement("li");
    const btnCheck = document.createElement('button');
    const btnTrash = document.createElement('button');

    //Colocando classe nos elementos

    todo.classList.add("todo");
    todoItem.classList.add("todo-item");
    btnCheck.classList.add("check-btn");
    btnTrash.classList.add("trash-btn");

    // Colocando informação nos elementos

    todoItem.innerHTML = atividade;
    btnCheck.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
    btnTrash.innerHTML = '<i class="fas fa-trash" aria-hidden="true"></i>';

    // Criando a hierarquia

    ul.appendChild(todo);
    todo.appendChild(todoItem);
    todo.appendChild(btnCheck);
    todo.appendChild(btnTrash);

    // função para eventos nos botões dos itens do checklist

    btnTrash.addEventListener('click', (e) => {
        removeDoDOM(e, todoItem)
    })

    btnCheck.addEventListener('click', checkAtividade)

    const btnDeleteAll = document.querySelector('#deleteAll')
    btnDeleteAll.addEventListener('click', () => {     
        deleteAll(todo)
        console.log('passei por aqui')
    })
};

/* ------------------------------- Insere as informações do LocalStorage no DOM --------------------------------------------------- */

function atualizaDOM() {
    listaAtividades.forEach(atividade => {
        inserirNoDOM(atividade)

    });
}

/* ------------------------------- Função para deletar todos os itens --------------------------------------------------- */


function deleteAll(todo) {

    

    // bug click do confirm

        let confirmDeleteAll = confirm('mesmo?')
        if(confirmDeleteAll){
            console.log(confirmDeleteAll)
            todo.remove()
            listaAtividades = []
            salvaLocalStorage()
        }
        
}



/* ------------------------------- Remove do DOM e do array (botão Deletar) ---------------------------------------------- */

function removeDoDOM(e, todoItem) {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    parentEl.remove();

    // Removendo o elemento do array
    let index = listaAtividades.indexOf(todoItem.innerHTML)
    listaAtividades.splice(index, 1);
    salvaLocalStorage();
}

/* ------------------------------------------- Botão Check Atividade ---------------------------------------------------- */

function checkAtividade(e) {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");

    parentEl.classList.toggle("completed");

   
}

/* ------------------------------ Verifica se a atividade ja existe na lista --------------------------------------- */

function saoIguais(atividade1, atividade2) {
    return atividade1 === atividade2
}

/* ------------------------------------ Insere a Atividade no array ------------------------------------------------- */


function insereNaLista(atividade) {
    let novoArray = listaAtividades.filter((item) => {
        if (saoIguais(item, atividade)) {
            alert('Você tentou adicionar dois elementos iguais')
            return item
        }
    })
    if (novoArray.length === 0) {
        listaAtividades.push(atividade)
        salvaLocalStorage();
        return true
    }
    return false
}

/* ---------------------------------------------- Submit -------------------------------------------------------- */

function submissao(e) {
    e.preventDefault();
    let item = obterDados();
    if (validacao(item) && insereNaLista(item)) {
        inserirNoDOM(item);
        form.reset()
        atividade.focus();
    };
};

/* ----------------------------------------------- Filtro ------------------------------------------------------- */

const inputFiltro = form.querySelector('#filtro');
inputFiltro.addEventListener("change", (e) => {

    

    const todas = ul.childNodes;
    todas.forEach(item => {
        switch (e.target.value) {
            case 'all':
                item.classList.add('todo')
                break;
            case 'completed':
                if (item.classList.contains('completed')) {
                    item.classList.add('todo')
                } else {
                    item.classList.add('none')
                    item.classList.remove('todo')
                }
                break;
            case 'uncompleted':
                if (!item.classList.contains('completed')) {
                    item.classList.add('todo')
                } else {
                    item.classList.add('none')
                    item.classList.remove('todo')
                }
                break;
            default:
                break;
        }
    });
});

/* ---------------------------------------- Local Storage -------------------------------------------- */

function salvaLocalStorage() {
    localStorage.setItem("atividades", JSON.stringify(listaAtividades))

    

}

function obtemLocalStorage() {
    let listaAtividadesLS = JSON.parse(localStorage.getItem("atividades")) || [];
    return listaAtividadesLS
}













