let anim_rows = 50;

let humor = []


let cur_joke = "";

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
	$("#content").hide("fast",function(){
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


//JOKES :

const jokes = [
	{
		category:"Flachwitz",
		by:"Dennis Gunia",
		content:"Was machen Mathematiker im Garten ?<br />Wurzel zeihen!"
	},{
		category:"Flachwitz",
		by:"Dennis Gunia",
		content:"Welcher Präsident springt am höchsten ?<br />Donnald Jump!"
	},{
		category:"Flachwitz",
		by:"Dennis Gunia",
		content:"Wie nennt man jemanden, der so tut als würde er etwas werfen ?<br />Einen Scheinwerfer!"
	},{
		category:"Flachwitz",
		by:"Florian Schmidt",
		content:"Klingelt man beim Metzger<br />dann sollte man sich nicht wundern, dass 'kein Schwein' aufmacht! "
	},{
		category:"Flachwitz",
		by:"Florian Schmidt",
		content:"Treffen sich 2 Schafe, sagt das eine: <br />Mäh! <br/>Sagt das andere:<br />Mäh doch selber! "
	},{
		category:"Flachwitz",
		by:"Florian Schmidt",
		content:"Willst du einen Baustellenwitz hören?<br />Jaaa ?<br />Ok, ich arbeite daran."
	},{
		category:"Flachwitz",
		by:"Dennis Gunia",
		content:"Was heißt zu spät kommen auf Japanisch ?<br />Doi Che Ban"
	},{
		category:"Flachwitz",
		by:"Florian Schmidt",
		content:"Warum ist die Banane krumm?  <br />Sie musste immer einen Bogen um die DDR machen."
	},{
		category:"Flachwitz",
		by:"Dennis Gunia",
		content:"Wie heißt ein deutscher Torwart mit Wahnvorstellungen ?<br />Para Neuer"
	},{
		category:"Flachwitz",
		by:"Florian Schmidt",
		content:"Was ist ein toter Spanner? <br />Weg vom fenster"
	},{
		category:"Flachwitz",
		by:"Dennis Gunia",
		content:"Wie heißt ein Asiate der nie zu spät kommt?  <br />Tai Ming"
	},{
		category:"Flachwitz",
		by:"Florian Schmidt",
		content:"Was ist klein und springt durch den Wald <br />Ein Jumpignon "
	},{
		category:"Schwarzer Humor",
		by:"Florian Schmidt",
		content:"Schwarzer Humor ist wie Essen. <br />Manche haben es und Manche nicht! "
	},{
		category:"Flachwitz",
		by:"Dennis Gunia",
		content:"Wie heißt ein Spanier ohne Auto? <br />Carlos! "
	},{
		category:"Informatiker",
		by:"Dennis Gunia",
		content:"Windows ist wie ein U-Boot,sobalt man ein Fenster öffnet,fangen die Probleme an..."
	},{
		category:"Informatiker",
		by:"Dennis Gunia",
		content:"Wie viele Windows-Anwender braucht man, um eine Glühbirne zu wechseln? – 100. Einer schraubt und 99 klicken die Fehlermeldungen weg."
	},{
		category:"Informatiker",
		by:"Dennis Gunia",
		content:"Wo ist der beste Ort um eine Leiche zu verstecken? Seite 2 auf Google"
	},{
		category:"Informatiker",
		by:"Dennis Gunia",
		content:"Ruft eine Person beim PC-Support an und sagt: <br />„Ich nutze Windows.“ <br />„…Und?“ <br />„Und ich habe ein Problem.“ <br />„Das sagten sie bereits.“"
	},{
		category:"Informatiker",
		by:"Dennis Gunia",
		content:"Linux wird nie das meistinstallierte Betriebssystem sein, wenn man bedenkt, wie oft man Windows neu installieren muss!"
	}
];