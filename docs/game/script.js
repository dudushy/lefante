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
  //TODO generate cards
  console.log(`[${TITLE}#generateCards] settings`, settings);

  const cards = [];

  for (let i = 0; i < settings.pairs; i++) {
    cards.push(i, i);
  }

  console.log(`[${TITLE}#generateCards] cards`, cards);
}
