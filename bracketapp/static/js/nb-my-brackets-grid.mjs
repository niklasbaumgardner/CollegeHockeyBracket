import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import { StandingsGrid } from "./nb-standings-grid.mjs";
import { DeleteBracketModal } from "./nb-delete-bracket-modal.mjs";
import { JoinGroupModal } from "./nb-join-group-modal.mjs";

class MyBracketElement extends NikElement {
  static properties = {
    bracket: { type: Object },
  };

  handleCreateGroupClick() {
    document.dispatchEvent(new CustomEvent("CreateNewGroup"));
  }

  getImageElement(winner_team) {
    if (!winner_team) {
      return null;
    }

    return html`<img
      class="standings-img"
      src="${winner_team.team.icon_path}"
      alt="${winner_team.team.name}"
    />`;
  }

  groupTemplate(groupBracket) {
    return html`<wa-card class="group-card"
      ><a
        class="d-flex align-items-center gap-2 text-decoration-none"
        href="${groupBracket.group.url}"
      >
        <wa-icon class="trophy" name="trophy"></wa-icon>
        <div class="d-flex flex-column group-name">
          <span class="text-decoration-underline"
            >${groupBracket.group.name}</span
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
      ><div class="d-flex flex-wrap gap-2">
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
    return html`<div class="d-flex flex-column gap-2 my-2">
      <a
        class="d-block w-100 h-100 text-decoration-none"
        href=${this.bracket.url}
        ><div class="standings-row">
          ${this.getImageElement(this.bracket.winner_team)}
          <div class="name-cell">
            <span class="standings-bracket-name text-decoration-underline"
              ><span>${this.bracket.name}</span></span
            ><span class="standings-username"
              >${this.bracket.user.username}</span
            >
          </div>
        </div></a
      >
      ${this.groupsTemplate()}
    </div>`;
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
    return html`<div class="d-flex gap-3">
      <wa-button size="small" @click=${this.handleJoinGroupClick}
        >Add To Group</wa-button
      ><wa-button
        size="small"
        variant="danger"
        outline
        @click=${this.handleDeleteClick}
        >Delete</wa-button
      >
    </div>`;
  }
}
customElements.define("nb-my-bracket-actions", MyBracketActions);

export class MyBracketsGrid extends StandingsGrid {
  static properties = { groups: { type: Object } };

  createDataGrid() {
    const rowData = [];
    for (let data of this.brackets) {
      rowData.push(data);
    }

    if (!rowData.length) {
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
      headerName: "Brackets",
      autoHeight: true,
      colSpan: (params) => {
        let id = params.data.id;
        if (id === -1) {
          return 2;
        } else {
          return 1;
        }
      },
      cellClass: (params) => {
        let id = params.data.id;
        if (id === -1) {
          return "nb-center";
        }
      },
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
        { field: "r1" },
        { field: "r2" },
        { field: "r3" },
        { field: "r4" }
      );
    }

    const gridOptions = {
      columnDefs,
      rowData,
      ...this.defaultGridOptions,
    };
    this.dataGrid = agGrid.createGrid(this.standingsGridEl, gridOptions);
  }
}

customElements.define("nb-my-brackets-grid", MyBracketsGrid);
