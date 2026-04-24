let excitedBtn, boredBtn, anxiousBtn, irritatedBtn;
let backBtn, newBackBtn;
let buttonContainer;
let currentEmotion = [];
let extraShapes = [];
let titleSize = 48;
let targetTitleSize = 48; // help from AI
let currentShape = "ellipse";
const NUM_START = 30;
let x = 0; 
let size = 50; 
let boredBg = 200;
let nextShape = 'ellipse';

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  
  textAlign(CENTER, CENTER);
  textSize(24);
  textFont("Avenir");
  
  buttonContainer = createDiv();
  
  // buttons
  excitedBtn = createButton("EXCITED");
  excitedBtn.position(width / 2 - 200, height/2 + 100);
  excitedBtn.size(150, 50);
  excitedBtn.class("emotion-btn");
  excitedBtn.mousePressed(() => {
    currentEmotion = "excited";
    buttonContainer.class("hidden");
    extraShapes = [];
    for (let i = 0; i < NUM_START; i++) {
      let w = random(width);
      let h = random(height);
      let sz = random(30, 70);
      let speedX = random(0, 5);
      let speedY = random(0, 5);
      extraShapes.push(new Agent(w, h, sz, speedX, speedY));
    }
  });
  
  boredBtn = createButton("bored");
  boredBtn.position(width / 2 + 65, height/2 + 100);
  boredBtn.size(150, 50);
  boredBtn.class("emotion-btn");
  boredBtn.mousePressed(() => {
    currentEmotion = "bored";
    buttonContainer.class("hidden");
    extraShapes = [];
  });
  
  anxiousBtn = createButton("AnXiouS");
  anxiousBtn.position(width / 2 - 200, height/2);
  anxiousBtn.size(150, 50);
  anxiousBtn.class("emotion-btn");
  anxiousBtn.mousePressed(() => {
    currentEmotion = "anxious";
    buttonContainer.class("hidden");
    extraShapes = [];
  });

  irritatedBtn = createButton("irritaTED");
  irritatedBtn.position(width / 2 + 65, height/2);
  irritatedBtn.size(150, 50);
  irritatedBtn.class("emotion-btn");
  irritatedBtn.mousePressed(() => {
    currentEmotion = "irritated";
    buttonContainer.class("hidden");
    extraShapes = [];
   });

  anxiousBtn.parent(buttonContainer);
  excitedBtn.parent(buttonContainer);
  boredBtn.parent(buttonContainer);
  irritatedBtn.parent(buttonContainer);

  backBtn = createButton("X");
  backBtn.position(20, 20);
  backBtn.size(30, 30);
  backBtn.style("font-size", "20px");
  backBtn.style("font-family", "Avenir");
  backBtn.class("back-btn");
  backBtn.mousePressed(() => {
    if (currentEmotion === "irritated") {
      let newX = random(0, width - backBtn.width);
      let newY = random(0, height - backBtn.height);
      backBtn.position(newX, newY);
      targetTitleSize = titleSize + 15;
    } 
    else {
      buttonContainer.class("shown");
      currentEmotion = [];
      extraShapes = [];
      titleSize = 48;
      targetTitleSize = 48;
    }
  });

  newBackBtn = createButton("X");
  newBackBtn.position(20, height - 30);
  newBackBtn.size(20, 20);
  newBackBtn.style("font-size", "8px");
  newBackBtn.style("font-family", "Avenir");
  newBackBtn.hide();
  newBackBtn.mousePressed(() => {
    if (currentEmotion === "irritated") {
      buttonContainer.class("shown");
      currentEmotion = [];
      extraShapes = [];
      titleSize = 48;
      targetTitleSize = 48;
      backBtn.position(20, height - 30);
      newBackBtn.hide();
  }
});

}

function draw() { 
 
  title = true;

  // Smoothly animate title size towards target -- help from AI
  titleSize = lerp(titleSize, targetTitleSize, 0.2);

  // Update button positions when window resizes
  if (windowWidth != width || windowHeight != height) {
    excitedBtn.position(width / 2 - 200, height - 80);
    boredBtn.position(width / 2 + 20, height - 80);
    anxiousBtn.position(width / 2 - 200, height - 30);
    irritatedBtn.position(width / 2 + 20, height - 30);
  }
  
  // Effects
  if (currentEmotion === "excited") {
    let mouseXPos = mouseX;
    let mouseYPos = mouseY;

    if (mouseXPos < width / 2 && mouseYPos > height / 2) {
      background(255);
  } 
    else if (mouseXPos > width / 2 && mouseYPos < height / 2) {
      background(0);
  } 
    else {
      background(255, 200, 50);
  }
  
  title = false;
   
  for (let i = 0; i < extraShapes.length; i++) {
    extraShapes[i].update();
    extraShapes[i].shrink();
  }
  for (let i = 0; i < extraShapes.length; i++) {
    extraShapes[i].checkCollision(extraShapes);
  }
  for (let i = 0; i < extraShapes.length; i++) {
    extraShapes[i].show();
  }
  for (let i = extraShapes.length - 1; i >= 0; i--) {
    if (extraShapes[i].sz <= 2) { 
      extraShapes.splice(i, 1);   
    }
  }
  
  // Display instructions
  fill(50, 50);
  noStroke();
  rectMode(CENTER);
  rect(width/2, 50, 300, 60, 5);
  
  fill(90);
  textSize(14);
  textAlign(CENTER, TOP);
  text("Press 1: Circle | 2: Square | 3: Triangle", width/2, 30);
  text("Press C to clear shapes", width/2, 50);
}
  else if (currentEmotion === "bored") {
    background(boredBg);
    title = false;
    stroke(150); 
    strokeWeight(1);
    fill(255);
    ellipse(x, height / 2, size);
    x += 1;
    if (x > width + size/2) {  
      x = -size/2;             
    }
    stroke(0);
    strokeWeight(2);
    line(0, height / 2 + size / 2, windowWidth, height / 2 + size / 2);

    fill(90);
    strokeWeight(0);
    textFont("Avenir");
    textSize(14);
    textAlign(CENTER, TOP);
    text("Press SPACE", width/2, 50);
}
  else if (currentEmotion === "anxious") {
  background(20, 10, 15, 30);

  for (let i = 0; i < 15; i++) {
    let rectX, rectY; 
    let w = random(2, 20);
    let h = random(10, height/2);
    let attempts = 0;
    let placed = false;
    while (attempts < 20 && !placed) { // help from AI
      rectX = random(width);
      rectY = random(height);
      if (dist(rectX, rectY, mouseX, mouseY) > 200) {
        placed = true;
      }
      attempts++;
    }
    let colorType = random(1);
    let rectColor;
    
    if (colorType < 0.33) {
      rectColor = color(random(180, 255), random(0, 80), random(0, 50), 200);
    } else if (colorType < 0.66) {
      rectColor = color(random(200, 255), random(80, 180), random(0, 60), 200);
    } else {
      rectColor = color(random(200, 255), random(180, 255), random(0, 80), 200);
    }
    
    fill(rectColor);
    noStroke();
    rect(rectX, rectY, w, h);
  }
  stroke(random(100, 250));
  strokeWeight(random(1, 3));
  let lineX1 = random(width);
  let lineY1 = random(height);
  let lineX2 = random(width);
  let lineY2 = random(height);
  line(lineX1, lineY1, lineX2, lineY2);
  
  title = false;
}
  else if (currentEmotion === "irritated") {
    background(30);
    title = true;
    newBackBtn.show();
  }
  else { 
    background(30);
    title = true;
  } 
  
  // Title
  if (title === true && currentEmotion !== "irritated") {
    fill(255, 255, 255, 230);
    noStroke();
    textSize(48);
    textFont("Avenir");
    textStyle(NORMAL);
    text("How do you feel?", width / 2, 200);
  } 
  else if (currentEmotion === "irritated") {
    fill(255, 255, 255, 230);
    noStroke();
    textSize(titleSize);
    textFont("Avenir");
    textStyle(NORMAL);
    text("How do you feel?", width / 2, 200);
  }
}

function keyPressed() {
  if (currentEmotion === "excited") {
    if (key === '1') {
      nextShape = 'ellipse';
    } else if (key === '2') {
      nextShape = 'rect';
    } else if (key === '3') {
      nextShape = 'triangle';
    }
  }
    if (currentEmotion === "excited" && (key === 'C' || key === 'c')) {
      extraShapes = [];
      nextShape = 'ellipse';
  }
  if (currentEmotion === "bored" && (key === ' ')) {
    boredBg = random(10, 250);
  }
}
function mousePressed() {
  if (currentEmotion === "excited") {
    let sz = random(30, 70);
    let speedX = random(0, 5);
    let speedY = random(0, 5);
    let newShape = new Agent(mouseX, mouseY, sz, speedX, speedY);
    newShape.shape = nextShape; 
    extraShapes.push(newShape);
  }
}

// for excited 
class Agent {
  constructor(x, y, sz, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.sz = sz;
    this.dx = speedX;
    this.dy = speedY;
    this.h = random(360);
    this.g = random(180);
    this.b = random(200);
    this.a = 150;
    this.life = 255;
    this.triSize = sz;
    this.r = sz / 2;
    let shapes = ['ellipse', 'rect', 'triangle'];
    this.shape = random(shapes);
    }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.dx *= -1;
    }
    if (this.y - this.r < 0 || this.y + this.r > height) {
      this.dy *= -1;
    }
  }
  
shrink() {
  this.sz -= 0.01;  
  this.r = this.sz / 2; 
}

checkCollision(others) {
  for (let i = 0; i < others.length; i++) {
    if (others[i] !== this) {
      let other = others[i];
      let d = dist(this.x, this.y, other.x, other.y);
      let minDist = this.r + other.r;
        
      if (d < minDist) {
        this.dx *= -1;
        this.dy *= -1;
          
        let overlap = minDist - d;
        let angle = atan2(this.y - other.y, this.x - other.x);
        let moveX = cos(angle) * overlap * 0.5;
        let moveY = sin(angle) * overlap * 0.5;
          
        this.x += moveX;
        this.y += moveY;
        other.x -= moveX;
        other.y -= moveY;
        }
      }
    }
  }

  changeShape(newShape) {
    if (this.isAdded) {
      this.shape = newShape;
    }
  }

  show() {
    let shapeColor;
    shapeColor = color(
      50 + (this.h % 200), 
      this.g, 
      this.b, 
      this.a
    );
    
    fill(shapeColor);
    noStroke();
    
    if (this.shape === 'ellipse') {
      ellipse(this.x, this.y, this.sz);
    } 
    else if (this.shape === 'rect') {
      rectMode(CENTER);
      rect(this.x, this.y, this.sz, this.sz);
      rectMode(CORNER);
    } 
    else if (this.shape === 'triangle') {
      let heightTri = this.sz * (sqrt(3) / 2);
      triangle(
        this.x, this.y - this.sz / 2,
        this.x - this.sz / 2, this.y + heightTri / 2,
        this.x + this.sz / 2, this.y + heightTri / 2
      );
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(30);
 
  // Reposition buttons
  excitedBtn.position(width / 2 - 200, height/2 + 100);
  boredBtn.position(width / 2 + 65, height/2 + 100);
  anxiousBtn.position(width / 2 - 200, height/2);
  irritatedBtn.position(width / 2 + 65, height/2);
  newBackBtn.position(20, height - 30);
}

