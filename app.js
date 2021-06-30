const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector('#time')
const board = document.querySelector("#board")

let time = 0
let score = 0

startBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  screens[0].classList.add("up");
});


timeList.addEventListener('click', ev => {
  if (ev.target.classList.contains('time-btn')) {
    
    time = parseInt(ev.target.getAttribute('data-time'))
    screens[1].classList.add("up");
    startGame()
  }
})

board.addEventListener('click', (ev) => {
  if (ev.target.classList.contains('circle')) {
    score++
    ev.target.remove()
    createRandomCircle()
  }
})

// startGame()

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
  
}

function rand() {
  return Math.floor(Math.random() * 256);
}

function setTime(velue) {
  timeEl.innerHTML = `00:${velue}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Total mount: ${score} </h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  

  circle.classList.add("circle")
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  const color = "rgb(" + rand() + "," + rand() + "," + rand() + ")";
  circle.style.backgroundColor = color;

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) +min)
}