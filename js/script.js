//slideshow//



//bar graph//
var myData = [
	{"name": "Skool Luv Affair", "date": "February 12th, 2014", "title": "Boy in Luv", "sale": 5, "color": "#6d2428"},
	{"name": "Dark n Wild", "date": "August 19th, 2014", "title": "Danger", "sale": 16, "color": "#304833"},
	{"name": "HYYH: Pt 1", "date": "April 29th, 2015", "title": "I Need U", "sale": 55, "color": "#fdf4f3"},
	{"name": "HYYH: Pt 2", "date": "November 30th, 2015", "title": "Run", "description": 86, "color": "#77cdec"},
	{"name": "HYYH: Young Forever", "date": "May 2, 2016", "title": "Fire, Save Me", "sale": 164, "color": "#f1f6ad"},
	{"name": "Wings", "date": "October 10th, 2016", "title": "Blood, Sweat, and Tears", "sale": 347, "color": "#111111"},
	{"name": "You Never Walk Alone", "date": "February 13th, 2017", "title": "Spring Day, Not Today", "sale": 373, "color": "#89cfc3"},
	{"name": "Love Yourself: Her", "date": "September 18th, 2017", "title": "DNA", "description": 750, "color": "#f4f7fd"},
	{"name": "Love Yourself: Tear", "date": "May 18th, 2018", "title": "Fake Love", "sale": 1000, "color": "#161824"},
	{"name": "Love Yourself: Answer", "date": "August 24th, 2018", "title": "Idol", "sale": 860, "color": "#f3aac7"},
	{"name": "Map of the Soul: Persona", "date": "April 12th, 2019", "title": "Boy With Luv", "sale": 2100, "color": "#fe769c"}

];

//LG check if chart in view
function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

window.addEventListener('scroll', function (event) {
	if(isScrolledIntoView(chart)) {
		chart.classList.add('active');
	}
}, false);

var width = 600;
var height = 500;
var animateDuration = 700;
var animateDelay = 30;
var tooltip = d3.select("body").append("div")
	.style("position", "absolute")
	.style("background", "#ffd5c7", "#f9b9db")
	.style("color", "#454545")
	.style("font-family", "Arial, sans-serif")
	.style("padding", "2px 10px")
	.style("opacity", "0")

var yScale = d3.scaleLinear()
	.domain([0, d3.max(100)])
	.range([0, height]);

var xScale = d3.scaleBand()
	.domain(d3.range(0, myData.length))
	.range([0, width])
	.padding(.2);

var colors = d3.scaleLinear()
	.domain([0, myData.length])
	.range(["#000000", "#6d2428", "#304833", "#fdf4f3", "#77cdec", "#f1f6ad", "#111111", "#89cfc3", "#f4f7fd", "#161824", "#f3aac7"])

var tip = d3.tip()
	.attr('class', 'tooltip')
	.offset([0, 2])
	.html(function(d) {
		return "<strong>" + d + "</strong>";
});

tip.direction('e')

myChart = d3.select("#chart").append("svg")
	.attr("width", width)
	.attr("height", height)
	.style("background", "#ffd5c7", "#f9b9db")
	.selectAll("rect")
	.data(myData)
	.enter().append("rect")
	.style("fill", function(d){return myData.color;})
	.attr("width", xScale.bandwidth())
	.attr("height", 0)
	.attr("x", (d, i) => xScale(i))
	.attr("y", height)

	.on('mouseover', function(d) {
        tip.attr('class', 'tooltip animate').show(d)
      })
    .on('mouseout', function(d) {
        tip.attr('class', 'tooltip').show(d)
        tip.hide()
	})
	
myChart.transition()
	.attr("height", function (d) {
		return yScale(d);
	})
	.attr("y", function (d) {
		return height - yScale(d);
	})
	.duration(animateDuration)
	.delay(function (d, i) {
		return i * animateDelay;
	})
	.ease(d3.easeElastic);

myChart.call(tip);