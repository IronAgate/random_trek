/*
script.js
23/12/04
Grey Keenan
*/

var OUT = document.getElementById("output");


function buildSeriesList() {
	
	var series = document.getElementById("seriesSelectionList");
	
	var shows = [
		"The_Original_Series",
		"The_Next_Generation",
		"Deep_Space_9",
		"Voyager",
		"Enterprise",
	];
	
	for(let i=0; i < shows.length; i++) {
		
		var li = document.createElement("li");
		series.appendChild(li);
		
		var cb = document.createElement("input");
		cb.type = "checkbox";
		cb.id = "cb" + shows[i].replace(/_/g, '');
		cb.checked = true;
		li.appendChild(cb);
		
		var lbl = document.createElement("label");
		lbl.setAttribute("for", "cb" + shows[i].replace(/_/g, ''));
		lbl.innerHTML = ' ' + shows[i].replace(/_/g, ' ');
		li.appendChild(lbl);
	}
	
}


// Functions called by HTML

function generate() {
	OUT.textContent = String(Math.floor(Math.random() * 10))
}


function showResponse() {
	//called to initiate the randomizer
	
	document.getElementById("generate").style.display = "none";
	document.getElementById("response").style.display = "block";
	
	generate()
}

function toggleAllSeries() {
	var cbs = document.getElementById("seriesSelectionList").children;
	for (let i = 1; i < cbs.length; i++) {
		if (!cbs[i].firstChild.checked) {
			for (let n = i; n < cbs.length; n++) {
				cbs[n].firstChild.checked = true;
			}
			return
		}
	}
	for (let i = 1; i < cbs.length; i++) {
		cbs[i].firstChild.checked = false;
	}
}

function skip() {
	
	generate()
}
/*
function remove() {
	
	generate()
}

function hold() {
	
	generate()
}
*/

function showSettings() {
	
	var series = document.getElementById("seriesSelectionList");
	
	if (series.style.display == "block") {
		series.style.display = "none";
	} else {
		series.style.display = "block";
	}
	
}


// Main function

function main() {
	buildSeriesList()
}

main()