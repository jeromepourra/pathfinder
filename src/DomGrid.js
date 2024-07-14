import { Grid } from "./Grid.js";

export class DomGrid {

    /** @type {HTMLTableElement} */
    static tableElement = document.querySelector("#grid");

    /**
     * 
     * @param {Grid} grid 
     * @returns {void}
     */
    static create(grid) {

        grid.getCells().forEach((row) => {

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

    static listenEvents() {

        /** @type {number} */
        let clientX = 0;

        /** @type {number} */
        let clientY = 0;

        /** @type {boolean} */
        let canDrag = false;

        /** @type {boolean} */
        let hasDrag = false;

        this.tableElement.addEventListener("mousedown", (event) => {

            // Activation du drag de la table
            canDrag = true;

            // Mise à jour des positions de départ
            clientX = event.clientX - this.tableElement.offsetLeft;
            clientY = event.clientY - this.tableElement.offsetTop;

        });

        window.addEventListener("mouseup", () => {

            if (!hasDrag) {
                // L'event est considéré comme un click
            }

            canDrag = false;
            hasDrag = false;

        });

        window.addEventListener("mousemove", (event) => {

            if (canDrag) {

                // L'event ne sera pas considéré comme un click
                hasDrag = true;

                // Limitation des positions de la table
                const maxLeft = 0;
                const maxTop = 0;
                const minLeft = this.tableElement.parentElement.clientWidth - this.tableElement.clientWidth;
                const minTop = this.tableElement.parentElement.clientHeight - this.tableElement.clientHeight;

                // Calcul de la nouvelle position
                let left = event.clientX - clientX;
                let top = event.clientY - clientY;

                // Réajustement des positions
                left = Math.min(maxLeft, left);
                left = Math.max(minLeft, left);
                top = Math.min(maxTop, top);
                top = Math.max(minTop, top);

                // Application de la nouvelle position
                this.tableElement.style.left = left + 'px';
                this.tableElement.style.top = top + 'px';

                // Mise à jour des positions de départ
                clientX = event.clientX - this.tableElement.offsetLeft;
                clientY = event.clientY - this.tableElement.offsetTop;

            }

        });

    }

}
