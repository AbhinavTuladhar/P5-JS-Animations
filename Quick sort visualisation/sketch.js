const width = 1350, height = 630
const barWidth = 1
const barCount = Math.floor(width / barWidth)

/**
 * Version 1 is for the single pointer version,
 * Version 2 is for the double pointer version with the middle element as the pivot element.
 */

/**
 * 0 denotes the pivot element
 * 1 denotes the elements that are being considered for sorting.
 */
const colourMappings = new Map([
  [0, '#E0777D'],
  [1, 'greenyellow']
])

let values = []
let states = []
let delay = 10

function setup() {
  createCanvas(width, height);
  frameRate(60)

  for (let i = 0; i < barCount; i++) {
    randomValue = random(height)
    values.push(randomValue)
    states.push(-1)
  }
  // quickSortV1(values, 0, values.length)
  quickSortV2(values, 0, values.length - 1)
}

function draw() {
  background(20)
  drawGraph()
}

function drawGraph() {
  noStroke()
  values.forEach((value, index) => {
    if (states[index] === 0) {
      fill(colourMappings.get(0))
    } else if (states[index] === 1) {
      fill(colourMappings.get(1))
    }
    else {
      fill(255)
    }
    rect(index * barWidth, height - value, barWidth, value)
  })
}

async function quickSortV1(arr, start, end) {
  if (start >= end) {
    return
  }

  const index = await partition(arr, start, end)
  states[index] = -1
  await Promise.all([
    quickSortV1(arr, start, index - 1),
    quickSortV1(arr, index + 1, end)
  ])
}

async function quickSortV2(arr, start, end) {
  if (start >= end) {
    return
  }

  const index = await partitionV2(arr, start, end)
  states[index] = -1
  await Promise.all([
    quickSortV2(arr, start, index - 1),
    quickSortV2(arr, index, end)
  ])
  // await quickSortV2(arr, start, index - 1)
  // await quickSortV2(arr, index, end)
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    // identify the elements being considered currently
    states[i] = 1;
  }

  let pivotIndex = start
  let pivotValue = arr[end]
  states[pivotIndex] = 0
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex)
      states[pivotIndex] = -1
      pivotIndex++;
      states[pivotIndex] = 0
    }
  }
  await swap(arr, pivotIndex, end)
  return pivotIndex
}

async function partitionV2(arr, start, end) {
  for (let i = start; i < end; i++) {
    // identify the elements being considered currently
    states[i] = 1;
  }

  let pivotIndex = Math.floor((start + end) / 2)
  let pivotValue = arr[pivotIndex]
  let leftPointer = start
  let rightPointer = end
  states[leftPointer] = 0
  states[rightPointer] = 0
  states[pivotIndex] = 0

  while (leftPointer <= rightPointer) {
    while (arr[leftPointer] < pivotValue) {
      states[leftPointer] = -1
      leftPointer++;
      states[leftPointer] = 0
    }

    while (arr[rightPointer] > pivotValue) {
      states[rightPointer] = -1
      rightPointer--;
      states[rightPointer] = 0
    }

    if (leftPointer <= rightPointer) {
      await swap(arr, leftPointer, rightPointer)
      states[leftPointer] = -1
      leftPointer++;
      states[leftPointer] = 0
      states[rightPointer] = -1
      rightPointer--;
      states[rightPointer] = 0
    }
    states[leftPointer] = -1
    states[rightPointer] = -1
  }
  return leftPointer
}

async function swap(array, i, j) {
  await sleep(delay)
  let temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}