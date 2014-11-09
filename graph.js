var $ = jQuery.noConflict();

var sdaie = [[2009, 6033], [2008, 8244], [2007, 1927], [2006, 4808], [2005, 690], [2004, 67]];
var science = [[2009, 940], [2008, 446], [2007, 88], [2006, 93], [2005, 227], [2004, 122]];
var english = [[2009, 687], [2008, 790], [2007, 140],[2006, 340],[2005, 313],[2004, 192]];
var math = [[2009, 441],[2008, 373],[2007, 113],[2006, 225],[2005, 334],[2004, 173]];
var social_studies = [[2009, 375],[2008, 279],[2007, 79],[2006, 144],[2005, 130],[2004, 134]];
var eld = [[2008, 537],[2007, 1520],[2006, 1649],[2005, 909],[2004, 237]];
var phys_ed = [[2009, 313],[2008, 361],[2007, 122],[2006, 132],[2005, 259],[2004, 168]];
var life_skills = [[2009, 296],[2008, 271],[2007, 9],[2006, 17],[2005, 32], [2004, 11]];
var health = [[2009, 254],[2008, 243],[2007, 51],[2006, 96],[2005, 106],[2004, 62]];
var computers = [[2009, 225],[2008, 207],[2007, 59],[2006, 92], [2005, 117],[2004, 82]];

var options = {
                series: {
                    lines: {
                        show: true,
                        lineWidth: 4
                    },
                    shadowSize: 0,
                },
                xaxis: {
                    tickDecimals: 0
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    borderWidth: 0
                },
                colors: ["#95997B", "#B9CC3E", "#FFE667", "#A7BAFF", "#3E82CC"]
            };

var graphData = {};

function dataFLOTFriendly() {
    var flot_friendly_data = [];
    for (var key in graphData) {
        flot_friendly_data.push({label:key, graphData:graphData[key]});
    }
    return flot_friendly_data;
}

function addData(id, timestamp, delta) {
    eld.unshift([year, 1]);
    year++;
    $.plot($("#subjects"), data, options);
}

function graph(){
        graphData["Science"] = science;
        graphData["ELD"] = eld;

        $.plot($("#subjects"), dataFLOTFriendly(), options);
 
        // Create the box for the tooltip, but don't display it yet
        // The CSS here is completely customizable. The only required rules are
        // display: none, position: absolute, and the top and left values.
        function showTooltip(x, y, contents, color) {     
            $('<div id="tooltip">' + contents + '</div>').css( {
                position: 'absolute',
                width: '140px',
                display: 'none',
                'font-family': 'sans-serif',
                'font-size': '12px',
                top: y + 5,
                left: x + 5,
                'border-width': '2px',
                'border-style': 'solid',
                'border-color': color,
                padding: '4px',
                'background-color': "#eee",
                opacity: 0.90
            }).appendTo("body").fadeIn(200);
        }
 
        // Figure out which point is being hovered over and display that data
        $("#subjects").bind("plothover", function (event, pos, item){
             if (item) {
                    if (previousPoint != item.dataIndex) {
                        previousPoint = item.dataIndex;
 
                        $("#tooltip").remove();
                        
                        // This defines x and y as variables that will display the 
                        // x and y values of the point being hovered over. If you'd like to display
                        // decimal places, try this code: var x = item.datapoint[0].toFixed(2);
                        // Be aware that this will affect all tooltips for all charts on this page.
                        var x = item.datapoint[0];
                        var y = item.datapoint[1];
 
                        // This is where you can control what shows up in your tooltip. 
                        // "item.series.label" will return the name of your dataset.
                        var label = "In " + x + ", there were " + y + " misassigned teachers in " + item.series.label;
                        
                        // showTooltip is a function that takes three comma-separated arguments.
                        // The first two arguments will help position the tooltip near the point.
                        // The third is our label, defined above, and the fourth returns the color of the chart.
                        showTooltip(item.pageX, item.pageY, label, item.series.color);
                    }
                }
                
                // Once we're no longer hovering over the point, remove the tooltip
                else {
                    $("#tooltip").remove();
                    previousPoint = null;            
                }
        });
    
}