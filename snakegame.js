const gridSize = 20;
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");

let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameIntervel;
let gameSpeedDelay = 200;
let gameStarted = false;

function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}

function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

function drawFood() {
  const foodElement = createGameElement("div", "food");
  setPosition(foodElement, food);
  board.appendChild(foodElement);
}

function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "right":
      head.x++;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
  }
  snake.unshift(head);
  //snake.pop();

  if (head.x === food.x && head.y === food.y) {
    generateFood();
    clearInterval();
    gameIntervel = setInterval(() => {
      move();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

function startGame() {
  gameStarted = true;
  instructionText.style.display = "none";
  logo.style.display = "none";
}

//setInterval(() => {
//move();
//draw();
//}, 200);
