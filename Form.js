class Form {
    constructor() {
        this.input = createInput("").attribute("placeholder", "");
        this.playButton = createButton("Play");
        this.greeting = createElement("h2");
    }

    setElementsPosition() {
        this.input.position(width / 2 - 100, height / 2 - 50)
        this.playButton.position(width / 2 - 80, height / 2)
        this.greeting.position(width / 2 - 200, height / 2 - 80)

    }

    setElementsStyle() {
        this.input.class("customInput")
        this.playButton.class("customButton")
        this.greeting.class("greeting")
    }

    hide() {
        this.greeting.hide();
        this.playButton.hide();
        this.input.hide();

    }

    handleMousePressed() {
        this.playButton.mousePressed(() => {
            this.input.hide();
            this.playButton.hide();
            var message = `
            Hello ${this.input.value()}
            </br>wait for another player to join...`;
            this.greeting.html(message);
            playerCount += 1;
            player.name = this.input.value();
            player.index = playerCount;
            player.addPlayer();
            player.updateCount(playerCount);

        })
    }

    display() {
        this.setElementsPosition();
        this.setElementsStyle();
        this.handleMousePressed();
    }

}