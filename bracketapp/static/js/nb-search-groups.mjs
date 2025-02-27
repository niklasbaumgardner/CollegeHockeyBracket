import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import { GroupCard } from "./nb-group-card.mjs";

export class SearchGroups extends NikElement {
  static properties = {
    results: { type: Object },
  };

  static queries = {
    input: "sl-input",
    popup: "sl-popup",
  };

  constructor() {
    super();

    this.results = [];
  }

  async search() {
    let name = this.input.value;
    if (!name) {
      this.popup.active = false;
      return;
    }

    this.popup.active = true;

    let res = await fetch(SEARCH_URL + "?" + new URLSearchParams({ name }));
    console.log(res);
    this.results = await res.json();
    console.log(this.results);
  }

  debounce(callback, wait) {
    return (...args) => {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = window.setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  handleInputEvent(e) {
    if (!this.input.value) {
      this.results = [];
      return;
    }

    this.debounce(async () => {
      await this.search();
    }, 300)();

    this.lastSearchValues = this.searchValues;
  }

  groupTemplate(group) {
    return html`<nb-group-card .group=${group}></nb-group-card>`;
  }

  resultsTemplate() {
    if (!this.results.length) {
      return null;
    }

    return html`<sl-menu
      >${this.results.map(
        (g) => html`<sl-menu-item>${this.groupTemplate(g)}</sl-menu-item>`
      )}
    </sl-menu>`;
  }

  render() {
    return html`
      <sl-popup placement="bottom" sync="width" strategy="fixed">
        <sl-input
          slot="anchor"
          placeholder="Search for groups"
          clearable
          @sl-input=${this.handleInputEvent}
          ><sl-icon name="search" slot="prefix"></sl-icon></sl-input
        >${this.resultsTemplate()}</sl-popup
      >
    `;
  }
}

customElements.define("nb-search-groups", SearchGroups);
