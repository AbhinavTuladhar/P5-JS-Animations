const width = 1340, height = 630
const barWidth = 20
const barCount = Math.floor(width / barWidth)
const brickHeight = 50
const brickWidth = 150

let brick1, brick2;

class Brick {
  constructor(y, colour) {
    this.x = 0
    this.y = y
    this.colour = colour
    this.vel = 1
  }

  draw() {
    fill(this.colour)
    rect(this.x, this.y, brickWidth, brickHeight)
  }

  move() {
    this.x += this.vel
    this.clamp()
  }

  clamp() {
    if (this.x + brickWidth >= width) {
      this.x = width - brickWidth
      this.vel *= -1
    }

    if (this.x <= 0) {
      this.x = 0
      this.vel *= -1
    }
  }
}

function setup() {
  createCanvas(width, height);
  frameRate(30)

  brick1 = new Brick(100, 'white')
  brick2 = new Brick(450, 'black')
}

function draw() {
  background(50)
  if(mouseIsPressed){
    background(50);
  }
  brick1.draw()
  brick1.move()
  if (!mouseIsPressed) {
    drawBars()
  }
  brick2.draw()
  brick2.move()
}

function drawBars() {
  for(i = 0; i < barCount; i++) {
    fill(230)
    if(i % 2 === 0) {
      rect(i * barWidth, 0, barWidth, height)
    }
  }
}