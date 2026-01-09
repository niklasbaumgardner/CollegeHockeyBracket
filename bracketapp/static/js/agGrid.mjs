import {
  ModuleRegistry,
  ClientSideRowModelApiModule,
  ColumnAutoSizeModule,
  RowAutoHeightModule,
  PaginationModule,
  CellSpanModule,
  CellStyleModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  ClientSideRowModelModule,
  createGrid,
  colorSchemeDark,
  colorSchemeLight,
  themeAlpine,
} from "ag-grid-community";

ModuleRegistry.registerModules([
  ColumnAutoSizeModule,
  ClientSideRowModelApiModule,
  RowAutoHeightModule,
  PaginationModule,
  CellSpanModule,
  CellStyleModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  ClientSideRowModelModule,
]);

export { createGrid, colorSchemeDark, colorSchemeLight, themeAlpine };
