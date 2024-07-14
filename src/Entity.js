import { Grid } from "./Grid.js";

export class Entity {

    /** @type {Grid} */
    #grid;

    /** @type {{x: number, y: number}} */
    #start;

    /** @type {{x: number | null, y: number | null}} */
    #end;

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

        this.#end = {
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
    setEnd(x, y) {
        this.#end.x = x;
        this.#end.y = y;
    }

    /** @returns {{x: number, y: number}} */
    getEnd() {
        return this.#end;
    }

}