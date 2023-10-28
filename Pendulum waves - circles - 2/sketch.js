const width = 1350, height = 630
const ballCount = 30
const ballRadius = 10
// const containerWidth = 1320
const containerWidth = 600
const containerHeight = ballCount * (ballRadius * 2)
const distanceToTravel = containerWidth - ballRadius * 2

const xStart = (width - containerWidth) / 2;
const yStart = (height - containerHeight) / 2;
const xEnd = xStart + containerWidth;
const yEnd = yStart + containerHeight;

const timeSteps = 1000
const startingVelocity = 1/timeSteps
// const startingVelocity = 1

const maxCycles = ballCount + 1
const period = 30
const duration = 10000
const totalTime = period * maxCycles

const calculateSpeed = index => {
  const numberOfCycles = (index+1)*5
  return (distanceToTravel * numberOfCycles) / (duration);
};


let grayColour

let xOffset = 0

let colours = []
let lines = []
let circles = []

class Ball {
  constructor(y, speed) {
    this.x = ballRadius
    this.y = y
    this.speed = speed
    this.dir = 1
    this.bounceFlag = false
  }

  draw() {
    circle(this.x, this.y, ballRadius*2)
  }
  
  update() {
    this.x += this.speed * this.dir
  }

  clamp() {
    if ((this.x + ballRadius) >= containerWidth || (this.x - ballRadius) <= 0) {
      this.dir *= -1
      this.bounceFlag = !this.bounceFlag
    }
  }
}

class Line {
  constructor(y, colour) {
    this.y = y
    this.colour = colour
    this.lerpAmount = 1 // For the colour interpolation


    /*
    initial     final
    gray        own colour
    1           0
    */
  }

  draw() {
    const currentColour = lerpColor(color(this.colour), grayColour, this.lerpAmount)
    stroke(currentColour)
    line(0, this.y, containerWidth, this.y)
    if (this.lerpAmount <= 1) {
      this.lerpAmount += 0.01
    }
  }

  flash() {
    this.lerpAmount = 0
  }
}

function setup() {
  createCanvas(width, height);
  frameRate(60)
  colours = generateColours()
  grayColour = color(128)

  circles = colours.map((_, index) => {
    const yCoord = ballRadius + index * ballRadius * 2
    const ballSpeed = (calculateSpeed(index+1)) * startingVelocity
    return new Ball(y=yCoord, speed=ballSpeed)
  })

  lines = colours.map((colour, i) => {
    const lineY = (i+1)*ballRadius*2 - ballRadius
    return new Line(y=lineY, colour=colour)
  })
}

function draw() {
  background(20);

  // Draw the container
  drawContainer()

  // Drawing the circles
  translate(xStart, yStart)
  
  for (let i = 0; i < timeSteps; i++) {
    circles.forEach(ball => {
      ball.update()
      ball.clamp()
    })
  }
  // 
  lines.forEach((line, index) => {
    line.draw()
    if (circles[index].bounceFlag) {
      line.flash()
    }
  })
  
  stroke(255)
  circles.forEach(ball => {
    ball.draw()
  })
}

function drawContainer() {
  stroke(255, 255, 255)
  line(xStart, yStart, xEnd, yStart)
  line(xStart, yEnd, xEnd, yEnd)

  line(xStart, yStart, xStart, yEnd)
  line(xEnd, yStart, xEnd, yEnd)
}

function generateColours() {
  let N = ballCount; // number of colour steps
  let blue = [0, 0, 255];
  let green = [0, 255, 0];
  let red = [255, 0, 0];

  let colours = [];

  // Generate colours from blue to green
  for (let i = 0; i < N/2; i++) {
    let t = i / ((N/2) - 1);
    let r = blue[0] + t * (green[0] - blue[0]);
    let g = blue[1] + t * (green[1] - blue[1]);
    let b = blue[2] + t * (green[2] - blue[2]);
    colours.push([r, g, b]);
  }

  // Generate colours from green to red
  for (let i = 0; i < N/2; i++) {
    let t = i / ((N/2) - 1);
    let r = green[0] + t * (red[0] - green[0]);
    let g = green[1] + t * (red[1] - green[1]);
    let b = green[2] + t * (red[2] - green[2]);
    colours.push([r, g, b]);
  }
  return colours
}