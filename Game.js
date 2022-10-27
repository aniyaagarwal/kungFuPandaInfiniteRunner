class Game {
    constructor() {
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("");

        this.upArrowActive = false;
        this.dead = false;
    }

    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", data => {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref("/").update({
            gameState: state
        })
    }

    start() {
        form = new Form();
        form.display();

        player = new Player();
        playerCount = player.getCount();

        ground1 = createSprite(width / 2, height / 2)
        ground2 = createSprite(width / 2, height - 5)

        ground1.addImage(groundImg)
        ground2.addImage(groundImg)

        ground1.scale = 2.25
        ground2.scale = 2.25

        player1 = createSprite(200, height / 2 - 100)
        player1.addImage("player1Img", player1Img)
        player1.addImage("deadImg", deadImg)
        player1.scale = 0.225

        player2 = createSprite(200, height - 100)
        player2.addImage("player2Img", player2Img)
        player2.addImage("deadImg", deadImg)
        player2.scale = 0.25

        invG1 = createSprite(width / 2, height / 2 - 20, width, 10);
        invG1.visible = false;

        invG2 = createSprite(width / 2, height - 25, width, 10);
        invG2.visible = false;

        gameOver = createSprite(width / 2, height / 2)
        gameOver.addImage("gameOverImg", gameOverImg)
        gameOver.visible = false;
        gameOver.scale = 0.5

        players = [player1, player2];
        obstacleGroup = new Group();

        ground1.velocityX = 0;
        ground2.velocityX = 0;

    }

    handleElements() {
        form.hide();
        this.resetButton.class("resetButton")
        this.resetButton.position(width - 100, 100)
    }

    play() {
        this.handleElements();
        this.handleResetButton();

        Player.getPlayersInfo();

        if (allPlayers !== undefined) {

            //index of the array
            var index = 0;
            for (var plr in allPlayers) {
                //add 1 to the index for every loop
                index = index + 1;

                var y = allPlayers[plr].positionY;

                players[index-1].y = y;

                if (index === player.index) {
                    stroke(10);
                    fill("red");
                    ellipse(x, y, 60, 60);

                    this.handleCollision();

                }
            }
            //}
            form.hide();

            textSize(12);
            text("Up Arrow to Jump", 20, 20);
            text("Up Arrow to Jump", 20, height / 2 + 20);

            ground1.velocityX = -10
            if (ground1.x < width / 4) {
                ground1.x = width / 2
            }
            ground2.velocityX = -10
            if (ground2.x < width / 4) {
                ground2.x = width / 2
            }

            this.createObstacles(height / 2 - 110);
            this.createObstacles(height - 100);

            if (keyDown(UP_ARROW) && player1.y > 65) {
                player1.velocityY = -8
            }
            player1.velocityY += 1

            if (keyDown(UP_ARROW) && player2.y > height / 2 + 70) {
                player2.velocityY = -8
            }
            player2.velocityY += 1

            this.handlePlayerControls();

            player1.collide(invG1)
            player2.collide(invG2)
            player2.bounceOff(invG1);

            drawSprites();
        }
    }

    createObstacles(y) {
        if (frameCount % 80 == 0) {
            obstacle = createSprite(width, y)
            obstacle.velocityX = -10
            var obstacleType = Math.round(random(0.5, 3.4));
            switch (obstacleType) {
                case 1:
                    obstacle.addImage(obstacle1Img);
                    obstacle.scale = random(0.2, 0.25)
                    break;
                case 2:
                    obstacle.addImage(obstacle2Img);
                    obstacle.scale = (0.1, 0.15)
                    break;
                case 3:
                    obstacle.addImage(obstacle3Img);
                    obstacle.scale = (0.4, 0.45)
                    break;
                default:
                    break;
            }
            obstacle.lifetime = 700
            obstacleGroup.add(obstacle)
        }
    }

    end() {
        obstacleGroup.setLifetimeEach(0)
        obstacleGroup.setVelocityXEach(0)
        ground1.velocityX = 0
        ground2.velocityX = 0
        gameOver.visible = true;
        player1.velocityY = 0
        player2.velocityY = 0

    }

    

    handleResetButton() {
        this.resetButton.mousePressed(() => {
            database.ref("/").set({
                playerCount: 0,
                gameState: 0,
                players: {},
            })
            window.location.reload();
        })
    }

    handlePlayerControls() {
        if (keyIsDown(UP_ARROW)) {
            this.playerMoving = true;
            player.positionY += 10;
            player.update();
        }
    }

    handleCollision(index) {
        if (obstacleGroup.isTouching(players[index - 1])) {
            gameState = 2
            this.end()
            game.update(2)
            players[index - 1].changeImage("deadImg")
        }
        /*if (obstacleGroup.isTouching(player2)) {
            gameState = 2
            this.end()
            game.update(2)
            player2.addImage("deadImg", deadImg)
            player2.changeImage("deadImg")
        }*/
    }
}