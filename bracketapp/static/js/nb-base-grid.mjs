import { html } from "lit";
import { NikElement } from "./nik-element.mjs";
import * as agGrid from "./agGrid.mjs";

export class BaseGrid extends NikElement {
  get currentColorScheme() {
    let theme = document.documentElement.classList.contains("wa-dark")
      ? "dark"
      : "light";

    let colorScheme =
      theme === "dark" ? agGrid.colorSchemeDark : agGrid.colorSchemeLight;
    return colorScheme;
  }

  get gridTheme() {
    const borderRadius = 4 * window.THEME.rounding;
    return agGrid.themeAlpine.withPart(this.currentColorScheme).withParams({
      // cellHorizontalPadding: "1rem",
      borderRadius: borderRadius,
      wrapperBorderRadius: borderRadius,
      borderWidth: 1,
      headerRowBorder: true,
      rowBorder: true,

      backgroundColor:
        "light-dark(var(--wa-color-neutral-95), var(--wa-color-neutral-20))",
      borderColor:
        "light-dark(var(--wa-color-neutral-90), var(--wa-color-neutral-30))",
      cellTextColor: "var(--wa-color-text-normal)",
      headerTextColor: "var(--wa-color-text-normal)",
      // rowHoverColor:
      //   "color-mix(in srgb, var(--wa-color-brand-fill-quiet) 50%, transparent 50%)",
      fontFamily: "inherit",
    });
  }

  get baseGridOptions() {
    return {
      defaultColDef: {
        resizable: false,
      },
      domLayout: "autoHeight",
      suppressCellFocus: true,
      suppressMovableColumns: true,
      theme: this.gridTheme,
    };
  }

  setupThemeWatcher() {
    this.mutationObserver = new MutationObserver(() => {
      this.dataGrid?.setGridOption("theme", this.gridTheme);
    });

    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
    });
  }

  render() {
    return html`<div id="grid" style="--ag-grid-size: 4px;"></div>`;
  }
}
