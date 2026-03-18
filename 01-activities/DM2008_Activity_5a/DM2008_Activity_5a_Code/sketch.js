// DM2008 – Activity 5a
// Colliding Circles (30 min)

let balls = [];

function setup() {
  createCanvas(400, 400);
  balls.push(new Ball(100, 200));
  balls.push(new Ball(200, 300));
  balls.push(new Ball(200, 200));
  balls.push(new Ball(random(400), random(400)));
  balls.push(new Ball(random(400), random(400)));
  // Step 1: create two Ball objects
  // balls.push(new Ball(x, y));
  // balls.push(new Ball(x, y));
}

function draw() {
  background(230);

  // Step 2: update and display each ball
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.move();
    b.show();
    b.checkCollision(balls);

    // Step 3: check collisions
    // Use dist() between ball centers
    // Trigger feedback (color, bounce, etc.)
  }
}

class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 30;
    this.vel = createVector(random(-3, 3), random(-3, 3));
  }

  move() {
    this.pos.add(this.vel);
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    }
    if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    }
    if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
    // TODO: wrap around OR bounce off edges
  }

  show() {
    // let r = random(255);
    // let g = random(255);
    // let b = random(255);
    fill(color(93, 203, 160));
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    return;
  }

  checkCollision(others) {
    for (let i = 0; i < others.length; i++) {
      if (others[i] !== this) {
        let other = others[i];
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < this.r + other.r) {
          this.vel.x *= -1;
          this.vel.y *= -1;
          push();
          fill(random(255));
          ellipse(this.pos.x, this.pos.y, this.r * 2);
          pop();
        }
      }
    }
  }
  // Step 4: Add a method to checkCollision(others)
  // Use dist() and respond visually
}
