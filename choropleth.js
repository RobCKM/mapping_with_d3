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


//Irish geoJSON based on https://gist.github.com/2183412
d3.json("ireland.json", function(json) {
  count = counties.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("class", "ireland")
      .attr("d", path);

      // counties.on("mouseover", function(d) { alert (d.id); })
});
 

d3.json("annual_values.json", function(json) {
  data = json;
  counties.selectAll("path")
      .attr("class", quantize)
      .attr("id", function(d){return d.properties.id})
      // .on("mouseover", function(d) { console.log(d.properties.id + " " + data[d.properties.id][year]); });
      .on("mouseover", function(d) {
        d3.select(this).attr('class', 'highlight');
      })                  
      .on("mouseout", function(d) {
        d3.select(this).attr("class", quantize);
      });

});
 
function quantize(d) {
  switch (year_key) {
    case 0:
      window.year = "y2003"
      return "q" + Math.min(8, ~~(data[d.properties.id].y2003 / 5)) + "-9";
      break;
    case 100:
      window.year = "y2004"
      return "q" + Math.min(8, ~~(data[d.properties.id].y2004 / 5)) + "-9";
      break;
    case 200:
      window.year = "y2005"
      return "q" + Math.min(8, ~~(data[d.properties.id].y2005 / 5)) + "-9";
      break;
    case 300:
      window.year = "y2006"
      return "q" + Math.min(8, ~~(data[d.properties.id].y2006 / 5)) + "-9";
      break; 
    case 400:
      window.year = "y2007"
      return "q" + Math.min(8, ~~(data[d.properties.id].y2007 / 5)) + "-9";
      break; 
    case 500:
      window.year = "y2008"
      return "q" + Math.min(8, ~~(data[d.properties.id].y2008 / 5)) + "-9";
      break; 
    case 600:
      window.year = "y2009"
      return "q" + Math.min(8, ~~(data[d.properties.id].y2009 / 5)) + "-9";
      break; 
    case 700:
      window.year = "y2010"
      return "q" + Math.min(8, ~~(data[d.properties.id].y2010 / 5)) + "-9";
      break; 
    case 800:
      window.year = "y2011"
      return "q" + Math.min(8, ~~(data[d.properties.id].y2011 / 5)) + "-9";
      break; 
    case 900:
      window.year = "y2012"
      return "q" + Math.min(8, ~~(data[d.properties.id].y2012 / 5)) + "-9";
      break;  
    case 1000:
      window.year = "y2013"
      return "q" + Math.min(8, ~~(data[d.properties.id].y2013 / 5)) + "-9";
      break; 
    case 1100:
      window.year = "y2014"
      return "q" + Math.min(8, ~~(data[d.properties.id].y2014 / 5)) + "-9";
      break; 
}
}


// Slider Code goes below here

// var w = 900, h = 500;
var wBlob = 100;
var hBlob = 100;
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

var years = [
{year:2003, x:"50px", y:"50px", t_year_key:100},
{year:2004, x:"150px", y:"50px", t_year_key:200},
{year:2005, x:"250px", y:"50px", t_year_key:300},
{year:2006, x:"350px", y:"50px", t_year_key:400},
{year:2007, x:"450px", y:"50px", t_year_key:500},
{year:2008, x:"550px", y:"50px", t_year_key:600},
{year:2009, x:"650px", y:"50px", t_year_key:700},
{year:2010, x:"750px", y:"50px", t_year_key:800},
{year:2011, x:"850px", y:"50px", t_year_key:900},
{year:2012, x:"950px", y:"50px", t_year_key:1000},
{year:2013, x:"1050px", y:"50px", t_year_key:1100},
{year:2014, x:"1150px", y:"50px", t_year_key:1200},
];

// Year headings with on click function for the years
text = d3.select("svg").selectAll("text")
        .data(years)
        .enter()
        .append("text")
        .text(function(d) { return d.year })
        .attr("x", function(d) { return d.x })
        .attr("y", function(d) { return d.y })
        .attr("dy", ".35em")
        .on('click', function(d)
{
    year_key = d.t_year_key;
    d3.json("annual_values.json", function(json) {
    data = json;
    counties.selectAll("path")
        .attr("class", quantize);
        });
    d3.selectAll('rect')
    .transition().duration([1000]).ease("elastic")
    .attr('x', function(d) {return (year_key-100)})
});


