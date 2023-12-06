/*
userSettings.js
*/

function buildSeriesButtons() {
	
	var ul = document.getElementById("seriesButtons");
	
	for (let i = 0; i < seriesNames.length; i++) {
		var li = document.createElement("li");
		ul.appendChild(li);
		
		var btn = document.createElement("button");
		btn.textContent = seriesNames[i].replace(/_/g, ' ');
		btn.onclick = function () {
			
			var vul = document.getElementById("viewedEpisodes");
			
			//clear existing episode list items
			vul.innerHTML = '';
			
			//configure new episode list items
			for (let n = 0; n < seriesIndexes[i]; n++) {
				var li2 = document.createElement("li");
				vul.appendChild(li2);
				
				var p = document.createElement("p");
				p.textContent = data[i][n];
				li2.appendChild(p);
			}
			
			//todo: feedback if nothing found
				//section describing what this is
			
			var uvul = document.getElementById("unviewedEpisodes");
			
			uvul.innerHTML = '';
			document.getElementById("reveal_unviewed").style.display = "block";
			uvul.style.display = "none";
			
			for (let n = seriesIndexes[i]; n < data[i].length; n++) {
				var li2 = document.createElement("li");
				uvul.appendChild(li2);
				
				var p = document.createElement("p");
				p.textContent = data[i][n];
				li2.appendChild(p);
			}
			
		}
		li.appendChild(btn);
		
	}
}

function revealUnviewed(sender) {
	sender.style.display = "none";
	document.getElementById("unviewedEpisodes").style.display = "block";
}

function reveal(id) {
	var div = document.getElementById(id);
	
	if (div.style.display === "block")
		div.style.display = "none";
	else
		div.style.display = "block";
}

function cookiemonster() {
	// deletes all cookies, then reloads page
	
	//confirm
	if (!confirm("Are you sure? This will delete your viewed episodes and reshuffle the randomizer"))
		return;

	var cks = document.cookie.split(';');
	
	for (let i = 0; i < cks.length; i++) {
		cke = cks[i].trim().split('=')[0];
		document.cookie = cke + "=; expires=Fri, 01 Nov 2002 00:00:00 GMT";
	}
	
	location.reload() //should this be here or outside after cookiemonster() called?
	//consider directing to index.html
}


function main() {
	
	retrieveData();
	
	
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
		//else if (cke[0] === "checks")
		//	checks = cke[1];
		else
			for (let n = 0; n < seriesNames.length; n++)
				if (cke[0] === seriesNames[n])
					seriesIndexes[n] = Number(cke[1]);
	}
	
	//set seed | based on user seed if necessary
	if (plantbaby != null) {
		xrs.seed(plantbaby);
		document.getElementById("log").textContent = "> Existing user data has been found!";
		document.getElementById("main").style.display = "block";
	} else {
		//if no user data found, dont display user options
	}
	
	//shuffle data according to seed
	for (let i = 0; i < data.length; i++)
		xrs.shuffle(data[i]);
	
	//run randomizer until caught up with user
	ketchup(bottle);
	
	
	buildSeriesButtons();
		//todo: option to view unseen eps as well
		//todo: option to change seriesIndex
		//todo: option to reset all user data
	
}

main()