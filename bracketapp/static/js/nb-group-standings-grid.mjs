import { StandingsGrid } from "./nb-standings-grid.mjs";

export class GroupStandingsGrid extends StandingsGrid {
  createDataGrid() {
    for (let bracket of this.brackets) {
      bracket.rank = bracket.group_bracket?.group_rank;
    }

    super.createDataGrid();
  }
}

customElements.define("nb-group-standings-grid", GroupStandingsGrid);
