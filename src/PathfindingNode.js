import { Cell } from "./Cell.js";

export class PathfindingNode {

    /** @type {Cell} */
    cell = null; // Current cell

    /** @type {PathfindingNode | null} */
    parent = null; // Parent node

    /** @type {number} */
    g; // Cout de déplacement pour la direction

    /** @type {number} */
    v; // Cout de déplacement total

    /** @type {number} */
    h; // Cout estimé pour se rendre de la case actuelle à la case d'arrivée

    /** @type {number} */
    f; // Cout total

    /** @type {number} */
    d; // Direction

    constructor() {
        this.cell = null;
        this.parent = null;
        this.g = null;
        this.v = null;
        this.h = null;
        this.f = null;
        this.d = null;
    }

}