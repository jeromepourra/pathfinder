import { Cell } from "./Cell.js";

export class PathfindingNeighbor {

    /** @type {Cell} */
    #cell; // Current cell

    /** @type {number} */
    #direction; // Direction from parent

    /**
     * 
     * @param {Cell} cell 
     * @param {number | null} direction
     */
    constructor(cell, direction) {
        this.#cell = cell;
        this.#direction = direction;
    }

    /** @returns {Cell} */
    get cell() {
        return this.#cell;
    }

    /** @returns {number | null} */
    get direction() {
        return this.#direction;
    }

}