import { LitElement } from "./imports.mjs";

/**
 * A custom class for creating elements with markup
 */
export class CustomElement {
  get markup() {
    return `<template><p>Hello world</p></template>`;
  }

  get fragment() {
    if (!this.template) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(this.markup, "text/html");
      this.template = document.importNode(doc.querySelector("template"), true);
    }
    let fragment = this.template.content.cloneNode(true);
    return fragment;
  }

  addToAnchor(anchor) {
    this.anchor = anchor;
    this.anchor.appendChild(this.fragment);
  }

  querySelector(query) {
    return this.anchor?.querySelector(query);
  }

  querySelectorAll(query) {
    return this.anchor?.querySelectorAll(query);
  }
}

function query(el, selector) {
  return () => el.querySelector(selector);
}

function queryAll(el, selector) {
  return () => el.querySelectorAll(selector);
}

/**
 * A custom class that extends LitElement for creating custom elements
 */
export class NikElement extends LitElement {
  constructor() {
    super();
    let { queries } = this.constructor;
    if (queries) {
      for (let [selectorName, selector] of Object.entries(queries)) {
        if (selector.all) {
          Object.defineProperty(this, selectorName, {
            get: queryAll(this, selector.all),
          });
        } else {
          Object.defineProperty(this, selectorName, {
            get: query(this, selector),
          });
        }
      }
    }
  }

  createRenderRoot() {
    return this;
  }
}
