//genaral var
var gamestate = 0;
var highscore = { score: "-", name: "" };
var name = "user";
var bounds = { x: 500, y: 850 };
//run var
var ball;
var goal;
var obstacles = [];
var Line;//name line not available
var score = 0;

//general functions
function addOb(type, x, y, w, h) {
  obstacles.push(new type(x, y, w, h));
}

function WinCheck() {
  if (Math.sqrt((Math.pow(ball.x - goal.x, 2) + Math.pow(ball.y - goal.y, 2))) < 10 & Math.abs(ball.vx) < 2 & Math.abs(ball.vy) < 2) {
    if (score < highscore.score || highscore.score == "-") {
      highscore.score = score;
      console.log(name);
      highscore.name = name;
      Save();
    }
    gamestate = 2;
    gameover();
  }
}

//on game start
function preload() {
  gSprite = loadImage('Assets/Sprites/goal.png');//sprite for goal
  bSprite = loadImage('Assets/Sprites/ball.png');//sprite for ball
  bgMusic = loadSound('Assets/Music&SFX/bgMusic.mp3');
  shootSFX = loadSound('Assets/Music&SFX/ShootSFX.mp3');
}

//input
function keyPressed() {
  if (keyCode === 49) {
    switch (gamestate) {
      case 0:
        Reset();
        gamestate = 1;
        name = input.value();
        input.coten;
        input.remove();
        break;
      case 2:
        gamestate = 0;
        menu();
        break;
      default:
        break;
    }
  }
}

function mouseClicked() {
  switch (gamestate) {
    case 1: Line.shoot();
      break;
    default:
      break;
  }
}

function setup() {
  bgMusic.loop();
  Load();
  createCanvas(bounds.x, bounds.y);
  menu();
  Reset();
}
//gamestates
function Reset() {
  goal = new Goal(250, 800);
  ball = new Ball(250, 100);
  Line = new cLine();
  Obstacles = [];
  score = 0;

  //create obstacles  
  addOb(Booster, 0, 250, 20, 1000);
  addOb(Detractor, 480, 250, 20, 1000);
  addOb(Wall, 100, 350, 300, 20);
  addOb(Detractor, 20, 450, 100, 20);
  addOb(Wall, 380, 450, 100, 20);
  addOb(Booster, 250, 350, 20, 100);
  addOb(Wall, 100, 550, 300, 20);
  addOb(Wall, 100, 550, 20, 200);
  addOb(Wall, 380, 550, 20, 50);
  addOb(Wall, 300, 650, 200, 20);
}

//draw functions
function draw() {
  switch (gamestate) {
    case 1: run();
      break;
    default://menu's only need to run 1 time for massive performance boost
      break;
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
  fill("black");
  noStroke();
  text(score, 20, 20);
  WinCheck();
}

function menu() {
  textSize(18);
  background(225);
  text(`Highsore: ${highscore.name} ${highscore.score}`, 180, 220);
  text("Click 1 to play", 180, 240);
  input = createInput();
  input.position(180, 250);
  input.value(name);
}

function gameover() {
  noStroke();
  text(`Score: ${score}`, 180, 200);
  text(`Highsore: ${highscore.name} ${highscore.score}`, 180, 220);
  text("Click 1 to continue", 180, 240);
}
//save&load
function Save() {
  let saveObj = JSON.stringify(highscore);
  localStorage.setItem("Save", saveObj);
}

function Load() {
  let saveObj = localStorage.getItem("Save");
  saveObj = JSON.parse(saveObj);
  if (saveObj != null) {
    highscore = saveObj;
  }
}