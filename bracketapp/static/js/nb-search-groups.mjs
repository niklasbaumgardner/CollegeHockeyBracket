import { html } from "lit";
import { NikElement } from "./nik-element.mjs";
import "./nb-group-card.mjs";
import { DeferredTask } from "./DeferredTask.mjs";

export class SearchGroups extends NikElement {
  static properties = {
    results: { type: Object },
  };

  static queries = {
    input: "wa-input",
    popup: "wa-popup",
    dropdown: "wa-dropdown",
    popover: "wa-popover",
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
    this.popup.active = true;

    let res = await fetch(SEARCH_URL + "?" + new URLSearchParams({ name }));
    this.results = await res.json();
    console.log(this.results, this.popup);

    this.lastSearchValue = name;
  }

  handleInputEvent(e) {
    console.log(e);
    if (!this.input.value) {
      this.results = [];
      return;
    }

    if (this.input.value.length < 3) {
      return;
    }

    this.searchTask = new DeferredTask(async () => {
      await this.search();
    }, 300);

    this.searchTask.arm();
  }

  handleFocusIn(event) {
    if (this.contains(event.target)) {
      this.popup.active = true;
    } else {
      this.popup.active = false;
    }
  }

  groupTemplate(group) {
    return html`<a class="clickable-group" href=${group.url}>
      <nb-group-card-content .group=${group}></nb-group-card-content>
    </a>`;
  }

  resultsTemplate() {
    let resultsContent = "";
    if (!this.results.length) {
      resultsContent = html`<p class="text-center">No groups found</p>`;
    } else {
      resultsContent = this.results
        .flatMap((g) => [
          this.groupTemplate(g),
          html`<wa-divider></wa-divider>`,
        ])
        .slice(0, -1);
    }

    return html`<wa-card>${resultsContent}</wa-card>`;
  }

  popoverTemplate() {
    return html`<wa-popup placement="bottom"
      >${this.resultsTemplate()}</wa-popup
    >`;
  }

  render() {
    return html`<wa-popup placement="bottom" sync="width"
      ><wa-input
        slot="anchor"
        id="search-input"
        placeholder="Search for groups"
        with-clear
        @input=${this.handleInputEvent}
        ><wa-icon name="search" slot="start"></wa-icon></wa-input
      >${this.resultsTemplate()}</wa-popup
    >`;
  }
}

customElements.define("nb-search-groups", SearchGroups);
