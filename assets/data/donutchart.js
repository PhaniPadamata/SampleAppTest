
    alert("In Donut js file");
    var margin = {top: 20, right: 20, bottom: 20, left: 50},
      width = parseInt(d3.select("#chart").style("width")) - margin.left - margin.right,
      height = parseInt(d3.select("#chart").style("width")) - margin.top - margin.bottom,
      r = 90,
      inner = 90/2,
      color= d3.scale.ordinal()
      .range(["#124", "#214183", "#3061c2",  "#4876d1", "#87a5e1", "#c5d4f1"]);
    
      
  data = [{"label":"ONE", "value":194}, 
          {"label":"TWO", "value":567}, 
          {"label":"THREE", "value":1314},
          {"label":"FOUR", "value":793},
          {"label":"FIVE", "value":1929},
          {"label":"SIX", "value":1383}];
  
  var total = d3.sum(data, function(d) {
      return d3.sum(d3.values(d));
  });
  
   
   var svg = d3.select('#chart').append("svg:svg");
   var vis = svg.data([data])
           .attr("width", '100%')
           .attr("height", '100%')
           .attr('viewBox',(-width / 2 ) + ' ' + (-height/2) + ' '+width +' '+height)
           .attr('preserveAspectRatio','xMinYMin')
  
  
  var textTop = vis.append("text")
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .attr("class", "textTop")
      .text( "TOTAL" )
      .attr("y", -10),
  textBottom = vis.append("text")
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .attr("class", "textBottom")
      .text(total.toFixed(2) + "m")
      .attr("y", 10);
  
  var arc = d3.svg.arc()
      .innerRadius(inner)
      .outerRadius(r);
  
  var arcOver = d3.svg.arc()
      .innerRadius(inner+5)
      .outerRadius(r + 5);
   
  var pie = d3.layout.pie()
      .value(function(d) { return d.value; });
   
  var arcs = vis.selectAll("g.slice")
      .data(pie)
      .enter()
          .append("svg:g")
              .attr("class", "slice")
              .on("mouseover", function(d) {
                  d3.select(this).select("path").transition()
                      .duration(200)
                      .attr("d", arcOver)
                  
                  textTop.text(d3.select(this).datum().data.label)
                      .attr("y", -10);
                  textBottom.text(d3.select(this).datum().data.value.toFixed(2))
                      .attr("y", 10);
              })
              .on("mouseout", function(d) {
                  d3.select(this).select("path").transition()
                      .duration(100)
                      .attr("d", arc);
                  
                  textTop.text( "TOTAL" )
                      .attr("y", -10);
                  textBottom.text(total.toFixed(2) + "m");
              });
  
  arcs.append("svg:path")
      .attr("fill", function(d, i) { return color(i); } )
      .attr("d", arc);
  
  var legend = svg.append("svg")
      .attr("class", "legend")
      .attr("width", r)
      .attr("height", r * 2)
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + (r + 20) + "," + i * 20 + ")"; });
  
  legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) { return color(i); });
  
  legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(function(d) { return d.label; }); 
