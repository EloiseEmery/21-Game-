import Board from './Board.js';

let elFormPanel = document.querySelector('[data-js-form-panel]'),
    elPlayerPanel = document.querySelector('[data-js-players-panel]'),
    elBtnPlay = document.querySelector('[data-js-btn-play]'),
    elInputNbJoueur = document.querySelector('[data-js-input-joueur]'),
    elMsgError = document.querySelector('[data-js-error-msg]'),
    nbGames = 0;

elBtnPlay.disabled = true

/**
 * Gestion de l'affichage du bouton Jouer selon l'input de l'usager
 * @param {Event} input
 */
elInputNbJoueur.addEventListener('input', function () {
    elBtnPlay.disabled = false;

    if (elInputNbJoueur.value == "") {
        elBtnPlay.disabled = true;
    }
});

/**
 * Gestion du click sur bouton Jouer
 * @param {Event} click
 */
elBtnPlay.addEventListener('click', function () {
    // Retirer le message d'erreur
    elMsgError.textContent = "";

    if (elInputNbJoueur.value > 0 && elInputNbJoueur.value < 5) {
        // Récupérer le nombre de joueur
        let nbJoueur = elInputNbJoueur.value;
        elInputNbJoueur.value = "";

        // Nettoyer l'espace pour le prochain panel
        if (elFormPanel.nextElementSibling.classList.contains('hidden')) {
            elFormPanel.nextElementSibling.classList.remove('hidden');
            elFormPanel.classList.add('hidden');
        }

        nbGames++
        // Lancer le jeu
        new Board(nbJoueur, elPlayerPanel, nbGames);
    }
    else {
        elMsgError.textContent = "Choisir de 1 à 4 joueurs";
    }
});