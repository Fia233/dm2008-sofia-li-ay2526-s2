// DM2008 — Mini Project
// FLAPPY BIRD (Starter Scaffold)

// Notes for students:
// 1) Add flap control in keyPressed() (space / ↑ to jump)
// 2) Detect collisions between the bird and pipes → game over
// 3) Add scoring when you pass a pipe
// 4) (Stretch) Add start/pause/game-over states

/* ----------------- Globals ----------------- */
let bird;
let pipes = [];
let score;
let imgA, imgB, aud, aud2;

let gameOver = false

let spawnCounter = 0; // simple timer
const SPAWN_RATE = 90; // ~ every 90 frames at 60fps ≈ 1.5s
const PIPE_SPEED = 2.5;
const PIPE_GAP = 120; // gap height (try 100–160)
const PIPE_W = 60;

function preload() {
  imgA = loadImage("assets/BG.jpg.avif"); // folder/file name
  imgB = loadImage("assets/GM.jpg");
  aud = loadSound("assets/wing.mp3") // aud.play()
  aud2 = loadSound("assets/BGM.mp3");
}

/* ----------------- Setup & Draw ----------------- */
function setup() {
  createCanvas(480, 640);
  score = 0;
  noStroke();
  bird = new Bird(120, height / 2);
  // Start with one pipe so there's something to see
  pipes.push(new Pipe(width + 40));
  aud2.play();
}

function draw() {
  background(18, 22, 28);
  image(imgA, 0, 0, width, height);

  if (gameOver === true) {
    // aud2.play();
    image(imgB, 90, 200, 300, 241);
    textSize(40);
    fill("#FFEB3B");
    text(score, 230, 75);
    return;
  }
  
  // 1a update world
  bird.update();

  // 1b spawn new pipes on a simple timer
  spawnCounter++;
  if (spawnCounter >= SPAWN_RATE) {
    pipes.push(new Pipe(width + 40));
    spawnCounter = 0;
  }

  
  // update + draw pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();
    if (pipes[i].hits(bird)) {
      gameOver = true
      }
    // TODO (students): collision check with bird
    // Hint: call pipes[i].hits(bird) here
    // if (pipes[i].hits(bird)) { /* game over logic here */ }

    // remove pipes that moved off screen
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
    if (pipes[i].pass(bird)) {
      score ++;
    }
//     if (bird.x > pipes.x + PIPE_W) {
      
//     }
  }

  textSize(40);
  fill(250);
  text(score, 230, 75);
  
  // 2) draw bird last so it's on top
  bird.show();
}

/* ----------------- Input ----------------- */
function keyPressed() {
  if (key === " " || keyCode === UP_ARROW) {
    bird.flap();
    aud.play();
  }
  // TODO (students): make the bird flap on space or UP arrow
}

/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 12; // for collision + draw
    this.gravity = 0.45; // constant downward force
    this.flapStrength = -8.0; // negative = upward movement
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    // instant upward kick (negative velocity = up)
    this.vel.y = this.flapStrength;
  }

  update() {
    // gravity
    this.applyForce(this.gravity);

    // integrate
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // keep inside canvas vertically (simple constraints)
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = 0;
      // start over
      // TODO (students): treat touching the ground as game over
    }
    // touch pipe -- disapear 
  }

  show() {
    fill(255, 205, 80);
    circle(this.pos.x, this.pos.y, this.r * 2);
    // (Optional) add a small eye
    fill(40);
    circle(this.pos.x + 6, this.pos.y - 4, 4);
  }
  
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;

    // randomize gap position
    const margin = 40;
    const gapY = random(margin, height - margin - PIPE_GAP);

    this.top = gapY; // bottom of top pipe
    this.bottom = gapY + PIPE_GAP; // top of bottom pipe

    this.passed = false; // for scoring once per pipe
  }

  update() {
    this.x -= this.speed;
  //   if (bird.x > this.x + this.w) {
  //     this.passed = true
  // }
  //   if (this.passed === true) {
  //     console.log(score += 1);
  //   }
  }

  show() {
    fill(120, 200, 160);
    rect(this.x, 0, this.w, this.top); // top pipe
    rect(this.x, this.bottom, this.w, height - this.bottom); // bottom pipe
  }
  

  offscreen() {
    // look at MDN to understand what 'return' does
    // we will learn more about this in Week 6
    return this.x + this.w < 0;
  }

  // TODO (students): Uncomment this collision detection method
  // Circle-rect collision check (simple version)
  // 1) Check if bird is within pipe's x range
  // 2) If yes, check if bird.y is outside the gap (above top OR below bottom)
  //
  hits(bird) {
    const withinX = (bird.pos.x + bird.r > this.x) && (bird.pos.x - bird.r < this.x + this.w);
    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;
    return withinX && (aboveGap || belowGap);
  }
  
  pass(bird) {
    const pass = bird.pos.x == this.x + this.w;
    return pass;
  }
}
