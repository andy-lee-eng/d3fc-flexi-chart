import { select, event } from 'd3-selection';
import { dataJoin } from '@d3fc/d3fc-data-join';
import './css';

const functor = (v) =>
    typeof v === 'function' ? v : () => v;

export default () => {
  let leftLabel = functor('');
  let rightLabel = functor('');
  let topLabel = functor('');
  let bottomLabel = functor('');

  let layers = [];
  let map = d => d;
  let decorate = () => { };

  const containerDataJoin = dataJoin('d3fc-group', 'flexi-chart');
  const labelDataJoin = dataJoin('div', 'label-container').key(d => d);
  const axisDataJoin = dataJoin('div', 'axis').key(d => d);
  const axisComponentJoin = dataJoin('d3fc-svg', 'axis-component').key(d => d);
  
  const layerDataJoin = function dataJoin(container, data) {
    const selected = container.selectAll('.plot-area');
    const update = selected.data(data, d => d);
    const enter = update.enter().append(d => document.createElement(d.element)).attr('class', 'plot-area');
    update.exit().remove();
    // automatically merge in the enter selection
    return update.merge(enter);
  };

  const propagateTransition = maybeTransition => selection =>
    maybeTransition.selection ? selection.transition(maybeTransition) : selection;

  const chart = (selection) => {
    const transitionPropagator = propagateTransition(selection);
    const axes = [
      { id: 'left', vertical: true, label: leftLabel },
      { id: 'right', vertical: true, label: rightLabel },
      { id: 'bottom', vertical: false, label: bottomLabel },
      { id: 'top', vertical: false, label: topLabel }
    ];

    selection.each((data, index, group) => {
      const container = containerDataJoin(select(group[index]), [data]);
      container.enter().attr('auto-resize', '')

      // get a subset of the labels that are in use first
      const chartLabels = labelDataJoin(container, axes);
      chartLabels.enter().append('div').classed('label', true);
      chartLabels
        .attr('class', d => `label ${d.id}-label`)
        .select('.label')
        .text(d => d.label(data));

      // Render the axes
      const layerUsesAxis = (name) => (p => p.yOrient()() === name || p.xOrient()() === name);
      const anyLayerUsesAxis = name => layers.some(layerUsesAxis(name));

      const drawAxis = (axisContainer, axis) => {
        const axisLayers = layers.filter(layerUsesAxis(axis.id));
        axisComponentJoin(axisContainer, axisLayers)
          .style('height', d => !axis.vertical && d.xAxisHeight()(data))
          .style('width', d => axis.vertical && d.yAxisWidth()(data))
          .on('measure', (d, i, nodes) => {
            const { width, height } = event.detail;
            if (axis.id === 'top' || axis.id === 'left') {
                select(nodes[i])
                    .select('svg')
                    .attr('viewBox', axis.id === 'top'
                        ? `0 ${-height} ${width} ${height}`
                        : `${-width} 0 ${width} ${height}`);
            }
          })
          .on('draw', (d, i, nodes) => {
            const axisComponent = d[`${axis.id}Axis`]();
            const axisContainer = transitionPropagator(select(nodes[i]));
            axisContainer
                .select('svg')
                .call(axisComponent);
          });
      }

      // get a subset of the axes that are in use first
      axisDataJoin(container, axes.filter(a => anyLayerUsesAxis(a.id)))
        .attr('class', d => `axis ${d.id}-axis`)
        .each((d, i, nodes) => drawAxis(select(nodes[i]), d));

      // Render the layers
      layerDataJoin(container, layers)
        .on('measure', (layer) => {
          const { width, height } = event.detail;
          // Set the ranges on this layer
          layer.yScale().range([height, 0]);
          layer.xScale().range([0, width]);
        })
        .on('draw', (layer, i, nodes) => {
          const surface = (layer.element == 'd3fc-svg') ? 'svg' : 'canvas';
          const layerData = map(data, i, layer);
          select(nodes[i]).select(surface).datum(layerData).call(layer);
        });

      container.each((d, i, nodes) => nodes[i].requestRedraw());
      decorate(container, data, index);
    });
  };

  chart.leftLabel = (...args) => {
    if (!args.length) {
        return leftLabel;
    }
    leftLabel = functor(args[0]);
    return chart;
  };
  chart.rightLabel = (...args) => {
    if (!args.length) {
        return rightLabel;
    }
    rightLabel = functor(args[0]);
    return chart;
  };
  chart.topLabel = (...args) => {
    if (!args.length) {
        return topLabel;
    }
    topLabel = functor(args[0]);
    return chart;
  };
  chart.bottomLabel = (...args) => {
    if (!args.length) {
        return bottomLabel;
    }
    bottomLabel = functor(args[0]);
    return chart;
  };

  chart.layers = (...args) => {
    if (!args.length) {
        return layers;
    }
    layers = Array.isArray(args[0]) ? args[0] : args;
    return chart;
  };

  chart.decorate = (...args) => {
    if (!args.length) {
        return decorate;
    }
    decorate = args[0];
    return chart;
  };

  chart.map = (...args) => {
    if (!args.length) {
        return map;
    }
    map = args[0];
    return chart;
  };

  return chart;
};
