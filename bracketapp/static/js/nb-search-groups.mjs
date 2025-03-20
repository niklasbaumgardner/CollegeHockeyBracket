import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import "./nb-group-card.mjs";

export class SearchGroups extends NikElement {
  static properties = {
    results: { type: Object },
  };

  static queries = {
    input: "sl-input",
    popup: "sl-popup",
    menu: "sl-menu",
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

    return html`<sl-menu>${this.results
      .map((g) => [
        html`<sl-menu-item>${this.groupTemplate(g)}</sl-menu-item>`,
        html`<sl-divider></sl-divider>`,
      ])
      .flat()
      .slice(0, -1)}</sl-menu-item>
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
