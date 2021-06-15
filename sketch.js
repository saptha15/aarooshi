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
  playerImg=loadAnimation("images/f1.png", "images/f2.png", "images/f3.png", "images/f4.png", "images/f5.png", "images/f6.png", "images/f7.png", "images/f8.png", "images/f9.png");
  ground_img=loadImage("images/bg5.png");
  virusImg=loadImage("images/virus.png");
  medicineImg=loadImage("images/medicine.png");
  collided=loadAnimation("images/infected.png");
  restartImg = loadImage("images/restart.png");

}

function setup() {
  createCanvas(1250,480);

  ground=createSprite(620,150,1900,500);
  ground.addImage(ground_img);
  
  player=createSprite(100, 400, 50, 50);
  player.addAnimation("player_running", playerImg);
  player.addAnimation("collided",collided);
  player.scale=0.2; 
  //player.debug=true;
  player.setCollider("rectangle", 50,100,330,660);

  invisibleGround=createSprite(150,480,500,10);
  invisibleGround.visible=false;

  medGroup = new Group();
  virusGroup = new Group();


 
}

function draw() {
  background(0);
  drawSprites();

  if(gameState===PLAY){
 
  if(frameCount < 150){
    fill("gold");
    textFont("Times");
    textSize(40);
    text("INSTRUCTIONS:", 300,200);

    fill("gold");
    textFont("Times");
    textSize(35);
    text("Press 'SPACE' to jump and dodge the virus", 300, 240);
    text("Collect the Meds to make the virus disappear for some time.", 300,280);
    text("There are only three lives!",300,320);
  }

  ground.velocityX=-12;

  if(ground.x<500){
    ground.x=ground.width/2
  }

  if(keyDown("SPACE") && player.y>=400-100){
    player.velocityY=-13;
  }

  player.velocityY= player.velocityY + 0.5;

  spawnViruses();
  spawnMeds();
  
  if(player.isTouching(medGroup)){
    superPower();
  }

  player.collide(invisibleGround);

  if(player.isTouching(virusGroup)){
    lives = lives -1
    gameState=END;
    restart = createSprite(600,300,10,10);
    restart.addImage(restartImg);
    restart.scale=0.3;
  }
 }

 if(mousePressedOver(restart) && lives > 0){
  gameState=PLAY;
  player.changeAnimation("player_running",playerImg);
  restart.visible=false;  
}

 else if(gameState===END){

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
   
    }
  }

  if(lives===0){
    restart.destroy();
   
     
       fill("orange");
       textSize(35);
       text("INFECTED!!", 500, 300);
    
       fill("orange");
       textSize(50);
       text("GAME OVER!", 500, 260);
      }
}
 
  fill("cyan");
  textSize(25);
  text("Score = " + score, 1000,50);
  text("Lives : " + lives, 1000,80);

  fill(0);
  textSize(40);
  textFont("georgia");
  text("CORONA RUSH", 480, 50);
  }

function spawnViruses(){
  if(frameCount%150===0){
    virus=createSprite(800,350,20,20);
    virus.y=Math.round(random(310,480));
    virus.addImage(virusImg);
    virus.velocityX= -5;
    virus.scale=0.06;
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
}}





