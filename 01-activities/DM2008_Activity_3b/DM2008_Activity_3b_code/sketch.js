// DM2008 — Activity 3b
// (One Function Wonder, 20 min)

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(220);

  // TODO 1:
  // Define a function that draws something (a shape or group of shapes).
  // It should take at least one parameter (e.g., position, size, or color).

  // TODO 2:
  // Call your function multiple times with different parameter values.
  // myShape(100, 200, 50);
  // myShape(300, 200, 80);
myShape(width/2, height/2-50, 50, 50, "white")
myShape(width/4, 250, 30, 30, "white") 
myShape(300, 250, 30, 30, "white") 
// rainDrop(100, 100, 150, 50, 150, 30)
  
  // TODO 3:
  // (Challenge) Call your function inside a for loop
  // to create a repeating pattern or variation.
}

// Example starter function:
// function myShape(x, y, s) {
//   ellipse(x, y, s, s);
// }

function myShape(x, y, sz, sz, clr) {
  noStroke()
  ellipse(x, y, sz, sz, clr)
  ellipse(x, y + sz + (2/5*sz), sz*2, sz*2, clr)
  stroke(0)
  strokeWeight(5)
  point(x - 10, y);
  point(x + 10, y)
}

// function rainDrop(a, b, c, d, e, sz) {
//   noStroke();
//   triangle(a, b, c, d, e, b)
//   ellipse(c, d - sz, )
// }
