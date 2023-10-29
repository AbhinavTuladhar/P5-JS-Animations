const width = 1350, height = 630
const barWidth = 10
const barCount = Math.floor(width / barWidth)

let values = []
let i = 0;
let j = 0;
let frequency = 32

function setup() {
  createCanvas(width, height);
  frameRate(30)

  for (let i = 0; i < barCount; i++) {
    randomValue = random(height)
    values.push(randomValue)
  }
}

function draw() {
  background(20)
  bubbleSort()
  drawGraph()
}

function bubbleSort() {
  for (k = 0; k < frequency; k++) {
    if (i < values.length) {
      if (values[j] > values[j + 1]) {
        swap(values, j, j + 1)
      }
      j++;

      if (j >= values.length - i - 1) {
        j = 0;
        i++;
      }
    } else {
      noLoop()
    }
  }
}

function drawGraph() {
  stroke(0)
  fill(255)
  values.forEach((value, index) => {
    rect(index * barWidth, height - value, barWidth, value)
  })
}

function swap(array, i, j) {
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}