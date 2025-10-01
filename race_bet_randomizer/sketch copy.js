let carSkin = [];
let cars = [];
let playerChoice = null;   // which car the player picked
let playerLost=false;
let winner = null;         // which car actually won
let raceStarted = false;
let raceOver = false;

let restart=false;

const CAR_W = 100;
const CAR_H = 100;

let score=-100;

let bg;
let r=200;
let g=200;
let b=200;
let name=["The Stallion", "The Ice Charger","Symbol","Bartholomew","The Speedster"];
let pixel

function preload() {
  pixel=loadFont("Pixel.ttf")
  carSkin.push(loadImage("BlueCar.png"));
  carSkin.push(loadImage("GreenCar.png"));
  carSkin.push(loadImage("WhiteCar.png"));
  carSkin.push(loadImage("RedCar.png"));
}

function setup() {
  let canvas= createCanvas(800, 400);
  canvas.parent("race");
  imageMode(CENTER);
  bg= color(200,200,200);


  // spawn cars
  for (let i = 0; i < 3; i++) {
    let y = 100 + 120 * i;
    let skin = random(carSkin);
    
    let c = new Car(width - 50, y, random(3, 5), skin, i);
    cars.push(c);
    
  }
}

function draw() {

  background(bg);
  textAlign(CENTER);
  textFont(pixel);
  textSize(10);
  text("Your Cash: $"+score,700,40);
  // text(score,760,40)

  // Draw finish line
  push();
  textSize(10);
  stroke(0);
  strokeWeight(4)
  line(80, 0, 80, height);
  pop();
  text("Finish", 40, 20);

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
    textAlign(CENTER);
    textSize(15);
    text("Click on a car to Bet before the race starts!", width/2.2, 40);
  } else if (raceOver) {
    if (playerChoice === winner) {
      textSize(15)
      text("You win! Press 'SPACE' to restart", width/2, 40);
      
    } else {
      textSize(15)
      text("You lost! Press 'SPACE' to restart", width/2.2, 40);
      playerLost=true;
     
    }
  } else {
    textAlign(CENTER);

    text("Race in progress...", width/2, 40);
  }

  if (playerChoice !== null && !raceOver) {
    textSize(15);
    textAlign(CENTER);
    text("Your picked the: Car # " + (playerChoice + 1), width/2, 70);
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
  // if (raceOver && (key==="r")){
  //   restartRace();
  //   bg=200;
  // }
  if (raceOver && playerChoice===winner&&(key===" ")){
    restartRace();
    bg=200;
    score= score+int(random(1,1000))
  }
  if(raceOver && playerLost===true&&(key===" ")){
    restartRace();
    bg=200;
    score= score-int(random(1,1000))
  }
  if (key==="c"){
    bg=color(random(255),random(255),random(255));
  }
  
}


function mousePressed() {
  if (raceOver || raceStarted) return; // can't change after race starts

  for (let c of cars) {
    if (c.contains(mouseX, mouseY)) {
      playerChoice = c.id;
      raceStarted = true; // race begins once player picks
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
