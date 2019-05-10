import { rebindAll } from '@d3fc/d3fc-rebind';
import layer from '../layer';

export default (...args) => {
  const base = layer(...args);

  const propagateTransition = maybeTransition => selection =>
    maybeTransition.selection ? selection.transition(maybeTransition) : selection;

  const svgLayer = (selection) => {
    const transitionPropagator = propagateTransition(selection);
    base(selection);

    transitionPropagator(selection)
      .call(base.plotArea());
  };

  rebindAll(svgLayer, base);
  svgLayer.element = 'd3fc-svg';
  return svgLayer;
};
