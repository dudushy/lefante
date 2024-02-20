const TITLE = "lefante/game";
console.log(`[${TITLE}] init`);

const settingsDefault = {
  "theme": "light",
  "pairs": 6,
  "lifes": 3,
}

let settings = settingsDefault;

const lifeDisplay = document.querySelector(".lifeDisplay #life-count");
console.log(`[${TITLE}] lifeDisplay`, lifeDisplay);

const gameContent = document.querySelector(".game-content");
console.log(`[${TITLE}] gameContent`, gameContent);

const cardSample = document.querySelector(".card.sample");
console.log(`[${TITLE}] cardSample`, cardSample);

let cardArray = [];
let flippedCardCount = 0;

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

  console.log(`[${TITLE}#generateCards] (BEFORE) cardArray`, cardArray);

  for (let i = 0; i < settings.pairs; i++) {
    const card = cardSample.cloneNode(true);
    card.classList.remove("sample");
    card.children[0].children[1].innerText = i;
    console.log(`[${TITLE}#generateCards/${i}] card`, card);

    cardArray.push(
      {
        element: card,
        flipped: false,
        pair: i
      },
      {
        element: card.cloneNode(true),
        flipped: false,
        pair: i
      }
    );
  }

  console.log(`[${TITLE}#generateCards] (AFTER) cardArray`, cardArray);

  shuffleCards();
  startGame();
}

function shuffleCards() {
  console.log(`[${TITLE}#shuffleCards] (BEFORE) cardArray`, cardArray);

  cardArray.sort(() => Math.random() - 0.5);

  console.log(`[${TITLE}#shuffleCards] (AFTER) cardArray`, cardArray);
}

function startGame() {
  console.log(`[${TITLE}#startGame]`);

  cardArray.forEach(card => {
    card.element.style.setProperty("--rotation-offset", `${Math.random() * 360}deg`);
    card.element.style.setProperty("--top-offset", `${Math.random() * 100}%`);
    card.element.style.setProperty("--left-offset", `${Math.random() * 100}%`);

    card.element.addEventListener("click", () => {
      console.log(`[${TITLE}#startGame] card`, card);

      if (flippedCardCount === 2 || card.flipped) {
        return;
      }

      card.flipped = true;
      card.element.classList.add("flipped");
      flippedCardCount++;

      if (flippedCardCount === 2) {
        setTimeout(() => {
          checkFlippedCards();
          flippedCardCount = 0;
        }, 500);
      }
    });

    gameContent.appendChild(card.element);
  });
}

function checkFlippedCards() {
  const flippedCards = cardArray.filter(card => card.flipped);
  console.log(`[${TITLE}#checkFlippedCards] (BEFORE) flippedCards`, flippedCards);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    console.log(`[${TITLE}#checkFlippedCards] card1`, card1);
    console.log(`[${TITLE}#checkFlippedCards] card2`, card2);

    if (card1.pair === card2.pair) {
      console.log(`[${TITLE}#checkFlippedCards] MATCH!`);
      flippedCards.forEach(card => {
        card.element.classList.add("matched");
      });
    } else {
      console.log(`[${TITLE}#checkFlippedCards] NO MATCH!`);

      const oldFlippedCards = flippedCards.slice();
      console.log(`[${TITLE}#checkFlippedCards] oldFlippedCards`, oldFlippedCards);

      setTimeout(() => {
        oldFlippedCards.forEach(card => {
          card.element.classList.remove("flipped");
          card.flipped = false;
        });
      }, 1000);
    }
  }

  console.log(`[${TITLE}#checkFlippedCards] (AFTER) flippedCards`, flippedCards);
}
