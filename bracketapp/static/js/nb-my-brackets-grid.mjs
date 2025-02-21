import { NikElement } from "./customElement.mjs";
import { html } from "./imports.mjs";
import { StandingsGrid } from "./nb-standings-grid.mjs";

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
    return html`<sl-card class="group-card"
      ><a
        class="d-flex align-items-center gap-2 text-decoration-none"
        href="${groupBracket.group.url}"
      >
        <sl-icon class="trophy" name="trophy"></sl-icon>
        <div class="d-flex flex-column group-name">
          <span class="text-decoration-underline"
            >${groupBracket.group.name}</span
          ><span class="rank">Rank: ${groupBracket.group_rank}</span>
        </div>
      </a></sl-card
    >`;
  }

  groupsTemplate() {
    if (!this.bracket.group_brackets.length) {
      return null;
    }

    return html`<sl-details
      class="my-brackets-groups my-2"
      summary="Groups (${this.bracket.group_brackets.length})"
      ><div class="d-flex flex-wrap gap-2">
        ${this.bracket.group_brackets.map((gb) => this.groupTemplate(gb))}
      </div></sl-details
    >`;
  }

  groupButtonsTemplate() {
    if (!CAN_EDIT_BRACKET) {
      return null;
    }

    return html`<div class="d-flex w-100 justify-content-evenly my-2">
      <sl-button size="small" @click=${this.handleCreateGroupClick}
        >Create group</sl-button
      ><sl-button size="small">Join group</sl-button>
    </div>`;
  }

  render() {
    if (this.bracket.id === -1) {
      return html`<sl-button href="${NEW_BRACKET_LINK}" variant="primary"
        >Create new bracket</sl-button
      >`;
    }
    return html`<a
        class="d-block w-100 h-100 text-decoration-none py-2"
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
      ${this.groupsTemplate()}${this.groupButtonsTemplate()}`;
  }
}
customElements.define("nb-my-bracket-element", MyBracketElement);

export class MyBracketsGrid extends StandingsGrid {
  handleDeleteClick(bracket) {
    let deleteBracketEl = this.deleteBracketModals[bracket.id];
    if (!deleteBracketEl) {
      deleteBracketEl = document.createElement("delete-bracket-modal");
      deleteBracketEl.bracket = bracket;
      document.body.appendChild(deleteBracketEl);

      this.deleteBracketModals[bracket.id] = deleteBracketEl;
    }

    deleteBracketEl.show();
  }

  createButton(options) {
    let button = document.createElement("sl-button");
    for (let [optionName, value] of Object.entries(options)) {
      if (optionName === "click") {
        button.addEventListener("click", value);
      }
      button[optionName] = value;
    }
    return button;
  }

  createDataGrid() {
    const rowData = [];
    for (let data of this.brackets) {
      rowData.push(data);
    }

    // if (CAN_EDIT_BRACKET && rowData.length < 5) {
    //   rowData.push({
    //     id: -1,
    //   });
    // }

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
        cellRenderer: (params) => {
          let button = this.createButton({
            variant: "danger",
            size: "small",
            outline: true,
            textContent: "Delete",
            click: () => this.handleDeleteClick(params.data),
          });

          return button;
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
