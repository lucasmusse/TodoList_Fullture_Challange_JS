let logado = JSON.parse(sessionStorage.getItem("logado")) || false;


if (!logado) {
    window.location = "login.html"
}


const ul = document.querySelector('#ul')

let form = document.querySelector('#form');
form.addEventListener("submit", submissao);

let listaAtividades = obtemLocalStorage();

atualizaDOM();

/* ------------------------------------- Obtem os dados do input ----------------------------------------- */

function obterDados() {
    let atividade = form.querySelector('#atividade').value;

    let obj = {
        atividade: atividade,
        "completed": false
    }

    if (validacao(obj.atividade)) {
        okForm()
        return obj
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

/* ----------------------- Validação (valida se foi colocada alguma informação no input) ---------------------- */

const validacao = function (atividade) {
    if (atividade) {
        return true
    } else {
        return false
    };
};

/* -------------------------------------------- Cria e insere no DOM ------------------------------------------ */

function inserirNoDOM(obj) {
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

    todoItem.innerHTML = obj.atividade;
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
        removeDaLista(listaAtividades, obj)
    })


    btnCheck.addEventListener('click', (e) => {
        const targetEl = e.target;
        const parentEl = targetEl.closest("div");
        parentEl.classList.toggle("completed");
        

        switch (obj.completed) {
            case true:
                    obj.completed = false
                break;

            case false:
                    obj.completed = true
            default:
                break;
        }
        
        
        salvaLocalStorage()
    })

    if(obj.completed === true){
        todo.classList.add("completed")
    }

};

/* ------------------------------- Insere as informações do LocalStorage no DOM --------------------------------------------------- */

function atualizaDOM() {
    listaAtividades.forEach(obj => {
        inserirNoDOM(obj)
        
    });
}

/* ------------------------------- Função para deletar todos os itens ( Conforme filtro ) --------------------------------------------------- */


const btnDeleteAll = document.querySelector('#deleteAll')
btnDeleteAll.addEventListener('click', () => {
    deleteAll()
})

function deleteAll() {

    let confirmDeleteAll = confirm('Vocês estará apagando todos os itens em tela, tem certeza?')
    if (confirmDeleteAll === true) {
        let div = document.querySelectorAll('.todo')

        let select = document.querySelector('.filter-todo')

        let index = select.selectedIndex
        let text = select.options[index].text
       
        if(text === 'Todas'){
            listaAtividades = []
        } else if(text === 'Finalizadas'){
            listaFinalizadas = listaAtividades.filter(item => {
                return item.completed === false
            })
            listaAtividades = listaFinalizadas
        }else{
            listaAberta = listaAtividades.filter(item =>{
                return item.completed === true
            })
            listaAtividades = listaAberta
        }

        div.forEach(element => {
            ul.removeChild(element)
        });

        salvaLocalStorage()

    }
}

/* ------------------------------- Remove do DOM e do array (botão Deletar) ---------------------------------------------- */

function removeDoDOM(e) {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    parentEl.remove();
}

/* ------------------------------- Remove do array (botão Deletar) ---------------------------------------------- */

function removeDaLista(lista, obj) {
    let index = lista.findIndex(item => saoIguais(item, obj));
    lista.splice(index, 1);
    salvaLocalStorage()
}



/* ------------------------------ Verifica se a atividade ja existe na lista --------------------------------------- */

function saoIguais(obj1, obj2) {
    return obj1.atividade === obj2.atividade
}

/* ------------------------------------ Insere a Atividade no array ------------------------------------------------- */


function insereNaLista(obj) {
    let novoArray = listaAtividades.filter((item) => {
        if (saoIguais(item, obj)) {
            alert('Você tentou adicionar dois elementos iguais')
            return item
        }
    })
    if (novoArray.length === 0) {
        listaAtividades.push(obj)
        salvaLocalStorage();
        return true
    }
    return false
}

/* ---------------------------------------------- Submit -------------------------------------------------------- */

function submissao(e) {
    e.preventDefault();
    let obj = obterDados();
    if (validacao(obj) && insereNaLista(obj)) {
        inserirNoDOM(obj);
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

/* ---------------------------------------- Logout -------------------------------------------- */


const btnLogout = document.querySelector('#btnLogout')
btnLogout.addEventListener("click", () => {


    let confirmLogout = confirm('Quer mesmo fazer o logout?')

    if (confirmLogout) {
        sessionStorage.setItem('logado', false)
        window.location = 'login.html'
    }
})

/* ----------------------------------- Mensagem Bem-Vindo --------------------------------------- */

function bemVindo() {
    let msgBemVindo = document.querySelector('#bemVindo')
    let userSS = sessionStorage.getItem('user')
    let cadastroUsuarios = JSON.parse(localStorage.getItem('usuarios'))

    cadastroUsuarios.forEach(usuario => {
        if (usuario.user === userSS) {
            msgBemVindo.innerHTML = `Bem Vindo(a) ${usuario.name.toUpperCase()}`
        }
    });
}
bemVindo()












