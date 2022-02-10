// Selecionando elemento ul do HTML
const ul = document.querySelector('.containerListaProdutos ul');
let buttonItem;

let somaPreco = document.querySelector("#precoTotal");
somaPrecoCarrinho = 0;

function montarListaProdutos(listaProdutos){

    ul.innerHTML = '';

    listaProdutos.forEach((produto) => {
        const li = document.createElement('li');
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
        buttonItem = document.createElement('button')
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
        //Se não houver um 4º componente em nutrientes, não adiciona
        if(produto.componentes.length > 3){
            nutrientes.appendChild(componenteQuatro);}

        li.appendChild(buttonItem);

        // Adicionando li ao HTML
        ul.appendChild(li);
    });
}

listaToda ()

//Adicionando Mostrar todos os itens da lista
const botaoMonstrarTodos = document.querySelector('#mostrarTodos');
botaoMonstrarTodos.addEventListener('click', listaToda)

//Função para exibir lista completa
function listaToda (){
    
    const listaCompleta =  produtos;
    montarListaProdutos(listaCompleta)   
}

// Selecionando botao em nosso HTML
const botaoMostrarHortifruti = document.querySelector('.estiloGeralBotoes--filtrarHortifruti');

// Adicionando event listener de clique, e executando a função de filtro
botaoMostrarHortifruti.addEventListener('click', filtrarPorHortifruti);

//Filtro seção Hortifruti
function filtrarPorHortifruti() {

    somaPreco.innerText = ''
   
    const listaHortifruti = produtos.filter((produto) => {
        return produto.secao === 'Hortifruti';
    });

    montarListaProdutos(listaHortifruti);
}

//Adicionando evento a botão de busca por nome
let buttonBuscaPorNome = document.getElementById("botaoNome")
buttonBuscaPorNome.addEventListener('click', nameFilter);

//Função de busca por nome
function nameFilter() {

    let caixaBuscaPorNome = document.querySelector("#caixadebusca").value;
    caixaBuscaPorNome = caixaBuscaPorNome.toLowerCase()
       
    let listaPorNome = produtos.filter((produto) => {
     
         if(produto.nome.toLowerCase() == caixaBuscaPorNome){

           return produto
         }
        if(produto.secao.toLowerCase() == caixaBuscaPorNome){

            return produto
         }
        if(produto.categoria.toLowerCase() == caixaBuscaPorNome){

            return produto
         }
    })
    montarListaProdutos(listaPorNome);
}

//Montando carrinho
const carrinhoDeCompras = document.querySelector("#listaNoCarrinho");
ul.addEventListener('click', colocandoNoCarrinho);

let precoTotalCarinnho = document.querySelector("#precoTotalCarinnho")
let produtoSelecionado;

function colocandoNoCarrinho(event){

    produtoSelecionado = event.target;
    
    produtoSelecionado = produtoSelecionado.closest('li')
    somaPreco = produtoSelecionado.children[2];
    somaPreco = somaPreco.children[0];
    somaPreco = somaPreco.children[0];
    somaPreco = somaPreco.textContent;
    somaPreco = somaPreco.replace(/[^1-9]/gi, '');   
    somaPreco = Number(somaPreco)
    somaPrecoCarrinho += somaPreco;
    precoTotalCarinnho.innerText = `Preço total: R$ ${somaPrecoCarrinho},00`
    
    produtoSelecionado = produtoSelecionado.cloneNode(true);
    carrinhoDeCompras.appendChild(produtoSelecionado);
}
