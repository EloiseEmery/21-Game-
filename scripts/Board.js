import Game from './Game.js';
import Player from './Player.js';

export default class Board {
    /**
     * Constructeur de la classe Board
     * @param {int} nbJoueur 
     */
    constructor(nbJoueur, elPlayerPanel, nbGames) {
        this._nbJoueur = nbJoueur;
        this._elParent = elPlayerPanel;
        this._game = new Game(nbGames);
        this.init();
    }

    init() {
        for (let i = 0; i < this._nbJoueur; i++) {
            // Injecter les joueurs dans le DOM selon le nb de joueur selectionné
            this.injectionJoueurs(i)
        }
    }

    /**
     * Injecter la DOM sString de chaque joueur
     * @param {int} i compteur du nombre de joueur
     */
    injectionJoueurs(i) {
        let joueurDOMString = `<div class='player' data-js-table>
                                    <h3>Joueur ${i + 1}</h3>
                                    <div class="card-list" data-js-card-list></div>
                                    <p>Total : <span data-js-total-player>0</span></p>
                                    <button class="btn-player" data-js-btn="jouer">Jouer</button>
                                    <button class="btn-player" data-js-btn="stop">Stop</button>
                                </div>`

        this._elParent.insertAdjacentHTML('beforeend', joueurDOMString)

        // Injecter la classe hisTurn au premier joueur pour qu'il commence la partie
        if (i == 0) {
            this._elParent.firstElementChild.classList.add('hisTurn')
        }

        // Instancier les joueurs de cette partie
        new Player(i, this._elParent.lastElementChild, this._game);
    }
}