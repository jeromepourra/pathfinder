import { Grid } from "./Grid.js";

export class Entity {

    /** @type {Grid} */
    grid;

    /** @type {{x: number, y: number}} */
    start;

    /** @type {{x: number | null, y: number | null}} */
    dest;

    /**
     * 
     * @param {Grid} grid 
     */
    constructor(grid) {

        this.grid = grid;

        this.start = {
            x: null,
            y: null
        };

        this.dest = {
            x: null,
            y: null
        };

    }

}