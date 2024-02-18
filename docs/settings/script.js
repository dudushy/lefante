const TITLE = "lefante/settings";
console.log(`[${TITLE}] init`);

const settingsDefault = {
  "theme": "light",
  "pairs": 6,
  "lifes": 3,
}

let settings = settingsDefault;

const pairValue = document.querySelector(".pairs.value");
console.log(`[${TITLE}] pairValue`, pairValue);

const lifeValue = document.querySelector(".lifes.value");
console.log(`[${TITLE}] lifeValue`, lifeValue);

const themeButtons = document.querySelectorAll(".settings-item-options-option.theme");
console.log(`[${TITLE}] themeButtons`, themeButtons);

loadSettings();

function loadSettings() {
  console.log(`[${TITLE}#loadSettings] (BEFORE) settings`, settings);

  settings = JSON.parse(localStorage.getItem("settings")) || settingsDefault;

  console.log(`[${TITLE}#loadSettings] (AFTER) settings`, settings);

  pairValue.textContent = settings.pairs;
  lifeValue.textContent = settings.lifes;
  themeButtons.forEach(button => {
    if (button.classList.contains(settings.theme)) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    };
  });
}

function saveSettings() {
  console.log(`[${TITLE}#saveSettings] settings`, settings);

  localStorage.setItem("settings", JSON.stringify(settings));
}

function addPair() {
  console.log(`[${TITLE}#addPair] (BEFORE) settings.pairs`, settings.pairs);

  settings.pairs++;

  pairValue.textContent = settings.pairs;

  console.log(`[${TITLE}#addPair] (AFTER) settings.pairs`, settings.pairs);

  saveSettings();
}

function removePair() {
  console.log(`[${TITLE}#removePair] (BEFORE) settings.pairs`, settings.pairs);

  if (settings.pairs <= 1) return;

  settings.pairs--;

  pairValue.textContent = settings.pairs;

  console.log(`[${TITLE}#removePair] (AFTER) settings.pairs`, settings.pairs);

  saveSettings();
}

function addLife() {
  console.log(`[${TITLE}#addLife] (BEFORE) settings.lifes`, settings.lifes);

  settings.lifes++;

  lifeValue.textContent = settings.lifes;

  console.log(`[${TITLE}#addLife] (AFTER) settings.lifes`, settings.lifes);

  saveSettings();
}

function removeLife() {
  console.log(`[${TITLE}#removeLife] (BEFORE) settings.lifes`, settings.lifes);

  if (settings.lifes <= 1) return;

  settings.lifes--;

  lifeValue.textContent = settings.lifes;

  console.log(`[${TITLE}#removeLife] (AFTER) settings.lifes`, settings.lifes);

  saveSettings();
}

function changeTheme(theme) {
  console.log(`[${TITLE}#changeTheme] (BEFORE) theme`, theme);

  settings.theme = theme;

  themeButtons.forEach(button => {
    if (button.classList.contains(settings.theme)) {
      button.classList.add("selected");
    } else {
      button.classList.remove("selected");
    };
  });

  console.log(`[${TITLE}#changeTheme] (AFTER) theme`, theme);

  saveSettings();
}
