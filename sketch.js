// //---------p5js---------------//
// style 1
// // GLOBAL VARIABLES
// let noiseMax=2
// let zoff = 0 
// var xoff1=0
// var xoff2=10000


// function setup() {
//   let c = createCanvas(880, 880);
//   c.parent("container")
// }


// // this is basically the regular p5.js draw() function
// //add " async " //
// function draw() {
//   background(255);

//     push();
//   translate(width/2, height/2)
//   stroke("red")
//   strokeWeight(4)
//   noFill()
//   beginShape()
//   for (let a=0;a < TWO_PI; a+=0.01){
//     let xoff = map(cos(a), -1,1,0,noiseMax)
//     let yoff = map(sin(a), -1,1,0,noiseMax)
//     let r = map(noise(xoff,yoff,zoff),0,1,width/2,width/2.5)
//     let x = r*cos(a)
//     let y = r*sin(a)
//     vertex(x,y)
//   }
//   endShape(CLOSE)
//   zoff+= 0.01
//    pop();

//    push();
//   var x= map(noise(xoff1), 0, 1,0, width);
//   var y= map(noise(xoff2), 0, 1, 0, height);

//   xoff1 +=0.005
//   xoff2 +=0.005
//   fill("red")
//   strokeWeight(3)
//   stroke("#F8968F")
// textSize(20);
// text('ARTIST', x, y);

//   pop();
//   if (mouseIsPressed === true) {
//    noiseMax =10
//   } else {
//     noiseMax=2
//   }
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// style 2
let noiseMax = 2
let phase = 0
let zoff = 0
var xoff1 = 0
var xoff2 = 10000

let chasingPoint;
let easing = 0.05;

let x = 0;
let y = 0;
let radius = 0;
let noiseScale = 0.02;
let t = 0;
let lastClearTime = 0;
let circleScale = 2; // Larger value makes the circle smaller
function setup() {
  let c = createCanvas(600, 600);
  c.parent("motioncircle")
  chasingPoint = createVector(0, 0);
}

function draw() {
  // if (millis() - lastClearTime >= 180000) {
  //   background(255); // Clear the canvas
  //   lastClearTime = millis(); // Update the last clear time
  // }
  background(255);
  push();
  translate(width / 2, height / 2)
  stroke(250, 0, 0, 100)
  strokeWeight(5)
  noFill()
  beginShape()
  for (let a = 0; a < TWO_PI; a += 0.01) {
    let xoff = map(cos(a), -1, 1, 0, noiseMax)
    let yoff = map(sin(a), -1, 1, 0, noiseMax)
    let r = map(noise(xoff, yoff, zoff), 0, 1, width / circleScale, width / (circleScale + 0.5));
    let x = r * cos(a)
    let y = r * sin(a)
    vertex(x, y)


    let targetPoint = createVector(x, y)
    let angle = atan2(targetPoint.y - chasingPoint.y, targetPoint.x - chasingPoint.x)
    chasingPoint = p5.Vector.lerp(chasingPoint, targetPoint, easing)

    push();
    translate(chasingPoint.x, chasingPoint.y);
    rotate(angle)

    point(0, 0);
    // vertex(0, 0);
    pop();
  }
  endShape(CLOSE)
  zoff += 0.01
  pop();

  if (mouseIsPressed === true) {
    noiseMax = 15
  } else {
    noiseMax = 3
  }

// if (mouseIsPressed === true) {
//   background(255);
// }

// let noiseVal = noise(t);
// radius = map(noiseVal, 0, 1, 5, 880);
// x = width/2 + map(noise(t+10), 0, 1, -50, 50);
// y = height/2 + map(noise(t+20), 0, 1, -50, 50);

// // Draw the circle
// noFill();
// stroke(200,0,0,5);
// strokeWeight(2);
// ellipse(x, y, radius, radius);

// // Increment the time variable
// t += noiseScale;
}
