                                    
					  var elmnt = document.createElement('div');
                   elmnt.innerHTML = '<input type="file" id="bar" accept=".tsv" webkitdirectory multiple >';
                      var input_1 = elmnt.firstChild;
                                                   
   var select_1 = document.getElementById('agr');

input_1.addEventListener('change', function (evnt) {
  var fileList = [];
  for (var i = 0,j = input_1.files.length; i<j; i++) {
  fileList.push(input_1.files[i]);
  console.log(fileList);
  }
  fileList.forEach(function (file, index) {
    var name=file.name;
    console.log(name);
														 
								
						
						var margin = {top: 50, right: 20, bottom: 100, left: 300},
    width = 800 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;
	
 
                                                        if ($('#chart4 svg').length === 1 ){  
                                                     $('#chart4 svg:last').remove();
					                                                                    }
						  
 
		  
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
	
		  

d3.tsv("Data/"+ name, function(error, data) {
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
      .call(d3.axisBottom(x1))
	  .append("text")
	  .attr("x", 200)
	  .attr("y", 50)
      .attr("fill", "Black")
	   .style("font-family","Times New Roman")
	    .style("font-size","20px")
	  .text("Label");
	  
	  

  // add the y Axis
  svg1.append("g")
      .call(d3.axisLeft(y1))
	  .append("text")
	  .attr("transform", "rotate(-90)")
      .attr("y", -70)
	  .attr("x",-200)
      .attr("dy", "0.71em")
      .attr("fill", "Black")
       .style("font-family","Times New Roman")
	   .style("font-size","20px")
	  .text("Time");
	  
	   
	  
	   var div=d3.select("#floatleft").append("div");
	  
	  svg1.selectAll(".bar")
			       .data(data)
				 .on("click", function(d){
	                     div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html("Label:" + d.Call + "<br/>" + "Site:" + d.Site + "<br/>"+  "MPI:" + d.MPI+ "<br/>" + "Time:" + d.Time+ "<br/>"+ "App:" + d.App )
                .style("color","black")	
                 .style("margin","50px")				 
                .style("background-color","lightsteelblue")
                 .style("font-size","20px")	
                 .style("font-family","times new roman")
                 .style("text-align","center")
                  .style("width","200px")	
                 		  
				  
            })					
				 .on("mouseout", function(d) {
                    div.transition()		
                .duration(10000)		
                .style("opacity", 0);	
        });
	 
	 
	 
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
        .attr("transform","translate(200,445)")
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("(Aggregate Data)");
	  
	  

});

					
					   });
					   
					  });
					   
		select_1.addEventListener("click", function () {  // wait for click on "select a file" button
    input_1.click();
});

								 