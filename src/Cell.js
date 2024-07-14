export class Cell {

    /** 
     * Probability for a cell to be walkable
     * @type {number} 
     */
    static WALKABLE_PROBA = 0.2;

    /** @type {number} */
    #x;

    /** @type {number} */
    #y;

    /** @type {number} */
    #elevation; // Si besoin on fait de la 3D :)

    /** @type {boolean} */
    #walkable;

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
        this.#elevation = 0;
        this.#walkable = this.#randomizeWalkable();
    }

    /** @returns {number} */
    getX() {
        return this.#x;
    }

    /** @returns {number} */
    getY() {
        return this.#y;
    }

    isWalkable() {
        return this.#walkable;
    }

    #randomizeWalkable() {
        return Math.random() > Cell.WALKABLE_PROBA;
    }

}
