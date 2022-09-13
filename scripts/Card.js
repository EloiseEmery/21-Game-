const colorsString = ['Club', 'Diamond', 'Heart', 'Spade']
const numberString = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']
const numberValue = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

export default class Card {
    constructor(color, number) {
        this._colorIdx = color
        this._numberIdx = number
    }

	/**
	 * Récupérer la valeur d'une carte
	 * @returns valeur de la carte
	 */
	getValue() {
		return numberValue[this._numberIdx]
	}

    /**
     * Construit la String pour chaque tirage d'une carte
     * @returns {string} cardString 
     */
    toString() {
        let cardString = numberString[this._numberIdx] + ' of ' + colorsString[this._colorIdx];
        return cardString
    }

    /**
     * Injecter la DOMString de chaque joueur
     * @param {object} elCardList noeud parent dans lequel on injecte la DOMString
     */
    injectionCard(elCardList) {
        let cardDOMString = `<li>${this.toString()}</li>`

        // Injecter la DOMString
        elCardList.insertAdjacentHTML('beforeend', cardDOMString)
    }
}