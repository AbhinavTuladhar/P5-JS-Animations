let PointA, PointB, PointC, PointD, PointE, PointF
let side
let XC, YC
let hexagonVertices = []
let x, y
let interpolValue = 2/3

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(80);
  frameRate(60)

  // Centre of the screen and hexagon side
  XC = width / 2
  YC = height / 2
  side = 350

  // The starting point
  x = random(width)
  y = random(height)

  // Calculate the points of the hexagon
  for (let i = 0; i < 6; i ++) {
    const angle = TWO_PI / 6 * i
    const sx = side * cos(angle)
    const sy = side * sin(angle)
    hexagonVertices.push(createVector(sx, sy))
  }

  [PointA, PointB, PointC, PointD, PointE, PointF] = hexagonVertices
}

function draw() {
  translate(XC, YC)

  // Draw the hexagon
  stroke(255)
  noFill()
  beginShape()
  hexagonVertices.forEach(point => {
    vertex(point.x, point.y)
  })
  endShape(CLOSE)

  // Start the chaos game
  for (let i = 0; i < 1000; i++) {
    point(x, y)

    let randomVertex = floor(random(6))
    if (randomVertex === 0) {
      stroke(255, 0, 0)
      x = lerp(x, PointA.x, interpolValue)
      y = lerp(y, PointA.y, interpolValue)
    } else if (randomVertex === 1) {
      stroke(0, 255, 0)
      x = lerp(x, PointB.x, interpolValue)
      y = lerp(y, PointB.y, interpolValue)
    } else if (randomVertex === 2) {
      stroke(0, 0, 255)
      x = lerp(x, PointC.x, interpolValue)
      y = lerp(y, PointC.y, interpolValue)
    } else if (randomVertex === 3) {
      stroke(255, 255, 0)
      x = lerp(x, PointD.x, interpolValue)
      y = lerp(y, PointD.y, interpolValue)
    } else if (randomVertex === 4) {
      stroke(255, 0, 255)
      x = lerp(x, PointE.x, interpolValue)
      y = lerp(y, PointE.y, interpolValue)
    } else if (randomVertex === 5) {
      stroke(0, 255, 255)
      x = lerp(x, PointF.x, interpolValue)
      y = lerp(y, PointF.y, interpolValue)
    }
  }
}
