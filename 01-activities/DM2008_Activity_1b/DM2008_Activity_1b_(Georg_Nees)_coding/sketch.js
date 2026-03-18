// DM2008
// Activity 1b (Georg Nees)

let x;
let y;
let w;

function setup() {
  createCanvas(800, 800);
  background(240);
}

function draw() {
  x = random(width);
  y = random(height);
  w = random(10, 80);
  a = random(800)
  b = random(100, 700)
  c = random(width)

  // background(240,40);

  stroke(0);
  strokeWeight(random(0.5, 2));
  noFill();
  rect(x, y, w, w);

  fill("#FDED5F")
  noStroke();
  rect(x, y, 20);
  fill("#78CEF5")
  rect(c, y, 20, 10)
  rectMode(CENTER)
  fill("#FF9800")
  rect(a, b, 10)
  fill("#6F58C0")
  noStroke()
  rect(x, b, 10, 20)
  stroke(random(100, 250))
  strokeWeight(2)
  line(x, y, a, b)
  
}

function keyPressed() {
  saveCanvas("activity1b-image", "jpg");
}
