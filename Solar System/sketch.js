const width = 1360, height = 650
const XC = width / 2, YC = height / 2
const sunRadius = 50
const earthRadius = 25, earthOrbitRadius = 220
const marsRadius = 15, marsOrbitRadius = 330
const earthSpeed = 1, marsSpeed = 1 / (1 + Math.sqrt(5))
// const earthSpeed = 1, marsSpeed = 1 / 1.9
const angleChange = -0.075

let angle = 0
let count = 0
let lines = []

class Planet {
  constructor({ radius, orbitRadius, speed, colour}) {
    this.radius = radius
    this.orbitRadius = orbitRadius
    this.speed = speed
    this.colour = colour
    this.update()
  }

  draw() {
    fill(this.colour)
    circle(this.x, this.y, this.radius * 2)
  }

  update() {
    this.x = XC + this.orbitRadius * Math.cos(angle * this.speed)
    this.y = YC + this.orbitRadius * Math.sin(angle * this.speed)
  }
}

class Animation {
  constructor() {
    const earthParams = {
      radius: earthRadius,
      orbitRadius: earthOrbitRadius,
      speed: earthSpeed,
      colour: [0, 0, 255]
    }
    this.earth = new Planet(earthParams)
  
    const marsParams = {
      radius: marsRadius,
      orbitRadius: marsOrbitRadius,
      speed: marsSpeed,
      colour: [255, 0, 0]
    }
    this.mars = new Planet(marsParams)

    this.linesBuffer = createGraphics(width, height)
  }

  draw() {
    stroke(0)
    this.earth.draw()
    this.mars.draw()
    this.update()
  }

  update() {
    this.earth.update()
    this.mars.update()
  }

  drawLines() {
    stroke(255)
    for (let i = 0; i < lines.length; i += 4) {
      line(lines[i], lines[i+1], lines[i+2], lines[i+3])
    }
  }
}

function setup() {
  createCanvas(width, height);
  frameRate(120)
  animation = new Animation()
}

function draw() {
  background(10)

  // Draw the 'sun'
  fill(255, 165, 0)
  circle(XC, YC, sunRadius * 2)

  // Draw the earth orbit
  noFill()
  stroke(255)
  circle(XC, YC, earthOrbitRadius * 2)

  // Draw the mars orbit
  circle(XC, YC, marsOrbitRadius * 2)

  stroke(10)
  animation.drawLines()
  animation.draw()

  if (count % 5 === 0) {
    lines.push(animation.earth.x, animation.earth.y, animation.mars.x, animation.mars.y)
  }

  angle += angleChange
  count += 1
}
