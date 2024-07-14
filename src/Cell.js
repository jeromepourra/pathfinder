export class Cell {

    /** @type {number}  */
    static WALKABLE_PROBA = 0.3; // Chance qu'une cellule soit marchable

    /** @type {number} */
    x; // Abscisse

    /** @type {number} */
    y; // Ordonnée

    /** @type {number} */
    z; // Altitude

    /** @type {boolean} */
    walkable; // La cellule est elle marchable

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} z
     * @param {boolean} walkable
     */
    constructor(x, y, z = 0, walkable = null) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.walkable = walkable ?? this.randomizeWalkable();
    }

    randomizeWalkable() {
        return Math.random() > Cell.WALKABLE_PROBA;
    }

}
