// const flexi = fcFlexi.flexiChart();
// d3.select('#content').call(flexi);

var data = d3.range(50).map((d) => ({
  x: d / 4,
  y: Math.sin(d / 4),
  z: Math.cos(d / 4) * 0.7
}));

// use d3fc-extent to compute the domain for each axis
var xExtent = fc.extentLinear()
  .accessors([d => d.x]);
var yExtent = fc.extentLinear()
  .accessors([d => d.y, d => d.z])
  .pad([0.1, 0.1]);

// gridlines (from d3fc-annotation)
var gridlinesSvg = fc.annotationSvgGridline();
var lineSvg = fc.seriesSvgLine();
var areaSvg = fc.seriesSvgArea()
  .mainValue(d => d.z);

var multiSvg = fc.seriesSvgMulti()
  .series([gridlinesSvg, areaSvg, lineSvg]);

var chart = fcFlexi.chart()
  .leftLabel('Sine / Cosine')
  .bottomLabel('Value')
  .layers(
    fcFlexi.svgLayer(d3.scaleLinear(), d3.scaleLinear())
      .yOrient('left')
      .yDomain(yExtent(data))
      .xDomain(xExtent(data))
      .plotArea(multiSvg)
  );

var cartesian = fc.chartSvgCartesian(
  d3.scaleLinear(),
  d3.scaleLinear()
)
  .yLabel('Sine / Cosine')
  .xLabel('Value')
  .yOrient('left')
  .yDomain(yExtent(data))
  .xDomain(xExtent(data))
  .plotArea(multiSvg);

// render
d3.select('#chart')
  .datum(data)
  .call(chart);
d3.select('#cartesian')
  .datum(data)
  .call(cartesian);
