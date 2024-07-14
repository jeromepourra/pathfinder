import { Entity } from "./Entity.js";
import { Grid } from "./Grid.js";

export class DomGrid {

    /** @type {{[key: string]: number}} */
    static MOUSE_BUTTONS = {
        left: 0,
        wheel: 1,
        right: 2
    };

    /** @type {Grid} */
    #grid;

    /** @type {Entity} */
    #entity;

    /** @type {HTMLTableElement} */
    #tableElement;

    /** @type {number} */
    #clientX;

    /** @type {number} */
    #clientY;

    /** @type {boolean} */
    #canDrag;

    /** @type {boolean} */
    #hasDrag;

    /**
     * 
     * @param {Grid} grid 
     * @param {Entity} entity
     */
    constructor(grid, entity) {
        this.#grid = grid;
        this.#entity = entity;
        this.#tableElement = document.querySelector("#grid");
        this.#clientX = 0;
        this.#clientY = 0;
        this.#canDrag = false;
        this.#hasDrag = false;
        this.#create();
    }

    /**
     * @returns {void}
     */
    #create() {

        this.#grid.getCells().forEach((row) => {

            const rowElement = document.createElement("tr");
            this.#tableElement.append(rowElement);

            row.forEach((cell) => {

                const cellElement = document.createElement("td");

                if (cell.isWalkable()) {
                    cellElement.classList.add("walkable");
                } else {
                    cellElement.classList.add("unwalkable");
                }

                cellElement.dataset.x = cell.getX().toString();
                cellElement.dataset.y = cell.getY().toString();
                rowElement.append(cellElement);

            });

        });

        this.#listenEvents();

    }

    #listenEvents() {

        // Désactivation du menu contextuel du navigateur
        document.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });

        // Double click pour définir le point de départ
        this.#tableElement.addEventListener("dblclick", (event) => {

            if (!(event.target instanceof HTMLTableCellElement)) {
                console.info("Dblclick must be on a cell");
                return;
            }

            const cellElement = event.target;
            const startX = parseInt(cellElement.dataset.x);
            const startY = parseInt(cellElement.dataset.y);
            const startCell = this.#grid.getCell(startX, startY);

            if (!startCell.isWalkable()) {
                console.info(`Cell: ${startX}:${startY} is not walkable`);
                return;
            }

            const { x: destX, y: destY } = this.#entity.getDest();

            // Si le point de départ est le même que le point d'arrivée, on ne fait rien
            if (startX === destX && startY === destY) {
                console.info("Start cell is the same as the end cell");
                return;
            }

            this.#removeEntity();
            this.#entity.setStart(startX, startY);
            this.#addEntity(cellElement);

        });

        this.#tableElement.addEventListener("mousedown", (event) => {

            if (event.button === DomGrid.MOUSE_BUTTONS.right) {

                if (!(event.target instanceof HTMLTableCellElement)) {
                    console.info("Right click must be on a cell");
                    return;
                }

                const cellElement = event.target;
                const destX = parseInt(cellElement.dataset.x);
                const destY = parseInt(cellElement.dataset.y);
                const destCell = this.#grid.getCell(destX, destY);

                if (!destCell.isWalkable()) {
                    console.info(`Cell: ${destX}:${destY} is not walkable`);
                    return;
                }

                const { x: startX, y: startY } = this.#entity.getStart();

                // Si le point de départ est le même que le point d'arrivée, on ne fait rien
                if (startX === destX && startY === destY) {
                    console.info("Start cell is the same as the end cell");
                    return;
                }

                this.#removeDestination();
                this.#entity.setDest(destX, destY);
                this.#addDestination(cellElement);

            } else if (event.button === DomGrid.MOUSE_BUTTONS.left) {

                // Activation du drag de la table
                this.canDrag = true;

                // Mise à jour des positions de départ
                this.clientX = event.clientX - this.#tableElement.offsetLeft;
                this.clientY = event.clientY - this.#tableElement.offsetTop;

            }

        });

        window.addEventListener("mouseup", (event) => {

            if (event.button !== DomGrid.MOUSE_BUTTONS.left) {
                return; // On ne fait rien si ce n'est pas un click gauche
            }

            this.canDrag = false;
            this.hasDrag = false;

        });

        window.addEventListener("mousemove", (event) => {

            if (this.canDrag) {

                // L'event ne sera pas considéré comme un click
                this.hasDrag = true;

                // Limitation des positions de la table
                const maxLeft = 0;
                const maxTop = 0;
                const minLeft = this.#tableElement.parentElement.clientWidth - this.#tableElement.clientWidth;
                const minTop = this.#tableElement.parentElement.clientHeight - this.#tableElement.clientHeight;

                // Calcul de la nouvelle position
                let left = event.clientX - this.clientX;
                let top = event.clientY - this.clientY;

                // Réajustement des positions
                left = Math.min(maxLeft, left);
                left = Math.max(minLeft, left);
                top = Math.min(maxTop, top);
                top = Math.max(minTop, top);

                // Application de la nouvelle position
                this.#tableElement.style.left = left + 'px';
                this.#tableElement.style.top = top + 'px';

                // Mise à jour des positions de départ
                this.#clientX = event.clientX - this.#tableElement.offsetLeft;
                this.#clientY = event.clientY - this.#tableElement.offsetTop;

            }

        });

    }

    /**
     * 
     * @param {HTMLTableCellElement} cellElement 
     */
    #addEntity(cellElement) {
        const entityElement = document.createElement("div");
        entityElement.classList.add("entity");
        cellElement.append(entityElement);
    }

    #removeEntity() {

        let { x, y } = this.#entity.getStart();

        if (x !== null || y !== null) {
            const cellElement = this.#tableElement.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
            cellElement.innerHTML = "";
        }

    }

    /**
     * 
     * @param {HTMLTableCellElement} cellElement 
     */
    #addDestination(cellElement) {
        const destinationElement = document.createElement("div");
        destinationElement.classList.add("destination");
        cellElement.append(destinationElement);
    }

    #removeDestination() {

        let { x, y } = this.#entity.getDest();

        if (x !== null || y !== null) {
            const cellElement = this.#tableElement.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
            cellElement.innerHTML = "";
        }

    }

}
