// DDM2008
// Activity 1a

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature in the space provided

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(233);

  // YOUR CODE HERE
  noStroke();
  fill(255, 192, 203);
  ellipse(100, 150, 100);
  ellipse(200, 200, 150, 100);
  rect(165, 230, 20, 40);
  rect(215, 230, 20, 40);
  ellipse(70, 115, 30);
  ellipse(130, 115, 30);
  stroke(0);
  strokeWeight(3);
  line(75, 135, 85, 135);
  line(115, 135, 125, 135);
  strokeWeight(2);
  ellipse(100, 165, 40, 20);
  fill(0);
  strokeWeight(5);
  point(93, 165);
  point(107, 165);
  stroke(0);
  strokeWeight(3);
  line(275, 200, 300, 175);

  // YOUR CODE HERE

  helperGrid(); // do not edit or remove this line
}
