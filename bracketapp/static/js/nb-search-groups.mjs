import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";
import { GroupCard } from "./nb-my-brackets-group-card.mjs";

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

  handleFocus() {
    this.popup.active = true;
  }

  handleBlur() {
    this.popup.active = false;
  }

  groupTemplate(group) {
    return html`<a
      style="color:unset;"
      class="d-flex flex-grow-1 align-items-center text-decoration-none gap-3"
      href="${group.url}"
    >
      <sl-icon class="" name="trophy"></sl-icon>
      <div class="d-flex flex-column group-name">
        <span class="text-decoration-underline">${group.name}</span>
        <small>Group size: ${group.members.length}</small>
      </div>
    </a>`;
  }

  resultsTemplate() {
    if (!this.results.length) {
      return null;
    }

    return html`<sl-menu
      >${this.results
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
          @sl-focus=${this.handleFocus}
          @sl-blur=${this.handleBlur}
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
