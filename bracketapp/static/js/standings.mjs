class StandingsGridManager {
  constructor() {
    this.standingsGridEl = document.getElementById("standingsGrid");

    this.createDataGrid();

    this.setupThemeWatcher();
  }

  createDataGrid() {
    const rowData = [];
    for (let string of GRID_DATA) {
      rowData.push(JSON.parse(string));
    }

    const columnDefs = [
      { field: "rank" },
      {
        field: "name",
        headerName: "Bracket, Owner",
        cellRenderer: (param) => {
          if (param.data.url) {
            return `<a href="${param.data.url}">${param.value}</a>, ${param.data.username}`;
          }
          return `${param.value}, ${param.data.username}`;
        },
      },
      { field: "r1" },
      { field: "r2" },
      { field: "r3" },
      { field: "r4" },
      { field: "points", headerName: "Total points" },
      { field: "maxPoints", headerName: "Max points" },
    ];
    const gridOptions = {
      columnDefs,
      rowData,
      autoSizeStrategy: {
        type: "fitGridWidth",
        defaultMinWidth: 75,
        columnLimits: [
          {
            colId: "name",
            minWidth: 300,
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
      "ag-theme-quartz-dark",
      theme === "dark"
    );
    this.standingsGridEl.classList.toggle("ag-theme-quartz", theme === "light");
  }
}

new StandingsGridManager();
