import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";
import * as agGrid from "./agGrid.bundle.mjs";

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
    const spacing = 8 * window.THEME.spacing;
    const borderRadius = 4 * window.THEME.rounding;
    const borderWidth = window.THEME.borderWidth;
    return agGrid.themeAlpine.withPart(this.currentColorScheme);
    // .withParams({
    //   spacing,
    //   cellHorizontalPadding: "1rem",
    //   borderRadius: borderRadius,
    //   wrapperBorderRadius: borderRadius,
    //   borderWidth,
    //   headerRowBorder: true,
    //   rowBorder: true,

    //   backgroundColor: "var(--wa-color-surface-default)",
    //   borderColor: "var(--wa-color-surface-border)",
    //   cellTextColor: "var(--wa-color-text-normal)",
    //   headerTextColor: "var(--wa-color-text-normal)",
    //   rowHoverColor:
    //     "color-mix(in srgb, var(--wa-color-brand-fill-quiet), transparent)",
    //   fontFamily: "inherit",
    // });
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
      this.dataGrid.setGridOption("theme", this.gridTheme);
    });

    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
    });
  }

  render() {
    return html`<div id="grid" style="--ag-grid-size: 4px;"></div>`;
  }
}
