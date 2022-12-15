var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, playerImg;
var bg, bgImg, ground;

var obstaclesGroup, obstacle1, obstacle2;

var score=0;

var gameOver, restart;

function preload(){
  playerImg = loadAnimation("player.png");

  bgImg = loadImage("bg2.png");

  obstacle1 = loadImage("1.png");
  obstacle2 = loadImage("22.png");
}

function setup(){
  createCanvas(600, 400);


  bg = createSprite(300, 200);
  bg.addImage(bgImg);
  bg.scale = 1;

  player = createSprite(50,280,20,50);
  player.addAnimation("player", playerImg);
  player.scale = 0.2;
  
  ground = createSprite(300, 340, 600, 30);

  obstaclesGroup = new Group();
  
  
}

function draw(){
  background(2);
  
  player.setCollider("circle", 0, 0, 100);
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    bg.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && player.y >= 250) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8;
    if (bg.x < 0){
      bg.x = bg.width/2;
    }
    if(obstaclesGroup.isTouching(player)){
      gameState = END;
    }
  }
  
  if (gameState === END) {
    bg.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    score = 0;
    setTimeout(reset, 3500);
  }
  
  player.collide(ground);
  ground.visible = false;
  spawnObstacles();
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Score: "+ score, 480,50);

}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,300,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle1);
              break;
      case 3: obstacle.addImage(obstacle2);
              break;
              
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
 
  gameState = PLAY;
 
  obstaclesGroup.destroyEach();
  
}