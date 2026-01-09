import { html } from "./lit.bundle.mjs";
import { NikElement } from "./nik-element.mjs";
import "./nb-group-card.mjs";

export class SearchGroups extends NikElement {
  static properties = {
    results: { type: Object },
  };

  static queries = {
    input: "wa-input",
    popup: "wa-popup",
    menu: "wa-menu",
  };

  constructor() {
    super();

    this.results = [];
  }

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener("focusin", this.handleFocusIn.bind(this));
  }

  async search() {
    let name = this.input.value;
    if (!name) {
      this.popup.active = false;
      return;
    }

    let res = await fetch(SEARCH_URL + "?" + new URLSearchParams({ name }));
    this.results = await res.json();

    this.lastSearchValue = name;
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

    if (this.input.value.length < 3) {
      return;
    }

    this.debounce(async () => {
      await this.search();
    }, 300)();
  }

  handleFocusIn() {
    if (this.contains(event.target)) {
      this.popup.active = true;
    } else {
      this.popup.active = false;
    }
  }

  groupTemplate(group) {
    return html`<a
      tabindex="-1"
      style="color:unset;"
      class="d-flex flex-grow-1 align-items-center text-decoration-none gap-3"
      href="${group.url}"
    >
      <nb-group-card-content .group=${group}></nb-group-card-content>
    </a>`;
  }

  resultsTemplate() {
    if (!this.results.length) {
      return null;
    }

    return html`<wa-menu>${this.results
      .map((g) => [
        html`<wa-menu-item>${this.groupTemplate(g)}</wa-menu-item>`,
        html`<wa-divider></wa-divider>`,
      ])
      .flat()
      .slice(0, -1)}</wa-menu-item>
    </wa-menu>`;
  }

  render() {
    return html`
      <wa-popup placement="bottom" sync="width" strategy="fixed">
        <wa-input
          slot="anchor"
          placeholder="Search for groups"
          clearable
          @input=${this.handleInputEvent}
          ><wa-icon name="search" slot="prefix"></wa-icon></wa-input
        >${this.resultsTemplate()}</wa-popup
      >
    `;
  }
}

customElements.define("nb-search-groups", SearchGroups);
