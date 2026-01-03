import { WaCombobox } from "./main.bundle.mjs";

export class Combobox extends WaCombobox {
  firstUpdated() {
    super.firstUpdated();
    this.updateFilteredOptions();
  }
}

customElements.define("nb-combobox", Combobox);
