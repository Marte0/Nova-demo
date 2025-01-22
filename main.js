//variabili generiche
let shownInvestmentData;
const feedbackStamp = document.querySelector(".feedback-stamp");
// miao

//investimenti correnti
let renewablesCurrentInvestment = Math.floor(Math.random() * investmentData.renewables.length);
let fossilCurrentInvestment = Math.floor(Math.random() * investmentData.fossil.length);
let nuclearCurrentInvestment = Math.floor(Math.random() * investmentData.nuclear.length);
let approvalCurrentInvestment = Math.floor(Math.random() * investmentData.approval.length);
let gridCurrentInvestment = Math.floor(Math.random() * investmentData.grid.length);
//commento prva push
//investimenti non fatti
let renewableUndoneInvestmens = {
  undone: [],
  maxLenght: investmentData.renewables.length,
};
let fossilUndoneInvestmens = {
  undone: [],
  maxLenght: investmentData.fossil.length,
};
let nuclearUndoneInvestmens = {
  undone: [],
  maxLenght: investmentData.nuclear.length,
};

let approvalUndoneInvestmens = {
  undone: [],
  maxLenght: investmentData.approval.length,
};

let gridUndoneInvestmens = {
  undone: [],
  maxLenght: investmentData.grid.length,
};

//investimenti fatti
let renewableDoneInvestmens = [];
let fossilDoneInvestmens = [];
let nuclearDoneInvestmens = [];
let approvalleDoneInvestmens = [];
let gridDoneInvestmens = [];

//tutorial
const tutorialScreens = document.querySelectorAll(".tutorial");
const lastTutorialButton = document.querySelector(".last-tutorial-button");

//time e score
const timeText = document.querySelector(".time");
let time = 120; // 2 minutes in seconds
let timerInterval;

const scoreText = document.querySelector(".score");

//aumento score messo nel feedback stamp
let score = 0;
const scoreScreen = document.querySelector(".score-screen");
const finalScoreText = document.querySelector(".final-score");

//variabili carte

//variabili carte esterne
const cards = document.querySelectorAll(".card");
const renewablesCard = cards[0];
const fossilCard = cards[1];
const nuclearCard = cards[2];
const approvalCard = cards[3];
const gridCard = cards[4];

let cardShown = false;

//per farle sparire una volta che sono state aperte

//variabili scroll
const scrollContainer = document.querySelector(".scroll-container");

//parametri carte esterne
const renewableParameters = renewablesCard.querySelectorAll(".parameter");
const fossilParameters = fossilCard.querySelectorAll(".parameter");
const nuclearParameters = nuclearCard.querySelectorAll(".parameter");
const approvalParamters = approvalCard.querySelectorAll(".parameter");
const gridParameters = gridCard.querySelectorAll(".parameter");

//variabili carte interne
const fullscreenDiv = document.querySelector(".fullscreen-div");
const innerCard = document.querySelector(".inner-card");
const innerParameters = document.querySelectorAll(".inner-parameter");
const investmentBodies = document.querySelectorAll(".investment-body");
const answerButtons = document.querySelectorAll(".answer");

//variabili singoli investimenti

//rinnovabili
const renewableMap = document.querySelector(".green-map");
const renewableButtons = document.querySelectorAll(".renewable-button");

//fossili
const fossilResource = document.querySelector(".fossil-resource");
const fossilFlags = document.querySelectorAll(".fossil-flag");
const fossilFlagText = document.querySelectorAll(".fossil-flag-text");
const fossilButtons = document.querySelectorAll(".fossil-button");

//nucleare
const nuclearCode = document.querySelector(".nuclear-code");
const nuclearSteps = document.querySelectorAll(".nuclear-step");
const nuclearButtons = document.querySelectorAll(".nuclear-button");
const nuclearOptions = investmentData.nuclear[nuclearCurrentInvestment].opzioni;
let nuclearOrderGuess = [];

//approval
const archetypeGraph = document.querySelector(".archetype-graph");
const approvalMediaLabel = document.querySelectorAll(".approval-media");
const approvaConfirmButton = document.querySelector(".approval-button");
const approvalSwitches = document.querySelectorAll(".approval-switch input");

//grid
const gridButtons = document.querySelectorAll(".grid-button");
const gridScientist = document.querySelectorAll(".grid-scientist");
const gridScientistText = document.querySelectorAll(".grid-scientist-text");

//riempi carte esterne
riempiCarteEsterne();

//rimuovi carta fossili perche è troppo difficile
cards[1].style.display = "none";

//tutorial e inizio gioco
tutorialScreens.forEach((screen, index) => {
  screen.addEventListener("click", () => {
    console.log(index);
    if (index != 2) {
      screen.style.display = "none";
    }
  });
});

lastTutorialButton.addEventListener("click", () => {
  tutorialScreens[2].style.display = "none";
  startTimer();
});

//gestione event listener investimenti

//rinnovabili
renewableButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    console.log(investmentData.renewables[renewablesCurrentInvestment].opzioni[index].corretto);
    stampAnimation(investmentData.renewables[renewablesCurrentInvestment].opzioni[index].corretto, "renewable");

    renewablesCurrentInvestment = updateCurrentInvestment(renewableUndoneInvestmens, renewablesCurrentInvestment);
    riempiCarteEsterne();
  });
});

//fossili
fossilButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    console.log(investmentData.fossil[fossilCurrentInvestment].opzioni[index].corretto);
    stampAnimation(investmentData.fossil[fossilCurrentInvestment].opzioni[index].corretto, "fossil");
    fossilCurrentInvestment = updateCurrentInvestment(fossilUndoneInvestmens, fossilCurrentInvestment);
    riempiCarteEsterne();
  });
});

//nucleare
nuclearButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const guessIndex = nuclearOrderGuess.indexOf(index);
    if (guessIndex === -1) {
      // Aggiungi l'indice all'array se non è presente
      nuclearOrderGuess.push(index);
      button.style.backgroundColor = "#378997";
    } else {
      // Rimuovi l'indice dall'array se è presente
      nuclearOrderGuess.splice(guessIndex, 1);
      button.classList.remove("selected");
      button.style.backgroundColor = "#6bc2d1";
    }
    console.log(nuclearOrderGuess);

    nuclearSteps.forEach((step, index) => {
      step.innerHTML = `Step ${index + 1}`;
      step.style.border = "2px dashed #000";
    });

    nuclearOrderGuess.forEach((guess, index) => {
      //   console.log(guess);
      nuclearSteps[index].innerHTML = nuclearOptions[guess].nome;
      nuclearSteps[index].style.border = "2px solid #000";
    });

    if (nuclearOrderGuess.length == 6) {
      //fullscreenDiv.classList.add("slide-out");
      shownInvestmentData = null;
      if (nuclearOrderGuess.toString() == investmentData.nuclear[nuclearCurrentInvestment].risposta.toString()) {
        console.log("corretto");
        stampAnimation(true, "nuclear");
      } else {
        console.log("sbagliato");
        stampAnimation(false, "nuclear");
      }

      closeInvestment();

      setTimeout(() => {
        nuclearOrderGuess = [];
        nuclearSteps.forEach((step, index) => {
          step.innerHTML = `Step ${index + 1}`;
          step.style.border = "2px dashed #000";
        });
        nuclearButtons.forEach((button) => {
          button.style.backgroundColor = "#6bc2d1";
        });
      }, 1500);

      nuclearCurrentInvestment = updateCurrentInvestment(nuclearUndoneInvestmens, nuclearCurrentInvestment);
      riempiCarteEsterne();
    }
  });
});

//approval
approvaConfirmButton.addEventListener("click", () => {
  const approvalMedia = investmentData.approval[approvalCurrentInvestment].media;
  console.log(approvalMedia);

  if (approvalMedia[0].corretto == approvalSwitches[0].checked && approvalMedia[1].corretto == approvalSwitches[1].checked && approvalMedia[2].corretto == approvalSwitches[2].checked) {
    console.log("corretto");
    stampAnimation(true, "approval");
  } else {
    console.log("sbagliato");
    stampAnimation(false, "approval");
  }

  setTimeout(() => {
    approvalSwitches.forEach((element, index) => {
      element.checked = false;
    });
  }, 1500);

  approvalCurrentInvestment = updateCurrentInvestment(approvalUndoneInvestmens, approvalCurrentInvestment);
  riempiCarteEsterne();
});

//grid
gridButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    console.log(investmentData.grid[gridCurrentInvestment].opzioni[index].corretto);
    stampAnimation(investmentData.grid[gridCurrentInvestment].opzioni[index].corretto, "grid");
  });
  gridCurrentInvestment = updateCurrentInvestment(gridUndoneInvestmens, gridCurrentInvestment);
  riempiCarteEsterne();
});

//quando apri metti la carta al centro
document.addEventListener("DOMContentLoaded", () => {
  const middleIndex = Math.floor(cards.length / 2);
  // Scroll to the middle card
  const middleCard = cards[middleIndex];
  scrollContainer.scrollLeft = middleCard.offsetLeft - (scrollContainer.clientWidth - middleCard.clientWidth) / 2;
});

//iserimento dati investimento e minigiochi (carte interne)

cards.forEach((card, index) => {
  //funzione pezzotta per togliere e mettere le carte
  card.addEventListener("click", () => {
    setTimeout(() => {
      card.style.display = "none";
    }, 1000);

    if (!cardShown) {
      switch (index) {
        case 0:
          shownInvestmentData = investmentData.renewables[renewablesCurrentInvestment];
          break;
        case 1:
          shownInvestmentData = investmentData.fossil[fossilCurrentInvestment];
          break;
        case 2:
          shownInvestmentData = investmentData.nuclear[nuclearCurrentInvestment];
          break;
        case 3:
          shownInvestmentData = investmentData.approval[approvalCurrentInvestment];
          break;
        case 4:
          shownInvestmentData = investmentData.grid[gridCurrentInvestment];
          break;
      }

      cardShown = true;

      // Creazione del fullscreen div

      fullscreenDiv.style.display = "block";
      fullscreenDiv.style.backgroundColor = window.getComputedStyle(card).backgroundColor;

      //aggiunta header
      innerCard.children[0].innerHTML = shownInvestmentData.titolo;

      innerParameters[0].children[1].innerHTML = `${shownInvestmentData.parametri.prezzo}M`;
      innerParameters[1].children[1].innerHTML = `${shownInvestmentData.parametri.energia}%`;
      innerParameters[2].children[1].innerHTML = `${shownInvestmentData.parametri.co2}ppm`;
      innerParameters[3].children[1].innerHTML = `${shownInvestmentData.parametri.consenso}%`;

      //rendi visibile il body del colore selezionato
      if (card.classList.contains("renewables")) {
        investmentBodies[0].style.display = "flex";

        //cambia l'immafgine della mappa
        renewableMap.src = `green_maps/${investmentData.renewables[renewablesCurrentInvestment].immagine}.png`;

        //aggiorna i testi dei bottoni
        renewableButtons.forEach((button, index) => {
          button.innerHTML = investmentData.renewables[renewablesCurrentInvestment].opzioni[index].nome;
        });
      }

      if (card.classList.contains("fossil")) {
        investmentBodies[1].style.display = "flex";

        //cambia l'immagine delle risorse
        fossilResource.src = `fossil_resources/${investmentData.fossil[fossilCurrentInvestment].resource}.png`;
        fossilFlags.forEach((flag, index) => {
          flag.src = `fossil_flags/${investmentData.fossil[fossilCurrentInvestment].opzioni[index].bandiera}.png`;
        });

        fossilFlagText.forEach((flagText, index) => {
          console.log(investmentData.fossil[fossilCurrentInvestment].opzioni[index].stato);
          switch (investmentData.fossil[fossilCurrentInvestment].opzioni[index].stato) {
            case 0:
              flagText.innerHTML = "The political stability of the state keeps prices at a <span class='bold'>standard</span> level.";
              break;
            case 1:
              flagText.innerHTML = "Global tech growth lowered prices due to <span class='bold'>reduced demand</span> ";
              break;
            case 2:
              flagText.innerHTML = "<span class='bold'>Rivalries</span> with nations allied to us have driven up prices.";
              break;
          }
        });
      }

      if (card.classList.contains("nuclear")) {
        investmentBodies[2].style.display = "flex";

        //aggiorna testo bottoni nucleare
        nuclearCode.src = `nuclear_codes/${investmentData.nuclear[nuclearCurrentInvestment].code}.png`;
        nuclearButtons.forEach((button, index) => {
          button.innerHTML = investmentData.nuclear[nuclearCurrentInvestment].opzioni[index].abbreviazione;
        });
      }

      if (card.classList.contains("approval")) {
        investmentBodies[3].style.display = "flex";

        //aggiorna grafico archetipo
        archetypeGraph.src = `approval_archetypes/${investmentData.approval[approvalCurrentInvestment].archetipo}.png`;

        //aggiorna media
        approvalMediaLabel.forEach((media, index) => {
          media.innerHTML = investmentData.approval[approvalCurrentInvestment].media[index].nome;
        });
      }

      if (card.classList.contains("grid")) {
        investmentBodies[4].style.display = "flex";
        //aggiorno scienziati e quello che dicono
        gridScientist.forEach((scientist, index) => {
          scientist.src = `grid_scientists/${investmentData.grid[gridCurrentInvestment].opzioni[index].scienziato}.png`;
        });

        gridScientistText.forEach((scientistText, index) => {
          scientistText.innerHTML = `"` + investmentData.grid[gridCurrentInvestment].opzioni[index].frase + `"`;
        });
      }

      // Rimuovere il fullscreen div con animazione

      answerButtons.forEach((button) => {
        button.addEventListener("click", () => {
          closeInvestment();
        });
      });

      fullscreenDiv.addEventListener("animationend", () => {
        if (cardShown) {
          if (fullscreenDiv.classList.contains("slide-out")) {
            fullscreenDiv.classList.remove("slide-out");
            fullscreenDiv.style.display = "none";
            cardShown = false;
            feedbackStamp.classList.remove("show");

            feedbackStamp.classList.remove("show");

            investmentBodies.forEach((investmentBody) => {
              investmentBody.style.display = "none";
            });
          }
        }
      });
    }
  });
});

function closeInvestment() {
  setTimeout(() => {
    fullscreenDiv.classList.add("slide-out");
    shownInvestmentData = null;

    let visibleCards = 0;
    cards.forEach((card) => {
      if (card.style.display != "none") {
        visibleCards++;
      }
    });

    console.log(visibleCards);
    if (visibleCards == 0) {
      cards.forEach((card, index) => {
        if (index != 1) {
          card.style.display = "flex";
          scrollContainer.style.justifyContent = "start";
        }
      });
    }
    if (visibleCards == 1) {
      scrollContainer.style.justifyContent = "center";
    }
  }, 1000);
}

function riempiCarteEsterne() {
  //riempimento parametri e titoli carte

  //rinnovabili
  renewablesCard.children[0].innerHTML = investmentData.renewables[renewablesCurrentInvestment].titolo;

  renewableParameters[0].children[1].innerHTML = `${investmentData.renewables[renewablesCurrentInvestment].parametri.prezzo}M`;
  renewableParameters[1].children[1].innerHTML = `${investmentData.renewables[renewablesCurrentInvestment].parametri.energia}%`;
  renewableParameters[2].children[1].innerHTML = `${investmentData.renewables[renewablesCurrentInvestment].parametri.co2}ppm`;
  renewableParameters[3].children[1].innerHTML = `${investmentData.renewables[renewablesCurrentInvestment].parametri.consenso}%`;

  //fossili
  fossilCard.children[0].innerHTML = investmentData.fossil[fossilCurrentInvestment].titolo;

  fossilParameters[0].children[1].innerHTML = `${investmentData.fossil[fossilCurrentInvestment].parametri.prezzo}M`;
  fossilParameters[1].children[1].innerHTML = `${investmentData.fossil[fossilCurrentInvestment].parametri.energia}%`;
  fossilParameters[2].children[1].innerHTML = `${investmentData.fossil[fossilCurrentInvestment].parametri.co2}ppm`;
  fossilParameters[3].children[1].innerHTML = `${investmentData.fossil[fossilCurrentInvestment].parametri.consenso}%`;

  //nucleare
  nuclearCard.children[0].innerHTML = investmentData.nuclear[nuclearCurrentInvestment].titolo;

  nuclearParameters[0].children[1].innerHTML = `${investmentData.nuclear[nuclearCurrentInvestment].parametri.prezzo}M`;
  nuclearParameters[1].children[1].innerHTML = `${investmentData.nuclear[nuclearCurrentInvestment].parametri.energia}%`;
  nuclearParameters[2].children[1].innerHTML = `${investmentData.nuclear[nuclearCurrentInvestment].parametri.co2}ppm`;
  nuclearParameters[3].children[1].innerHTML = `${investmentData.nuclear[nuclearCurrentInvestment].parametri.consenso}%`;

  //approval
  approvalCard.children[0].innerHTML = investmentData.approval[approvalCurrentInvestment].titolo;

  approvalParamters[0].children[1].innerHTML = `${investmentData.approval[approvalCurrentInvestment].parametri.prezzo}M`;
  approvalParamters[1].children[1].innerHTML = `${investmentData.approval[approvalCurrentInvestment].parametri.energia}%`;
  approvalParamters[2].children[1].innerHTML = `${investmentData.approval[approvalCurrentInvestment].parametri.co2}ppm`;
  approvalParamters[3].children[1].innerHTML = `${investmentData.approval[approvalCurrentInvestment].parametri.consenso}%`;

  //grid
  gridCard.children[0].innerHTML = investmentData.grid[gridCurrentInvestment].titolo;

  gridParameters[0].children[1].innerHTML = `${investmentData.grid[gridCurrentInvestment].parametri.prezzo}M`;
  gridParameters[1].children[1].innerHTML = `${investmentData.grid[gridCurrentInvestment].parametri.energia}%`;
  gridParameters[2].children[1].innerHTML = `${investmentData.grid[gridCurrentInvestment].parametri.co2}ppm`;
  gridParameters[3].children[1].innerHTML = `${investmentData.grid[gridCurrentInvestment].parametri.consenso}%`;
}

function stampAnimation(correct, investimento) {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  if (correct) {
    score += 10;
    scoreText.innerHTML = score;
    feedbackStamp.innerHTML = "APPROVED";
  } else {
    feedbackStamp.innerHTML = "DENIED";
  }

  switch (investimento) {
    case "renewable":
      if (correct) {
        feedbackStamp.style.color = "#D5E79A";
        feedbackStamp.style.borderColor = "#D5E79A";
      } else {
        feedbackStamp.style.color = "#495D09";
        feedbackStamp.style.borderColor = "#495D09";
      }
      break;
    case "fossil":
      if (correct) {
        feedbackStamp.style.color = "#ECD2BB";
        feedbackStamp.style.borderColor = "#ECD2BB";
      } else {
        feedbackStamp.style.color = "#613209";
        feedbackStamp.style.borderColor = "#613209";
      }
      break;
    case "nuclear":
      if (correct) {
        feedbackStamp.style.color = "#B7E7EF";
        feedbackStamp.style.borderColor = "#B7E7EF";
      } else {
        feedbackStamp.style.color = "#0A4853";
        feedbackStamp.style.borderColor = "#0A4853";
      }
      break;
    case "approval":
      if (correct) {
        feedbackStamp.style.color = "#F3C8D3";
        feedbackStamp.style.borderColor = "#F3C8D3";
      } else {
        feedbackStamp.style.color = "#76112C";
        feedbackStamp.style.borderColor = "#76112C";
      }
      break;
    case "grid":
      if (correct) {
        feedbackStamp.style.color = "#EFC7F5";
        feedbackStamp.style.borderColor = "#EFC7F5";
      } else {
        feedbackStamp.style.color = "#651070";
        feedbackStamp.style.borderColor = "#651070";
      }
      break;
  }

  //   feedbackStamp.style.display = "block";
  feedbackStamp.classList.add("show");
}
function updateCurrentInvestment(undoneInvestments, currentInvestment) {
  if (undoneInvestments.undone.length <= 1) {
    undoneInvestments.undone = Array.from({ length: undoneInvestments.maxLenght }, (_, i) => i);
  }

  const index = undoneInvestments.undone.indexOf(currentInvestment);
  if (index > -1) {
    undoneInvestments.undone.splice(index, 1);
  }

  return undoneInvestments.undone[Math.floor(Math.random() * undoneInvestments.undone.length)];
}

function startTimer() {
  timerInterval = setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    // Format the time as mm:ss
    timeText.innerHTML = `${minutes.toString().padStart(2)}:${seconds.toString().padStart(2, "0")}`;

    if (time <= 0) {
      clearInterval(timerInterval);
      scoreScreen.style.display = "flex";
      finalScoreText.innerHTML = score;
    } else {
      time--;
    }
  }, 1000);
}
