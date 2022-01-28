//MCAS Vis


const data= d3.json('mcas.json').then(data=> {
  
  var margin = { top:100, right: 100, bottom: 50, left: 100 },
  width = 600 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;
  
  // append 2 svg object to the body of the page
  var container1 = d3
  .select("#chart1")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
  
  //Line Chart 1 (4th Grade) ---------------------------------------------
  
  
  let parseDate = d3.timeParse("%Y")
  data.forEach(function (d) {
    d.year = parseDate(d.year);
  });
  
  function addXAxis(container) {
    // Add x-axis
    var x1 = d3.scaleTime()
    .domain(d3.extent(data,d=>d.year))
    .rangeRound([0,width])
    container
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x1))
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
    return x1
  }
  
  x1 = addXAxis(container1)
  
  function addYAxis(container, grade) {
    //Add Y axis
    var y1 = d3.scaleLinear()
    .domain([0,90])
    .rangeRound([height,0])
    // format as percentage??
    
    container
    .append("g")
    .call(d3.axisLeft(y1))
    .call((g) =>
    g
    .append("text")
    .attr("x", -margin.left)
    .attr("y", 10)
    .attr("fill", "black")
    .attr("text-anchor", "start")
    .attr('font-size','12px')
    .attr('font-weight','bold')
    .text('% at or above Proficiency (' + grade + ' Grade)')
    .attr('y',-25)
    .attr('x',-80)
    );
    return y1
  }
  
  y1 = addYAxis(container1, "4th")
  
  // ===========================================================
  // LINES FUNCTIONS
  
  function addWhiteLine4th() {
    // Add the White line
    var white = container1.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#d4caa5")
    .attr("stroke-width", 2)
    .style("opacity", 1.0)
    .attr("d", d3.line()
    // adds segments
    .x(function(d) { return x1(d.year) })
    .y(function(d) { return y1(d.White) })
    )
    
    // Annotation White
    container1.append('text')
    .attr('x', 410)
    .attr('y',100)
    .attr('font-size','13px')
    .text("White")
    
    return white
  }
  
  function addAsianLine4th() {
    // Add Asian line
    var asian = container1.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#f0c62e")
    .attr("stroke-width", 2)
    .style("opacity", 1.0)
    .attr("d", d3.line()
    // adds segments
    .x(function(d) { return x1(d.year) })
    .y(function(d) { return y1(d.Asian) })
    )
    
    // Annotation Asian
    container1.append('text')
    .attr('x', 410)
    .attr('y',65)
    .attr('font-size','13px')
    .text("Asian")
    
    return asian
  }
  
  function addHispanicLine4th() {
    // Add Hispanic line
    var hispanic = container1.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#9F2B68")
    .attr("stroke-width", 2)
    .style("opacity", 1.0)
    .attr("d", d3.line()
    // adds segments
    .x(function(d) { return x1(d.year) })
    .y(function(d) { return y1(d["Hispanic/Latino"])})
    )
    
    // Annotation Hispanic
    container1.append('text')
    .attr('x', 410)
    .attr('y',230)
    .attr('font-size','13px')
    .text("Hispanic")
    
    return hispanic
  }
  
  function addBlackLine4th() {
    // Add Black line
    var black = container1.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#1f1a19")
    .attr("stroke-width", 2)
    .style("opacity", 1.0)
    .attr("d", d3.line()
    // adds segments
    .x(function(d) { return x1(d.year) })
    .y(function(d) { return y1(d["Black"])})
    )
    
    // Annotation Black
    container1.append('text')
    .attr('x', 410)
    .attr('y',260)
    .attr('font-size','13px')
    .text("Black")
    
    return black
  }
  
  function addStateAvg4th() {
    // Add State Average line
    var stateavg= container1.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#97bdc9")
    .attr("stroke-width", 2)
    .style("opacity", 1.0)
    .attr("d", d3.line()
    // adds segments
    .x(function(d) { return x1(d.year) })
    .y(function(d) { return y1(d["State Average"])})
    )
    
    // Annotation State Average
    container1.append('text')
    .attr('x', 410)
    .attr('y',135)
    .attr('font-size','13px')
    .text("State Average")
    
    return stateavg
  }
  
  white = addWhiteLine4th()
  asian = addAsianLine4th()
  hispanic = addHispanicLine4th()
  black = addBlackLine4th()
  stateavg4 = addStateAvg4th()
  
  // ===========================================================
  
  
  
  // ===========================================================
  // CIRCLES FUNCTIONS
  
  // create a tooltip
  
  
  function addBlackCircles4th() {
    var blackCircles4 = container1
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr('cy', d=>y1(d["Black"]))
    .attr('cx', d=>x1(d.year))
    .attr("r", 3)
    .style("fill", "#1f1a19")
    .style("opacity", 1.0)
    .on("mouseover", hoverOnCircleBlack4)
    .on("mouseout", revertBlackCircles)
    return blackCircles4
  }
  
  function addHispanicCircles4th() {
    var hispanicCircles4 = container1
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr('cy', d=>y1(d["Hispanic/Latino"]))
    .attr('cx', d=>x1(d.year))
    .attr("r", 3)
    .style("fill", "#9F2B68")
    .style("opacity", 1.0)
    .on("mouseover", hoverOnCircleHispanic4)
    .on("mouseout", revertHispanicCircles)
    return hispanicCircles4
  }
  
  function addWhiteCircles4th() {
    var whiteCircles4 = container1
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr('cy', d=>y1(d["White"]))
    .attr('cx', d=>x1(d.year))
    .attr("r", 3)
    .style("fill", "#d4caa5")
    .style("opacity", 1.0)
    .on("mouseover", hoverOnCircleWhite4)
    .on("mouseout", revertWhiteCircles)
    return whiteCircles4
  }
  
  function addAsianCircles4th() {
    var asianCircles4 = container1
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr('cy', d=>y1(d["Asian"]))
    .attr('cx', d=>x1(d.year))
    .attr("r", 3)
    .style("fill", "#f0c62e")
    .style("opacity", 1.0)
    .on("mouseover", hoverOnCircleAsian4)
    .on("mouseout", revertAsianCircles)
    return asianCircles4
  }
  
  function addStateAvgCircles4th() {
    var stateAvgCircles4 = container1
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr('cy', d=>y1(d["State Average"]))
    .attr('cx', d=>x1(d.year))
    .attr("r", 3)
    .style("fill", "#97bdc9")
    .style("opacity", 1.0)
    .on("mouseover", hoverOnCircleStateAvg4)
    .on("mouseout", revertStateAvgCircles)
    return stateAvgCircles4
  }
  
  blackCircles4 = addBlackCircles4th()
  whiteCircles4 = addWhiteCircles4th()
  asianCircles4 = addAsianCircles4th()
  hispanicCircles4 = addHispanicCircles4th()
  stateAvgCircles4 = addStateAvgCircles4th()
  
  var stateAvgDict4 = createCircleDict(stateAvgCircles4)
  var blackDict4 = createCircleDict(blackCircles4)
  var asianDict4 = createCircleDict(asianCircles4)
  var hispanicDict4 = createCircleDict(hispanicCircles4)
  var whiteDict4 = createCircleDict(whiteCircles4)
  
  
  var tooltip4div = d3.select("#chart1-container").append("div")
  .attr("class", "tooltip-donut")
  .style("opacity", 0)
  var tooltip8div = d3.select("#chart2-container").append("div")
  .attr("class", "tooltip-donut")
  .style("opacity", 0)
  
  tooltip_offset_x = 460
  tooltip_offset_y = 540
  enlargedCircleSize = 8
  
  
  function hoverOnCircleStateAvg4(d, i) {
    
    year = d3.timeFormat('%Y')(i.year)
    
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", enlargedCircleSize)
    
    // so we need a dictionary for each line and a hover function for each line as well...but no time for simplification yet
    correspondingCircle = stateAvgDict8[year]
    
    console.log(correspondingCircle)
    
    d3.select(correspondingCircle)
    .transition()
    .duration(300)
    .attr("r", enlargedCircleSize)
    
    // use the x and y of this!!
    tooltip4div.html(i["State Average"] + "%")
    .style("opacity", 1)
    .style("left", (this.cx.animVal.value + tooltip_offset_x) + "px")
    .style("top", (this.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    difference = i["State Average 8"] - i["State Average"]
    
    tooltip8div
    .style("opacity", 1)
    .style("left", (correspondingCircle.cx.animVal.value + tooltip_offset_x + 635) + "px")
    .style("top", (correspondingCircle.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    if (difference < 0) {
      console.log("Decrease!")
      tooltip8div.html(i["State Average 8"] + " (↓ " + Math.abs(difference) + "%)")
      tooltip8div.style("color", "#FF0000")
    } else {
      console.log("Increase!")
      tooltip8div.html(i["State Average 8"] + " (↑ " + Math.abs(difference) + "%)")
      tooltip8div.style("color", "#31c43b")
    }
    
    
    
    
    // now create the dictionaries and functions for each circle group
    
    
    // for bars, just fix tooltip and style
    
    // then include information about the MCAS, why no 2015/2016, informational stuff
    
  }
  
  function revertStateAvgCircles(d, i) {
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", 3)
    
    d3.select(stateAvgDict8[year])
    .transition()
    .duration(200)
    .attr("r", 3)
    
    clearTooltips()
  }
  
  function hoverOnCircleWhite4(d, i) {
    race4 = "White"
    race8 = "White 8"
    circleDict = whiteDict8
    year = d3.timeFormat('%Y')(i.year)
    
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", enlargedCircleSize)
    
    correspondingCircle = circleDict[year]
    
    d3.select(correspondingCircle)
    .transition()
    .duration(300)
    .attr("r", enlargedCircleSize)
    
    tooltip4div.html(i[race4] + "%")
    .style("opacity", 1)
    .style("left", (this.cx.animVal.value + tooltip_offset_x) + "px")
    .style("top", (this.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    difference = i[race8] - i[race4]
    
    tooltip8div
    .style("opacity", 1)
    .style("left", (correspondingCircle.cx.animVal.value + tooltip_offset_x + 635) + "px")
    .style("top", (correspondingCircle.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    if (difference < 0) {
      console.log("Decrease!")
      tooltip8div.html(i[race8] + " (↓ " + Math.abs(difference) + "%)")
      tooltip8div.style("color", "#FF0000")
    } else {
      console.log("Increase!")
      tooltip8div.html(i[race8] + " (↑ " + Math.abs(difference) + "%)")
      tooltip8div.style("color", "#31c43b")
    }
    
    
  }
  
  function revertWhiteCircles(d, i) {
    circleDict = whiteDict8
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", 3)
    
    d3.select(circleDict[year])
    .transition()
    .duration(200)
    .attr("r", 3)
    
    clearTooltips()
  }
  
  function hoverOnCircleAsian4(d, i) {
    race4 = "Asian"
    race8 = "Asian 8"
    circleDict = asianDict8
    year = d3.timeFormat('%Y')(i.year)
    
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", enlargedCircleSize)
    
    correspondingCircle = circleDict[year]
    
    d3.select(correspondingCircle)
    .transition()
    .duration(300)
    .attr("r", enlargedCircleSize)
    
    tooltip4div.html(i[race4] + "%")
    .style("opacity", 1)
    .style("left", (this.cx.animVal.value + tooltip_offset_x) + "px")
    .style("top", (this.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    difference = i[race8] - i[race4]
    
    tooltip8div
    .style("opacity", 1)
    .style("left", (correspondingCircle.cx.animVal.value + tooltip_offset_x + 635) + "px")
    .style("top", (correspondingCircle.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    if (difference < 0) {
      console.log("Decrease!")
      tooltip8div.html(i[race8] + " (↓ " + Math.abs(difference) + "%)")
      tooltip8div.style("color", "#FF0000")
    } else {
      console.log("Increase!")
      tooltip8div.html(i[race8] + " (↑ " + Math.abs(difference) + "%)")
      tooltip8div.style("color", "#31c43b")
    }
    
    
  }
  
  function revertAsianCircles(d, i) {
    circleDict = asianDict8
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", 3)
    
    d3.select(circleDict[year])
    .transition()
    .duration(200)
    .attr("r", 3)
    
    clearTooltips()
  }
  
  function hoverOnCircleBlack4(d, i) {
    race4 = "Black"
    race8 = "Black 8"
    circleDict = blackDict8
    year = d3.timeFormat('%Y')(i.year)
    
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", enlargedCircleSize)
    
    correspondingCircle = circleDict[year]
    
    d3.select(correspondingCircle)
    .transition()
    .duration(300)
    .attr("r", enlargedCircleSize)
    
    tooltip4div.html(i[race4] + "%")
    .style("opacity", 1)
    .style("left", (this.cx.animVal.value + tooltip_offset_x) + "px")
    .style("top", (this.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    difference = i[race8] - i[race4]
    
    tooltip8div
    .style("opacity", 1)
    .style("left", (correspondingCircle.cx.animVal.value + tooltip_offset_x + 635) + "px")
    .style("top", (correspondingCircle.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    if (difference < 0) {
      console.log("Decrease!")
      tooltip8div.html(i[race8] + " (↓ " + Math.abs(difference) + "%)")
      tooltip8div.style("color", "#FF0000")
    } else {
      console.log("Increase!")
      tooltip8div.html(i[race8] + " (↑ " + Math.abs(difference) + "%)")
      tooltip8div.style("color", "#31c43b")
    }
    
    
  }
  
  function revertBlackCircles(d, i) {
    circleDict = blackDict8
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", 3)
    
    d3.select(circleDict[year])
    .transition()
    .duration(200)
    .attr("r", 3)
    
    clearTooltips()
  }
  
  function hoverOnCircleHispanic4(d, i) {
    race4 = "Hispanic/Latino"
    race8 = "Hispanic/Latino 8"
    circleDict = hispanicDict8
    year = d3.timeFormat('%Y')(i.year)
    
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", enlargedCircleSize)
    
    correspondingCircle = circleDict[year]
    
    d3.select(correspondingCircle)
    .transition()
    .duration(300)
    .attr("r", enlargedCircleSize)
    
    tooltip4div.html(i[race4] + "%")
    .style("opacity", 1)
    .style("left", (this.cx.animVal.value + tooltip_offset_x) + "px")
    .style("top", (this.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    difference = i[race8] - i[race4]
    
    tooltip8div
    .style("opacity", 1)
    .style("left", (correspondingCircle.cx.animVal.value + tooltip_offset_x + 635) + "px")
    .style("top", (correspondingCircle.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    if (difference < 0) {
      console.log("Decrease!")
      tooltip8div.html(i[race8] + " (↓ " + Math.abs(difference) + "%)")
      tooltip8div.style("color", "#FF0000")
    } else {
      console.log("Increase!")
      tooltip8div.html(i[race8] + " (↑ " + Math.abs(difference) + "%)")
      tooltip8div.style("color", "#31c43b")
    }
    
    
  }
  
  function revertHispanicCircles(d, i) {
    circleDict = hispanicDict8
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", 3)
    
    d3.select(circleDict[year])
    .transition()
    .duration(200)
    .attr("r", 3)
    
    clearTooltips()
  }
  // =======================================================================================================
  // 8th Grade Chart
  // =======================================================================================================
  var container2 = d3
  .select("#chart2")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  
  // Add x-axis
  x2 = addXAxis(container2)
  // Add y axis
  y2 = addYAxis(container2, "8th")
  
  // LINE FUNCTIONS
  function addWhiteLine8th() {
    // Add the White line
    var white = container2.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#d4caa5")
    .attr("stroke-width", 2)
    .style("opacity", 1.0)
    .attr("d", d3.line()
    // adds segments
    .x(function(d) { return x2(d.year) })
    .y(function(d) { return y2(d["White 8"]) })
    )
    
    // Annotation White
    container2.append('text')
    .attr('x', 410)
    .attr('y',100)
    .attr('font-size','13px')
    .text("White")
    
    return white
  }
  function addAsianLine8th() {
    // Add Asian line
    var asian = container2.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#f0c62e")
    .attr("stroke-width", 2)
    .style("opacity", 1.0)
    .attr("d", d3.line()
    // adds segments
    .x(function(d) { return x2(d.year) })
    .y(function(d) { return y2(d["Asian 8"]) })
    )
    
    // Annotation Asian
    container2.append('text')
    .attr('x', 410)
    .attr('y',55)
    .attr('font-size','13px')
    .text("Asian")
    
    return asian
  }
  
  function addHispanicLine8th() {
    // Add Hispanic line
    var hispanic = container2.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#9F2B68")
    .attr("stroke-width", 2)
    .style("opacity", 1.0)
    .attr("d", d3.line()
    // adds segments
    .x(function(d) { return x2(d.year) })
    .y(function(d) { return y2(d["Hispanic/Latino 8"])})
    )
    
    // Annotation Hispanic
    container2.append('text')
    .attr('x', 410)
    .attr('y',215)
    .attr('font-size','13px')
    .text("Hispanic")
    
    return hispanic
  }
  
  function addBlackLine8th() {
    // Add Black line
    var black = container2.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#1f1a19")
    .attr("stroke-width", 2)
    .style("opacity", 1.0)
    .attr("d", d3.line()
    // adds segments
    .x(function(d) { return x2(d.year) })
    .y(function(d) { return y2(d["Black 8"])})
    )
    
    // Annotation Black
    container2.append('text')
    .attr('x', 410)
    .attr('y',250)
    .attr('font-size','13px')
    .text("Black")
    
    return black
  }
  
  function addStateAvg8th() {
    // Add State Average line
    var stateavg= container2.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#97bdc9")
    .attr("stroke-width", 2)
    .style("opacity", 1.0)
    .attr("d", d3.line()
    // adds segments
    .x(function(d) { return x2(d.year) })
    .y(function(d) { return y2(d["State Average 8"])})
    )
    
    // Annotation State Average
    container2.append('text')
    .attr('x', 410)
    .attr('y',145)
    .attr('font-size','13px')
    .text("State Average")
    
    return stateavg
  }
  
  
  // Add Lines
  white8 = addWhiteLine8th()
  black8 = addBlackLine8th()
  asian8 = addAsianLine8th()
  hispanic8 = addHispanicLine8th()
  stateavg8 = addStateAvg8th()
  
  function addBlackCircles8th() {
    var blackCircles8 = container2
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr('cy', d=>y2(d["Black 8"]))
    .attr('cx', d=>x2(d.year))
    .attr("r", 3)
    .style("fill", "#1f1a19")
    .style("opacity", 1.0)
    .on("mouseover", hoverOnCircleBlack8)
    .on("mouseout", revertBlackCircles8)
    
    return blackCircles8
  }
  
  function addHispanicCircles8th() {
    var hispanicCircles8 = container2
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr('cy', d=>y2(d["Hispanic/Latino 8"]))
    .attr('cx', d=>x2(d.year))
    .attr("r", 3)
    .style("fill", "#9F2B68")
    .style("opacity", 1.0)
    .on("mouseover", hoverOnCircleHispanic8)
    .on("mouseout", revertHispanicCircles8)
    
    return hispanicCircles8
  }
  
  function addWhiteCircles8th() {
    var whiteCircles8 = container2
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr('cy', d=>y2(d["White 8"]))
    .attr('cx', d=>x2(d.year))
    .attr("r", 3)
    .style("fill", "#d4caa5")
    .style("opacity", 1.0)
    .on("mouseover", hoverOnCircleWhite8)
    .on("mouseout", revertWhiteCircles8)
    
    return whiteCircles8
  }
  
  function addAsianCircles8th() {
    var asianCircles8 = container2
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr('cy', d=>y2(d["Asian 8"]))
    .attr('cx', d=>x2(d.year))
    .attr("r", 3)
    .style("fill", "#f0c62e")
    .style("opacity", 1.0)
    .on("mouseover", hoverOnCircleAsian8)
    .on("mouseout", revertAsianCircles8)
    
    return asianCircles8
  }
  
  function addStateAvgCircles8th() {
    var stateAvgCircles8 = container2
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr('cy', d=>y2(d["State Average 8"]))
    .attr('cx', d=>x2(d.year))
    .attr("r", 3)
    .style("fill", "#97bdc9")
    .style("opacity", 1.0)
    .on("mouseover", hoverOnCircleStateAverage8)
    .on("mouseout", revertStateAverageCircles8)
    
    return stateAvgCircles8
  }
  
  blackCircles8 = addBlackCircles8th()
  whiteCircles8 = addWhiteCircles8th()
  asianCircles8 = addAsianCircles8th()
  hispanicCircles8 = addHispanicCircles8th()
  stateAvgCircles8 = addStateAvgCircles8th()
  
  function hoverOnCircleHispanic8(d, i) {
    race4 = "Hispanic/Latino"
    race8 = "Hispanic/Latino 8"
    circleDict = hispanicDict4
    year = d3.timeFormat('%Y')(i.year)
    
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", enlargedCircleSize)
    
    correspondingCircle = circleDict[year]
    
    d3.select(correspondingCircle)
    .transition()
    .duration(300)
    .attr("r", enlargedCircleSize)
    
    tooltip8div.html(i[race8] + "%")
    .style("opacity", 1)
    .style("left", (this.cx.animVal.value + tooltip_offset_x + 635) + "px")
    .style("top", (this.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    difference = i[race4] - i[race8]
    
    tooltip4div
    .style("opacity", 1)
    .style("left", (correspondingCircle.cx.animVal.value + tooltip_offset_x) + "px")
    .style("top", (correspondingCircle.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    if (difference < 0) {
      console.log("Decrease!")
      tooltip4div.html(i[race4] + " (↓ " + Math.abs(difference) + "%)")
      tooltip4div.style("color", "#FF0000")
    } else {
      console.log("Increase!")
      tooltip4div.html(i[race4] + " (↑ " + Math.abs(difference) + "%)")
      tooltip4div.style("color", "#31c43b")
    }
    
    
  }
  
  function revertHispanicCircles8(d, i) {
    circleDict = hispanicDict4
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", 3)
    
    d3.select(circleDict[year])
    .transition()
    .duration(200)
    .attr("r", 3)
    
    clearTooltips()
  }
  
  function hoverOnCircleBlack8(d, i) {
    race4 = "Black"
    race8 = "Black 8"
    circleDict = blackDict4
    year = d3.timeFormat('%Y')(i.year)
    
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", enlargedCircleSize)
    
    correspondingCircle = circleDict[year]
    
    d3.select(correspondingCircle)
    .transition()
    .duration(300)
    .attr("r", enlargedCircleSize)
    
    tooltip8div.html(i[race8] + "%")
    .style("opacity", 1)
    .style("left", (this.cx.animVal.value + tooltip_offset_x + 635) + "px")
    .style("top", (this.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    difference = i[race4] - i[race8]
    
    tooltip4div
    .style("opacity", 1)
    .style("left", (correspondingCircle.cx.animVal.value + tooltip_offset_x) + "px")
    .style("top", (correspondingCircle.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    if (difference < 0) {
      console.log("Decrease!")
      tooltip4div.html(i[race4] + " (↓ " + Math.abs(difference) + "%)")
      tooltip4div.style("color", "#FF0000")
    } else {
      console.log("Increase!")
      tooltip4div.html(i[race4] + " (↑ " + Math.abs(difference) + "%)")
      tooltip4div.style("color", "#31c43b")
    }
    
    
  }
  
  function revertBlackCircles8(d, i) {
    circleDict = blackDict4
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", 3)
    
    d3.select(circleDict[year])
    .transition()
    .duration(200)
    .attr("r", 3)
    
    clearTooltips()
  }
  
  function hoverOnCircleStateAverage8(d, i) {
    race4 = "State Average"
    race8 = "State Average 8"
    circleDict = stateAvgDict4
    year = d3.timeFormat('%Y')(i.year)
    
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", enlargedCircleSize)
    
    correspondingCircle = circleDict[year]
    
    d3.select(correspondingCircle)
    .transition()
    .duration(300)
    .attr("r", enlargedCircleSize)
    
    tooltip8div.html(i[race8] + "%")
    .style("opacity", 1)
    .style("left", (this.cx.animVal.value + tooltip_offset_x + 635) + "px")
    .style("top", (this.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    difference = i[race4] - i[race8]
    
    tooltip4div
    .style("opacity", 1)
    .style("left", (correspondingCircle.cx.animVal.value + tooltip_offset_x) + "px")
    .style("top", (correspondingCircle.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    if (difference < 0) {
      console.log("Decrease!")
      tooltip4div.html(i[race4] + " (↓ " + Math.abs(difference) + "%)")
      tooltip4div.style("color", "#FF0000")
    } else {
      console.log("Increase!")
      tooltip4div.html(i[race4] + " (↑ " + Math.abs(difference) + "%)")
      tooltip4div.style("color", "#31c43b")
    }
    
    
  }
  
  function revertStateAverageCircles8(d, i) {
    circleDict = stateAvgDict4
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", 3)
    
    d3.select(circleDict[year])
    .transition()
    .duration(200)
    .attr("r", 3)
    
    clearTooltips()
  }
  
  function hoverOnCircleWhite8(d, i) {
    race4 = "White"
    race8 = "White 8"
    circleDict = whiteDict4
    year = d3.timeFormat('%Y')(i.year)
    
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", enlargedCircleSize)
    
    correspondingCircle = circleDict[year]
    
    d3.select(correspondingCircle)
    .transition()
    .duration(300)
    .attr("r", enlargedCircleSize)
    
    tooltip8div.html(i[race8] + "%")
    .style("opacity", 1)
    .style("left", (this.cx.animVal.value + tooltip_offset_x + 635) + "px")
    .style("top", (this.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    difference = i[race4] - i[race8]
    
    tooltip4div
    .style("opacity", 1)
    .style("left", (correspondingCircle.cx.animVal.value + tooltip_offset_x) + "px")
    .style("top", (correspondingCircle.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    if (difference < 0) {
      console.log("Decrease!")
      tooltip4div.html(i[race4] + " (↓ " + Math.abs(difference) + "%)")
      tooltip4div.style("color", "#FF0000")
    } else {
      console.log("Increase!")
      tooltip4div.html(i[race4] + " (↑ " + Math.abs(difference) + "%)")
      tooltip4div.style("color", "#31c43b")
    }
    
    
  }
  
  function revertWhiteCircles8(d, i) {
    circleDict = whiteDict4
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", 3)
    
    d3.select(circleDict[year])
    .transition()
    .duration(200)
    .attr("r", 3)
    
    clearTooltips()
  }
  
  function hoverOnCircleAsian8(d, i) {
    race4 = "Asian"
    race8 = "Asian 8"
    circleDict = asianDict4
    year = d3.timeFormat('%Y')(i.year)
    
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", enlargedCircleSize)
    
    correspondingCircle = circleDict[year]
    
    d3.select(correspondingCircle)
    .transition()
    .duration(300)
    .attr("r", enlargedCircleSize)
    
    tooltip8div.html(i[race8] + "%")
    .style("opacity", 1)
    .style("left", (this.cx.animVal.value + tooltip_offset_x + 635) + "px")
    .style("top", (this.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    difference = i[race4] - i[race8]
    
    tooltip4div
    .style("opacity", 1)
    .style("left", (correspondingCircle.cx.animVal.value + tooltip_offset_x) + "px")
    .style("top", (correspondingCircle.cy.animVal.value + tooltip_offset_y) + "px")
    .style("font-weight", "bold")
    .style("background-color", "white")
    
    if (difference < 0) {
      console.log("Decrease!")
      tooltip4div.html(i[race4] + " (↓ " + Math.abs(difference) + "%)")
      tooltip4div.style("color", "#FF0000")
    } else {
      console.log("Increase!")
      tooltip4div.html(i[race4] + " (↑ " + Math.abs(difference) + "%)")
      tooltip4div.style("color", "#31c43b")
    }
    
    
  }
  
  function revertAsianCircles8(d, i) {
    circleDict = asianDict4
    d3.select(this)
    .transition()
    .duration(200)
    .attr("r", 3)
    
    d3.select(circleDict[year])
    .transition()
    .duration(200)
    .attr("r", 3)
    
    clearTooltips()
  }
  
  function clearTooltips() {
    tooltip4div.style("opacity", 0)
    .style("left", (10) + "px")
    .style("top", (10) + "px")
    .style("color", "#000000")
    
    tooltip8div.style("opacity", 0)
    .style("left", (10) + "px")
    .style("top", (10) + "px")
    .style("color", "#000000")
  }
  
  function createCircleDict(circleGroup) {
    var circleDict = {2006: circleGroup._groups[0][0], 2007: circleGroup._groups[0][1], 2008: circleGroup._groups[0][2],
      2009: circleGroup._groups[0][3], 2010: circleGroup._groups[0][4], 2011: circleGroup._groups[0][5], 
      2012: circleGroup._groups[0][6], 2013: circleGroup._groups[0][7], 2014: circleGroup._groups[0][8], 
      2017: circleGroup._groups[0][9], 2018: circleGroup._groups[0][10], 2019: circleGroup._groups[0][11]}
      
      return circleDict
    }
    
    var stateAvgDict8 = createCircleDict(stateAvgCircles8)
    var blackDict8 = createCircleDict(blackCircles8)
    var asianDict8 = createCircleDict(asianCircles8)
    var hispanicDict8 = createCircleDict(hispanicCircles8)
    var whiteDict8 = createCircleDict(whiteCircles8)
    
    // ===========================================================
    // INTERACTIVITY
    // ===========================================================
    
    // Function to initialize the selectors  
    function drawSelectButton() {
      // add the options to the button
      // List of groups (here I have one group per column)
      var demographics = ["All Demographics", "Asian", "White", "Hispanic", "Black", "State Average"]
      
      d3.select("#selectDemographic")
      .selectAll('myOptions')
      .data(demographics)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button
    }
    
    
    
    
    var lines4 = [black, white, asian, hispanic, stateavg4]
    var circles4 = [blackCircles4, whiteCircles4, asianCircles4, hispanicCircles4, stateAvgCircles4]
    var lines8 = [black8, white8, asian8, hispanic8, stateavg8]
    var circles8 = [blackCircles8, whiteCircles8, asianCircles8, hispanicCircles8, stateAvgCircles8]
    var highlightLineSize = 3.5
    
    
    // Function to dim out other circles except for the chosen demographic
    function dimOtherCircles(circlesArray, except) {
      for (index = 0; index < circlesArray.length; index++) {
        circleGroup = circlesArray[index];
        if (circleGroup != except) {
          circleGroup
          .transition()
          .duration(750)
          .style("opacity", 0.4)
        }
      }
      except
      .transition()
      .duration(750)
      .style("opacity", 1.0)
    }
    
    // Function to highlight a chosen line and dim the other ones
    function highlightLine(linesArray, line) {
      for (index = 0; index < linesArray.length; index++) {
        lineGroup = linesArray[index];
        if (lineGroup === line) {
          lineGroup
          .transition()
          .duration(750)
          .style("opacity", 1.0)
          .attr("stroke-width", highlightLineSize)
        } else {
          lineGroup
          .transition()
          .duration(750)
          .style("opacity", 0.2)
          .attr("stroke-width", 2)
        }
      }
    }
    
    
    // Function to return to default state for circles  
    function resetCircles(circlesArray) {
      for (index = 0; index < circlesArray.length; index++) {
        circleGroup = circlesArray[index];
        circleGroup
        .transition()
        .duration(750)
        .style("opacity", 1.0)
      }
    }
    
    // Functions that update the charts by demographic:
    function highlightBlack() {
      highlightLine(lines4, black)   
      highlightLine(lines8, black8) 
      dimOtherCircles(circles4, blackCircles4)
      dimOtherCircles(circles8, blackCircles8)
      
    } 
    
    function highlightHispanic() {
      highlightLine(lines4, hispanic) 
      dimOtherCircles(circles4, hispanicCircles4)
      highlightLine(lines8, hispanic8) 
      dimOtherCircles(circles8, hispanicCircles8)
    } 
    
    function highlightWhite() {
      highlightLine(lines4, white) 
      dimOtherCircles(circles4, whiteCircles4)
      highlightLine(lines8, white8) 
      dimOtherCircles(circles8, whiteCircles8)
    }
    
    function highlightAsian() {
      highlightLine(lines4, asian) 
      dimOtherCircles(circles4, asianCircles4)
      highlightLine(lines8, asian8) 
      dimOtherCircles(circles8, asianCircles8)
    }
    
    function highlightStateAvg() {
      highlightLine(lines4, stateavg4) 
      dimOtherCircles(circles4, stateAvgCircles4)
      highlightLine(lines8, stateavg8) 
      dimOtherCircles(circles8, stateAvgCircles8)
    }
    // A function that resets the chart to default static:
    function setDefault() {
      black
      .attr("stroke-width", 2)
      .style("opacity", 1.0)
      asian
      .attr("stroke-width", 2)
      .style("opacity", 1.0)
      white
      .attr("stroke-width", 2)
      .style("opacity", 1.0)
      hispanic
      .attr("stroke-width", 2)
      .style("opacity", 1.0)
      stateavg4
      .attr("stroke-width", 2)
      .style("opacity", 1.0)
      black8
      .attr("stroke-width", 2)
      .style("opacity", 1.0)
      asian8
      .attr("stroke-width", 2)
      .style("opacity", 1.0)
      white8
      .attr("stroke-width", 2)
      .style("opacity", 1.0)
      hispanic8
      .attr("stroke-width", 2)
      .style("opacity", 1.0)
      stateavg8
      .attr("stroke-width", 2)
      .style("opacity", 1.0)
      resetCircles(circles4)
      resetCircles(circles8)
    } 
    
    
    drawSelectButton()
    // Defining on update for selector
    d3.select("#selectDemographic").on("change", function(d) {
      
      var selectedOption = d3.select(this).property("value")
      
      if (selectedOption === "Black") {
        highlightBlack();
      } else if (selectedOption === "Hispanic") {
        highlightHispanic();
      } else if (selectedOption === "White") {
        highlightWhite();
      } else if (selectedOption === "Asian") {
        highlightAsian();
      } else if (selectedOption === "State Average") {
        highlightStateAvg();
      } else {
        setDefault();
      }
      
    })
    
  });
  
  // ===================================================================================================
  // ===================================================================================================
  // ===================================================================================================
  
  
  const gData= d3.json('mcasGrouped.json').then(gData=> {
    
    var margin = { top:100, right: 100, bottom: 50, left: 100 },
    width = 600 - margin.left - margin.right + 200,
    height = 450 - margin.top - margin.bottom + 200;
    
    // container
    var container3 = d3
    .select("#chart3")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var races = gData.map(d => d.Race)
    
    // X axis
    var x = d3.scaleBand()
    .domain(races)
    .range([0, width])
    .padding([0.2])
    
    container3.append("g")
    .attr("transform", "translate(0," + height + ")")
    .style("font-size","16px")
    .call(d3.axisBottom(x).tickSize(0));
    
    // Y axis
    var y = d3.scaleLinear()
    .domain([0,100])
    .rangeRound([height,0])
    
    container3
    .append("g")
    .call(d3.axisLeft(y))
    .call((g) =>
    g
    .append("text")
    .attr("x", -margin.left)
    .attr("y", 10)
    .attr("fill", "black")
    .attr("text-anchor", "start")
    .attr('font-size','15px')
    .attr('font-weight','bold')
    .text('% at or above Proficiency')
    .attr('y',-25)
    .attr('x',-80)
    );
    
    
    
    // Subgroups for groups of bars
    var subgroups = ['Grade 4', 'Grade 8']
    
    // Another scale for subgroup position
    var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])
    
    
    // color palette = one color per bar
    var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#4C4A4A','#436280'])
    
    
    // given data, plots the bars
    // citations: https://bl.ocks.org/bricedev/0d95074b6d83a77dc3ad)
    // https://www.d3indepth.com/transitions/
    // https://jsfiddle.net/genestd/asoLph2w/
    
    
    function updateBars(filtered_data) {
      var bars = container3.append("g")
      .selectAll("g")
      .data(filtered_data)
      .enter()
      .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.Race) + ",0)"; })
      
      bars.selectAll("rect")
      .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
      .join("rect")
      .on("mouseover", onMouseOver)
      .on("mouseout", onMouseOut)
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("width", xSubgroup.bandwidth())
      .attr("fill", function(d) { return color(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });
      
      bars.selectAll("rect")
      .transition()
      .delay(500)
      .duration(1000)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });
      
      // Legend (citation: https://bl.ocks.org/bricedev/0d95074b6d83a77dc3ad)
      var legend = container3.selectAll(".legend")
      .data(subgroups)
      .enter().append("g")
      .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
      .style("opacity","1");
      
      legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return color(d); });
      
      legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return d; });
      
      return bars
    }
    
    var data_2006 = gData.filter(function(d){ return d.Year == "2006" })
    bars = updateBars(data_2006)
    curYear = 2006

    // given a year, update the bars to show data for that year
    function updateChart(year) {
      barData = gData.filter(function(d){ return d.Year == year })
      var bars = container3.selectAll("rect")
      .data(barData, function(d){ return d.Race})
      bars.exit()
      .transition()
      .duration(0)
      .attr("width", 0)
      .remove()
      
      updateBars(barData)
    }
    
    var tooltipBarChart = d3.select("#chart3-container").append("div")
    .attr("class", "tooltip-donut")
    .style("opacity", 0)
    .style("left", (700) + "px")
    .style("top", (1250) + "px")
    
    
    // Tooltip Code
    function onMouseOver(d, i) {
      
      console.log(curYear)

      tooltipBarChart
      .html(curYear + " " + i.key + ": " + i.value + "%")
      .transition()
      .duration(300)
      .style("opacity", 1)
      .style("font-size", "20px")
      .style("left", (700) + "px")
      .style("top", (1250) + "px")
      .style("padding", "5px")
      .style("-webkit-border-radius", "10px")
      .style("-moz-border-radius", "10px")
      .style("border-radius", "10px")
      .style("background-color", color(i.key))
      .style("color", "white")
      
    }
    
    function onMouseOut(d, i) {
      tooltipBarChart
      .transition()
      .duration(100)
      .style("opacity", 0)
    }
    
    
    // Slider Code
    
    var dataTime = d3.range(0, 14).map(function(d) {
      return new Date(2006 + d, 10, 3);
    });
    
    var sliderTime = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(400)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(dataTime)
    .default(new Date(1998, 10, 3))
    .on('onchange', val => {
      year = d3.timeFormat('%Y')(val)
      curYear = year
      updateChart(year)
    });
    
    var gTime = d3
    .select('#slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');
    
    gTime.call(sliderTime);
    
    d3.select('#slidervalue').text(d3.timeFormat('%Y')(sliderTime.value()));
    
  });
  
  
  
  
  
  
  
  // ==================================================================================================================
  