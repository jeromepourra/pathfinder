import { Cell } from "./Cell.js";

export class Grid {

    /** @type {number} */
    rows;

    /** @type {number} */
    cols;

    /** @type {Array<Array<Cell>>} */
    cells;

    /**
     * 
     * @param {number} rows 
     * @param {number} cols 
     */
    constructor(rows, cols) {

        this.rows = rows;
        this.cols = cols;
        this.cells = new Array();

        for (let y = 0; y < rows; y++) {
            this.cells.push(new Array());
            for (let x = 0; x < cols; x++) {
                this.cells[y].push(new Cell(x, y));
            }
        }

    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @returns {Cell}
     */
    getCell(x, y) {
        return this.cells[y][x];
    }

    /** @returns {Array<Array<Cell>>} */
    getWalkableCells() {
        return this.cells.map(row => 
            row.filter(cell => 
                cell.walkable === true
            )
        );
    }

}
