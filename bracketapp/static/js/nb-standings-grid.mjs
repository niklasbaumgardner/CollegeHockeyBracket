import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

export class StandingsGrid extends NikElement {
  static properties = {
    brackets: {
      type: Object,
    },
    theme: {
      type: String,
    },
  };

  static queries = {
    standingsGridEl: "#standingsGrid",
  };

  get defaultGridOptions() {
    return {
      rowHeight: 50,
      domLayout: "autoHeight",
      suppressCellFocus: true,
      suppressMovableColumns: true,
      autoSizeStrategy: {
        type: "fitGridWidth",
        columnLimits: [
          { colId: "rank", minWidth: 57, maxWidth: 57 },
          {
            colId: "name",
            minWidth: 300,
            flex: 1,
          },
          { colId: "points", minWidth: 75, maxWidth: 75 },
          { colId: "max_points", minWidth: 75, maxWidth: 75 },
          { colId: "r1", minWidth: 57, maxWidth: 57 },
          { colId: "r2", minWidth: 57, maxWidth: 57 },
          { colId: "r3", minWidth: 57, maxWidth: 57 },
          { colId: "r4", minWidth: 57, maxWidth: 57 },
        ],
      },
      defaultColDef: {
        resizable: false,
      },
    };
  }

  firstUpdated() {
    this.init();
  }

  async init() {
    await this.updateComplete;

    this.createDataGrid();
    this.setupThemeWatcher();
  }

  getImageUrl(winner_team) {
    if (!winner_team) {
      return "";
    }

    return winner_team.team.icon_path;
  }

  getImageElement(winner_team) {
    if (!winner_team) {
      return null;
    }

    return `<img
      class="standings-img"
      src="${this.getImageUrl(winner_team)}"
      alt="${winner_team.team.name}"
    />`;
  }

  createDataGrid() {
    if (!this.brackets.length) {
      return;
    }

    const columnDefs = [];

    columnDefs.push(
      {
        field: "rank",
      },
      {
        field: "name",
        headerName: "Brackets",
        cellRenderer: (param) => {
          if (param.data.winner) {
            return `<a class="d-block w-100 h-100 px-3 text-decoration-none" href=${
              param.data.url
            }
              ><div class="standings-row">
                ${this.getImageElement(param.data.winner_team)}
                <div class="name-cell">
                  <span class="standings-bracket-name text-decoration-underline"
                    ><span>${param.value}</span></span
                  ><span class="standings-username"
                    >${param.data.user.username}</span
                  >
                </div>
              </div></a
            >`;
          }

          return `<div class="standings-row">
            <div class="name-cell">
              <span class="standings-bracket-name">${param.value}</span>
              <p class="standings-username"
                >${param.data.user.username}</p
              >
            </div>
          </div>`;
        },
      },
      { field: "points" },
      { field: "max_points", headerName: "Max" }
    );

    if (!CAN_EDIT_BRACKET) {
      {
        columnDefs.push(
          { field: "r1" },
          { field: "r2" },
          { field: "r3" },
          { field: "r4" }
        );
      }
    }

    const gridOptions = {
      columnDefs,
      rowData: this.brackets,
      ...this.defaultGridOptions,
    };
    this.dataGrid = agGrid.createGrid(this.standingsGridEl, gridOptions);
  }

  setupThemeWatcher() {
    this.mutationObserver = new MutationObserver((params) =>
      this.handleThemeChange(params)
    );

    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
    });

    this.handleThemeChange();
  }

  handleThemeChange() {
    let theme = document.documentElement.getAttribute("data-bs-theme");
    this.standingsGridEl.classList.toggle(
      "ag-theme-alpine-dark",
      theme === "dark"
    );
    this.standingsGridEl.classList.toggle("ag-theme-alpine", theme === "light");
  }

  render() {
    return html`<div
      id="standingsGrid"
      style="--ag-grid-size: 4px;"
      class=${this.theme === "dark"
        ? "ag-theme-alpine-dark"
        : "ag-theme-alpine"}
    ></div>`;
  }
}

customElements.define("nb-standings-grid", StandingsGrid);
