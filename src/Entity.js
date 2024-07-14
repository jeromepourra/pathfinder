import { Grid } from "./Grid.js";

export class Entity {

    /** @type {Grid} */
    #grid;

    /** @type {{x: number, y: number}} */
    #start;

    /** @type {{x: number | null, y: number | null}} */
    #dest;

    /**
     * 
     * @param {Grid} grid 
     */
    constructor(grid) {

        this.#grid = grid;

        this.#start = {
            x: null,
            y: null
        };

        this.#dest = {
            x: null,
            y: null
        };

    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    setStart(x, y) {
        this.#start.x = x;
        this.#start.y = y;
    }

    /** @returns {{x: number, y: number}} */
    getStart() {
        return this.#start;
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    setDest(x, y) {
        this.#dest.x = x;
        this.#dest.y = y;
    }

    /** @returns {{x: number, y: number}} */
    getDest() {
        return this.#dest;
    }

}