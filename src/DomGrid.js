import { Grid } from "./Grid.js";

export class DomGrid {

    /** @type {Grid} */
    grid;

    /** @type {HTMLTableElement} */
    tableElement;

    /** @type {number} */
    clientX;

    /** @type {number} */
    clientY;

    /** @type {boolean} */
    canDrag;

    /** @type {boolean} */
    hasDrag;

    /**
     * 
     * @param {Grid} grid 
     */
    constructor(grid) {
        this.grid = grid;
        this.tableElement = document.querySelector("#grid");
        this.clientX = 0;
        this.clientY = 0;
        this.canDrag = false;
        this.hasDrag = false;
        this.create();
    }

    /**
     * @returns {void}
     */
    create() {

        this.grid.getCells().forEach((row) => {

            const rowElement = document.createElement("tr");
            this.tableElement.append(rowElement);

            row.forEach((cell) => {

                const cellElement = document.createElement("td");

                if (cell.walkable) {
                    cellElement.classList.add("walkable");
                } else {
                    cellElement.classList.add("unwalkable");
                }

                cellElement.dataset.x = cell.getX().toString();
                cellElement.dataset.y = cell.getY().toString();
                rowElement.append(cellElement);

            });

        });

        this.listenEvents();

    }

    listenEvents() {

        this.tableElement.addEventListener("mousedown", (event) => {

            // Activation du drag de la table
            this.canDrag = true;

            // Mise à jour des positions de départ
            this.clientX = event.clientX - this.tableElement.offsetLeft;
            this.clientY = event.clientY - this.tableElement.offsetTop;

        });

        window.addEventListener("mouseup", () => {

            if (!this.hasDrag) {
                
                // L'event est considéré comme un click
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
                const minLeft = this.tableElement.parentElement.clientWidth - this.tableElement.clientWidth;
                const minTop = this.tableElement.parentElement.clientHeight - this.tableElement.clientHeight;

                // Calcul de la nouvelle position
                let left = event.clientX - this.clientX;
                let top = event.clientY - this.clientY;

                // Réajustement des positions
                left = Math.min(maxLeft, left);
                left = Math.max(minLeft, left);
                top = Math.min(maxTop, top);
                top = Math.max(minTop, top);

                // Application de la nouvelle position
                this.tableElement.style.left = left + 'px';
                this.tableElement.style.top = top + 'px';

                // Mise à jour des positions de départ
                this.clientX = event.clientX - this.tableElement.offsetLeft;
                this.clientY = event.clientY - this.tableElement.offsetTop;

            }

        });

    }

}
