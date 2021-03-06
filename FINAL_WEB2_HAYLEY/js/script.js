//slideshow//
var slideIndex = 0;
var translateValue = 0;
var wrapper = $("slideshow-wrapper").get[0];
var numSlides = $(".slideshow-wrapper > div").length

function goToPrevSlide() {
  if(slideIndex === 0) {
		return;
	}

	slideIndex--;
	translateValue = translateValue + slideWidth();
	$(".slideshow-wrapper").css({"transform": "translateX("+translateValue+"px)"});

}

function goToNextSlide() {
	if(slideIndex == numSlides - 1) {
		slideIndex = 0;
		translateValue = 0;
		console.log(translateValue);
		$(".slideshow-wrapper").css({"transform": "translateX("+translateValue+"px)"});
	} else {
		slideIndex++;
		translateValue = translateValue - slideWidth();
		$(".slideshow-wrapper").css({"transform": "translateX("+translateValue+"px)"});
	}
}

function slideWidth() {
	return $(".slideshow-wrapper").width();
}


//transition//
$(document).ready(function() {
	$("#button").click(function() {
		$("#triangle-down, #triangle-up").addClass("usenand");
		$('content').addClass('krassInefade');
		$("#triangle-up, #triangle-down").delay(1500).fadeOut();
		$("#title").fadeOut(500);
		$("#button").addClass("toMenu");
		$("#button").text('+');
		setTimeout(function() {
			$("#button").attr("id", "menu");
		}, 1);
	});

	$("#menuClose, #menuContent a").click(function() {
		$("#menu").removeClass("menuTransition");
		$("#menuContent").fadeOut(300);
		$("#menu").text('+');
		$("#menu.toMenu").css('transition', '.5s ease-in-out');
	});

	$('a').click(function() {
		$('html, body').delay(500).animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 1000);
		return false;
	});

});

$(document).on("click", "#menu", function() {
	$("#menu").addClass("menuTransition");
	$("#menuContent").delay(500).fadeIn(1);
	$("#menu").text(' ');
});


//bar graph//
var myData = [
	{"name": "Skool Luv Affair", "date": "February 12th, 2014", "title": "Boy in Luv", "sale": 5000, "color": "#6d2428"},
	{"name": "Dark n Wild", "date": "August 19th, 2014", "title": "Danger", "sale": 16000, "color": "#304833"},
	{"name": "HYYH: Pt 1", "date": "April 29th, 2015", "title": "I Need U", "sale": 55000, "color": "#fdf4f3"},
	{"name": "HYYH: Pt 2", "date": "November 30th, 2015", "title": "Run", "sale": 86000, "color": "#77cdec"},
	{"name": "HYYH: Young Forever", "date": "May 2, 2016", "title": "Fire, Save Me", "sale": 164000, "color": "#f1f6ad"},
	{"name": "Wings", "date": "October 10th, 2016", "title": "Blood, Sweat, and Tears", "sale": 347000, "color": "#111111"},
	{"name": "You Never Walk Alone", "date": "February 13th, 2017", "title": "Spring Day, Not Today", "sale": 373000, "color": "#89cfc3"},
	{"name": "Love Yourself: Her", "date": "September 18th, 2017", "title": "DNA", "sale": 750000, "color": "#f4f7fd"},
	{"name": "Love Yourself: Tear", "date": "May 18th, 2018", "title": "Fake Love", "sale": 1000000, "color": "#161824"},
	{"name": "Love Yourself: Answer", "date": "August 24th, 2018", "title": "Idol", "sale": 860000, "color": "#f3aac7"},
	{"name": "Map of the Soul: Persona", "date": "April 12th, 2019", "title": "Boy With Luv", "sale": 2100000, "color": "#fe769c"}

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

var margin = {top: 20, right: 20, bottom: 50, left: 40}
var width = 700 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;
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
	.domain([0, d3.max(myData, function(d) { return d.sale; })])
	.range([height, 0]);

var xScale = d3.scaleBand()
	.domain(d3.range(0, myData.length))
	.range([0, width])
	.padding(.1);

var colors = d3.scaleLinear()
	.domain([0, myData.length])
	.range(["#000000", "#6d2428", "#304833", "#fdf4f3", "#77cdec", "#f1f6ad", "#111111", "#89cfc3", "#f4f7fd", "#161824", "#f3aac7"])

var tip = d3.tip()
	.attr('class', 'tooltip')
	.offset([0, 2])
	.html(function(d) {
		return "<em><strong>" + d.name + "</em><br><strong>" + d.date + "</em><br><strong>" + d.title + "</em><br><strong>" + d.sale + "</strong>";
});

tip.direction('e');

var yAxis = d3.axisRight(yScale)
		.ticks(4);

var xAxis = d3.axisBottom(xScale)
		.ticks(4);


var myChart = d3.select("#chart").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.selectAll("rect")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	.data(myData)
	.enter().append("rect")
	.style("fill", (d, i) => d.color)
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
		return height - yScale(d.sale);
	})
	.attr("y", function (d) {
		return yScale(d.sale);
	})
	.duration(animateDuration)
	.delay(function (d, i) {
		return i * animateDelay;
	})
	.ease(d3.easeElastic);

myChart.call(tip);

var svg = d3.select("svg");

svg.append("g")
		.attr("class", "axis y")
		.style("fill", "black")
		.call(yAxis);

svg.append("g")
		.attr("class", "axis x")
		.attr('transform', 'translate(0,' + height  + ')')
		.style("fill", "black")
		.call(xAxis);