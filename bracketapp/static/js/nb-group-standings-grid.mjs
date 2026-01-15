import { StandingsGrid } from "./nb-standings-grid.mjs";

export class GroupStandingsGrid extends StandingsGrid {
  sortBrackets() {
    for (let bracket of this.brackets) {
      bracket.rank = bracket.group_bracket?.group_rank;
    }

    super.sortBrackets();
  }
}

customElements.define("nb-group-standings-grid", GroupStandingsGrid);
