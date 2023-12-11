/*
index.js
*/

var currentSeries = null;
var checks = "11111";

function buildToggles() {
	/* called by main()
	creates checkboxes in list for series selection
	based off of which series loaded from 'data/'
	*/
	var ul = document.getElementById("seriesToggles");
	
	for (let i = 0; i < seriesNames.length; i++) {
		var li = document.createElement("li");
		ul.appendChild(li);
		
		var cb = document.createElement("input");
		cb.type = "checkbox";
		cb.id = "cb" + seriesNames[i].replace(/_/g, '');
		cb.checked = Number(checks[i]);
		li.appendChild(cb);
		
		var lbl = document.createElement("label");
		lbl.setAttribute("for", "cb" + seriesNames[i].replace(/_/g, ''));
		lbl.innerHTML = ' ' + seriesNames[i].replace(/_/g, ' ');
		li.appendChild(lbl);
	}
}

function run() {	
	
	var out = document.getElementById("output");
	var cbs = document.getElementById("seriesToggles").children;
	
	var totalEps = 0;
	for (let i = 0; i < data.length; i++) {
		if (Number(checks[i])) {
			totalEps += data[i].length - seriesIndexes[i];
		}
	}
	
	if (totalEps == 0) {
		out.textContent = "Nothing!";
		currentSeries = null;
		return;
	}
	
	x = xrs.range(totalEps);
	bottle += 1; //moved here to try to fix setting issue
	bake("bottle", bottle);
	
	for (let i = 0; i < data.length; i++) {
		if (Number(checks[i])) {
			if (data[i].length - seriesIndexes[i] < x) {
				x -= data[i].length - seriesIndexes[i];
			} else {
				out.textContent = seriesNames[i].replace(/_/g, ' ') + ": " + data[i][seriesIndexes[i]];
				currentSeries = i;
				break;
			}
		}
	}
	
}

function generate() {
	/* called by generate button element
	*/
	
	document.getElementById("randomizer_face").style.display = "none";
	document.getElementById("randomizer_actives").style.display = "block";
	document.getElementById("settings").style.display = "none";
	
	var cbs = document.getElementById("seriesToggles").children;
	var newchecks = '';
	for (let i = 0; i < data.length; i++) {
		newchecks += Number(cbs[i].firstChild.checked)
	}
	checks = newchecks;
	bake("checks", checks);
	
	run();
}

function next() {
	/* called by 'next' button element */
	
	if (currentSeries != null) {
		seriesIndexes[currentSeries] += 1;
		bake(seriesNames[currentSeries], seriesIndexes[currentSeries]);
	
		
	}
	
	run();
}

function revealSettings() {
	
	//todo: change so doesnt block existing generator. Instead
	//... just applies next time generator is run
	
	var settings = document.getElementById("settings")
	
	if (settings.style.display === "none") {
		document.getElementById("randomizer_face").style.display = "block";
		document.getElementById("randomizer_actives").style.display = "none";
	
		settings.style.display = "block";
	} else {
		settings.style.display = "none";
	}
	
}

function toggleAllSeriesToggles() {
	/* Called by 'all' button
	if any checkboxes are empty, fills all of them
	if all are full, empties all
	*/
	
	var cbs = document.getElementById("seriesToggles").children;
	for (let i = 0; i < cbs.length; i++) {
		if (!cbs[i].firstChild.checked) {
			for (let n = i; n < cbs.length; n++) {
				cbs[n].firstChild.checked = true;
			}
			return
		}
	}
	for (let i = 0; i < cbs.length; i++) {
		cbs[i].firstChild.checked = false;
	}
}




function main() {
	
	retrieveData(); //sets data to 'data' global
	
	//get cookies
	var cks = document.cookie.split(';');
	
	var plantbaby = null;
	//bottle is a global
	//checks is a global
	
	for (let i = 0; i < cks.length; i++) {
		cke = cks[i].trim().split('=');
		if (cke[0] === "plantbaby")
			plantbaby = Number(cke[1]);
		else if (cke[0] === "bottle")
			bottle = Number(cke[1]);
		else if (cke[0] === "checks")
			checks = cke[1];
		else
			for (let n = 0; n < seriesNames.length; n++)
				if (cke[0] === seriesNames[n])
					seriesIndexes[n] = Number(cke[1]);
	}
	
	//set seed | based on user seed if necessary
	if (plantbaby != null) {
		xrs.seed(plantbaby);
		document.getElementById("log").textContent = "> Existing user data has been found!";
	} else {
		bake("plantbaby", xrs.seedDate());
	}
	
	//shuffle data according to seed
	for (let i = 0; i < data.length; i++)
		xrs.shuffle(data[i]);
	
	//run randomizer until caught up with user
	ketchup(bottle);
	
	
	
	buildToggles();
	
	
	
}

main()