// import chartJs from "https://cdn.jsdelivr.net/npm/chart.js@4.4.8/+esm";
import { html } from "./imports.mjs";
import { NikElement } from "./customElement.mjs";

export class BracketPointsChart extends NikElement {
  static properties = {
    points: { type: Object },
  };

  static queries = {
    pointsCharts: "#points-chart",
  };

  async firstUpdated() {
    await this.updateComplete;

    this.initChart();
    this.setupThemeWatcher();
  }

  initChart() {
    this.computedStyle = getComputedStyle(document.body);
    let success = this.computedStyle.getPropertyValue("--sl-color-success-400");
    let danger = this.computedStyle.getPropertyValue("--sl-color-danger-400");
    let neutral = this.computedStyle.getPropertyValue("--sl-color-neutral-400");
    let borderColor = this.computedStyle.getPropertyValue(
      "--sl-color-neutral-0"
    );
    let color = this.computedStyle.getPropertyValue("--sl-color-neutral-950");

    const data = {
      labels: ["Points Gained", "Points Lost", "Points Unplayed"],
      datasets: [
        {
          data: [this.points.gained, this.points.lost, this.points.unplayed],
          backgroundColor: [success, danger, neutral],
          borderColor,
          hoverOffset: 4,
        },
      ],
    };

    const config = {
      type: "doughnut",
      data: data,
      options: {
        plugins: {
          legend: {
            labels: {
              color,
            },
          },
        },
      },
    };

    const ctx = this.pointsCharts.getContext("2d");
    this.chart = new Chart(ctx, config);
  }

  updateColors() {
    let success = this.computedStyle.getPropertyValue("--sl-color-success-400");
    let danger = this.computedStyle.getPropertyValue("--sl-color-danger-400");
    let neutral = this.computedStyle.getPropertyValue("--sl-color-neutral-400");
    let borderColor = this.computedStyle.getPropertyValue(
      "--sl-color-neutral-0"
    );
    let color = this.computedStyle.getPropertyValue("--sl-color-neutral-950");

    this.chart.data.datasets[0].backgroundColor = [success, danger, neutral];
    this.chart.data.datasets[0].borderColor = borderColor;
    this.chart.options.plugins.legend.labels.color = color;

    this.chart.update();
  }

  setupThemeWatcher() {
    this.mutationObserver = new MutationObserver(() =>
      this.handleThemeChange()
    );

    this.mutationObserver.observe(document.documentElement, {
      attributes: true,
    });

    this.handleThemeChange();
  }

  handleThemeChange() {
    let theme =
      document.documentElement.getAttribute("data-bs-theme") === "dark"
        ? "dark"
        : "light";

    this.updateColors();
  }

  render() {
    return html`<div style="width:300px;height:300px;">
      <canvas id="points-chart"></canvas>
    </div>`;
  }
}

customElements.define("nb-bracket-points-chart", BracketPointsChart);
