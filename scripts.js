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
const heightBox = 32
const widthBox = 32

function criarBG() {
  context.fillStyle = "#00804D"
  context.fillRect(0, 0, 16*widthBox, 16*heightBox)
}

let snake = []
snake[0] = {
  x: 8*widthBox,
  y: 8*heightBox
}
function createSnake() {
  for(i=0; i<snake.length; i++) {
    context.fillStyle ="#00CC7A"
    context.fillRect(snake[i].x,snake[i].y, widthBox, heightBox)
  }
}

let food = {
  x: Math.floor(Math.random()*15+1) * widthBox,
  y: Math.floor(Math.random()*15+1) * heightBox
}
function drawFood() {
  context.fillStyle = "#B31D00"
  context.fillRect(food.x, food.y, widthBox, heightBox)
}

function createNewFood() {
  let x = Math.floor(Math.random()*15+1) * widthBox
  let y = Math.floor(Math.random()*15+1) * heightBox

  let colision = false

  console.log(`Comrpimento = ${snake.length}`)
  for (let i = 0; i < snake.length; i++) {
    if( (x === snake[i].x && y === snake[i].y) 
    || (x === food.x && y === food.y)) {
      console.log('duplicado')
      colision = true
    }
  }
  
  if (colision) {
    createNewFood()
  } else {
    food.x = x 
    food.y = y
  }

}

let direction = "right"
function startGame() {

  if (snake[0].x > 15*widthBox && direction == "right") {snake[0].x = 0}
  if (snake[0].x < 0 && direction == "left") {snake[0].x = 15*widthBox}
  if (snake[0].y > 15*heightBox && direction == "down") {snake[0].y = 0}
  if (snake[0].y < 0 && direction == "up") {snake[0].y = 15*heightBox}
  
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

  if (direction == 'right') {snakeX += widthBox}
  if (direction == 'left') {snakeX -= widthBox}
  if (direction == 'up') {snakeY -= heightBox}
  if (direction == 'down') {snakeY += heightBox}
  
  if (snakeX === food.x && snakeY === food.y) {
    createNewFood()

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
  food.x = Math.floor(Math.random()*15+1) * widthBox
  food.y = Math.floor(Math.random()*15+1) * heightBox


  if (snake.length > 1) {
    let n = snake.length
    for (let i = 1; i<n ;i++) {
      snake.pop()
    }
  }
  snake[0].x = 8*widthBox
  snake[0].y = 8*heightBox

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
  if (snake[0].x<=15*widthBox && snake[0].x>=0 && snake[0].y<=15*heightBox && snake[0].y>=0) {
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

// insert controls for mobile devices
function mobileOptions() {
  let mobile = (screen.width < 600) ? true : false

  if (mobile) {
    window.document.querySelector('.joystick').classList.add('mobile')
  } else {
    window.document.querySelector('.joystick').classList.remove('mobile')
  }

}


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

function changeDirection(way, el) {
  if (snake[0].x<=15*widthBox && snake[0].x>=0 && snake[0].y<=15*heightBox && snake[0].y>=0) {
    if(way == 'up' && direction != "down") { direction = "up"}
    if(way == 'left' && direction != "right") { direction = "left"}
    if(way == 'right' && direction != "left") { direction = "right"}
    if(way == 'down' && direction != "up") { direction = "down"}
  }
  /*
  this.element = el;
  this.element.addEventListener('touchstart', this, false);
  */
}

mobileOptions()