import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import { StandingsGrid } from "./nb-standings-grid.mjs";
import { DeleteBracketModal } from "./nb-delete-bracket-modal.mjs";
import { JoinGroupModal } from "./nb-add-bracket-to-group-modal.mjs";
import * as agGrid from "./agGrid.bundle.mjs";
import { MyBracketColumn } from "./nb-my-bracket-column.mjs";
import "./nb-my-bracket-column.mjs";

class MyBracketElement extends MyBracketColumn {
  handleCreateGroupClick() {
    document.dispatchEvent(new CustomEvent("CreateNewGroup"));
  }

  groupTemplate(groupBracket) {
    return html`<wa-card class="group-card"
      ><a
        class="flex items-center gap-(--wa-space-2xs) no-underline"
        href="${groupBracket.group.url}"
      >
        <wa-icon class="trophy" name="trophy"></wa-icon>
        <div class="flex flex-col group-name">
          <span class="group-name underline">${groupBracket.group.name}</span
          ><span class="rank">Rank: ${groupBracket.group_rank ?? "--"}</span>
        </div>
      </a></wa-card
    >`;
  }

  groupsTemplate() {
    if (!this.bracket.group_brackets.length) {
      return null;
    }

    return html`<wa-details
      class="my-brackets-groups"
      summary="Groups (${this.bracket.group_brackets.length})"
      ><div class="wa-cluster flex-wrap gap-(--wa-space-xs)">
        ${this.bracket.group_brackets.map((gb) => this.groupTemplate(gb))}
      </div></wa-details
    >`;
  }

  render() {
    if (this.bracket.id === -1) {
      return html`<wa-button href="${NEW_BRACKET_LINK}" variant="primary"
        >Create new bracket</wa-button
      >`;
    }
    return super.render();
  }
}
customElements.define("nb-my-bracket-element", MyBracketElement);

class MyBracketActions extends NikElement {
  static properties = {
    bracket: { type: Object },
    groups: { type: Object },
  };

  handleJoinGroupClick() {
    // show groups?
    if (!this.joinGroupModal) {
      this.joinGroupModal = document.createElement("nb-join-group-modal");
      this.joinGroupModal.bracket = this.bracket;
      this.joinGroupModal.groups = this.groups;
      document.body.appendChild(this.joinGroupModal);
    }

    this.joinGroupModal.show();
  }

  handleDeleteClick() {
    if (!this.deleteBracketModal) {
      this.deleteBracketModal = document.createElement(
        "nb-delete-bracket-modal"
      );
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

  /**
   * It doesn't matter if bad names appear on my_brackets page
   */
  cleanBracketNames() {} // Do nothing

  createDataGrid() {
    if (!this.brackets.length) {
      return;
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
        let ele = document.createElement("nb-my-bracket-element");
        ele.bracket = param.data;
        return ele;
      },
    });

    if (CAN_EDIT_BRACKET) {
      columnDefs.push({
        field: "actions",
        cellRenderer: (param) => {
          let ele = document.createElement("nb-my-bracket-actions");
          ele.bracket = param.data;
          ele.groups = this.groups;
          return ele;
        },
        cellClass: "nb-center justify-content-start",
      });
    } else {
      columnDefs.push(
        { field: "points" },
        { field: "max_points", headerName: "Max" },
        { field: "round_one_points", headerName: "R1" },
        { field: "round_two_points", headerName: "R2" },
        { field: "round_three_points", headerName: "R3" },
        { field: "round_four_points", headerName: "R4" }
      );
    }

    const gridOptions = {
      columnDefs,
      rowData: this.brackets,
      ...this.gridOptions,
    };
    console.log(gridOptions);
    this.dataGrid = agGrid.createGrid(this.standingsGridEl, gridOptions);
  }
}

customElements.define("nb-my-brackets-grid", MyBracketsGrid);
