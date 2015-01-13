var data; // loaded asynchronously
year_key = 0
// var year = "2004" 
//Albers projection values based on playing with ireland.json using D3's Albers Example
var proj = d3.geo.albers()
          .origin([-7.9,53.3])
          .scale(11000)
          .translate([365,485]);
var path = d3.geo.path().projection(proj);
 
var svg = d3.select("#chart")
  .append("svg");
 
var counties = svg.append("g")
    .attr("id", "ireland");



// var slider = d3.select("#slider_holder")
//   .append("svg")
//   .attr("height","100px");



//Irish geoJSON based on https://gist.github.com/2183412
d3.json("ireland.json", function(json) {
  counties.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("class", "ireland")
      .attr("d", path);
});
 

d3.json("annual_values.json", function(json) {
  data = json;
  counties.selectAll("path")
      .attr("class", quantize);
});
 
function quantize(d) {
  switch (year_key) {
    case 0:
      return "q" + Math.min(8, ~~(data[d.properties.id].y2003 / 5)) + "-9";
      break;
    case 100:
      return "q" + Math.min(8, ~~(data[d.properties.id].y2004 / 5)) + "-9";
      break;
    case 200:
      return "q" + Math.min(8, ~~(data[d.properties.id].y2005 / 5)) + "-9";
      break;
    case 300:
      return "q" + Math.min(8, ~~(data[d.properties.id].y2006 / 5)) + "-9";
      break; 
    case 400:
      return "q" + Math.min(8, ~~(data[d.properties.id].y2007 / 5)) + "-9";
      break; 
    case 500:
      return "q" + Math.min(8, ~~(data[d.properties.id].y2008 / 5)) + "-9";
      break; 
    case 600:
      return "q" + Math.min(8, ~~(data[d.properties.id].y2009 / 5)) + "-9";
      break; 
    case 700:
      return "q" + Math.min(8, ~~(data[d.properties.id].y2010 / 5)) + "-9";
      break; 
    case 800:
      return "q" + Math.min(8, ~~(data[d.properties.id].y2011 / 5)) + "-9";
      break; 
    case 900:
      return "q" + Math.min(8, ~~(data[d.properties.id].y2012 / 5)) + "-9";
      break;  
    case 1000:
      return "q" + Math.min(8, ~~(data[d.properties.id].y2013 / 5)) + "-9";
      break; 
    case 1100:
      return "q" + Math.min(8, ~~(data[d.properties.id].y2014 / 5)) + "-9";
      break; 
}
}


// Slider Code goes below here

// var w = 900, h = 500;
var wBlob = 100;
var hBlob = 100;
// var vis = d3.select('body').append('svg:svg').attr('width', w).attr('height', h);
var data = [{x: 0, y: 0, px: 0, py: 0, col: 0, row: 0, width: wBlob, height: wBlob}, /*{x: 100, y: 0, px: 100, py: 0, col: 1, row: 0, width: wBlob, height: hBlob}*/
           ];
var helperData = [{}];
var helper;
var rightclick;
var drag = d3.behavior.drag().origin(function(d) { return d; });

function createHelper(x, y){
  helperData = [{}];
  helper = svg.insert('rect', ":first-child")
    .attr('class', 'helper')
    .attr('x', x)
    .attr('y', y)
    .attr('width', wBlob)
    .attr('height', hBlob); 
};

drag.on('dragstart', function(d){
  if (rightclick)  {
    rightclick = false;
    return;
  }
  d.px = d.x;
  d.py = d.y;
  console.log('dragstart');
  d3.selectAll('.helper').remove();
  createHelper(d.x, d.y);

  
});

drag.on('dragend', function(d){
  console.log('dragend');
   if (helperData.col !=null)
   d.col = helperData.col;
  
   if (helperData.row !=null)
   d.row = helperData.row;
   
   (helperData.x != null)? d.x = helperData.x: d.x = d.px;
   (helperData.y != null)? d.y = helperData.y: d.y = d.py;
  
   helper.transition().remove();
   d3.select(this).transition()
     .duration(100)
     .attr('x', d.x)
     .attr('y', d.y)
   .each('end', function(){});
    
});

drag.on('drag', function(d,i){
  var hx = Math.round((d.x)/100)*100;
  var hy = 0;
  /*var hy = Math.round((d.y)/100)*100;*/
  helperData.x = hx;
  helperData.y = hy;
  helperData.col = hx/100;
  helperData.row = hy/100;
  d3.select(this).attr('x', d.x = d3.event.x).attr('y', d.y = d3.event.y);
  helper.attr('x', hx).attr('y', hy);
  console.log(hx);
//Slider code below 
  year_key = hx;
  d3.json("annual_values.json", function(json) {
  data = json;
  counties.selectAll("path")
      .attr("class", quantize);
});
  

});


var blobs = svg.selectAll('.blob').data(data)
  .enter()
  .append('rect')
  .attr('class', 'blob')
  .attr('width', function(d){return d.width;})
  .attr('height', function(d){return d.height;})
  .attr('x', function(d){return d.x;})
.attr('y', function(d){return d.y;}).on('contextmenu', function(){d3.event.preventDefault()}).call(drag);

// Year text Code goes below here

// To Do!!!:On click function for the years

svg.append("text")
    .attr("x", "50px")
    .attr("y", "50px")
    .attr("dy", ".35em")
    .text("2003");

svg.append("text")
    .attr("x", "150px")
    .attr("y", "50px")
    .attr("dy", ".35em")
    .text("2004");

svg.append("text")
    .attr("x", "250px")
    .attr("y", "50px")
    .attr("dy", ".35em")
    .text("2005");

svg.append("text")
    .attr("x", "350px")
    .attr("y", "50px")
    .attr("dy", ".35em")
    .text("2006");

svg.append("text")
    .attr("x", "450px")
    .attr("y", "50px")
    .attr("dy", ".35em")
    .text("2007");

svg.append("text")
    .attr("x", "550px")
    .attr("y", "50px")
    .attr("dy", ".35em")
    .text("2008");

svg.append("text")
    .attr("x", "650px")
    .attr("y", "50px")
    .attr("dy", ".35em")
    .text("2009");

svg.append("text")
    .attr("x", "750px")
    .attr("y", "50px")
    .attr("dy", ".35em")
    .text("2010");

svg.append("text")
    .attr("x", "850px")
    .attr("y", "50px")
    .attr("dy", ".35em")
    .text("2011");
