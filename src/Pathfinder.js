import { Grid } from "./Grid.js";
import { Cell } from "./Cell.js";
import { Entity } from "./Entity.js";
import { PathfindingNode } from "./PathfindingNode.js";

export class Pathfinder {

    static MAX_ITERATIONS = 1000;
    static DEBUG = true;

    /** @type {Grid} */
    #grid;

    /** @type {Entity} */
    #entity;

    /**
     * 
     * @param {Grid} grid 
     * @param {Entity} entity 
     */
    constructor(grid, entity) {
        this.#grid = grid;
        this.#entity = entity;
    }

    // Need async to debug the pathfinding
    async findPath() {

        const start = this.#entity.getStart();
        const dest = this.#entity.getDest();

        const startCell = this.#grid.getCell(start.x, start.y);
        const destCell = this.#grid.getCell(dest.x, dest.y);

        /** @type {{[key: string]: PathfindingNode}} */
        const wl = {}; // White list

        /** @type {{[key: string]: PathfindingNode}} */
        const bl = {}; // Black list

        const startKey = `${start.x}:${start.y}`;
        const startNode = new PathfindingNode(
            startCell,
            null,
            0,
            0,
            this.#distance(startCell, destCell)
        );

        wl[startKey] = startNode;

        while (Object.keys(wl).length > 0) {

            let key = null;
            let minCost = Infinity;

            for (const k in wl) {
                const node = wl[k];
                if (node.getCost() < minCost) {
                    key = k;
                    minCost = node.getCost();
                }
            }

            const current = wl[key];
            delete wl[key];
            bl[key] = current;

            this.#debugRemoveWl(current.getCell());
            this.#debugAddBl(current.getCell());

            if (current.getCell() === destCell) {
                return this.#reconstructPath(current);
            }

            const neighbors = this.#getNeighbors(current);
            neighbors.forEach(async (neighbor) => {

                let nX = neighbor.getX();
                let nY = neighbor.getY();
                let nKey = `${nX}:${nY}`;

                if (!neighbor.isWalkable()) {
                    return;
                }

                if (nKey in bl) {
                    // Already visited
                    return;
                }

                // if (nKey in bl && bl[nKey].getCost() > current.getCost()) {
                //     alert("ici");
                //     wl[nKey] = bl[nKey];
                //     delete bl[nKey];
                //     return;
                // }

                if (!(nKey in wl)) {
                    const nNode = new PathfindingNode(
                        neighbor,
                        current,
                        current.getIteration() + 1,
                        this.#distance(neighbor, startCell),
                        this.#distance(neighbor, destCell)
                    );
                    wl[nKey] = nNode;
                    this.#debugAddWl(neighbor);
                }

                if (Pathfinder.DEBUG) {
                    await new Promise((resolve) => setTimeout(resolve, 1));
                }

            });

            if (Pathfinder.DEBUG) {
                await new Promise((resolve) => setTimeout(resolve, 1));
            }

            console.log("Wl:", wl, "Bl:", bl);

        }

        return [];

    }

    /**
     * 
     * @param {PathfindingNode} current 
     * @returns 
     */
    #getNeighbors(current) {

        /** @type {Array<Cell>} */
        const neighbors = new Array();

        const directions = [
            { x: -1, y: -1 },
            { x: 0, y: -1 },
            { x: 1, y: -1 },
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: -1, y: 1 },
            { x: 0, y: 1 },
            { x: 1, y: 1 }
        ];

        directions.forEach((direction) => {

            const cell = current.getCell();
            const x = cell.getX() + direction.x;
            const y = cell.getY() + direction.y;

            if (x >= 0 && x < this.#grid.getCols() && y >= 0 && y < this.#grid.getRows()) {
                neighbors.push(this.#grid.getCell(x, y));
            }

        });

        return neighbors;

    }

    /**
     * 
     * @param {Cell} cell1 
     * @param {Cell} cell2 
     * @returns {number}
     */
    #distance(cell1, cell2) {
        return Math.sqrt(Math.pow(Math.abs(cell1.getX() - cell2.getX()), 2) + Math.pow(Math.abs(cell1.getY() - cell2.getY()), 2));
    }

    /**
     * 
     * @param {PathfindingNode} node
     */
    async #reconstructPath(node) {

        /** @type {Array<PathfindingNode>} */
        const nodes = new Array();
        nodes.push(node);
        this.#debugAddWalk(node.getCell());
        await new Promise((resolve) => setTimeout(resolve, 1));

        while(node.getParent() !== null) {
            node = node.getParent();
            nodes.push(node);
            this.#debugAddWalk(node.getCell());
            await new Promise((resolve) => setTimeout(resolve, 1));
        }

    }

    /**
     * @param {Cell} cell 
     */
    #debugAddWl(cell) {
        if (Pathfinder.DEBUG) {
            const x = cell.getX();
            const y = cell.getY();
            /** @type {HTMLTableCellElement} */
            const cellElement = document.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
            cellElement.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
        }
    }

    /**
     * @param {Cell} cell 
     */
    #debugRemoveWl(cell) {
        if (Pathfinder.DEBUG) {
            const x = cell.getX();
            const y = cell.getY();
            /** @type {HTMLTableCellElement} */
            const cellElement = document.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
            cellElement.style.backgroundColor = "white";
        }
    }

    /**
     * @param {Cell} cell 
     */
    #debugAddBl(cell) {
        if (Pathfinder.DEBUG) {
            const x = cell.getX();
            const y = cell.getY();
            /** @type {HTMLTableCellElement} */
            const cellElement = document.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
            cellElement.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        }
    }

    /**
     * @param {Cell} cell 
     */
    #debugRemoveBl(cell) {
        if (Pathfinder.DEBUG) {
            const x = cell.getX();
            const y = cell.getY();
            /** @type {HTMLTableCellElement} */
            const cellElement = document.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
            cellElement.style.backgroundColor = "white";
        }
    }

    /**
     * @param {Cell} cell 
     */
    #debugAddWalk(cell) {
        if (Pathfinder.DEBUG) {
            const x = cell.getX();
            const y = cell.getY();
            /** @type {HTMLTableCellElement} */
            const cellElement = document.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
            cellElement.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
        }
    }

}