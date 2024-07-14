import { DomGrid } from "./DomGrid.js";
import { Grid } from "./Grid.js";

const rows = 50;
const cols = 100;

const grid = new Grid(rows, cols);
const domGrid = new DomGrid(grid);