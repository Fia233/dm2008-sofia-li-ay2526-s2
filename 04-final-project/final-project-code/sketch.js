let excitedBtn, boredBtn, anxiousBtn, irritatedBtn;
let backBtn, newBackBtn;
let buttonContainer;
let currentEmotion = [];
let extraShapes = [];
let titleSize = 48;
let targetTitleSize = 48; // help from AI
let currentShape = "ellipse";
const NUM_START = 50;

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
      let sz = random(10, 35);
      let speedX = random(-2, 3);
      let speedY = random(-2, 3);
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
  newBackBtn.position(20, height - 50);
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
      backBtn.position(20, 20);
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
   // extraShapes[i].shrink();
    extraShapes[i].show();
  }
  
  // Remove dead shapes
  for (let i = extraShapes.length - 1; i >= 0; i--) {
    if (extraShapes[i].sz <= 0) {
      extraShapes.splice(i, 1);
    }
  }
  
  // Display instructions
  fill(0);
  textSize(14);
  textAlign(CENTER, TOP);
  text("Press 1: Circle | 2: Square | 3: Triangle", 10, 30);
  text("Press C to clear shapes", 10, 50);
}
  else if (currentEmotion === "bored") {
    background(200);
    title = false;
  } 
  else if (currentEmotion === "anxious") {
    let r = random(200, 255);
    let g = random(100, 150);
    let b = random(80, 120);
    let a = random(width);
    let c = random(height);
    let x = random(width);
    let y = random(height);
    background(r, g, b);
    title = false;
    stroke(random(100, 250));
    strokeWeight(2);
    line(a, c, x, y);
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
    if (key === '1' || key === '!') {
      currentShape = 'ellipse';
    } else if (key === '2' || key === '@') {
      currentShape = 'rect';
    } else if (key === '3' || key === '#') {
      currentShape = 'triangle';
    }
  }
  if (currentEmotion === "excited" && (key === 'C' || key === 'c')) {
    extraShapes = [];
  }
}
function mousePressed() {
  if (currentEmotion === "excited") {
    let sz = random(16, 40);
    let speedX = random(-2, 2);
    let speedY = random(-2, 2);
    extraShapes.push(new Agent(mouseX, mouseY, sz, speedX, speedY));
  }
}

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
    
    // Store triangle points
    this.triSize = sz;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    
    // Bounce off edges
    if (this.x < 0 || this.x > width) {
      this.dx *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.dy *= -1;
    }
  }
  
  show() {
    // Check mouse position for color and background effects
    let mouseXPos = mouseX;
    let mouseYPos = mouseY;
    
    // Determine color based on mouse position
    let shapeColor;
    
    // Bottom left half (x < width/2 AND y > height/2)
    if (mouseXPos < width / 2 && mouseYPos > height / 2) {
      // Darker colors
      shapeColor = color(
        this.h % 100, 
        this.g % 80, 
        this.b % 80, 
        this.a
      );
      // Set white background (handled in draw)
    } 
    // Top right half (x > width/2 AND y < height/2)
    else if (mouseXPos > width / 2 && mouseYPos < height / 2) {
      // Brighter neon colors
      shapeColor = color(
        150 + (this.h % 105), 
        100 + (this.g % 155), 
        100 + (this.b % 155), 
        this.a + 50
      );
      // Set black background (handled in draw)
    } 
    else {
      // Normal colors for other areas
      shapeColor = color(
        50 + (this.h % 200), 
        this.g, 
        this.b, 
        this.a
      );
    }
    
    fill(shapeColor);
    noStroke();
    
    // Draw shape based on current selection
    if (currentShape === 'ellipse') {
      ellipse(this.x, this.y, this.sz);
    } 
    else if (currentShape === 'rect') {
      rectMode(CENTER);
      rect(this.x, this.y, this.sz, this.sz);
      rectMode(CORNER); // Reset to default
    } 
    else if (currentShape === 'triangle') {
      // Draw an equilateral triangle
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
  
  // Keep extra shapes inside canvas
  // for (let i = 0; i < extraShapes.length; i++) {
  //   extraShapes[i].x = constrain(extraShapes[i].x, 0, width);
  //   extraShapes[i].y = constrain(extraShapes[i].y, 0, height);
  // }
}

// class extraShapes {
//   constructor(w, h, sz, speedX, speedY) {
//     this.x = w;
//     this.y = h;
//     this.sz = sz;
//     this.speedX = speedX;
//     this.speedY = speedY;
//   }
  
//   update() {
//     this.x += this.speedX;
//     this.y += this.speedY;
//   }
  
//   shrink() {
//     this.sz -= 0.5; 
//   }
  
//   show() {}

// // shadow-color 
// }