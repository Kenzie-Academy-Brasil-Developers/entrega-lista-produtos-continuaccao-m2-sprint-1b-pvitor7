// Selecionando elemento ul do HTML
const ul = document.querySelector('.containerListaProdutos ul');

function montarListaProdutos(listaProdutos){

    ul.innerHTML = '';

    listaProdutos.forEach((produto) => {
        const li = document.createElement('li');
        li.dataset.id = produto.id;
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        p.id = 'preco'
        const span = document.createElement('span');
        const nutrientes = document.createElement('ol')
        const componenteUm = document.createElement('li')
        const componenteDois = document.createElement('li')
        const componenteTres = document.createElement('li')
        const componenteQuatro = document.createElement('li')
        let buttonItem = document.createElement('button')
        buttonItem.id = "compraritem"

        // Adicionando dados do produto aos elementos
        img.src = produto.img;
        img.alt = produto.nome;
        h3.innerText = produto.nome;
        p.innerText = `R$ ${produto.preco}`;
        span.innerText = produto.secao;
        componenteUm.innerText = produto.componentes[0]
        componenteDois.innerText = produto.componentes[1]
        componenteTres.innerText = produto.componentes[2]
        componenteQuatro.innerText = produto.componentes[3]
        buttonItem.innerText = 'Adicionar ao carrinho'

        // Adicionando o elementos para o li
        li.appendChild(img);
        li.appendChild(h3);
        li.appendChild(p);
        li.appendChild(span);
        li.appendChild(nutrientes);
        nutrientes.appendChild(componenteUm);
        nutrientes.appendChild(componenteDois);
        nutrientes.appendChild(componenteTres);
        //Se não houver um 4º componente em nutrientes, não o adiciona
        if(produto.componentes.length > 3){
            nutrientes.appendChild(componenteQuatro);}

        li.appendChild(buttonItem);

        // Adicionando li ao HTML
        ul.appendChild(li);
    });
}

//Adicionando Mostrar todos os itens da lista
const botaoMonstrarTodos = document.querySelector('#mostrarTodos');
botaoMonstrarTodos.addEventListener('click', listaToda)

//Função para exibir lista completa
listaToda ()

function listaToda (){
    
    const listaCompleta =  produtos;
    montarListaProdutos(listaCompleta)   
}

// Selecionando botao em nosso HTML
const botaoMostrarHortifruti = document.querySelector('.estiloGeralBotoes--filtrarHortifruti');

//Filtro seção Hortifruti
function filtrarPorHortifruti() {

    const listaHortifruti = produtos.filter((produto) => {
        return produto.secao === 'Hortifruti';
    });
    montarListaProdutos(listaHortifruti);
}
// Adicionando event listener de clique, e executando a função de filtro
botaoMostrarHortifruti.addEventListener('click', filtrarPorHortifruti);

//Adicionando evento a botão de busca por nome
const buttonBuscaPorNome = document.getElementById("botaoNome")
buttonBuscaPorNome.addEventListener('click', nameFilter);

//Função de busca por nome
function nameFilter() {

    let caixaBuscaPorNome = document.querySelector("#caixadebusca").value;
    caixaBuscaPorNome = caixaBuscaPorNome.toLowerCase()
       
    let listaPorNome = produtos.filter((produto) => {
         if(produto.nome.toLowerCase() == caixaBuscaPorNome){
            return produto;
            }
        if(produto.secao.toLowerCase() == caixaBuscaPorNome){
            return produto;
            }
        if(produto.categoria.toLowerCase() == caixaBuscaPorNome){
            return produto;
            }
    })
    montarListaProdutos(listaPorNome);
}

//Montando carrinho
const carrinhoDeCompras = document.querySelector("#listaNoCarrinho");
ul.addEventListener('click', colocandoNoCarrinho);

let precoTotalCarinnho = document.querySelector("#precoTotalCarinnho")
let somaPreco = 0;

let somaPrecoCarrinho = document.querySelector("#precoTotal");
somaPrecoCarrinho = 0;
let carrinhoArray = [];

function colocandoNoCarrinho(event){

    let selecaoProduto = event.target;
    let selecaoProdutoPai = selecaoProduto.closest('li')
    
    if(selecaoProduto.tagName === "BUTTON"){
        let idProduto = selecaoProdutoPai.dataset.id;

        for(let i = 0; i < produtos.length; i++){
            if(produtos[i].id == idProduto){
                somaPrecoCarrinho += Number(produtos[i].preco);
                carrinhoArray.push(produtos[i])
                }
            }
        }
    let cloneProduto = selecaoProdutoPai.cloneNode(true);
    precoTotalCarinnho.innerText = `Preço total: R$ ${somaPrecoCarrinho},00`
    carrinhoDeCompras.appendChild(cloneProduto);
}