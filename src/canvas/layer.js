import { rebindAll } from '@d3fc/d3fc-rebind';
import layer from '../layer';

export default (...args) => {
  const base = layer(...args);

  const canvasLayer = (selection) => {
    base(selection);

    const canvas = selection.node();
    const data = selection.datum();

    base.plotArea().context(canvas.getContext('2d'))(data);
  };

  rebindAll(canvasLayer, base);
  canvasLayer.element = 'd3fc-canvas';
  return canvasLayer;
};
