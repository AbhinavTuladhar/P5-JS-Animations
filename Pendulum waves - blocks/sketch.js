let width = 1360;
let height = 650;
let containerWidth = 1250;
let containerHeight = 600;
let blockCount = 16;
let speedFactor = 0.8;
let timeSteps = 10**2;
let startingVel = 1 / timeSteps;

let blockWidth = containerWidth / 10;
let blockHeight = containerHeight / blockCount;
let xStart = (width - containerWidth) / 2;
let yStart = (height - containerHeight) / 2;
let xEnd = xStart + containerWidth;
let yEnd = yStart + containerHeight;

let blockList = [];

const getRandomColour = () => {
    let r = random(255);
    let g = random(255);
    let b = random(255);
    let col = color(r, g, b);
    return col;
}

class Block {
    constructor(xPos, yPos, colour, vel) {
        this.x = xPos;
        this.y = yPos;
        this.colour = colour;
        this.dir = 1;
        this.vel = vel * speedFactor * startingVel;
    }

    display() {
        fill(this.colour);
        rect(this.x, this.y, blockWidth, blockHeight);
    }

    clamp() {
        if (((this.x + blockWidth) >= xEnd) || (this.x < xStart)) {
            this.dir *= -1;
        }
        this.x = constrain(this.x, xStart, xEnd - blockWidth)
    }

    move() {
        this.x += this.vel  * this.dir;
    }
}

function setup() {
    createCanvas(width, height);
    frameRate(60);
    for (let i = 0; i < blockCount; i++) {
        let randomColour = getRandomColour()
        let block = new Block(xPos=0, yPos=i*blockHeight, colour=randomColour, vel=i+1);
        blockList.push(block);
    }
    console.log(blockList);
}

function draw() {
    background(60);
    push();

    translate(xStart, yStart);
    noFill();
    stroke(255);
    rect(0, 0, containerWidth, containerHeight)

    for (let i = 0; i < blockCount; i++) {
        // make the horizontal lines
        translate(0, blockHeight);
        line(0, 0, containerWidth, 0);
    }

    pop(); // restore the origin back to original origin

    translate(0, yStart);

    for (let j = 0; j < timeSteps; j++){
        blockList.forEach(block => {
            block.clamp();
            block.move();
        }) 
    }

    blockList.forEach(block => {
        block.display();
    }) 
}
