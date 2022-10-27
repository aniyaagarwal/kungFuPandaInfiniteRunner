class Player {
    constructor() {
        this.name = null;
        this.index = null;
        this.positionY = 0;
        this.score = 0;
    }

    addPlayer() {
        var playerIndex = "players/player" + this.index

        if (this.index === 1) {
            this.positionY = height / 2 - 100
        } else {
            this.positionY = height - 100
        }

        database.ref(playerIndex).set({
            name: this.name,
            positionY: this.positionY,
            score: this.score
        })
    }

    getCount() {
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value", data => {
            playerCount = data.val();
        })
    }

    updateCount(count) {
        database.ref("/").update({
            playerCount: count
        })
    }

    update() {
        var playerIndex = "players/player" + this.index;
        databse.ref(playerIndex).update({
            positionY: this.positionY,
            score: this.score
        })
    }

    static getPlayersInfo() {
        var playerInfoRef = databse.ref("players");
        playerInfoRef.on("value", data => {
            allPlayers = data.val();
        })
    }


}