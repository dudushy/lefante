const TITLE = "lefante";
console.log(`[${TITLE}] init`);

const settingsDefault = {
  "theme": "light",
  "pairs": 6,
  "lifes": 3,
}

let settings = settingsDefault;

loadSettings();

function loadSettings() {
  console.log(`[${TITLE}#loadSettings] (BEFORE) settings`, settings);

  settings = JSON.parse(localStorage.getItem("settings")) || settingsDefault;

  console.log(`[${TITLE}#loadSettings] (AFTER) settings`, settings);

  updateTheme(settings.theme);
}

function updateTheme(theme) {
  console.log(`[${TITLE}#updateTheme] theme`, theme);

  const body = document.querySelector("body");
  console.log(`[${TITLE}#updateTheme] body`, body);
  body.setAttribute("theme", theme);
}
