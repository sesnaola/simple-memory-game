// var cards = document.querySelectorAll('.card');
var cardsValues = new Array();
var comparisonCounter = 0;
var comparisonArray = new Array(2);
var cardValues = new Array(2);


function cardsActionsAndValues() {
  flipCardsOnClick();
  setCardsValuesAndImages();
}

function flipCardsOnClick() {
  var cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', function () {
      card.classList.toggle('is-flipped');
      saveComparisonValues(card);

    });
  });
}

function setCardsValuesAndImages() {
  for (let i = 0; i < cardsValues.length; i++) {
    var newRandomNumber = randomNumber();
    if (findDuplicates(cardsValues, newRandomNumber)) {
      i--;
      continue;
    }
    cardsValues[i] = newRandomNumber;
    setCardsImage(i);
  }
}

function randomNumber() {
  var number = Math.floor(Math.random() * ((cardsValues.length / 2) - 1 + 1) + 1)
  return number;
}

function setCardsImage(i) {
  var source = "https://picsum.photos/1000?random=" + cardsValues[i];

  document.getElementById(i + 1).querySelector('.card__face--back img').src = source;
}

function findDuplicates(array, newValue) {
  counter = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] == newValue) {
      counter++;
      if (counter == 2) {
        return true;
      }
    }
  }
}

function saveComparisonValues(card) {
  comparisonArray[comparisonCounter] = card.id;
  cardValues[comparisonCounter] = card;
  comparisonCounter++;


  if (comparisonArray[1] != null) {
    compareCardValues(comparisonArray);
    comparisonArray = [];
    comparisonCounter = 0;

  }
}

function compareCardValues(array) {
  if (cardsValues[array[0] - 1] == cardsValues[array[1] - 1]) {
    console.log("They are the same");
  } else {
    console.log("They are wrong");
    delay(1000).then(() => cardValues[0].classList.toggle('is-flipped'));
    delay(1000).then(() => cardValues[1].classList.toggle('is-flipped'));
  }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function validateForm(numberOfCardsSelected) {
  for (let i = 0; i < numberOfCardsSelected.value; i++) {

    if (i == 0) {
      document.querySelector('body').innerHTML =
        `    
        Introdueix el nombre de cartes: <input type="number" id="cardNumber">
        <button onclick='validateForm(document.getElementById("cardNumber"))'>Submit</button> <br>


  <div class="scene scene--card card-0${i + 1}">
      <div class="card" id="${i + 1}">
          <div class="card__face"><img src="/img/interrogation.png" alt="picsum random image"
                  style="width:300px;height:300px;" draggable="false">
          </div>
          <div class="card__face card__face--back"><img src="https://picsum.photos/1000?random=${i + 1}"
                  alt="picsum random image" style="width:300px;height:300px;" draggable="false">
          </div>
      </div>
  </div>
    `
    } else {
      document.querySelector('body').innerHTML +=
        `    
  <div class="scene scene--card card-0${i + 1}">
      <div class="card" id="${i + 1}">
          <div class="card__face"><img src="/img/interrogation.png" alt="picsum random image"
                  style="width:300px;height:300px;" draggable="false">
          </div>
          <div class="card__face card__face--back"><img src="https://picsum.photos/1000?random=${i + 1}"
                  alt="picsum random image" style="width:300px;height:300px;" draggable="false">
          </div>
      </div>
  </div>
    `
    }
  }
  cardsValues.length = numberOfCardsSelected.value;

  cardsActionsAndValues()
}
