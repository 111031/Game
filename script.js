
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.nx = x; //temp use
    this.ny = y;
    this.vy = 0;
    this.vx = 0;
    this.gravity = 1.05;
    this.moving = false;
  }

  draw() {
    if (Math.abs(this.vx) > 0.2 || Math.abs(this.vy) > 0.2) {
      this.moving = true
      //decaliration
      this.vy /= this.gravity;
      this.vx /= this.gravity;
      
      
      //collision check
      this.nx = this.x + this.vx;
      if (CheckCollision(obstacles, this)) {
        this.vx *= -1;
      }
      this.nx = this.x

      this.ny = this.y + this.vy;
      if (CheckCollision(obstacles, this)) {
        this.vy *= -1;
      }
      this.ny = this.y
      
      //out of bounds check
      if (this.y > 1000 || this.y < 0) {
        this.vy *= -1;
      }
      if (this.x > 500 || this.x < 0) {
        this.vx *= -1;
      }

      //win check 
      if (Math.sqrt((Math.pow(this.x - goal.x, 2) + Math.pow(this.y - goal.y, 2))) < 10) {
        Gamestate = 2
      }

      //update location
      this.x += this.vx;
      this.y += this.vy;
    }
    else {
      this.moving = false;
    }

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
  Collide(ball) {

  }
}

class Goal {
  constructor(x, y) {
    this.x = x;
    this.y = y
  }
  draw() {
    fill("green")
    circle(this.x, this.y, 20)
  }
}

function mouseClicked() {
  Line.shoot();
}
class cLine {
  constructor() {
    this.distance = 0;
    this.maxdistance = 100;
  }
  draw() {
    if (ball.moving == false) {
      line(ball.x, ball.y, mouseX, mouseY);
      this.distance = (Math.sqrt((Math.pow(ball.x - mouseX, 2) + Math.pow(ball.y - mouseY, 2))))
      if (this.distance > this.maxdistance) {
        this.distance = this.maxdistance;
        stroke("red")
      }
      else if (this.distance > this.maxdistance / 2) {
        stroke("yellow")
      }
      else {
        stroke("green")
      }
    }
  }
  shoot() {
    if (ball.moving == false){
    let power = (this.distance/this.maxdistance) * .1
    
    let distX = mouseX - ball.x;
    let distY = mouseY-ball.y  ;

    // time it takes over the x-axis
    let timeX = distX / power;
    // ..shuld be the same as over the Y-axis
    let speedY = distY / timeX;
    let vy = speedY;
    
    
    ball.vx = power*distX
    ball.vy = power*distY
    score += 1
  }}
}

function CheckCollision(obs, self) {
  let b = false;
  obs.forEach(ob => {
    if (self.nx < ob.x + ob.w && self.nx + 10 > ob.x) {
      if (self.ny < ob.y + ob.h && self.ny + 10 > ob.y) {
        ob.Collide(self);
        b = true;
      }
    }    
  });
  return b;
}
//genaral var
var Gamestate = 0;
var highscore;
//run var
var ball;
var goal;
var obstacles = []
var Line
var score = 0


function addOb(x,y,w,h){
  obstacles.push(new Wall(x,y,w,h));
}

function setup() {
  highscore =  { score: 0, name : "Sten" }
  Save()
  //Load()
  createCanvas(500, 1000);
  background(225);
  goal = new Goal(100, 400);
  ball = new Ball(100, 200);
  Line = new cLine();

  //create walls  
  addOb(100,100,100,20)
  addOb(400,300,50,200)
 
}


function draw() {
  switch(Gamestate){
    case 0: menu()
      break
    case 1: run()
      break
    case 2: gameover()
      break
  }
}

function run(){
  background(225);
  goal.draw();
  ball.draw();
  Line.draw();
  obstacles.forEach(ob =>{
    ob.draw();
  })
}

function menu(){
  background(225);
  Gamestate = 1
}

function gameover(){
  Gamestate = 0
}

function Save(){
  let SaveObj = JSON.stringify(highscore)
  localStorage.setItem("Save", SaveObj)
}

function Load(){
  let SaveObj = localStorage.getItem("Save");
  console.log(SaveObj)
  SaveObj = JSON.parse(SaveObj);
  highscore = SaveObj
  console.log(highscore)
}
  


