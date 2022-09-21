//genaral var
var gamestate = 0;
var highscore = { score: "-", name: "" }
var name = "user"
var bounds = { x: 500, y: 1000 }
//run var
var ball;
var goal;
var obstacles = []
var Line//name line not available
var score = 0

//general functions
function addOb(type, x, y, w, h) {
  obstacles.push(new type(x, y, w, h));
}

function WinCheck() {
  if (Math.sqrt((Math.pow(ball.x - goal.x, 2) + Math.pow(ball.y - goal.y, 2))) < 10 & Math.abs(ball.vx) < 2 & Math.abs(ball.vy) < 2) {
    if (score < highscore.score || highscore.score == "-") {
      highscore.score = score
      console.log(name)
      highscore.name = name
      Save()
    }
    gamestate = 2
    gameover()
  }
}

//on game start
function preload() {
  gSprite = loadImage('Assets/Sprites/goal.png');//sprite for goal
  bgMusic = loadSound('Assets/Music&SFX/bgMusic.mp3');
  shootSFX = loadSound('Assets/Music&SFX/ShootSFX.mp3');
}

//input
function keyPressed() {
  if (keyCode === 49) {
    switch (gamestate) {
      case 0:
        Reset()
        gamestate = 1
        name = input.value()
        input.coten
        input.remove()
        break
      case 2:
        gamestate = 0
        menu()
        break
      default:
        break
    }
  }
}

function mouseClicked() {
  switch (gamestate) {
    case 1: Line.shoot()
      break
    default:
      break
  }
}
//gamestates
function setup() {
  bgMusic.loop()
  Save()
  Load()
  createCanvas(bounds.x, bounds.y);
  menu()
  Reset()
}

function Reset() {
  goal = new Goal(100, 400);
  ball = new Ball(100, 200);
  Line = new cLine();
  Obstacles = []
  score = 0

  //create obstacles  
  addOb(Booster, 100, 100, 100, 20)
  addOb(Detractor, 400, 250, 50, 400)
  addOb(Wall, 80, 350, 250, 20)
}

//draw functions
function draw() {
  switch (gamestate) {
    case 1: run()
      break
    default://menu's only need to run 1 time for massive performance boost
      break
  }
}

function run() {
  background(225);
  obstacles.forEach(ob => {
    ob.draw();
  })
  goal.draw();
  ball.draw();
  Line.draw();
  fill("black")
  noStroke()
  text(score, 20, 20)
  WinCheck()
}

function menu() {
  textSize(18)
  background(225);
  text(`Highsore: ${highscore.name} ${highscore.score}`, 250, 220)
  text("Click 1 to play", 250, 240)
  input = createInput();
  input.position(250, 250);
  input.value(name)
}

function gameover() {
  noStroke()
  text(`Score: ${score}`, 250, 200)
  text(`Highsore: ${highscore.name} ${highscore.score}`, 250, 220)
  text("Click 1 to continue", 250, 240)
}
//save&load
function Save() {
  let saveObj = JSON.stringify(highscore)
  localStorage.setItem("Save", saveObj)
}

function Load() {
  let saveObj = localStorage.getItem("Save");
  saveObj = JSON.parse(saveObj);
  if (saveObj != null) {
    highscore = saveObj
  }
}