class StandingsGridManager {
  constructor() {
    this.standingsGridEl = document.getElementById("standingsGrid");

    this.createDataGrid();

    this.setupThemeWatcher();
  }

  getImageUrl(team) {
    if (!team) {
      return "";
    }

    return team.icon_path;
  }

  getImageElement(team) {
    if (!team) {
      return null;
    }

    return `<img
      class="team-img"
      src="${this.getImageUrl(team)}"
      alt="${team.name}"
    />`;
  }

  createDataGrid() {
    const rowData = [];
    for (let string of GRID_DATA) {
      rowData.push(JSON.parse(string));
    }

    const columnDefs = [
      { field: "rank", resizable: false },
      {
        field: "name",
        headerName: "Bracket, Owner",
        cellRenderer: (param) => {
          if (param.data.url) {
            return `${this.getImageElement(param.data.team)}<a href="${
              param.data.url
            }">${param.value}</a>, ${param.data.username}`;
          }
          return `${param.value}, ${param.data.username}`;
        },
        resizable: false,
      },
      { field: "points", headerName: "Total points", resizable: false },
      { field: "maxPoints", headerName: "Max points", resizable: false },
    ];

    if (rowData.length > 1 && !!rowData[0].r1) {
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
      autoSizeStrategy: {
        type: "fitGridWidth",
        defaultMinWidth: 75,
        columnLimits: [
          { colId: "rank", maxWidth: 75 },
          {
            colId: "name",
            minWidth: 400,
          },
          {
            colId: "points",
            minWidth: 125,
          },
          {
            colId: "maxPoints",
            minWidth: 125,
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
