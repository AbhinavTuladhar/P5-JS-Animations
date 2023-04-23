let width = 1360;
let height = 600;
let centreX = width / 2;
let centreY = height / 2;
let baseRadius = 100;
let ballRadius = 10;
let ballGap = 20;
let ballCount = centreY / (ballRadius + ballGap) - 2;
const startingAngle = 0;
let angle = startingAngle;


let balls = [];
let pathRadii = [];

class Ball {
    constructor(pathradius, speedFactor) {
        this.radius = pathradius;
        this.speedFactor = speedFactor;
        this.startAngle = startingAngle - (Math.PI / 2) * (speedFactor - 1);
        this.update();
    }

    display(x, y) {
        this.update();
        fill(255);
        stroke(255);
        circle(this.x, this.y, ballRadius);
        line(this.x, this.y, x, y)
        line(this.x, this.y, 0, 0)
    }

    update() {
        // let trueAngle = this.startAngle + angle * this.speedFactor;
        let trueAngle = angle * this.speedFactor + (3/2) * PI;
        this.x = this.radius * cos(trueAngle);
        this.y = this.radius * sin(trueAngle);
    }
}

function setup() {
    createCanvas(width, height);
    frameRate(60);

    for (let i = 0; i < ballCount; i++) {
        let radiusValue = baseRadius + i*(ballRadius + ballGap);
        let ball = new Ball(radiusValue, i+1)
        pathRadii.push(radiusValue);
        balls.push(ball);
    }
}

function draw() {
    background(50);

    push();

    // draw the vertical line
    stroke(120);

    translate(centreX, centreY);
    circle(0, 0, 4);

    // find the coordinates of the pivot point
    // first find the middle value of the radii of concentric circles
    let middleRadius = Math.floor(pathRadii.length / 2);
    let pivotRadius = pathRadii[middleRadius];

    let pivotAngle = Math.PI / 4;
    let pivotPointX = pivotRadius * cos(pivotAngle)
    let pivotPointY = pivotRadius * sin(pivotAngle)

    noFill();
    stroke(255);
    
    circle(0, 0, pathRadii.slice(-1) * 2)
    balls.forEach(ball => {
        ball.display(pivotPointX, -pivotPointY);
    })
    
    // for drawing the pivot point
    translate(pivotPointX, -pivotPointY);
    
    fill(255);
    circle(0, 0, 4);
    pop();
    angle -= 0.005
}


