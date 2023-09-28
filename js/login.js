
let logado = JSON.parse(sessionStorage.getItem('logado'))

let usuariosLS = JSON.parse(localStorage.getItem('usuarios')) || []

if (!logado) {

    let form = document.querySelector('#form')

    document.addEventListener("submit", (e) => {
        e.preventDefault()

        const user = form.querySelector("#user").value
        const pass = form.querySelector("#password").value

        let validaLogin = 0
        usuariosLS.forEach(usuario => {
            if (user === usuario.user && pass === usuario.senha) {
                validaLogin++
            }
        });


        if (validaLogin > 0) {
            sessionStorage.setItem("logado", JSON.stringify(true));
            sessionStorage.setItem("user", user)
            window.location = "index.html"
        } else {
            sessionStorage.setItem("logado", JSON.stringify(false));
            alert('usuário ou senha inválidos')
        }
    })

    /* --------- ir para página de cadastro ------------ */

    const btnSignOn = document.querySelector('#pageSignOn')
    btnSignOn.addEventListener('click', () => {
        window.location = 'signon.html'
    })

} else {
    window.location = 'index.html'
}














