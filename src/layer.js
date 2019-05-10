import { scaleIdentity } from 'd3-scale';
import { rebindAll, prefix, exclude } from '@d3fc/d3fc-rebind';
import { axisBottom, axisRight, axisLeft, axisTop } from '@d3fc/d3fc-axis';
import store from './store';

const functor = (v) =>
    typeof v === 'function' ? v : () => v;

export default (...args) => {
  const { xScale, yScale, xAxis, yAxis } = getArguments(...args);
  let xAxisHeight = functor(null);
  let yAxisWidth = functor(null);
  let yOrient = functor('right');
  let xOrient = functor('bottom');
  let plotArea = null;
  let xAxisStore = store('tickFormat', 'ticks', 'tickArguments', 'tickSize', 'tickSizeInner', 'tickSizeOuter', 'tickValues', 'tickPadding', 'tickCenterLabel');
  let xDecorate = () => { };
  let yAxisStore = store('tickFormat', 'ticks', 'tickArguments', 'tickSize', 'tickSizeInner', 'tickSizeOuter', 'tickValues', 'tickPadding', 'tickCenterLabel');
  let yDecorate = () => { };

  const layer = (selection) => {
    plotArea.xScale(xScale).yScale(yScale);
  };

  layer.xScale = () => xScale;
  layer.yScale = () => yScale;
  
  layer.leftAxis = () => yAxisStore(yAxis.left(yScale).decorate(yDecorate));
  layer.rightAxis = () => yAxisStore(yAxis.right(yScale).decorate(yDecorate));
  layer.topAxis = () => xAxisStore(xAxis.top(xScale).decorate(xDecorate));
  layer.bottomAxis = () => xAxisStore(xAxis.bottom(xScale).decorate(xDecorate));

  const scaleExclusions = exclude(
    /range\w*/,   // the scale range is set via the component layout
    /tickFormat/  // use axis.tickFormat instead (only present on linear scales)
  );
  rebindAll(layer, xScale, scaleExclusions, prefix('x'));
  rebindAll(layer, yScale, scaleExclusions, prefix('y'));
  rebindAll(layer, xAxisStore, prefix('x'));
  rebindAll(layer, yAxisStore, prefix('y'));

  layer.xAxisHeight = (...args) => {
    if (!args.length) {
        return xAxisHeight;
    }
    xAxisHeight = functor(args[0]);
    return layer;
  };
  layer.yAxisWidth = (...args) => {
      if (!args.length) {
          return yAxisWidth;
      }
      yAxisWidth = functor(args[0]);
      return layer;
  };
  layer.xOrient = (...args) => {
    if (!args.length) {
        return xOrient;
    }
    xOrient = functor(args[0]);
    return layer;
  };
  layer.yOrient = (...args) => {
      if (!args.length) {
          return yOrient;
      }
      yOrient = functor(args[0]);
      return layer;
  };
  layer.plotArea = (...args) => {
    if (!args.length) {
        return plotArea;
    }
    plotArea = args[0];
    return layer;
  };

  layer.xDecorate = (...args) => {
    if (!args.length) {
        return xDecorate;
    }
    xDecorate = args[0];
    return layer;
  };
  layer.yDecorate = (...args) => {
    if (!args.length) {
        return yDecorate;
    }
    yDecorate = args[0];
    return layer;
  };

  return layer;
};

const getArguments = (...args) => {
  const defaultSettings = {
      xScale: scaleIdentity(),
      yScale: scaleIdentity(),
      xAxis: { bottom: axisBottom, top: axisTop },
      yAxis: { right: axisRight, left: axisLeft }
  };

  if (args.length === 1 && !args[0].domain && !args[0].range) {
      // Settings object
      return Object.assign(defaultSettings, args[0]);
  }

  // xScale/yScale parameters
  return Object.assign(defaultSettings, {
      xScale: args[0] || defaultSettings.xScale,
      yScale: args[1] || defaultSettings.yScale
  });
};
