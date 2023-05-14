const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let x = canvas.width / 2
let y = canvas.height / 2
let dx = 2
let dy = -2
let ballRadius = 10

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()

    x += dx
    y += dy
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    x += dx
    y += dy
}

setInterval(draw, 10)