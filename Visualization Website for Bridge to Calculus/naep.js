const data2= d3.json('naep.json').then(data2=> {



    var margin = { top:100, right: 110, bottom: 50, left: 100 },
    width = 600 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
  
  // append svg object to the body of the page
  var container1 = d3
    .select("#charts")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Line Chart 1 (12th Grade) ---------------------------------------------
    {

    let parseDate = d3.timeParse("%Y")
    data2.forEach(function (d) {
        d.year = parseDate(d.year);
      });

      // List of groups (here I have one group per column)
    const allGroup = ["Asian", "White", "National_Average", "Hispanic","Black"]

      // Reformat the data: we need an array of arrays of {x, y} tuples
    const dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
        return {
          name: grpName,
          values: data2.map(function(d) {
            return {year: d.year, value: +d[grpName]};
          })
        };
      });
  
      console.log(dataReady)
    
    const myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(["#f0c62e", "#d4caa5", "#97bdc9", "#b02e07", "#1f1a19"]);

  // Add x-axis
  var x = d3.scaleTime()
                    .domain(d3.extent(data2,d=>d.year))
                    .rangeRound([0,width])
      container1
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .call((g) =>
          g
            .append("text")
            .attr("x", width)
            .attr("y", margin.bottom - 4)
            .attr("fill", "black")
            .attr("text-anchor", "end")
            .attr('font-size','11px')
            .attr('font-weight','bold')
            .text('Year')
        );
  
      //Add Y axis
      //var formatPercent = d3.format(".0%");
      var y = d3.scaleLinear()
                   .domain([0,90])
                   .rangeRound([height,0])
      //var axis = axisBottom(y1).tickFormat(format('~%'))
      
      container1
        .append("g")
        .call(d3.axisLeft(y))
        .call((g) =>
          g
            .append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .attr('font-size','11px')
            .attr('font-weight','bold')
            .text('% at or above Proficiency (12th Grade)')
          .attr('y',-25)
          .attr('x',-80)
        );

        const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(+d.value))
        container1.selectAll("myLines")
        .data(dataReady)
        .join("path")
          .attr("class", d => d.name)
          .attr("d", d => line(d.values))
          .attr("stroke", d => myColor(d.name))
          .style("stroke-width", 4)
          .style("fill", "none")

 /*
// Add the White line
container1.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "#d4caa5")
.attr("stroke-width", 2)
.attr("d", d3.line()
// adds segments
.x(function(d) { return x1(d.year) })
.y(function(d) { return y1(d["White"]) })
)
// Annotation White
container1.append('text')
         .attr('x', 410)
         .attr('y',200)
         .attr('font-size','13px')
         .text("White")
// Add Asian line
container1.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "#f0c62e")
.attr("stroke-width", 2)
.attr("d", d3.line()
// adds segments
.x(function(d) { return x1(d.year) })
.y(function(d) { return y1(d["Asian"]) })
)
// Annotation Asian
container1.append('text')
         .attr('x', 410)
         .attr('y',125)
         .attr('font-size','13px')
         .text("Asian")
// Add Hispanic line
container1.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "#b02e07")
.attr("stroke-width", 2)
.attr("d", d3.line()
// adds segments
.x(function(d) { return x1(d.year) })
.y(function(d) { return y1(d["Hispanic/Latino"])})
)
// Annotation Hispanic
container1.append('text')
         .attr('x', 410)
         .attr('y',260)
         .attr('font-size','13px')
         .text("Hispanic/Latino")
// Add Black line
container1.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "#1f1a19")
.attr("stroke-width", 2)
.attr("d", d3.line()
// adds segments
.x(function(d) { return x1(d.year) })
.y(function(d) { return y1(d["Black"])})
)
// Annotation Black
container1.append('text')
         .attr('x', 410)
         .attr('y',280)
         .attr('font-size','13px')
         .text("Black")
// Add State Average line
container1.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "#97bdc9")
.attr("stroke-width", 2)
.attr("d", d3.line()
// adds segments
.x(function(d) { return x1(d.year) })
.y(function(d) { return y1(d["National Average"])})
)
// Annotation Black
container1.append('text')
         .attr('x', 410)
         .attr('y',220)
         .attr('font-size','13px')
         .text("National Average")
*/

const Tooltip = d3.select("#charts")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

      // Three function that change the tooltip when user hover / move / leave a cell
      const mouseover = function(event,d) {
        Tooltip
          .style("opacity", 1)
          .attr("r", 8)
      }
      const mousemove = function(event,d) {
        Tooltip
          .html("Value: " + d.value + "%")
          .style("left", `${event.layerX+10}px`)
          .style("top", `${event.layerY}px`)
      }
      const mouseleave = function(event,d) {
        Tooltip
          .style("opacity", 0)
          .attr("r", 5)
      }


container1
// First we need to enter in a group
.selectAll("myDots")
.data(dataReady)
.join('g')
  .style("fill", d => myColor(d.name))
  .attr("class", d => d.name)
// Second we need to enter in the 'values' part of this group
.selectAll("myPoints")
.data(d => d.values)
.join("circle")
  .attr("cx", d => x(d.year))
  .attr("cy", d => y(d.value))
  .attr("r", 5)
  .attr("stroke", "white")
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)


container1
  .selectAll("myLabels")
  .data(dataReady)
  .join('g')
    .append("text")
      .attr("class", d => d.name)
      .datum(d => { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
      .attr("transform", d => `translate(${x(d.value.year)},${y(d.value.value)})`) // Put the text at the position of the last point
      .attr("x", 12) // shift the text a bit more right
      .text(d => d.name)
      .style("fill", d => myColor(d.name))
      .style("font-size", 12)



// Add one dot in the legend for each name.
var size = 15;
var toggleSelected = true;
container1.selectAll("mydots")
  .data(dataReady)
  .enter()
  .append("rect")
    .attr("x", 350)
    .attr("y", function(d,i){ return 5 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function(d){ return myColor(d)}) 
    .on("click", function(event,d){
        // is the element currently visible ?
        currentOpacity = d3.selectAll("." + d.name).style("opacity")
        // Change the opacity: from 0 to 1 or from 1 to 0
        d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)
  

        currentOpacity = d3.select(this).style("opacity")
        // Change the opacity: from 0 to 1 or from 1 to 0
        d3.select(this).transition().style("opacity", currentOpacity == 1 ? 0.25:1)
      //   if(toggleSelected == true) {
      //     d3.select(this).style("opacity", 0.3);
      //     toggleSelected = false;
      // } else {
      //     d3.select(this).style("opacity", 1);
      //     toggleSelected = true;
      // } 
      })

  


     

container1.selectAll("myLegend")
    .data(dataReady)
    //.enter()
    .join('g')
    .append("text")
      .attr("x", 350 + size*1.2)
      .attr("y", function(d,i){ return 5 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
      .text(d => d.name)
      .style("fill", d => myColor(d.name))
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
      // .on("click", function(event,d){
      //   // is the element currently visible ?
      //   currentOpacity = d3.selectAll("." + d.name).style("opacity")
      //   // Change the opacity: from 0 to 1 or from 1 to 0
      //   d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0:1)
        
        
      // })

      // const annotations = [
      //   {
      //     note: {
      //       label: "The worldwide total cases have hitted to 447,605,32, while the total death has increased to 721,766.",
      //       title: "2021-10-14"
      //     },
      //     x: width,
      //     y: 10,
      //     dx: 20,
      //     dy: 100
      //   }]  
      
      // const makeAnnotations = d3.annotation()
      //                 .type(d3.annotationLabel)
      //                 .annotations(annotations)
      
      // container1.append("g")
      // .attr("class", "annotation-group")
      // .call(makeAnnotations)
     }

   
    

});
// ==================================================================================================================
