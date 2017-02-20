// Level 2 -- Colors
var color;

d3.csv("../data/population_merged.csv", function(error, myData) {
    // ...

    // Extract colours for each region
    color = d3.scale.ordinal()
            .domain(myData.map( function (d) { return d['Region']; }))
            .range(d3.scale.category10().range());

    // ...
});
// ============================

// Level 2 -- Axis
d3.csv("../data/population_merged.csv", function(error, myData) {
    // ...

    // Extract the list of dimensions and create a scale for each.
    x.domain(dimensions = d3.keys(myData[0]).filter(function(d) {
    if (d == 'Region' || d == 'Country or SR') { // Categorical Data
        y[d] = d3.scale.ordinal()
            .domain(myData.map(function(p) { return p[d]; }))
            .rangePoints([height, 0]);
    } else { // Numerical Data
      y[d] = d3.scale.linear()
        .domain(d3.extent(myData, function(p) { return +p[d]; }))
        .range([height, 0]);
    }

    return true;
    }));

    // ...
});
// ============================