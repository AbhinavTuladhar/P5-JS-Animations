const width = 1360;
const height = 600;
const centreX = width / 2;
const centreY = height / 2;
const containerWidth = 1300;
const containerHeight = 500;
const blockSide = 25;
const yOffsetValue = 1
const timeSteps = 100
const animationSpeed = 0.5

const x1Container = (width - containerWidth) / 2
const y1Container = (height - containerHeight) / 2
const x2Container = x1Container + containerWidth
const y2Container = y1Container + containerHeight

const blockCount = Math.floor(containerWidth / blockSide)

const blockSpeed = animationSpeed / timeSteps

let blockList = [];

class Block {
    constructor(x, y, speedFactor, colour) {
        this.x  = x
        this.y = y
        this.dir = 1
        this.speedFactor = speedFactor
        this.colour = colour
    }

    clamp() {
        this.y = constrain(this.y, 0, containerHeight - blockSide)
        if ((this.y <= 0) || (this.y >= containerHeight - blockSide))
            this.dir *= -1
    }

    update() {
        this.move()
        this.clamp()
    }

    draw() {
        const { red, green, blue } = this.colour
        // stroke(red, green, blue)
        stroke(255)
        fill(red, green, blue)
        rect(this.x, this.y, blockSide, blockSide)
    }

    move() {
        this.y += blockSpeed * this.dir * this.speedFactor
    }
}

function setup() {
    createCanvas(width, height);
    frameRate(60);

    for (let i = 0; i < blockCount; i++) {
        let x = i * blockSide
        let y = i * yOffsetValue
        let speed = i + 1
        let colour = {
            red: 255 - 20*i,
            green: 20 + 20 * i,
            blue: 20*i
        }
        let block = new Block(x=x, y=y, speedFactor=speed, colour=colour)
        console.log(block)
        blockList.push(block)
    }
}

function draw() {
    background(0);
    push()
    noFill();
    stroke(255)

    translate(x1Container, y1Container)
    rect(0, 0, containerWidth, containerHeight)

    for (let i = 0; i < timeSteps; i++) {
        blockList.forEach(block => {
            block.update()
        })
    }

    blockList.forEach(block => {
        block.draw()
    })
}


