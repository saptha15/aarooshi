var PLAY=1;
var END=0;
var gameState=PLAY;
var player, playerImg;
var virus, virusImg;
var bg_img;
var ground;
var invisibleGround;
var medicine, medicineImg;
var virusGroup, medGroup;
var collided;
var score=0;
var lives = 3;
var restart, restartImg;

function preload(){
  playerImg=loadAnimation("images/girl_1.png","images/girl_2.png", "images/girl_3.png", "images/girl_4.png", "images/girl_5.png", "images/girl_6.png");
  ground_img=loadImage("images/bg.png");
  virusImg=loadImage("images/coronavirus.png");
  medicineImg=loadImage("images/medicine.png");
  girl_collided=loadImage("images/collided.png");
  restartImg = loadImage("images/restart.png");

}

function setup() {
  createCanvas(1500,500);

  ground=createSprite(500,100,1500,500);
  ground.addImage(ground_img);
  ground.velocityX=-12;

  player=createSprite(100, 400, 50, 50);
  player.addAnimation("player_running", playerImg);
  player.addAnimation("collided",girl_collided);
 
  invisibleGround=createSprite(150,480,500,10);
  invisibleGround.visible=false;

  medGroup = new Group();
  virusGroup = new Group();

  //restart=

 
}

function draw() {
  background(0);
  drawSprites();


  if(gameState===PLAY){

    
  if(frameCount < 150){
    fill("blue");
    textSize(40);
    text("INSTRUCTIONS:", 300,200);
    text("Press 'SPACE' to jump and dodge the virus", 300, 240);
    text("Collect the Meds to make the virus disappear for some time.", 300,280);
  }

  if(ground.x<550){
    ground.x=ground.width/2
  }

  if(keyDown("SPACE") && player.y>=400-100){
    player.velocityY=-13;
  }
  player.velocityY= player.velocityY + 0.4;

  spawnViruses();
  spawnMeds();
  
  if(player.isTouching(medGroup)){
    superPower();
  }

  player.collide(invisibleGround);


  if(player.isTouching(virusGroup)){
    lives = lives -1 
    gameState=END;
  }



 }

    else if(gameState===END ){

      for(var i = 0; i <virusGroup.length ; i++){
        if(virusGroup.get(i).isTouching(player)){
          
          ground.velocityX=0;
          player.velocityY=0;
          invisibleGround.velocityX=0;
          player.changeAnimation("collided",collided);
          virusGroup.get(i).remove();
          virusGroup.destroyEach();
          medGroup.destroyEach();
          virusGroup.setLifetimeEach(-1);
          medGroup.setLifetimeEach(-1);
          virusGroup.setVelocityXEach(0);
          medGroup.setVelocityXEach(0);
          fill("green");
          textSize(30);
          text("INFECTED!!", 600, 300);
          

        }
      }

    } 
 
  
  fill(0);
  textSize(25);
  text("Score = " + score, 1300,50);
  text("Lives : " + lives, 1300,80);

  

  fill("purple");
  textSize(40);
  text("CORONA RUSH", 600, 50);

  

  }



function spawnViruses(){
  if(frameCount%150===0){
    virus=createSprite(800,350,20,20);
    virus.y=Math.round(random(320,480));
    virus.addImage(virusImg);
    virus.velocityX= -5;
    virus.scale=0.09;
    virus.lifetime=500;
    virusGroup.add(virus);
  }
  
  
}

function spawnMeds(){
  if(frameCount%800===0){
    medicine=createSprite(680,400,10,10);
    medicine.addImage(medicineImg);
    medicine.velocityX= -3;
    medicine.scale=0.1;
    medicine.lifetime=479;
    medGroup.add(medicine);

    medicine.depth = player.depth;
    player.depth = player.depth+1
  }
  
}

function superPower(){
  for(var i = 0; i <virusGroup.length ; i++){
    if(player.isTouching(medGroup)){
    virusGroup.destroyEach();
    medGroup.destroyEach();
    score = score + 10;
  }
}
}

function reset(){
  score=0;
  gameState=PLAY;
}



