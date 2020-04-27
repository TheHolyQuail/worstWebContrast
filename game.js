const TILESIZE = 40;


var ocean = [

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  ];

var canX = ocean[1].length * TILESIZE;

var canY = ocean[1].length * TILESIZE;



//0 = blank | 1 = wall level 1 | 2 = rail gun | 3 = engine | 4 = wall level 2 | 5 = torpedo tube | 6 = power source | 7 = scope system | 8 = machine gun

var ship = [

  [0,0,0,0,0],

  [0,1,2,1,0],

  [0,1,6,1,0],

  [0,1,3,1,0],

  [0,0,0,0,0]

];

var shipX = canX/2;

var shipY = canY/2;

var shipPower = 6;

var shipSpeed = .5;

var forwardSpeed = 0;

var speedX = 0;

var speedY = 0;

var turnSpeed = .2;

var angleSpeed = 0;

var shipAngle = 0;

var score = 0;



//[original x position, original y position, x position, y position, speed, type, power, angle]

var projectiles = [];



//[x position, y position, speed, type, power, angle]

var enemies = [];



function setup() { 

  createCanvas(canX, canY);

} 



function draw() { 

  background(220);

  fill(0);



  updateOcean();

  updateBoat();

  updateProjectiles();

  updateEnemies();

}



function updateOcean(){

  //draw ocean

  strokeWeight(1);

  stroke("#3e6bf8");



  let x = 0;

  let y = 0;

  for(let i = 0; i < ocean.length; i++){

    for(let ii = 0; ii < ocean[i].length; ii++){

      //update color

      fill("#3e6bf8");

      if(ocean[i][ii] == 1){

        fill("green");

      }

      //make tile of ocean

      square(x, y, TILESIZE);

      //move over to next tile position

      x += TILESIZE;

    }

    //reset x variable and update y variable

    x = 0;

    y += TILESIZE;

  }

}



//0 = blank | 1 = wall level 1 | 2 = rail gun | 3 = engine | 4 = wall level 2 | 5 = torpedo tube | 6 = power source | 7 = scope system | 8 = machine gun

function updateBoat(){

  push();

  angleMode(DEGREES);

  stroke("black");

  //update angle

  shipAngle += angleSpeed;

  if(shipAngle > 360){

    shipAngle = shipAngle - 360;

  }

  if(shipAngle < 0){

    shipAngle = 360 - (-1 * shipAngle);

  }



  //update position

  shipX += cos(shipAngle + 90) * forwardSpeed;

  shipY += sin(shipAngle + 90) * forwardSpeed;



  //draw ship

  let x = -(TILESIZE * ship.length / 2) / 2

  let y = -(TILESIZE * ship[0].length / 2) / 2



  

  // angleMode(DEGREES);

  translate(shipX, shipY);

  rotate(shipAngle);



  for(let i = 0; i < ship.length; i++){

    for(let ii = 0; ii < ship[i].length; ii++){

      //update color

      fill("grey");

      if(ship[i][ii] == 1){

        fill("grey");

      } else if(ship[i][ii] == 2){

        fill("rgb(60,60,60)");

      } else if(ship[i][ii] == 3){

        fill("rgb(240,240,240)");

      } else if(ship[i][ii] == 4){

        fill("rgb(80,80,80)");

      } else if(ship[i][ii] == 5){

        fill("black");

      } else if(ship[i][ii] == 6){

        fill("#d0cdb3");

      } else if(ship[i][ii] == 7){

        fill("rgb(280,280,280)");

      } else if(ship[i][ii] == 8){

        fill("black");

      } else if(ship[i][ii] == 9){

        fill("black");

      }

      //make tile of ocean

      // https://p5js.org/reference/#/p5/rotate

      if(ship[i][ii] != 0){

        square(x, y, (TILESIZE/2));

      }

      //move over to next tile position

      x += (TILESIZE/2);

    }

    //reset x variable and update y variable

    x = -(TILESIZE * ship.length / 2) / 2;

    y += (TILESIZE/2);

  }

  circle(0, 0, 4);

  pop();

}



function updateProjectiles(){

  //[original x position, original y position, x position, y position, speed, type, power, angle]

  //loops through each projectile in turn updating them

  for(i = 0; i < projectiles.length; i++){

    let fuelGood = false;

    //check if projectile has run out of range

    if(projectiles[i][2] < 0 || projectiles[i][3] < 0 || projectiles[i][2] > canX || projectiles[i][3] > canY){

      projectiles.splice(i, 1);

    }else if(sqrt(sq(projectiles[i][1] - projectiles[i][3]) + sq(projectiles[i][0] - projectiles[i][2])) > projectiles[i][6] * 50){

      projectiles.splice(i, 1);

    }else{

      //update position

      projectiles[i][2] += -cos(projectiles[i][7] + 90) * projectiles[i][4];

      projectiles[i][3] += -sin(projectiles[i][7] + 90) * projectiles[i][4];

      fuelGood = true;

    }

    

    //draw updated projectile

    if(fuelGood){

      fill("grey");

      if(projectiles[i][5] == "torpedo"){

        fill("purple");

      } else if(projectiles[i][5] == "bullet"){

        fill("black");

      } else if(projectiles[i][5] == "railShot"){

        fill("red");

      }

      square(projectiles[i][2], projectiles[i][3], 10);

    }

  }

}



function updateEnemies(){

  //[x position, y position, speed, type, angle]

  //loops through each projectile in turn updating them

  for(i = 0; i < enemies.length; i++){

    //locate relation to player

    let angle;

    let x = shipX - enemies[i][0];

    let y = shipY - enemies[i][1];

    ////finds the inverse tangent of the legs of the right triangle between the ship and the enemy

    angle = atan(x/y);



    //update angle

    enemies[i][4] = angle;



    //update position

    console.log(angle);

    //enemies[i][0] += cos(enemies[i][4]) * enemies[i][2];

    //enemies[i][1] += sin(enemies[i][4]) * enemies[i][2];

  

    

    //draw updated projectile  

    fill("grey");

    if(enemies[i][3] == "torpedo"){

      fill("purple");

    } else if(enemies[i][3] == "bullet"){

      fill("black");

    } else if(enemies[i][3] == "melee"){

      fill("red");

    }

    square(enemies[i][0], enemies[i][1], TILESIZE); 

  }

}



function keyPressed() {

  if (key == 'w'){

    forwardSpeed = -1 * shipSpeed;

  }else if (key == 'a'){

    //speedX = -1 * shipSpeed;

    angleSpeed = -1 * turnSpeed;

  }else if (key == 's'){

    forwardSpeed = shipSpeed;

  }else if (key == 'd'){

    //speedX = shipSpeed;

    angleSpeed = turnSpeed;

  }else if(key == ' '){

    forwardSpeed = 0;

    speedY = 0;

    speedX = 0;

    angleSpeed = 0;

  } else if(key == 'e'){

    enemies.push([100, 100, .5, "melee", 0]);

    console.log("enemy created");

  }



}



function mouseReleased() {

  //projectile:[original x position, original y position, x position, y position, speed, type, power, angle]

  //enemy:[x position, y position, speed, type, angle]

  let speed = 1;

  //console.log("x: " + mouseX + "| y: " + mouseY);

  projectiles.push([shipX, shipY, shipX, shipY, speed, "torpedo", 4, shipAngle]);

}