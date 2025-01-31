class StandingsGridManager {
  constructor() {
    this.standingsGridEl = document.getElementById("standingsGrid");

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
    const rowData = [];
    for (let groupBracket of GRID_DATA) {
      groupBracket.bracket.rank = groupBracket.group_rank;
      rowData.push(groupBracket.bracket);
    }

    console.log(rowData);

    if (!rowData.length) {
      return;
    }

    const columnDefs = [
      { field: "rank", resizable: false },
      {
        field: "name",
        headerName: "Brackets",
        cellRenderer: (param) => {
          if (param.data.winner) {
            return `<div class="standings-row">${this.getImageElement(
              param.data.winner_team
            )}<div class="name-cell"><span class="standings-bracket-name"><a href="${
              param.data.url
            }">${param.value}</a></span><span class="standings-username">${
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
      },
      { field: "points", resizable: false },
      { field: "max_points", headerName: "Max", resizable: false },
    ];

    if ("r1" in rowData[0]) {
      columnDefs.push(
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
      autoSizeStrategy: {
        type: "fitGridWidth",
        defaultMinWidth: 75,
        defaultMaxWidth: 75,
        columnLimits: [
          { colId: "rank", minWidth: 57, maxWidth: 57 },
          {
            colId: "name",
            minWidth: 300,
            maxWidth: 300,
          },
        ],
      },
      onRowDataUpdated: (event) => {
        let height =
          document.querySelector(".ag-center-cols-container").scrollHeight +
          document.querySelector(".ag-header-row").scrollHeight;

        if (height < 192) {
          height = 192;
        }

        this.standingsGridEl.style.height = `${height + 3}px`;
      },
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
}

new StandingsGridManager();
