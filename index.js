"use strict";

var questions = [
  { letter: "a", answer: "abducir", status: 0, question: "Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien."},
  { letter: "b", answer: "bingo", status: 0, question: "Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso."},
  { letter: "c", answer: "churumbel", status: 0, question: "Niño, crío, bebé."},
  { letter: "d", answer: "diarrea", status: 0, question: "Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida."},
  { letter: "e", answer: "ectoplasma", status: 0, question: "Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación."},
  { letter: "f", answer: "facil", status: 0, question: "Que no requiere gran esfuerzo, capacidad o dificultad."},
  { letter: "g", answer: "galaxia", status: 0, question: "Conjunto enorme de estrellas, polvo interestelar, gases y partículas."},
  { letter: "h", answer: "harakiri", status: 0, question: "Suicidio ritual japonés por desentrañamiento."},
  { letter: "i", answer: "iglesia", status: 0, question: "Templo cristiano."},
  { letter: "j", answer: "jabali", status: 0, question: "Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba."},
  { letter: "l", answer: "licantropo", status: 0, question: "Hombre lobo."},
  { letter: "m", answer: "misantropo", status: 0, question: "Persona que huye del trato con otras personas o siente gran aversión hacia ellas."},
  { letter: "n", answer: "necedad", status: 0, question: "Demostración de poca inteligencia."},
  { letter: "ñ", answer: "señal", status: 0, question: "Indicio que permite deducir algo de lo que no se tiene un conocimiento directo."},
  { letter: "o", answer: "orco", status: 0, question: "Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien."},
  { letter: "p", answer: "protoss", status: 0, question: "Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft."},
  { letter: "q", answer: "queso", status: 0, question: "Producto obtenido por la maduración de la cuajada de la leche."},
  { letter: "r", answer: "raton", status: 0, question: "Roedor."},
  { letter: "s", answer: "stackoverflow", status: 0, question: "Comunidad salvadora de todo desarrollador informático."},
  { letter: "t", answer: "terminator", status: 0, question: "Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984."},
  { letter: "u", answer: "unamuno", status: 0, question: "Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914."},
  { letter: "v", answer: "vikingos", status: 0, question: "Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa."},
  { letter: "x", answer: "botox", status: 0, question: "Toxina bacteriana utilizada en cirujía estética."},
  { letter: "y", answer: "peyote", status: 0, question: "Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal  por indígenas americanos."},
  { letter: "z", answer: "zen", status: 0, question: "Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional."} 
];


var startButton = document.getElementById("start__button");
var modal = document.getElementById("modal__window");

var currentPlayer;
var questionBox = document.getElementById("question-box");
var currentLetter = document.getElementById("current-letter");
var answerBox = document.getElementById("answer-box");
var buttons = document.getElementById("buttons");
var buttonOk = document.getElementById("button-ok");
var buttonPasapalabra = document.getElementById("button-pasapalabra");
var buttonCancel = document.getElementById("button-cancel");
var turn = 0;
var right = 0;
var fail = 0;
var count = 0;
var exit = false;

var seconds = 179;
var stopTime;

var time = document.getElementById('time');
var points = document.getElementById('points');
var virus = document.getElementById('virus');

var playerNameInput = document.getElementById('playerName');

var modalRanking = document.getElementById('modal__window--ranking');
var rankingContent = document.getElementById('rankingContent');
var againStartButton = document.getElementById('againStart__button')
var fragment = document.createDocumentFragment();

var position = 0;

var ranking = [];




//Button to start playing (modal window)
startButton.addEventListener('click', function() {
  if (playerNameInput.value !== '') {
    modal.classList.add('modal__hidden'); 

    ranking.push({name: playerNameInput.value, points: right, time: seconds});
    
    pasapalabra();
  }

  stopTime = setInterval(chronometer, 1000);
});


function chronometer() {
  time.textContent = seconds;
  seconds--;
  
   //End time
   if(time.textContent === '0') {
    questionBox.firstChild.textContent = `¡Se acabó el tiempo! ${playerNameInput.value}, te vas con ${right} acierto/s. No ha dado tiempo a encontrar la vacuna contra el VIRUS.`;
    currentLetter.textContent = '';
    
    modalWindowRanking();
  }

};


function cancel() {
  questionBox.firstChild.textContent = `¡Oh, qué pena! ${playerNameInput.value}, te vas con ${right} acierto/s. El VIRUS se hará fuerte`;
  currentLetter.textContent = '';
  
  buttons.removeEventListener('click', activeButtons); 
  answerBox.removeEventListener('keyup', activeButtons); 

  clearInterval(stopTime);
}


function end() {
  if(right < 6) {
    questionBox.firstChild.textContent = `¡Ufff! ${playerNameInput.value}, con solo ${right} acierto/s el VIRUS se hará fuerte`;
  } else if(right < 16) {
    questionBox.firstChild.textContent = `¡Ay! ${playerNameInput.value}, con ${right} aciertos esperemos que no haya un rebrote e de este VIRUS`;
  } else if(right < 25) {
    questionBox.firstChild.textContent = `¡Enhorabuena ${playerNameInput.value}! Con ${right} aciertos seguro que no vuelve a aparecer nunca más`;
    currentLetter.textContent = '';
  } else {
    questionBox.firstChild.textContent = `¡Enhorabuena ${playerNameInput.value}! Tenemos la vacuna contra el VIRUS`;
  }

  modalWindowRanking();
}


//See modal window Function
function modalWindowRanking() {
  clearInterval(stopTime);

  seconds = time.textContent;

  currentLetter.textContent = '';

  buttons.removeEventListener('click', activeButtons);  
  answerBox.removeEventListener('keyup', activeButtons);

  rankingSort();

  setTimeout(function() {
    modalRanking.classList.add('modal__rankin--top');  
    
    //Metemos lista creada en la ventana modal del ranking
    createList();

  }, 1000);

  //Button to restart game
  againStartButton.addEventListener('click', function (){  
    reset();   
    modalRanking.classList.remove('modal__rankin--top');
  });

}


//Creamos lista para ranking recorriendo el array
function createList() {
  for (var key of ranking) {
    var rankingList = document.createElement('LI');
    rankingList.textContent = `${key.name} || ${key.points} puntos || ${key.time} segundos`;
    fragment.appendChild(rankingList);
  }

  rankingContent.appendChild(fragment);
}


function reset() {
  modal.classList.remove('modal__hidden'); 
  playerNameInput.value = '';
  time.textContent = 'Time';
  points.textContent = 'Points';

  //Para que cada vez la lista se cree desde 0, sino se acumulaba
  rankingContent.innerHTML = '';

  //Reseteamos los status a 0
  for (let i = 0; i < questions.length; i++) {
    questions[i].status = 0;
  }

  colorReset();

  turn = 0;
  right = 0;
  fail = 0;
  count = 0;
  seconds = 179;

  buttons.addEventListener('click', activeButtons);
  answerBox.addEventListener('keyup', activeButtons);

  return false;
}


//Sort ranking (points & time)
function rankingSort() {  
  if (position < 4) {
    ranking[position].name = playerNameInput.value;
    ranking[position].points = right;  
    ranking[position].time = time.textContent; 
    position++;
  } else {
    position = 0;
  }
    
  var order = function(a, b){
      return a.points < b.points;
  };  

  var orderTime = function(a, b){
    return a.time < b.time;
  };

  for (var i = 0; i < ranking.length; i++) {
    if(ranking.indexOf(ranking[i].points)) {
      ranking.sort(orderTime);
    }
  }

  ranking.sort(order);
  
  if(ranking.length === 4) ranking.pop(ranking.length);
}


function colorChangeGreen() {
  var getLetter = currentLetter.textContent.toLowerCase();
  var colorLetter = document.getElementById(getLetter);
  
  colorLetter.classList.add('letters__green');
}


function colorChangeRed() {
  var getLetter = currentLetter.textContent.toLowerCase();
  var colorLetter = document.getElementById(getLetter);
  
  colorLetter.classList.add('letters__red');
}


function colorReset() {
  var letters = Array.from(document.querySelectorAll('.letters'));
  
  letters.map(c => {
    c.classList.remove('letters__green');
    c.classList.remove('letters__red');
  });
}


function pasapalabra() {
  exit = false;
  count = right + fail;
  
  if (count >= questions.length) {
    exit = true;
    end();
  }
  
  if (turn >= questions.length) turn = 0;
  
  while(!exit) {
    for (var i = turn; i < questions.length; i++) {
      if (questions[i].status === 0) {
        questionBox.firstChild.textContent = questions[i].question;
        currentLetter.textContent = questions[i].letter.toUpperCase();
        exit = true;
        break;
      } 

      //Si lo ponía en else, cuando llegaba a 4 no le podía decir que entrara de nuevo en el for
      //Si ponía while(!false) se ejecutaba todo el tiempo seguido. El true hay que ponerlo antes de romper el if, así rompemos el while también
      //Con turn aquí me aseguro que siempre sume 1
      //Si no ponía la condición, cuando se juntaba este turn + el de los botones me daba error porque
      //no lo encontraba en el array
      turn++; 
      
      if (turn >= questions.length) {
        turn = 0;
      }
    }
  }
}


buttons.addEventListener('click', activeButtons);
answerBox.addEventListener('keyup', activeButtons);

function activeButtons(event) {
  event.preventDefault();
  if (event.keyCode === 13  || event.target === buttonOk) {
    if (answerBox.value.toLowerCase() === questions[turn].answer) {
      questions[turn].status = 1;

      //cambio imagen
      virus.src = 'img/virus-contento.png';
      setTimeout(function() {
        virus.src = 'img/virus.png';
      }, 1000);

      colorChangeGreen();
      right++;
      turn++;  
      points.textContent = right;
      answerBox.value = '';
      pasapalabra();
    } else {
      questions[turn].status = 2;

      //cambio imagen
      virus.src = 'img/virus-enfadado.png';
      setTimeout(function() {
        virus.src = 'img/virus.png';
      }, 1000);

      colorChangeRed();
      fail++;
      turn++;   
      answerBox.value = '';
      pasapalabra();
    }
  }

  if (event.keyCode === 32 || event.target === buttonPasapalabra) {
    //cambio imagen
    virus.src = 'img/virus-pensando.png';
    setTimeout(function() {
      virus.src = 'img/virus.png';
    }, 1000);

    turn++;  
    answerBox.value = '';
    pasapalabra();
  }

  if (event.keyCode === 27 || event.target === buttonCancel) {  
    answerBox.value = '';
    cancel();
  }
}