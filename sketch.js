var player1, player2;
var player1Img, player2Img, deadImg;
var ground1, ground2;
var groundImg;
var obstacle, obstacleGroup;
var obstacle1Img, obstacle2Img, obstacle3Img;
var playerCount, allPlayers;
var players = [];
var gameState = "start";
var invG1, invG2;
var gameOverImg, restartImg, gameOver;
var form, game, player;

function preload() {
  groundImg = loadImage("assets/ground.png")
  player1Img = loadImage("assets/po.png")
  player2Img = loadImage("assets/shifu.png")
  obstacle1Img = loadImage("assets/shen.png")
  obstacle2Img = loadImage("assets/tailung.png")
  obstacle3Img = loadImage("assets/kai.png")
  gameOverImg = loadImage("assets/gameOver.png")
  deadImg = loadImage("assets/graveStone.png")
}

function setup() {
  database = firebase.database();

  canvas = createCanvas(windowWidth - 20, windowHeight - 20);

  game = new Game();
  game.getState();
  game.start()

}

function draw() {
  background(0);
  //start();
  if (gameState == 1) {
    game.play()
  } else if (playerCount == 2) {
    game.update(1)
  } else if (gameState == 2) {
    game.end();
  }

}