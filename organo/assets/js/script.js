const form = document.querySelector('.formAdd')
form.addEventListener('submit', function(ev){
    ev.preventDefault() //não atualiza a página
    
    let pessoa = receberValoresDaTabela(form) //dados vindo do formulario

    let imagemCodificada = coverterParaBase64(pessoa.imagem)
    localStorage.setItem('imagem', imagemCodificada) //add imagem no localStorage

    let row 

    switch (pessoa.time) {
        case 'fullStack':
            row = document.querySelector('.fullStack')
            pessoa.corFundo = '#5cb85c'
            break
        case 'frontEnd':
            row = document.querySelector('.frontEnd')
            pessoa.corFundo = '#0275d8'
            break
        case 'backEnd':
            row = document.querySelector('.backEnd')
            pessoa.corFundo = '#e5ff00'
            break
        case 'dataScience':
            row = document.querySelector('.dataScience')
            pessoa.corFundo = '#ff0000'
            break
        case 'mobile':
            row = document.querySelector('.mobile')
            pessoa.corFundo = '#474b4b'
            break
        case 'uxEDesign':
            row = document.querySelector('.uxEDesign')
            pessoa.corFundo = '#10afaf'
            break
    }

    row.appendChild(montarCard(pessoa)) //add o card na linha
})

const receberValoresDaTabela = (form) => {
    let pessoa = {                  //criando uma pessoa com os dados do form
        nome: form.nome.value,      //recebedo o nome do form
        cargo: form.cargo.value,    //recebendo o cargo do form
        img: form.imagem.files[0],  //recebendo a imagem do form
        time: form.time.value       //recebendo o time do form
    }
    return pessoa 
}

function adicionarDescricao(pessoa){
    let nomeDescricao = document.createElement('h4') //criando um titulo h4 para o nome da pessoa
    nomeDescricao.textContent = pessoa.nome //adicionando o nome da pessoa na tag h4
    nomeDescricao.style.color = pessoa.corFundo

    let cargoDescricao = document.createElement('p') //criando um paragrafo p
    cargoDescricao.textContent = pessoa.cargo //add o cargo da pessoa ao paragrafo p
    cargoDescricao.style.color = pessoa.corFundo

    let figcaption = document.createElement('figcaption') //criando um figcaption
    figcaption.classList.add('text-center') //add uma classe de html ao figcaption
    figcaption.appendChild(nomeDescricao) //add o nome dentro do figcaption
    figcaption.append(cargoDescricao) //add o cargo dentro do figcaption

    return figcaption
}

function montarCard(pessoa){

    let foto = document.createElement('figure')


    let figure = document.createElement('figure') //criando uma figure
    figure.classList.add('card') //add classes ao figure
    figure.classList.add('m-3') 
    figure.classList.add('col-md-3')
    figure.style.backgroundImage = 'linear-gradient(to top, white 60%, '+ pessoa.corFundo +' 40%)'

    figure.appendChild(adicionarDescricao(pessoa)) //add figcaption 'descricao' ao figure

    return figure
}

//convertendo imagem para base 64
// function converterParaBase64(imagem){
//     return new Promise(resolve => {
//         let reader = new FileReader()
//         reader.readAsDataURL(imagem) 
//         reader.onload = function(){
//             let imagemCodificada = reader.result.split(',')[1]
//             resolve(imagemCodificada)
//         }
//     })
// } 

function coverterParaBase64(imagem) {
    return new Promise(resolve =>{

        let reader = new FileReader()
        reader.readAsDataURL(imagem)
        reader.onload = function () {
            let imagemCodificada = reader.result.split(',')[1]
            resolve(imagemCodificada)
    
        }
    
    })

}