var cards = document.querySelectorAll('.card');
var cardsValues = new Array(12);
var firstClickId;
var secondClickId;
var comparisonCounter = 0;
var comparisonArray = new Array(2);
var cardValues = new Array(2);

cards.forEach((card) => {
  card.addEventListener('click', function () {
    card.classList.toggle('is-flipped');
    saveComparisonValues(card);

  });
});

function setCardsValues() {
  for (let i = 0; i < cardsValues.length; i++) {
    var newRandomNumber = randomNumber();
    if (findDuplicates(cardsValues, newRandomNumber)) {
      i--;
      continue;
    }
    cardsValues[i] = newRandomNumber;
    var source = "https://picsum.photos/1000?random=" + cardsValues[i];
    document.getElementById(i + 1).querySelector('.card__face--back img').src = source;
  }

}

function randomNumber() {
  var number = Math.floor(Math.random() * (6 - 1 + 1) + 1)
  return number;
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

  console.log("array: " + comparisonArray);

  if (comparisonArray[1] != null) {
    console.log("Ready to compare!");
    compareCardValues(comparisonArray);
    comparisonArray = [];
    comparisonCounter = 0;

  }
}

function compareCardValues(array) {
  console.log("first value: " + cardsValues[array[0] - 1])
  console.log("second value: " + cardsValues[array[1] - 1])
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

setCardsValues();