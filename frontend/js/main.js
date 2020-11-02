const body = document.querySelector("body");
const background = document.getElementById("background");
const root = document.getElementById("root");

let level = 1;

function createButton({ value, action, className = "" }) {
  const button = document.createElement("button");

  button.setAttribute("class", `button default-card ${className}`);
  button.addEventListener(`click`, action);
  button.innerText = value;

  return button;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createTextBox({ value, className = "" }) {
  const title = document.createElement("div");
  title.setAttribute("class", `default-card ${className}`);
  title.innerHTML = value;
  return title;
}

function createGameContainer() {
  const container = document.createElement("div");
  container.setAttribute("id", "game-container");
  return container;
}

function createOptionsContainer() {
  const container = document.createElement("div");
  container.setAttribute("class", "options-container");

  return container;
}

function startScreen() {
  const menu = document.createElement("div");
  menu.setAttribute("id", "menu");

  const bgCssText =
    "background-image: url('assets/screens/home/bg.gif'); background-size: cover; background-position: center;";

  root.style.cssText = bgCssText;
  background.style.cssText = bgCssText;

  const gameTitle = document.createElement("img");

  const startButton = createButton({
    value: "Iniciar",
    action: () => renderScreen("menu"),
  });

  gameTitle.setAttribute("src", "assets/screens/home/game_name.png");

  startButton.style.cssText = "position: absolute; bottom: 5vh";

  gameTitle.style.cssText =
    "width: 12.5rem; position: absolute; top: 5vh; margin-bottom: 10rem;";

  root.append(gameTitle);
  root.append(menu);
  menu.append(startButton);
}

function selectLevelScreen() {
  const menu = document.getElementById("menu");

  menu.removeChild(menu.children[0]);

  menu.append(
    createButton({
      value: "Amiga Matemática",
      action: () => renderScreen("mathFriend"),
    })
  );

  menu.append(
    createButton({
      value: "O que é o que é?",
      action: () => renderScreen("menu"),
    })
  );

  menu.append(
    createButton({
      value: "O que é o que é?",
      action: () => renderScreen("menu"),
    })
  );

  menu.append(
    createButton({
      value: "O que é o que é?",
      action: () => renderScreen("menu"),
    })
  );

  menu.append(
    createButton({
      value: "O que é o que é?",
      action: () => renderScreen("menu"),
    })
  );
}

function levelOneScreen() {
  const baseNumber1 = Math.round(Math.random() * (10 * level));
  const baseNumber2 = Math.round(Math.random() * (10 * level));

  function getValuesFromOptions({ value1, value2 }) {
    let values = [];

    for (let i = 0; i < 3; i++) {
      values.push(Math.round(Math.random() * (10 * level)));
    }

    values.push(value1 + value2);

    return shuffleArray(values);
  }

  function checkAlternative(value) {
    if (value == baseNumber1 + baseNumber2) {
      level = level + 1;
      console.log(level);
      renderScreen("mathFriend");
      return alert("Parabéns você acertou! :)");
    }
    return alert("Que triste, você errou! :(");
  }

  root.innerHTML = "";
  root.style.backgroundSize = "contain";

  const title = createTextBox({ value: "Amiga matemática" });
  title.style.cssText = "margin-top:20px; align-self:center";

  const challengeBox = createTextBox({
    value: `${baseNumber1} + ${baseNumber2} = ?`,
  });

  challengeBox.style.cssText =
    "margin-top:40px; align-self:center; border-radius: 10px; padding: 20px 0px";

  const optionsContainer = createOptionsContainer();
  optionsContainer.style.cssText = "margin-top:20px; align-self:center;";

  const container = createGameContainer();

  const randomValues = getValuesFromOptions({
    value1: baseNumber1,
    value2: baseNumber2,
  });

  randomValues.forEach((value) => {
    optionsContainer.append(
      createButton({
        value,
        className: "option",
        action: (event) => checkAlternative(event.target.innerHTML),
      })
    );
  });

  container.append(title);
  container.append(challengeBox);
  container.append(optionsContainer);
  root.append(container);
}

function renderScreen(screenName) {
  root.style.backgroundImage = `url("assets/screens/${screenName}/bg.gif")`;
  background.style.backgroundImage = `url("assets/screens/${screenName}/bg.gif")`;

  switch (screenName) {
    case "home":
      return startScreen();

    case "menu":
      return selectLevelScreen();

    case "mathFriend":
      return levelOneScreen();
  }
}

renderScreen("home");
