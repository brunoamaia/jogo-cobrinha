let scoreDisplay = document.querySelector('.score')
let sccoreLevel = 10
let score = 0

function updateScore() {
  let adjustScore = ''

  if (score < 10) {
    adjustScore = '00' + score
  } else if (score < 100) {
    adjustScore = '0' + score
  } else {
    adjustScore = score
  }

  scoreDisplay.innerHTML = `
    <span> ${adjustScore} pts</span>
  `
}


let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")
let box = 32

function criarBG() {
  context.fillStyle = "#00804D"
  context.fillRect(0, 0, 16*box, 16*box)
}

let snake = []
snake[0] = {
  x: 8*box,
  y: 8*box
}
function createSnake() {
  for(i=0; i<snake.length; i++) {
    context.fillStyle ="#00CC7A"
    context.fillRect(snake[i].x,snake[i].y, box, box)
  }
}

let food = {
  x: Math.floor(Math.random()*15+1) * box,
  y: Math.floor(Math.random()*15+1) * box
}
function drawFood() {
  context.fillStyle = "#B31D00"
  context.fillRect(food.x, food.y, box, box)
}

let direction = "right"
function startGame() {

  if (snake[0].x > 15*box && direction == "right") {snake[0].x = 0}
  if (snake[0].x < 0 && direction == "left") {snake[0].x = 15*box}
  if (snake[0].y > 15*box && direction == "down") {snake[0].y = 0}
  if (snake[0].y < 0 && direction == "up") {snake[0].y = 15*box}
  
  for (i=1; i<snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(game)
      alert('Game Over')
    }
  }

  criarBG()
  createSnake()
  drawFood()

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (direction == 'right') {snakeX += box}
  if (direction == 'left') {snakeX -= box}
  if (direction == 'up') {snakeY -= box}
  if (direction == 'down') {snakeY += box}
  
  if (snakeX === food.x && snakeY === food.y) {
    food.x = Math.floor(Math.random()*15+1) * box
    food.y = Math.floor(Math.random()*15+1) * box
    score += sccoreLevel
    updateScore()
  } else {
    snake.pop()
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }
  snake.unshift(newHead)
}

function resetGame() {
  clearInterval(game)

  score = 0
  updateScore()
  
  direction = "right"
  food.x = Math.floor(Math.random()*15+1) * box
  food.y = Math.floor(Math.random()*15+1) * box


  if (snake.length > 1) {
    let n = snake.length
    for (let i = 1; i<n ;i++) {
      snake.pop()
    }
  }
  snake[0].x = 8*box
  snake[0].y = 8*box

  game = setInterval(startGame, timelevel)
}

function handleChangeLevel(level) {
  clearInterval(game)

  window.document.querySelector(".btn1").className = 'btn1'
  window.document.querySelector(".btn2").className = 'btn2'
  window.document.querySelector(".btn3").className = 'btn3'

  if (level === 1) {
    window.document.querySelector(".btn1").className += ' activated'
    timelevel = 200
    sccoreLevel = 5
  } else if (level === 2) {
    window.document.querySelector(".btn2").className += ' activated'
    timelevel = 100
    sccoreLevel = 10
  } else {
    window.document.querySelector(".btn3").className += ' activated'
    timelevel = 60
    sccoreLevel = 15
  }

  resetGame()
}

document.addEventListener('keydown', updateDirection)
function updateDirection(event) {
  if (snake[0].x<=15*box && snake[0].x>=0 && snake[0].y<=15*box && snake[0].y>=0) {
    if(event.keyCode == 37 && direction != "right") { direction = "left"}
    if(event.keyCode == 38 && direction != "down") { direction = "up"}
    if(event.keyCode == 39 && direction != "left") { direction = "right"}
    if(event.keyCode == 40 && direction != "up") { direction = "down"}
  }
}

let timelevel = 100
let game = setInterval(startGame, timelevel)

// remove default functions of keys (navigation - vertical and horizontal)
document.addEventListener("keydown", function (e) {
  if([37,38,39,40].indexOf(e.keyCode) > -1){
    e.preventDefault();
  }
}, false);

let joystick = false
function insertHandleController(){
  joystick = !joystick
  console.log(joystick)

  if (joystick) {
    window.document.querySelector('.arrows-container').classList.add('display')
  } else {
    window.document.querySelector('.arrows-container').classList.remove('display')
  }

}

function changeDirection(way) {
  if (snake[0].x<=15*box && snake[0].x>=0 && snake[0].y<=15*box && snake[0].y>=0) {
    if(way == 'up' && direction != "down") { direction = "up"}
    if(way == 'left' && direction != "right") { direction = "left"}
    if(way == 'right' && direction != "left") { direction = "right"}
    if(way == 'down' && direction != "up") { direction = "down"}
  }
}