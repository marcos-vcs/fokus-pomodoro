const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const startPauseBtn = document.querySelector("#start-pause");
const iniciarOuPausarBtn = document.querySelector("#start-pause span");
const iconeIniciarOuPausarBtn = document.querySelector(
  ".app__card-primary-butto-icon"
);
const tempoNaTela = document.querySelector("#timer");
const musicaPlay = new Audio("../sons/play.wav");
const musicaPause = new Audio("../sons/pause.mp3");
const musicaBeep = new Audio("../sons/beep.mp3");
const musicaAmbiente = new Audio("../sons/luna-rise-part-one.mp3");
musicaAmbiente.loop = true;
musicaPlay.volume = 0.3;
musicaPause.volume = 0.3;
musicaBeep.volume = 0.5;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => {
  if (musicaAmbiente.paused) {
    musicaAmbiente.play();
  } else {
    musicaAmbiente.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  this.alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  this.alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  this.alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach((contexto) => contexto.classList.remove("active"));
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
            Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
            Que tal dar uma respirada?,<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      titulo.innerHTML = `
            Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    musicaBeep.play();
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPauseBtn.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    musicaPause.play();
    zerar();
    return;
  }
  musicaPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iconeIniciarOuPausarBtn.setAttribute("src", "/imagens/pause.png");
  iniciarOuPausarBtn.textContent = `Pausar`;
}

function zerar() {
  clearInterval(intervaloId);
  iconeIniciarOuPausarBtn.setAttribute("src", "/imagens/play_arrow.png");
  iniciarOuPausarBtn.textContent = `Começar`;
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const minutos = tempo.getUTCMinutes().toString().padStart(2, "0");
  const segundos = tempo.getSeconds().toString().padStart(2, "0");
  tempoNaTela.innerHTML = `${minutos}:${segundos}`;
}

mostrarTempo();
