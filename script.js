
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.nx = x;//new x for temp use
    this.ny = y;// new y
    this.vy = 10;
    this.vx = 0;
    this.gravity = 1.0;
  }

  draw() {
    this.vy /= this.gravity;
    this.vx /= this.gravity;

    this.nx += this.vx;
    this.ny += this.vy;

    this.x = this.nx;
    this.y = this.ny;

    obstacles.forEach(function(ob) {
      if (this.x < obstacle.x + obstacle.w && this.x + 50 > obstacle.x) {
        if (this.y < obstacle.y + obstacle.h && this.y + 50 > obstacle.y) {
          this.vy *= -1;
        }
      }
    });

    if (this.y > 1000 || this.y < 0) {
      this.vy *= -1;
    }
    fill("red");
    circle(this.x, this.y, 10)

  }
}

class Obstacle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    fill("red")
    rect(this.x, this.y, this.w, this.h);
  }
}


var ball;
var obstacle
var obstacles = []

function setup() {
  createCanvas(500, 1000);
  background(225);
  ball = new Ball(100, 200);
  obstacle = new Obstacle(100, 80, 100, 10)
  obstacles.push(obstacle);

}


function draw() {
  background(225);
  ball.draw();
  obstacle.draw();
}


