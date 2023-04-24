let width = 1360;
let height = 600;
let XC = width / 2;
let YC = height / 2;
let largerRadius = YC - 20;
let smallerRadius = 16;
let angle = 0.1;
let lineCount = 24;
let lineLength = largerRadius + smallerRadius / 2
let x;
let y;
let counter = 0;
let speedFactor = 0.2

function setup() {
    createCanvas(width, height);
    frameRate(60);
}

function draw() {
    background(80);

    // drawing the larger circle
    translate(XC, YC);
    fill(50);
    stroke(255);
    circle(0, 0, (largerRadius + smallerRadius / 2) *2);

    for (let i = 0; i < lineCount; i++) {
        rotate((Math.PI / 1) / lineCount);
        let dx = (lineLength - smallerRadius / 2) * cos(counter * speedFactor * (i+1) + i * Math.PI / (lineCount))
        line(-lineLength, 0, lineLength, 0)

        fill(255);
        circle(dx, 0, smallerRadius)
    }
    counter += 0.02
}
