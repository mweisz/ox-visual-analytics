function showLineChart(dimensionName) {
  console.log('Line Chart from ', dimensionName)

        var m = [80, 80, 80, 80]; // margins
        var w = 1000 - m[1] - m[3]; // width
        var h = 400 - m[0] - m[2]; // height

        var years = [1995, 2000, 2005, 2010, 2015];
        

        // var aggregateData(csvData, dimensionName);
        // create a simple dataTime array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
        var dataTime = aggregateData(csvData, dimensionName);

        var maxYValue = 0
        for (var i = 0; i < dataTime.length; i++) {
            maxYValue = Math.max(maxYValue, dataTime[i].avg)
        } 


        // Clear previous graph 
        document.getElementById("graph").innerHTML = ""
        document.getElementById("subgraph-title").innerHTML = "Average: "+ dimensionName

        // X scale will fit all values from dataTime[] within pixels 0-w
        // d3.scale.ordinal()
        //     .domain(myData.map(function(p) { return p[d]; }))
        //     .rangePoints([height, 0]);
        // var xTime = d3.scale.ordinal().domain([1995, 2000, 2005, 2010, 2015]).range([0, w]);
        // var xTime = d3.scale.linear().domain([0, 6]).range([0, w]);
        // var xTime = d3.scale.linear().domain([0, 5]).range([0, w]);
         // var xTime = d3.scale.ordinal().domain([1995, 2000, 2005, 2010, 2015]).rangeRoundBands([0, width]);


         var xTime = d3.scale.ordinal().domain(dataTime.map(function(d) { return d.year; })).rangeRoundBands([0, w]);
        // xTime.domain(dataTime.map(function(d) { return d.year; }));

        // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
        var yTime = d3.scale.linear().domain([0, maxYValue]).range([h, 0]);
        // var yTime = d3.scale.linear().domain([0, d3.max(dataTime)]).range([h, 0]);

        // xTime.domain(dataTime.map(function(d) { console.log(d); return years[d] }));
            // automatically determining max range can work something like this
            // var y = d3.scale.linear().domain([0, d3.max(dataTime)]).range([h, 0]);
        // create a line function that can convert dataTime[] into x and y points
        var line = d3.svg.line()
            // assign the X function to plot our line as we wish
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
            
            // create yAxis
            var xAxis = d3.svg.axis().scale(xTime).ticks(5).orient("bottom");
            // var xAxis = d3.svg.axis().scale(xTime).ticks(5).orient("bottom");
            // Add the x-axis.
            graph.append("svg:g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + h + ")")
                  .call(xAxis);
            // create left yAxis
            var yAxisLeft = d3.svg.axis().scale(yTime).ticks(4).orient("left");
            // Add the y-axis to the left
            graph.append("svg:g")
                  .attr("class", "y axis")
                  .attr("transform", "translate(-25,0)")
                  .call(yAxisLeft);
            
            // Add the line by appending an svg:path element with the dataTime line we created above
            // do this AFTER the axes above so that the line is above the tick-lines
            graph.append("svg:path").attr("d", line(dataTime)).attr('fill', 'none').attr('stroke', 'blue');
            
}

function aggregateData(data, dimension) {
    var years = ["1990", "1995", "2000", "2005", "2010", "2015"]

    var averages = [0, 0, 0, 0, 0, 0 ]


    for (var y in years) {
        year = years[y]

        var count = 0
        for (var i = 0; i < data.length; i++) {
            if (data[i]['Year'] == year) {
                averages[y] += parseFloat(data[i][dimension]);
                count++;
            }
        }
        averages[y] = averages[y] / count
    }

    var output = [
        {"year": "1990", "avg" : averages[0]},
        {"year": "1995", "avg" : averages[1]},
        {"year": "2000", "avg" : averages[2]},
        {"year": "2005", "avg" : averages[3]},
        {"year": "2010", "avg" : averages[4]},
        {"year": "2015", "avg" : averages[5]}

    ]
    return output;


}