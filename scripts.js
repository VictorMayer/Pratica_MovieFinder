buscarFilmes();

function buscarFilmes() {
    const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes");
    promisse.then(renderizarFilmes);
    promisse.catch(tratarErro);
}

function renderizarFilmes(resposta) {
    console.log(resposta.data);
    const filmes = resposta.data
    const elemento = document.querySelector(".movies");
    const novosFilmes = [];
    for (let i = 0; i < filmes.length; i++) {
        elemento.innerHTML += `<div class="movie">
                                <img src="${filmes[i].imagem}">
                                <div class="title">${filmes[i].titulo}</div>
                                <button onclick="comprar(${filmes[i].id})">
                                    Comprar
                                    <ion-icon name="cart-outline"></ion-icon>
                                </button>
                             </div>`
    }
}

function tratarErro(erro) {
    console.log("Os ingressos para este filme estão esgotados!")
}

function comprar(id) {
    const nome = prompt("Qual o seu nome?");
    const qtd = prompt("Quantos Ingressos quer comprar?");
    enviarServidor(nome, qtd, id);
}

function enviarServidor(nome, qtd, id) {
    const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes/${id}/ingresso`, { nome: nome, quantidade: qtd });
    promisse.then(compraRealizada)
    promisse.catch(tratarErro);
}

function compraRealizada(resposta) {
    alert("Ingresso comprado com sucesso!");
}