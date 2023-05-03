let audio = [new Audio('audio/image-1.mp3'), new Audio('audio/image-2.mp3'), new Audio('audio/image-3.mp3'), new Audio('audio/image-4.mp3'), new Audio('audio/image-5.mp3'), new Audio('audio/image-6.mp3')]


function createNewCard() {
	let cardElement = document.createElement('div');
	cardElement.classList.add("card");
	cardElement.innerHTML = "<div class='card-down'></div> <div class='card-up'></div>";
	return cardElement;
}
createNewCardTest();


function appendNewCard(parentElement) {
	let cardElement = createNewCard();
	parentElement.appendChild(cardElement);
	return cardElement;
}
appendNewCardTest();


function shuffleCardImageClasses() {
	let cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];
      
  // CDN: https://cdnjs.com/libraries/underscore.js/1.4.1
  // Shuffle: https://www.tutorialspoint.com/underscorejs/underscorejs_shuffle.htm 

  let shuffledCards = _.shuffle(cardClasses);
  return shuffledCards;
}
shuffleCardImageClassesTest()


function createCards(parentElement, shuffledImageClasses) {
  let cardObjects = [];
  
  for (let i = 0; i < 12; i++) {
    let newCard = appendNewCard(parentElement);
    newCard.classList.add(shuffledImageClasses[i]);
    cardObjects.push({
      "index" : i,
      "element" : newCard,
      "imageClass" : shuffledImageClasses[i],
    })
    }	
  // console.log(cardObjects);
  return cardObjects;
}
createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {
	if (cardObject1.imageClass === cardObject2.imageClass) {
    return true;
  } else {
    return false;
  }
}
doCardsMatchTest();


/* The 'counters' object below is used as a dictionary to store our counter names and their respective values. Do you remember using objects as dictionaries? If not, go back to that video lesson in HQ to review. This object is empty for now but we'll fill it up in the following function. */
let counters = {};


function incrementCounter(counterName, parentElement) {
	if (counters[counterName] === undefined){
    counters[counterName] = 0;
  }

	counters[counterName]++;
	parentElement.innerHTML = counters[counterName];

}
incrementCounterTest();

/* The 'onCardFlipped' function below will be called each time the user flips a card. The 'lastCardFlipped' variable is used to remember the first card flipped while we wait for the user to flip another card. We need to keep track of this value to determine if the two cards flipped match or not. 'lastCardFlipped' should be reset to 'null' each time a second card is flipped. */
let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
	incrementCounter("flips", document.getElementById("flip-count"));

	if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

	let doTheyMatch = doCardsMatch(lastCardFlipped, newlyFlippedCard);
  if (doTheyMatch === false) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }
	incrementCounter("matches", document.getElementById("match-count"));
  lastCardFlipped.element.classList.add("glow","border-glow");
  newlyFlippedCard.element.classList.add("glow", "border-glow");

  // make the sound that plays be the catchphrase for the corresponding character (except Lisa, she doesnt have one)
  indexNumber = newlyFlippedCard.imageClass.slice(-1);
  console.log(indexNumber);
  audio[indexNumber-1].play();

  // Commenting this required portion out to add in different sound functionality
	// if (counters["matches"] < 6) {
 //    matchAudio.play();
 //  } else if (counters["matches"] = 6) {
 //    winAudio.play();
 //  }

  

  lastCardFlipped = null;

}

function resetGame() {
  let cardContainer = document.getElementById("card-container");
  while (cardContainer.firstChild) {
  cardContainer.removeChild(cardContainer.firstChild);
  }
  document.getElementById("flip-count").innerHTML = 0;
  document.getElementById("match-count").innerHTML = 0;
  counters = {};
  lastCardFlipped = null;
  setUpGame();

}

/* ️Set up the game. Do not edit below this line! */
setUpGame();