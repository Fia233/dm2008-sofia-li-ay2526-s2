let colorBtn, sizeSlider, shapeSelect, strokeBtn, bgBtn;
let shapeColor, bgColor;

function setup() {
  createCanvas(640, 400);
  noStroke();
  textFont("Helvetica, Arial, sans-serif");

  controlPanel = createDiv();
  controlPanel.position(50, 200);
  controlPanel.size(60, 35);
  controlPanel.style("padding", "50px");
  controlPanel.style("background", "#AFDDF7");
  
  controlPanel2 = createDiv();
  controlPanel2.position(450, 200);
  controlPanel2.size(60, 35);
  controlPanel2.style("padding", "50px");
  controlPanel2.style("background", "#8ED4FA50");
  
  // starting color
  shapeColor = color(random(255), random(255), random(255));
  bgColor = color(240);

  // Button: change color
  colorBtn = createButton("Change Color");
  colorBtn.position(16, 16);
  colorBtn.mousePressed(randomShapeColor);
  
  function randomShapeColor() {
    shapeColor = color(random(255), random(255), random(255));
  }

  // Slider: controls size
  sizeSlider = createSlider(20, 220, 100, 1);
  sizeSlider.position(15, 60);

  // Dropdown: choose shape
  shapeSelect = createSelect();
  shapeSelect.position(16, 100);
  shapeSelect.option("ellipse");
  shapeSelect.option("rect");
  shapeSelect.option("triangle");
  
  addShape = createButton("Add Shape");
  addShape.position(50, 50);
  addShape.class("big-btn");
  addShape.mousePressed(removeElements);
 
  sizeSlider.parent(controlPanel);
  shapeSelect.parent(controlPanel);
  colorBtn.parent(controlPanel);
  
  strokeBtn = createButton("Stroke");
  let hasStroke = false;
  strokeBtn.position(20, 20);
  strokeBtn.mousePressed(() => {
    hasStroke = !hasStroke;
    if (hasStroke) {
      stroke(0);
      strokeWeight(3);
    }
    else {
      noStroke();
    }
  });
  
  bgBtn = createButton("Change Background");
  bgBtn.position(20, 60);
  bgBtn.mousePressed(() => {
    bgColor = color(random(255));
  });
  
  strokeBtn.parent(controlPanel2);
  bgBtn.parent(controlPanel2);
}

function draw() {
  background(bgColor);

  push();
  translate(width / 2, height / 2);
  let s = sizeSlider.value();

  fill(shapeColor);

  // draw chosen shape
  let choice = shapeSelect.value();
  if (choice === "ellipse") {
    ellipse(0, 0, s, s);
  } else if (choice === "rect") {
    rectMode(CENTER);
    rect(0, 0, s, s);
  } else if (choice === "triangle") {
    triangle(-s * 0.6, s * 0.5, 0, -s * 0.6, s * 0.6, s * 0.5);
  }
  pop();
}