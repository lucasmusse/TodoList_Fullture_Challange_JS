// VARIAVEIS


const btnBack = document.querySelector('#back')
const formCadastro = document.querySelector('#formCadastro')

let cadastrosLS = JSON.parse(localStorage.getItem('usuarios')) || []


// EVENTOS


btnBack.addEventListener('click', () => {
    window.location = 'login.html'
});

formCadastro.addEventListener('submit', submissaoCadastro);

// FUNÇÕES


function obtemNovoCadastro() {

    const cadName = document.querySelector('#name').value
    const cadUser = document.querySelector('#cadUser').value
    const cadPass = document.querySelector('#cadPassword').value

    if (validacaoInputVazio(cadName, cadUser, cadPass)) {
        objCadastro = {
            name: cadName,
            user: cadUser,
            senha: cadPass
        }

        return objCadastro
    } else {

        alert('Preencha os campos vazios')
    }
}

function validacaoInputVazio(campo1, campo2, campo3) {
    if ((campo1) && (campo2) && (campo3)) {
        return true
    } else {
        return false
    }
}


function insereCadastro(obj) {

    novaLista = cadastrosLS.filter((item) => {
        if (usuariosIguais(item, obj)) {
            alert('Usuário já foi cadastrado')
            return item
        }
    })

    if (novaLista.length === 0) {
        cadastrosLS.push(obj)
        salvaCadastroLS()
        return cadastrosLS
    }
    return false
}

function salvaCadastroLS() {
    localStorage.setItem('usuarios', JSON.stringify(cadastrosLS))
}


function submissaoCadastro(e) {
    e.preventDefault()
    obj = obtemNovoCadastro()
    if (obj && insereCadastro(obj)) {
        window.location = 'login.html'
    }
}

function usuariosIguais(obj1, obj2) {
    if ((obj1.user === obj2.user)) {
        return true
    } else {
        return false
    }
}

