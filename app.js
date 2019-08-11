// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;




// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


  // Load data from hours-of-tv-watched.csv
d3.csv("data.csv")
  .then(function(povertyData){

    povertyData.forEach(function(data){
      data.healthcare = +data.healthcare;
      data.income = +data.income;

    });
    var curX = "Healthcare";
    var curY = "Per Capita Income"
    var ticks = [0,10000,20000,30000,40000,50000,60000,70000,80000];
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(povertyData, d => d.healthcare)])
      .range([0, chartWidth])
      .nice();

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(povertyData, d => d.income)])
      .range([chartHeight, 0])
      .nice();


  // Step 3: Create axis functions
    // ==============================
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    

    var leftAxis = d3.axisLeft(yLinearScale)
        

    // Step 4: Append Axes to the chart
    // ==============================
    
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .style("fill", "blue")
      .call(bottomAxis);

    chartGroup.append("g")
      .style("fill", "blue")
      .call(leftAxis);
      


      


    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(povertyData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare))
    .attr("cy", d => yLinearScale(d.income))
    .attr("r", "15")
    .attr("fill", "blue")
    .style("stroke", "black") 
    .style("stroke-width", 3)
    .attr("opacity", ".75");
    
    

    let texts = chartGroup.selectAll("scatter")
    .data(povertyData)
    .enter()
    .append('text')
    .attr("x", d => xLinearScale(d.healthcare))
    .attr("y", d => yLinearScale(d.income))
    .text(d => d.abbr)  
    .attr("text-anchor", "middle")
    .attr('fill', 'White')
    .attr('font-size', 15)







    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .style("border", "solid")
      .style("background-color", "blue")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      
      .html(function(d) {
        return (`${d.state}<br>Healthcare%: ${d.healthcare}<br>Income: $${d.income}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 60)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Per Capita Income");


     // Create axes labels
     svg.append("text")      // text label for the x axis
     .attr("x", 480 )
     .attr("y", 625 )
     .style("text-anchor", "middle")
     .text("% Without Healthcare");

    
    
    
    


  });
