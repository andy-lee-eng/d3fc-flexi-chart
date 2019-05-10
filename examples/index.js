// const flexi = fcFlexi.flexiChart();
// d3.select('#content').call(flexi);

var sinCos = d3.range(50).map((d) => ({
  x: d / 4,
  y: Math.sin(d / 4),
  z: Math.cos(d / 4) * 0.7
}));
var bars1 = [
  {x: 1.5, y: 22},
  {x: 2, y: 30},
  {x: 4, y: 15},
  {x: 7, y: 5},
  {x: 10, y: 41},
  {x: 11, y: 27},
];
var bars2 = [
  {x: 1, y: 35},
  {x: 3, y: 10},
  {x: 4.5, y: 42},
  {x: 6, y: 51},
  {x: 8.5, y: 13},
  {x: 9, y: 86},
];
var data = {
  sinCos,
  bars1,
  bars2
};

// gridlines (from d3fc-annotation)
var gridlinesSvg = fc.annotationSvgGridline();
var lineSvg = fc.seriesSvgLine();
var areaSvg = fc.seriesSvgArea()
  .mainValue(d => d.z);

var multiSvg = fc.seriesSvgMulti()
  .series([gridlinesSvg, areaSvg, lineSvg]);

const bar1Color = 'rgba(255, 0, 0, 0.3)';
var bar1Canvas = fc.seriesCanvasBar()
  .bandwidth(10)
  .decorate(context => context.fillStyle = bar1Color);
const bar2Color = 'rgba(0, 0, 255, 0.3)';
var bar2Canvas = fc.seriesCanvasBar()
  .bandwidth(10)
  .decorate(context => context.fillStyle = bar2Color);
  
var chart = fcFlexi.chart()
  .bottomLabel('Value')
  .rightLabel('Bars 1 and 2')
  .leftLabel('Sine / Cosine')
  .layers(
    fcFlexi.svgLayer(d3.scaleLinear(), d3.scaleLinear())
      .yOrient('left')
      .yDomain([-1.1, 1.1])
      .xDomain([0, 12])
      .plotArea(multiSvg),
    fcFlexi.canvasLayer(d3.scaleLinear(), d3.scaleLinear())
      .xOrient('none')
      .yDomain([0, 100])
      .xDomain([0, 12])
      .plotArea(bar1Canvas)
      .yDecorate(s => {
        d3.select(s.node().parentNode).selectAll('path').style('stroke-width', '2px').style('stroke', bar1Color);
        s.selectAll('text').style('stroke', bar1Color);
      }),
    fcFlexi.canvasLayer(d3.scaleLinear(), d3.scaleLinear())
      .xOrient('none')
      .yDomain([0, 200])
      .xDomain([0, 12])
      .plotArea(bar2Canvas)
      .yDecorate(s => {
        d3.select(s.node().parentNode).selectAll('path').style('stroke-width', '2px').style('stroke', bar2Color);
        s.selectAll('text').style('stroke', bar2Color);
      })
  )
  .map((data, index) => {
    switch(index)
    {
      case 0:
        return sinCos;
      case 1:
        return bars1;
      case 2:
        return bars2;
    }
  })
  .decorate(s => {
    s.select('.right-label').style('color', 'rgb(150, 0, 0)');
  });
  
// render
d3.select('#content')
  .datum(data)
  .call(chart);
