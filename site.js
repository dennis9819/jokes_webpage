let anim_rows = 50;

let humor = [];
let jokes = [];

let cur_joke = {};

function modHumor(category,score){
	let contains = false;
	for (let i = 0 ; i < humor.length; i++){
		
		if(humor[i].cat == category){
			humor[i].scr += score;
			contains = true;
			break;
		}

	}
	
	if (!contains){
		humor.push({
			cat: category,
			scr: score
		});
	}
}

function printHumor(){
	$("#score-content").hide("fast",function(){
		let htmlContent = "";
		
		for (let i = 0 ; i < humor.length; i++){
			
			htmlContent += "<button type=\"button\" class=\"btn scr btn-primary\"> "+humor[i].cat+" <span class=\"badge badge-light\">"+humor[i].scr+"</span></button>";
		}
		
		console.log(htmlContent);
		
		$("#score-content").html(htmlContent);
	
		
		$("#score-content").show("fast");
	});
}

$( document ).ready(function() {
	
	anim_rows= (window.innerWidth / 68 ) + (window.innerHeight / 68);
	generateBackground(anim_rows);
	try {
		humor = JSON.parse($.cookie("score"));
	}catch{
		
	}
	printHumor();
    getWitz();
	$('#wasted').text(Math.floor((new Date - start) / 1000)  + " Sekunden");
});

$('.cmd-next').click(function() {
	modHumor(cur_joke.category,-50);
	printHumor();
	calculateMapping
    getWitz();
	
});

$('.cmd-more').click(function() {
	modHumor(cur_joke.category,50);
	printHumor();
	calculateMapping();
    getWitz();
});

$(window).on('resize', function(){
      var win = $(this); //this = window
	  anim_rows= (win.width() / 68) + (win.height() / 68);
	  generateBackground(anim_rows);
});

$(window).on("unload", function(e) {
    $.cookie("score", JSON.stringify(humor));
});

const start = new Date;

setInterval(function() {
    $('#wasted').text(Math.floor((new Date - start) / 1000)  + " Sekunden");
}, 1000);

function getWitz(){
    $("#content").hide("fast", function () {

		const jokeId = Math.floor(Math.random() * jokes.length )
		
		console.log("witz laden");
		cur_joke = jokes[jokeId];
		$("#joke-title").text(jokes[jokeId].category);
		$("#joke-source").text(jokes[jokeId].by);
		$("#joke-text").html(jokes[jokeId].content);
		
		$("#content").show("fast");
	});
}


function generateBackground(rows){

	let fullhmtl = ""
	for (let i = 0; i < rows;i++){
		const speed = Math.floor(Math.random() * 20 ) +20
		const css = "animation: " + speed + "s linear infinite slide;"
		fullhmtl += "<div class='single-line' style='" + css + "'></div>"
	}

	$("#bg-content").html(fullhmtl);
	
}


function calculateMapping(){
	let min = 1000000000;
	let max = -1000000000;
	
	for (let i = 0 ; i < humor.length; i++){
		if(humor[i].scr < min){
			min = humor[i].scr 
		}
	}
	
	const offset = (min * -1);
	let sum = 0;
	for (let i = 0 ; i < humor.length; i++){
		sum += (humor[i].scr + offset);
	}
	for (let i = 0 ; i < humor.length; i++){
		const percentage = ((humor[i].scr + offset) / sum);
		console.log(percentage);
	}
}

function getJokes() {
    var jqxhr = $.getJSON("example.json", function () {
        console.log("success");
    })
        .done(function ( data ) {
            console.log("second success");
            jokes = data;
        })
        .fail(function () {
            console.log("error");
        })
        .always(function () {
            console.log("complete");
            
        });

}