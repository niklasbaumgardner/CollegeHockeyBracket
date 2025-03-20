import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import { StandingsGrid } from "./nb-standings-grid.mjs";
import { RemoveGroupBracketModal } from "./nb-remove-group-bracket-modal.mjs";

class MyGroupBracketElement extends NikElement {
  static properties = {
    bracket: { type: Object },
  };

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

  render() {
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
    </div>`;
  }
}
customElements.define("nb-my-group-bracket-element", MyGroupBracketElement);

class MyGroupBracketActions extends NikElement {
  static properties = {
    bracket: { type: Object },
    group: { type: Object },
  };

  handleRemoveFromGroupClick() {
    if (!this.removeFromGroupModal) {
      this.removeFromGroupModal = document.createElement(
        "nb-remove-group-bracket-modal"
      );
      this.removeFromGroupModal.bracket = this.bracket;
      this.removeFromGroupModal.group = this.group;
      document.body.appendChild(this.removeFromGroupModal);
    }

    this.removeFromGroupModal.show();
  }

  render() {
    return html`<div class="d-flex gap-3">
      <sl-button size="small" @click=${this.handleRemoveFromGroupClick}
        >Remove From Group</sl-button
      >
    </div>`;
  }
}
customElements.define("nb-my-group-bracket-actions", MyGroupBracketActions);

export class MyGroupBracketsGrid extends StandingsGrid {
  static properties = { group: { type: Object } };

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
      headerName: this.headerName,
      autoHeight: true,
      cellRenderer: (param) => {
        let ele = document.createElement("nb-my-group-bracket-element");
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

customElements.define("nb-my-group-brackets-grid", MyGroupBracketsGrid);
