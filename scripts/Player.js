import Card from './Card.js';

export default class Player {
    /**
     * Constructeur de la classe Player
     * @param {object} el, le joueur
     */
    constructor(i, joueur, game) {
        this._id = i;
        this._elPlayer = joueur;
        this._elPlayers = document.getElementsByClassName('player');
        this._elCardList = this._elPlayer.querySelector('[data-js-card-list]')
        this._elBtn = this._elPlayer.querySelectorAll('button');
        this._total = 0;
        this._turn = game;
        this.init();
        // Enregistrer le joueur dans le tableau des joueurs actifs
        game.register(this);
    }

    init() {
        for (let i = 0, l = this._elBtn.length; i < l; i++) {

            /**
             * Gestion de l'event click sur les boutons du joueur
             * @param {Event} click
             */
            this._elBtn[i].addEventListener('click', function (e) {
                let action = e.target.dataset.jsBtn

                // Lancer les comportements liés à l'action du joueur
                if (action == 'jouer') this.pickCard();
                if (action == 'stop') this.stop();
            }.bind(this));
        }
    }

    /**
     * Récupérer l'id du joueur
     * @returns {int} this._id
     */
    getId() {
        return this._id;
    }

    /**
     * Récupérer le score du joueur
     * @returns {int} this._total
     */
    getScore() {
        return this._total;
    }

    /**
     * Donner le tour au joueur
     */
    play() {
        this._elPlayer.classList.add('hisTurn');
    }

    /**
     * Gestion du click du bouton jouer 
     */
    pickCard() {
        // Tirage d'une carte
        let newCard = this.getNewCard();

        // Afficher celle-ci
        newCard.injectionCard(this._elCardList);

        // Update du pointage
        this.updateTotal(newCard);

        // Gestion de l'état du joueur
        this.endTurnPlayer();
    }

    /**
     * Générer une nouvelle carte
     * @returns {object} newCard
     */
    getNewCard() {
        // Tirage d'une couleur et d'un nombre
        let randomColor = Math.floor(Math.random() * 4),
            randomNumber = Math.floor(Math.random() * 13);

        // Nouvelle carte selon les nombres tirés
        let newCard = new Card(randomColor, randomNumber);

        return newCard;
    }

    /**
     * Mise à jour du total du joueur selon la carte tirée
     * @param {object} newCard, carte tirée
     */
    updateTotal(newCard) {
        let elTotal = this._elPlayer.querySelector('[data-js-total-player]');

        // Récupérer la valeur de la carte et l'ajouter au total
        this._total += newCard.getValue();

        // Injecter le total du joueur dans le DOM
        elTotal.textContent = this._total;

        // Si le 21 est buster
        if (this.hasBusted()) {
            this._elPlayer.classList.add('busted');
        }
    }

    /**
     * Gestion des comportements quand le joueur a finit son tour
     */
    endTurnPlayer() {
        this._elPlayer.classList.remove('hisTurn');
        this._turn.nextPlayer(this);
    }

    /**
     * Valider si un joueur peut jouer
     * @returns {bool} true|false
     */
    canPlay() {
        return !(this.hasStopped() || this.hasBusted());
    }

    /**
     * Vérifier si un joueur contient la classe stopped
     * @returns {bool} true|false
     */
    hasStopped() {
        return this._elPlayer.classList.contains('stopped');
    }

    /**
     * Vérifier si un joueur à buster le 21
     * @returns {bool} true|false
     */
    hasBusted() {
        return this._total > 21;
    }

    /**
     * Gestion des comportements au click du bouton stop
     */
    stop() {
        this._elPlayer.classList.add('stopped');
        this.endTurnPlayer()
    }
}