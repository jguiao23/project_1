let carSkin = [];
let cars = [];
let playerChoice = null;   // which car the player picked
let winner = null;         // which car actually won
let raceStarted = false;
let raceOver = false;
let score=0;
let restart=false;

const CAR_W = 100;
const CAR_H = 100;

function preload() {
  carSkin.push(loadImage("BlueCar.png"));
  carSkin.push(loadImage("GreenCar.png"));
  carSkin.push(loadImage("WhiteCar.png"));
  carSkin.push(loadImage("RedCar.png"));
}

function setup() {
  let canvas= createCanvas(800, 400);
  canvas.parent("race");
  imageMode(CENTER);

  // spawn cars
  for (let i = 0; i < 3; i++) {
    let y = 100 + 120 * i;
    let skin = random(carSkin);
    
    let c = new Car(width - 50, y, random(3, 5), skin, i);
    cars.push(c);
    
  }
}

function draw() {
  background(200);

  // Draw finish line
  push();
  stroke(0);
  strokeWeight(4)
  line(80, 0, 80, height);
  pop();
  text("Finish", 10, 20);

  let hovering = false; // track if mouse is over a car

  // Update/draw cars
  for (let c of cars) {
    if (raceStarted && !raceOver) {
      c.drive();
      if (c.xpos - CAR_W / 2 <= 60) {
        raceOver = true;
        winner = c.id;
      }
    }
    c.display();

    // check if mouse is hovering over this car (only before race starts)
    if (!raceStarted && c.contains(mouseX, mouseY)) {
      hovering = true;
    }
  }

  // update cursor style
  if (hovering) {
    cursor("pointer");
  } else {
    cursor("default");
  }

  // Game messages
  fill(0);
  textSize(20);

  if (!raceStarted) {
    text("Click a car to bet before the race starts!", 120, 40);
  } else if (raceOver) {
    if (playerChoice === winner) {
      text("You win! 🏆", 220, 40);
    } else {
      text("You lost! 😢", 220, 40);
    }
  } else {
    text("Race in progress...", 220, 40);
  }

  if (playerChoice !== null && !raceOver) {
    textSize(16);
    text("Your pick: Car " + (playerChoice + 1), 240, 70);
  }
  
}

function restartRace(){
  playerChoice = null;
  winner = null;
  raceStarted = false;
  raceOver = false;
  restartCars();
}
function restartCars(){
  cars = [];
  for (let i = 0; i < 3; i++) {
    let y = 100 + 120 * i;
    let skin = random(carSkin);
    let speed = random(3, 5);
    let c = new Car(width - 50, y, speed, skin, i);
    cars.push(c);
    
  }
}
function keyPressed(){
  if (raceOver && (key==="r")){
    restartRace();
  }
}


function mousePressed() {
  if (raceOver || raceStarted) return; // can't change after race starts

  for (let c of cars) {
    if (c.contains(mouseX, mouseY)) {
      playerChoice = c.id;
      raceStarted = true; // race begins once player picks
      console.log("Picked car", c.id);
    }
  }
}

class Car {
  constructor(tempXpos, tempYpos, tempXspeed, tempSkin, id) {
    this.xpos = tempXpos;
    this.ypos = tempYpos;
    this.xspeed = tempXspeed;
    this.skin = tempSkin;
    this.id = id;
  }

  display() {
    image(this.skin, this.xpos, this.ypos, CAR_W, CAR_H);
  }

  drive() {
    this.xpos -= this.xspeed;
  }

  // renamed this to contains() since it's used for hover/click
  contains(px, py) {
    let halfW = CAR_W / 2;
    let halfH = CAR_H / 2;
    return (
      abs(px - this.xpos) < halfW &&
      abs(py - this.ypos) < halfH
    );
  }
}
