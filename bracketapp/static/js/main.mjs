import "@awesome.me/webawesome-pro/dist/components/page/page.js";

import "@awesome.me/webawesome-pro/dist/components/button/button.js";
import "@awesome.me/webawesome-pro/dist/components/button-group/button-group.js";

import "@awesome.me/webawesome-pro/dist/components/card/card.js";

import "@awesome.me/webawesome-pro/dist/components/callout/callout.js";

import "@awesome.me/webawesome-pro/dist/components/checkbox/checkbox.js";

import "@awesome.me/webawesome-pro/dist/components/details/details.js";

import "@awesome.me/webawesome-pro/dist/components/dialog/dialog.js";

import "@awesome.me/webawesome-pro/dist/components/divider/divider.js";

import "@awesome.me/webawesome-pro/dist/components/dropdown/dropdown.js";
import "@awesome.me/webawesome-pro/dist/components/dropdown-item/dropdown-item.js";

import "@awesome.me/webawesome-pro/dist/components/format-date/format-date.js";
import "@awesome.me/webawesome-pro/dist/components/format-number/format-number.js";

import "@awesome.me/webawesome-pro/dist/components/icon/icon.js";

import "@awesome.me/webawesome-pro/dist/components/input/input.js";

import "@awesome.me/webawesome-pro/dist/components/popup/popup.js";

import "@awesome.me/webawesome-pro/dist/components/radio/radio.js";
import "@awesome.me/webawesome-pro/dist/components/radio-group/radio-group.js";

import "@awesome.me/webawesome-pro/dist/components/scroller/scroller.js";

import "@awesome.me/webawesome-pro/dist/components/select/select.js";
import WaCombobox from "@awesome.me/webawesome-pro/dist/components/combobox/combobox.js";
import "@awesome.me/webawesome-pro/dist/components/option/option.js";

import "@awesome.me/webawesome-pro/dist/components/tooltip/tooltip.js";

import "@awesome.me/webawesome-pro/dist/components/switch/switch.js";

import "@awesome.me/webawesome-pro/dist/components/badge/badge.js";

import "@awesome.me/webawesome-pro/dist/components/tab-group/tab-group.js";
import "@awesome.me/webawesome-pro/dist/components/tab/tab.js";
import "@awesome.me/webawesome-pro/dist/components/tab-panel/tab-panel.js";

import "@awesome.me/webawesome-pro/dist/components/textarea/textarea.js";

import "@awesome.me/webawesome-pro/dist/components/slider/slider.js";

// // Option 2: the setBasePath()
// import { setBasePath } from "@awesome.me/webawesome-pro/dist/webawesome.js";
// setBasePath("");

import { registerIconLibrary } from "@awesome.me/webawesome-pro/dist/webawesome.js";

registerIconLibrary("ion", {
  resolver: (name) =>
    `https://cdn.jsdelivr.net/npm/ionicons@5.1.2/dist/ionicons/svg/${name}.svg`,
  mutator: (svg) => {
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("stroke", "currentColor");
    [...svg.querySelectorAll(".ionicon-fill-none")].map((el) =>
      el.setAttribute("fill", "none")
    );
    [...svg.querySelectorAll(".ionicon-stroke-width")].map((el) =>
      el.setAttribute("stroke-width", "32px")
    );
  },
});

registerIconLibrary("remix", {
  resolver: (name) => {
    const match = name.match(/^(.*?)\/(.*?)?$/);
    match[1] = match[1].charAt(0).toUpperCase() + match[1].slice(1);
    return `https://cdn.jsdelivr.net/npm/remixicon@4.6.0/icons/${match[1]}/${match[2]}.svg`;
  },
  mutator: (svg) => svg.setAttribute("fill", "currentColor"),
});

export { WaCombobox };
