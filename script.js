const text = document.getElementById("text");
const choices = document.getElementById("choices");
const fade = document.getElementById("fade");

const scenes = {
  start: {
    text: "You wake up in a dark forest. The air is cold, and the trees whisper around you. You don’t remember how you got here...",
    bg: "forest1.png",
    options: [
      { text: "Look around", next: "look" },
      { text: "Walk forward", next: "path" }
    ]
  },

  look: {
    text: "You carefully look around. You see strange markings on the trees and hear water flowing somewhere.",
    bg: "forest2.png",
    options: [
      { text: "Follow the sound of water", next: "river" },
      { text: "Ignore it and move forward", next: "path" }
    ]
  },

  path: {
    text: "You walk deeper into the forest. The darkness grows thicker. Suddenly, you see a shadow move.",
    bg: "forest3.png",
    options: [
      { text: "Chase the shadow", next: "shadow" },
      { text: "Stay calm and keep walking", next: "house" }
    ]
  },

  shadow: {
    text: "You chase the shadow, but it disappears. You feel something watching you... your heart races.",
    bg: "dead1.png",
    options: [
      { text: "Run away", next: "dead" },
      { text: "Stand your ground", next: "dead" }
    ]
  },

  river: {
    text: "You reach a river. The water is moving fast. There's a broken bridge and a narrow path.",
    bg: "river1.png",
    options: [
      { text: "Try to cross the bridge", next: "bridge" },
      { text: "Follow the river", next: "house" }
    ]
  },

  bridge: {
    text: "You step on the bridge... it cracks. One wrong move and you're gone.",
    bg: "river2.png",
    options: [
      { text: "Go back", next: "river" },
      { text: "Keep going", next: "dead" }
    ]
  },

  house: {
    text: "You find an old house. A light flickers inside. It might be your only chance...",
    bg: "house1.png",
    options: [
      { text: "Knock on the door", next: "knock" },
      { text: "Break in", next: "breakin" }
    ]
  },

  knock: {
    text: "You knock. Silence. Then the door slowly opens by itself...",
    bg: "house2.png",
    options: [
      { text: "Enter carefully", next: "win" },
      { text: "Run away", next: "dead" }
    ]
  },

  breakin: {
    text: "You force the door open. Suddenly, something grabs you from the darkness.",
    bg: "dead2.png",
    options: [
      { text: "Restart", next: "start" }
    ]
  },

  dead: {
    text: "You were lost in the forest forever...",
    bg: "dead3.png",
    options: [
      { text: "Try Again", next: "start" }
    ]
  },

  win: {
    text: "You made it inside safely. The nightmare is over... for now.",
    bg: "win.png",
    options: [
      { text: "Play Again", next: "start" }
    ]
  }
};

// FADE FUNCTION
function fadeTransition(callback) {
  fade.style.opacity = 1;

  setTimeout(() => {
    callback();
    fade.style.opacity = 0;
  }, 500);
}

// SHOW SCENE
function showScene(sceneName) {
  const scene = scenes[sceneName];

  if (!scene) {
    text.innerText = "Scene not found 💀";
    return;
  }

  text.innerText = scene.text;
  document.body.style.backgroundImage = `url(${scene.bg})`;

  choices.innerHTML = "";

  scene.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option.text;

    btn.onclick = () => {
      fadeTransition(() => showScene(option.next));
    };

    choices.appendChild(btn);
  });
}

// START GAME
showScene("start");