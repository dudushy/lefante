const TITLE = "lefante/game";
console.log(`[${TITLE}] init`);

const settingsDefault = {
  "theme": "light",
  "pairs": 6,
  "lifes": 3,
}

var settings = settingsDefault;

const lifeDisplay = document.querySelector(".lifeDisplay #life-count");
console.log(`[${TITLE}] lifeDisplay`, lifeDisplay);

const gameContent = document.querySelector(".game-content");
console.log(`[${TITLE}] gameContent`, gameContent);

const cardBoxSample = document.querySelector(".card-box.sample");
console.log(`[${TITLE}] cardBoxSample`, cardBoxSample);

var cardBoxArray = [];
var flippedCardCount = 0;

const cardStyleConfig = {
  "maxAngle": 20,
  "minAngle": -20,
  "maxOffsetTop": 20,
  "maxOffsetLeft": 20,
}

loadSettings();
generateCards();

function loadSettings() {
  console.log(`[${TITLE}#loadSettings] (BEFORE) settings`, settings);

  settings = JSON.parse(localStorage.getItem("settings")) || settingsDefault;

  console.log(`[${TITLE}#loadSettings] (AFTER) settings`, settings);

  lifeDisplay.textContent = settings.lifes;

  updateTheme(settings.theme);
}

function updateTheme(theme) {
  console.log(`[${TITLE}#updateTheme] theme`, theme);

  const body = document.querySelector("body");
  console.log(`[${TITLE}#updateTheme] body`, body);
  body.setAttribute("theme", theme);
}

function generateCards() {
  console.log(`[${TITLE}#generateCards] settings`, settings);

  console.log(`[${TITLE}#generateCards] (BEFORE) cardBoxArray`, cardBoxArray);

  for (let i = 0; i < settings.pairs; i++) {
    const cardBox = cardBoxSample.cloneNode(true);
    cardBox.classList.remove("sample");
    cardBox.querySelector(".card-back").innerText = i;
    console.log(`[${TITLE}#generateCards/${i}] cardBox`, cardBox);

    cardBoxArray.push(
      {
        element: cardBox,
        flipped: false,
        pair: i
      },
      {
        element: cardBox.cloneNode(true),
        flipped: false,
        pair: i
      }
    );

    console.log(`[${TITLE}#generateCards] (MIDDLE) cardBoxArray`, cardBoxArray);
  }

  console.log(`[${TITLE}#generateCards] (AFTER) cardBoxArray`, cardBoxArray);

  shuffleCards();
  startGame();
}

function shuffleCards() {
  console.log(`[${TITLE}#shuffleCards] (BEFORE) cardBoxArray`, cardBoxArray);

  cardBoxArray.sort(() => Math.random() - 0.5);

  console.log(`[${TITLE}#shuffleCards] (AFTER) cardBoxArray`, cardBoxArray);
}

function startGame() {
  console.log(`[${TITLE}#startGame]`);

  cardBoxArray.forEach(cardItem => {
    const rotationOffset = Math.random() * (cardStyleConfig.maxAngle - cardStyleConfig.minAngle) + cardStyleConfig.minAngle;
    console.log(`[${TITLE}#startGame] rotationOffset`, rotationOffset);

    const topOffset = Math.random() * cardStyleConfig.maxOffsetTop;
    console.log(`[${TITLE}#startGame] topOffset`, topOffset);

    const leftOffset = Math.random() * cardStyleConfig.maxOffsetLeft;
    console.log(`[${TITLE}#startGame] leftOffset`, leftOffset);

    const card = cardItem.element.querySelector(".card");
    console.log(`[${TITLE}#startGame] card`, card);

    card.style.setProperty("--rotation-offset", `${rotationOffset}deg`);
    card.style.setProperty("--top-offset", `${topOffset}%`);
    card.style.setProperty("--left-offset", `${leftOffset}%`);

    card.addEventListener("click", () => selectCard(cardItem));

    gameContent.appendChild(cardItem.element);
  });
}

function selectCard(cardItem) {
  console.log(`[${TITLE}#selectCard] cardItem`, cardItem);

  if (flippedCardCount === 2 || cardItem.flipped) {
    return;
  }

  cardItem.flipped = true;
  cardItem.element.classList.add("flipped");
  flippedCardCount++;

  if (flippedCardCount === 2) {
    setTimeout(() => {
      checkFlippedCards();
      flippedCardCount = 0;
    }, 500);
  }
}

function checkFlippedCards() {
  const flippedCards = cardBoxArray.filter(cardItem => cardItem.flipped);
  console.log(`[${TITLE}#checkFlippedCards] (BEFORE) flippedCards`, flippedCards);

  if (flippedCards.length === 2) {
    const [cardItem1, cardItem2] = flippedCards;
    console.log(`[${TITLE}#checkFlippedCards] cardItem1`, cardItem1);
    console.log(`[${TITLE}#checkFlippedCards] cardItem2`, cardItem2);

    if (cardItem1.pair === cardItem2.pair) {
      console.log(`[${TITLE}#checkFlippedCards] MATCH!`);
      flippedCards.forEach(cardItem => {
        cardItem.element.classList.add("matched");
      });
    } else {
      console.log(`[${TITLE}#checkFlippedCards] NO MATCH!`);

      const oldFlippedCards = flippedCards.slice();
      console.log(`[${TITLE}#checkFlippedCards] oldFlippedCards`, oldFlippedCards);

      setTimeout(() => {
        oldFlippedCards.forEach(cardItem => {
          cardItem.element.classList.remove("flipped");
          cardItem.flipped = false;
        });
      }, 1000);
    }
  }

  console.log(`[${TITLE}#checkFlippedCards] (AFTER) flippedCards`, flippedCards);
}
