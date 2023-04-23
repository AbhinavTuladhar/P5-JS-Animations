let width = 1360;
let height = 600;
let XC = width / 2;
let YC = height / 2;
// let containerHeight = height * 0.95
// let containerWidth = containerHeight / 2
let containerHeight = 550;
let containerWidth = 550;
let boxSide = 20
let timeSteps = 1000;
let boxCount = 20;
let speedFactor = 0.75
let pauseFlag = 0;

let xStart = (width - containerWidth) / 2
let yStart = (height - containerHeight) / 2
let xEnd = xStart + containerWidth
let yEnd = yStart + containerHeight

class Box {
    constructor(x, y, xvel, yvel) {
        this.x = x
        this.y = y
        this.xvel = xvel / timeSteps
        this.yvel = yvel / timeSteps
        this.xdir = 1
        this.ydir = 1
    }
    
    draw() {
        // find the coordinates of the other sides of the box
        let x2 = this.x + boxSide
        let y2 = this.y + boxSide
        let centreX = (this.x + x2) / 2
        let centreY = (this.y + y2) / 2

        fill(255)
        line(0, containerHeight / 2, centreX, centreY)
        line(containerWidth, containerHeight / 2, centreX, centreY)
        rect(this.x, this.y, boxSide, boxSide)
    }
    
    move() {
        this.x += this.xvel * this.xdir * speedFactor
        this.y += this.yvel * this.ydir * speedFactor
        this.xCentre = this.x + (boxSide / 2)
        this.yCentre = this.y + (boxSide / 2)
    }

    clamp() {
        if (this.y <= 0)
            this. y = 0
        if (this.y + boxSide >= containerHeight)
            this.y = containerHeight - boxSide

        if (this.x <= 0)
            this.x = 0
        if (this.x + boxSide >= containerWidth)
            this.x = containerWidth - boxSide;

        if ((this.x <= 0) || (this.x + boxSide >= containerWidth))
            this.xdir *= -1
        if ((this.y <= 0) || (this.y + boxSide >= containerHeight))
            this.ydir *= -1
    }

    update() {
        this.move()
        this.clamp()
    }
}

let boxList = [];

function setup() {
    createCanvas(width, height);
    frameRate(60);

    for (let i = 0; i < boxCount; i++) {
        let xvel = i + 1
        let yvel = boxCount - xvel + 1
        let box = new Box(0, 0, xvel, yvel)
        boxList.push(box);
    }
}

function mouseClicked() {
    pauseFlag = !pauseFlag
    if (pauseFlag)
        noLoop();
    else 
        loop();
}

function draw() {
    background(80);
    push();

    translate(xStart, yStart)
    noFill();
    stroke(255);
    rect(0, 0, containerWidth, containerHeight)

    pop()

    let x1 = xStart;
    let y1 = yStart
    let x2 = xEnd - boxSide;
    let y2 = yEnd - boxSide
    // translate(xStart, yEnd - boxSide)
    translate(xStart, yStart)

    noFill()
    stroke(255)
    
    // let box = new Box(0, 0, 3, 5)
    // box.draw()

    for (let k = 0; k < timeSteps; k++) {
        boxList.forEach(box => {
            box.update();
        })
    }

    boxList.forEach(box => {
        box.draw();
    })
}
