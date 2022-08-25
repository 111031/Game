
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
    //decaliration
    this.vy /= this.gravity;
    this.vx /= this.gravity;
    //collision check
    console.log(CheckCollision(obstacles, this))
    this.nx += this.vx;
    if (CheckCollision(obstacles, this)) {
      this.vx *= -1;
    }
    this.ny += this.vy;
    if (CheckCollision(obstacles, this)) {
      this.vy *= -1;
    }
    
    //out of bounds check
    if (this.y > 1000 || this.y < 0) {
      this.vy *= -1;
    }
    if (this.x > 500 || this.x < 0) {
      this.vx *= -1;
    }
    
    //win check
    if (Math.abs(sqrt((this.x-goal.x)+(this.y-goal.y))) < 1){
      console.log("win")
    }

    //update location
    this.x += this.vx;
    this.y += this.vy;
    
    
    fill("red");
    circle(this.x, this.y, 10)
  }
}

class Wall {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    fill("black")
    rect(this.x, this.y, this.w, this.h);
  }
  Collide(ball){
    
  }
}

class Goal {
  constructor(x, y) {
    this.x = x;
    this.y = y
  }
  draw(){
    fill("green")
    circle(this.x, this.y, 20)
  }
}


function CheckCollision(obs, self) {
  obs.forEach(ob => {
    if (this.nx < ob.x + ob.w && this.nx + 10 > ob.x) {
      if (this.ny < ob.y + ob.h && this.ny + 10 > ob.y) {
        ob.Collide(self);
        return true;
      }
    }
    return false;
  });
}

var ball;
var goal;
var obstacle
var obstacles = []

function setup() {
  createCanvas(500, 1000);
  background(225);
  goal = new Goal(100, 400);
  ball = new Ball(100, 200);
  obstacle = new Wall(100, 80, 100, 10)
  obstacles.push(obstacle);
}


function draw() {
  background(225);
  goal.draw();
  ball.draw();
  obstacle.draw();
}


