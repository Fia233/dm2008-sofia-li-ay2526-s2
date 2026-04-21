let excitedBtn, boredBtn, anxiousBtn, irritatedBtn;
let backBtn, newBackBtn;
let buttonContainer;
let currentEmotion = [];
let extraShapes = [];
let titleSize = 48;
let targetTitleSize = 48; // help from AI

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
    for (let i = 0; i < NUM_START; i++) {
      let w = random(width);
      let h = random(height);
      let sz = random(10, 35);
      let speedX = random(-2, 3);
      let speedY = random(-2, 3);
      extraShapes.push(new extraShapes(w, h, sz, speedX, speedY));
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
    // for (let i = 0; i < 8; i++) {
    //   extraShapes.push({
    //     x: random(width),
    //     y: random(height),
    //     size: random(3, 12),
    //     life: 200
    //   });
    // }
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
    background(255, 200, 50);
    title = false;
    for (let i = 0; i < extraShapes.length; i++) {
      extraShapes[i].update(); 
      extraShapes[i].shrink();
      extraShapes[i].show();
    }
    for (let i = extraShapes.length - 1; i >= 0; i--) {
      if (extraShapes[i].sz <= 0) {
        extraShapes.splice(i, 1);
    }
 }
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