let musicas = [
    {titulo:'Birds', artista:'Imagine Dragons', src:'msc/birds.mpeg', img: src='img/birds.jpg'},
    {titulo:'Always', artista:'Gavin James', src:'msc/always.mpeg', img: src='img/always.jpg'},
    {titulo:'Runaway', artista:'Aurora', src:'msc/runaway.mpeg', img: src='img/runaway.jpg'}
];

// Buscando cada classe do html
let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let img = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    // validação na aplicação para que nao encontre um index vazio (undefinned)
    if (indexMusica < 0) {
        indexMusica = 2;
    }

    renderizarMusica(indexMusica);
    tocarMusica();
});

document.querySelector('.proximo').addEventListener('click', () => {
    indexMusica++;
    // validação na aplicação para que nao encontre um index vazio (undefinned)
    if (indexMusica > 2){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
    tocarMusica();
});

// Funções


function renderizarMusica(index){
    // estou substituindo o atributo src original da minha tag audio pelo atributo src que esta no array musicas
    musica.setAttribute('src', musicas[index].src);
    // após o usuário realizar o click de proxima ou anterior estará buscando os dados do array conforme seu index
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        img.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

function tocarMusica(){
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function videoRodar(){
    if(tocarMusica()){
      video.play();
      console.log('rodo');
    }else
      video.pause();
  }

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }

    return campoMinutos + ':' +campoSegundos;
}