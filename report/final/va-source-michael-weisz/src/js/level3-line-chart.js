function showLineChart(dimensionName) {
        var m = [80, 80, 80, 80]; // margins
        var w = 1000 - m[1] - m[3]; // width
        var h = 400 - m[0] - m[2]; // height

        var years = [1995, 2000, 2005, 2010, 2015];
        

        var dataTime = aggregateData(csvData, dimensionName);

        // Extract maximum Y value to determine y-axis height
        var maxYValue = 0;
        for (var i = 0; i < dataTime.length; i++) {
            maxYValue = Math.max(maxYValue, dataTime[i].avg);
        } 


        // Clear previous graph 
        document.getElementById("graph").innerHTML = "";
        document.getElementById("subgraph-title").innerHTML = "Average: "+ dimensionName;


        // Create Axes
        var xTime = d3.scale.ordinal().domain(dataTime.map(function(d) { return d.year; })).rangeRoundBands([0, w]);
        var yTime = d3.scale.linear().domain([0, maxYValue]).range([h, 0]);


        // Create line
        var line = d3.svg.line()
            .x(function(d,i) { 
                return xTime(d.year) + m[0]; 
            })
            .y(function(d) { 
                return yTime(d.avg); 
            })
            
            // Add an SVG element with the desired dimensions and margin.
            var graph = d3.select("#graph").append("svg:svg")
                  .attr("width", w + m[1] + m[3])
                  .attr("height", h + m[0] + m[2])
                .append("svg:g")
                  .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
            
            // create y-axis
            var xAxis = d3.svg.axis().scale(xTime).ticks(5).orient("bottom");
            

            // Add the x-axis.
            graph.append("svg:g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + h + ")")
                  .call(xAxis);
            
            // Create y-axis
            var yAxis = d3.svg.axis().scale(yTime).ticks(4).orient("left");
            
            // Add the y-axis to the left
            graph.append("svg:g")
                  .attr("class", "y axis")
                  .attr("transform", "translate(-25,0)")
                  .call(yAxis);
            
            // Add the line
            graph.append("svg:path").attr("d", line(dataTime)).attr('fill', 'none').attr('stroke', 'blue');
}

function aggregateData(data, dimName) {
    var years = ["1990", "1995", "2000", "2005", "2010", "2015"];

    // Initialse averages
    var averages = [0, 0, 0, 0, 0, 0];

    // Compute average for each year
    for (var y in years) {
        year = years[y]
        var count = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i]['Year'] == year) {
                averages[y] += parseFloat(data[i][dimName]);
                count++;
            }
        }
        averages[y] = averages[y] / count;
    }

    // Transform data into a list of objects
    var output = [];
    for (var i = 0; i < years.length; i++) {
        output.push({"year": years[i], "avg": averages[i]});
    }

    return output;
}