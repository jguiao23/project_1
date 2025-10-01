let player;
let carSkin=[];
let cars = [];
let winner = null;
let raceStarted = false;
let raceOver = false;
let score=0;
// let name=["The Stallion", "The Ice Charger","Symbol","Bartholomew","The Speedster"]
// let car;

function preload(){
  carSkin.push(loadImage("BlueCar.png"));
  carSkin.push(loadImage("GreenCar.png"));
  carSkin.push(loadImage("WhiteCar.png"));
  carSkin.push(loadImage("RedCar.png"));
}
function setup() {
  createCanvas(800, 400);


  //spawns on setup start
  for (let i = 0; i < 3; i++) {
    let y = 80 + 130 * i;
    
    let skin= random(carSkin);
    let c = new Car(
      color(random(255), random(255), random(255)),
      750,
      y,
      random(5,7),
      skin,
      i
    );
    cars.push(c);
  }

  
}



function draw() {
  background(100);
  push();
  strokeWeight(5)
  line(800,50,0,50);
  line(800,120,0,120);
  line(800,250,0,250);
  line(800,180,0,180);
  line(800,300,0,300);
  line(800,370,0,370);
  pop;

  // car.display();
  // car.drive();

  // for (let i = 0; i < cars.length; i++) {
  //   // add if statement here for when button is pressed it will go
  //   cars[i].drive();
  //   cars[i].display();
  // }
  for(let c of cars){
    if(raceStarted && !raceOver){
      c.drive();
      if(c.xpos-100<=20){
      raceOver=true;
      }
    }
    c.display();
  }
}



function mousePressed(){
  // console.log("clicked on car");
  if(raceOver|| raceStarted) return;

  //  for(let i = 0; i < cars.length; i++){
  //   cars[i].click(mouseX,mouseY);
  //   raceStarted=true;
  //  }
  for (let c of cars){
    if(c.pick(mouseX,mouseY)){
      playerChoice=c.pick;
      raceStarted=true;
    }
  }
  }




// Even though there are multiple objects, we still only need one class.
// No matter how many cookies we make, only one cookie cutter is needed.
class Car {
  constructor(tempC, tempXpos, tempYpos, tempXspeed,tempSkin,tempPick) {
    this.c = tempC;
    this.xpos = tempXpos;
    this.ypos = tempYpos;
    this.xspeed = tempXspeed;
    this.activate = false;
    this.skin= tempSkin;
    this.pick=tempPick;
  }

  display() {
    stroke(0);
    fill(this.c);
    rectMode(CENTER);
    imageMode(CENTER);
    // rect(this.xpos, this.ypos, 50, 25);
    image(this.skin,this.xpos,this.ypos,100,100)
  }

  drive() {
    this.xpos = this.xpos - this.xspeed;
}
  click(px,py){
    let halfW=50/2;
    let halfH=25/2;
    return(abs(px - this.xpos) < halfW &&
       abs(py - this.ypos) < halfH)

  }

}


