import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import profanityCleaner from "https://cdn.jsdelivr.net/npm/profanity-cleaner@0.0.3/+esm";

export class StandingsGrid extends NikElement {
  #pageSizeKey = "agGridPaginationPageSize";

  static properties = {
    brackets: {
      type: Object,
    },
    theme: {
      type: String,
    },
    headerName: { type: String },
  };

  constructor() {
    super();

    this.headerName = "Brackets";
    this.useSafeName = true;
  }

  static queries = {
    standingsGridEl: "#standingsGrid",
  };

  get localStorage() {
    if (!this._localStorage) {
      this._localStorage = window.localStorage;
    }

    return this._localStorage;
  }

  get storedPageSize() {
    return this.localStorage.getItem(this.#pageSizeKey) ?? 25;
  }

  get defaultBracketColumnWidth() {
    return 256;
  }

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
            minWidth: this.defaultBracketColumnWidth,
            flex: 1,
          },
          { colId: "actions", minWidth: 208 },
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

  cleanBracketNames() {
    for (let bracket of this.brackets) {
      bracket.safeName = profanityCleaner.clean(bracket.name, {
        keepFirstAndLastChar: true,
      });
    }
  }

  firstUpdated() {
    this.init();
  }

  async init() {
    await this.updateComplete;

    this.cleanBracketNames();
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
        headerName: this.headerName,
        autoHeight: true,
        valueGetter: (param) => {
          return param.data.safeName;
        },
        cellRenderer: (param) => {
          let bracket = param.data;
          if (bracket.winner) {
            return `<div class="d-flex flex-column gap-2 my-1">
              <a
                class="d-block w-100 h-100 text-decoration-none"
                href="${bracket.url}"
                ><div class="standings-row">
                  ${this.getImageElement(bracket.winner_team)}
                  <div class="name-cell">
                    <span
                      class="standings-bracket-name text-decoration-underline"
                      ><span>${bracket.safeName}</span></span
                    ><span class="standings-username"
                      >${bracket.user.username}</span
                    >
                  </div>
                </div></a
              >
            </div>`;
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
      pagination: true,
      paginationPageSize: this.storedPageSize,
      paginationPageSizeSelector: [25, 50, 75, 100],
      onPaginationChanged: (event) => this.handlePaginationChangedEvent(event),
    };
    this.dataGrid = agGrid.createGrid(this.standingsGridEl, gridOptions);
  }

  handlePaginationChangedEvent(event) {
    if (event.newPageSize) {
      this.localStorage.setItem(
        this.#pageSizeKey,
        this.dataGrid.paginationGetPageSize()
      );
    }
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
    this.standingsGridEl?.classList.toggle(
      "ag-theme-alpine-dark",
      theme === "dark"
    );
    this.standingsGridEl?.classList.toggle(
      "ag-theme-alpine",
      theme === "light"
    );
  }

  render() {
    if (!this.brackets.length) {
      return null;
    }

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
