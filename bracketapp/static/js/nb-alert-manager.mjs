import { NikElement } from "./nik-element.mjs";
import { html } from "./lit.bundle.mjs";
import "./nb-alert.mjs";

export class AlertManager extends NikElement {
  static properties = {
    messages: {
      type: Array,
      converter: (value, type) => {
        if (!value || !value.length || value === "[]") {
          return [];
        }

        return [...value.match(/(?<=\()[^()]+(?=\))/g)].map((tuple) =>
          tuple.replaceAll("'", "").split(", "),
        );
      },
    },
  };

  render() {
    if (!this.messages.length) {
      return null;
    }

    return html`<div id="alerts" class="wa-stack items-center">
      ${this.messages.map(
        ([category, ...rest]) =>
          html`<nb-alert
            category=${category}
            message=${rest.join(", ")}
          ></nb-alert>`,
      )}
    </div>`;
  }
}

customElements.define("nb-alert-manager", AlertManager);
