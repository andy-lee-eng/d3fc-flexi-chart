import { rebindAll } from '@d3fc/d3fc-rebind';
import layer from '../layer';

export default (...args) => {
  const contextType = '2d';
  const base = layer(...args);

  const canvasLayer = (selection) => {
    base(selection);

    const canvas = selection.node();
    const data = selection.datum();

    base.plotArea().context(canvas.getContext(contextType))(data);
  };

  canvasLayer.contextType = (...args) => {
    if (!args.length) {
        return contextType;
    }
    contextType = args[0];
    return canvasLayer;
  };

  rebindAll(canvasLayer, base);
  canvasLayer.element = 'd3fc-canvas';
  return canvasLayer;
};
