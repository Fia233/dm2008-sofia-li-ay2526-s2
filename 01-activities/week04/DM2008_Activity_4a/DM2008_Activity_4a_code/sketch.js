// DM2008 – Activity 4a
// Bake a Cookie (30 min)

let cookie;

function setup() {
  createCanvas(400, 400);
  noStroke();
  cookie = new Cookie("dbl-choco", 100, width / 2, height / 2);
  cookie2 = new Cookie("mint", 100, width / 4, height / 4);
  // Step 3: make one cookie object
  // cookie = new Cookie("chocolate", 80, width/2, height/2);
}

function draw() {
  background(230);
  cookie.show();
  cookie2.show();
  cookie.move();
  cookie2.move();

  // Step 4: call the cookie’s show() method
  // cookie.show();
  // function keyPressed() {
  //     fill(7, 23, 24);
  // }
}

// Step 1: define the Cookie class
class Cookie {
  constructor(flavor, sz, x, y) {
    // set up required properties
    this.flavor = flavor;
    this.sz = sz;
    this.x = x;
    this.y = y;
    this.color = null;
  }

  // Step 2: display the cookie
  show() {
    // function keyPressed() {
    // switch (key) {
    //   case 'd':
    if (mouseIsPressed) {
      fill(this.color);
    } else {
      switch (this.flavor) {
        case "dbl-choco":
          fill(63, 35, 23);
          break;
        case "mint":
          stroke(100);
          strokeWeight(2);
          fill(9, 182, 188);
          break;
        default:
          fill(220, 180, 120);
      }
    }
    ellipse(this.x, this.y, this.sz);

    const c = this.sz * 0.2;
    noStroke();
    fill(31, 17, 0);
    rect(this.x - this.sz * 0.16, this.y - this.sz * 0.3, c);
    rect(this.x + this.sz * 0.18, this.y - this.sz * 0.1, c);
    rect(this.x - this.sz * 0.31, this.y + this.sz * 0.1, c);
  }

  update() {}

  move() {
    if (keyCode === UP_ARROW) {
      this.y -= 10;
    } else if (keyCode === DOWN_ARROW) {
      this.y += 10;
    }
    if (keyCode === LEFT_ARROW) {
      this.x -= 5;
    } else if (keyCode === RIGHT_ARROW) {
      this.x += 5;
    }
  }
}

function mousePressed() {
  cookie.color = color(random(255), random(255), random(255));
  cookie2.color = color(random(255), random(255), random(255));
}

// function keyPressed() {
//   switch (this.flavor) {
//     case "mint":
//       fill(7, 23, 24);
//       break;
// }
// }
// Steps 5 & 6: Implement additional methods here

// Step 5: add movement (keyboard arrows)
// function keyPressed() {}

// Step 6: add flavor randomizer (mouse click)
// function mousePressed() {}
