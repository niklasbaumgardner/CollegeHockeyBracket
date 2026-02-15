import { NikElement } from "./nik-element.mjs";
import { html } from "lit";
import { StandingsGrid } from "./nb-standings-grid.mjs";
import "./nb-delete-group-bracket.mjs";
import * as agGrid from "./agGrid.mjs";
import "./nb-bracket-column.mjs";

class MyGroupBracketActions extends NikElement {
  static properties = {
    bracket: { type: Object },
    group: { type: Object },
  };

  handleRemoveFromGroupClick() {
    if (!this.removeFromGroupModal) {
      this.removeFromGroupModal = document.createElement(
        "nb-delete-group-bracket",
      );
      this.removeFromGroupModal.bracket = this.bracket;
      this.removeFromGroupModal.group = this.group;
      document.body.appendChild(this.removeFromGroupModal);
    }

    this.removeFromGroupModal.show();
  }

  render() {
    return html`<div class="flex w-full h-full">
      <wa-button
        size="small"
        variant="danger"
        appearance="outlined"
        @click=${this.handleRemoveFromGroupClick}
        >Remove From Group</wa-button
      >
    </div>`;
  }
}
customElements.define("nb-my-group-bracket-actions", MyGroupBracketActions);

export class MyGroupBracketsGrid extends StandingsGrid {
  useSafeName = false;

  static properties = {
    group: { type: Object },
    brackets: {
      type: Object,
    },
  };

  /**
   * It doesn't matter if bad names appear on my_brackets page
   */
  cleanBracketNames() {} // Do nothing

  get defaultBracketColumnWidth() {
    return 250;
  }

  createDataGrid() {
    if (!this.brackets.length) {
      return;
    }

    for (let bracket of this.brackets) {
      bracket.rank = bracket.group_bracket?.group_rank;
    }

    const columnDefs = [];

    if (!CAN_EDIT_BRACKET) {
      columnDefs.push({
        field: "rank",
      });
    }

    columnDefs.push({
      field: "name",
      headerName: this.headerName,
      autoHeight: true,
      cellRenderer: (param) => {
        let ele = document.createElement("nb-my-bracket-column");
        ele.bracket = param.data;
        return ele;
      },
    });

    if (CAN_EDIT_BRACKET) {
      columnDefs.push({
        field: "actions",
        cellRenderer: (param) => {
          let ele = document.createElement("nb-my-group-bracket-actions");
          ele.bracket = param.data;
          ele.group = this.group;
          return ele;
        },
        cellClass: "flex! items-center justify-content-start",
      });
    } else {
      columnDefs.push(
        { field: "points" },
        { field: "max_points", headerName: "Max" },
        { field: "round_one_points", headerName: "R1" },
        { field: "round_two_points", headerName: "R2" },
        { field: "round_three_points", headerName: "R3" },
        { field: "round_four_points", headerName: "R4" },
      );
    }

    const gridOptions = {
      columnDefs,
      rowData: this.brackets,
      ...this.gridOptions,
    };
    this.dataGrid = agGrid.createGrid(this.standingsGridEl, gridOptions);
  }
}

customElements.define("nb-my-group-brackets-grid", MyGroupBracketsGrid);
