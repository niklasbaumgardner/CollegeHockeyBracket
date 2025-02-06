class MyBracketsGridManager {
  constructor() {
    this.myBracketsGridEl = document.getElementById("myBracketsGrid");

    this.createDataGrid();

    this.setupThemeWatcher();

    this.deleteBracketModals = {};
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
    for (let data of BRACKETS) {
      rowData.push(data);
    }

    console.log(rowData);

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
        resizable: false,
      });
    }

    columnDefs.push({
      field: "name",
      headerName: "Brackets",
      autoHeight: true,
      onCellClicked: (params) => {
        params.event.target.querySelector("a")?.click();
      },
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
          return "nb-center cursor-pointer";
        } else {
          return "cursor-pointer";
        }
      },
      cellRenderer: (param) => {
        if (param.data.id === -1) {
          return `<sl-button href="${NEW_BRACKET_LINK}" variant="primary">Create new bracket</sl-button>`;
        } else if (param.data.winner) {
          return `<div class="standings-row">${this.getImageElement(
            param.data.winner_team
          )}<div class="name-cell"><span class="standings-bracket-name"><a href=${
            param.data.url
          }>${param.value}</a></span><span class="standings-username">${
            param.data.user.username
          }</span></div></div>`;
        }

        return `<div class="standings-row">
            <div class="name-cell">
              <span class="standings-bracket-name">${param.value}</span>
              <span class="standings-username">${param.data.user.username}</span>
            </div>
          </div>`;
      },
      resizable: false,
    });

    if (CAN_EDIT_BRACKET) {
      columnDefs.push({
        field: "actions",
        resizable: false,
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
        { field: "points", resizable: false },
        { field: "max_points", headerName: "Max", resizable: false },
        { field: "r1", resizable: false },
        { field: "r2", resizable: false },
        { field: "r3", resizable: false },
        { field: "r4", resizable: false }
      );
    }

    const gridOptions = {
      columnDefs,
      rowData,
      rowHeight: 50,
      domLayout: "autoHeight",
      suppressCellFocus: true,
      autoSizeStrategy: {
        type: "fitGridWidth",
        // defaultMinWidth: 75,
        // defaultMaxWidth: 75,
        columnLimits: [
          { colId: "rank", minWidth: 57, maxWidth: 57 },
          {
            colId: "name",
            minWidth: 300,
            // maxWidth: 300,
            flex: 1,
          },
          { colId: "points", minWidth: 75, maxWidth: 75 },
          { colId: "max_points", minWidth: 75, maxWidth: 75 },
          { colId: "r1", minWidth: 57, maxWidth: 57 },
          { colId: "r2", minWidth: 57, maxWidth: 57 },
          { colId: "r3", minWidth: 57, maxWidth: 57 },
          { colId: "r4", minWidth: 57, maxWidth: 57 },
          // { colId: "actions" },
        ],
      },
      // onRowDataUpdated: (event) => {
      //   let height =
      //     document.querySelector(".ag-center-cols-container").scrollHeight +
      //     document.querySelector(".ag-header-row").scrollHeight;

      //   if (height < 192) {
      //     height = 192;
      //   }

      //   this.myBracketsGridEl.style.height = `${height + 3}px`;
      // },
    };
    this.dataGrid = agGrid.createGrid(this.myBracketsGridEl, gridOptions);
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
    this.myBracketsGridEl.classList.toggle(
      "ag-theme-alpine-dark",
      theme === "dark"
    );
    this.myBracketsGridEl.classList.toggle(
      "ag-theme-alpine",
      theme === "light"
    );
  }
}

new MyBracketsGridManager();
