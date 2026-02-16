import { NikElement } from "./nik-element.mjs";
import { html } from "lit";
import { StandingsGrid } from "./nb-standings-grid.mjs";
import "./nb-delete-bracket.mjs";
import "./nb-add-bracket-to-group.mjs";
import * as agGrid from "./agGrid.mjs";
import "./nb-bracket-column.mjs";
import "./nb-group-bracket-details.mjs";

class MyBracketActions extends NikElement {
  static properties = {
    bracket: { type: Object },
    groups: { type: Object },
  };

  handleJoinGroupClick() {
    // show groups?
    if (!this.joinGroupModal) {
      this.joinGroupModal = document.createElement("nb-add-bracket-to-group");
      this.joinGroupModal.bracket = this.bracket;
      this.joinGroupModal.groups = this.groups;
      document.body.appendChild(this.joinGroupModal);
    }

    this.joinGroupModal.show();
  }

  handleDeleteClick() {
    if (!this.deleteBracketModal) {
      this.deleteBracketModal = document.createElement("nb-delete-bracket");
      this.deleteBracketModal.bracket = this.bracket;
      document.body.appendChild(this.deleteBracketModal);
    }

    this.deleteBracketModal.show();
  }

  render() {
    return html`<div class="wa-cluster">
      <wa-button
        size="small"
        variant="brand"
        appearance="outlined"
        @click=${this.handleJoinGroupClick}
        >Add To Group</wa-button
      ><wa-button
        size="small"
        variant="danger"
        appearance="outlined"
        @click=${this.handleDeleteClick}
        >Delete</wa-button
      >
    </div>`;
  }
}
customElements.define("nb-my-bracket-actions", MyBracketActions);

export class MyBracketsGrid extends StandingsGrid {
  static properties = { groups: { type: Object } };

  constructor() {
    super();

    this.useSafeName = false;
  }

  get canCreateBracket() {
    return (
      CAN_EDIT_BRACKET && this.year >= CURRENT_YEAR && this.brackets.length > 5
    );
  }

  get canEditThisYearsBrackets() {
    return CAN_EDIT_BRACKET && this.year >= CURRENT_YEAR;
  }

  updateData(brackets, groups, year) {
    this.dataGrid.destroy();

    this.brackets = brackets;
    this.groups = groups;
    this.year = year;

    this.createDataGrid();
  }

  /**
   * It doesn't matter if bad names appear on my_brackets page
   */
  cleanBracketNames() {} // Do nothing

  createDataGrid() {
    if (!this.brackets.length) {
      return;
    }

    const columnDefs = [];

    if (!this.canEditThisYearsBrackets) {
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

    if (this.canEditThisYearsBrackets) {
      columnDefs.push({
        field: "actions",
        cellRenderer: (param) => {
          let ele = document.createElement("nb-my-bracket-actions");
          ele.bracket = param.data;
          ele.groups = this.groups;
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

customElements.define("nb-my-brackets-grid", MyBracketsGrid);
