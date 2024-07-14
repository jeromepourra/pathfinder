import { Cell } from "./Cell.js";

export class PathfindingNode {

    /** @type {Cell} */
    #cell; // Current cell

    /** @type {PathfindingNode | null} */
    #parent; // Parent node

    /** @type {number} */
    #cost; // Cout de déplacement

    /** @type {number} */
    #iteration; // Nombre d'itérations depuis le départ

    /** @type {number} */
    #startDist; // Distance from start

    /** @type {number} */
    #destDist; // Distance to dest

    /**
     * 
     * @param {Cell} cell 
     * @param {PathfindingNode | null} parent
     * @param {number} cost 
     * @param {number} iteration
     * @param {number} startDist 
     * @param {number} destDist 
     */
    constructor(cell, parent, cost, iteration, startDist, destDist) {
        this.#cell = cell;
        this.#parent = parent;
        this.#cost = cost;
        this.#iteration = iteration;
        this.#startDist = startDist;
        this.#destDist = destDist;
    }

    /** @returns {Cell} */
    getCell() {
        return this.#cell;
    }

    /** @returns {PathfindingNode | null} */
    getParent() {
        return this.#parent;
    }

    /** @returns {number} */
    getCost() {
        return this.#cost;
    }

    /** @returns {number} */
    getIteration() {
        return this.#iteration;
    }

    /** @returns {number} */
    getStartDist() {
        return this.#startDist;
    }

    /** @returns {number} */
    getDestDist() {
        return this.#destDist;
    }

}