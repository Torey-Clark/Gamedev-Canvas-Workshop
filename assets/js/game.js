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
}

const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()
}

const brickRowCount = 3
const brickColumnCount = 5
const brickWidth = 75
const brickHeight = 20
const brickPadding = 10
const brickOffsetTop = 30
const brickOffsetLeft = 30
const bricks = []
function prepareBricks() {
    for (let i = 0; i < brickColumnCount; i++) {
        bricks[i] = []
        for (let j = 0; j < brickRowCount; j++) {
            const brickX = i * (brickWidth + brickPadding) + brickOffsetLeft
            const brickY = j * (brickHeight + brickPadding) + brickOffsetTop
            bricks[i][j] = {
                x: brickX,
                y: brickY,
                status: 1,
            }
        }
    }
}


function drawBricks() {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            const brick = bricks[i][j]
            if (brick.status === 1) {
                ctx.beginPath()
                ctx.rect(brick.x, brick.y, brickWidth, brickHeight)
                ctx.fillStyle = '#0095dd'
                ctx.fill()
                ctx.closePath()
            }
            
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawBricks()
    drawBall()
    drawPaddle()
    collisionDetection()

    if (rightPressed) {
        // Move the paddle right
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth)
    } else if (leftPressed) {
        // Move the paddle left
        paddleX = Math.max(paddleX - 7, 0)
    }

    if (y + dy < ballRadius) {
        // Ball bounces off of the top wall
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
        // Ball hits the bottom of the canvas
        if (x > paddleX && x < paddleX + paddleWidth) {
            // Ball bounces off of the paddle
            dy = -dy
        } else {
            // Game Over
            alert('GAME OVER')
            document.location.reload()
            clearInterval(interval)
        }
    }
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        // Ball bounces off of the left and right walls
        dx = -dx
    }

    // Increment the ball position
    x += dx
    y += dy
}

function collisionDetection() {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let j = 0; j < brickRowCount; j++) {
            const brick = bricks[i][j]
            if (
                brick.status === 1 &&
                x > brick.x &&
                x < brick.x + brickWidth &&
                y > brick.y &&
                y < brick.y + brickHeight
            ) {
                dy = -dy
                brick.status = 0
            }
        }
    }
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
prepareBricks()
const interval = setInterval(draw, 10)