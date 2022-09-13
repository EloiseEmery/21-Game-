export default class Game {
    /**
     * Constructeur de la classe Game
     */
    constructor(nbGames) {
        this._allPlayers = [];
        this._parent = document.body;
        this._elFormPanel = this._parent.querySelector('[data-js-form-panel]')
        this._elPlayersPanel = this._parent.querySelector('[data-js-players-panel]')
        this._replayBtn = this._parent.querySelector('[data-js-replay-btn]')
        this._nbGamesSpan = this._parent.querySelector('[data-js-game-played]')
        this._nbGames = nbGames;
    }

    /**
     * Enregistre chaque joueur dans un tableau de joueur actif
     * @param {object} player, le joueur
     */
    register(player) {
        this._allPlayers.push(player);
    }

    /**
     * Gestion des comportements liés au passage du prochain joueur
     * @param {object} latestPlayer 
     */
    nextPlayer(latestPlayer) {
        let playerID = latestPlayer.getId();

        for (let j = 1; j <= this._allPlayers.length; j++) {
            // Récupérer l'id et l'instance du prochain joueur potentiel
            let NextPlayerID = (playerID + j) % this._allPlayers.length,
                playerAtJ = this._allPlayers[NextPlayerID];

            // S'il est valide, il joue:
            if (playerAtJ.canPlay()) {
                playerAtJ.play();
                return;
            }
        }

        // S'il n'y a plus aucun joueur valide,
        // lancer la fin de la partie
        this.endOfGame();
    }

    /**
     * Gestion de l'affichage de fin de partie
     */
    endOfGame() {
        let bestScore = 0,
            winningPlayers = [];

        // Trouver les gagnants
        for (let playerIdx in this._allPlayers) {
            // Récupérer le joueur et son score
            let player = this._allPlayers[playerIdx],
                thisScore = player.getScore();

            // Si son score est plus grand que le meilleur et qu'il n'a pas busté
            if (thisScore > bestScore && !player.hasBusted()) {

                // Vider le tableau s'il y avait déjà dans celui-ci, un joueur n'ayant pas le même score.
                if (thisScore != bestScore) {
                    winningPlayers = [];
                }
                winningPlayers.push(player);
                bestScore = thisScore;
            }
            else if (thisScore == bestScore && thisScore > 0) {
                winningPlayers.push(player);
            }
        }

        // Afficher les gagnants
        for (let playerIdx in this._allPlayers) {

            // Récupérer les tous joueurs
            let player = this._allPlayers[playerIdx]

            // Si un des joueurs est dans le tableau des gagnants
            if (winningPlayers.includes(player)) {
                player._elPlayer.classList.add('winner')
            }
            else {
                player._elPlayer.classList.add('loser')
            }
        }

        // Afficher le nombre de parties jouées
        this._nbGamesSpan.textContent = "Partie jouée : " + this._nbGames;

        // Rejouer
        this.replay();
    }

    /**
     * Gestion des comportements au click du bouton rejouer
     */
    replay() {
        // Réafficher les éléments s'ils avaient été caché avant
        this._nbGamesSpan.classList.remove('hidden');
        this._replayBtn.classList.remove('hidden');

        this._replayBtn.addEventListener('click', function () {
            this.resetGame()
        }.bind(this));
    }

    /**
     * Comportements liés à l'affichage d'une nouvelle partie
     */
    resetGame() {
        this._replayBtn.classList.add('hidden');
        this._elPlayersPanel.classList.add('hidden');
        this._nbGamesSpan.classList.add('hidden');

        this._elFormPanel.classList.remove('hidden')

        this._allPlayers = [];
        this._elPlayersPanel.innerHTML = "";
    }
}