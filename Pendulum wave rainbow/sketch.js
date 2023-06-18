const width = 1360
const height = 650
const XC = width / 2
const YC = height / 2
const yBase = height - 25
const largerRadius = YC - 10
const baseRadius = 80
const arcGap = 25
const arcCount = 20
const ballRadius = 10
const baseSpeed = 5
const speedFactor = 1
const maxCycles = arcCount + 1
const period = 180            
const baseEllipseWidth = 80
const baseEllipseHeight = 120

let angle = 0

// For generation colours between red and blue, with green as the intermediate using linear interpolation.
const generateColours = () => {
  let N = arcCount; // number of colour steps
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

const calculateVelocity = (index) => {
  const distance = 2 * Math.PI
  const cycleCount = (maxCycles - index)
  return (distance * cycleCount) / (period)
}

class Ball {
  constructor(orbitRadiusX, orbitRadiusY, speed) {
    this.orbitRadiusX = orbitRadiusX
    this.orbitRadiusY = orbitRadiusY
    this.speed = speed
    this.dir = 1
    this.update()
  }

  draw() {
    circle(this.x, this.y, ballRadius*2)
  }

  update() {
    this.x = this.orbitRadiusX * Math.cos(angle * this.dir * speedFactor * this.speed)
    this.y = this.orbitRadiusY * Math.sin(angle * this.dir * speedFactor * this.speed)
    this.clamp()
  }

  clamp() {
    if (this.y >= 0) {
      this.dir *= -1
    }
  }
}

let balls = []
let colourList

function setup() {
  createCanvas(width, height);
  frameRate(60);

  colourList = generateColours()

  for (let i = 0; i < arcCount; i++) {
    const xOffset = baseEllipseWidth + (i * arcGap)
    const yOffset = baseEllipseHeight + (i * arcGap)
    const ballSpeed = calculateVelocity(i)

    const ball = new Ball(orbitRadiusX=xOffset, orbitRadiusY=yOffset, speed=ballSpeed)
    balls.push(ball)
  }
}

function draw() {
  background(0);
  push()

  // drawing the larger circle
  translate(XC, yBase);
  
  balls.forEach((ball, index) => {
    // Find the major and minor axes of the ellipse
    const xRadius = (baseEllipseWidth + (index * arcGap)) * 2
    const yRadius = (baseEllipseHeight + (index * arcGap)) * 2
    
    // Find the colour
    const colourValue = colourList[index]

    // Draw the ellipses
    noFill()
    stroke(colourValue)
    ellipse(0, 0, xRadius, yRadius)
    
    // Drawing the balls
    stroke(255)
    fill(colourValue)
    ball.update()
    ball.draw()
  })
  
  angle -= (2 * Math.PI / period)
  
  // Draw a rectangle to hide the lower part of the screen
  pop()
  fill(0)
  stroke(0)
  rect(0, yBase + ballRadius, width, height)
}
