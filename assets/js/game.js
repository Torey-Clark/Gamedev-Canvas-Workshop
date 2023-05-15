const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let x = canvas.width / 2
let y = canvas.height / 2
let dx = 2
let dy = -2
let ballRadius = 10

function drawBall() {
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()

    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy
    }
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx
    }
}

const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false
function drawPaddle() {
    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth)
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0)
    }
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()
    x += dx
    y += dy
}

function keyDownHandler(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = true
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = true
    }
}

function keyUpHandler(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = false
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = false
    }
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
setInterval(draw, 10)