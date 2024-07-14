import { Grid } from "./Grid.js";
import { Cell } from "./Cell.js";
import { Entity } from "./Entity.js";
import { PathfindingNode } from "./PathfindingNode.js";

export class Pathfinder {

    static DEBUG = true;
    static COLOR_DEBUG_WL = "rgba(0, 255, 0, 0.250)";
    static COLOR_DEBUG_BL = "rgba(255, 0, 0, 0.250)";
    static COLOR_DEBUG_PATH = "rgba(0, 0, 255, 0.250)";
    static COLOR_DEBUG_NONE = "white";

    static MAX_MOVEMENT_COST = 1000;
    static DIRECTIONS = [
        { x: -1, y: -1, dir: 0, cost: 1.5 },
        { x: 0, y: -1, dir: 1, cost: 1 },
        { x: 1, y: -1, dir: 2, cost: 1.5 },
        { x: 1, y: 0, dir: 3, cost: 1 },
        { x: 1, y: 1, dir: 4, cost: 1.5 },
        { x: 0, y: 1, dir: 5, cost: 1 },
        { x: -1, y: 1, dir: 6, cost: 1.5 },
        { x: -1, y: 0, dir: 7, cost: 1 }
    ];

    /**
     * 
     * @param {Grid} grid 
     * @param {Entity} entity 
     */
    static async findPath(grid, entity) {

        const start = entity.start;
        const dest = entity.dest;

        const startCell = grid.getCell(start.x, start.y);
        const destCell = grid.getCell(dest.x, dest.y);

        /** @type {{[key: string]: PathfindingNode}} */
        const wl = {}; // White list

        /** @type {{[key: string]: PathfindingNode}} */
        const bl = {}; // Black list

        const key = `${start.x}:${start.y}`;
        const node = new PathfindingNode();
        node.cell = startCell;
        node.parent = null;
        node.g = 0;
        node.v = 0;
        node.h = this.distance(startCell, destCell);
        node.f = node.h;
        node.d = null;

        wl[key] = node;

        while (Object.keys(wl).length > 0) {

            let key = null;
            let minCost = Infinity;

            for (const k in wl) {
                if (wl[k].f < minCost) {
                    key = k;
                    minCost = wl[k].f;
                }
            }

            const current = wl[key];
            delete wl[key];

            if (current.cell === destCell) {
                return this.reconstructPath(current);
            }

            Pathfinder.DIRECTIONS.forEach(direction => {

                const x = current.cell.x + direction.x;
                const y = current.cell.y + direction.y;

                if (x >= 0 && x < grid.cols && y >= 0 && y < grid.rows) {

                    const key = `${x}:${y}`;
                    const cell = grid.getCell(x, y);
                    const levelStep = Math.abs(cell.z - current.cell.z);

                    if (!cell.walkable) {
                        return;
                    }

                    if (levelStep > 1) {
                        return;
                    }

                    let totalCost = current.v + direction.cost + (current.d === direction.dir ? 0 : 0.5);
                    let movementCost = current.g + direction.cost;
                    let existingTotalCost = null;

                    if (key in wl) {
                        existingTotalCost = wl[key].v;
                    } else if (key in bl) {
                        existingTotalCost = bl[key].v;
                    }

                    if ((existingTotalCost === null || existingTotalCost > totalCost) && movementCost <= Pathfinder.MAX_MOVEMENT_COST) {

                        if (key in bl) {
                            delete bl[key];
                            this.debugClear(cell);
                        }

                        const node = new PathfindingNode();
                        node.cell = cell;
                        node.parent = current;
                        node.g = movementCost;
                        node.v = totalCost;
                        node.h = this.distance(cell, destCell);
                        node.f = totalCost + node.h;
                        node.d = direction.dir;

                        wl[key] = node;

                        this.debugWl(node.cell);

                    }


                }

            });

            bl[key] = current;
            this.debugBl(current.cell);
            await this.wait(1);

        }

        return null;

    }

    /**
     * 
     * @param {Cell} cell1 
     * @param {Cell} cell2 
     * @returns {number}
     */
    static distance(cell1, cell2) {
        return Math.sqrt(Math.pow(Math.abs(cell1.x - cell2.x), 2) + Math.pow(Math.abs(cell1.y - cell2.y), 2));
    }

    /**
     * 
     * @param {PathfindingNode} node
     */
    static async reconstructPath(node) {

        /** @type {Array<PathfindingNode>} */
        const nodes = new Array();
        nodes.push(node);
        this.debugPath(node.cell);
        await this.wait(1);

        while (node.parent !== null) {
            node = node.parent;
            nodes.push(node);
            this.debugPath(node.cell);
            await this.wait(1);
        }

        return nodes.reverse();

    }

    /** @param {number} ms */
    static async wait(ms) {
        if (Pathfinder.DEBUG) {
            await new Promise((resolve) => setTimeout(resolve, ms));
        }
    }

    /** @param {Cell} cell */
    static debugClear(cell) {
        this.debugCell(cell, Pathfinder.COLOR_DEBUG_NONE);
    }

    /**
     * @param {Cell} cell 
     */
    static debugWl(cell) {
        this.debugCell(cell, Pathfinder.COLOR_DEBUG_WL);
    }

    /**
     * @param {Cell} cell 
     */
    static debugBl(cell) {
        this.debugCell(cell, Pathfinder.COLOR_DEBUG_BL);
    }

    /**
     * @param {Cell} cell 
     */
    static debugPath(cell) {
        this.debugCell(cell, Pathfinder.COLOR_DEBUG_PATH);
    }

    /** 
     * @param {Cell} cell
     * @param {string} color 
     */
    static debugCell(cell, color) {
        if (Pathfinder.DEBUG) {
            const x = cell.x;
            const y = cell.y;
            /** @type {HTMLTableCellElement} */
            const cellElement = document.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
            cellElement.style.backgroundColor = color;
        }
    }

}