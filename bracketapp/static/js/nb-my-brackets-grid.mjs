import { StandingsGrid } from "./nb-standings-grid.mjs";

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

  createDataGrid() {
    const rowData = [];
    for (let data of this.brackets) {
      rowData.push(data);
    }

    if (CAN_EDIT_BRACKET && rowData.length < 5) {
      rowData.push({
        id: -1,
      });
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
        if (param.data.id === -1) {
          return `<sl-button href="${NEW_BRACKET_LINK}" variant="primary"
            >Create new bracket</sl-button
          >`;
        }
        return `<a class="d-block w-100 h-100" href=${param.data.url}
          ><div class="standings-row">
            ${this.getImageElement(param.data.winner_team)}
            <div class="name-cell">
              <span class="standings-bracket-name"
                ><span>${param.value}</span></span
              ><span class="standings-username"
                >${param.data.user.username}</span
              >
            </div>
          </div></a
        >`;
      },
    });

    if (CAN_EDIT_BRACKET) {
      columnDefs.push({
        field: "actions",
        cellRenderer: (params) => {
          let button = document.createElement("sl-button");
          button.variant = "danger";
          button.size = "small";
          button.outline = true;
          button.textContent = "Delete";
          button.addEventListener("click", () =>
            this.handleDeleteClick(params.data)
          );
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
