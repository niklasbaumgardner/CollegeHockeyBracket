/*! For license information please see 284.bundle.mjs.LICENSE.txt */
export const __webpack_esm_id__=284;export const __webpack_esm_ids__=[284];export const __webpack_esm_modules__={319(t,e,o){var a=o(8030),i=o(3158),r=o(6337),s=r.AH`
  :host {
    --checked-icon-color: var(--wa-color-brand-on-loud);
    --checked-icon-scale: 0.8;

    display: inline-flex;
    color: var(--wa-form-control-value-color);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    user-select: none;
    -webkit-user-select: none;
  }

  [part~='control'] {
    display: inline-flex;
    flex: 0 0 auto;
    position: relative;
    align-items: center;
    justify-content: center;
    width: var(--wa-form-control-toggle-size);
    height: var(--wa-form-control-toggle-size);
    border-color: var(--wa-form-control-border-color);
    border-radius: min(
      calc(var(--wa-form-control-toggle-size) * 0.375),
      var(--wa-border-radius-s)
    ); /* min prevents entirely circular checkbox */
    border-style: var(--wa-border-style);
    border-width: var(--wa-form-control-border-width);
    background-color: var(--wa-form-control-background-color);
    transition:
      background var(--wa-transition-normal),
      border-color var(--wa-transition-fast),
      box-shadow var(--wa-transition-fast),
      color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    margin-inline-end: 0.5em;
  }

  [part~='base'] {
    display: flex;
    align-items: flex-start;
    position: relative;
    color: currentColor;
    vertical-align: middle;
    cursor: pointer;
  }

  [part~='label'] {
    display: inline;
  }

  /* Checked */
  [part~='control']:has(:checked, :indeterminate) {
    color: var(--checked-icon-color);
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-form-control-activated-color);
  }

  /* Focus */
  [part~='control']:has(> input:focus-visible:not(:disabled)) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  :host [part~='base']:has(input:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input {
    position: absolute;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    pointer-events: none;
  }

  [part~='icon'] {
    display: flex;
    scale: var(--checked-icon-scale);

    /* Without this, Safari renders the icon slightly to the left */
    &::part(svg) {
      translate: 0.0009765625em;
    }

    input:not(:checked, :indeterminate) + & {
      visibility: hidden;
    }
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }
`,n=o(1325),l=o(4411),c=o(4671),h=o(2346),d=o(7870),u=o(7425),p=o(3720),m=o(31),b=o(538),v=class extends n.q{constructor(){super(...arguments),this.hasSlotController=new l.X(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){const t=r.S$?[]:[(0,a.Y)({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){const t=this._value||"on";return this.checked?t:null}set value(t){this._value=t}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){this.hasInteracted||this.checked===this.defaultChecked||(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){const t=!!r.S$||this.hasSlotController.test("hint"),e=!!this.hint||!!t,o=!this.checked&&this.indeterminate,a=o?"indeterminate":"check",i=o?"indeterminate":"check";return r.qy`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${(0,m.J)(this._value)}
            .indeterminate=${(0,b.V)(this.indeterminate)}
            .checked=${(0,b.V)(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${i}-icon icon" library="system" name=${a}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${e?"false":"true"}
        class="${(0,p.H)({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};v.css=[i.I,c.J,s],v.shadowRootOptions={...n.q.shadowRootOptions,delegatesFocus:!0},(0,d.Cc)([(0,u.P)('input[type="checkbox"]')],v.prototype,"input",2),(0,d.Cc)([(0,u.MZ)()],v.prototype,"title",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],v.prototype,"name",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],v.prototype,"value",1),(0,d.Cc)([(0,u.MZ)({reflect:!0})],v.prototype,"size",2),(0,d.Cc)([(0,u.MZ)({type:Boolean})],v.prototype,"disabled",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,reflect:!0})],v.prototype,"indeterminate",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,attribute:!1})],v.prototype,"checked",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,reflect:!0,attribute:"checked"})],v.prototype,"defaultChecked",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,reflect:!0})],v.prototype,"required",2),(0,d.Cc)([(0,u.MZ)()],v.prototype,"hint",2),(0,d.Cc)([(0,h.w)("defaultChecked")],v.prototype,"handleDefaultCheckedChange",1),(0,d.Cc)([(0,h.w)(["checked","indeterminate"])],v.prototype,"handleStateChange",1),(0,d.Cc)([(0,h.w)("disabled")],v.prototype,"handleDisabledChange",1),v=(0,d.Cc)([(0,u.EM)("wa-checkbox")],v),o(9456),o(1092),o(9610),o(6127),o(1353),o(9373),o(5915)},517(t,e,o){o.d(e,{q:()=>a});var a=o(6337).AH`
  @layer wa-component {
    :host {
      display: inline-block;

      /* Workaround because Chrome doesn't like :host(:has()) below
       * https://issues.chromium.org/issues/40062355
       * Firefox doesn't like this nested rule, so both are needed */
      &:has(wa-badge) {
        position: relative;
      }
    }

    /* Apply relative positioning only when needed to position wa-badge
     * This avoids creating a new stacking context for every button */
    :host(:has(wa-badge)) {
      position: relative;
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition-property: background, border, box-shadow, color, opacity;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
    line-height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='outlined']) {
    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled']) {
    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled-outlined']) {
    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='accent']) {
    .button {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-active)
      );
    }
  }

  /* Focus states */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled state */
  .button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button.disabled * {
    pointer-events: none;
  }

  /* Keep it last so Safari doesn't stop parsing this block */
  .button::-moz-focus-inner {
    border: 0;
  }

  /* Icon buttons */
  .button.is-icon-button {
    outline-offset: 2px;
    width: var(--wa-form-control-height);
    aspect-ratio: 1;
  }

  .button.is-icon-button:has(wa-icon) {
    width: auto;
  }

  /* Pill modifier */
  :host([pill]) .button {
    border-radius: var(--wa-border-radius-pill);
  }

  /*
   * Label
   */

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .label {
    display: inline-block;
  }

  .is-icon-button .label {
    display: flex;
  }

  .label::slotted(wa-icon) {
    align-self: center;
  }

  /*
   * Caret modifier
   */

  wa-icon[part='caret'] {
    display: flex;
    align-self: center;
    align-items: center;

    &::part(svg) {
      width: 0.875em;
      height: 0.875em;
    }

    .button:has(&) .end {
      display: none;
    }
  }

  /*
   * Loading modifier
   */

  .loading {
    position: relative;
    cursor: wait;

    .start,
    .label,
    .end,
    .caret {
      visibility: hidden;
    }

    wa-spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 90%);

      position: absolute;
      font-size: 1em;
      height: 1em;
      width: 1em;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    border-color: var(--wa-color-surface-default);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  :host(:dir(rtl)) ::slotted(wa-badge) {
    translate: -50% -50%;
  }

  /*
  * Button spacing
  */

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.75em;
  }

  slot[name='end']::slotted(*),
  .button:not(.visually-hidden-label) [part='caret'] {
    margin-inline-start: 0.75em;
  }

  /*
   * Button group border radius modifications
   */

  /* Remove border radius from all grouped buttons by default */
  :host(.wa-button-group__button) .button {
    border-radius: 0;
  }

  /* Horizontal orientation */
  :host(.wa-button-group__horizontal.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-form-control-border-radius);
    border-end-start-radius: var(--wa-form-control-border-radius);
  }

  :host(.wa-button-group__horizontal.wa-button-group__button-last) .button {
    border-start-end-radius: var(--wa-form-control-border-radius);
    border-end-end-radius: var(--wa-form-control-border-radius);
  }

  /* Vertical orientation */
  :host(.wa-button-group__vertical) {
    flex: 1 1 auto;
  }

  :host(.wa-button-group__vertical) .button {
    width: 100%;
    justify-content: start;
  }

  :host(.wa-button-group__vertical.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-form-control-border-radius);
    border-start-end-radius: var(--wa-form-control-border-radius);
  }

  :host(.wa-button-group__vertical.wa-button-group__button-last) .button {
    border-end-start-radius: var(--wa-form-control-border-radius);
    border-end-end-radius: var(--wa-form-control-border-radius);
  }

  /* Handle pill modifier for button groups */
  :host([pill].wa-button-group__horizontal.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-border-radius-pill);
    border-end-start-radius: var(--wa-border-radius-pill);
  }

  :host([pill].wa-button-group__horizontal.wa-button-group__button-last) .button {
    border-start-end-radius: var(--wa-border-radius-pill);
    border-end-end-radius: var(--wa-border-radius-pill);
  }

  :host([pill].wa-button-group__vertical.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-border-radius-pill);
    border-start-end-radius: var(--wa-border-radius-pill);
  }

  :host([pill].wa-button-group__vertical.wa-button-group__button-last) .button {
    border-end-start-radius: var(--wa-border-radius-pill);
    border-end-end-radius: var(--wa-border-radius-pill);
  }
`},538(t,e,o){o.d(e,{V:()=>s});var a=o(6752),i=o(7804),r=o(8504);const s=(0,i.u$)(class extends i.WL{constructor(t){if(super(t),t.type!==i.OA.PROPERTY&&t.type!==i.OA.ATTRIBUTE&&t.type!==i.OA.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!(0,r.Rt)(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===a.c0||e===a.s6)return e;const o=t.element,s=t.name;if(t.type===i.OA.PROPERTY){if(e===o[s])return a.c0}else if(t.type===i.OA.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(s))return a.c0}else if(t.type===i.OA.ATTRIBUTE&&o.getAttribute(s)===e+"")return a.c0;return(0,r.mY)(t),e}})},724(t,e,o){var a=o(3169),i=o(6337),r=i.AH`
  :host {
    --pulse-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));

    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.375em 0.625em;
    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    font-size: max(var(--wa-font-size-2xs), 0.75em);
    font-weight: var(--wa-font-weight-semibold);
    line-height: 1;
    white-space: nowrap;
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;
    border-radius: var(--wa-border-radius-s);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) {
    --pulse-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));

    color: var(--wa-color-on-quiet, var(--wa-color-brand-on-quiet));
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
  }

  :host([appearance='filled']) {
    --pulse-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));

    color: var(--wa-color-on-normal, var(--wa-color-brand-on-normal));
    background-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) {
    --pulse-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));

    color: var(--wa-color-on-normal, var(--wa-color-brand-on-normal));
    background-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));
    border-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));
  }

  :host([appearance='accent']) {
    --pulse-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));

    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;
  }

  /* Pill modifier */
  :host([pill]) {
    border-radius: var(--wa-border-radius-pill);
  }

  /* Pulse attention */
  :host([attention='pulse']) {
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  /* Bounce attention */
  :host([attention='bounce']) {
    animation: bounce 1s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
    60% {
      transform: translateY(-2px);
    }
  }

  ::slotted(wa-icon) {
    margin-inline-end: var(--wa-space-2xs, 0.25em);
    opacity: 90%;
    line-height: 1;
    height: 0.85em;
  }
`,s=o(5915),n=o(7870),l=o(7425),c=class extends s._{constructor(){super(...arguments),this.variant="brand",this.appearance="accent",this.pill=!1,this.attention="none"}render(){return i.qy` <slot part="base" role="status"></slot>`}};c.css=[a.M,r],(0,n.Cc)([(0,l.MZ)({reflect:!0})],c.prototype,"variant",2),(0,n.Cc)([(0,l.MZ)({reflect:!0})],c.prototype,"appearance",2),(0,n.Cc)([(0,l.MZ)({type:Boolean,reflect:!0})],c.prototype,"pill",2),(0,n.Cc)([(0,l.MZ)({reflect:!0})],c.prototype,"attention",2),c=(0,n.Cc)([(0,l.EM)("wa-badge")],c)},878(t,e,o){o.d(e,{A:()=>C});var a=o(5280),i=o(1754),r=o(6337),s=r.AH`
  :host {
    --tag-max-size: 10ch;
    --show-duration: 100ms;
    --hide-duration: 100ms;
  }

  /* Add ellipses to multi select options */
  :host wa-tag::part(content) {
    display: initial;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: var(--tag-max-size);
  }

  :host .disabled,
  :host .disabled * {
    cursor: not-allowed;
  }

  :host .disabled [part~='combobox'] {
    opacity: 0.5;
    outline: none;
  }

  :host .enabled:is(.open, :focus-within) [part~='combobox'] {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /** The popup */
  .combobox-popup {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;

    /* Pass through from combobox to the popup */
    --show-duration: inherit;
    --hide-duration: inherit;

    &::part(popup) {
      z-index: 900;
    }

    &[data-current-placement^='top']::part(popup) {
      transform-origin: bottom;
    }

    &[data-current-placement^='bottom']::part(popup) {
      transform-origin: top;
    }
  }

  /* Combobox container */
  .combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    justify-content: start;

    min-height: var(--wa-form-control-height);

    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    color: var(--wa-form-control-value-color);
    cursor: text;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    overflow: hidden;
    padding: 0 var(--wa-form-control-padding-inline);
    position: relative;
    vertical-align: middle;
    transition:
      background-color var(--wa-transition-normal),
      border var(--wa-transition-normal),
      outline var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    :host([multiple]) .combobox-popup:not(.placeholder-visible) & {
      padding-inline-start: 0;
      padding-block: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));
    }

    /* Pills */
    :host([pill]) & {
      border-radius: var(--wa-border-radius-pill);
    }

    :host([pill][multiple]) & {
      border-radius: 1.4em;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .combobox {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  /* The editable input */
  .combobox-input {
    position: relative;
    flex: 1 1 auto;
    width: auto;
    min-width: 50px;
    min-height: 1.5lh;
    font: inherit;
    border: none;
    background: none;
    line-height: var(--wa-form-control-value-line-height);
    color: var(--wa-form-control-value-color);
    cursor: text;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
    }
  }

  /* In multiple mode, the input shares the row with tags */
  :host([multiple]) .tags .combobox-input {
    flex: 1 1 auto;
    min-width: 10em;
    margin: 0 var(--wa-space-xs);
  }

  .value-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    margin: 0;
  }

  .tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25em;
  }

  :host([multiple]) .tags {
    margin-inline-start: 0.25em;

    .combobox-input {
      flex: 1 1 auto;
      min-width: 10em;
      margin: 0;
    }
  }

  :host([multiple]) .tags:has(wa-tag) {
    .combobox-input {
      margin-inline-start: var(--wa-space-xs);
    }
  }

  .tags wa-tag {
    cursor: pointer;
  }

  .disabled .tags,
  .disabled .tags wa-tag {
    cursor: not-allowed;
  }

  /* Start and End */
  .start,
  .end {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  :host([multiple]) .combobox-popup:not(.placeholder-visible) .start::slotted(*) {
    margin-inline: var(--wa-form-control-padding-inline);
  }

  /* Clear button */
  [part~='clear-button'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: color var(--wa-transition-normal);
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    &:focus {
      outline: none;
    }

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }
  }

  /* Expand icon */
  .expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
    transition: rotate var(--wa-transition-slow) ease;
    rotate: 0deg;
    margin-inline-start: var(--wa-form-control-padding-inline);

    .open & {
      rotate: -180deg;
    }
  }

  /* Listbox */
  .listbox {
    display: block;
    position: relative;
    font: inherit;
    box-shadow: var(--wa-shadow-m);
    background: var(--wa-color-surface-raised);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    padding-block: 0.5em;
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);

    &::slotted(wa-divider) {
      --spacing: 0.5em;
    }
  }

  slot:not([name])::slotted(small) {
    display: block;
    font-size: var(--wa-font-size-smaller);
    font-weight: var(--wa-font-weight-semibold);
    color: var(--wa-color-text-quiet);
    padding-block: 0.5em;
    padding-inline: 2.25em;
  }

  /* Hide filtered-out elements */
  slot:not([name])::slotted([hidden]) {
    display: none !important;
  }

  /* Live region for screen reader announcements - visually hidden but accessible */
  .live-region {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* No results message could be added via CSS content in the future */
  .listbox:empty::before {
    content: attr(data-empty-message);
    display: block;
    padding: 0.5em 1em;
    color: var(--wa-color-text-quiet);
    font-style: italic;
  }
`,n=o(4115),l=o(1590),c=o(7434),h=o(8030),d=o(3158),u=o(1325),p=o(4411),m=o(4671),b=o(9359),v=o(2346),f=o(7870),g=o(7425),w=o(3720),y=o(6781),x=0,C=class extends u.q{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasInputSinceOpening=!1,this.hasSlotController=new p.X(this,"hint","label"),this.localize=new b.c(this),this.listboxId="wa-combobox-listbox-"+ ++x,this.selectionOrder=new Map,this.selectedOptions=[],this.filteredOptions=[],this.inputValue="",this.name="",this._defaultValue=null,this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.autocomplete="list",this.allowCustomValue=!1,this.filter=null,this.getTag=t=>r.qy`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
          data-value=${t.value}
          @wa-remove=${e=>this.handleTagRemove(e,t)}
        >
          ${t.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,o=null!==e.closest('[part~="clear-button"]'),a=null!==e.closest("wa-button");if(!o&&!a){if("Escape"===t.key&&this.open)return t.preventDefault(),t.stopPropagation(),this.hide(),!this.multiple&&this.selectedOptions.length>0?this.inputValue=this.selectedOptions[0].label:this.multiple||(this.inputValue=""),void this.comboboxInput.focus({preventScroll:!0});if("Enter"===t.key)return t.preventDefault(),t.stopImmediatePropagation(),this.open?void(this.currentOption&&!this.currentOption.disabled?(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?(this.toggleOptionSelection(this.currentOption),this.inputValue="",this.updateFilteredOptions()):(this.setSelectedOptions(this.currentOption),this.inputValue=this.currentOption.label),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.comboboxInput.focus({preventScroll:!0}))):this.allowCustomValue&&!this.multiple&&this.inputValue&&(this.value=this.inputValue,this.valueHasChanged=!0,this.hasInteracted=!0,this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hide(),this.comboboxInput.focus({preventScroll:!0}))):void this.show();if("Backspace"===t.key&&this.multiple&&!this.inputValue&&this.selectedOptions.length>0){t.preventDefault(),this.hasInteracted=!0,this.valueHasChanged=!0;const e=this.selectedOptions[this.selectedOptions.length-1];return this.toggleOptionSelection(e,!1),void this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const e=this.getVisibleOptions(),o=e.indexOf(this.currentOption);let a=Math.max(0,o);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;"ArrowDown"===t.key?(a=o+1,a>e.length-1&&(a=0)):"ArrowUp"===t.key?(a=o-1,a<0&&(a=e.length-1)):"Home"===t.key?a=0:"End"===t.key&&(a=e.length-1),e[a]&&(this.setCurrentOption(e[a]),this.announceOption(e[a]))}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){const t=r.S$?[]:[(0,h.Y)({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),null==t||Array.isArray(t)||(t=[t]),this._value=t??null,this.value!==e&&(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;null!=t&&(t=Array.isArray(t)?t:[t]),this.optionValues=null==t?new Set(null):new Set(this.getAllOptions().filter(t=>!t.disabled).map(t=>t.value));let e=t;return null!=t&&(e=this.allowCustomValue?t:t.filter(t=>this.optionValues.has(t)),e=this.multiple?e:e[0],e=e??null),e}connectedCallback(){super.connectedCallback(),this.handleDefaultSlotChange(),this.open=!1}updateDefaultValue(){const t=this.getAllOptions().filter(t=>t.hasAttribute("selected")||t.defaultSelected);if(t.length>0){const e=t.map(t=>t.value);this._defaultValue=this.multiple?e:e[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.comboboxInput.select()}handleBlur(){!this.multiple&&this.selectedOptions.length>0&&!this.allowCustomValue&&(this.inputValue=this.selectedOptions[0].label)}handleLabelClick(){this.comboboxInput.focus(),this.show()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){const e=t.composedPath().some(t=>t instanceof Element&&"wa-button"===t.tagName.toLowerCase());this.disabled||e||(t.preventDefault(),this.comboboxInput.focus({preventScroll:!0}),(this.open||0!==this.getVisibleOptions().length)&&(this.open=!this.open))}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleInputChange(t){t.stopPropagation();const e=t.target;this.inputValue=e.value,this.hasInputSinceOpening=!0,this.updateFilteredOptions();const o=this.getVisibleOptions(),a=o.length>0;this.inputValue.length>0&&(a&&!this.open?this.show():!a&&this.open&&this.hide()),a&&this.open&&this.setCurrentOption(o[0]),this.announceFilterResults()}handleClearClick(t){t.stopPropagation(),(null!==this.value||this.inputValue)&&(this.selectionOrder.clear(),this.setSelectedOptions([]),this.inputValue="",this.updateFilteredOptions(),this.comboboxInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new i.I),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const e=t.target.closest("wa-option");e&&!e.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?(this.toggleOptionSelection(e),this.inputValue="",this.updateFilteredOptions()):(this.setSelectedOptions(e),this.inputValue=e.label),this.updateComplete.then(()=>this.comboboxInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.comboboxInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange());const t=this.getAllOptions();this.optionValues=void 0,t.forEach(t=>{t.id||(t.id="wa-combobox-option-"+ ++x)}),this.updateDefaultValue();let e=this.value;if(null==e||!this.valueHasChanged&&!this.hasInteracted)return void this.selectionChanged();Array.isArray(e)||(e=[e]);const o=t.filter(t=>e.includes(t.value));this.setSelectedOptions(o),this.updateFilteredOptions()}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let o=e;if(!o){const e=t.target.closest("wa-tag[data-value]");if(e){const t=e.dataset.value;o=this.selectedOptions.find(e=>e.value===t)}}o&&(this.toggleOptionSelection(o,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this?.querySelectorAll?[...this.querySelectorAll("wa-option")]:[]}getVisibleOptions(){return"none"!==this.autocomplete&&this.inputValue?this.filteredOptions.filter(t=>!t.disabled):this.getAllOptions().filter(t=>!t.disabled)}getFirstVisibleOption(){return this.getVisibleOptions()[0]}updateFilteredOptions(){const t=this.getAllOptions(),e="none"!==this.autocomplete&&!!this.inputValue&&this.hasInputSinceOpening;if(this.querySelectorAll(":scope > :not(wa-option)").forEach(t=>{t.hidden=e}),!e)return this.filteredOptions=t,void t.forEach(t=>{t.hidden=!1});const o=this.inputValue.toLowerCase();this.filteredOptions=t.filter(t=>{let e;return e=this.filter?this.filter(t,this.inputValue):t.label.toLowerCase().includes(o),t.hidden=!e,e})}setCurrentOption(t){this.getAllOptions().forEach(t=>{t.current=!1,t.tabIndex=-1}),t?(this.currentOption=t,t.current=!0,t.tabIndex=0,t.id&&this.comboboxInput?.setAttribute("aria-activedescendant",t.id),(0,a.Rt)(t,this.listbox,"vertical","auto")):this.comboboxInput?.removeAttribute("aria-activedescendant")}setSelectedOptions(t){const e=this.getAllOptions(),o=Array.isArray(t)?t:[t];e.forEach(t=>{o.includes(t)||(t.selected=!1)}),o.length&&o.forEach(t=>t.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){t.selected=!0===e||!1===e?e:!t.selected,this.selectionChanged()}announceOption(t){if(this.liveRegion){const e=this.getVisibleOptions().indexOf(t)+1,o=this.getVisibleOptions().length;this.liveRegion.textContent=`${t.label}, ${e} of ${o}`}}announceFilterResults(){if(this.liveRegion){const t=this.getVisibleOptions().length;this.liveRegion.textContent=0===t?this.localize.term("numOptionsSelected",0)||"No options available":`${t} option${1===t?"":"s"} available`}}selectionChanged(){const t=this.getAllOptions().filter(t=>{if(!this.hasInteracted&&!this.valueHasChanged){const e=this.defaultValue,o=Array.isArray(e)?e:[e];return t.hasAttribute("selected")||t.defaultSelected||t.selected||o?.includes(t.value)}return t.selected}),e=new Set(t.map(t=>t.value));for(const t of this.selectionOrder.keys())e.has(t)||this.selectionOrder.delete(t);let o=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(const e of t)this.selectionOrder.has(e.value)||this.selectionOrder.set(e.value,o++);this.selectedOptions=t.sort((t,e)=>(this.selectionOrder.get(t.value)??0)-(this.selectionOrder.get(e.value)??0));let a=new Set(this.selectedOptions.map(t=>t.value));if(a.size>0||this._value){const t=this._value;if(null==this._value){let t=this.defaultValue??[];this._value=Array.isArray(t)?t:[t]}this._value=this._value?.filter(t=>!this.optionValues?.has(t))??null,this._value?.unshift(...a),this.requestUpdate("value",t)}!this.multiple&&this.selectedOptions.length>0&&(this.hasInteracted&&this.inputValue||(this.inputValue=this.selectedOptions[0].label)),this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const o=this.getTag(t,e);return o?"string"==typeof o?(0,y._)(o):o:null}return e===this.maxOptionsVisible?r.qy`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            ?pill=${this.pill}
            size=${this.size}
            >+${this.selectedOptions.length-e}</wa-tag
          >
        `:null})}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value),t.has("disabled")&&this.customStates.set("disabled",this.disabled)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],o=t.filter(t=>e.includes(t.value));this.setSelectedOptions(o),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.hasInputSinceOpening=!1,this.setCurrentOption(this.selectedOptions[0]||this.getFirstVisibleOption()),this.updateFilteredOptions();const t=new n.kB;if(this.dispatchEvent(t),t.defaultPrevented)return void(this.open=!1);this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await(0,c.Ud)(this.popup.popup,"show"),this.currentOption&&(0,a.Rt)(this.currentOption,this.listbox,"vertical","auto"),this.announceFilterResults(),this.dispatchEvent(new n.qu)}else{const t=new n.Lq;if(this.dispatchEvent(t),t.defaultPrevented)return void(this.open=!0);this.removeOpenListeners(),await(0,c.Ud)(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.comboboxInput?.removeAttribute("aria-activedescendant"),this.dispatchEvent(new n.Z1)}}async show(){if(this.open||this.disabled)this.open=!1;else if(0!==this.getVisibleOptions().length)return this.open=!0,(0,l.l)(this,"wa-after-show")}async hide(){if(this.open&&!this.disabled)return this.open=!1,(0,l.l)(this,"wa-after-hide");this.open=!1}focus(t){this.comboboxInput.focus(t)}blur(){this.comboboxInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),!this.multiple&&this.selectedOptions.length>0?this.inputValue=this.selectedOptions[0].label:this.inputValue="",this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=!!this.label||!!t,a=!!this.hint||!!e,i=(this.hasUpdated||r.S$)&&this.withClear&&!this.disabled&&(this.value&&(!Array.isArray(this.value)||this.value.length>0)||this.inputValue),s=Boolean(this.placeholder&&!this.inputValue&&(!this.value||!this.value.length));return r.qy`
      <div
        part="form-control"
        class=${(0,w.H)({"form-control":!0,"form-control-has-label":o})}
      >
        <label
          id="label"
          part="form-control-label label"
          class="label"
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${(0,w.H)({"combobox-popup":!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple,"placeholder-visible":s})}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              ${this.multiple&&this.hasUpdated?r.qy`
                    <div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>
                      ${this.tags}
                      <input
                        part="combobox-input"
                        class="combobox-input"
                        type="text"
                        placeholder=${this.placeholder}
                        .disabled=${this.disabled}
                        .value=${this.inputValue}
                        ?required=${this.required}
                        autocomplete="off"
                        spellcheck="false"
                        autocapitalize="off"
                        role="combobox"
                        aria-autocomplete=${this.autocomplete}
                        aria-controls=${this.listboxId}
                        aria-expanded=${this.open?"true":"false"}
                        aria-haspopup="listbox"
                        aria-labelledby="label"
                        aria-disabled=${this.disabled?"true":"false"}
                        aria-describedby="hint"
                        aria-invalid=${!this.validity.valid}
                        tabindex="0"
                        @input=${this.handleInputChange}
                        @focus=${this.handleFocus}
                        @blur=${this.handleBlur}
                      />
                    </div>
                  `:r.qy`
                    <input
                      part="combobox-input"
                      class="combobox-input"
                      type="text"
                      placeholder=${this.placeholder}
                      .disabled=${this.disabled}
                      .value=${this.inputValue}
                      ?required=${this.required}
                      autocomplete="off"
                      spellcheck="false"
                      autocapitalize="off"
                      role="combobox"
                      aria-autocomplete=${this.autocomplete}
                      aria-controls=${this.listboxId}
                      aria-expanded=${this.open?"true":"false"}
                      aria-haspopup="listbox"
                      aria-labelledby="label"
                      aria-disabled=${this.disabled?"true":"false"}
                      aria-describedby="hint"
                      aria-invalid=${!this.validity.valid}
                      tabindex="0"
                      @input=${this.handleInputChange}
                      @focus=${this.handleFocus}
                      @blur=${this.handleBlur}
                    />
                  `}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value??""}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${i?r.qy`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:r.s6}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id=${this.listboxId}
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>

          <!-- Live region for screen reader announcements -->
          <div class="live-region" aria-live="polite" aria-atomic="true"></div>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${(0,w.H)({"has-slotted":a})}
          aria-hidden=${a?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};C.css=[s,d.I,m.J],(0,f.Cc)([(0,g.P)(".combobox-popup")],C.prototype,"popup",2),(0,f.Cc)([(0,g.P)(".combobox")],C.prototype,"combobox",2),(0,f.Cc)([(0,g.P)(".combobox-input")],C.prototype,"comboboxInput",2),(0,f.Cc)([(0,g.P)(".value-input")],C.prototype,"valueInput",2),(0,f.Cc)([(0,g.P)(".listbox")],C.prototype,"listbox",2),(0,f.Cc)([(0,g.P)(".live-region")],C.prototype,"liveRegion",2),(0,f.Cc)([(0,g.wk)()],C.prototype,"currentOption",2),(0,f.Cc)([(0,g.wk)()],C.prototype,"selectedOptions",2),(0,f.Cc)([(0,g.wk)()],C.prototype,"optionValues",2),(0,f.Cc)([(0,g.wk)()],C.prototype,"filteredOptions",2),(0,f.Cc)([(0,g.wk)()],C.prototype,"inputValue",2),(0,f.Cc)([(0,g.MZ)({reflect:!0})],C.prototype,"name",2),(0,f.Cc)([(0,g.MZ)({attribute:!1})],C.prototype,"defaultValue",1),(0,f.Cc)([(0,g.MZ)({attribute:"value",reflect:!1})],C.prototype,"value",1),(0,f.Cc)([(0,g.MZ)({reflect:!0})],C.prototype,"size",2),(0,f.Cc)([(0,g.MZ)()],C.prototype,"placeholder",2),(0,f.Cc)([(0,g.MZ)({type:Boolean,reflect:!0})],C.prototype,"multiple",2),(0,f.Cc)([(0,g.MZ)({attribute:"max-options-visible",type:Number})],C.prototype,"maxOptionsVisible",2),(0,f.Cc)([(0,g.MZ)({type:Boolean})],C.prototype,"disabled",2),(0,f.Cc)([(0,g.MZ)({attribute:"with-clear",type:Boolean})],C.prototype,"withClear",2),(0,f.Cc)([(0,g.MZ)({type:Boolean,reflect:!0})],C.prototype,"open",2),(0,f.Cc)([(0,g.MZ)({reflect:!0})],C.prototype,"appearance",2),(0,f.Cc)([(0,g.MZ)({type:Boolean,reflect:!0})],C.prototype,"pill",2),(0,f.Cc)([(0,g.MZ)()],C.prototype,"label",2),(0,f.Cc)([(0,g.MZ)({reflect:!0})],C.prototype,"placement",2),(0,f.Cc)([(0,g.MZ)({attribute:"hint"})],C.prototype,"hint",2),(0,f.Cc)([(0,g.MZ)({attribute:"with-label",type:Boolean})],C.prototype,"withLabel",2),(0,f.Cc)([(0,g.MZ)({attribute:"with-hint",type:Boolean})],C.prototype,"withHint",2),(0,f.Cc)([(0,g.MZ)({type:Boolean,reflect:!0})],C.prototype,"required",2),(0,f.Cc)([(0,g.MZ)({reflect:!0})],C.prototype,"autocomplete",2),(0,f.Cc)([(0,g.MZ)({attribute:"allow-custom-value",type:Boolean})],C.prototype,"allowCustomValue",2),(0,f.Cc)([(0,g.MZ)({attribute:!1})],C.prototype,"filter",2),(0,f.Cc)([(0,g.MZ)({attribute:!1})],C.prototype,"getTag",2),(0,f.Cc)([(0,v.w)("disabled",{waitUntilFirstUpdate:!0})],C.prototype,"handleDisabledChange",1),(0,f.Cc)([(0,v.w)("value",{waitUntilFirstUpdate:!0})],C.prototype,"handleValueChange",1),(0,f.Cc)([(0,v.w)("open",{waitUntilFirstUpdate:!0})],C.prototype,"handleOpenChange",1),C=(0,f.Cc)([(0,g.EM)("wa-combobox")],C),o(4721),o(9081),o(3380),o(9685),o(8499),o(1404),o(6075),o(5949),o(5566),o(2590),o(517),o(3169),o(9456),o(1092),o(9610),o(2312),o(6127),o(1353),o(9373),o(5915)},1092(t,e,o){o.d(e,{D:()=>a});var a=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}}},1219(t,e,o){o.d(e,{XC:()=>c,c2:()=>d});const a=new Set,i=new Map;let r,s="ltr",n="en";const l="undefined"!=typeof MutationObserver&&"undefined"!=typeof document&&void 0!==document.documentElement;if(l){const t=new MutationObserver(h);s=document.documentElement.dir||"ltr",n=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function c(...t){t.map(t=>{const e=t.$code.toLowerCase();i.has(e)?i.set(e,Object.assign(Object.assign({},i.get(e)),t)):i.set(e,t),r||(r=t)}),h()}function h(){l&&(s=document.documentElement.dir||"ltr",n=document.documentElement.lang||navigator.language),[...a.keys()].map(t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()})}class d{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){a.add(this.host)}hostDisconnected(){a.delete(this.host)}dir(){return`${this.host.dir||s}`.toLowerCase()}lang(){return`${this.host.lang||n}`.toLowerCase()}getTranslationData(t){var e,o;const a=new Intl.Locale(t.replace(/_/g,"-")),r=null==a?void 0:a.language.toLowerCase(),s=null!==(o=null===(e=null==a?void 0:a.region)||void 0===e?void 0:e.toLowerCase())&&void 0!==o?o:"";return{locale:a,language:r,region:s,primary:i.get(`${r}-${s}`),secondary:i.get(r)}}exists(t,e){var o;const{primary:a,secondary:i}=this.getTranslationData(null!==(o=e.lang)&&void 0!==o?o:this.lang());return e=Object.assign({includeFallback:!1},e),!!(a&&a[t]||i&&i[t]||e.includeFallback&&r&&r[t])}term(t,...e){const{primary:o,secondary:a}=this.getTranslationData(this.lang());let i;if(o&&o[t])i=o[t];else if(a&&a[t])i=a[t];else{if(!r||!r[t])return console.error(`No translation found for: ${String(t)}`),String(t);i=r[t]}return"function"==typeof i?i(...e):i}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,e)}}},1287(t,e,o){o.d(e,{B:()=>a});var a=o(6337).AH`
  :host {
    --max-width: 30ch;

    /** These styles are added so we don't interfere in the DOM. */
    display: inline-block;
    position: absolute;

    /** Defaults for inherited CSS properties */
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    text-align: start;
    white-space: normal;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: 1000;
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-tooltip-border-radius);
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    padding: 0.25em 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  .tooltip::part(arrow) {
    border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
  }
`},1325(t,e,o){o.d(e,{W:()=>n,q:()=>l});var a=o(5915),i=o(7870),r=o(6337),s=o(7425),n=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}},l=class extends a._{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new n))},this.handleInteraction=t=>{const e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},r.S$||this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[{observedAttributes:["custom-error"],checkValidity(t){const e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}]}static get observedAttributes(){const t=new Set(super.observedAttributes||[]);for(const e of this.validators)if(e.observedAttributes)for(const o of e.observedAttributes)t.add(o);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(!r.S$&&t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")){const t=this.value;if(Array.isArray(t)){if(this.name){const e=new FormData;for(const o of t)e.append(this.name,o);this.setValue(e,e)}}else this.setValue(t,t)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!r.S$&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(t){t?this.setAttribute("form",t):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){const e=t[0],o=t[1];let a=t[2];a||(a=this.validationTarget),this.internals.setValidity(e,o,a||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){const t=Boolean(this.required),e=this.internals.validity.valid,o=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&o),this.customStates.set("user-valid",e&&o)}setCustomValidity(t){if(!t)return this.customError=null,void this.setValidity({});this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,"restore"===e&&this.resetValidity(),this.updateValidity()}setValue(...t){const[e,o]=t;this.internals.setFormValue(e,o)}get allValidators(){return[...this.constructor.validators||[],...this.validators||[]]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate)return void this.resetValidity();const t=this.allValidators;if(!t?.length)return;const e={customError:Boolean(this.customError)},o=this.validationTarget||this.input||void 0;let a="";for(const o of t){const{isValid:t,message:i,invalidKeys:r}=o.checkValidity(this);t||(a||(a=i),r?.length>=0&&r.forEach(t=>e[t]=!0))}a||(a=this.validationMessage),this.setValidity(e,a,o)}};l.formAssociated=!0,(0,i.Cc)([(0,s.MZ)({reflect:!0})],l.prototype,"name",2),(0,i.Cc)([(0,s.MZ)({type:Boolean})],l.prototype,"disabled",2),(0,i.Cc)([(0,s.MZ)({state:!0,attribute:!1})],l.prototype,"valueHasChanged",2),(0,i.Cc)([(0,s.MZ)({state:!0,attribute:!1})],l.prototype,"hasInteracted",2),(0,i.Cc)([(0,s.MZ)({attribute:"custom-error",reflect:!0})],l.prototype,"customError",2),(0,i.Cc)([(0,s.MZ)({attribute:!1,state:!0,type:Object})],l.prototype,"validity",1)},1353(t,e,o){o.d(e,{DT:()=>s,q_:()=>l});var a="",i="";function r(t){a=t}function s(t=""){if(!a){const t=document.querySelector("[data-webawesome]");if(t?.hasAttribute("data-webawesome"))r(new URL(t.getAttribute("data-webawesome")??"",window.location.href).pathname);else{const t=[...document.getElementsByTagName("script")].find(t=>t.src.endsWith("webawesome.js")||t.src.endsWith("webawesome.loader.js")||t.src.endsWith("webawesome.ssr-loader.js"));t&&r(String(t.getAttribute("src")).split("/").slice(0,-1).join("/"))}}return a.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}var n="7.0.1",l={name:"default",resolver:(t,e="classic",o="solid")=>function(t,e,o){const a=function(){if(!i){const e=document.querySelector("[data-fa-kit-code]");e&&(t=e.getAttribute("data-fa-kit-code")||"",i=t)}var t;return i}(),r=a.length>0;let s="solid";return"notdog"===e?("solid"===o&&(s="solid"),"duo-solid"===o&&(s="duo-solid"),`https://ka-p.fontawesome.com/releases/v${n}/svgs/notdog-${s}/${t}.svg?token=${encodeURIComponent(a)}`):"chisel"===e?`https://ka-p.fontawesome.com/releases/v${n}/svgs/chisel-regular/${t}.svg?token=${encodeURIComponent(a)}`:"etch"===e?`https://ka-p.fontawesome.com/releases/v${n}/svgs/etch-solid/${t}.svg?token=${encodeURIComponent(a)}`:"jelly"===e?("regular"===o&&(s="regular"),"duo-regular"===o&&(s="duo-regular"),"fill-regular"===o&&(s="fill-regular"),`https://ka-p.fontawesome.com/releases/v${n}/svgs/jelly-${s}/${t}.svg?token=${encodeURIComponent(a)}`):"slab"===e?("solid"!==o&&"regular"!==o||(s="regular"),"press-regular"===o&&(s="press-regular"),`https://ka-p.fontawesome.com/releases/v${n}/svgs/slab-${s}/${t}.svg?token=${encodeURIComponent(a)}`):"thumbprint"===e?`https://ka-p.fontawesome.com/releases/v${n}/svgs/thumbprint-light/${t}.svg?token=${encodeURIComponent(a)}`:"whiteboard"===e?`https://ka-p.fontawesome.com/releases/v${n}/svgs/whiteboard-semibold/${t}.svg?token=${encodeURIComponent(a)}`:("classic"===e&&("thin"===o&&(s="thin"),"light"===o&&(s="light"),"regular"===o&&(s="regular"),"solid"===o&&(s="solid")),"sharp"===e&&("thin"===o&&(s="sharp-thin"),"light"===o&&(s="sharp-light"),"regular"===o&&(s="sharp-regular"),"solid"===o&&(s="sharp-solid")),"duotone"===e&&("thin"===o&&(s="duotone-thin"),"light"===o&&(s="duotone-light"),"regular"===o&&(s="duotone-regular"),"solid"===o&&(s="duotone")),"sharp-duotone"===e&&("thin"===o&&(s="sharp-duotone-thin"),"light"===o&&(s="sharp-duotone-light"),"regular"===o&&(s="sharp-duotone-regular"),"solid"===o&&(s="sharp-duotone-solid")),"brands"===e&&(s="brands"),r?`https://ka-p.fontawesome.com/releases/v${n}/svgs/${s}/${t}.svg?token=${encodeURIComponent(a)}`:`https://ka-f.fontawesome.com/releases/v${n}/svgs/${s}/${t}.svg`)}(t,e,o),mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){const{family:o,variant:a}=e;if("duotone"===o||"sharp-duotone"===o||"notdog"===o&&"duo-solid"===a||"jelly"===o&&"duo-regular"===a||"thumbprint"===o){const o=[...t.querySelectorAll("path")],a=o.find(t=>!t.hasAttribute("opacity")),i=o.find(t=>t.hasAttribute("opacity"));if(!a||!i)return;if(a.setAttribute("data-duotone-primary",""),i.setAttribute("data-duotone-secondary",""),e.swapOpacity&&a&&i){const t=i.getAttribute("opacity")||"0.4";a.style.setProperty("--path-opacity",t),i.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}}},1404(t,e,o){o.d(e,{B:()=>a});var a=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}}},1416(t,e,o){var a=o(6337),i=a.AH`
  :host {
    display: block;
    background-color: var(--wa-color-surface-default);
    box-sizing: border-box;
    min-height: 100%;
    --menu-width: auto;
    --main-width: 1fr;
    --aside-width: auto;
    --banner-height: 0px;
    --header-height: 0px;
    --subheader-height: 0px;
    --scroll-margin-top: calc(var(--header-height, 0px) + var(--subheader-height, 0px) + 0.5em);

    --banner-top: var(--banner-height);
    --header-top: var(--header-height);
    --subheader-top: var(--subheader-height);
  }

  slot[name]:not([name='skip-to-content'], [name='navigation-toggle'])::slotted(*) {
    display: flex;
    background-color: var(--wa-color-surface-default);
  }

  ::slotted([slot='banner']) {
    align-items: center;
    justify-content: center;
    gap: var(--wa-space-m);
    padding: var(--wa-space-xs) var(--wa-space-m);
  }

  ::slotted([slot='header']) {
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--wa-space-m);
    padding: var(--wa-space-m);
    flex: auto;
  }

  ::slotted([slot='subheader']) {
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--wa-space-m);
    padding: var(--wa-space-xs) var(--wa-space-m);
  }

  ::slotted([slot*='navigation']),
  ::slotted([slot='menu']),
  ::slotted([slot='aside']) {
    flex-direction: column;
    gap: var(--wa-space-m);
    padding: var(--wa-space-m);
  }

  ::slotted([slot='main-header']) {
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--wa-space-m);
    padding: var(--wa-space-m) var(--wa-space-3xl);
  }

  slot:not([name]) {
    /* See #331 */
    &::slotted(main),
    &::slotted(section) {
      padding: var(--wa-space-3xl);
    }
  }

  ::slotted([slot='main-footer']),
  ::slotted([slot='footer']) {
    align-items: start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--wa-space-m);
    padding: var(--wa-space-3xl);
  }

  :host([disable-sticky~='banner']) {
    --banner-top: 0px;
  }
  :host([disable-sticky~='header']) {
    --header-top: 0px;
  }
  :host([disable-sticky~='subheader']) {
    --subheader-top: 0px;
  }

  /* Nothing else depends on subheader-height. */
  :host([disable-sticky~='subheader']) {
  }
  :host([disable-sticky~='aside']) [part~='aside'],
  :host([disable-sticky~='menu']) [part~='menu'] {
    height: unset;
    max-height: unset;
  }

  :host([disable-sticky~='banner']) [part~='banner'],
  :host([disable-sticky~='header']) [part~='header'],
  :host([disable-sticky~='subheader']) [part~='subheader'],
  :host([disable-sticky~='aside']) [part~='aside'],
  :host([disable-sticky~='menu']) [part~='menu'] {
    position: static;
    overflow: unset;
    z-index: unset;
  }

  :host([disable-sticky~='aside']) [part~='aside'],
  :host([disable-sticky~='menu']) [part~='menu'] {
    height: auto;
    max-height: auto;
  }

  [part~='base'] {
    min-height: 100dvh;
    display: grid;
    grid-template-rows: repeat(3, minmax(0, auto)) minmax(0, 1fr) minmax(0, auto);
    grid-template-columns: 100%;
    width: 100%;
    grid-template-areas:
      'banner'
      'header'
      'subheader'
      'body'
      'footer';
  }

  /* Grid areas */
  [part~='banner'] {
    grid-area: banner;
  }
  [part~='header'] {
    grid-area: header;
  }
  [part~='subheader'] {
    grid-area: subheader;
  }
  [part~='menu'] {
    grid-area: menu;
  }
  [part~='body'] {
    grid-area: body;
  }
  [part~='main'] {
    grid-area: main;
  }
  [part~='aside'] {
    grid-area: aside;
  }
  [part~='footer'] {
    grid-area: footer;
  }

  /* Z-indexes */
  [part~='banner'],
  [part~='header'],
  [part~='subheader'] {
    position: sticky;
    z-index: 5;
  }
  [part~='banner'] {
    top: 0px;
  }
  [part~='header'] {
    top: var(--banner-top);

    /** Make the header flex so that you don't unexpectedly have the default toggle button appearing above a slotted div because block elements are fun. */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  [part~='subheader'] {
    top: calc(var(--header-top) + var(--banner-top));
  }
  [part~='body'] {
    display: grid;
    min-height: 100%;
    align-items: flex-start;
    grid-template-columns: minmax(0, var(--menu-width)) minmax(0, var(--main-width)) minmax(0, var(--aside-width));
    grid-template-rows: minmax(0, 1fr);
    grid-template-areas: 'menu main aside';
  }
  [part~='main'] {
    display: grid;
    min-height: 100%;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
    grid-template-areas:
      'main-header'
      'main-content'
      'main-footer';
  }
  [part~='main-header'] {
    grid-area: main-header;
  }
  [part~='main-content'] {
    grid-area: main-content;
  }
  [part~='main-footer'] {
    grid-area: main-footer;
  }

  .skip-to-content {
    position: absolute;
    top: var(--wa-space-m);
    left: var(--wa-space-m);
    z-index: 6;
    border-radius: var(--wa-corners-1x);
    background-color: var(--wa-color-surface-default);
    color: var(--wa-color-text-link);
    text-decoration: none;
    padding: var(--wa-space-s) var(--wa-space-m);
    box-shadow: var(--wa-shadow-l);
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  [part~='menu'],
  [part~='aside'] {
    position: sticky;
    top: calc(var(--banner-top) + var(--header-top) + var(--subheader-top));
    z-index: 4;
    height: min(var(--main-height), calc(100dvh - var(--header-top) - var(--banner-top) - var(--subheader-top)));
    max-height: min(var(--main-height), calc(100dvh - var(--header-top) - var(--banner-top) - var(--subheader-top)));
    overflow: auto;
  }

  [part~='navigation'] {
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
  }

  [part~='drawer']::part(dialog) {
    background-color: var(--wa-color-surface-default);
  }

  /* Set these on the slot because we don't always control the navigation-toggle since that may be slotted. */
  slot[name~='navigation-toggle'],
  :host([disable-navigation-toggle]) slot[name~='navigation-toggle'] {
    display: none;
  }

  /* Sometimes the media query in the viewport is stubborn in iframes. This is an extra check to make it behave properly. */
  :host(:not([disable-navigation-toggle])[view='mobile']) slot[name~='navigation-toggle'] {
    display: contents;
  }

  [part~='navigation-toggle'] {
    /* Use only a margin-inline-start because the slotted header is expected to have default padding
        so it looks really awkward if this sets a margin-inline-end and the slotted header has a padding-inline-start. */
    margin-inline-start: var(--wa-space-m);
  }
`,r=a.AH`
  .wa-visually-hidden:not(:focus-within),
  .wa-visually-hidden-force,
  .wa-visually-hidden-hint::part(hint),
  .wa-visually-hidden-label::part(label) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`,s=o(5915),n=o(7870),l=o(7425),c=o(538),h=o(6781);function d(t,e=document.documentElement){if(!Number.isNaN(Number(t)))return Number(t);if(!window.CSS||!CSS.registerProperty)return"string"==typeof t&&t.endsWith("px")?parseFloat(t):Number(t)||0;const o="--wa-length-resolver";if(!CSS.registerProperty.toString().includes(o))try{CSS.registerProperty({name:o,syntax:"<length>",inherits:!1,initialValue:"0px"})}catch(t){}const a=e.style.getPropertyValue(o);e.style.setProperty(o,t);const i=getComputedStyle(e)?.getPropertyValue(o);return e.style.setProperty(o,a),i?.endsWith("px")?parseFloat(i):Number(i)||0}"undefined"==typeof ResizeObserver&&(globalThis.ResizeObserver=class{constructor(...t){}observe(...t){}unobserve(...t){}disconnect(...t){}});var u=class extends s._{constructor(){super(),this.headerResizeObserver=this.slotResizeObserver("header"),this.subheaderResizeObserver=this.slotResizeObserver("subheader"),this.bannerResizeObserver=this.slotResizeObserver("banner"),this.footerResizeObserver=this.slotResizeObserver("footer"),this.handleNavigationToggle=t=>{if("desktop"===this.view)return void this.hideNavigation();const e=t.composedPath(),o=this.navigationToggleSlot;e.find(t=>t.hasAttribute?.("data-toggle-nav")||t.assignedSlot===o||t===o)&&(t.preventDefault(),this.toggleNavigation())},this.view="desktop",this.navOpen=!1,this.mobileBreakpoint="768px",this.navigationPlacement="start",this.disableNavigationToggle=!1,this.pageResizeObserver=new ResizeObserver(t=>{for(const e of t)if(e.contentBoxSize){const t=e.borderBoxSize[0].inlineSize,o=this.view;t>=d(this.mobileBreakpoint)?this.view="desktop":this.view="mobile",this.requestUpdate("view",o)}t.length>0&&this.updateAsideAndMenuHeights()}),this.updateAsideAndMenuHeights=()=>{const t=this.visiblePixelsInViewport(this.main);null!=t&&(this.aside.style.setProperty("--main-height",`${t}px`),this.menu.style.setProperty("--main-height",`${t}px`))},a.S$||this.addEventListener("click",this.handleNavigationToggle)}slotResizeObserver(t){return new ResizeObserver(e=>{for(const o of e)if(o.contentBoxSize){const e=o.borderBoxSize[0];this.style.setProperty(`--${t}-height`,`${e.blockSize}px`)}})}update(t){t.has("view")&&this.hideNavigation(),super.update(t)}connectedCallback(){super.connectedCallback(),this.pageResizeObserver.observe(this),document.addEventListener("scroll",this.updateAsideAndMenuHeights,{passive:!0}),this.updateAsideAndMenuHeights(),setTimeout(this.updateAsideAndMenuHeights);const t=":not([slot='toggle-navigation']) [data-toggle-nav]";this.disableNavigationToggle=Boolean(this.querySelector(t)),setTimeout(()=>{this.headerResizeObserver.observe(this.header),this.subheaderResizeObserver.observe(this.subheader),this.bannerResizeObserver.observe(this.banner),this.footerResizeObserver.observe(this.footer),this.disableNavigationToggle=Boolean(this.querySelector(t))})}visiblePixelsInViewport(t){if(!t)return null;const e=t.clientHeight,o=window.innerHeight,{top:a,bottom:i}=t.getBoundingClientRect();return Math.max(0,a>0?Math.min(e,o-a):Math.min(i,o))}firstUpdated(){if(!document.getElementById("main-content")){const t=document.createElement("div");t.id="main-content",t.slot="skip-to-content-target",this.prepend(t)}}disconnectedCallback(){super.disconnectedCallback(),this.pageResizeObserver.unobserve(this),this.headerResizeObserver.unobserve(this.header),this.subheaderResizeObserver.unobserve(this.subheader),this.footerResizeObserver.unobserve(this.footer),this.bannerResizeObserver.unobserve(this.banner)}showNavigation(){this.navOpen=!0}hideNavigation(){this.navOpen=!1}toggleNavigation(){this.navOpen=!this.navOpen}render(){return a.qy`
      <a href="#main-content" part="skip-to-content" class="wa-visually-hidden">
        <slot name="skip-to-content">Skip to content</slot>
      </a>

      <!-- unsafeHTML needed for SSR until this is solved: https://github.com/lit/lit/issues/4696 -->
      ${(0,h._)(`\n        <style id="mobile-styles">\n          ${((t="768px")=>`\n  @media screen and (width < ${t}) {\n    [part~='navigation'] {\n      display: none;\n    }\n\n    :host(:not([disable-navigation-toggle])) slot[name~='navigation-toggle'] {\n      display: contents;\n    }\n  }\n`)((t=this.mobileBreakpoint,Number.isNaN(Number(t))?t:`${t}px`))}\n        </style>\n      `)}

      <div class="base" part="base">
        <div class="banner" part="banner">
          <slot name="banner"></slot>
        </div>
        <div class="header" part="header">
          <slot name="navigation-toggle">
            <wa-button part="navigation-toggle" size="small" appearance="plain" variant="neutral">
              <slot name="navigation-toggle-icon">
                <wa-icon name="bars" part="navigation-toggle-icon" label="Toggle navigation drawer"></wa-icon>
              </slot>
            </wa-button>
          </slot>
          <slot name="header"></slot>
        </div>
        <div class="subheader" part="subheader">
          <slot name="subheader"></slot>
        </div>
        <div class="body" part="body">
          <div class="menu" part="menu">
            <slot name="menu">
              <nav name="navigation" class="navigation" part="navigation navigation-desktop">
                <!-- Add fallback divs so that CSS grid works properly. -->
                <slot name="desktop-navigation-header">
                  <slot name=${"desktop"===this.view?"navigation-header":"___"}><div></div></slot>
                </slot>
                <slot name="desktop-navigation">
                  <slot name=${"desktop"===this.view?"navigation":"____"}><div></div></slot>
                </slot>
                <slot name="desktop-navigation-footer">
                  <slot name=${"desktop"===this.view?"navigation-footer":"___"}><div></div></slot>
                </slot>
              </nav>
            </slot>
          </div>
          <div class="main" part="main">
            <div class="main-header" part="main-header">
              <slot name="main-header"></slot>
            </div>
            <div class="main-content" part="main-content">
              <slot name="skip-to-content-target"></slot>
              <slot></slot>
            </div>
            <div class="main-footer" part="main-footer">
              <slot name="main-footer"></slot>
            </div>
          </div>
          <div class="aside" part="aside">
            <slot name="aside"></slot>
          </div>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <wa-drawer
        part="drawer"
        placement=${this.navigationPlacement}
        light-dismiss
        ?open=${(0,c.V)(this.navOpen)}
        @wa-after-show=${()=>this.navOpen=this.navigationDrawer.open}
        @wa-after-hide=${()=>this.navOpen=this.navigationDrawer.open}
        exportparts="
          dialog:drawer__dialog,
          overlay:drawer__overlay,
          panel:drawer__panel,
          header:drawer__header,
          header-actions:drawer__header-actions,
          title:drawer__title,
          close-button:drawer__close-button,
          close-button__base:drawer__close-button__base,
          body:drawer__body,
          footer:drawer__footer
        "
        class="navigation-drawer"
      >
        <slot slot="label" part="navigation-header" name="mobile-navigation-header">
          <slot name=${"mobile"===this.view?"navigation-header":"___"}></slot>
        </slot>
        <slot name="mobile-navigation">
          <slot name=${"mobile"===this.view?"navigation":"____"}></slot>
        </slot>

        <slot slot="footer" name="mobile-navigation-footer">
          <slot part="navigation-footer" name=${"mobile"===this.view?"navigation-footer":"___"}></slot>
        </slot>
      </wa-drawer>
    `;var t}};u.css=[r,i],(0,n.Cc)([(0,l.P)("[part~='header']")],u.prototype,"header",2),(0,n.Cc)([(0,l.P)("[part~='menu']")],u.prototype,"menu",2),(0,n.Cc)([(0,l.P)("[part~='main']")],u.prototype,"main",2),(0,n.Cc)([(0,l.P)("[part~='aside']")],u.prototype,"aside",2),(0,n.Cc)([(0,l.P)("[part~='subheader']")],u.prototype,"subheader",2),(0,n.Cc)([(0,l.P)("[part~='footer']")],u.prototype,"footer",2),(0,n.Cc)([(0,l.P)("[part~='banner']")],u.prototype,"banner",2),(0,n.Cc)([(0,l.P)("[part~='drawer']")],u.prototype,"navigationDrawer",2),(0,n.Cc)([(0,l.P)("slot[name~='navigation-toggle']")],u.prototype,"navigationToggleSlot",2),(0,n.Cc)([(0,l.MZ)({attribute:"view",reflect:!0})],u.prototype,"view",2),(0,n.Cc)([(0,l.MZ)({attribute:"nav-open",reflect:!0,type:Boolean})],u.prototype,"navOpen",2),(0,n.Cc)([(0,l.MZ)({attribute:"mobile-breakpoint",type:String})],u.prototype,"mobileBreakpoint",2),(0,n.Cc)([(0,l.MZ)({attribute:"navigation-placement",reflect:!0})],u.prototype,"navigationPlacement",2),(0,n.Cc)([(0,l.MZ)({attribute:"disable-navigation-toggle",reflect:!0,type:Boolean})],u.prototype,"disableNavigationToggle",2),u=(0,n.Cc)([(0,l.EM)("wa-page")],u);var p=new CSSStyleSheet;p.replaceSync("\n:is(html, body):has(wa-page) {\n  min-height: 100%;\n  padding: 0;\n  margin: 0;\n}\n\n  /**\n  Because headers are sticky, this is needed to make sure page fragment anchors scroll down past the headers / subheaders and are visible.\n  IE: `<a href=\"#id-for-h2\">` anchors.\n  */\n  wa-page :is(*, *:after, *:before) {\n  scroll-margin-top: var(--scroll-margin-top);\n  }\n\n  wa-page[view='desktop'] [data-toggle-nav] {\n  display: none;\n  }\n\n  wa-page[view='mobile'] .wa-desktop-only, wa-page[view='desktop'] .wa-mobile-only {\n  display: none !important;\n  }\n"),document.adoptedStyleSheets=[...document.adoptedStyleSheets,p];var m=o(8272),b=a.AH`
  :host {
    --size: 25rem;
    --spacing: var(--wa-space-l);
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .drawer {
    display: flex;
    flex-direction: column;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    background-color: var(--wa-color-surface-raised);
    border: none;
    box-shadow: var(--wa-shadow-l);
    overflow: auto;
    padding: 0;
    margin: 0;
    animation-duration: var(--show-duration);
    animation-timing-function: ease;

    &.show::backdrop {
      animation: show-backdrop var(--show-duration, 200ms) ease;
    }

    &.hide::backdrop {
      animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
    }

    &.show.top {
      animation: show-drawer-from-top var(--show-duration) ease;
    }

    &.hide.top {
      animation: show-drawer-from-top var(--hide-duration) ease reverse;
    }

    &.show.end {
      animation: show-drawer-from-end var(--show-duration) ease;

      &:dir(rtl) {
        animation-name: show-drawer-from-start;
      }
    }

    &.hide.end {
      animation: show-drawer-from-end var(--hide-duration) ease reverse;

      &:dir(rtl) {
        animation-name: show-drawer-from-start;
      }
    }

    &.show.bottom {
      animation: show-drawer-from-bottom var(--show-duration) ease;
    }

    &.hide.bottom {
      animation: show-drawer-from-bottom var(--hide-duration) ease reverse;
    }

    &.show.start {
      animation: show-drawer-from-start var(--show-duration) ease;

      &:dir(rtl) {
        animation-name: show-drawer-from-end;
      }
    }

    &.hide.start {
      animation: show-drawer-from-start var(--hide-duration) ease reverse;

      &:dir(rtl) {
        animation-name: show-drawer-from-end;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .drawer:focus {
    outline: none;
  }

  .top {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .end {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .bottom {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .start {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .header {
    display: flex;
    flex-wrap: nowrap;
    padding-inline-start: var(--spacing);
    padding-block-end: 0;

    /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
    padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
    padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
  }

  .title {
    align-self: center;
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--wa-font-size-l);
    font-weight: var(--wa-font-weight-heading);
    line-height: var(--wa-line-height-condensed);
    margin: 0;
  }

  .header-actions {
    align-self: start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--wa-space-2xs);
    padding-inline-start: var(--spacing);
  }

  .header-actions wa-button,
  .header-actions ::slotted(wa-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1 1 auto;
    display: block;
    padding: var(--spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  .footer {
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:last-of-type)) {
    margin-inline-end: var(--wa-spacing-xs);
  }

  .drawer::backdrop {
    /*
        NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
        remove the fallback values here.
      */
    background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.01;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-drawer {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-drawer-from-top {
    from {
      opacity: 0;
      translate: 0 -100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-end {
    from {
      opacity: 0;
      translate: 100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-bottom {
    from {
      opacity: 0;
      translate: 0 100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-start {
    from {
      opacity: 0;
      translate: -100% 0;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .drawer {
      border: solid 1px white;
    }
  }
`,v=o(5280),f=o(4115),g=o(7434),w=o(4411),y=o(9359),x=o(2346),C=o(3720),k=class extends s._{constructor(){super(...arguments),this.localize=new y.c(this),this.hasSlotController=new w.X(this,"footer","header-actions","label"),this.open=!1,this.label="",this.placement="end",this.withoutHeader=!1,this.lightDismiss=!0,this.handleDocumentKeyDown=t=>{"Escape"===t.key&&this.open&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.drawer))}}firstUpdated(){a.S$||this.open&&(this.addOpenListeners(),this.drawer.showModal(),(0,v.JG)(this))}disconnectedCallback(){super.disconnectedCallback(),(0,v.I7)(this),this.removeOpenListeners()}async requestClose(t){const e=new f.Lq({source:t});if(this.dispatchEvent(e),e.defaultPrevented)return this.open=!0,void(0,g.Ud)(this.drawer,"pulse");this.removeOpenListeners(),await(0,g.Ud)(this.drawer,"hide"),this.open=!1,this.drawer.close(),(0,v.I7)(this);const o=this.originalTrigger;"function"==typeof o?.focus&&setTimeout(()=>o.focus()),this.dispatchEvent(new f.Z1)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(t){t.preventDefault(),this.drawer.classList.contains("hide")||t.target!==this.drawer||this.requestClose(this.drawer)}handleDialogClick(t){const e=t.target.closest('[data-drawer="close"]');e&&(t.stopPropagation(),this.requestClose(e))}async handleDialogPointerDown(t){t.target===this.drawer&&(this.lightDismiss?this.requestClose(this.drawer):await(0,g.Ud)(this.drawer,"pulse"))}handleOpenChange(){this.open&&!this.drawer.open?this.show():this.drawer.open&&(this.open=!0,this.requestClose(this.drawer))}async show(){const t=new f.kB;this.dispatchEvent(t),t.defaultPrevented?this.open=!1:(this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.drawer.showModal(),(0,v.JG)(this),requestAnimationFrame(()=>{const t=this.querySelector("[autofocus]");t&&"function"==typeof t.focus?t.focus():this.drawer.focus()}),await(0,g.Ud)(this.drawer,"show"),this.dispatchEvent(new f.qu))}render(){const t=!this.withoutHeader,e=this.hasSlotController.test("footer");return a.qy`
      <dialog
        part="dialog"
        class=${(0,C.H)({drawer:!0,open:this.open,top:"top"===this.placement,end:"end"===this.placement,bottom:"bottom"===this.placement,start:"start"===this.placement})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?a.qy`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(8203)} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${t=>this.requestClose(t.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        ${e?a.qy`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};k.css=b,(0,n.Cc)([(0,l.P)(".drawer")],k.prototype,"drawer",2),(0,n.Cc)([(0,l.MZ)({type:Boolean,reflect:!0})],k.prototype,"open",2),(0,n.Cc)([(0,l.MZ)({reflect:!0})],k.prototype,"label",2),(0,n.Cc)([(0,l.MZ)({reflect:!0})],k.prototype,"placement",2),(0,n.Cc)([(0,l.MZ)({attribute:"without-header",type:Boolean,reflect:!0})],k.prototype,"withoutHeader",2),(0,n.Cc)([(0,l.MZ)({attribute:"light-dismiss",type:Boolean})],k.prototype,"lightDismiss",2),(0,n.Cc)([(0,x.w)("open",{waitUntilFirstUpdate:!0})],k.prototype,"handleOpenChange",1),k=(0,n.Cc)([(0,l.EM)("wa-drawer")],k),document.addEventListener("click",t=>{const e=t.target.closest("[data-drawer]");if(e instanceof Element){const[t,o]=(0,m.v)(e.getAttribute("data-drawer")||"");if("open"===t&&o?.length){const t=e.getRootNode().getElementById(o);"wa-drawer"===t?.localName?t.open=!0:console.warn(`A drawer with an ID of "${o}" could not be found in this document.`)}}}),a.S$||document.body.addEventListener("pointerdown",()=>{}),o(5949),o(5566),o(2590),o(1325),o(517),o(4671),o(3169),o(9456),o(1092),o(9610),o(2312),o(6127),o(1353),o(9373)},1501(t,e,o){var a=o(8181),i=o(2346),r=o(5915),s=o(7870),n=o(6337),l=o(7425),c=o(3720),h=0,d=class extends r._{constructor(){super(...arguments),this.attrId=++h,this.componentId=`wa-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return n.qy`
      <slot
        part="base"
        class=${(0,c.H)({"tab-panel":!0,"tab-panel-active":this.active})}
      ></slot>
    `}};d.css=a.W,(0,s.Cc)([(0,l.MZ)({reflect:!0})],d.prototype,"name",2),(0,s.Cc)([(0,l.MZ)({type:Boolean,reflect:!0})],d.prototype,"active",2),(0,s.Cc)([(0,i.w)("active")],d.prototype,"handleActiveChange",1),d=(0,s.Cc)([(0,l.EM)("wa-tab-panel")],d)},1590(t,e,o){function a(t,e){return new Promise(o=>{t.addEventListener(e,function a(i){i.target===t&&(t.removeEventListener(e,a),o())})})}o.d(e,{l:()=>a})},1625(t,e,o){var a=o(9359),i=o(5915),r=o(7870),s=o(7425),n=class extends i._{constructor(){super(...arguments),this.localize=new a.c(this),this.value=0,this.type="decimal",this.withoutGrouping=!1,this.currency="USD",this.currencyDisplay="symbol"}static get styles(){return[]}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.withoutGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};(0,r.Cc)([(0,s.MZ)({type:Number})],n.prototype,"value",2),(0,r.Cc)([(0,s.MZ)()],n.prototype,"type",2),(0,r.Cc)([(0,s.MZ)({attribute:"without-grouping",type:Boolean})],n.prototype,"withoutGrouping",2),(0,r.Cc)([(0,s.MZ)()],n.prototype,"currency",2),(0,r.Cc)([(0,s.MZ)({attribute:"currency-display"})],n.prototype,"currencyDisplay",2),(0,r.Cc)([(0,s.MZ)({attribute:"minimum-integer-digits",type:Number})],n.prototype,"minimumIntegerDigits",2),(0,r.Cc)([(0,s.MZ)({attribute:"minimum-fraction-digits",type:Number})],n.prototype,"minimumFractionDigits",2),(0,r.Cc)([(0,s.MZ)({attribute:"maximum-fraction-digits",type:Number})],n.prototype,"maximumFractionDigits",2),(0,r.Cc)([(0,s.MZ)({attribute:"minimum-significant-digits",type:Number})],n.prototype,"minimumSignificantDigits",2),(0,r.Cc)([(0,s.MZ)({attribute:"maximum-significant-digits",type:Number})],n.prototype,"maximumSignificantDigits",2),n=(0,r.Cc)([(0,s.EM)("wa-format-number")],n),o(2312)},1754(t,e,o){o.d(e,{I:()=>a});var a=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}}},2139(t,e,o){var a=o(6337),i=a.AH`
  :host {
    --show-duration: 50ms;
    --hide-duration: 50ms;
    display: contents;
  }

  #menu {
    display: flex;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;
    overflow: auto;
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;

    &.show {
      animation: show var(--show-duration) ease;
    }

    &.hide {
      animation: show var(--hide-duration) ease reverse;
    }

    ::slotted(h1),
    ::slotted(h2),
    ::slotted(h3),
    ::slotted(h4),
    ::slotted(h5),
    ::slotted(h6) {
      display: block !important;
      margin: 0.25em 0 !important;
      padding: 0.25em 0.75em !important;
      color: var(--wa-color-text-quiet) !important;
      font-family: var(--wa-font-family-body) !important;
      font-weight: var(--wa-font-weight-semibold) !important;
      font-size: var(--wa-font-size-smaller) !important;
    }

    ::slotted(wa-divider) {
      --spacing: 0.25em; /* Component-specific, left as-is */
    }
  }

  wa-popup[data-current-placement^='top'] #menu {
    transform-origin: bottom;
  }

  wa-popup[data-current-placement^='bottom'] #menu {
    transform-origin: top;
  }

  wa-popup[data-current-placement^='left'] #menu {
    transform-origin: right;
  }

  wa-popup[data-current-placement^='right'] #menu {
    transform-origin: left;
  }

  wa-popup[data-current-placement='left-start'] #menu {
    transform-origin: right top;
  }

  wa-popup[data-current-placement='left-end'] #menu {
    transform-origin: right bottom;
  }

  wa-popup[data-current-placement='right-start'] #menu {
    transform-origin: left top;
  }

  wa-popup[data-current-placement='right-end'] #menu {
    transform-origin: left bottom;
  }

  @keyframes show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`,r=o(4115),s=o(9746),n=o(7434),l=o(4671),c=o(9359),h=o(5915),d=o(7870),u=o(7315),p=o(7425),m=class extends Event{constructor(t){super("wa-select",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};function*b(t=document.activeElement){null!=t&&(yield t,"shadowRoot"in t&&t.shadowRoot&&"closed"!==t.shadowRoot.mode&&(yield*b(t.shadowRoot.activeElement)))}var v=new Set,f=class extends h._{constructor(){super(...arguments),this.submenuCleanups=new Map,this.localize=new c.c(this),this.userTypedQuery="",this.openSubmenuStack=[],this.open=!1,this.size="medium",this.placement="bottom-start",this.distance=0,this.skidding=0,this.handleDocumentKeyDown=async t=>{const e="rtl"===this.localize.dir();if("Escape"===t.key){const e=this.getTrigger();return t.preventDefault(),t.stopPropagation(),this.open=!1,void e?.focus()}const o=[...b()].find(t=>"wa-dropdown-item"===t.localName),a="wa-dropdown-item"===o?.localName,i=this.getCurrentSubmenuItem(),r=!!i;let s,n,l,c;if(r?(s=this.getSubmenuItems(i),n=s.find(t=>t.active||t===o),l=n?s.indexOf(n):-1):(s=this.getItems(),n=s.find(t=>t.active||t===o),l=n?s.indexOf(n):-1),"ArrowUp"===t.key&&(t.preventDefault(),t.stopPropagation(),c=l>0?s[l-1]:s[s.length-1]),"ArrowDown"===t.key&&(t.preventDefault(),t.stopPropagation(),c=-1!==l&&l<s.length-1?s[l+1]:s[0]),t.key===(e?"ArrowLeft":"ArrowRight")&&a&&n&&n.hasSubmenu)return t.preventDefault(),t.stopPropagation(),n.submenuOpen=!0,this.addToSubmenuStack(n),void setTimeout(()=>{const t=this.getSubmenuItems(n);t.length>0&&(t.forEach((t,e)=>t.active=0===e),t[0].focus())},0);if(t.key===(e?"ArrowRight":"ArrowLeft")&&r){t.preventDefault(),t.stopPropagation();const e=this.removeFromSubmenuStack();return void(e&&(e.submenuOpen=!1,setTimeout(()=>{e.focus(),e.active=!0,("submenu"===e.slot?this.getSubmenuItems(e.parentElement):this.getItems()).forEach(t=>{t!==e&&(t.active=!1)})},0)))}if("Home"!==t.key&&"End"!==t.key||(t.preventDefault(),t.stopPropagation(),c="Home"===t.key?s[0]:s[s.length-1]),"Tab"===t.key&&await this.hideMenu(),1!==t.key.length||t.metaKey||t.ctrlKey||t.altKey||" "===t.key&&""===this.userTypedQuery||(clearTimeout(this.userTypedTimeout),this.userTypedTimeout=setTimeout(()=>{this.userTypedQuery=""},1e3),this.userTypedQuery+=t.key,s.some(t=>{const e=(t.textContent||"").trim().toLowerCase(),o=this.userTypedQuery.trim().toLowerCase();return!!e.startsWith(o)&&(c=t,!0)})),c)return t.preventDefault(),t.stopPropagation(),s.forEach(t=>t.active=t===c),void c.focus();("Enter"===t.key||" "===t.key&&""===this.userTypedQuery)&&a&&n&&(t.preventDefault(),t.stopPropagation(),n.hasSubmenu?(n.submenuOpen=!0,this.addToSubmenuStack(n),setTimeout(()=>{const t=this.getSubmenuItems(n);t.length>0&&(t.forEach((t,e)=>t.active=0===e),t[0].focus())},0)):this.makeSelection(n))},this.handleDocumentPointerDown=t=>{t.composedPath().some(t=>t instanceof HTMLElement&&(t===this||t.closest('wa-dropdown, [part="submenu"]')))||(this.open=!1)},this.handleGlobalMouseMove=t=>{const e=this.getCurrentSubmenuItem();if(!e?.submenuOpen||!e.submenuElement)return;const o=e.submenuElement.getBoundingClientRect(),a="rtl"===this.localize.dir(),i=a?o.right:o.left,r=a?Math.max(t.clientX,i):Math.min(t.clientX,i),s=Math.max(o.top,Math.min(t.clientY,o.bottom));e.submenuElement.style.setProperty("--safe-triangle-cursor-x",`${r}px`),e.submenuElement.style.setProperty("--safe-triangle-cursor-y",`${s}px`);const n=e.matches(":hover"),l=e.submenuElement?.matches(":hover")||!!t.composedPath().find(t=>t instanceof HTMLElement&&t.closest('[part="submenu"]')===e.submenuElement);n||l||setTimeout(()=>{e.matches(":hover")||e.submenuElement?.matches(":hover")||(e.submenuOpen=!1)},100)}}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.userTypedTimeout),this.closeAllSubmenus(),this.submenuCleanups.forEach(t=>t()),this.submenuCleanups.clear(),document.removeEventListener("mousemove",this.handleGlobalMouseMove)}firstUpdated(){this.syncAriaAttributes()}async updated(t){if(t.has("open")){const e=t.get("open");if(e===this.open)return;if(void 0===e&&!1===this.open)return;this.customStates.set("open",this.open),this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu())}t.has("size")&&this.syncItemSizes()}getItems(t=!1){const e=this.defaultSlot.assignedElements({flatten:!0}).filter(t=>"wa-dropdown-item"===t.localName);return t?e:e.filter(t=>!t.disabled)}getSubmenuItems(t,e=!1){const o=t.shadowRoot?.querySelector('slot[name="submenu"]')||t.querySelector('slot[name="submenu"]');if(!o)return[];const a=o.assignedElements({flatten:!0}).filter(t=>"wa-dropdown-item"===t.localName);return e?a:a.filter(t=>!t.disabled)}syncItemSizes(){this.defaultSlot.assignedElements({flatten:!0}).filter(t=>"wa-dropdown-item"===t.localName).forEach(t=>t.size=this.size)}addToSubmenuStack(t){const e=this.openSubmenuStack.indexOf(t);-1!==e?this.openSubmenuStack=this.openSubmenuStack.slice(0,e+1):this.openSubmenuStack.push(t)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(t=>{t.submenuOpen=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(t){const e=t.closest('wa-dropdown-item:not([slot="submenu"])');let o;o=e?this.getSubmenuItems(e,!0):this.getItems(!0),o.forEach(e=>{e!==t&&e.submenuOpen&&(e.submenuOpen=!1)}),this.openSubmenuStack.includes(t)||this.openSubmenuStack.push(t)}getTrigger(){return this.querySelector('[slot="trigger"]')}async showMenu(){if(!this.getTrigger())return;const t=new r.kB;if(this.dispatchEvent(t),t.defaultPrevented)return void(this.open=!1);if(this.popup.active)return;v.forEach(t=>t.open=!1),this.popup.active=!0,this.open=!0,v.add(this),this.syncAriaAttributes(),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("pointerdown",this.handleDocumentPointerDown),document.addEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("hide"),await(0,n.Ud)(this.menu,"show");const e=this.getItems();e.length>0&&(e.forEach((t,e)=>t.active=0===e),e[0].focus()),this.dispatchEvent(new r.qu)}async hideMenu(){const t=new r.Lq({source:this});this.dispatchEvent(t),t.defaultPrevented?this.open=!0:(this.open=!1,v.delete(this),this.syncAriaAttributes(),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),document.removeEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("show"),await(0,n.Ud)(this.menu,"hide"),this.popup.active=this.open,this.dispatchEvent(new r.Z1))}handleMenuClick(t){const e=t.target.closest("wa-dropdown-item");if(e&&!e.disabled)return e.hasSubmenu?(e.submenuOpen||(this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),e.submenuOpen=!0),void t.stopPropagation()):void this.makeSelection(e)}async handleMenuSlotChange(){const t=this.getItems(!0);await Promise.all(t.map(t=>t.updateComplete)),this.syncItemSizes();const e=t.some(t=>"checkbox"===t.type),o=t.some(t=>t.hasSubmenu);t.forEach((t,a)=>{t.active=0===a,t.checkboxAdjacent=e,t.submenuAdjacent=o})}handleTriggerClick(){this.open=!this.open}handleSubmenuOpening(t){const e=t.detail.item;this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),this.setupSubmenuPosition(e),this.processSubmenuItems(e)}setupSubmenuPosition(t){if(!t.submenuElement)return;this.cleanupSubmenuPosition(t);const e=(0,u.ll)(t,t.submenuElement,()=>{this.positionSubmenu(t),this.updateSafeTriangleCoordinates(t)});this.submenuCleanups.set(t,e);const o=t.submenuElement.querySelector('slot[name="submenu"]');o&&(o.removeEventListener("slotchange",f.handleSubmenuSlotChange),o.addEventListener("slotchange",f.handleSubmenuSlotChange),f.handleSubmenuSlotChange({target:o}))}static handleSubmenuSlotChange(t){const e=t.target;if(!e)return;const o=e.assignedElements().filter(t=>"wa-dropdown-item"===t.localName);if(0===o.length)return;const a=o.some(t=>t.hasSubmenu),i=o.some(t=>"checkbox"===t.type);o.forEach(t=>{t.submenuAdjacent=a,t.checkboxAdjacent=i})}processSubmenuItems(t){if(!t.submenuElement)return;const e=this.getSubmenuItems(t,!0),o=e.some(t=>t.hasSubmenu);e.forEach(t=>{t.submenuAdjacent=o})}cleanupSubmenuPosition(t){const e=this.submenuCleanups.get(t);e&&(e(),this.submenuCleanups.delete(t))}positionSubmenu(t){if(!t.submenuElement)return;const e="rtl"===this.localize.dir()?"left-start":"right-start";(0,u.rD)(t,t.submenuElement,{placement:e,middleware:[(0,u.cY)({mainAxis:0,crossAxis:-5}),(0,u.UU)({fallbackStrategy:"bestFit"}),(0,u.BN)({padding:8})]}).then(({x:e,y:o,placement:a})=>{t.submenuElement.setAttribute("data-placement",a),Object.assign(t.submenuElement.style,{left:`${e}px`,top:`${o}px`})})}updateSafeTriangleCoordinates(t){if(!t.submenuElement||!t.submenuOpen)return;const e=document.activeElement?.matches(":focus-visible");if(e)return void t.submenuElement.style.setProperty("--safe-triangle-visible","none");t.submenuElement.style.setProperty("--safe-triangle-visible","block");const o=t.submenuElement.getBoundingClientRect(),a="rtl"===this.localize.dir();t.submenuElement.style.setProperty("--safe-triangle-submenu-start-x",`${a?o.right:o.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-start-y",`${o.top}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-x",`${a?o.right:o.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-y",`${o.bottom}px`)}makeSelection(t){const e=this.getTrigger();if(t.disabled)return;"checkbox"===t.type&&(t.checked=!t.checked);const o=new m({item:t});this.dispatchEvent(o),o.defaultPrevented||(this.open=!1,e?.focus())}async syncAriaAttributes(){const t=this.getTrigger();let e;t&&("wa-button"===t.localName?(await customElements.whenDefined("wa-button"),await t.updateComplete,e=t.shadowRoot.querySelector('[part="base"]')):e=t,e.hasAttribute("id")||e.setAttribute("id",(0,s.N)("wa-dropdown-trigger-")),e.setAttribute("aria-haspopup","menu"),e.setAttribute("aria-expanded",this.open?"true":"false"),this.menu.setAttribute("aria-expanded","false"))}render(){let t=this.hasUpdated?this.popup.active:this.open;return a.qy`
      <wa-popup
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        ?active=${t}
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot
          name="trigger"
          slot="anchor"
          @click=${this.handleTriggerClick}
          @slotchange=${this.syncAriaAttributes}
        ></slot>
        <div
          id="menu"
          part="menu"
          role="menu"
          tabindex="-1"
          aria-orientation="vertical"
          @click=${this.handleMenuClick}
          @submenu-opening=${this.handleSubmenuOpening}
        >
          <slot @slotchange=${this.handleMenuSlotChange}></slot>
        </div>
      </wa-popup>
    `}};f.css=[l.J,i],(0,d.Cc)([(0,p.P)("slot:not([name])")],f.prototype,"defaultSlot",2),(0,d.Cc)([(0,p.P)("#menu")],f.prototype,"menu",2),(0,d.Cc)([(0,p.P)("wa-popup")],f.prototype,"popup",2),(0,d.Cc)([(0,p.MZ)({type:Boolean,reflect:!0})],f.prototype,"open",2),(0,d.Cc)([(0,p.MZ)({reflect:!0})],f.prototype,"size",2),(0,d.Cc)([(0,p.MZ)({reflect:!0})],f.prototype,"placement",2),(0,d.Cc)([(0,p.MZ)({type:Number})],f.prototype,"distance",2),(0,d.Cc)([(0,p.MZ)({type:Number})],f.prototype,"skidding",2),f=(0,d.Cc)([(0,p.EM)("wa-dropdown")],f),o(9701),o(5234),o(8499),o(1404),o(6075),o(9456),o(1092),o(9610),o(2312),o(6127),o(1353),o(9373)},2240(t,e,o){o(2481),o(8750),o(3158),o(1325),o(4671),o(9456),o(1092),o(9610),o(6127),o(1353),o(9373),o(5915),o(7870)},2312(t,e,o){o.d(e,{k:()=>i});var a={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};(0,o(1219).XC)(a);var i=a},2346(t,e,o){function a(t,e){const o={waitUntilFirstUpdate:!1,...e};return(e,a)=>{const{update:i}=e,r=Array.isArray(t)?t:[t];e.update=function(t){r.forEach(e=>{const i=e;if(t.has(i)){const e=t.get(i),r=this[i];e!==r&&(o.waitUntilFirstUpdate&&!this.hasUpdated||this[a](e,r))}}),i.call(this,t)}}}o.d(e,{w:()=>a})},2435(t,e,o){var a=o(6337),i=a.AH`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .label {
    padding: 0;
  }

  .radio-group-required .label::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }

  [part~='form-control-input'] {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0; /* Radios handle their own spacing */
  }

  /* Horizontal */
  :host([orientation='horizontal']) [part~='form-control-input'] {
    flex-direction: row;
  }

  /* Help text */
  [part~='hint'] {
    margin-block-start: 0.5em;
  }
`,r=o(9746),s=o(8030),n=o(3158),l=o(1325),c=o(4411),h=o(4671),d=o(7870),u=o(7425),p=o(3720),m=class extends l.q{constructor(){super(),this.hasSlotController=new c.X(this,"hint","label"),this.label="",this.hint="",this.name=null,this.disabled=!1,this.orientation="vertical",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.required=!1,this.withLabel=!1,this.withHint=!1,this.handleRadioClick=t=>{const e=t.target.closest("wa-radio");if(!e||e.disabled||e.forceDisabled||this.disabled)return;const o=this.value;this.value=e.value,e.checked=!0;const a=this.getAllRadios();for(const t of a)e!==t&&(t.checked=!1,t.setAttribute("tabindex","-1"));this.value!==o&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})},a.S$||(this.addEventListener("keydown",this.handleKeyDown),this.addEventListener("click",this.handleRadioClick))}static get validators(){const t=a.S$?[]:[(0,s.Y)({validationElement:Object.assign(document.createElement("input"),{required:!0,type:"radio",name:(0,r.N)("__wa-radio")})})];return[...super.validators,...t]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){"number"==typeof t&&(t=String(t)),this.valueHasChanged=!0,this._value=t}get validationTarget(){if(a.S$)return;return this.querySelector(":is(wa-radio):not([disabled])")||void 0}updated(t){(t.has("disabled")||t.has("value"))&&this.syncRadioElements()}formResetCallback(...t){this.value=this.defaultValue,super.formResetCallback(...t),this.syncRadioElements()}getAllRadios(){return[...this.querySelectorAll("wa-radio")]}handleLabelClick(){this.focus()}async syncRadioElements(){const t=this.getAllRadios();if(t.forEach((e,o)=>{e.setAttribute("size",this.size),e.toggleAttribute("data-wa-radio-horizontal","vertical"!==this.orientation),e.toggleAttribute("data-wa-radio-vertical","vertical"===this.orientation),e.toggleAttribute("data-wa-radio-first",0===o),e.toggleAttribute("data-wa-radio-inner",0!==o&&o!==t.length-1),e.toggleAttribute("data-wa-radio-last",o===t.length-1),e.forceDisabled=this.disabled}),await Promise.all(t.map(async t=>{await t.updateComplete,t.disabled||t.value!==this.value?t.checked=!1:t.checked=!0})),this.disabled)t.forEach(t=>{t.tabIndex=-1});else{const e=t.filter(t=>!t.disabled),o=e.find(t=>t.checked);e.length>0&&(o?e.forEach(t=>{t.tabIndex=t.checked?0:-1}):e.forEach((t,e)=>{t.tabIndex=0===e?0:-1})),t.filter(t=>t.disabled).forEach(t=>{t.tabIndex=-1})}}handleKeyDown(t){if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key)||this.disabled)return;const e=this.getAllRadios().filter(t=>!t.disabled);if(e.length<=0)return;t.preventDefault();const o=this.value,a=e.find(t=>t.checked)??e[0],i=" "===t.key?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1;let r=e.indexOf(a)+i;r||(r=0),r<0&&(r=e.length-1),r>e.length-1&&(r=0);const s=e.some(t=>"wa-radio-button"===t.tagName.toLowerCase());this.getAllRadios().forEach(t=>{t.checked=!1,s||t.setAttribute("tabindex","-1")}),this.value=e[r].value,e[r].checked=!0,s?e[r].shadowRoot.querySelector("button").focus():(e[r].setAttribute("tabindex","0"),e[r].focus()),this.value!==o&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),t.preventDefault()}focus(t){if(this.disabled)return;const e=this.getAllRadios(),o=e.find(t=>t.checked),a=e.find(t=>!t.disabled),i=o||a;i&&i.focus(t)}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=!!this.label||!!t,i=!!this.hint||!!e;return a.qy`
      <fieldset
        part="form-control"
        class=${(0,p.H)({"form-control":!0,"form-control-radio-group":!0,"form-control-has-label":o})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="hint"
        aria-errormessage="error-message"
        aria-orientation=${this.orientation}
      >
        <label
          part="form-control-label"
          id="label"
          class="label"
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <slot part="form-control-input" @slotchange=${this.syncRadioElements}></slot>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${(0,p.H)({"has-slotted":i})}
          aria-hidden=${i?"false":"true"}
          >${this.hint}</slot
        >
      </fieldset>
    `}};m.css=[h.J,n.I,i],m.shadowRootOptions={...l.q.shadowRootOptions,delegatesFocus:!0},(0,d.Cc)([(0,u.P)("slot:not([name])")],m.prototype,"defaultSlot",2),(0,d.Cc)([(0,u.MZ)()],m.prototype,"label",2),(0,d.Cc)([(0,u.MZ)({attribute:"hint"})],m.prototype,"hint",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],m.prototype,"name",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,reflect:!0})],m.prototype,"disabled",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],m.prototype,"orientation",2),(0,d.Cc)([(0,u.wk)()],m.prototype,"value",1),(0,d.Cc)([(0,u.MZ)({attribute:"value",reflect:!0})],m.prototype,"defaultValue",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],m.prototype,"size",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,reflect:!0})],m.prototype,"required",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,attribute:"with-label"})],m.prototype,"withLabel",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,attribute:"with-hint"})],m.prototype,"withHint",2),m=(0,d.Cc)([(0,u.EM)("wa-radio-group")],m),o(2481),o(8750),o(9456),o(1092),o(9610),o(6127),o(1353),o(9373),o(5915)},2481(t,e,o){var a=o(8750),i=o(3158),r=o(1325),s=o(4671),n=o(7870),l=o(6337),c=o(7425),h=class extends r.q{constructor(){super(),this.checked=!1,this.forceDisabled=!1,this.appearance="default",this.size="medium",this.disabled=!1,this.handleClick=()=>{this.disabled||this.forceDisabled||(this.checked=!0)},l.S$||this.addEventListener("click",this.handleClick)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.tabIndex=0,this.setAttribute("aria-disabled",this.disabled||this.forceDisabled?"true":"false")}updated(t){if(super.updated(t),t.has("checked")&&(this.customStates.set("checked",this.checked),this.setAttribute("aria-checked",this.checked?"true":"false"),this.disabled||this.forceDisabled||(this.tabIndex=this.checked?0:-1)),t.has("disabled")||t.has("forceDisabled")){const t=this.disabled||this.forceDisabled;this.customStates.set("disabled",t),this.setAttribute("aria-disabled",t?"true":"false"),this.tabIndex=t?-1:this.checked?0:-1}}setValue(){}render(){return l.qy`
      <span part="control" class="control">
        ${this.checked?l.qy`
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" part="checked-icon" class="checked-icon">
                <circle cx="8" cy="8" r="8" />
              </svg>
            `:""}
      </span>

      <slot part="label" class="label"></slot>
    `}};h.css=[i.I,s.J,a.R],(0,n.Cc)([(0,c.wk)()],h.prototype,"checked",2),(0,n.Cc)([(0,c.wk)()],h.prototype,"forceDisabled",2),(0,n.Cc)([(0,c.MZ)({reflect:!0})],h.prototype,"value",2),(0,n.Cc)([(0,c.MZ)({reflect:!0})],h.prototype,"appearance",2),(0,n.Cc)([(0,c.MZ)({reflect:!0})],h.prototype,"size",2),(0,n.Cc)([(0,c.MZ)({type:Boolean})],h.prototype,"disabled",2),h=(0,n.Cc)([(0,c.EM)("wa-radio")],h)},2590(t,e,o){o.d(e,{$:()=>a});var a=o(6337).AH`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-dasharray: 75, 100;
    stroke-dashoffset: -5;
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`},2792(t,e,o){o(1501),o(8181),o(5915),o(7870)},2879(t,e,o){var a=o(5061),i=o(6337),r=i.AH`
  :host {
    border-width: 0;
  }

  .text-field {
    flex: auto;
    display: flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    transition: inherit;
    height: var(--wa-form-control-height);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    cursor: text;
    color: var(--wa-form-control-value-color);
    font-size: var(--wa-form-control-value-font-size);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    width: 100%;
    transition:
      background-color var(--wa-transition-normal),
      border var(--wa-transition-normal),
      outline var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    box-shadow: var(--box-shadow);
    padding: 0 var(--wa-form-control-padding-inline);

    &:focus-within {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }

    /* Style disabled inputs */
    &:has(:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .text-field {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  :host([pill]) .text-field {
    border-radius: var(--wa-border-radius-pill) !important;
  }

  .text-field {
    /* Show autofill styles over the entire text field, not just the native <input> */
    &:has(:autofill),
    &:has(:-webkit-autofill) {
      background-color: var(--wa-color-brand-fill-quiet) !important;
    }

    input,
    textarea {
      /*
      Fixes an alignment issue with placeholders.
      https://github.com/shoelace-style/webawesome/issues/342
    */
      height: 100%;

      padding: 0;
      border: none;
      outline: none;
      box-shadow: none;
      margin: 0;
      cursor: inherit;
      -webkit-appearance: none;
      font: inherit;

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }
    }
  }

  input {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    transition: inherit;

    /* prettier-ignore */
    background-color: rgb(118 118 118 / 0); /* ensures proper placeholder styles in webkit's date input */
    height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    padding-block: 0;
    color: inherit;

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }

    &:focus {
      outline: none;
    }
  }

  textarea {
    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }
  }

  .start,
  .end {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;

    &::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  /*
   * Clearable + Password Toggle
   */

  .clear,
  .password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: var(--wa-transition-normal) color;
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }

    &:focus {
      outline: none;
    }
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  :host([without-spin-buttons]) input[type='number'] {
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      display: none;
    }
  }
`,s=o(1754),n=o(3158),l=o(5963),c=o(1325),h=o(4411),d=o(4671),u=o(9359),p=o(2346),m=o(7870),b=o(7425),v=o(3720),f=o(31),g=o(538),w=class extends c.q{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new h.X(this,"hint","label"),this.localize=new u.c(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,(0,l.i)()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}handleChange(t){this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleClearClick(t){t.preventDefault(),""!==this.value&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new s.I),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(t){(0,a.U)(t,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,a="preserve"){const i=e??this.input.selectionStart,r=o??this.input.selectionEnd;this.input.setRangeText(t,i,r,a),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=!!this.label||!!t,a=!!this.hint||!!e,r=this.withClear&&!this.disabled&&!this.readonly,s=(i.S$||this.hasUpdated)&&r&&("number"==typeof this.value||this.value&&this.value.length>0);return i.qy`
      <label part="form-control-label label" class="label" for="input" aria-hidden=${o?"false":"true"}>
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${"password"===this.type&&this.passwordVisible?"text":this.type}
          title=${this.title}
          name=${(0,f.J)(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${(0,f.J)(this.placeholder)}
          minlength=${(0,f.J)(this.minlength)}
          maxlength=${(0,f.J)(this.maxlength)}
          min=${(0,f.J)(this.min)}
          max=${(0,f.J)(this.max)}
          step=${(0,f.J)(this.step)}
          .value=${(0,g.V)(this.value??"")}
          autocapitalize=${(0,f.J)(this.autocapitalize)}
          autocomplete=${(0,f.J)(this.autocomplete)}
          autocorrect=${(0,f.J)(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${(0,f.J)(this.pattern)}
          enterkeyhint=${(0,f.J)(this.enterkeyhint)}
          inputmode=${(0,f.J)(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${s?i.qy`
              <button
                part="clear-button"
                class="clear"
                type="button"
                aria-label=${this.localize.term("clearEntry")}
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            `:""}
        ${this.passwordToggle&&!this.disabled?i.qy`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${this.passwordVisible?i.qy`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:i.qy`
                      <slot name="show-password-icon">
                        <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                      </slot>
                    `}
              </button>
            `:""}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${(0,v.H)({"has-slotted":a})}
        aria-hidden=${a?"false":"true"}
        >${this.hint}</slot
      >
    `}};w.css=[d.J,n.I,r],w.shadowRootOptions={...c.q.shadowRootOptions,delegatesFocus:!0},(0,m.Cc)([(0,b.P)("input")],w.prototype,"input",2),(0,m.Cc)([(0,b.MZ)()],w.prototype,"title",2),(0,m.Cc)([(0,b.MZ)({reflect:!0})],w.prototype,"type",2),(0,m.Cc)([(0,b.wk)()],w.prototype,"value",1),(0,m.Cc)([(0,b.MZ)({attribute:"value",reflect:!0})],w.prototype,"defaultValue",2),(0,m.Cc)([(0,b.MZ)({reflect:!0})],w.prototype,"size",2),(0,m.Cc)([(0,b.MZ)({reflect:!0})],w.prototype,"appearance",2),(0,m.Cc)([(0,b.MZ)({type:Boolean,reflect:!0})],w.prototype,"pill",2),(0,m.Cc)([(0,b.MZ)()],w.prototype,"label",2),(0,m.Cc)([(0,b.MZ)({attribute:"hint"})],w.prototype,"hint",2),(0,m.Cc)([(0,b.MZ)({attribute:"with-clear",type:Boolean})],w.prototype,"withClear",2),(0,m.Cc)([(0,b.MZ)()],w.prototype,"placeholder",2),(0,m.Cc)([(0,b.MZ)({type:Boolean,reflect:!0})],w.prototype,"readonly",2),(0,m.Cc)([(0,b.MZ)({attribute:"password-toggle",type:Boolean})],w.prototype,"passwordToggle",2),(0,m.Cc)([(0,b.MZ)({attribute:"password-visible",type:Boolean})],w.prototype,"passwordVisible",2),(0,m.Cc)([(0,b.MZ)({attribute:"without-spin-buttons",type:Boolean})],w.prototype,"withoutSpinButtons",2),(0,m.Cc)([(0,b.MZ)({type:Boolean,reflect:!0})],w.prototype,"required",2),(0,m.Cc)([(0,b.MZ)()],w.prototype,"pattern",2),(0,m.Cc)([(0,b.MZ)({type:Number})],w.prototype,"minlength",2),(0,m.Cc)([(0,b.MZ)({type:Number})],w.prototype,"maxlength",2),(0,m.Cc)([(0,b.MZ)()],w.prototype,"min",2),(0,m.Cc)([(0,b.MZ)()],w.prototype,"max",2),(0,m.Cc)([(0,b.MZ)()],w.prototype,"step",2),(0,m.Cc)([(0,b.MZ)()],w.prototype,"autocapitalize",2),(0,m.Cc)([(0,b.MZ)()],w.prototype,"autocorrect",2),(0,m.Cc)([(0,b.MZ)()],w.prototype,"autocomplete",2),(0,m.Cc)([(0,b.MZ)({type:Boolean})],w.prototype,"autofocus",2),(0,m.Cc)([(0,b.MZ)()],w.prototype,"enterkeyhint",2),(0,m.Cc)([(0,b.MZ)({type:Boolean,converter:{fromAttribute:t=>!(!t||"false"===t),toAttribute:t=>t?"true":"false"}})],w.prototype,"spellcheck",2),(0,m.Cc)([(0,b.MZ)()],w.prototype,"inputmode",2),(0,m.Cc)([(0,b.MZ)({attribute:"with-label",type:Boolean})],w.prototype,"withLabel",2),(0,m.Cc)([(0,b.MZ)({attribute:"with-hint",type:Boolean})],w.prototype,"withHint",2),(0,m.Cc)([(0,p.w)("step",{waitUntilFirstUpdate:!0})],w.prototype,"handleStepChange",1),w=(0,m.Cc)([(0,b.EM)("wa-input")],w),o(9456),o(1092),o(9610),o(2312),o(6127),o(1353),o(9373),o(5915)},3039(t,e,o){var a=o(6337).AH`
  :host {
    --color: var(--wa-color-surface-border);
    --width: var(--wa-border-width-s);
    --spacing: var(--wa-space-m);
  }

  :host(:not([orientation='vertical'])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([orientation='vertical']) {
    display: inline-block;
    height: 100%;
    border-inline-start: solid var(--width) var(--color);
    margin: 0 var(--spacing);
    min-block-size: 1lh;
  }
`,i=o(2346),r=o(5915),s=o(7870),n=o(7425),l=class extends r._{constructor(){super(...arguments),this.orientation="horizontal"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.orientation)}};l.css=a,(0,s.Cc)([(0,n.MZ)({reflect:!0})],l.prototype,"orientation",2),(0,s.Cc)([(0,i.w)("orientation")],l.prototype,"handleVerticalChange",1),l=(0,s.Cc)([(0,n.EM)("wa-divider")],l)},3158(t,e,o){o.d(e,{I:()=>a});var a=o(6337).AH`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)) {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);
    line-height: var(--wa-form-control-label-line-height);

    &:not(.has-slotted) {
      display: none;
    }
  }
`},3169(t,e,o){o.d(e,{M:()=>a});var a=o(6337).AH`
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
`},3380(t,e,o){var a=o(9685),i=o(9359),r=o(5915),s=o(7870),n=o(6337),l=o(7425);function c(t,e=0){if(!t||!globalThis.Node)return"";if("function"==typeof t[Symbol.iterator])return(Array.isArray(t)?t:[...t]).map(t=>c(t,--e)).join("");let o=t;if(o.nodeType===Node.TEXT_NODE)return o.textContent??"";if(o.nodeType===Node.ELEMENT_NODE){let t=o;if(t.hasAttribute("slot")||t.matches("style, script"))return"";if(t instanceof HTMLSlotElement){let o=t.assignedNodes({flatten:!0});if(o.length>0)return c(o,--e)}return e>-1?c(t,--e):t.textContent??""}return o.hasChildNodes()?c(o.childNodes,--e):""}var h=class extends r._{constructor(){super(...arguments),this.localize=new i.c(this),this.isInitialized=!1,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.defaultLabel="",this.handleHover=t=>{"mouseenter"===t.type?this.customStates.set("hover",!0):"mouseleave"===t.type&&this.customStates.set("hover",!1)}}set label(t){const e=this._label;this._label=t||"",this._label!==e&&this.requestUpdate("label",e)}get label(){return this._label?this._label:(this.defaultLabel||this.updateDefaultLabel(),this.defaultLabel)}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover),this.updateDefaultLabel()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.updateDefaultLabel(),this.isInitialized?(customElements.whenDefined("wa-select").then(()=>{const t=this.closest("wa-select");t&&(t.handleDefaultSlotChange(),t.selectionChanged?.())}),customElements.whenDefined("wa-combobox").then(()=>{const t=this.closest("wa-combobox");t&&(t.handleDefaultSlotChange(),t.selectionChanged?.())})):this.isInitialized=!0}willUpdate(t){if(t.has("defaultSelected")&&!this.closest("wa-combobox, wa-select")?.hasInteracted){const t=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",t)}super.willUpdate(t)}updated(t){super.updated(t),t.has("disabled")&&this.setAttribute("aria-disabled",this.disabled?"true":"false"),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected),this.handleDefaultSlotChange()),t.has("value")&&("string"!=typeof this.value&&(this.value=String(this.value)),this.handleDefaultSlotChange()),t.has("current")&&this.customStates.set("current",this.current)}updateDefaultLabel(){let t=this.defaultLabel;this.defaultLabel=c(this).trim();let e=this.defaultLabel!==t;return!this._label&&e&&this.requestUpdate("label",t),e}render(){return n.qy`
      <wa-icon
        part="checked-icon"
        class="check"
        name="check"
        library="system"
        variant="solid"
        aria-hidden="true"
      ></wa-icon>
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `}};h.css=a.l,(0,s.Cc)([(0,l.P)(".label")],h.prototype,"defaultSlot",2),(0,s.Cc)([(0,l.wk)()],h.prototype,"current",2),(0,s.Cc)([(0,l.MZ)({reflect:!0})],h.prototype,"value",2),(0,s.Cc)([(0,l.MZ)({type:Boolean})],h.prototype,"disabled",2),(0,s.Cc)([(0,l.MZ)({type:Boolean,attribute:!1})],h.prototype,"selected",2),(0,s.Cc)([(0,l.MZ)({type:Boolean,attribute:"selected"})],h.prototype,"defaultSelected",2),(0,s.Cc)([(0,l.MZ)()],h.prototype,"label",1),(0,s.Cc)([(0,l.wk)()],h.prototype,"defaultLabel",2),h=(0,s.Cc)([(0,l.EM)("wa-option")],h)},3720(t,e,o){o.d(e,{H:()=>r});var a=o(6752),i=o(7804);const r=(0,i.u$)(class extends i.WL{constructor(t){if(super(t),t.type!==i.OA.ATTRIBUTE||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const o=t.element.classList;for(const t of this.st)t in e||(o.remove(t),this.st.delete(t));for(const t in e){const a=!!e[t];a===this.st.has(t)||this.nt?.has(t)||(a?(o.add(t),this.st.add(t)):(o.remove(t),this.st.delete(t)))}return a.c0}})},3824(t,e,o){var a=o(6337),i=a.AH`
  :host {
    --height: var(--wa-form-control-toggle-size);
    --width: calc(var(--height) * 1.75);
    --thumb-size: 0.75em;

    display: inline-flex;
    line-height: var(--wa-form-control-value-line-height);
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    color: var(--wa-form-control-value-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch {
    flex: 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--height);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    transition-property: translate, background, border-color, box-shadow;
    transition-duration: var(--wa-transition-normal);
    transition-timing-function: var(--wa-transition-easing);
  }

  .switch .thumb {
    aspect-ratio: 1 / 1;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--wa-form-control-border-color);
    border-radius: 50%;
    translate: calc((var(--width) - var(--height)) / -2);
    transition: inherit;
  }

  .input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Focus */
  label:not(.disabled) .input:focus-visible ~ .switch .thumb {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Checked */
  .checked .switch {
    background-color: var(--wa-form-control-activated-color);
    border-color: var(--wa-form-control-activated-color);
  }

  .checked .switch .thumb {
    background-color: var(--wa-color-surface-default);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Disabled */
  label:has(> :disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [part~='label'] {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }

  @media (forced-colors: active) {
    :checked:enabled + .switch:hover .thumb,
    :checked + .switch .thumb {
      background-color: ButtonText;
    }
  }
`,r=o(3158),s=o(5963),n=o(1325),l=o(4411),c=o(4671),h=o(2346),d=o(7870),u=o(7425),p=o(3720),m=o(31),b=o(538),v=class extends n.q{constructor(){super(...arguments),this.hasSlotController=new l.X(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint="",this.withHint=!1}static get validators(){return[...super.validators,(0,s.i)()]}get value(){return this._value??"on"}set value(t){this._value=t}firstUpdated(t){super.firstUpdated(t),this.handleValueOrCheckedChange()}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleKeyDown(t){"ArrowLeft"===t.key&&(t.preventDefault(),this.checked=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})),"ArrowRight"===t.key&&(t.preventDefault(),this.checked=!0,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleDefaultCheckedChange(){this.hasInteracted||this.checked===this.defaultChecked||(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked),this.customStates.set("checked",this.checked),this.updateValidity()}handleDisabledChange(){this.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}setValue(t,e){this.checked?this.internals.setFormValue(t??"on",e):this.internals.setFormValue(null,null)}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}render(){const t=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,e=!!this.hint||!!t;return a.qy`
      <label
        part="base"
        class=${(0,p.H)({checked:this.checked,disabled:this.disabled})}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${this.name}
          value=${(0,m.J)(this.value)}
          .checked=${(0,b.V)(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          aria-describedby="hint"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch">
          <span part="thumb" class="thumb"></span>
        </span>

        <slot part="label" class="label"></slot>
      </label>

      <slot
        id="hint"
        name="hint"
        part="hint"
        class=${(0,p.H)({"has-slotted":e})}
        aria-hidden=${e?"false":"true"}
        >${this.hint}</slot
      >
    `}};v.shadowRootOptions={...n.q.shadowRootOptions,delegatesFocus:!0},v.css=[r.I,c.J,i],(0,d.Cc)([(0,u.P)('input[type="checkbox"]')],v.prototype,"input",2),(0,d.Cc)([(0,u.MZ)()],v.prototype,"title",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],v.prototype,"name",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],v.prototype,"value",1),(0,d.Cc)([(0,u.MZ)({reflect:!0})],v.prototype,"size",2),(0,d.Cc)([(0,u.MZ)({type:Boolean})],v.prototype,"disabled",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,attribute:!1})],v.prototype,"checked",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,attribute:"checked",reflect:!0})],v.prototype,"defaultChecked",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,reflect:!0})],v.prototype,"required",2),(0,d.Cc)([(0,u.MZ)({attribute:"hint"})],v.prototype,"hint",2),(0,d.Cc)([(0,u.MZ)({attribute:"with-hint",type:Boolean})],v.prototype,"withHint",2),(0,d.Cc)([(0,h.w)("defaultChecked")],v.prototype,"handleDefaultCheckedChange",1),(0,d.Cc)([(0,h.w)(["checked"])],v.prototype,"handleStateChange",1),(0,d.Cc)([(0,h.w)("disabled",{waitUntilFirstUpdate:!0})],v.prototype,"handleDisabledChange",1),v=(0,d.Cc)([(0,u.EM)("wa-switch")],v),o(5915)},3864(t,e,o){o(9456),o(1092),o(9610),o(6127),o(1353),o(9373),o(5915),o(7870)},3904(t,e,o){o(8354),o(4313),o(5915),o(7870)},4115(t,e,o){o.d(e,{Lq:()=>r,Z1:()=>a,kB:()=>s,qu:()=>i});var a=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},i=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}},r=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}},s=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}}},4136(t,e,o){var a=o(4671),i=o(6337),r=i.AH`
  :host {
    display: flex;
    position: relative;
    align-items: stretch;
    border-radius: var(--wa-panel-border-radius);
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
    border-style: var(--wa-panel-border-style);
    border-width: var(--wa-panel-border-width);
    color: var(--wa-color-text-normal);
    padding: 1em;
  }

  /* Appearance modifiers */
  :host([appearance~='plain']) {
    background-color: transparent;
    border-color: transparent;
  }

  :host([appearance~='outlined']) {
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
  }

  :host([appearance~='filled']) {
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: transparent;
  }

  :host([appearance~='filled-outlined']) {
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
  }

  :host([appearance~='accent']) {
    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;

    [part~='icon'] {
      color: currentColor;
    }
  }

  [part~='icon'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-on-quiet);
    font-size: 1.25em;
  }

  ::slotted([slot='icon']) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  [part~='message'] {
    flex: 1 1 auto;
    display: block;
    overflow: hidden;
  }
`,s=o(3169),n=o(5915),l=o(7870),c=o(7425),h=class extends n._{constructor(){super(...arguments),this.variant="brand",this.size="medium"}render(){return i.qy`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};h.css=[r,s.M,a.J],(0,l.Cc)([(0,c.MZ)({reflect:!0})],h.prototype,"variant",2),(0,l.Cc)([(0,c.MZ)({reflect:!0})],h.prototype,"appearance",2),(0,l.Cc)([(0,c.MZ)({reflect:!0})],h.prototype,"size",2),h=(0,l.Cc)([(0,c.EM)("wa-callout")],h)},4313(t,e,o){o.d(e,{Z:()=>a});var a=o(6337).AH`
  :host {
    display: inline-block;
    color: var(--wa-color-neutral-on-quiet);
    font-weight: var(--wa-font-weight-action);
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font: inherit;
    padding: 1em 1.5em;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition: color var(--wa-transition-fast) var(--wa-transition-easing);

    ::slotted(wa-icon:first-child) {
      margin-inline-end: 0.5em;
    }

    ::slotted(wa-icon:last-child) {
      margin-inline-start: 0.5em;
    }
  }

  @media (hover: hover) {
    :host(:hover:not([disabled])) .tab {
      color: currentColor;
    }
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible) .tab {
    outline: var(--wa-focus-ring);
    outline-offset: calc(-1 * var(--wa-border-width-l) - var(--wa-focus-ring-offset));
  }

  :host([active]:not([disabled])) {
    color: var(--wa-color-brand-on-quiet);
  }

  :host([disabled]) .tab {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (forced-colors: active) {
    :host([active]:not([disabled])) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`},4411(t,e,o){o.d(e,{X:()=>a});var a=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=t=>{const e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&""!==t.textContent.trim())return!0;if(t.nodeType===Node.ELEMENT_NODE){const e=t;if("wa-visually-hidden"===e.tagName.toLowerCase())return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return null!==this.host.querySelector(`:scope > [slot="${t}"]`)}test(t){return"[default]"===t?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}}},4432(t,e,o){o(9701),o(5234),o(9456),o(1092),o(9610),o(6127),o(1353),o(9373),o(5915),o(7870)},4459(t,e,o){o.d(e,{Sm:()=>r.Sm});var a=o(1353);async function i(t){const e=t instanceof Element?t.tagName.toLowerCase():"",i=e?.startsWith("wa-"),r=[...t.querySelectorAll(":not(:defined)")].map(t=>t.tagName.toLowerCase()).filter(t=>t.startsWith("wa-"));i&&!customElements.get(e)&&r.push(e);const s=[...new Set(r)],n=await Promise.allSettled(s.map(t=>function(t){if(customElements.get(t))return Promise.resolve();const e=t.replace(/^wa-/i,""),i=(0,a.DT)(`components/${e}/${e}.js`);return new Promise((e,a)=>{o(3270)(i).then(()=>e()).catch(()=>a(new Error(`Unable to autoload <${t}> from ${i}`)))})}(t)));for(const t of n)"rejected"===t.status&&console.warn(t.reason);await new Promise(requestAnimationFrame),t.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}new MutationObserver(t=>{for(const{addedNodes:e}of t)for(const t of e)t.nodeType===Node.ELEMENT_NODE&&i(t)}),o(9359),o(2312);var r=o(6127);o(9373),o(7870)},4558(t,e,o){var a=o(6337),i=a.AH`
  :host {
    --shadow-color: var(--wa-color-surface-default);
    --shadow-size: 2rem;

    /* private (defined dynamically) */
    --start-shadow-opacity: 0;
    --end-shadow-opacity: 0;

    display: block;
    position: relative;
    max-width: 100%;
    isolation: isolate;
  }

  :host([orientation='vertical']) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  #content {
    z-index: 1; /* below shadows */
    border-radius: inherit;
    scroll-behavior: smooth;
    scrollbar-width: thin;

    /* Prevent text in mobile Safari from being larger when the container width larger than the viewport */
    -webkit-text-size-adjust: 100%;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  :host([without-scrollbar]) #content {
    scrollbar-width: none;
  }

  :host([orientation='horizontal']) #content {
    overflow-x: auto;
    overflow-y: hidden;
  }

  :host([orientation='vertical']) #content {
    flex: 1 1 auto;
    min-height: 0; /* This is crucial for flex children to respect overflow */
    overflow-x: hidden;
    overflow-y: auto;
  }

  #start-shadow,
  #end-shadow {
    z-index: 2;
  }

  #start-shadow {
    opacity: var(--start-shadow-opacity);
  }

  #end-shadow {
    opacity: var(--end-shadow-opacity);
  }

  /* Horizontal shadows */
  :host([orientation='horizontal']) {
    #start-shadow,
    #end-shadow {
      position: absolute;
      top: 0;
      bottom: 0;
      width: var(--shadow-size);
      pointer-events: none;
    }

    #start-shadow {
      &:dir(ltr) {
        left: 0;
        background: linear-gradient(to right, var(--shadow-color), transparent 100%);
      }

      &:dir(rtl) {
        right: 0;
        background: linear-gradient(to left, var(--shadow-color), transparent 100%);
      }
    }

    #end-shadow {
      &:dir(ltr) {
        right: 0;
        background: linear-gradient(to left, var(--shadow-color), transparent 100%);
      }

      &:dir(rtl) {
        left: 0;
        background: linear-gradient(to right, var(--shadow-color), transparent 100%);
      }
    }
  }

  /* Vertical shadows */
  :host([orientation='vertical']) {
    #start-shadow,
    #end-shadow {
      position: absolute;
      right: 0;
      left: 0;
      height: var(--shadow-size);
      pointer-events: none;
    }

    #start-shadow {
      top: 0;
      background: linear-gradient(to bottom, var(--shadow-color), transparent 100%);
    }

    #end-shadow {
      bottom: 0;
      background: linear-gradient(to top, var(--shadow-color), transparent 100%);
    }
  }
`,r=o(9359),s=o(5915),n=o(7870),l=o(7425),c=class extends s._{constructor(){super(...arguments),this.localize=new r.c(this),this.resizeObserver=new ResizeObserver(()=>this.updateScroll()),this.canScroll=!1,this.orientation="horizontal",this.withoutScrollbar=!1,this.withoutShadow=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.disconnect()}handleKeyDown(t){"Home"===t.key&&(t.preventDefault(),this.content.scrollTo({left:"horizontal"===this.orientation?0:void 0,top:"vertical"===this.orientation?0:void 0})),"End"===t.key&&(t.preventDefault(),this.content.scrollTo({left:"horizontal"===this.orientation?this.content.scrollWidth:void 0,top:"vertical"===this.orientation?this.content.scrollHeight:void 0}))}handleSlotChange(){this.updateScroll()}updateScroll(){if("horizontal"===this.orientation){const t=Math.ceil(this.content.clientWidth),e=Math.abs(Math.ceil(this.content.scrollLeft)),o=Math.ceil(this.content.scrollWidth)-t;this.canScroll=o>0;const a=Math.min(1,e/(.05*o)),i=Math.min(1,(o-e)/(.05*o));this.style.setProperty("--start-shadow-opacity",String(a||0)),this.style.setProperty("--end-shadow-opacity",String(i||0))}else{const t=Math.ceil(this.content.clientHeight),e=Math.abs(Math.ceil(this.content.scrollTop)),o=Math.ceil(this.content.scrollHeight)-t;this.canScroll=o>0;const a=Math.min(1,e/(.05*o)),i=Math.min(1,(o-e)/(.05*o));this.style.setProperty("--start-shadow-opacity",String(a||0)),this.style.setProperty("--end-shadow-opacity",String(i||0))}}render(){return a.qy`
      ${this.withoutShadow?"":a.qy`
            <div id="start-shadow" part="start-shadow" aria-hidden="true"></div>
            <div id="end-shadow" part="end-shadow" aria-hidden="true"></div>
          `}

      <div
        id="content"
        part="content"
        role="region"
        aria-label=${this.localize.term("scrollableRegion")}
        aria-orientation=${this.orientation}
        tabindex=${this.canScroll?"0":"-1"}
        @keydown=${this.handleKeyDown}
        @scroll=${this.updateScroll}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};c.css=[i],(0,n.Cc)([(0,l.P)("#content")],c.prototype,"content",2),(0,n.Cc)([(0,l.wk)()],c.prototype,"canScroll",2),(0,n.Cc)([(0,l.MZ)({reflect:!0})],c.prototype,"orientation",2),(0,n.Cc)([(0,l.MZ)({attribute:"without-scrollbar",type:Boolean,reflect:!0})],c.prototype,"withoutScrollbar",2),(0,n.Cc)([(0,l.MZ)({attribute:"without-shadow",type:Boolean,reflect:!0})],c.prototype,"withoutShadow",2),(0,n.Cc)([(0,l.Ls)({passive:!0})],c.prototype,"updateScroll",1),c=(0,n.Cc)([(0,l.EM)("wa-scroller")],c),o(2312)},4671(t,e,o){o.d(e,{J:()=>a});var a=o(6337).AH`
  :host([size='small']),
  .wa-size-s {
    font-size: var(--wa-font-size-s);
  }

  :host([size='medium']),
  .wa-size-m {
    font-size: var(--wa-font-size-m);
  }

  :host([size='large']),
  .wa-size-l {
    font-size: var(--wa-font-size-l);
  }
`},4721(t,e,o){var a=o(9081),i=o(4671),r=o(3169),s=o(9359),n=o(5915),l=o(7870),c=o(6337),h=o(7425),d=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}},u=class extends n._{constructor(){super(...arguments),this.localize=new s.c(this),this.variant="neutral",this.appearance="filled-outlined",this.size="medium",this.pill=!1,this.withRemove=!1}handleRemoveClick(){this.dispatchEvent(new d)}render(){return c.qy`
      <slot part="content" class="content"></slot>

      ${this.withRemove?c.qy`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          `:""}
    `}};u.css=[a.g,r.M,i.J],(0,l.Cc)([(0,h.MZ)({reflect:!0})],u.prototype,"variant",2),(0,l.Cc)([(0,h.MZ)({reflect:!0})],u.prototype,"appearance",2),(0,l.Cc)([(0,h.MZ)({reflect:!0})],u.prototype,"size",2),(0,l.Cc)([(0,h.MZ)({type:Boolean,reflect:!0})],u.prototype,"pill",2),(0,l.Cc)([(0,h.MZ)({attribute:"with-remove",type:Boolean})],u.prototype,"withRemove",2),u=(0,l.Cc)([(0,h.EM)("wa-tag")],u)},5061(t,e,o){function a(t,e){const o=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;"Enter"!==t.key||o||setTimeout(()=>{t.defaultPrevented||t.isComposing||function(t){let e=null;if("form"in t&&(e=t.form),!e&&"getForm"in t&&(e=t.getForm()),!e)return;const o=[...e.elements];if(1===o.length)return void e.requestSubmit(null);const a=o.find(t=>"submit"===t.type&&!t.matches(":disabled"));a&&(["input","button"].includes(a.localName)?e.requestSubmit(a):a.click())}(e)})}o.d(e,{U:()=>a})},5234(t,e,o){o.d(e,{d:()=>a});var a=o(6337).AH`
  :host {
    display: flex;
    position: relative;
    align-items: center;
    padding: 0.5em 1em;
    border-radius: var(--wa-border-radius-s);
    isolation: isolate;
    color: var(--wa-color-text-normal);
    line-height: var(--wa-line-height-condensed);
    cursor: pointer;
    transition:
      var(--wa-transition-fast) background-color var(--wa-transition-easing),
      var(--wa-transition-fast) color var(--wa-transition-easing);
  }

  @media (hover: hover) {
    :host(:hover:not(:state(disabled))) {
      background-color: var(--wa-color-neutral-fill-normal);
    }
  }

  :host(:focus-visible) {
    z-index: 1;
    outline: var(--wa-focus-ring);
    background-color: var(--wa-color-neutral-fill-normal);
  }

  :host(:state(disabled)) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Danger variant */
  :host([variant='danger']),
  :host([variant='danger']) #details {
    color: var(--wa-color-danger-on-quiet);
  }

  @media (hover: hover) {
    :host([variant='danger']:hover) {
      background-color: var(--wa-color-danger-fill-normal);
      color: var(--wa-color-danger-on-normal);
    }
  }

  :host([variant='danger']:focus-visible) {
    background-color: var(--wa-color-danger-fill-normal);
    color: var(--wa-color-danger-on-normal);
  }

  :host([checkbox-adjacent]) {
    padding-inline-start: 2em;
  }

  /* Only add padding when item actually has a submenu */
  :host([submenu-adjacent]:not(:state(has-submenu))) #details {
    padding-inline-end: 0;
  }

  :host(:state(has-submenu)[submenu-adjacent]) #details {
    padding-inline-end: 1.75em;
  }

  #check {
    visibility: hidden;
    margin-inline-start: -1.5em;
    margin-inline-end: 0.5em;
    font-size: var(--wa-font-size-smaller);
  }

  :host(:state(checked)) #check {
    visibility: visible;
  }

  #icon ::slotted(*) {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    margin-inline-end: 0.75em !important;
    font-size: var(--wa-font-size-smaller);
  }

  #label {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #details {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: end;
    color: var(--wa-color-text-quiet);
    font-size: var(--wa-font-size-smaller) !important;
  }

  #details ::slotted(*) {
    margin-inline-start: 2em !important;
  }

  /* Submenu indicator icon */
  #submenu-indicator {
    position: absolute;
    inset-inline-end: 1em;
    color: var(--wa-color-neutral-on-quiet);
    font-size: var(--wa-font-size-smaller);
  }

  /* Flip chevron icon when RTL */
  :host(:dir(rtl)) #submenu-indicator {
    transform: scaleX(-1);
  }

  /* Submenu styles */
  #submenu {
    display: flex;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;

    /* Override default popover styles */
    &[popover] {
      margin: 0;
      inset: auto;
      padding: 0.25em;
      overflow: visible;
      border-radius: var(--wa-border-radius-m);
    }

    &.show {
      animation: submenu-show var(--show-duration, 50ms) ease;
    }

    &.hide {
      animation: submenu-show var(--show-duration, 50ms) ease reverse;
    }

    /* Submenu placement transform origins */
    &[data-placement^='top'] {
      transform-origin: bottom;
    }

    &[data-placement^='bottom'] {
      transform-origin: top;
    }

    &[data-placement^='left'] {
      transform-origin: right;
    }

    &[data-placement^='right'] {
      transform-origin: left;
    }

    &[data-placement='left-start'] {
      transform-origin: right top;
    }

    &[data-placement='left-end'] {
      transform-origin: right bottom;
    }

    &[data-placement='right-start'] {
      transform-origin: left top;
    }

    &[data-placement='right-end'] {
      transform-origin: left bottom;
    }

    /* Safe triangle styling */
    &::before {
      display: none;
      z-index: 9;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: transparent;
      content: '';
      clip-path: polygon(
        var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
        var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
        var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
      );
      pointer-events: auto; /* Enable mouse events on the triangle */
    }

    &[data-visible]::before {
      display: block;
    }
  }

  ::slotted(wa-dropdown-item) {
    font-size: inherit;
  }

  ::slotted(wa-divider) {
    --spacing: 0.25em;
  }

  @keyframes submenu-show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`},5280(t,e,o){o.d(e,{I7:()=>r,JG:()=>i,Rt:()=>s});var a=new Set;function i(t){if(a.add(t),!document.documentElement.classList.contains("wa-scroll-lock")){const t=function(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}()+function(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}();let e=getComputedStyle(document.documentElement).scrollbarGutter;e&&"auto"!==e||(e="stable"),t<2&&(e=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",e),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${t}px`)}}function r(t){a.delete(t),0===a.size&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function s(t,e,o="vertical",a="smooth"){const i=function(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}(t,e),r=i.top+e.scrollTop,s=i.left+e.scrollLeft,n=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,c=e.scrollTop,h=e.scrollTop+e.offsetHeight;"horizontal"!==o&&"both"!==o||(s<n?e.scrollTo({left:s,behavior:a}):s+t.clientWidth>l&&e.scrollTo({left:s-e.offsetWidth+t.clientWidth,behavior:a})),"vertical"!==o&&"both"!==o||(r<c?e.scrollTo({top:r,behavior:a}):r+t.clientHeight>h&&e.scrollTo({top:r-e.offsetHeight+t.clientHeight,behavior:a}))}},5464(t,e,o){o(7714),o(1287),o(4115),o(8499),o(1404),o(6075),o(9359),o(2312),o(5915),o(7870)},5566(t,e,o){var a=o(2590),i=o(9359),r=o(5915),s=o(7870),n=o(6337),l=o(7425),c=class extends r._{constructor(){super(...arguments),this.localize=new i.c(this)}render(){return n.qy`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
        <circle class="indicator" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      </svg>
    `}};c.css=a.$,c=(0,s.Cc)([(0,l.EM)("wa-spinner")],c)},5597(t,e,o){var a=o(6337),i=a.AH`
  :host {
    --spacing: var(--wa-space-l);

    /* Internal calculated properties */
    --inner-border-radius: calc(var(--wa-panel-border-radius) - var(--wa-panel-border-width));

    display: flex;
    flex-direction: column;
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-panel-border-radius);
    border-style: var(--wa-panel-border-style);
    box-shadow: var(--wa-shadow-s);
    border-width: var(--wa-panel-border-width);
    color: var(--wa-color-text-normal);
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  :host([appearance='outlined']) {
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='filled']) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='accent']) {
    color: var(--wa-color-neutral-on-loud);
    background-color: var(--wa-color-neutral-fill-loud);
    border-color: transparent;
  }

  /* Take care of top and bottom radii */
  .media,
  :host(:not([with-media])) .header,
  :host(:not([with-media], [with-header])) .body {
    border-start-start-radius: var(--inner-border-radius);
    border-start-end-radius: var(--inner-border-radius);
  }

  :host(:not([with-footer])) .body,
  .footer {
    border-end-start-radius: var(--inner-border-radius);
    border-end-end-radius: var(--inner-border-radius);
  }

  .media {
    display: flex;
    overflow: hidden;

    &::slotted(*) {
      display: block;
      width: 100%;
      border-radius: 0 !important;
    }
  }

  /* Round all corners for plain appearance */
  :host([appearance='plain']) .media {
    border-radius: var(--inner-border-radius);

    &::slotted(*) {
      border-radius: inherit !important;
    }
  }

  .header {
    display: block;
    border-block-end-style: inherit;
    border-block-end-color: var(--wa-color-surface-border);
    border-block-end-width: var(--wa-panel-border-width);
    padding: calc(var(--spacing) / 2) var(--spacing);
  }

  .body {
    display: block;
    padding: var(--spacing);
  }

  .footer {
    display: block;
    border-block-start-style: inherit;
    border-block-start-color: var(--wa-color-surface-border);
    border-block-start-width: var(--wa-panel-border-width);
    padding: var(--spacing);
  }

  /* Push slots to sides when the action slots renders */
  .has-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :host(:not([with-header])) .header,
  :host(:not([with-footer])) .footer,
  :host(:not([with-media])) .media {
    display: none;
  }

  /* Orientation Styles */
  :host([orientation='horizontal']) {
    flex-direction: row;

    .media {
      border-start-start-radius: var(--inner-border-radius);
      border-end-start-radius: var(--inner-border-radius);
      border-start-end-radius: 0;

      &::slotted(*) {
        block-size: 100%;
        inline-size: 100%;
        object-fit: cover;
      }
    }
  }

  :host([orientation='horizontal']) ::slotted([slot='body']) {
    display: block;
    height: 100%;
    margin: 0;
  }

  :host([orientation='horizontal']) ::slotted([slot='actions']) {
    display: flex;
    align-items: center;
    padding: var(--spacing);
  }
`,r=o(4411),s=o(4671),n=o(5915),l=o(7870),c=o(7425),h=class extends n._{constructor(){super(...arguments),this.hasSlotController=new r.X(this,"footer","header","media","header-actions","footer-actions","actions"),this.appearance="outlined",this.withHeader=!1,this.withMedia=!1,this.withFooter=!1,this.orientation="vertical"}updated(){!this.withHeader&&this.hasSlotController.test("header")&&(this.withHeader=!0),!this.withMedia&&this.hasSlotController.test("media")&&(this.withMedia=!0),!this.withFooter&&this.hasSlotController.test("footer")&&(this.withFooter=!0)}render(){return"horizontal"===this.orientation?a.qy`
        <slot name="media" part="media" class="media"></slot>
        <slot part="body" class="body"></slot>
        <slot name="actions" part="actions" class="actions"></slot>
      `:a.qy`
      <slot name="media" part="media" class="media"></slot>

      ${this.hasSlotController.test("header-actions")?a.qy` <header part="header" class="header has-actions">
            <slot name="header"></slot>
            <slot name="header-actions"></slot>
          </header>`:a.qy` <header part="header" class="header">
            <slot name="header"></slot>
          </header>`}

      <slot part="body" class="body"></slot>
      ${this.hasSlotController.test("footer-actions")?a.qy` <footer part="footer" class="footer has-actions">
            <slot name="footer"></slot>
            <slot name="footer-actions"></slot>
          </footer>`:a.qy` <footer part="footer" class="footer">
            <slot name="footer"></slot>
          </footer>`}
    `}};h.css=[s.J,i],(0,l.Cc)([(0,c.MZ)({reflect:!0})],h.prototype,"appearance",2),(0,l.Cc)([(0,c.MZ)({attribute:"with-header",type:Boolean,reflect:!0})],h.prototype,"withHeader",2),(0,l.Cc)([(0,c.MZ)({attribute:"with-media",type:Boolean,reflect:!0})],h.prototype,"withMedia",2),(0,l.Cc)([(0,c.MZ)({attribute:"with-footer",type:Boolean,reflect:!0})],h.prototype,"withFooter",2),(0,l.Cc)([(0,c.MZ)({reflect:!0})],h.prototype,"orientation",2),h=(0,l.Cc)([(0,c.EM)("wa-card")],h)},5894(t,e,o){var a=o(6337),i=a.AH`
  :host {
    --tag-max-size: 10ch;
    --show-duration: 100ms;
    --hide-duration: 100ms;
  }

  /* Add ellipses to multi select options */
  :host wa-tag::part(content) {
    display: initial;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: var(--tag-max-size);
  }

  :host .disabled [part~='combobox'] {
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  :host .enabled:is(.open, :focus-within) [part~='combobox'] {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;

    /* Pass through from select to the popup */
    --show-duration: inherit;
    --hide-duration: inherit;

    &::part(popup) {
      z-index: 900;
    }

    &[data-current-placement^='top']::part(popup) {
      transform-origin: bottom;
    }

    &[data-current-placement^='bottom']::part(popup) {
      transform-origin: top;
    }
  }

  /* Combobox */
  .combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    justify-content: start;

    min-height: var(--wa-form-control-height);

    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    color: var(--wa-form-control-value-color);
    cursor: pointer;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    overflow: hidden;
    padding: 0 var(--wa-form-control-padding-inline);
    position: relative;
    vertical-align: middle;
    transition:
      background-color var(--wa-transition-normal),
      border var(--wa-transition-normal),
      outline var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    :host([multiple]) .select:not(.placeholder-visible) & {
      padding-inline-start: 0;
      padding-block: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));
    }

    /* Pills */
    :host([pill]) & {
      border-radius: var(--wa-border-radius-pill);
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .combobox {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  .display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    line-height: var(--wa-form-control-value-line-height);
    color: var(--wa-form-control-value-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
    }
  }

  /* Visually hide the display input when multiple is enabled */
  :host([multiple]) .select:not(.placeholder-visible) .display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .value-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    margin: 0;
  }

  .tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: 0.25em;
    gap: 0.25em;

    &::slotted(wa-tag) {
      cursor: pointer !important;
    }

    .disabled &,
    .disabled &::slotted(wa-tag) {
      cursor: not-allowed !important;
    }
  }

  /* Start and End */

  .start,
  .end {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  :host([multiple]) .start::slotted(*) {
    margin-inline: var(--wa-form-control-padding-inline);
  }

  /* Clear button */
  [part~='clear-button'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: color var(--wa-transition-normal);
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    &:focus {
      outline: none;
    }

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }
  }

  /* Expand icon */
  .expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
    transition: rotate var(--wa-transition-slow) ease;
    rotate: 0deg;
    margin-inline-start: var(--wa-form-control-padding-inline);

    .open & {
      rotate: -180deg;
    }
  }

  /* Listbox */
  .listbox {
    display: block;
    position: relative;
    font: inherit;
    box-shadow: var(--wa-shadow-m);
    background: var(--wa-color-surface-raised);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    padding-block: 0.5em;
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);

    &::slotted(wa-divider) {
      --spacing: 0.5em;
    }
  }

  slot:not([name])::slotted(small) {
    display: block;
    font-size: var(--wa-font-size-smaller);
    font-weight: var(--wa-font-weight-semibold);
    color: var(--wa-color-text-quiet);
    padding-block: 0.5em;
    padding-inline: 2.25em;
  }
`,r=o(5280),s=o(1754),n=o(4115),l=o(1590),c=o(7434),h=o(8030),d=o(3158),u=o(1325),p=o(4411),m=o(4671),b=o(9359),v=o(2346),f=o(7870),g=o(7425),w=o(3720),y=o(6781),x=class extends u.q{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new p.X(this,"hint","label"),this.localize=new b.c(this),this.selectionOrder=new Map,this.typeToSelectString="",this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=t=>a.qy`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
          data-value=${t.value}
          @wa-remove=${e=>this.handleTagRemove(e,t)}
        >
          ${t.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,o=null!==e.closest('[part~="clear-button"]'),a=null!==e.closest("wa-button");if(!o&&!a){if("Escape"===t.key&&this.open&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),"Enter"===t.key||" "===t.key&&""===this.typeToSelectString)return t.preventDefault(),t.stopImmediatePropagation(),this.open?void(this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))):void this.show();if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const e=this.getAllOptions(),o=e.indexOf(this.currentOption);let a=Math.max(0,o);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;"ArrowDown"===t.key?(a=o+1,a>e.length-1&&(a=0)):"ArrowUp"===t.key?(a=o-1,a<0&&(a=e.length-1)):"Home"===t.key?a=0:"End"===t.key&&(a=e.length-1),this.setCurrentOption(e[a])}if(1===t.key?.length||"Backspace"===t.key){const e=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if("Backspace"===t.key)return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),"Backspace"===t.key?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const t of e)if(t.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(t);break}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){const t=a.S$?[]:[(0,h.Y)({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),null==t||Array.isArray(t)||(t=[t]),this._value=t??null,this.value!==e&&(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;null!=t&&(t=Array.isArray(t)?t:[t]),this.optionValues=null==t?new Set(null):new Set(this.getAllOptions().filter(t=>!t.disabled).map(t=>t.value));let e=t;return null!=t&&(e=t.filter(t=>this.optionValues.has(t)),e=this.multiple?e:e[0],e=e??null),e}connectedCallback(){super.connectedCallback(),this.handleDefaultSlotChange(),this.open=!1}updateDefaultValue(){const t=this.getAllOptions().filter(t=>t.hasAttribute("selected")||t.defaultSelected);if(t.length>0){const e=t.map(t=>t.value);this._defaultValue=this.multiple?e:e[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){const e=t.composedPath().some(t=>t instanceof Element&&"wa-button"===t.tagName.toLowerCase());this.disabled||e||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),null!==this.value&&(this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new s.I),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const e=t.target.closest("wa-option");e&&!e.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(e):this.setSelectedOptions(e),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange());const t=this.getAllOptions();this.optionValues=void 0,this.updateDefaultValue();let e=this.value;if(null==e||!this.valueHasChanged&&!this.hasInteracted)return void this.selectionChanged();Array.isArray(e)||(e=[e]);const o=t.filter(t=>e.includes(t.value));this.setSelectedOptions(o)}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let o=e;if(!o){const e=t.target.closest("wa-tag[data-value]");if(e){const t=e.dataset.value;o=this.selectedOptions.find(e=>e.value===t)}}o&&(this.toggleOptionSelection(o,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this?.querySelectorAll?[...this.querySelectorAll("wa-option")]:[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(t){this.getAllOptions().forEach(t=>{t.current=!1,t.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),o=Array.isArray(t)?t:[t];e.forEach(t=>{o.includes(t)||(t.selected=!1)}),o.length&&o.forEach(t=>t.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){t.selected=!0===e||!1===e?e:!t.selected,this.selectionChanged()}selectionChanged(){const t=this.getAllOptions().filter(t=>{if(!this.hasInteracted&&!this.valueHasChanged){const e=this.defaultValue,o=Array.isArray(e)?e:[e];return t.hasAttribute("selected")||t.defaultSelected||t.selected||o?.includes(t.value)}return t.selected}),e=new Set(t.map(t=>t.value));for(const t of this.selectionOrder.keys())e.has(t)||this.selectionOrder.delete(t);let o=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(const e of t)this.selectionOrder.has(e.value)||this.selectionOrder.set(e.value,o++);this.selectedOptions=t.sort((t,e)=>(this.selectionOrder.get(t.value)??0)-(this.selectionOrder.get(e.value)??0));let a=new Set(this.selectedOptions.map(t=>t.value));if(a.size>0||this._value){const t=this._value;if(null==this._value){let t=this.defaultValue??[];this._value=Array.isArray(t)?t:[t]}this._value=this._value?.filter(t=>!this.optionValues?.has(t))??null,this._value?.unshift(...a),this.requestUpdate("value",t)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const t=this.selectedOptions[0];this.displayLabel=t?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const o=this.getTag(t,e);return o?"string"==typeof o?(0,y._)(o):o:null}return e===this.maxOptionsVisible?a.qy`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            >+${this.selectedOptions.length-e}</wa-tag
          >
        `:null})}updated(t){super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],o=t.filter(t=>e.includes(t.value));this.setSelectedOptions(o),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());const t=new n.kB;if(this.dispatchEvent(t),t.defaultPrevented)return void(this.open=!1);this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await(0,c.Ud)(this.popup.popup,"show"),this.currentOption&&(0,r.Rt)(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new n.qu)}else{const t=new n.Lq;if(this.dispatchEvent(t),t.defaultPrevented)return void(this.open=!1);this.removeOpenListeners(),await(0,c.Ud)(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new n.Z1)}}async show(){if(!this.open&&!this.disabled)return this.open=!0,(0,l.l)(this,"wa-after-show");this.open=!1}async hide(){if(this.open&&!this.disabled)return this.open=!1,(0,l.l)(this,"wa-after-hide");this.open=!1}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=!!this.label||!!t,i=!!this.hint||!!e,r=(this.hasUpdated||a.S$)&&this.withClear&&!this.disabled&&this.value&&this.value.length>0,s=Boolean(this.placeholder&&(!this.value||0===this.value.length));return a.qy`
      <div
        part="form-control"
        class=${(0,w.H)({"form-control":!0,"form-control-has-label":o})}
      >
        <label
          id="label"
          part="form-control-label label"
          class="label"
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${(0,w.H)({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple,"placeholder-visible":s})}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              <input
                part="display-input"
                class="display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                ?required=${this.required}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-invalid=${!this.validity.valid}
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="hint"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              <!-- Tags need to wait for first hydration before populating otherwise it will create a hydration mismatch. -->
              ${this.multiple&&this.hasUpdated?a.qy`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${r?a.qy`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${(0,w.H)({"has-slotted":i})}
          aria-hidden=${i?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};x.css=[i,d.I,m.J],(0,f.Cc)([(0,g.P)(".select")],x.prototype,"popup",2),(0,f.Cc)([(0,g.P)(".combobox")],x.prototype,"combobox",2),(0,f.Cc)([(0,g.P)(".display-input")],x.prototype,"displayInput",2),(0,f.Cc)([(0,g.P)(".value-input")],x.prototype,"valueInput",2),(0,f.Cc)([(0,g.P)(".listbox")],x.prototype,"listbox",2),(0,f.Cc)([(0,g.wk)()],x.prototype,"displayLabel",2),(0,f.Cc)([(0,g.wk)()],x.prototype,"currentOption",2),(0,f.Cc)([(0,g.wk)()],x.prototype,"selectedOptions",2),(0,f.Cc)([(0,g.wk)()],x.prototype,"optionValues",2),(0,f.Cc)([(0,g.MZ)({reflect:!0})],x.prototype,"name",2),(0,f.Cc)([(0,g.MZ)({attribute:!1})],x.prototype,"defaultValue",1),(0,f.Cc)([(0,g.MZ)({attribute:"value",reflect:!1})],x.prototype,"value",1),(0,f.Cc)([(0,g.MZ)({reflect:!0})],x.prototype,"size",2),(0,f.Cc)([(0,g.MZ)()],x.prototype,"placeholder",2),(0,f.Cc)([(0,g.MZ)({type:Boolean,reflect:!0})],x.prototype,"multiple",2),(0,f.Cc)([(0,g.MZ)({attribute:"max-options-visible",type:Number})],x.prototype,"maxOptionsVisible",2),(0,f.Cc)([(0,g.MZ)({type:Boolean})],x.prototype,"disabled",2),(0,f.Cc)([(0,g.MZ)({attribute:"with-clear",type:Boolean})],x.prototype,"withClear",2),(0,f.Cc)([(0,g.MZ)({type:Boolean,reflect:!0})],x.prototype,"open",2),(0,f.Cc)([(0,g.MZ)({reflect:!0})],x.prototype,"appearance",2),(0,f.Cc)([(0,g.MZ)({type:Boolean,reflect:!0})],x.prototype,"pill",2),(0,f.Cc)([(0,g.MZ)()],x.prototype,"label",2),(0,f.Cc)([(0,g.MZ)({reflect:!0})],x.prototype,"placement",2),(0,f.Cc)([(0,g.MZ)({attribute:"hint"})],x.prototype,"hint",2),(0,f.Cc)([(0,g.MZ)({attribute:"with-label",type:Boolean})],x.prototype,"withLabel",2),(0,f.Cc)([(0,g.MZ)({attribute:"with-hint",type:Boolean})],x.prototype,"withHint",2),(0,f.Cc)([(0,g.MZ)({type:Boolean,reflect:!0})],x.prototype,"required",2),(0,f.Cc)([(0,g.MZ)({attribute:!1})],x.prototype,"getTag",2),(0,f.Cc)([(0,v.w)("disabled",{waitUntilFirstUpdate:!0})],x.prototype,"handleDisabledChange",1),(0,f.Cc)([(0,v.w)("value",{waitUntilFirstUpdate:!0})],x.prototype,"handleValueChange",1),(0,f.Cc)([(0,v.w)("open",{waitUntilFirstUpdate:!0})],x.prototype,"handleOpenChange",1),x=(0,f.Cc)([(0,g.EM)("wa-select")],x),o(4721),o(9081),o(3380),o(9685),o(8499),o(1404),o(6075),o(5949),o(5566),o(2590),o(517),o(3169),o(9456),o(1092),o(9610),o(2312),o(6127),o(1353),o(9373),o(5915)},5915(t,e,o){o.d(e,{_:()=>l});var a,i=o(7870),r=o(6337),s=o(7425),n=r.AH`
  :host {
    box-sizing: border-box !important;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit !important;
  }

  [hidden] {
    display: none !important;
  }
`,l=class extends r.WF{constructor(){super(),(0,i.VK)(this,a,!1),this.initialReflectedProperties=new Map,this.didSSR=r.S$||Boolean(this.shadowRoot),this.customStates={set:(t,e)=>{if(Boolean(this.internals?.states))try{e?this.internals.states.add(t):this.internals.states.delete(t)}catch(t){if(!String(t).includes("must start with '--'"))throw t;console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill")}},has:t=>{if(!Boolean(this.internals?.states))return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,o]of t.elementProperties)"inherit"===o.default&&void 0!==o.initial&&"string"==typeof e&&this.customStates.set(`initial-${e}-${o.initial}`,!0)}static get styles(){const t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[n,...t]}attributeChangedCallback(t,e,o){(0,i.S7)(this,a)||(this.constructor.elementProperties.forEach((t,e)=>{t.reflect&&null!=this[e]&&this.initialReflectedProperties.set(e,this[e])}),(0,i.OV)(this,a,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,o)=>{t.has(o)&&null==this[o]&&(this[o]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(t){if(this.didSSR&&!this.hasUpdated){const e=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});e.error=t,this.dispatchEvent(e)}throw t}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};a=new WeakMap,(0,i.Cc)([(0,s.MZ)()],l.prototype,"dir",2),(0,i.Cc)([(0,s.MZ)()],l.prototype,"lang",2),(0,i.Cc)([(0,s.MZ)({type:Boolean,reflect:!0,attribute:"did-ssr"})],l.prototype,"didSSR",2)},5949(t,e,o){var a=o(5963),i=o(1325),r=o(4411),s=o(517),n=o(4671),l=o(3169),c=o(9359),h=o(2346),d=o(7870),u=o(7425),p=o(3720),m=o(31),b=o(6752);const v=Symbol.for(""),f=t=>{if(t?.r===v)return t?._$litStatic$},g=(t,...e)=>({_$litStatic$:e.reduce((e,o,a)=>e+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(o)+t[a+1],t[0]),r:v}),w=new Map,y=t=>(e,...o)=>{const a=o.length;let i,r;const s=[],n=[];let l,c=0,h=!1;for(;c<a;){for(l=e[c];c<a&&void 0!==(r=o[c],i=f(r));)l+=i+e[++c],h=!0;c!==a&&n.push(r),s.push(l),c++}if(c===a&&s.push(e[a]),h){const t=s.join("$$lit$$");void 0===(e=w.get(t))&&(s.raw=s,w.set(t,e=s)),o=n}return t(e,...o)},x=y(b.qy);y(b.JW),y(b.ej);var C=class extends i.q{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new r.X(this,"[default]","start","end"),this.localize=new c.c(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="medium",this.withCaret=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,(0,a.i)()]}constructLightDOMButton(){const t=document.createElement("button");for(const e of this.attributes)"style"!==e.name&&t.setAttribute(e.name,e.value);return t.type=this.type,t.style.position="absolute !important",t.style.width="0 !important",t.style.height="0 !important",t.style.clipPath="inset(50%) !important",t.style.overflow="hidden !important",t.style.whiteSpace="nowrap !important",this.name&&(t.name=this.name),t.value=this.value||"",t}handleClick(){if(!this.getForm())return;const t=this.constructLightDOMButton();this.parentElement?.append(t),t.click(),t.remove()}handleInvalid(){this.dispatchEvent(new i.W)}handleLabelSlotChange(){const t=this.labelSlot.assignedNodes({flatten:!0});let e=!1,o=!1,a=!1,i=!1;[...t].forEach(t=>{if(t.nodeType===Node.ELEMENT_NODE){const a=t;"wa-icon"===a.localName?(o=!0,e||(e=void 0!==a.label)):i=!0}else t.nodeType===Node.TEXT_NODE&&(t.textContent?.trim()||"").length>0&&(a=!0)}),this.isIconButton=o&&!a&&!i,this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.updateValidity()}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=this.isLink(),e=t?g`a`:g`button`;return x`
      <${e}
        part="base"
        class=${(0,p.H)({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:"rtl"===this.localize.dir(),"has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start"),"has-end":this.hasSlotController.test("end"),"is-icon-button":this.isIconButton})}
        ?disabled=${(0,m.J)(t?void 0:this.disabled)}
        type=${(0,m.J)(t?void 0:this.type)}
        title=${this.title}
        name=${(0,m.J)(t?void 0:this.name)}
        value=${(0,m.J)(t?void 0:this.value)}
        href=${(0,m.J)(t?this.href:void 0)}
        target=${(0,m.J)(t?this.target:void 0)}
        download=${(0,m.J)(t?this.download:void 0)}
        rel=${(0,m.J)(t&&this.rel?this.rel:void 0)}
        role=${(0,m.J)(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?x`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?x`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${e}>
    `}};C.shadowRootOptions={...i.q.shadowRootOptions,delegatesFocus:!0},C.css=[s.q,l.M,n.J],(0,d.Cc)([(0,u.P)(".button")],C.prototype,"button",2),(0,d.Cc)([(0,u.P)("slot:not([name])")],C.prototype,"labelSlot",2),(0,d.Cc)([(0,u.wk)()],C.prototype,"invalid",2),(0,d.Cc)([(0,u.wk)()],C.prototype,"isIconButton",2),(0,d.Cc)([(0,u.MZ)()],C.prototype,"title",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],C.prototype,"variant",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],C.prototype,"appearance",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],C.prototype,"size",2),(0,d.Cc)([(0,u.MZ)({attribute:"with-caret",type:Boolean,reflect:!0})],C.prototype,"withCaret",2),(0,d.Cc)([(0,u.MZ)({type:Boolean})],C.prototype,"disabled",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,reflect:!0})],C.prototype,"loading",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,reflect:!0})],C.prototype,"pill",2),(0,d.Cc)([(0,u.MZ)()],C.prototype,"type",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],C.prototype,"name",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],C.prototype,"value",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],C.prototype,"href",2),(0,d.Cc)([(0,u.MZ)()],C.prototype,"target",2),(0,d.Cc)([(0,u.MZ)()],C.prototype,"rel",2),(0,d.Cc)([(0,u.MZ)()],C.prototype,"download",2),(0,d.Cc)([(0,u.MZ)({attribute:"formaction"})],C.prototype,"formAction",2),(0,d.Cc)([(0,u.MZ)({attribute:"formenctype"})],C.prototype,"formEnctype",2),(0,d.Cc)([(0,u.MZ)({attribute:"formmethod"})],C.prototype,"formMethod",2),(0,d.Cc)([(0,u.MZ)({attribute:"formnovalidate",type:Boolean})],C.prototype,"formNoValidate",2),(0,d.Cc)([(0,u.MZ)({attribute:"formtarget"})],C.prototype,"formTarget",2),(0,d.Cc)([(0,h.w)("disabled",{waitUntilFirstUpdate:!0})],C.prototype,"handleDisabledChange",1),C=(0,d.Cc)([(0,u.EM)("wa-button")],C)},5963(t,e,o){o.d(e,{i:()=>a});var a=()=>({checkValidity(t){const e=t.input,o={message:"",isValid:!0,invalidKeys:[]};if(!e)return o;let a=!0;if("checkValidity"in e&&(a=e.checkValidity()),a)return o;if(o.isValid=!1,"validationMessage"in e&&(o.message=e.validationMessage),!("validity"in e))return o.invalidKeys.push("customError"),o;for(const t in e.validity){if("valid"===t)continue;const a=t;e.validity[a]&&o.invalidKeys.push(a)}return o}})},6075(t,e,o){o.d(e,{w:()=>a});var a=o(6337).AH`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --show-duration: 100ms;
    --hide-duration: 100ms;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: 3;
  }

  :host([data-current-placement~='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement~='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement~='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`},6127(t,e,o){o.d(e,{Hh:()=>c,Sm:()=>h,Xr:()=>d,cl:()=>l,pA:()=>n});var a=o(1353),i=o(9373),r=[a.q_,i.g],s=[];function n(t){s.push(t)}function l(t){s=s.filter(e=>e!==t)}function c(t){return r.find(e=>e.name===t)}function h(t,e){!function(t){r=r.filter(e=>e.name!==t)}(t),r.push({name:t,resolver:e.resolver,mutator:e.mutator,spriteSheet:e.spriteSheet}),s.forEach(e=>{e.library===t&&e.setIcon()})}function d(){return"classic"}},6209(t,e,o){var a=o(6337),i=a.AH`
  :host {
    display: inline-flex;
  }

  .button-group {
    display: flex;
    position: relative;
    isolation: isolate;
    flex-wrap: wrap;
    gap: 1px;

    @media (hover: hover) {
      > :hover,
      &::slotted(:hover) {
        z-index: 1;
      }
    }

    /* Focus and checked are always on top */
    > :focus,
    &::slotted(:focus),
    > [aria-checked='true'],
    &::slotted([aria-checked='true']),
    > [checked],
    &::slotted([checked]) {
      z-index: 2 !important;
    }
  }
  :host([orientation='vertical']) .button-group {
    flex-direction: column;
  }

  /* Button groups with at least one outlined button will not have a gap and instead have borders overlap */
  .button-group.has-outlined {
    gap: 0;

    &:not([aria-orientation='vertical']):not(.button-group-vertical)::slotted(:not(:first-child)) {
      margin-inline-start: calc(-1 * var(--border-width));
    }

    &:is([aria-orientation='vertical'], .button-group-vertical)::slotted(:not(:first-child)) {
      margin-block-start: calc(-1 * var(--border-width));
    }
  }
`,r=o(5915),s=o(7870),n=o(7425),l=o(3720),c=class extends r._{constructor(){super(...arguments),this.disableRole=!1,this.hasOutlined=!1,this.label="",this.orientation="horizontal"}updated(t){super.updated(t),t.has("orientation")&&(this.setAttribute("aria-orientation",this.orientation),this.updateClassNames())}handleFocus(t){const e=h(t.target);e?.classList.add("button-focus")}handleBlur(t){const e=h(t.target);e?.classList.remove("button-focus")}handleMouseOver(t){const e=h(t.target);e?.classList.add("button-hover")}handleMouseOut(t){const e=h(t.target);e?.classList.remove("button-hover")}handleSlotChange(){this.updateClassNames()}updateClassNames(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];this.hasOutlined=!1,t.forEach(e=>{const o=t.indexOf(e),a=h(e);a&&("outlined"===a.appearance&&(this.hasOutlined=!0),a.classList.add("wa-button-group__button"),a.classList.toggle("wa-button-group__horizontal","horizontal"===this.orientation),a.classList.toggle("wa-button-group__vertical","vertical"===this.orientation),a.classList.toggle("wa-button-group__button-first",0===o),a.classList.toggle("wa-button-group__button-inner",o>0&&o<t.length-1),a.classList.toggle("wa-button-group__button-last",o===t.length-1),a.classList.toggle("wa-button-group__button-radio","wa-radio-button"===a.tagName.toLowerCase()))})}render(){return a.qy`
      <slot
        part="base"
        class=${(0,l.H)({"button-group":!0,"has-outlined":this.hasOutlined})}
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        @slotchange=${this.handleSlotChange}
      ></slot>
    `}};function h(t){const e="wa-button, wa-radio-button";return t.closest(e)??t.querySelector(e)}c.css=[i],(0,s.Cc)([(0,n.P)("slot")],c.prototype,"defaultSlot",2),(0,s.Cc)([(0,n.wk)()],c.prototype,"disableRole",2),(0,s.Cc)([(0,n.wk)()],c.prototype,"hasOutlined",2),(0,s.Cc)([(0,n.MZ)()],c.prototype,"label",2),(0,s.Cc)([(0,n.MZ)({reflect:!0})],c.prototype,"orientation",2),c=(0,s.Cc)([(0,n.EM)("wa-button-group")],c)},6511(t,e,o){var a=o(6337),i=a.AH`
  :host {
    --indicator-color: var(--wa-color-brand-fill-loud);
    --track-color: var(--wa-color-neutral-fill-normal);
    --track-width: 0.125rem;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tabs {
    display: flex;
    position: relative;
  }

  .indicator {
    position: absolute;
  }

  .tab-group-has-scroll-controls .nav-container {
    position: relative;
    padding: 0 1.5em;
  }

  .body {
    display: block;
  }

  .scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1.5em;
  }

  .scroll-button-start {
    inset-inline-start: 0;
  }

  .scroll-button-end {
    inset-inline-end: 0;
  }

  /*
   * Top
   */

  .tab-group-top {
    flex-direction: column;
  }

  .tab-group-top .nav-container {
    order: 1;
  }

  .tab-group-top .nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group-top .nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group-top .tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group-top .indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group-top .body {
    order: 2;
  }

  .tab-group-top ::slotted(wa-tab[active]) {
    border-block-end: solid var(--track-width) var(--indicator-color);
    margin-block-end: calc(-1 * var(--track-width));
  }

  .tab-group-top ::slotted(wa-tab-panel) {
    --padding: var(--wa-space-xl) 0;
  }

  /*
   * Bottom
   */

  .tab-group-bottom {
    flex-direction: column;
  }

  .tab-group-bottom .nav-container {
    order: 2;
  }

  .tab-group-bottom .nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group-bottom .nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group-bottom .tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group-bottom .indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group-bottom .body {
    order: 1;
  }

  .tab-group-bottom ::slotted(wa-tab[active]) {
    border-block-start: solid var(--track-width) var(--indicator-color);
    margin-block-start: calc(-1 * var(--track-width));
  }

  .tab-group-bottom ::slotted(wa-tab-panel) {
    --padding: var(--wa-space-xl) 0;
  }

  /*
   * Start
   */

  .tab-group-start {
    flex-direction: row;
  }

  .tab-group-start .nav-container {
    order: 1;
  }

  .tab-group-start .tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group-start .indicator {
    inset-inline-end: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group-start .body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group-start ::slotted(wa-tab[active]) {
    border-inline-end: solid var(--track-width) var(--indicator-color);
    margin-inline-end: calc(-1 * var(--track-width));
  }

  .tab-group-start ::slotted(wa-tab-panel) {
    --padding: 0 var(--wa-space-xl);
  }

  /*
   * End
   */

  .tab-group-end {
    flex-direction: row;
  }

  .tab-group-end .nav-container {
    order: 2;
  }

  .tab-group-end .tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group-end .indicator {
    inset-inline-start: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group-end .body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group-end ::slotted(wa-tab[active]) {
    border-inline-start: solid var(--track-width) var(--indicator-color);
    margin-inline-start: calc(-1 * var(--track-width));
  }

  .tab-group-end ::slotted(wa-tab-panel) {
    --padding: 0 var(--wa-space-xl);
  }
`,r=o(5280),s=o(9359),n=o(2346),l=o(5915),c=o(7870),h=o(7425),d=o(3720),u=class extends Event{constructor(t){super("wa-tab-hide",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}},p=class extends Event{constructor(t){super("wa-tab-show",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}},m=class extends l._{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new s.c(this),this.hasScrollControls=!1,this.active="",this.placement="top",this.activation="auto",this.withoutScrollControls=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.updateScrollControls()}),this.mutationObserver=new MutationObserver(t=>{t.some(t=>!["aria-labelledby","aria-controls"].includes(t.attributeName))&&setTimeout(()=>this.setAriaLabels());const e=t.filter(t=>t.target.closest("wa-tab-group")===this);if(e.some(t=>"disabled"===t.attributeName))this.syncTabsAndPanels();else if(e.some(t=>"active"===t.attributeName)){const t=e.filter(t=>"active"===t.attributeName&&"wa-tab"===t.target.tagName.toLowerCase()).map(t=>t.target).find(t=>t.active);t&&t.closest("wa-tab-group")===this&&this.setActiveTab(t)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),new IntersectionObserver((t,e)=>{if(t[0].intersectionRatio>0){if(this.setAriaLabels(),this.active){const t=this.tabs.find(t=>t.panel===this.active);t&&this.setActiveTab(t)}else this.setActiveTab(this.getActiveTab()??this.tabs[0],{emitEvents:!1});e.unobserve(t[0].target)}}).observe(this.tabGroup)})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect(),this.nav&&this.resizeObserver?.unobserve(this.nav)}getAllTabs(){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter(t=>"wa-tab"===t.tagName.toLowerCase())}getAllPanels(){return[...this.body.assignedElements()].filter(t=>"wa-tab-panel"===t.tagName.toLowerCase())}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){const e=t.target.closest("wa-tab"),o=e?.closest("wa-tab-group");o===this&&null!==e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}handleKeyDown(t){const e=t.target.closest("wa-tab"),o=e?.closest("wa-tab-group");if(o===this)if(["Enter"," "].includes(t.key))null!==e&&(this.setActiveTab(e,{scrollBehavior:"smooth"}),t.preventDefault());else if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){const e=this.tabs.find(t=>t.matches(":focus")),o="rtl"===this.localize.dir();let a=null;if("wa-tab"===e?.tagName.toLowerCase()){if("Home"===t.key)a=this.focusableTabs[0];else if("End"===t.key)a=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(o?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&"ArrowUp"===t.key){const t=this.tabs.findIndex(t=>t===e);a=this.findNextFocusableTab(t,"backward")}else if(["top","bottom"].includes(this.placement)&&t.key===(o?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&"ArrowDown"===t.key){const t=this.tabs.findIndex(t=>t===e);a=this.findNextFocusableTab(t,"forward")}if(!a)return;a.tabIndex=0,a.focus({preventScroll:!0}),"auto"===this.activation?this.setActiveTab(a,{scrollBehavior:"smooth"}):this.tabs.forEach(t=>{t.tabIndex=t===a?0:-1}),["top","bottom"].includes(this.placement)&&(0,r.Rt)(a,this.nav,"horizontal"),t.preventDefault()}}}findNextFocusableTab(t,e){let o=null;const a="forward"===e?1:-1;let i=t+a;for(;t<this.tabs.length;){if(o=this.tabs[i]||null,null===o){o="forward"===e?this.focusableTabs[0]:this.focusableTabs[this.focusableTabs.length-1];break}if(!o.disabled)break;i+=a}return o}handleScrollToStart(){this.nav.scroll({left:"rtl"===this.localize.dir()?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:"rtl"===this.localize.dir()?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e={emitEvents:!0,scrollBehavior:"auto",...e},t.closest("wa-tab-group")===this&&t!==this.activeTab&&!t.disabled){const o=this.activeTab;this.active=t.panel,this.activeTab=t,this.tabs.forEach(t=>{t.active=t===this.activeTab,t.tabIndex=t===this.activeTab?0:-1}),this.panels.forEach(t=>t.active=t.name===this.activeTab?.panel),["top","bottom"].includes(this.placement)&&(0,r.Rt)(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(o&&this.dispatchEvent(new u({name:o.panel})),this.dispatchEvent(new p({name:this.activeTab.panel})))}}setAriaLabels(){this.tabs.forEach(t=>{const e=this.panels.find(e=>e.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.updateComplete.then(()=>this.updateScrollControls())}updateActiveTab(){const t=this.tabs.find(t=>t.panel===this.active);t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}updateScrollControls(){this.withoutScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1}render(){const t=this.hasUpdated?"rtl"===this.localize.dir():"rtl"===this.dir;return a.qy`
      <div
        part="base"
        class=${(0,d.H)({"tab-group":!0,"tab-group-top":"top"===this.placement,"tab-group-bottom":"bottom"===this.placement,"tab-group-start":"start"===this.placement,"tab-group-end":"end"===this.placement,"tab-group-has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="nav-container" part="nav">
          ${this.hasScrollControls?a.qy`
                <wa-button
                  part="scroll-button scroll-button-start"
                  exportparts="base:scroll-button__base"
                  class="scroll-button scroll-button-start"
                  appearance="plain"
                  @click=${this.handleScrollToStart}
                >
                  <wa-icon
                    name=${t?"chevron-right":"chevron-left"}
                    library="system"
                    variant="solid"
                    label=${this.localize.term("scrollToStart")}
                  ></wa-icon>
                </wa-button>
              `:""}

          <!-- We have a focus listener because in Firefox (and soon to be Chrome) overflow containers are focusable. -->
          <div class="nav" @focus=${()=>this.activeTab?.focus({preventScroll:!0})}>
            <div part="tabs" class="tabs" role="tablist">
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?a.qy`
                <wa-button
                  part="scroll-button scroll-button-end"
                  class="scroll-button scroll-button-end"
                  exportparts="base:scroll-button__base"
                  appearance="plain"
                  @click=${this.handleScrollToEnd}
                >
                  <wa-icon
                    name=${t?"chevron-left":"chevron-right"}
                    library="system"
                    variant="solid"
                    label=${this.localize.term("scrollToEnd")}
                  ></wa-icon>
                </wa-button>
              `:""}
        </div>

        <slot part="body" class="body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};m.css=i,(0,c.Cc)([(0,h.P)(".tab-group")],m.prototype,"tabGroup",2),(0,c.Cc)([(0,h.P)(".body")],m.prototype,"body",2),(0,c.Cc)([(0,h.P)(".nav")],m.prototype,"nav",2),(0,c.Cc)([(0,h.wk)()],m.prototype,"hasScrollControls",2),(0,c.Cc)([(0,h.MZ)({reflect:!0})],m.prototype,"active",2),(0,c.Cc)([(0,h.MZ)()],m.prototype,"placement",2),(0,c.Cc)([(0,h.MZ)()],m.prototype,"activation",2),(0,c.Cc)([(0,h.MZ)({attribute:"without-scroll-controls",type:Boolean})],m.prototype,"withoutScrollControls",2),(0,c.Cc)([(0,n.w)("active")],m.prototype,"updateActiveTab",1),(0,c.Cc)([(0,n.w)("withoutScrollControls",{waitUntilFirstUpdate:!0})],m.prototype,"updateScrollControls",1),m=(0,c.Cc)([(0,h.EM)("wa-tab-group")],m),o(1501),o(8354),o(4313),o(8181),o(5949),o(5566),o(2590),o(1325),o(517),o(4671),o(3169),o(9456),o(1092),o(9610),o(2312),o(6127),o(1353),o(9373)},6635(t,e,o){function a(){return"undefined"!=typeof window}function i(t){return n(t)?(t.nodeName||"").toLowerCase():"#document"}function r(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function s(t){var e;return null==(e=(n(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function n(t){return!!a()&&(t instanceof Node||t instanceof r(t).Node)}function l(t){return!!a()&&(t instanceof Element||t instanceof r(t).Element)}function c(t){return!!a()&&(t instanceof HTMLElement||t instanceof r(t).HTMLElement)}function h(t){return!(!a()||"undefined"==typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof r(t).ShadowRoot)}o.d(e,{$4:()=>$,CP:()=>M,L9:()=>E,Lv:()=>m,Tc:()=>C,Tf:()=>v,ZU:()=>u,_m:()=>O,ep:()=>s,eu:()=>S,gJ:()=>x,mq:()=>i,sQ:()=>y,sb:()=>c,v9:()=>z,vq:()=>l,zk:()=>r});const d=new Set(["inline","contents"]);function u(t){const{overflow:e,overflowX:o,overflowY:a,display:i}=E(t);return/auto|scroll|overlay|hidden|clip/.test(e+a+o)&&!d.has(i)}const p=new Set(["table","td","th"]);function m(t){return p.has(i(t))}const b=[":popover-open",":modal"];function v(t){return b.some(e=>{try{return t.matches(e)}catch(t){return!1}})}const f=["transform","translate","scale","rotate","perspective"],g=["transform","translate","scale","rotate","perspective","filter"],w=["paint","layout","strict","content"];function y(t){const e=C(),o=l(t)?E(t):t;return f.some(t=>!!o[t]&&"none"!==o[t])||!!o.containerType&&"normal"!==o.containerType||!e&&!!o.backdropFilter&&"none"!==o.backdropFilter||!e&&!!o.filter&&"none"!==o.filter||g.some(t=>(o.willChange||"").includes(t))||w.some(t=>(o.contain||"").includes(t))}function x(t){let e=$(t);for(;c(e)&&!S(e);){if(y(e))return e;if(v(e))return null;e=$(e)}return null}function C(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}const k=new Set(["html","body","#document"]);function S(t){return k.has(i(t))}function E(t){return r(t).getComputedStyle(t)}function M(t){return l(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function $(t){if("html"===i(t))return t;const e=t.assignedSlot||t.parentNode||h(t)&&t.host||s(t);return h(e)?e.host:e}function A(t){const e=$(t);return S(e)?t.ownerDocument?t.ownerDocument.body:t.body:c(e)&&u(e)?e:A(e)}function z(t,e,o){var a;void 0===e&&(e=[]),void 0===o&&(o=!0);const i=A(t),s=i===(null==(a=t.ownerDocument)?void 0:a.body),n=r(i);if(s){const t=O(n);return e.concat(n,n.visualViewport||[],u(i)?i:[],t&&o?z(t):[])}return e.concat(i,z(i,[],o))}function O(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}},6781(t,e,o){o.d(e,{_:()=>s});var a=o(6752),i=o(7804);class r extends i.WL{constructor(t){if(super(t),this.it=a.s6,t.type!==i.OA.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===a.s6||null==t)return this._t=void 0,this.it=t;if(t===a.c0)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}r.directiveName="unsafeHTML",r.resultType=1;const s=(0,i.u$)(r)},7146(t,e,o){o(5949),o(5566),o(2590),o(1325),o(517),o(4671),o(3169),o(9456),o(1092),o(9610),o(9359),o(2312),o(6127),o(1353),o(9373),o(5915),o(7870)},7256(t,e,o){o(8499),o(1404),o(6075),o(9359),o(2312),o(5915),o(7870)},7315(t,e,o){o.d(e,{UE:()=>Q,ll:()=>K,rD:()=>tt,UU:()=>Y,cY:()=>J,iD:()=>j,BN:()=>X,Ej:()=>G});const a=Math.min,i=Math.max,r=Math.round,s=Math.floor,n=t=>({x:t,y:t}),l={left:"right",right:"left",bottom:"top",top:"bottom"},c={start:"end",end:"start"};function h(t,e,o){return i(t,a(e,o))}function d(t,e){return"function"==typeof t?t(e):t}function u(t){return t.split("-")[0]}function p(t){return t.split("-")[1]}function m(t){return"x"===t?"y":"x"}function b(t){return"y"===t?"height":"width"}const v=new Set(["top","bottom"]);function f(t){return v.has(u(t))?"y":"x"}function g(t){return m(f(t))}function w(t){return t.replace(/start|end/g,t=>c[t])}const y=["left","right"],x=["right","left"],C=["top","bottom"],k=["bottom","top"];function S(t){return t.replace(/left|right|bottom|top/g,t=>l[t])}function E(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function M(t){const{x:e,y:o,width:a,height:i}=t;return{width:a,height:i,top:o,left:e,right:e+a,bottom:o+i,x:e,y:o}}function $(t,e,o){let{reference:a,floating:i}=t;const r=f(e),s=g(e),n=b(s),l=u(e),c="y"===r,h=a.x+a.width/2-i.width/2,d=a.y+a.height/2-i.height/2,m=a[n]/2-i[n]/2;let v;switch(l){case"top":v={x:h,y:a.y-i.height};break;case"bottom":v={x:h,y:a.y+a.height};break;case"right":v={x:a.x+a.width,y:d};break;case"left":v={x:a.x-i.width,y:d};break;default:v={x:a.x,y:a.y}}switch(p(e)){case"start":v[s]-=m*(o&&c?-1:1);break;case"end":v[s]+=m*(o&&c?-1:1)}return v}async function A(t,e){var o;void 0===e&&(e={});const{x:a,y:i,platform:r,rects:s,elements:n,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:u="floating",altBoundary:p=!1,padding:m=0}=d(e,t),b=E(m),v=n[p?"floating"===u?"reference":"floating":u],f=M(await r.getClippingRect({element:null==(o=await(null==r.isElement?void 0:r.isElement(v)))||o?v:v.contextElement||await(null==r.getDocumentElement?void 0:r.getDocumentElement(n.floating)),boundary:c,rootBoundary:h,strategy:l})),g="floating"===u?{x:a,y:i,width:s.floating.width,height:s.floating.height}:s.reference,w=await(null==r.getOffsetParent?void 0:r.getOffsetParent(n.floating)),y=await(null==r.isElement?void 0:r.isElement(w))&&await(null==r.getScale?void 0:r.getScale(w))||{x:1,y:1},x=M(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:n,rect:g,offsetParent:w,strategy:l}):g);return{top:(f.top-x.top+b.top)/y.y,bottom:(x.bottom-f.bottom+b.bottom)/y.y,left:(f.left-x.left+b.left)/y.x,right:(x.right-f.right+b.right)/y.x}}const z=new Set(["left","top"]);var O=o(6635);function D(t){const e=(0,O.L9)(t);let o=parseFloat(e.width)||0,a=parseFloat(e.height)||0;const i=(0,O.sb)(t),s=i?t.offsetWidth:o,n=i?t.offsetHeight:a,l=r(o)!==s||r(a)!==n;return l&&(o=s,a=n),{width:o,height:a,$:l}}function T(t){return(0,O.vq)(t)?t:t.contextElement}function q(t){const e=T(t);if(!(0,O.sb)(e))return n(1);const o=e.getBoundingClientRect(),{width:a,height:i,$:s}=D(e);let l=(s?r(o.width):o.width)/a,c=(s?r(o.height):o.height)/i;return l&&Number.isFinite(l)||(l=1),c&&Number.isFinite(c)||(c=1),{x:l,y:c}}const L=n(0);function V(t){const e=(0,O.zk)(t);return(0,O.Tc)()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:L}function Z(t,e,o,a){void 0===e&&(e=!1),void 0===o&&(o=!1);const i=t.getBoundingClientRect(),r=T(t);let s=n(1);e&&(a?(0,O.vq)(a)&&(s=q(a)):s=q(t));const l=function(t,e,o){return void 0===e&&(e=!1),!(!o||e&&o!==(0,O.zk)(t))&&e}(r,o,a)?V(r):n(0);let c=(i.left+l.x)/s.x,h=(i.top+l.y)/s.y,d=i.width/s.x,u=i.height/s.y;if(r){const t=(0,O.zk)(r),e=a&&(0,O.vq)(a)?(0,O.zk)(a):a;let o=t,i=(0,O._m)(o);for(;i&&a&&e!==o;){const t=q(i),e=i.getBoundingClientRect(),a=(0,O.L9)(i),r=e.left+(i.clientLeft+parseFloat(a.paddingLeft))*t.x,s=e.top+(i.clientTop+parseFloat(a.paddingTop))*t.y;c*=t.x,h*=t.y,d*=t.x,u*=t.y,c+=r,h+=s,o=(0,O.zk)(i),i=(0,O._m)(o)}}return M({width:d,height:u,x:c,y:h})}function P(t,e){const o=(0,O.CP)(t).scrollLeft;return e?e.left+o:Z((0,O.ep)(t)).left+o}function _(t,e){const o=t.getBoundingClientRect();return{x:o.left+e.scrollLeft-P(t,o),y:o.top+e.scrollTop}}const R=new Set(["absolute","fixed"]);function I(t,e,o){let a;if("viewport"===e)a=function(t,e){const o=(0,O.zk)(t),a=(0,O.ep)(t),i=o.visualViewport;let r=a.clientWidth,s=a.clientHeight,n=0,l=0;if(i){r=i.width,s=i.height;const t=(0,O.Tc)();(!t||t&&"fixed"===e)&&(n=i.offsetLeft,l=i.offsetTop)}const c=P(a);if(c<=0){const t=a.ownerDocument,e=t.body,o=getComputedStyle(e),i="CSS1Compat"===t.compatMode&&parseFloat(o.marginLeft)+parseFloat(o.marginRight)||0,s=Math.abs(a.clientWidth-e.clientWidth-i);s<=25&&(r-=s)}else c<=25&&(r+=c);return{width:r,height:s,x:n,y:l}}(t,o);else if("document"===e)a=function(t){const e=(0,O.ep)(t),o=(0,O.CP)(t),a=t.ownerDocument.body,r=i(e.scrollWidth,e.clientWidth,a.scrollWidth,a.clientWidth),s=i(e.scrollHeight,e.clientHeight,a.scrollHeight,a.clientHeight);let n=-o.scrollLeft+P(t);const l=-o.scrollTop;return"rtl"===(0,O.L9)(a).direction&&(n+=i(e.clientWidth,a.clientWidth)-r),{width:r,height:s,x:n,y:l}}((0,O.ep)(t));else if((0,O.vq)(e))a=function(t,e){const o=Z(t,!0,"fixed"===e),a=o.top+t.clientTop,i=o.left+t.clientLeft,r=(0,O.sb)(t)?q(t):n(1);return{width:t.clientWidth*r.x,height:t.clientHeight*r.y,x:i*r.x,y:a*r.y}}(e,o);else{const o=V(t);a={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return M(a)}function B(t,e){const o=(0,O.$4)(t);return!(o===e||!(0,O.vq)(o)||(0,O.eu)(o))&&("fixed"===(0,O.L9)(o).position||B(o,e))}function F(t,e,o){const a=(0,O.sb)(e),i=(0,O.ep)(e),r="fixed"===o,s=Z(t,!0,r,e);let l={scrollLeft:0,scrollTop:0};const c=n(0);function h(){c.x=P(i)}if(a||!a&&!r)if(("body"!==(0,O.mq)(e)||(0,O.ZU)(i))&&(l=(0,O.CP)(e)),a){const t=Z(e,!0,r,e);c.x=t.x+e.clientLeft,c.y=t.y+e.clientTop}else i&&h();r&&!a&&i&&h();const d=!i||a||r?n(0):_(i,l);return{x:s.left+l.scrollLeft-c.x-d.x,y:s.top+l.scrollTop-c.y-d.y,width:s.width,height:s.height}}function H(t){return"static"===(0,O.L9)(t).position}function N(t,e){if(!(0,O.sb)(t)||"fixed"===(0,O.L9)(t).position)return null;if(e)return e(t);let o=t.offsetParent;return(0,O.ep)(t)===o&&(o=o.ownerDocument.body),o}function U(t,e){const o=(0,O.zk)(t);if((0,O.Tf)(t))return o;if(!(0,O.sb)(t)){let e=(0,O.$4)(t);for(;e&&!(0,O.eu)(e);){if((0,O.vq)(e)&&!H(e))return e;e=(0,O.$4)(e)}return o}let a=N(t,e);for(;a&&(0,O.Lv)(a)&&H(a);)a=N(a,e);return a&&(0,O.eu)(a)&&H(a)&&!(0,O.sQ)(a)?o:a||(0,O.gJ)(t)||o}const j={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:o,offsetParent:a,strategy:i}=t;const r="fixed"===i,s=(0,O.ep)(a),l=!!e&&(0,O.Tf)(e.floating);if(a===s||l&&r)return o;let c={scrollLeft:0,scrollTop:0},h=n(1);const d=n(0),u=(0,O.sb)(a);if((u||!u&&!r)&&(("body"!==(0,O.mq)(a)||(0,O.ZU)(s))&&(c=(0,O.CP)(a)),(0,O.sb)(a))){const t=Z(a);h=q(a),d.x=t.x+a.clientLeft,d.y=t.y+a.clientTop}const p=!s||u||r?n(0):_(s,c);return{width:o.width*h.x,height:o.height*h.y,x:o.x*h.x-c.scrollLeft*h.x+d.x+p.x,y:o.y*h.y-c.scrollTop*h.y+d.y+p.y}},getDocumentElement:O.ep,getClippingRect:function(t){let{element:e,boundary:o,rootBoundary:r,strategy:s}=t;const n=[..."clippingAncestors"===o?(0,O.Tf)(e)?[]:function(t,e){const o=e.get(t);if(o)return o;let a=(0,O.v9)(t,[],!1).filter(t=>(0,O.vq)(t)&&"body"!==(0,O.mq)(t)),i=null;const r="fixed"===(0,O.L9)(t).position;let s=r?(0,O.$4)(t):t;for(;(0,O.vq)(s)&&!(0,O.eu)(s);){const e=(0,O.L9)(s),o=(0,O.sQ)(s);o||"fixed"!==e.position||(i=null),(r?!o&&!i:!o&&"static"===e.position&&i&&R.has(i.position)||(0,O.ZU)(s)&&!o&&B(t,s))?a=a.filter(t=>t!==s):i=e,s=(0,O.$4)(s)}return e.set(t,a),a}(e,this._c):[].concat(o),r],l=n[0],c=n.reduce((t,o)=>{const r=I(e,o,s);return t.top=i(r.top,t.top),t.right=a(r.right,t.right),t.bottom=a(r.bottom,t.bottom),t.left=i(r.left,t.left),t},I(e,l,s));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}},getOffsetParent:U,getElementRects:async function(t){const e=this.getOffsetParent||U,o=this.getDimensions,a=await o(t.floating);return{reference:F(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:a.width,height:a.height}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){const{width:e,height:o}=D(t);return{width:e,height:o}},getScale:q,isElement:O.vq,isRTL:function(t){return"rtl"===(0,O.L9)(t).direction}};function W(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function K(t,e,o,r){void 0===r&&(r={});const{ancestorScroll:n=!0,ancestorResize:l=!0,elementResize:c="function"==typeof ResizeObserver,layoutShift:h="function"==typeof IntersectionObserver,animationFrame:d=!1}=r,u=T(t),p=n||l?[...u?(0,O.v9)(u):[],...(0,O.v9)(e)]:[];p.forEach(t=>{n&&t.addEventListener("scroll",o,{passive:!0}),l&&t.addEventListener("resize",o)});const m=u&&h?function(t,e){let o,r=null;const n=(0,O.ep)(t);function l(){var t;clearTimeout(o),null==(t=r)||t.disconnect(),r=null}return function c(h,d){void 0===h&&(h=!1),void 0===d&&(d=1),l();const u=t.getBoundingClientRect(),{left:p,top:m,width:b,height:v}=u;if(h||e(),!b||!v)return;const f={rootMargin:-s(m)+"px "+-s(n.clientWidth-(p+b))+"px "+-s(n.clientHeight-(m+v))+"px "+-s(p)+"px",threshold:i(0,a(1,d))||1};let g=!0;function w(e){const a=e[0].intersectionRatio;if(a!==d){if(!g)return c();a?c(!1,a):o=setTimeout(()=>{c(!1,1e-7)},1e3)}1!==a||W(u,t.getBoundingClientRect())||c(),g=!1}try{r=new IntersectionObserver(w,{...f,root:n.ownerDocument})}catch(t){r=new IntersectionObserver(w,f)}r.observe(t)}(!0),l}(u,o):null;let b,v=-1,f=null;c&&(f=new ResizeObserver(t=>{let[a]=t;a&&a.target===u&&f&&(f.unobserve(e),cancelAnimationFrame(v),v=requestAnimationFrame(()=>{var t;null==(t=f)||t.observe(e)})),o()}),u&&!d&&f.observe(u),f.observe(e));let g=d?Z(t):null;return d&&function e(){const a=Z(t);g&&!W(g,a)&&o(),g=a,b=requestAnimationFrame(e)}(),o(),()=>{var t;p.forEach(t=>{n&&t.removeEventListener("scroll",o),l&&t.removeEventListener("resize",o)}),null==m||m(),null==(t=f)||t.disconnect(),f=null,d&&cancelAnimationFrame(b)}}const J=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){var o,a;const{x:i,y:r,placement:s,middlewareData:n}=e,l=await async function(t,e){const{placement:o,platform:a,elements:i}=t,r=await(null==a.isRTL?void 0:a.isRTL(i.floating)),s=u(o),n=p(o),l="y"===f(o),c=z.has(s)?-1:1,h=r&&l?-1:1,m=d(e,t);let{mainAxis:b,crossAxis:v,alignmentAxis:g}="number"==typeof m?{mainAxis:m,crossAxis:0,alignmentAxis:null}:{mainAxis:m.mainAxis||0,crossAxis:m.crossAxis||0,alignmentAxis:m.alignmentAxis};return n&&"number"==typeof g&&(v="end"===n?-1*g:g),l?{x:v*h,y:b*c}:{x:b*c,y:v*h}}(e,t);return s===(null==(o=n.offset)?void 0:o.placement)&&null!=(a=n.arrow)&&a.alignmentOffset?{}:{x:i+l.x,y:r+l.y,data:{...l,placement:s}}}}},X=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:a,placement:i}=e,{mainAxis:r=!0,crossAxis:s=!1,limiter:n={fn:t=>{let{x:e,y:o}=t;return{x:e,y:o}}},...l}=d(t,e),c={x:o,y:a},p=await A(e,l),b=f(u(i)),v=m(b);let g=c[v],w=c[b];if(r){const t="y"===v?"bottom":"right";g=h(g+p["y"===v?"top":"left"],g,g-p[t])}if(s){const t="y"===b?"bottom":"right";w=h(w+p["y"===b?"top":"left"],w,w-p[t])}const y=n.fn({...e,[v]:g,[b]:w});return{...y,data:{x:y.x-o,y:y.y-a,enabled:{[v]:r,[b]:s}}}}}},Y=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var o,a;const{placement:i,middlewareData:r,rects:s,initialPlacement:n,platform:l,elements:c}=e,{mainAxis:h=!0,crossAxis:m=!0,fallbackPlacements:v,fallbackStrategy:E="bestFit",fallbackAxisSideDirection:M="none",flipAlignment:$=!0,...z}=d(t,e);if(null!=(o=r.arrow)&&o.alignmentOffset)return{};const O=u(i),D=f(n),T=u(n)===n,q=await(null==l.isRTL?void 0:l.isRTL(c.floating)),L=v||(T||!$?[S(n)]:function(t){const e=S(t);return[w(t),e,w(e)]}(n)),V="none"!==M;!v&&V&&L.push(...function(t,e,o,a){const i=p(t);let r=function(t,e,o){switch(t){case"top":case"bottom":return o?e?x:y:e?y:x;case"left":case"right":return e?C:k;default:return[]}}(u(t),"start"===o,a);return i&&(r=r.map(t=>t+"-"+i),e&&(r=r.concat(r.map(w)))),r}(n,$,M,q));const Z=[n,...L],P=await A(e,z),_=[];let R=(null==(a=r.flip)?void 0:a.overflows)||[];if(h&&_.push(P[O]),m){const t=function(t,e,o){void 0===o&&(o=!1);const a=p(t),i=g(t),r=b(i);let s="x"===i?a===(o?"end":"start")?"right":"left":"start"===a?"bottom":"top";return e.reference[r]>e.floating[r]&&(s=S(s)),[s,S(s)]}(i,s,q);_.push(P[t[0]],P[t[1]])}if(R=[...R,{placement:i,overflows:_}],!_.every(t=>t<=0)){var I,B;const t=((null==(I=r.flip)?void 0:I.index)||0)+1,e=Z[t];if(e&&("alignment"!==m||D===f(e)||R.every(t=>f(t.placement)!==D||t.overflows[0]>0)))return{data:{index:t,overflows:R},reset:{placement:e}};let o=null==(B=R.filter(t=>t.overflows[0]<=0).sort((t,e)=>t.overflows[1]-e.overflows[1])[0])?void 0:B.placement;if(!o)switch(E){case"bestFit":{var F;const t=null==(F=R.filter(t=>{if(V){const e=f(t.placement);return e===D||"y"===e}return!0}).map(t=>[t.placement,t.overflows.filter(t=>t>0).reduce((t,e)=>t+e,0)]).sort((t,e)=>t[1]-e[1])[0])?void 0:F[0];t&&(o=t);break}case"initialPlacement":o=n}if(i!==o)return{reset:{placement:o}}}return{}}}},G=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){var o,r;const{placement:s,rects:n,platform:l,elements:c}=e,{apply:h=()=>{},...m}=d(t,e),b=await A(e,m),v=u(s),g=p(s),w="y"===f(s),{width:y,height:x}=n.floating;let C,k;"top"===v||"bottom"===v?(C=v,k=g===(await(null==l.isRTL?void 0:l.isRTL(c.floating))?"start":"end")?"left":"right"):(k=v,C="end"===g?"top":"bottom");const S=x-b.top-b.bottom,E=y-b.left-b.right,M=a(x-b[C],S),$=a(y-b[k],E),z=!e.middlewareData.shift;let O=M,D=$;if(null!=(o=e.middlewareData.shift)&&o.enabled.x&&(D=E),null!=(r=e.middlewareData.shift)&&r.enabled.y&&(O=S),z&&!g){const t=i(b.left,0),e=i(b.right,0),o=i(b.top,0),a=i(b.bottom,0);w?D=y-2*(0!==t||0!==e?t+e:i(b.left,b.right)):O=x-2*(0!==o||0!==a?o+a:i(b.top,b.bottom))}await h({...e,availableWidth:D,availableHeight:O});const T=await l.getDimensions(c.floating);return y!==T.width||x!==T.height?{reset:{rects:!0}}:{}}}},Q=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:i,placement:r,rects:s,platform:n,elements:l,middlewareData:c}=e,{element:u,padding:m=0}=d(t,e)||{};if(null==u)return{};const v=E(m),f={x:o,y:i},w=g(r),y=b(w),x=await n.getDimensions(u),C="y"===w,k=C?"top":"left",S=C?"bottom":"right",M=C?"clientHeight":"clientWidth",$=s.reference[y]+s.reference[w]-f[w]-s.floating[y],A=f[w]-s.reference[w],z=await(null==n.getOffsetParent?void 0:n.getOffsetParent(u));let O=z?z[M]:0;O&&await(null==n.isElement?void 0:n.isElement(z))||(O=l.floating[M]||s.floating[y]);const D=$/2-A/2,T=O/2-x[y]/2-1,q=a(v[k],T),L=a(v[S],T),V=q,Z=O-x[y]-L,P=O/2-x[y]/2+D,_=h(V,P,Z),R=!c.arrow&&null!=p(r)&&P!==_&&s.reference[y]/2-(P<V?q:L)-x[y]/2<0,I=R?P<V?P-V:P-Z:0;return{[w]:f[w]+I,data:{[w]:_,centerOffset:P-_-I,...R&&{alignmentOffset:I}},reset:R}}}),tt=(t,e,o)=>{const a=new Map,i={platform:j,...o},r={...i.platform,_c:a};return(async(t,e,o)=>{const{placement:a="bottom",strategy:i="absolute",middleware:r=[],platform:s}=o,n=r.filter(Boolean),l=await(null==s.isRTL?void 0:s.isRTL(e));let c=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:h,y:d}=$(c,a,l),u=a,p={},m=0;for(let o=0;o<n.length;o++){const{name:r,fn:b}=n[o],{x:v,y:f,data:g,reset:w}=await b({x:h,y:d,initialPlacement:a,placement:u,strategy:i,middlewareData:p,rects:c,platform:s,elements:{reference:t,floating:e}});h=null!=v?v:h,d=null!=f?f:d,p={...p,[r]:{...p[r],...g}},w&&m<=50&&(m++,"object"==typeof w&&(w.placement&&(u=w.placement),w.rects&&(c=!0===w.rects?await s.getElementRects({reference:t,floating:e,strategy:i}):w.rects),({x:h,y:d}=$(c,u,l))),o=-1)}return{x:h,y:d,placement:u,strategy:i,middlewareData:p}})(t,e,{...i,platform:r})}},7425(t,e,o){o.d(e,{EM:()=>a,Ls:()=>c,MZ:()=>n,P:()=>d,wk:()=>l});const a=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var i=o(842);const r={attribute:!0,type:String,converter:i.W3,reflect:!1,hasChanged:i.Ec},s=(t=r,e,o)=>{const{kind:a,metadata:i}=o;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===a&&((t=Object.create(t)).wrapped=!0),s.set(o.name,t),"accessor"===a){const{name:a}=o;return{set(o){const i=e.get.call(this);e.set.call(this,o),this.requestUpdate(a,i,t,!0,o)},init(e){return void 0!==e&&this.C(a,void 0,t,e),e}}}if("setter"===a){const{name:a}=o;return function(o){const i=this[a];e.call(this,o),this.requestUpdate(a,i,t,!0,o)}}throw Error("Unsupported decorator location: "+a)};function n(t){return(e,o)=>"object"==typeof o?s(t,e,o):((t,e,o)=>{const a=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),a?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function l(t){return n({...t,state:!0,attribute:!1})}function c(t){return(e,o)=>{const a="function"==typeof e?e:e[o];Object.assign(a,t)}}const h=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,o),o);function d(t,e){return(o,a,i)=>{const r=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof a?o:i??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return h(o,a,{get(){let o=t.call(this);return void 0===o&&(o=r(this),(null!==o||this.hasUpdated)&&e.call(this,o)),o}})}return h(o,a,{get(){return r(this)}})}}},7434(t,e,o){async function a(t,e,o){return t.animate(e,o).finished.catch(()=>{})}function i(t,e){return new Promise(o=>{const a=new AbortController,{signal:i}=a;if(t.classList.contains(e))return;t.classList.remove(e),t.classList.add(e);let r=()=>{t.classList.remove(e),o(),a.abort()};t.addEventListener("animationend",r,{once:!0,signal:i}),t.addEventListener("animationcancel",r,{once:!0,signal:i})})}function r(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t)||0:t.indexOf("s")>-1?1e3*(parseFloat(t)||0):parseFloat(t)||0}o.d(e,{E9:()=>r,Ud:()=>i,i0:()=>a})},7481(t,e,o){var a=o(9359),i=o(5915),r=o(7870),s=o(6337),n=o(7425),l=class extends i._{constructor(){super(...arguments),this.localize=new a.c(this),this.date=new Date,this.hourFormat="auto"}static get styles(){return[]}render(){const t=new Date(this.date),e="auto"===this.hourFormat?void 0:"12"===this.hourFormat;if(isNaN(t.getMilliseconds()))return;const o=this.localize.date(t,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:e});return s.qy`<time datetime=${t.toISOString()}>${o}</time>`}};(0,r.Cc)([(0,n.MZ)()],l.prototype,"date",2),(0,r.Cc)([(0,n.MZ)()],l.prototype,"weekday",2),(0,r.Cc)([(0,n.MZ)()],l.prototype,"era",2),(0,r.Cc)([(0,n.MZ)()],l.prototype,"year",2),(0,r.Cc)([(0,n.MZ)()],l.prototype,"month",2),(0,r.Cc)([(0,n.MZ)()],l.prototype,"day",2),(0,r.Cc)([(0,n.MZ)()],l.prototype,"hour",2),(0,r.Cc)([(0,n.MZ)()],l.prototype,"minute",2),(0,r.Cc)([(0,n.MZ)()],l.prototype,"second",2),(0,r.Cc)([(0,n.MZ)({attribute:"time-zone-name"})],l.prototype,"timeZoneName",2),(0,r.Cc)([(0,n.MZ)({attribute:"time-zone"})],l.prototype,"timeZone",2),(0,r.Cc)([(0,n.MZ)({attribute:"hour-format"})],l.prototype,"hourFormat",2),l=(0,r.Cc)([(0,n.EM)("wa-format-date")],l),o(2312)},7714(t,e,o){var a=o(1287),i=o(4115),r=o(8499),s=o(9746),n=o(1590),l=o(7434),c=o(2346),h=o(5915),d=o(7870),u=o(6337),p=o(7425),m=o(3720),b=class extends h._{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),this.hideDelay))}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=(0,s.N)("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}addToAriaLabelledBy(t,e){const o=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);o.includes(e)||(o.push(e),t.setAttribute("aria-labelledby",o.join(" ")))}removeFromAriaLabelledBy(t,e){const o=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(t=>t!==e);o.length>0?t.setAttribute("aria-labelledby",o.join(" ")):t.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;const t=new i.kB;if(this.dispatchEvent(t),t.defaultPrevented)return void(this.open=!1);document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),this.body.hidden=!1,this.popup.active=!0,await(0,l.Ud)(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new i.qu)}else{const t=new i.Lq;if(this.dispatchEvent(t),t.defaultPrevented)return void(this.open=!1);document.removeEventListener("keydown",this.handleDocumentKeyDown),await(0,l.Ud)(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new i.Z1)}}handleForChange(){const t=this.getRootNode();if(!t)return;const e=this.for?t.getElementById(this.for):null,o=this.anchor;if(e===o)return;const{signal:a}=this.eventController;e&&(this.addToAriaLabelledBy(e,this.id),e.addEventListener("blur",this.handleBlur,{capture:!0,signal:a}),e.addEventListener("focus",this.handleFocus,{capture:!0,signal:a}),e.addEventListener("click",this.handleClick,{signal:a}),e.addEventListener("mouseover",this.handleMouseOver,{signal:a}),e.addEventListener("mouseout",this.handleMouseOut,{signal:a})),o&&(this.removeFromAriaLabelledBy(o,this.id),o.removeEventListener("blur",this.handleBlur,{capture:!0}),o.removeEventListener("focus",this.handleFocus,{capture:!0}),o.removeEventListener("click",this.handleClick),o.removeEventListener("mouseover",this.handleMouseOver),o.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=e}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,(0,n.l)(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,(0,n.l)(this,"wa-after-hide")}render(){return u.qy`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${(0,m.H)({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `}};b.css=a.B,b.dependencies={"wa-popup":r.p},(0,d.Cc)([(0,p.P)("slot:not([name])")],b.prototype,"defaultSlot",2),(0,d.Cc)([(0,p.P)(".body")],b.prototype,"body",2),(0,d.Cc)([(0,p.P)("wa-popup")],b.prototype,"popup",2),(0,d.Cc)([(0,p.MZ)()],b.prototype,"placement",2),(0,d.Cc)([(0,p.MZ)({type:Boolean,reflect:!0})],b.prototype,"disabled",2),(0,d.Cc)([(0,p.MZ)({type:Number})],b.prototype,"distance",2),(0,d.Cc)([(0,p.MZ)({type:Boolean,reflect:!0})],b.prototype,"open",2),(0,d.Cc)([(0,p.MZ)({type:Number})],b.prototype,"skidding",2),(0,d.Cc)([(0,p.MZ)({attribute:"show-delay",type:Number})],b.prototype,"showDelay",2),(0,d.Cc)([(0,p.MZ)({attribute:"hide-delay",type:Number})],b.prototype,"hideDelay",2),(0,d.Cc)([(0,p.MZ)()],b.prototype,"trigger",2),(0,d.Cc)([(0,p.MZ)({attribute:"without-arrow",type:Boolean,reflect:!0})],b.prototype,"withoutArrow",2),(0,d.Cc)([(0,p.MZ)()],b.prototype,"for",2),(0,d.Cc)([(0,p.wk)()],b.prototype,"anchor",2),(0,d.Cc)([(0,c.w)("open",{waitUntilFirstUpdate:!0})],b.prototype,"handleOpenChange",1),(0,d.Cc)([(0,c.w)("for")],b.prototype,"handleForChange",1),(0,d.Cc)([(0,c.w)(["distance","placement","skidding"])],b.prototype,"handleOptionsChange",1),(0,d.Cc)([(0,c.w)("disabled")],b.prototype,"handleDisabledChange",1),b=(0,d.Cc)([(0,p.EM)("wa-tooltip")],b)},7804(t,e,o){o.d(e,{OA:()=>a,WL:()=>r,u$:()=>i});const a={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},i=t=>(...e)=>({_$litDirective$:t,values:e});class r{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}},7849(t,e,o){var a=o(6337),i=a.AH`
  :host {
    --spacing: var(--wa-space-m);
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: block;
  }

  details {
    display: block;
    overflow-anchor: none;
    border: var(--wa-panel-border-width) var(--wa-color-surface-border) var(--wa-panel-border-style);
    background-color: var(--wa-color-surface-default);
    border-radius: var(--wa-panel-border-radius);
    color: var(--wa-color-text-normal);

    /* Print styles */
    @media print {
      background: none;
      border: solid var(--wa-border-width-s) var(--wa-color-surface-border);

      summary {
        list-style: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) details {
    background-color: transparent;
    border-color: transparent;
    border-radius: 0;
  }

  :host([appearance='outlined']) details {
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='filled']) details {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) details {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-border-quiet);
  }

  :host([disabled]) details {
    opacity: 0.5;
    cursor: not-allowed;
  }

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing);
    padding: var(--spacing); /* Add padding here */
    border-radius: calc(var(--wa-panel-border-radius) - var(--wa-panel-border-width));
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;

    &::marker,
    &::-webkit-details-marker {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: calc(var(--wa-panel-border-width) + var(--wa-focus-ring-offset));
    }
  }

  :host([open]) summary {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  /* 'Start' icon placement */
  :host([icon-placement='start']) summary {
    flex-direction: row-reverse;
    justify-content: start;
  }

  [part~='icon'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-text-quiet);
    transition: rotate var(--wa-transition-normal) var(--wa-transition-easing);
  }

  :host([open]) [part~='icon'] {
    rotate: 90deg;
  }

  :host([open]:dir(rtl)) [part~='icon'] {
    rotate: -90deg;
  }

  :host([open]) slot[name='expand-icon'],
  :host(:not([open])) slot[name='collapse-icon'] {
    display: none;
  }

  .body.animating {
    overflow: hidden;
  }

  .content {
    display: block;
    padding-block-start: var(--spacing);
    padding-inline: var(--spacing); /* Add horizontal padding */
    padding-block-end: var(--spacing); /* Add bottom padding */
  }
`,r=o(4115),s=o(1590),n=o(7434),l=o(1325),c=o(9359),h=o(2346),d=o(5915),u=o(7870),p=o(7425),m=o(3720),b=class extends d._{constructor(){super(...arguments),this.localize=new c.c(this),this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(const e of t)"attributes"===e.type&&"open"===e.attributeName&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(t){t.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(t){t.composedPath().some(t=>{if(!(t instanceof HTMLElement))return!1;const e=t.tagName?.toLowerCase();return!!["a","button","input","textarea","select"].includes(e)||t instanceof l.q&&(!("disabled"in t)||!t.disabled)})||(t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.open?this.hide():this.show()),"ArrowUp"!==t.key&&"ArrowLeft"!==t.key||(t.preventDefault(),this.hide()),"ArrowDown"!==t.key&&"ArrowRight"!==t.key||(t.preventDefault(),this.show())}closeOthersWithSameName(){this.name&&this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(t=>{t!==this&&t.open&&(t.open=!1)})}async handleOpenChange(){if(this.open){this.details.open=!0;const t=new r.kB;if(this.dispatchEvent(t),t.defaultPrevented)return this.open=!1,void(this.details.open=!1);this.closeOthersWithSameName(),this.isAnimating=!0;const e=(0,n.E9)(getComputedStyle(this.body).getPropertyValue("--show-duration"));await(0,n.i0)(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new r.qu)}else{const t=new r.Lq;if(this.dispatchEvent(t),t.defaultPrevented)return this.details.open=!0,void(this.open=!0);this.isAnimating=!0;const e=(0,n.E9)(getComputedStyle(this.body).getPropertyValue("--hide-duration"));await(0,n.i0)(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new r.Z1)}}async show(){if(!this.open&&!this.disabled)return this.open=!0,(0,s.l)(this,"wa-after-show")}async hide(){if(this.open&&!this.disabled)return this.open=!1,(0,s.l)(this,"wa-after-hide")}render(){const t=this.hasUpdated?"rtl"===this.localize.dir():"rtl"===this.dir;return a.qy`
      <details part="base">
        <summary
          part="header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary">${this.summary}</slot>

          <span part="icon">
            <slot name="expand-icon">
              <wa-icon library="system" variant="solid" name=${t?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
            <slot name="collapse-icon">
              <wa-icon library="system" variant="solid" name=${t?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
          </span>
        </summary>

        <div
          class=${(0,m.H)({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `}};b.css=i,(0,u.Cc)([(0,p.P)("details")],b.prototype,"details",2),(0,u.Cc)([(0,p.P)("summary")],b.prototype,"header",2),(0,u.Cc)([(0,p.P)(".body")],b.prototype,"body",2),(0,u.Cc)([(0,p.P)(".expand-icon-slot")],b.prototype,"expandIconSlot",2),(0,u.Cc)([(0,p.wk)()],b.prototype,"isAnimating",2),(0,u.Cc)([(0,p.MZ)({type:Boolean,reflect:!0})],b.prototype,"open",2),(0,u.Cc)([(0,p.MZ)()],b.prototype,"summary",2),(0,u.Cc)([(0,p.MZ)({reflect:!0})],b.prototype,"name",2),(0,u.Cc)([(0,p.MZ)({type:Boolean,reflect:!0})],b.prototype,"disabled",2),(0,u.Cc)([(0,p.MZ)({reflect:!0})],b.prototype,"appearance",2),(0,u.Cc)([(0,p.MZ)({attribute:"icon-placement",reflect:!0})],b.prototype,"iconPlacement",2),(0,u.Cc)([(0,h.w)("open",{waitUntilFirstUpdate:!0})],b.prototype,"handleOpenChange",1),b=(0,u.Cc)([(0,p.EM)("wa-details")],b),o(9456),o(1092),o(9610),o(2312),o(6127),o(1353),o(9373)},7870(t,e,o){o.d(e,{Cc:()=>s,OV:()=>h,S7:()=>l,VK:()=>c});var a=Object.defineProperty,i=Object.getOwnPropertyDescriptor,r=t=>{throw TypeError(t)},s=(t,e,o,r)=>{for(var s,n=r>1?void 0:r?i(e,o):e,l=t.length-1;l>=0;l--)(s=t[l])&&(n=(r?s(e,o,n):s(n))||n);return r&&n&&a(e,o,n),n},n=(t,e,o)=>e.has(t)||r("Cannot "+o),l=(t,e,o)=>(n(t,e,"read from private field"),o?o.call(t):e.get(t)),c=(t,e,o)=>e.has(t)?r("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),h=(t,e,o,a)=>(n(t,e,"write to private field"),a?a.call(t,o):e.set(t,o),o)},8030(t,e,o){o.d(e,{Y:()=>a});var a=(t={})=>{let{validationElement:e,validationProperty:o}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),o||(o="value");const a={observedAttributes:["required"],message:e.validationMessage,checkValidity(t){const e={message:"",isValid:!0,invalidKeys:[]};return t.required??t.hasAttribute("required")?(!t[o]&&(e.message="function"==typeof a.message?a.message(t):a.message||"",e.isValid=!1,e.invalidKeys.push("valueMissing")),e):e}};return a}},8181(t,e,o){o.d(e,{W:()=>a});var a=o(6337).AH`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`},8272(t,e,o){function a(t){return t.split(" ").map(t=>t.trim()).filter(t=>""!==t)}o.d(e,{v:()=>a})},8317(t,e,o){var a=o(6337),i=a.AH`
  :host {
    --track-size: 0.5em;
    --thumb-width: 1.4em;
    --thumb-height: 1.4em;
    --marker-width: 0.1875em;
    --marker-height: 0.1875em;
  }

  :host([orientation='vertical']) {
    width: auto;
  }

  #label:has(~ .vertical) {
    display: block;
    order: 2;
    max-width: none;
    text-align: center;
  }

  #description:has(~ .vertical) {
    order: 3;
    text-align: center;
  }

  /* Add extra space between slider and label, when present */
  #label:has(*:not(:empty)) ~ #slider {
    &.horizontal {
      margin-block-start: 0.5em;
    }
    &.vertical {
      margin-block-end: 0.5em;
    }
  }

  #slider {
    touch-action: none;

    &:focus {
      outline: none;
    }

    &:focus-visible:not(.disabled) #thumb,
    &:focus-visible:not(.disabled) #thumb-min,
    &:focus-visible:not(.disabled) #thumb-max {
      outline: var(--wa-focus-ring);
      /* intentionally no offset due to border */
    }
  }

  #track {
    position: relative;
    border-radius: 9999px;
    background: var(--wa-color-neutral-fill-normal);
    isolation: isolate;
  }

  /* Orientation */
  .horizontal #track {
    height: var(--track-size);
  }

  .vertical #track {
    order: 1;
    width: var(--track-size);
    height: 200px;
  }

  /* Disabled */
  .disabled #track {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Indicator */
  #indicator {
    position: absolute;
    border-radius: inherit;
    background-color: var(--wa-form-control-activated-color);

    &:dir(ltr) {
      right: calc(100% - max(var(--start), var(--end)));
      left: min(var(--start), var(--end));
    }

    &:dir(rtl) {
      right: min(var(--start), var(--end));
      left: calc(100% - max(var(--start), var(--end)));
    }
  }

  .horizontal #indicator {
    top: 0;
    height: 100%;
  }

  .vertical #indicator {
    top: calc(100% - var(--end));
    bottom: var(--start);
    left: 0;
    width: 100%;
  }

  /* Thumbs */
  #thumb,
  #thumb-min,
  #thumb-max {
    z-index: 3;
    position: absolute;
    width: var(--thumb-width);
    height: var(--thumb-height);
    border: solid 0.125em var(--wa-color-surface-default);
    border-radius: 50%;
    background-color: var(--wa-form-control-activated-color);
    cursor: pointer;
  }

  .disabled #thumb,
  .disabled #thumb-min,
  .disabled #thumb-max {
    cursor: inherit;
  }

  .horizontal #thumb,
  .horizontal #thumb-min,
  .horizontal #thumb-max {
    top: calc(50% - var(--thumb-height) / 2);

    &:dir(ltr) {
      right: auto;
      left: calc(var(--position) - var(--thumb-width) / 2);
    }

    &:dir(rtl) {
      right: calc(var(--position) - var(--thumb-width) / 2);
      left: auto;
    }
  }

  .vertical #thumb,
  .vertical #thumb-min,
  .vertical #thumb-max {
    bottom: calc(var(--position) - var(--thumb-height) / 2);
    left: calc(50% - var(--thumb-width) / 2);
  }

  /* Range-specific thumb styles */
  :host([range]) {
    #thumb-min:focus-visible,
    #thumb-max:focus-visible {
      z-index: 4; /* Ensure focused thumb appears on top */
      outline: var(--wa-focus-ring);
      /* intentionally no offset due to border */
    }
  }

  /* Markers */
  #markers {
    pointer-events: none;
  }

  .marker {
    z-index: 2;
    position: absolute;
    width: var(--marker-width);
    height: var(--marker-height);
    border-radius: 50%;
    background-color: var(--wa-color-surface-default);
  }

  .marker:first-of-type,
  .marker:last-of-type {
    display: none;
  }

  .horizontal .marker {
    top: calc(50% - var(--marker-height) / 2);
    left: calc(var(--position) - var(--marker-width) / 2);
  }

  .vertical .marker {
    top: calc(var(--position) - var(--marker-height) / 2);
    left: calc(50% - var(--marker-width) / 2);
  }

  /* Marker labels */
  #references {
    position: relative;

    slot {
      display: flex;
      justify-content: space-between;
      height: 100%;
    }

    ::slotted(*) {
      color: var(--wa-color-text-quiet);
      font-size: 0.875em;
      line-height: 1;
    }
  }

  .horizontal {
    #references {
      margin-block-start: 0.5em;
    }
  }

  .vertical {
    display: flex;
    margin-inline: auto;

    #track {
      order: 1;
    }

    #references {
      order: 2;
      width: min-content;
      margin-inline-start: 0.75em;

      slot {
        flex-direction: column;
      }
    }
  }

  .vertical #references slot {
    flex-direction: column;
  }
`,r=o(5061),s="undefined"!=typeof window&&"ontouchstart"in window,n=class{constructor(t,e){this.isActive=!1,this.isDragging=!1,this.handleDragStart=t=>{const e="touches"in t?t.touches[0].clientX:t.clientX,o="touches"in t?t.touches[0].clientY:t.clientY;this.isDragging||!s&&t.buttons>1||(this.isDragging=!0,document.addEventListener("pointerup",this.handleDragStop),document.addEventListener("pointermove",this.handleDragMove),document.addEventListener("touchend",this.handleDragStop),document.addEventListener("touchmove",this.handleDragMove),this.options.start(e,o))},this.handleDragStop=t=>{const e="touches"in t?t.touches[0].clientX:t.clientX,o="touches"in t?t.touches[0].clientY:t.clientY;this.isDragging=!1,document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),this.options.stop(e,o)},this.handleDragMove=t=>{const e="touches"in t?t.touches[0].clientX:t.clientX,o="touches"in t?t.touches[0].clientY:t.clientY;window.getSelection()?.removeAllRanges(),this.options.move(e,o)},this.element=t,this.options={start:()=>{},stop:()=>{},move:()=>{},...e},this.start()}start(){this.isActive||(this.element.addEventListener("pointerdown",this.handleDragStart),s&&this.element.addEventListener("touchstart",this.handleDragStart),this.isActive=!0)}stop(){document.removeEventListener("pointerup",this.handleDragStop),document.removeEventListener("pointermove",this.handleDragMove),document.removeEventListener("touchend",this.handleDragStop),document.removeEventListener("touchmove",this.handleDragMove),this.element.removeEventListener("pointerdown",this.handleDragStart),s&&this.element.removeEventListener("touchstart",this.handleDragStart),this.isActive=!1,this.isDragging=!1}toggle(t){(void 0!==t?t:!this.isActive)?this.start():this.stop()}},l=o(9746),c=o(3158),h=o(1325),d=o(4411),u=o(4671),p=o(9359),m=o(7870),b=o(7425),v=o(3720),f=()=>{const t=Object.assign(document.createElement("input"),{type:"range",required:!0});return{observedAttributes:["required","min","max","step"],checkValidity(e){const o={message:"",isValid:!0,invalidKeys:[]},a=(t,e,o,a)=>{const i=document.createElement("input");return i.type="range",i.min=String(e),i.max=String(o),i.step=String(a),i.value=String(t),i.checkValidity(),i.validationMessage};if(e.required&&!e.hasInteracted)return o.isValid=!1,o.invalidKeys.push("valueMissing"),o.message=t.validationMessage||"Please fill out this field.",o;if(e.isRange){const t=e.minValue,i=e.maxValue;if(t<e.min)return o.isValid=!1,o.invalidKeys.push("rangeUnderflow"),o.message=a(t,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,o;if(i>e.max)return o.isValid=!1,o.invalidKeys.push("rangeOverflow"),o.message=a(i,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,o;if(e.step&&1!==e.step){const r=(t-e.min)%e.step!==0,s=(i-e.min)%e.step!==0;if(r||s){o.isValid=!1,o.invalidKeys.push("stepMismatch");const s=r?t:i;return o.message=a(s,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,o}}}else{const t=e.value;if(t<e.min)return o.isValid=!1,o.invalidKeys.push("rangeUnderflow"),o.message=a(t,e.min,e.max,e.step)||`Value must be greater than or equal to ${e.min}.`,o;if(t>e.max)return o.isValid=!1,o.invalidKeys.push("rangeOverflow"),o.message=a(t,e.min,e.max,e.step)||`Value must be less than or equal to ${e.max}.`,o;if(e.step&&1!==e.step&&(t-e.min)%e.step!==0)return o.isValid=!1,o.invalidKeys.push("stepMismatch"),o.message=a(t,e.min,e.max,e.step)||`Value must be a multiple of ${e.step}.`,o}return o}}},g=class extends h.q{constructor(){super(...arguments),this.draggableThumbMin=null,this.draggableThumbMax=null,this.hasSlotController=new d.X(this,"hint","label"),this.localize=new p.c(this),this.activeThumb=null,this.lastTrackPosition=null,this.label="",this.hint="",this.minValue=0,this.maxValue=50,this.defaultValue=null==this.getAttribute("value")?this.minValue:Number(this.getAttribute("value")),this._value=this.defaultValue,this.range=!1,this.disabled=!1,this.readonly=!1,this.orientation="horizontal",this.size="medium",this.min=0,this.max=100,this.step=1,this.required=!1,this.tooltipDistance=8,this.tooltipPlacement="top",this.withMarkers=!1,this.withTooltip=!1}static get validators(){return[...super.validators,f()]}get focusableAnchor(){return this.isRange&&this.thumbMin||this.slider}get validationTarget(){return this.focusableAnchor}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){t=Number(t)??this.minValue,this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get isRange(){return this.range}firstUpdated(){this.isRange?(this.draggableThumbMin=new n(this.thumbMin,{start:()=>{this.activeThumb="min",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.minValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"min")},stop:()=>{this.minValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableThumbMax=new n(this.thumbMax,{start:()=>{this.activeThumb="max",this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.maxValue,this.customStates.set("dragging",!0),this.showRangeTooltips()},move:(t,e)=>{this.setThumbValueFromCoordinates(t,e,"max")},stop:()=>{this.maxValue!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}}),this.draggableTrack=new n(this.track,{start:(t,e)=>{if(this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.activeThumb)this.valueWhenDraggingStarted="min"===this.activeThumb?this.minValue:this.maxValue;else{const o=this.getValueFromCoordinates(t,e),a=Math.abs(o-this.minValue),i=Math.abs(o-this.maxValue);if(a===i)if(o>this.maxValue)this.activeThumb="max";else if(o<this.minValue)this.activeThumb="min";else{const o="rtl"===this.localize.dir(),a="vertical"===this.orientation,i=a?e:t,r=this.lastTrackPosition||i;this.lastTrackPosition=i;const s=i>r!==o&&!a||i<r&&a;this.activeThumb=s?"max":"min"}else this.activeThumb=a<=i?"min":"max";this.valueWhenDraggingStarted="min"===this.activeThumb?this.minValue:this.maxValue}this.customStates.set("dragging",!0),this.setThumbValueFromCoordinates(t,e,this.activeThumb),this.showRangeTooltips()},move:(t,e)=>{this.activeThumb&&this.setThumbValueFromCoordinates(t,e,this.activeThumb)},stop:()=>{this.activeThumb&&("min"===this.activeThumb?this.minValue:this.maxValue)!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideRangeTooltips(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0,this.activeThumb=null}})):this.draggableTrack=new n(this.slider,{start:(t,e)=>{this.trackBoundingClientRect=this.track.getBoundingClientRect(),this.valueWhenDraggingStarted=this.value,this.customStates.set("dragging",!0),this.setValueFromCoordinates(t,e),this.showTooltip()},move:(t,e)=>{this.setValueFromCoordinates(t,e)},stop:()=>{this.value!==this.valueWhenDraggingStarted&&(this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0),this.hideTooltip(),this.customStates.set("dragging",!1),this.valueWhenDraggingStarted=void 0}})}updated(t){if(t.has("range")&&this.requestUpdate(),this.isRange?(t.has("minValue")||t.has("maxValue"))&&(this.minValue=(0,l.q)(this.minValue,this.min,this.maxValue),this.maxValue=(0,l.q)(this.maxValue,this.minValue,this.max),this.updateFormValue()):t.has("value")&&(this.value=(0,l.q)(this.value,this.min,this.max),this.setValue(String(this.value))),(t.has("min")||t.has("max"))&&(this.isRange?(this.minValue=(0,l.q)(this.minValue,this.min,this.max),this.maxValue=(0,l.q)(this.maxValue,this.min,this.max)):this.value=(0,l.q)(this.value,this.min,this.max)),t.has("disabled")&&this.customStates.set("disabled",this.disabled),t.has("disabled")||t.has("readonly")){const t=!(this.disabled||this.readonly);this.isRange&&(this.draggableThumbMin&&this.draggableThumbMin.toggle(t),this.draggableThumbMax&&this.draggableThumbMax.toggle(t)),this.draggableTrack&&this.draggableTrack.toggle(t)}super.updated(t)}formDisabledCallback(t){this.disabled=t}formResetCallback(){this.isRange?(this.minValue=parseFloat(this.getAttribute("min-value")??String(this.min)),this.maxValue=parseFloat(this.getAttribute("max-value")??String(this.max))):this.value=parseFloat(this.getAttribute("value")??String(this.min)),this.hasInteracted=!1,super.formResetCallback()}clampAndRoundToStep(t){const e=(String(this.step).split(".")[1]||"").replace(/0+$/g,"").length,o=Number(this.step),a=Number(this.min),i=Number(this.max);return t=Math.round(t/o)*o,t=(0,l.q)(t,a,i),parseFloat(t.toFixed(e))}getPercentageFromValue(t){return(t-this.min)/(this.max-this.min)*100}getValueFromCoordinates(t,e){const o="rtl"===this.localize.dir(),a="vertical"===this.orientation,{top:i,right:r,bottom:s,left:n,height:l,width:c}=this.trackBoundingClientRect,h=a?e:t,d=a?{start:i,end:s,size:l}:{start:n,end:r,size:c},u=(a||o?d.end-h:h-d.start)/d.size;return this.clampAndRoundToStep(this.min+(this.max-this.min)*u)}handleBlur(){this.isRange?requestAnimationFrame(()=>{const t=this.shadowRoot?.activeElement;t===this.thumbMin||t===this.thumbMax||this.hideRangeTooltips()}):this.hideTooltip(),this.customStates.set("focused",!1),this.dispatchEvent(new FocusEvent("blur",{bubbles:!0,composed:!0}))}handleFocus(t){const e=t.target;this.isRange?(e===this.thumbMin?this.activeThumb="min":e===this.thumbMax&&(this.activeThumb="max"),this.showRangeTooltips()):this.showTooltip(),this.customStates.set("focused",!0),this.dispatchEvent(new FocusEvent("focus",{bubbles:!0,composed:!0}))}handleKeyDown(t){const e="rtl"===this.localize.dir(),o=t.target;if(this.disabled||this.readonly)return;if(this.isRange&&(o===this.thumbMin?this.activeThumb="min":o===this.thumbMax&&(this.activeThumb="max"),!this.activeThumb))return;const a=this.isRange?"min"===this.activeThumb?this.minValue:this.maxValue:this.value;let i=a;switch(t.key){case"ArrowUp":case e?"ArrowLeft":"ArrowRight":t.preventDefault(),i=this.clampAndRoundToStep(a+this.step);break;case"ArrowDown":case e?"ArrowRight":"ArrowLeft":t.preventDefault(),i=this.clampAndRoundToStep(a-this.step);break;case"Home":t.preventDefault(),i=this.isRange&&"min"===this.activeThumb?this.min:this.isRange?this.minValue:this.min;break;case"End":t.preventDefault(),i=this.isRange&&"max"===this.activeThumb?this.max:this.isRange?this.maxValue:this.max;break;case"PageUp":t.preventDefault();const o=Math.max(a+(this.max-this.min)/10,a+this.step);i=this.clampAndRoundToStep(o);break;case"PageDown":t.preventDefault();const s=Math.min(a-(this.max-this.min)/10,a-this.step);i=this.clampAndRoundToStep(s);break;case"Enter":return void(0,r.U)(t,this)}i!==a&&(this.isRange?("min"===this.activeThumb?i>this.maxValue?(this.maxValue=i,this.minValue=i):this.minValue=Math.max(this.min,i):i<this.minValue?(this.minValue=i,this.maxValue=i):this.maxValue=Math.min(this.max,i),this.updateFormValue()):this.value=(0,l.q)(i,this.min,this.max),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.hasInteracted=!0)}handleLabelPointerDown(t){t.preventDefault(),this.disabled||(this.isRange?this.thumbMin?.focus():this.slider.focus())}setValueFromCoordinates(t,e){const o=this.value;this.value=this.getValueFromCoordinates(t,e),this.value!==o&&this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})}setThumbValueFromCoordinates(t,e,o){const a=this.getValueFromCoordinates(t,e),i="min"===o?this.minValue:this.maxValue;"min"===o?a>this.maxValue?(this.maxValue=a,this.minValue=a):this.minValue=Math.max(this.min,a):a<this.minValue?(this.minValue=a,this.maxValue=a):this.maxValue=Math.min(this.max,a),i!==("min"===o?this.minValue:this.maxValue)&&(this.updateFormValue(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}showTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!0)}hideTooltip(){this.withTooltip&&this.tooltip&&(this.tooltip.open=!1)}showRangeTooltips(){if(!this.withTooltip)return;const t=this.shadowRoot?.getElementById("tooltip-thumb-min"),e=this.shadowRoot?.getElementById("tooltip-thumb-max");"min"===this.activeThumb?(t&&(t.open=!0),e&&(e.open=!1)):"max"===this.activeThumb&&(e&&(e.open=!0),t&&(t.open=!1))}hideRangeTooltips(){if(!this.withTooltip)return;const t=this.shadowRoot?.getElementById("tooltip-thumb-min"),e=this.shadowRoot?.getElementById("tooltip-thumb-max");t&&(t.open=!1),e&&(e.open=!1)}updateFormValue(){if(this.isRange){const t=new FormData;t.append(this.name||"",String(this.minValue)),t.append(this.name||"",String(this.maxValue)),this.setValue(t)}}focus(){this.isRange?this.thumbMin?.focus():this.slider.focus()}blur(){this.isRange?document.activeElement===this.thumbMin?this.thumbMin.blur():document.activeElement===this.thumbMax&&this.thumbMax.blur():this.slider.blur()}stepDown(){if(this.isRange){const t=this.clampAndRoundToStep(this.minValue-this.step);this.minValue=(0,l.q)(t,this.min,this.maxValue),this.updateFormValue()}else{const t=this.clampAndRoundToStep(this.value-this.step);this.value=t}}stepUp(){if(this.isRange){const t=this.clampAndRoundToStep(this.maxValue+this.step);this.maxValue=(0,l.q)(t,this.minValue,this.max),this.updateFormValue()}else{const t=this.clampAndRoundToStep(this.value+this.step);this.value=t}}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("hint"),o=!!this.label||!!t,i=!!this.hint||!!e,r=this.hasSlotController.test("reference"),s=(0,v.H)({small:"small"===this.size,medium:"medium"===this.size,large:"large"===this.size,horizontal:"horizontal"===this.orientation,vertical:"vertical"===this.orientation,disabled:this.disabled}),n=[];if(this.withMarkers)for(let t=this.min;t<=this.max;t+=this.step)n.push(this.getPercentageFromValue(t));const c=a.qy`
      <label
        id="label"
        part="label"
        for=${this.isRange?"thumb-min":"text-box"}
        class=${(0,v.H)({vh:!o})}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `,h=a.qy`
      <div
        id="hint"
        part="hint"
        class=${(0,v.H)({"has-slotted":i})}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `,d=this.withMarkers?a.qy`
          <div id="markers" part="markers">
            ${n.map(t=>a.qy`<span part="marker" class="marker" style="--position: ${t}%"></span>`)}
          </div>
        `:"",u=r?a.qy`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        `:"",p=(t,e)=>this.withTooltip?a.qy`
            <wa-tooltip
              id=${"tooltip"+("thumb"!==t?"-"+t:"")}
              part="tooltip"
              exportparts="
                base:tooltip__base,
                body:tooltip__body,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${t}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${"function"==typeof this.valueFormatter?this.valueFormatter(e):this.localize.number(e)}
              </span>
            </wa-tooltip>
          `:"";if(this.isRange){const t=(0,l.q)(this.getPercentageFromValue(this.minValue),0,100),e=(0,l.q)(this.getPercentageFromValue(this.maxValue),0,100);return a.qy`
        ${c}

        <div id="slider" part="slider" class=${s}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style="--start: ${Math.min(t,e)}%; --end: ${Math.max(t,e)}%"
            ></div>

            ${d}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style="--position: ${t}%"
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.minValue}
              aria-valuetext=${"function"==typeof this.valueFormatter?this.valueFormatter(this.minValue):this.localize.number(this.minValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (minimum value)`:"Minimum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>

            <span
              id="thumb-max"
              part="thumb thumb-max"
              style="--position: ${e}%"
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.maxValue}
              aria-valuetext=${"function"==typeof this.valueFormatter?this.valueFormatter(this.maxValue):this.localize.number(this.maxValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label?`${this.label} (maximum value)`:"Maximum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled?"true":"false"}
              aria-readonly=${this.readonly?"true":"false"}
              tabindex=${this.disabled?-1:0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>
          </div>

          ${u} ${h}
        </div>

        ${p("thumb-min",this.minValue)} ${p("thumb-max",this.maxValue)}
      `}{const t=(0,l.q)(this.getPercentageFromValue(this.value),0,100),e=(0,l.q)(this.getPercentageFromValue("number"==typeof this.indicatorOffset?this.indicatorOffset:this.min),0,100);return a.qy`
        ${c}

        <div
          id="slider"
          part="slider"
          class=${s}
          role="slider"
          aria-disabled=${this.disabled?"true":"false"}
          aria-readonly=${this.disabled?"true":"false"}
          aria-orientation=${this.orientation}
          aria-valuemin=${this.min}
          aria-valuenow=${this.value}
          aria-valuetext=${"function"==typeof this.valueFormatter?this.valueFormatter(this.value):this.localize.number(this.value)}
          aria-valuemax=${this.max}
          aria-labelledby="label"
          aria-describedby="hint"
          tabindex=${this.disabled?-1:0}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        >
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style="--start: ${e}%; --end: ${t}%"
            ></div>

            ${d}
            <span id="thumb" part="thumb" style="--position: ${t}%"></span>
          </div>

          ${u} ${h}
        </div>

        ${p("thumb",this.value)}
      `}}};g.formAssociated=!0,g.observeSlots=!0,g.css=[u.J,c.I,i],(0,m.Cc)([(0,b.P)("#slider")],g.prototype,"slider",2),(0,m.Cc)([(0,b.P)("#thumb")],g.prototype,"thumb",2),(0,m.Cc)([(0,b.P)("#thumb-min")],g.prototype,"thumbMin",2),(0,m.Cc)([(0,b.P)("#thumb-max")],g.prototype,"thumbMax",2),(0,m.Cc)([(0,b.P)("#track")],g.prototype,"track",2),(0,m.Cc)([(0,b.P)("#tooltip")],g.prototype,"tooltip",2),(0,m.Cc)([(0,b.MZ)()],g.prototype,"label",2),(0,m.Cc)([(0,b.MZ)({attribute:"hint"})],g.prototype,"hint",2),(0,m.Cc)([(0,b.MZ)({reflect:!0})],g.prototype,"name",2),(0,m.Cc)([(0,b.MZ)({type:Number,attribute:"min-value"})],g.prototype,"minValue",2),(0,m.Cc)([(0,b.MZ)({type:Number,attribute:"max-value"})],g.prototype,"maxValue",2),(0,m.Cc)([(0,b.MZ)({attribute:"value",reflect:!0,type:Number})],g.prototype,"defaultValue",2),(0,m.Cc)([(0,b.wk)()],g.prototype,"value",1),(0,m.Cc)([(0,b.MZ)({type:Boolean,reflect:!0})],g.prototype,"range",2),(0,m.Cc)([(0,b.MZ)({type:Boolean})],g.prototype,"disabled",2),(0,m.Cc)([(0,b.MZ)({type:Boolean,reflect:!0})],g.prototype,"readonly",2),(0,m.Cc)([(0,b.MZ)({reflect:!0})],g.prototype,"orientation",2),(0,m.Cc)([(0,b.MZ)({reflect:!0})],g.prototype,"size",2),(0,m.Cc)([(0,b.MZ)({attribute:"indicator-offset",type:Number})],g.prototype,"indicatorOffset",2),(0,m.Cc)([(0,b.MZ)({type:Number})],g.prototype,"min",2),(0,m.Cc)([(0,b.MZ)({type:Number})],g.prototype,"max",2),(0,m.Cc)([(0,b.MZ)({type:Number})],g.prototype,"step",2),(0,m.Cc)([(0,b.MZ)({type:Boolean,reflect:!0})],g.prototype,"required",2),(0,m.Cc)([(0,b.MZ)({type:Boolean})],g.prototype,"autofocus",2),(0,m.Cc)([(0,b.MZ)({attribute:"tooltip-distance",type:Number})],g.prototype,"tooltipDistance",2),(0,m.Cc)([(0,b.MZ)({attribute:"tooltip-placement",reflect:!0})],g.prototype,"tooltipPlacement",2),(0,m.Cc)([(0,b.MZ)({attribute:"with-markers",type:Boolean})],g.prototype,"withMarkers",2),(0,m.Cc)([(0,b.MZ)({attribute:"with-tooltip",type:Boolean})],g.prototype,"withTooltip",2),(0,m.Cc)([(0,b.MZ)({attribute:!1})],g.prototype,"valueFormatter",2),g=(0,m.Cc)([(0,b.EM)("wa-slider")],g),o(7714),o(1287),o(4115),o(8499),o(1404),o(6075),o(2312),o(5915)},8354(t,e,o){var a=o(4313),i=o(2346),r=o(5915),s=o(7870),n=o(6337),l=o(7425),c=o(3720),h=0,d=class extends r._{constructor(){super(...arguments),this.attrId=++h,this.componentId=`wa-tab-${this.attrId}`,this.panel="",this.active=!1,this.disabled=!1,this.tabIndex=0}connectedCallback(){this.slot||(this.slot="nav"),super.connectedCallback(),this.setAttribute("role","tab")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id?.length>0?this.id:this.componentId,n.qy`
      <div
        part="base"
        class=${(0,c.H)({tab:!0,"tab-active":this.active})}
      >
        <slot></slot>
      </div>
    `}};d.css=a.Z,(0,s.Cc)([(0,l.P)(".tab")],d.prototype,"tab",2),(0,s.Cc)([(0,l.MZ)({reflect:!0})],d.prototype,"panel",2),(0,s.Cc)([(0,l.MZ)({type:Boolean,reflect:!0})],d.prototype,"active",2),(0,s.Cc)([(0,l.MZ)({type:Boolean,reflect:!0})],d.prototype,"disabled",2),(0,s.Cc)([(0,l.MZ)({type:Number,reflect:!0})],d.prototype,"tabIndex",2),(0,s.Cc)([(0,i.w)("active")],d.prototype,"handleActiveChange",1),(0,s.Cc)([(0,i.w)("disabled")],d.prototype,"handleDisabledChange",1),d=(0,s.Cc)([(0,l.EM)("wa-tab")],d)},8499(t,e,o){o.d(e,{p:()=>f});var a=o(1404),i=o(6075),r=o(9359),s=o(5915),n=o(7870),l=o(7315),c=o(6635);function h(t){return function(t){for(let e=t;e;e=d(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=d(t);e;e=d(e)){if(!(e instanceof Element))continue;const t=getComputedStyle(e);if("contents"!==t.display){if("static"!==t.position||(0,c.sQ)(t))return e;if("BODY"===e.tagName)return e}}return null}(t)}function d(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}var u=o(6337),p=o(7425),m=o(3720);function b(t){return null!==t&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t instanceof Element)}var v=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),f=class extends s._{constructor(){super(...arguments),this.localize=new r.c(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect();let o=0,a=0,i=0,r=0,s=0,n=0,l=0,c=0;this.placement.includes("top")||this.placement.includes("bottom")?t.top<e.top?(o=t.left,a=t.bottom,i=t.right,r=t.bottom,s=e.left,n=e.top,l=e.right,c=e.top):(o=e.left,a=e.bottom,i=e.right,r=e.bottom,s=t.left,n=t.top,l=t.right,c=t.top):t.left<e.left?(o=t.right,a=t.top,i=e.left,r=e.top,s=t.right,n=t.bottom,l=e.left,c=e.bottom):(o=e.right,a=e.top,i=t.left,r=t.top,s=e.right,n=e.bottom,l=t.left,c=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${a}px`),this.style.setProperty("--hover-bridge-top-right-x",`${i}px`),this.style.setProperty("--hover-bridge-top-right-y",`${r}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${c}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||b(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&this.active&&(this.popup.showPopover?.(),this.cleanup=(0,l.ll)(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[(0,l.cY)({mainAxis:this.distance,crossAxis:this.skidding})];let e;this.sync?t.push((0,l.Ej)({apply:({rects:t})=>{const e="width"===this.sync||"both"===this.sync,o="height"===this.sync||"both"===this.sync;this.popup.style.width=e?`${t.reference.width}px`:"",this.popup.style.height=o?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),v&&!b(this.anchor)&&"scroll"===this.boundary&&(e=(0,c.v9)(this.anchorEl).filter(t=>t instanceof Element)),this.flip&&t.push((0,l.UU)({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push((0,l.BN)({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push((0,l.Ej)({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:e})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${e}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push((0,l.UE)({element:this.arrowEl,padding:this.arrowPadding}));const o=v?t=>l.iD.getOffsetParent(t,h):l.iD.getOffsetParent;(0,l.rD)(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:v?"absolute":"fixed",platform:{...l.iD,getOffsetParent:o}}).then(({x:t,y:e,middlewareData:o,placement:a})=>{const i="rtl"===this.localize.dir(),r={top:"bottom",right:"left",bottom:"top",left:"right"}[a.split("-")[0]];if(this.setAttribute("data-current-placement",a),Object.assign(this.popup.style,{left:`${t}px`,top:`${e}px`}),this.arrow){const t=o.arrow.x,e=o.arrow.y;let a="",s="",n="",l="";if("start"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";a="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",s=i?o:"",l=i?"":o}else if("end"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";s=i?"":o,l=i?o:"",n="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(l="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",a="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":""):(l="number"==typeof t?`${t}px`:"",a="number"==typeof e?`${e}px`:"");Object.assign(this.arrowEl.style,{top:a,right:s,bottom:n,left:l,[r]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new a.B)}render(){return u.qy`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${(0,m.H)({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${(0,m.H)({popup:!0,"popup-active":this.active,"popup-fixed":!v,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?u.qy`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};f.css=i.w,(0,n.Cc)([(0,p.P)(".popup")],f.prototype,"popup",2),(0,n.Cc)([(0,p.P)(".arrow")],f.prototype,"arrowEl",2),(0,n.Cc)([(0,p.MZ)()],f.prototype,"anchor",2),(0,n.Cc)([(0,p.MZ)({type:Boolean,reflect:!0})],f.prototype,"active",2),(0,n.Cc)([(0,p.MZ)({reflect:!0})],f.prototype,"placement",2),(0,n.Cc)([(0,p.MZ)()],f.prototype,"boundary",2),(0,n.Cc)([(0,p.MZ)({type:Number})],f.prototype,"distance",2),(0,n.Cc)([(0,p.MZ)({type:Number})],f.prototype,"skidding",2),(0,n.Cc)([(0,p.MZ)({type:Boolean})],f.prototype,"arrow",2),(0,n.Cc)([(0,p.MZ)({attribute:"arrow-placement"})],f.prototype,"arrowPlacement",2),(0,n.Cc)([(0,p.MZ)({attribute:"arrow-padding",type:Number})],f.prototype,"arrowPadding",2),(0,n.Cc)([(0,p.MZ)({type:Boolean})],f.prototype,"flip",2),(0,n.Cc)([(0,p.MZ)({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(t=>t.trim()).filter(t=>""!==t),toAttribute:t=>t.join(" ")}})],f.prototype,"flipFallbackPlacements",2),(0,n.Cc)([(0,p.MZ)({attribute:"flip-fallback-strategy"})],f.prototype,"flipFallbackStrategy",2),(0,n.Cc)([(0,p.MZ)({type:Object})],f.prototype,"flipBoundary",2),(0,n.Cc)([(0,p.MZ)({attribute:"flip-padding",type:Number})],f.prototype,"flipPadding",2),(0,n.Cc)([(0,p.MZ)({type:Boolean})],f.prototype,"shift",2),(0,n.Cc)([(0,p.MZ)({type:Object})],f.prototype,"shiftBoundary",2),(0,n.Cc)([(0,p.MZ)({attribute:"shift-padding",type:Number})],f.prototype,"shiftPadding",2),(0,n.Cc)([(0,p.MZ)({attribute:"auto-size"})],f.prototype,"autoSize",2),(0,n.Cc)([(0,p.MZ)()],f.prototype,"sync",2),(0,n.Cc)([(0,p.MZ)({type:Object})],f.prototype,"autoSizeBoundary",2),(0,n.Cc)([(0,p.MZ)({attribute:"auto-size-padding",type:Number})],f.prototype,"autoSizePadding",2),(0,n.Cc)([(0,p.MZ)({attribute:"hover-bridge",type:Boolean})],f.prototype,"hoverBridge",2),f=(0,n.Cc)([(0,p.EM)("wa-popup")],f)},8504(t,e,o){o.d(e,{Rt:()=>s,mY:()=>l,qb:()=>r});var a=o(6752);const{I:i}=a.ge,r=(t,e)=>void 0===e?void 0!==t?._$litType$:t?._$litType$===e,s=t=>void 0===t.strings,n={},l=(t,e=n)=>t._$AH=e},8552(t,e,o){var a=o(6337),i=a.AH`
  :host {
    --width: 31rem;
    --spacing: var(--wa-space-l);
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .dialog {
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: var(--width);
    max-width: calc(100% - var(--wa-space-2xl));
    max-height: calc(100% - var(--wa-space-2xl));
    background-color: var(--wa-color-surface-raised);
    border-radius: var(--wa-panel-border-radius);
    border: none;
    box-shadow: var(--wa-shadow-l);
    padding: 0;
    margin: auto;

    &.show {
      animation: show-dialog var(--show-duration) ease;

      &::backdrop {
        animation: show-backdrop var(--show-duration, 200ms) ease;
      }
    }

    &.hide {
      animation: show-dialog var(--hide-duration) ease reverse;

      &::backdrop {
        animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .dialog:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog {
      max-height: 80vh;
    }
  }

  .open {
    display: flex;
    opacity: 1;
  }

  .header {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: nowrap;

    padding-inline-start: var(--spacing);
    padding-block-end: 0;

    /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
    padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
    padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
  }

  .title {
    align-self: center;
    flex: 1 1 auto;
    font-family: inherit;
    font-size: var(--wa-font-size-l);
    font-weight: var(--wa-font-weight-heading);
    line-height: var(--wa-line-height-condensed);
    margin: 0;
  }

  .header-actions {
    align-self: start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--wa-space-2xs);
    padding-inline-start: var(--spacing);
  }

  .header-actions wa-button,
  .header-actions ::slotted(wa-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1 1 auto;
    display: block;
    padding: var(--spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  .footer {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:first-of-type)) {
    margin-inline-start: var(--wa-spacing-xs);
  }

  .dialog::backdrop {
    /*
      NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
      remove the fallback values here.
    */
    background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.02;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-dialog {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .dialog {
      border: solid 1px white;
    }
  }
`,r=o(8272),s=o(5280),n=o(4115),l=o(7434),c=o(4411),h=o(9359),d=o(2346),u=o(5915),p=o(7870),m=o(7425),b=o(3720),v=class extends u._{constructor(){super(...arguments),this.localize=new h.c(this),this.hasSlotController=new c.X(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=t=>{"Escape"===t.key&&this.open&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),(0,s.JG)(this))}disconnectedCallback(){super.disconnectedCallback(),(0,s.I7)(this),this.removeOpenListeners()}async requestClose(t){const e=new n.Lq({source:t});if(this.dispatchEvent(e),e.defaultPrevented)return this.open=!0,void(0,l.Ud)(this.dialog,"pulse");this.removeOpenListeners(),await(0,l.Ud)(this.dialog,"hide"),this.open=!1,this.dialog.close(),(0,s.I7)(this);const o=this.originalTrigger;"function"==typeof o?.focus&&setTimeout(()=>o.focus()),this.dispatchEvent(new n.Z1)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDialogCancel(t){t.preventDefault(),this.dialog.classList.contains("hide")||t.target!==this.dialog||this.requestClose(this.dialog)}handleDialogClick(t){const e=t.target.closest('[data-dialog="close"]');e&&(t.stopPropagation(),this.requestClose(e))}async handleDialogPointerDown(t){t.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await(0,l.Ud)(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const t=new n.kB;this.dispatchEvent(t),t.defaultPrevented?this.open=!1:(this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),(0,s.JG)(this),requestAnimationFrame(()=>{const t=this.querySelector("[autofocus]");t&&"function"==typeof t.focus?t.focus():this.dialog.focus()}),await(0,l.Ud)(this.dialog,"show"),this.dispatchEvent(new n.qu))}render(){const t=!this.withoutHeader,e=this.hasSlotController.test("footer");return a.qy`
      <dialog
        part="dialog"
        class=${(0,b.H)({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?a.qy`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(8203)} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${t=>this.requestClose(t.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        ${e?a.qy`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};v.css=i,(0,p.Cc)([(0,m.P)(".dialog")],v.prototype,"dialog",2),(0,p.Cc)([(0,m.MZ)({type:Boolean,reflect:!0})],v.prototype,"open",2),(0,p.Cc)([(0,m.MZ)({reflect:!0})],v.prototype,"label",2),(0,p.Cc)([(0,m.MZ)({attribute:"without-header",type:Boolean,reflect:!0})],v.prototype,"withoutHeader",2),(0,p.Cc)([(0,m.MZ)({attribute:"light-dismiss",type:Boolean})],v.prototype,"lightDismiss",2),(0,p.Cc)([(0,d.w)("open",{waitUntilFirstUpdate:!0})],v.prototype,"handleOpenChange",1),v=(0,p.Cc)([(0,m.EM)("wa-dialog")],v),document.addEventListener("click",t=>{const e=t.target.closest("[data-dialog]");if(e instanceof Element){const[t,o]=(0,r.v)(e.getAttribute("data-dialog")||"");if("open"===t&&o?.length){const t=e.getRootNode().getElementById(o);"wa-dialog"===t?.localName?t.open=!0:console.warn(`A dialog with an ID of "${o}" could not be found in this document.`)}}}),a.S$||document.addEventListener("pointerdown",()=>{}),o(5949),o(5566),o(2590),o(1325),o(517),o(4671),o(3169),o(9456),o(1092),o(9610),o(2312),o(6127),o(1353),o(9373)},8750(t,e,o){o.d(e,{R:()=>a});var a=o(6337).AH`
  :host {
    --checked-icon-color: var(--wa-form-control-activated-color);
    --checked-icon-scale: 0.7;

    color: var(--wa-form-control-value-color);
    display: inline-flex;
    flex-direction: row;
    align-items: top;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  :host(:not(:state(checked))) svg circle {
    opacity: 0;
  }

  [part~='label'] {
    display: inline;
  }

  [part~='hint'] {
    margin-block-start: 0.5em;
  }

  /* Default spacing for default appearance radios */
  :host([appearance='default']) {
    margin-block: 0.375em; /* Half of the original 0.75em gap on each side */
  }

  :host([appearance='default'][data-wa-radio-horizontal]) {
    margin-block: 0;
    margin-inline: 0.5em; /* Half of the original 1em gap on each side */
  }

  /* Remove margin from first/last items to prevent extra space */
  :host([appearance='default'][data-wa-radio-first]) {
    margin-block-start: 0;
    margin-inline-start: 0;
  }

  :host([appearance='default'][data-wa-radio-last]) {
    margin-block-end: 0;
    margin-inline-end: 0;
  }

  /* Button appearance have no spacing, they get handled by the overlap margins below */
  :host([appearance='button']) {
    margin: 0;
    align-items: center;
    min-height: var(--wa-form-control-height);
    background-color: var(--wa-color-surface-default);
    border: var(--wa-form-control-border-width) var(--wa-form-control-border-style) var(--wa-form-control-border-color);
    border-radius: var(--wa-border-radius-m);
    padding: 0 var(--wa-form-control-padding-inline);
    transition:
      background-color var(--wa-transition-fast),
      border-color var(--wa-transition-fast);
  }

  /* Default appearance */
  :host([appearance='default']) {
    .control {
      flex: 0 0 auto;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--wa-form-control-toggle-size);
      height: var(--wa-form-control-toggle-size);
      border-color: var(--wa-form-control-border-color);
      border-radius: 50%;
      border-style: var(--wa-form-control-border-style);
      border-width: var(--wa-form-control-border-width);
      background-color: var(--wa-form-control-background-color);
      color: transparent;
      transition:
        background var(--wa-transition-normal),
        border-color var(--wa-transition-fast),
        box-shadow var(--wa-transition-fast),
        color var(--wa-transition-fast);
      transition-timing-function: var(--wa-transition-easing);

      margin-inline-end: 0.5em;
    }

    .checked-icon {
      display: flex;
      fill: currentColor;
      width: var(--wa-form-control-toggle-size);
      height: var(--wa-form-control-toggle-size);
      scale: var(--checked-icon-scale);
    }
  }

  /* Button appearance */
  :host([appearance='button']) {
    .control {
      display: none;
    }
  }

  /* Checked */
  :host(:state(checked)) .control {
    color: var(--checked-icon-color);
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-form-control-background-color);
  }

  /* Focus */
  :host(:focus-visible) .control {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  :host(:state(disabled)) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Horizontal grouping - remove inner border radius */
  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-inner]) {
    border-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-first]) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-horizontal][data-wa-radio-last]) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* Vertical grouping - remove inner border radius */
  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-inner]) {
    border-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-first]) {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  :host([appearance='button'][data-wa-radio-vertical][data-wa-radio-last]) {
    border-start-start-radius: 0;
    border-start-end-radius: 0;
  }

  @media (hover: hover) {
    :host([appearance='button']:hover:not(:state(disabled), :state(checked))) {
      background-color: color-mix(in srgb, var(--wa-color-surface-default) 95%, var(--wa-color-mix-hover));
    }
  }

  :host([appearance='button']:focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  :host([appearance='button']:state(checked)) {
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-color-brand-fill-quiet);
  }

  :host([appearance='button']:state(checked):focus-visible) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Button overlap margins */
  :host([appearance='button'][data-wa-radio-horizontal]:not([data-wa-radio-first])) {
    margin-inline-start: calc(-1 * var(--wa-form-control-border-width));
  }

  :host([appearance='button'][data-wa-radio-vertical]:not([data-wa-radio-first])) {
    margin-block-start: calc(-1 * var(--wa-form-control-border-width));
  }

  /* Ensure interactive states are visible above adjacent buttons */
  :host([appearance='button']:hover),
  :host([appearance='button']:state(checked)) {
    position: relative;
    z-index: 1;
  }

  :host([appearance='button']:focus-visible) {
    z-index: 2;
  }
`},9081(t,e,o){o.d(e,{g:()=>a});var a=o(6337).AH`
  @layer wa-component {
    :host {
      display: inline-flex;
      gap: 0.5em;
      border-radius: var(--wa-border-radius-m);
      align-items: center;
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
      border-style: var(--wa-border-style);
      border-width: var(--wa-border-width-s);
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      font-size: inherit;
      line-height: 1;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      height: calc(var(--wa-form-control-height) * 0.8);
      line-height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
      padding: 0 0.75em;
    }

    /* Appearance modifiers */
    :host([appearance='outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }

    :host([appearance='filled']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: transparent;
    }

    :host([appearance='filled-outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }

    :host([appearance='accent']) {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
  }

  .content {
    font-size: var(--wa-font-size-smaller);
  }

  [part='remove-button'] {
    color: inherit;
    line-height: 1;
  }

  [part='remove-button']::part(base) {
    padding: 0;
    height: 1em;
    width: 1em;
  }

  @media (hover: hover) {
    :host(:hover) > [part='remove-button']::part(base) {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  :host(:active) > [part='remove-button']::part(base) {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  /*
   * Pill modifier
   */
  :host([pill]) {
    border-radius: var(--wa-border-radius-pill);
  }
`},9336(t,e,o){o(3380),o(9685),o(9456),o(1092),o(9610),o(9359),o(2312),o(6127),o(1353),o(9373),o(5915),o(7870)},9359(t,e,o){o.d(e,{c:()=>r});var a=o(2312),i=o(1219),r=class extends i.c2{};(0,i.XC)(a.k)},9373(t,e,o){o.d(e,{g:()=>i});var a={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},i={name:"system",resolver:(t,e="classic",o="solid")=>{let i=a[o][t]??a.regular[t]??a.regular["circle-question"];return i?function(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}(i):""}}},9456(t,e,o){var a,i=o(1092),r=o(9610),s=o(6127),n=o(2346),l=o(5915),c=o(7870),h=o(6337),d=o(7425),u=o(8504),p=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}},m=Symbol(),b=Symbol(),v=new Map,f=class extends l._{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.resolveIcon=async(t,e)=>{let o;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=h.qy`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;const o=this.shadowRoot.querySelector("[part='svg']");return"function"==typeof e.mutator&&e.mutator(o,this),this.svg}try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return 410===o.status?m:b}catch{return b}try{const t=document.createElement("div");t.innerHTML=await o.text();const e=t.firstElementChild;if("svg"!==e?.tagName?.toLowerCase())return m;a||(a=new DOMParser);const i=a.parseFromString(e.outerHTML,"text/html").body.querySelector("svg");return i?(i.part.add("svg"),document.adoptNode(i)):m}catch{return m}}}connectedCallback(){super.connectedCallback(),(0,s.pA)(this)}firstUpdated(t){super.firstUpdated(t),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),(0,s.cl)(this)}getIconSource(){const t=(0,s.Hh)(this.library),e=this.family||(0,s.Xr)();return this.name&&t?{url:t.resolver(this.name,e,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){const{url:t,fromLibrary:e}=this.getIconSource(),o=e?(0,s.Hh)(this.library):void 0;if(!t)return void(this.svg=null);let a=v.get(t);a||(a=this.resolveIcon(t,o),v.set(t,a));const r=await a;if(r===b&&v.delete(t),t===this.getIconSource().url)if((0,u.qb)(r))this.svg=r;else switch(r){case b:case m:this.svg=null,this.dispatchEvent(new p);break;default:this.svg=r.cloneNode(!0),o?.mutator?.(this.svg,this),this.dispatchEvent(new i.D)}}updated(t){super.updated(t);const e=(0,s.Hh)(this.library),o=this.shadowRoot?.querySelector("svg");o&&e?.mutator?.(o,this)}render(){return this.hasUpdated?this.svg:h.qy`<svg part="svg" width="16" height="16"></svg>`}};f.css=r.L,(0,c.Cc)([(0,d.wk)()],f.prototype,"svg",2),(0,c.Cc)([(0,d.MZ)({reflect:!0})],f.prototype,"name",2),(0,c.Cc)([(0,d.MZ)({reflect:!0})],f.prototype,"family",2),(0,c.Cc)([(0,d.MZ)({reflect:!0})],f.prototype,"variant",2),(0,c.Cc)([(0,d.MZ)({attribute:"auto-width",type:Boolean,reflect:!0})],f.prototype,"autoWidth",2),(0,c.Cc)([(0,d.MZ)({attribute:"swap-opacity",type:Boolean,reflect:!0})],f.prototype,"swapOpacity",2),(0,c.Cc)([(0,d.MZ)()],f.prototype,"src",2),(0,c.Cc)([(0,d.MZ)()],f.prototype,"label",2),(0,c.Cc)([(0,d.MZ)({reflect:!0})],f.prototype,"library",2),(0,c.Cc)([(0,n.w)("label")],f.prototype,"handleLabelChange",1),(0,c.Cc)([(0,n.w)(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],f.prototype,"setIcon",1),f=(0,c.Cc)([(0,d.EM)("wa-icon")],f)},9610(t,e,o){o.d(e,{L:()=>a});var a=o(6337).AH`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* Standard */
  :host(:not([auto-width])) {
    width: 1.25em;
    height: 1em;
  }

  /* Auto-width */
  :host([auto-width]) {
    width: auto;
    height: 1em;
  }

  svg {
    height: 1em;
    overflow: visible;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }
`},9683(t,e,o){var a=o(6337),i=a.AH`
  :host {
    border-width: 0;
  }

  .textarea {
    display: grid;
    align-items: center;
    margin: 0;
    border: none;
    outline: none;
    cursor: inherit;
    font: inherit;
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    -webkit-appearance: none;

    &:focus-within {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .textarea {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .textarea {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .textarea {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  textarea {
    display: block;
    width: 100%;
    border: none;
    background: transparent;
    font: inherit;
    color: inherit;
    padding: calc(var(--wa-form-control-padding-block) - ((1lh - 1em) / 2)) var(--wa-form-control-padding-inline); /* accounts for the larger line height of textarea content */
    min-height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    box-shadow: none;
    margin: 0;

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &:focus {
      outline: none;
    }
  }

  /* Shared textarea and size-adjuster positioning */
  .control,
  .size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
    padding: 0;
  }

  textarea::-webkit-search-decoration,
  textarea::-webkit-search-cancel-button,
  textarea::-webkit-search-results-button,
  textarea::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /*
   * Resize types
   */

  :host([resize='none']) textarea {
    resize: none;
  }

  textarea,
  :host([resize='vertical']) textarea {
    resize: vertical;
  }

  :host([resize='horizontal']) textarea {
    resize: horizontal;
  }

  :host([resize='both']) textarea {
    resize: both;
  }

  :host([resize='auto']) textarea {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`,r=o(3158),s=o(5963),n=o(1325),l=o(4411),c=o(4671),h=o(2346),d=o(7870),u=o(7425),p=o(3720),m=o(31),b=o(538),v=class extends n.q{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new l.X(this,"hint","label"),this.title="",this.name=null,this._value=null,this.defaultValue=this.getAttribute("value")??"",this.size="medium",this.appearance="outlined",this.label="",this.hint="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,(0,s.i)()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(t){this._value!==t&&(this.valueHasChanged=!0,this._value=t)}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaDimensions()),this.updateComplete.then(()=>{if(this.setTextareaDimensions(),this.resizeObserver.observe(this.input),this.didSSR&&this.input&&this.value!==this.input.value){const t=this.input.value;this.value=t}})}disconnectedCallback(){super.disconnectedCallback(),this.input&&this.resizeObserver?.unobserve(this.input)}handleBlur(){this.checkValidity()}handleChange(t){this.valueHasChanged=!0,this.value=this.input.value,this.setTextareaDimensions(),this.checkValidity(),this.relayNativeEvent(t,{bubbles:!0,composed:!0})}handleInput(t){this.valueHasChanged=!0,this.value=this.input.value,this.relayNativeEvent(t,{bubbles:!0,composed:!0})}setTextareaDimensions(){if("none"===this.resize)return this.base.style.width="",void(this.base.style.height="");if("auto"===this.resize)return this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`,this.base.style.width="",void(this.base.style.height="");if(this.input.style.width){const t=Number(this.input.style.width.split(/px/)[0])+2;this.base.style.width=`${t}px`}if(this.input.style.height){const t=Number(this.input.style.height.split(/px/)[0])+2;this.base.style.height=`${t}px`}}handleRowsChange(){this.setTextareaDimensions()}async handleValueChange(){await this.updateComplete,this.checkValidity(),this.setTextareaDimensions()}updated(t){t.has("resize")&&this.setTextareaDimensions(),super.updated(t),t.has("value")&&this.customStates.set("blank",!this.value)}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(t){return t?("number"==typeof t.top&&(this.input.scrollTop=t.top),void("number"==typeof t.left&&(this.input.scrollLeft=t.left))):{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,a="preserve"){const i=e??this.input.selectionStart,r=o??this.input.selectionEnd;this.input.setRangeText(t,i,r,a),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaDimensions())}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){const t=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,e=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,o=!!this.label||!!t,i=!!this.hint||!!e;return a.qy`
      <label part="form-control-label label" class="label" for="input" aria-hidden=${o?"false":"true"}>
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="textarea">
        <textarea
          part="textarea"
          id="input"
          class="control"
          title=${this.title}
          name=${(0,m.J)(this.name)}
          .value=${(0,b.V)(this.value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${(0,m.J)(this.placeholder)}
          rows=${(0,m.J)(this.rows)}
          minlength=${(0,m.J)(this.minlength)}
          maxlength=${(0,m.J)(this.maxlength)}
          autocapitalize=${(0,m.J)(this.autocapitalize)}
          autocorrect=${(0,m.J)(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${(0,m.J)(this.spellcheck)}
          enterkeyhint=${(0,m.J)(this.enterkeyhint)}
          inputmode=${(0,m.J)(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        ></textarea>

        <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
        <div part="textarea-adjuster" class="size-adjuster" ?hidden=${"auto"!==this.resize}></div>
      </div>

      <slot
        id="hint"
        name="hint"
        part="hint"
        aria-hidden=${i?"false":"true"}
        class=${(0,p.H)({"has-slotted":i})}
        >${this.hint}</slot
      >
    `}};v.css=[i,r.I,c.J],(0,d.Cc)([(0,u.P)(".control")],v.prototype,"input",2),(0,d.Cc)([(0,u.P)('[part~="base"]')],v.prototype,"base",2),(0,d.Cc)([(0,u.P)(".size-adjuster")],v.prototype,"sizeAdjuster",2),(0,d.Cc)([(0,u.MZ)()],v.prototype,"title",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],v.prototype,"name",2),(0,d.Cc)([(0,u.wk)()],v.prototype,"value",1),(0,d.Cc)([(0,u.MZ)({attribute:"value",reflect:!0})],v.prototype,"defaultValue",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],v.prototype,"size",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],v.prototype,"appearance",2),(0,d.Cc)([(0,u.MZ)()],v.prototype,"label",2),(0,d.Cc)([(0,u.MZ)({attribute:"hint"})],v.prototype,"hint",2),(0,d.Cc)([(0,u.MZ)()],v.prototype,"placeholder",2),(0,d.Cc)([(0,u.MZ)({type:Number})],v.prototype,"rows",2),(0,d.Cc)([(0,u.MZ)({reflect:!0})],v.prototype,"resize",2),(0,d.Cc)([(0,u.MZ)({type:Boolean})],v.prototype,"disabled",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,reflect:!0})],v.prototype,"readonly",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,reflect:!0})],v.prototype,"required",2),(0,d.Cc)([(0,u.MZ)({type:Number})],v.prototype,"minlength",2),(0,d.Cc)([(0,u.MZ)({type:Number})],v.prototype,"maxlength",2),(0,d.Cc)([(0,u.MZ)()],v.prototype,"autocapitalize",2),(0,d.Cc)([(0,u.MZ)()],v.prototype,"autocorrect",2),(0,d.Cc)([(0,u.MZ)()],v.prototype,"autocomplete",2),(0,d.Cc)([(0,u.MZ)({type:Boolean})],v.prototype,"autofocus",2),(0,d.Cc)([(0,u.MZ)()],v.prototype,"enterkeyhint",2),(0,d.Cc)([(0,u.MZ)({type:Boolean,converter:{fromAttribute:t=>!(!t||"false"===t),toAttribute:t=>t?"true":"false"}})],v.prototype,"spellcheck",2),(0,d.Cc)([(0,u.MZ)()],v.prototype,"inputmode",2),(0,d.Cc)([(0,u.MZ)({attribute:"with-label",type:Boolean})],v.prototype,"withLabel",2),(0,d.Cc)([(0,u.MZ)({attribute:"with-hint",type:Boolean})],v.prototype,"withHint",2),(0,d.Cc)([(0,h.w)("rows",{waitUntilFirstUpdate:!0})],v.prototype,"handleRowsChange",1),(0,d.Cc)([(0,h.w)("value",{waitUntilFirstUpdate:!0})],v.prototype,"handleValueChange",1),v=(0,d.Cc)([(0,u.EM)("wa-textarea")],v),o(5915)},9685(t,e,o){o.d(e,{l:()=>a});var a=o(6337).AH`
  :host {
    display: block;
    color: var(--wa-color-text-normal);
    -webkit-user-select: none;
    user-select: none;

    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    padding: 0.5em 1em 0.5em 0.25em;
    line-height: var(--wa-line-height-condensed);
    transition: fill var(--wa-transition-normal) var(--wa-transition-easing);
    cursor: pointer;
  }

  :host(:focus) {
    outline: none;
  }

  @media (hover: hover) {
    :host(:not([disabled], :state(current)):is(:state(hover), :hover)) {
      background-color: var(--wa-color-neutral-fill-normal);
      color: var(--wa-color-neutral-on-normal);
    }
  }

  :host(:state(current)),
  :host([disabled]:state(current)) {
    background-color: var(--wa-color-brand-fill-loud);
    color: var(--wa-color-brand-on-loud);
    opacity: 1;
  }

  :host([disabled]) {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .label {
    flex: 1 1 auto;
    display: inline-block;
  }

  .check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--wa-font-size-smaller);
    visibility: hidden;
    width: 2em;
  }

  :host(:state(selected)) .check {
    visibility: visible;
  }

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .start::slotted(*) {
    margin-inline-end: 0.5em;
  }

  .end::slotted(*) {
    margin-inline-start: 0.5em;
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`},9701(t,e,o){var a=o(5234),i=o(7434),r=o(4411),s=o(5915),n=o(7870),l=o(6337),c=o(7425),h=class extends s._{constructor(){super(...arguments),this.hasSlotController=new r.X(this,"[default]","start","end"),this.active=!1,this.variant="default",this.size="medium",this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type="normal",this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",this.submenuOpen?"true":"false")):(this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"))}}connectedCallback(){super.connectedCallback(),this.addEventListener("mouseenter",this.handleMouseEnter.bind(this)),this.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.closeSubmenu(),this.removeEventListener("mouseenter",this.handleMouseEnter),this.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}firstUpdated(){this.setAttribute("tabindex","-1"),this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState()}updated(t){t.has("active")&&(this.setAttribute("tabindex",this.active?"0":"-1"),this.customStates.set("active",this.active)),t.has("checked")&&(this.setAttribute("aria-checked",this.checked?"true":"false"),this.customStates.set("checked",this.checked)),t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),t.has("type")&&("checkbox"===this.type?this.setAttribute("role","menuitemcheckbox"):this.setAttribute("role","menuitem")),t.has("submenuOpen")&&(this.customStates.set("submenu-open",this.submenuOpen),this.submenuOpen?this.openSubmenu():this.closeSubmenu())}updateHasSubmenuState(){this.customStates.set("has-submenu",this.hasSubmenu)}async openSubmenu(){this.hasSubmenu&&this.submenuElement&&(this.notifyParentOfOpening(),this.submenuElement.showPopover(),this.submenuElement.hidden=!1,this.submenuElement.setAttribute("data-visible",""),this.submenuOpen=!0,this.setAttribute("aria-expanded","true"),await(0,i.Ud)(this.submenuElement,"show"),setTimeout(()=>{const t=this.getSubmenuItems();t.length>0&&(t.forEach((t,e)=>t.active=0===e),t[0].focus())},0))}notifyParentOfOpening(){const t=new CustomEvent("submenu-opening",{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(t);const e=this.parentElement;e&&[...e.children].filter(t=>t!==this&&"wa-dropdown-item"===t.localName&&t.getAttribute("slot")===this.getAttribute("slot")&&t.submenuOpen).forEach(t=>{t.submenuOpen=!1})}async closeSubmenu(){this.hasSubmenu&&this.submenuElement&&(this.submenuOpen=!1,this.setAttribute("aria-expanded","false"),this.submenuElement.hidden||(await(0,i.Ud)(this.submenuElement,"hide"),this.submenuElement.hidden=!0,this.submenuElement.removeAttribute("data-visible"),this.submenuElement.hidePopover()))}getSubmenuItems(){return[...this.children].filter(t=>"wa-dropdown-item"===t.localName&&"submenu"===t.getAttribute("slot")&&!t.hasAttribute("disabled"))}handleMouseEnter(){this.hasSubmenu&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}render(){return l.qy`
      ${"checkbox"===this.type?l.qy`
            <wa-icon
              id="check"
              part="checkmark"
              exportparts="svg:checkmark__svg"
              library="system"
              name="check"
            ></wa-icon>
          `:""}

      <span id="icon" part="icon">
        <slot name="icon"></slot>
      </span>

      <span id="label" part="label">
        <slot></slot>
      </span>

      <span id="details" part="details">
        <slot name="details"></slot>
      </span>

      ${this.hasSubmenu?l.qy`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          `:""}
      ${this.hasSubmenu?l.qy`
            <div
              id="submenu"
              part="submenu"
              popover="manual"
              role="menu"
              tabindex="-1"
              aria-orientation="vertical"
              hidden
            >
              <slot name="submenu"></slot>
            </div>
          `:""}
    `}};h.css=a.d,(0,n.Cc)([(0,c.P)("#submenu")],h.prototype,"submenuElement",2),(0,n.Cc)([(0,c.MZ)({type:Boolean})],h.prototype,"active",2),(0,n.Cc)([(0,c.MZ)({reflect:!0})],h.prototype,"variant",2),(0,n.Cc)([(0,c.MZ)({reflect:!0})],h.prototype,"size",2),(0,n.Cc)([(0,c.MZ)({attribute:"checkbox-adjacent",type:Boolean,reflect:!0})],h.prototype,"checkboxAdjacent",2),(0,n.Cc)([(0,c.MZ)({attribute:"submenu-adjacent",type:Boolean,reflect:!0})],h.prototype,"submenuAdjacent",2),(0,n.Cc)([(0,c.MZ)()],h.prototype,"value",2),(0,n.Cc)([(0,c.MZ)({reflect:!0})],h.prototype,"type",2),(0,n.Cc)([(0,c.MZ)({type:Boolean})],h.prototype,"checked",2),(0,n.Cc)([(0,c.MZ)({type:Boolean,reflect:!0})],h.prototype,"disabled",2),(0,n.Cc)([(0,c.MZ)({type:Boolean,reflect:!0})],h.prototype,"submenuOpen",2),(0,n.Cc)([(0,c.wk)()],h.prototype,"hasSubmenu",2),h=(0,n.Cc)([(0,c.EM)("wa-dropdown-item")],h)},9746(t,e,o){function a(t,e,o){return a=t<e?e:t>o?o:t,Object.is(a,-0)?0:a;var a}function i(t=""){return`${t}${((t=21)=>{let e="",o=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&o[t]];return e})()}`}o.d(e,{q:()=>a,N:()=>i})}};
//# sourceMappingURL=284.bundle.mjs.map