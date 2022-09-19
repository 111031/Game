
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
      

      //update location
      this.x += this.vx;
      this.y += this.vy;
    }
    else {
      this.moving = false;
    }

    fill("red");
    stroke(0)
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
    this.offset = { x: -40, y: -77 } //sprite offset
  }
  draw() {
    image(GoalSprite, this.x + this.offset.x, this.y + this.offset.y, GoalSprite.width * 2.5, GoalSprite.height * 2.5)
  }
}


class cLine {
  constructor() {
    this.distance = 0;
    this.maxdistance = 100;
  }
  draw() {
    if (ball.moving == false) {
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
      line(ball.x, ball.y, mouseX, mouseY);
    }
  }
  shoot() {
    if (ball.moving == false) {
      let power = (this.distance / this.maxdistance) * .1

      let distX = mouseX - ball.x;
      let distY = mouseY - ball.y;

      ball.vx = power * distX
      ball.vy = power * distY
      score += 1
      ShootSFX.play()
    }
  }
}
//input
function keyPressed() {
  if (keyCode === 49) {
    switch (Gamestate) {
      case 0:
        Reset()
        Gamestate = 1
        name = input.value()
        input.coten
        input.remove()
        break
      case 2:
        Gamestate = 0
        menu()
        break
      default:
        break
    }
  }
}

function mouseClicked() {
  switch (Gamestate) {
    case 1: Line.shoot()
      break
    default:
      break
  }
}
//general functions
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

function addOb(x, y, w, h) {
  obstacles.push(new Wall(x, y, w, h));
}

function WinCheck(){
  if (Math.sqrt((Math.pow(ball.x - goal.x, 2) + Math.pow(ball.y - goal.y, 2))) < 10 & Math.abs(ball.vx) < 2 & Math.abs(ball.vy) < 2) {
        if (score < highscore.score || highscore.score == "-") {
          highscore.score = score
          console.log(name)
          highscore.name = name
          Save()
        }
        Gamestate = 2
        gameover()
      }
}

//genaral var
var Gamestate = 0;
var highscore = { score: "-", name: "" }
var name = "user"
//run var
var ball;
var goal;
var obstacles = []
var Line
var score = 0


//on game start
function preload() {
  GoalSprite = loadImage('Assets/Sprites/goal.png');
  bgMusic = loadSound('Assets/Music&SFX/bgMusic.mp3');
  ShootSFX = loadSound('Assets/Music&SFX/ShootSFX.mp3');
}

function setup() {
  bgMusic.loop()
  Save()
  Load()
  createCanvas(500, 1000);
  menu()
  Reset()
}

function Reset() {
  goal = new Goal(100, 400);
  ball = new Ball(100, 200);
  Line = new cLine();
  score = 0

  //create walls  
  addOb(100, 100, 100, 20)
  addOb(400, 300, 50, 200)
}

//draw functions
function draw() {
  switch (Gamestate) {
    case 1: run()
      break
    default:
      break
  }
}

function run() {
  background(225);
  goal.draw();
  ball.draw();
  obstacles.forEach(ob => {
    ob.draw();
  })
  text(score, 20, 20)
  Line.draw();
  WinCheck()
}

function menu() {
  background(225);
  text(`Highsore: ${highscore.name} ${highscore.score}`, 250, 220)
  text("Click 1 to play", 250, 240)
  input = createInput();
  input.position(250, 250);
  input.value(name)
}

function gameover() {
  textSize(20)
  noStroke()
  text(`Score: ${score}`, 250, 200)
  text(`Highsore: ${highscore.name} ${highscore.score}`, 250, 220)
  text("Click 1 to continue", 250, 240)
}

function Save() {
  let SaveObj = JSON.stringify(highscore)
  localStorage.setItem("Save", SaveObj)
}

function Load() {
  let SaveObj = localStorage.getItem("Save");
  SaveObj = JSON.parse(SaveObj);
  if (SaveObj != null) {
    highscore = SaveObj
  }
}



