class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.nx = x; //temp use
    this.ny = y; //temp use
    this.vy = 0;
    this.vx = 0;
    this.gravity = 1.05;
    this.moving = false;
  }

  draw() {
    if (Math.abs(this.vx) > 0.2 || Math.abs(this.vy) > 0.2) {
      this.moving = true;
      //decaliration
      this.vy /= this.gravity;
      this.vx /= this.gravity;


      //collision check
      this.nx = this.x + this.vx;
      if (this.CheckCollision(obstacles, this)) {
        this.vx *= -1;
      }
      this.nx = this.x;

      this.ny = this.y + this.vy;
      if (this.CheckCollision(obstacles, this)) {
        this.vy *= -1;
      }
      this.ny = this.y;

      //out of bounds check
      if (this.y > bounds.y || this.y < 0) {
        this.vy *= -1;
      }
      if (this.x > bounds.x || this.x < 0) {
        this.vx *= -1;
      }

      //update location
      this.x += this.vx;
      this.y += this.vy;
    }
    //when not moving checks if you are out of bounds and teleports you to nearest point 
    else {
      this.moving = false;
      if (this.x < 0 || this.x > bounds.x) {
        this.x = Math.max(Math.min(this.x), bounds.x), 0;
      }
      if (this.y < 0 || this.y > bounds.y) {
        this.y = Math.max(Math.min(this.y), bounds.y), 0;
      }
    }

    fill("red");
    stroke(0);
    circle(this.x, this.y, 10);
  }

  CheckCollision() {
    let b = false;
    obstacles.forEach(ob => {
      if (this.nx < ob.x + ob.w && this.nx + 10 > ob.x) {
        if (this.ny < ob.y + ob.h && this.ny + 10 > ob.y) {
          ob.Collide(this);
          b = true;
        }
      }
    });
    return b;
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
    rect(this.x, this.y, this.w, this.h);
  }
  Collide(collider) {
    console.log("collide");
  }
}

class Wall extends Obstacle {
  draw() {
    fill("black");
    super.draw();
  }
}

class Booster extends Obstacle {
  Collide(collider) {
    super.Collide();
    collider.vx *= 1.2;
    collider.vy *= 1.2;
  }
  draw() {
    fill("green");
    super.draw();
  }
}

class Detractor extends Obstacle {
  Collide(collider) {
    super.Collide();
    collider.vx *= 0.8;
    collider.vy *= 0.8;
  }
  draw() {
    fill("red");
    super.draw();
  }
}

class Goal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.offset = { x: -40, y: -77 }; //sprite offset
  }
  draw() {
    image(gSprite, this.x + this.offset.x, this.y + this.offset.y, gSprite.width * 2.5, gSprite.height * 2.5);
  }
}

class cLine {
  constructor() {
    this.distance = 0;
    this.maxdistance = 100;
  }
  draw() {
    if (ball.moving == false) {
      this.distance = (Math.sqrt((Math.pow(ball.x - mouseX, 2) + Math.pow(ball.y - mouseY, 2))));
      if (this.distance > this.maxdistance) {
        this.distance = this.maxdistance;
        stroke("red");
      }
      else if (this.distance > this.maxdistance / 2) {
        stroke("yellow");
      }
      else {
        stroke("green");
      }
      line(ball.x, ball.y, mouseX, mouseY);
    }
  }
  shoot() {
    if (ball.moving == false) {
      let power = (this.distance / this.maxdistance) * .1
      let distX = mouseX - ball.x;
      let distY = mouseY - ball.y;
      ball.vx = power * distX;
      ball.vy = power * distY;
      score += 1;
      shootSFX.play();
    }
  }
}