import { html } from "lit";
import profanityCleaner from "https://cdn.jsdelivr.net/npm/profanity-cleaner@0.0.3/+esm";
import { BaseGrid } from "./nb-base-grid.mjs";
import * as agGrid from "./agGrid.mjs";
import "./nb-bracket-column.mjs";

export class StandingsGrid extends BaseGrid {
  #pageSizeKey = "agGridPaginationPageSize";

  static properties = {
    brackets: {
      type: Object,
    },
    year: {
      type: Number,
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

  get storedPageSize() {
    const storedNumber = parseInt(
      window.localStorage.getItem(this.#pageSizeKey),
    );

    return isNaN(storedNumber) ? 25 : storedNumber;
  }

  get defaultBracketColumnWidth() {
    return 256;
  }

  get gridOptions() {
    return {
      ...super.baseGridOptions,
      rowHeight: 50,
      autoSizeStrategy: {
        type: "fitGridWidth",
        columnLimits: [
          { colId: "rank", minWidth: 65, maxWidth: 65 },
          {
            colId: "name",
            minWidth: this.defaultBracketColumnWidth,
            flex: 1,
          },
          { colId: "actions", minWidth: 208 },
          { colId: "points", minWidth: 75, maxWidth: 75 },
          { colId: "max_points", minWidth: 75, maxWidth: 75 },
          { colId: "round_one_points", minWidth: 57, maxWidth: 57 },
          { colId: "round_two_points", minWidth: 57, maxWidth: 57 },
          { colId: "round_three_points", minWidth: 57, maxWidth: 57 },
          { colId: "round_four_points", minWidth: 57, maxWidth: 57 },
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

  sortBrackets() {
    this.brackets.sort((a, b) => a.name.localeCompare(b.name));

    if (CAN_EDIT_BRACKET && CURRENT_YEAR === this.year) {
      // TODO: sort my brackets to top?
      // this.brackets.sort((a, b) => {
      //   let res = null;
      //   if (a.user_id === CURRENT_USER.id) {
      //     res = -1;
      //   } else if (b.user_id === CURRENT_USER.id) {
      //     res = 1;
      //   } else {
      //     res = 0;
      //   }
      //   return res;
      // });
    } else {
      this.brackets.sort((a, b) => {
        return a.rank - b.rank;
      });
    }
  }

  firstUpdated() {
    this.init();
  }

  async init() {
    await this.updateComplete;

    this.cleanBracketNames();
    this.sortBrackets();
    this.createDataGrid();
    this.setupThemeWatcher();
  }

  getImageElement(winner_team) {
    if (!winner_team) {
      return null;
    }

    return `<img
      class="standings-img"
      src="${winner_team.team.icon_path}"
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
          let ele = document.createElement("nb-bracket-column");
          ele.bracket = param.data;
          return ele;
          let bracket = param.data;
          if (bracket.winner_team) {
            let ele = document.createElement("nb-bracket-column");
            ele.bracket = param.data;
            return ele;
            // return `<div class="flex w-full h-full">
            //   <a
            //     class="clickable-card py-(--wa-space-2xs)"
            //     href="${bracket.url}"
            //     ><div class="standings-row">
            //       ${this.getImageElement(bracket.winner_team)}
            //       <div class="name-cell">
            //         <span
            //           class="standings-bracket-name underline"
            //           ><span>${bracket.safeName}</span></span
            //         ><span class="standings-username"
            //           >${bracket.user.username}</span
            //         >
            //       </div>
            //     </div></a
            //   >
            // </div>`;
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
      { field: "max_points", headerName: "Max" },
    );

    if (this.year < CURRENT_YEAR || !CAN_EDIT_BRACKET) {
      {
        columnDefs.push(
          { field: "round_one_points", headerName: "R1" },
          { field: "round_two_points", headerName: "R2" },
          { field: "round_three_points", headerName: "R3" },
          { field: "round_four_points", headerName: "R4" },
        );
      }
    }

    const gridOptions = {
      columnDefs,
      rowData: this.brackets,
      ...this.gridOptions,
      pagination: true,
      paginationPageSize: this.storedPageSize,
      paginationPageSizeSelector: [25, 50, 75, 100],
      onPaginationChanged: (event) => this.handlePaginationChangedEvent(event),
    };
    this.dataGrid = agGrid.createGrid(this.standingsGridEl, gridOptions);
  }

  handlePaginationChangedEvent(event) {
    if (event.newPageSize) {
      window.localStorage.setItem(
        this.#pageSizeKey,
        this.dataGrid.paginationGetPageSize(),
      );
    }
  }

  render() {
    if (!this.brackets.length) {
      return html`<div class="flex justify-center">No brackets yet</div>`;
    }

    return html`<div id="standingsGrid" style="--ag-grid-size: 4px;"></div>`;
  }
}

customElements.define("nb-standings-grid", StandingsGrid);
