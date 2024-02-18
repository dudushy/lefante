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

loadSettings();

function loadSettings() {
  console.log(`[${TITLE}#loadSettings] (BEFORE) settings`, settings);

  settings = JSON.parse(localStorage.getItem("settings")) || settingsDefault;

  console.log(`[${TITLE}#loadSettings] (AFTER) settings`, settings);

  lifeDisplay.textContent = settings.lifes;
}
