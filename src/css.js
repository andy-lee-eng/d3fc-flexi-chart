// Adapted from https://github.com/substack/insert-css
export const css = `d3fc-group.flexi-chart{width:100%;height:100%;overflow:hidden;display:grid;display:-ms-grid;grid-template-columns:minmax(1em,max-content) auto 1fr auto minmax(1em,max-content);-ms-grid-columns:minmax(1em,max-content) auto 1fr auto minmax(1em,max-content);grid-template-rows:minmax(1em,max-content) auto 1fr auto minmax(1em,max-content);-ms-grid-rows:minmax(1em,max-content) auto 1fr auto minmax(1em,max-content);}
d3fc-group.flexi-chart>.top-label{align-self:center;-ms-grid-column-align:center;justify-self:center;-ms-grid-row-align:center;grid-column:3;-ms-grid-column:3;-ms-grid-row:1;-ms-grid-row:1;}
d3fc-group.flexi-chart>.top-axis{grid-column:3;-ms-grid-column:3;grid-row:2;-ms-grid-row:2;}
d3fc-group.flexi-chart>.left-label{width:1.2em;align-self:center;-ms-grid-column-align:center;justify-self:center;-ms-grid-row-align:center;grid-column:1;-ms-grid-column:1;grid-row:3;-ms-grid-row:3;}
d3fc-group.flexi-chart>.left-axis{grid-column:2;-ms-grid-column:2;grid-row:3;-ms-grid-row:3;white-space:nowrap;}
d3fc-group.flexi-chart>.plot-area{overflow:hidden;grid-column:3;-ms-grid-column:3;grid-row:3;-ms-grid-row:3;}
d3fc-group.flexi-chart>.right-axis{grid-column:4;-ms-grid-column:4;grid-row:3;-ms-grid-row:3;white-space:nowrap;}
d3fc-group.flexi-chart>.right-label{width:1.2em;align-self:center;-ms-grid-column-align:center;justify-self:center;-ms-grid-row-align:center;grid-column:5;-ms-grid-column:5;grid-row:3;-ms-grid-row:3;}
d3fc-group.flexi-chart>.bottom-axis{grid-column:3;-ms-grid-column:3;grid-row:4;-ms-grid-row:4;}
d3fc-group.flexi-chart>.bottom-label{height:1.2em;align-self:center;-ms-grid-column-align:center;justify-self:center;-ms-grid-row-align:center;grid-column:3;-ms-grid-column:3;grid-row:5;-ms-grid-row:5;}
d3fc-group.flexi-chart>.left-axis>.axis-component,d3fc-group.flexi-chart>.right-axis>.axis-component{width:3em;height:100%;display:inline-block;}
d3fc-group.flexi-chart>.top-axis>.axis-component,d3fc-group.flexi-chart>.bottom-axis>.axis-component{height:2em;}
d3fc-group.flexi-chart>.plot-area>d3fc-svg,d3fc-group.flexi-chart>.plot-area>d3fc-canvas{height:100%;}
d3fc-group.flexi-chart>.left-label>.label,d3fc-group.flexi-chart>.right-label>.label{transform:rotate(-90deg);white-space:nowrap;}
`;

const styleElement = document.createElement('style');
styleElement.setAttribute('type', 'text/css');

document.querySelector('head')
  .appendChild(styleElement);

if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText += css;
} else {
    styleElement.textContent += css;
}
