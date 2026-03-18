// DM2008 — Activity 2b
// (Pattern Making, 40 min)
const size = 15;
const space = 30;

function setup() {
  createCanvas(400, 400);
  background(240);
 
}

function draw() {
  // background(200, 50);
   for (let i = 0; i < width; i += size) {
    // Alternate colors using % (modulo)
    if (i % space == 0) {
      fill(0); // black
      if (keyIsPressed) {
    switch (key) {
      case "1":
        fill("#8EC74C");
        break;
      case "2":
        fill("#53DAFD");
        break;
      case "3":
        fill("#816AFF");
        break;
      default:
        fill(random(255));
        }
      } 
      ellipse(i, height / 2, size);
    }
    else {
      background(240, 5)
      noFill(); 
      triangle(i+1, i+1, mouseX, mouseY, i + 10, i+1);
    }
  }
}

// TODO: add one interaction (mouse or key) to change the rule
// Example: if (mouseIsPressed) { fill(255, 0, 0); }

/* making a grid
let col = 5
let row = 5

function setup() {
  creativeCanvas(400, 400);
}

function draw() {
background(220); 

  for(let x = 0; x < col; x++) {
    for(let y = 0; y < row; y++) {
      let w = width / col
      let h = height / row
      fill(random(255))
      rect(x * w, y * h, w, h)
    }
  }
} */