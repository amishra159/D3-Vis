                                    
					 var element1 = document.createElement('div');
                   element1.innerHTML = '<input type="file" id="in1" accept=".tsv" multiple="mulitple">';
                      var fileInput1 = element1.firstChild;
					  
					  
	

                        var fileSelect1 = document.getElementById("agr");
            
					   fileInput1.addEventListener('change', function() { // wait for file selection
                            
							   
								var file =fileInput1.files[0];
							
						
						var margin = {top: 50, right: 20, bottom: 60, left: 50},
    width = 520 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
	
   
					 

					 

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.label); })
    .y(function(d) { return y(d.Time); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#chart4").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
		  
		  var div = d3.select("#floatleft").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

		  
		  
		  
		  
		  
		  var x1 = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y1 = d3.scaleLinear()
          .range([height, 0]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg1 = d3.select("#chart4").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
		  


		     var color = d3.scaleOrdinal(["#0d0887", "#6a00a8","#cb4679", "#e16462","#fca636", "#fcce25"]); 
		  
		   var legendRectSize = 18;                                  
        var legendSpacing = 4;   
	
		  

// Get the data
d3.tsv("Data/" +file.name, function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.label = +d.label;
      d.Time = +d.Time;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.label; }));
  y.domain([0, d3.max(data, function(d) { return d.Time; })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
	  .append("text")
	  .attr("x", 300)
	  .attr("y", 40)
      .attr("fill", "Black")
	   .style("font-family","Times New Roman")
	    .style("font-size","20px")
	  .text("TimeStamp");

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y))
	  .append("text")
	  .attr("transform", "rotate(-90)")
      .attr("y", 20)
	  .attr("x",-200)
      .attr("dy", "0.71em")
      .attr("fill", "Black")
       .style("font-family","Times New Roman")
	   .style("font-size","20px")
	  .text("Time");
	  
	  
	  svg.selectAll("dot")	  
        .data(data)			
    .enter().append("circle")								
        .attr("r", 5)		
        .attr("cx", function(d) { return x(d.label); })		 
        .attr("cy", function(d) { return y(d.Time); })		
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", .9);		
            div	.html(d.Call + "<br/>"  + d.Time)
                .style("color","black")	
                 .style("margin","50px")				 
                .style("background-color","lightsteelblue")
                 .style("font-size","20px")	
                 .style("font-family","times new roman")
                 .style("text-align","center")
                  .style("width","100px")				  
               .style("left", (d3.event.floatleft -100) + "px")		
                .style("top", (d3.event.pageY +40) + "px");
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(100)		
                .style("opacity", 0);	
        });

	  
	  
	  
	          			
});



d3.tsv("Data/"+ file.name, function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.Time = +d.Time;
  });

  // Scale the range of the data in the domains
  x1.domain(data.map(function(d) { return d.Call + "(" + d.Site + ")" ; }));
  y1.domain([0, d3.max(data, function(d) { return d.Time; })]);

  // append the rectangles for the bar chart
  svg1.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x1(d.Call + "(" + d.Site + ")" ); })
      .attr("width", x1.bandwidth())
      .attr("y", function(d) { return y1(d.Time); })
	.attr("fill", function(d,i) { return color(i); })
      .attr("height", function(d) { return height - y1(d.Time); });
	  
	  
	  svg1.selectAll(".text")  		
	  .data(data)
	  .enter()
	  .append("text")
	  .attr("class","label")
	  .attr("x", (function(d) { return x1(d.Call + "(" + d.Site + ")") + x1.bandwidth() / 4 ; }  ))
	  .attr("y", function(d) { return y1(d.Time) - 10; })
	  .attr("dy", ".75em")
	  .text(function(d) { return d.Time; });    	

  // add the x Axis
  svg1.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x1));

  // add the y Axis
  svg1.append("g")
      .call(d3.axisLeft(y1));
	  
	 
	 
	 
	  var legend = svg1.selectAll('.legend')                     
          .data(color.domain())                                   
          .enter()                                                
          .append('g')                                            
          .attr('class', 'legend')                                
          .attr('transform', function(d, i) {                    
            var height = legendRectSize + legendSpacing;         
            var offset =  height * color.domain().length / 2;     
            var horz = 18 * legendRectSize;                        
            var vert = i * height + offset;                       
            return 'translate(' + horz + ',' + vert + ')';        
			});                                                     

        legend.append('rect')                                     
          .attr('width', legendRectSize)                         
          .attr('height', legendRectSize)                         
          .style('fill', color)                                   
          .style('stroke', color);                                
          
        legend.append('text') 
           .data(data)		
          .attr('x', legendRectSize + legendSpacing)              
          .attr('y', legendRectSize - legendSpacing)              
          .text(function(d) { return d.Call; });                       
	 
	  svg1.append("text")
        .attr("transform","translate(200,440)")
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Bar Chart showing functions with Time");
	  
	  

});

					
					   });
					   
					   
			fileSelect1.addEventListener("click", function () {  // wait for click on "select a file" button
    fileInput1.click();
});

								 