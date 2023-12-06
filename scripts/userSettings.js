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
			
			var eul = document.getElementById("viewedEpisodes");
			
			//clear existing episode list items
			eul.innerHTML = '';
			
			//configure new episode list items
			for (let n = 0; n < seriesIndexes[i]; n++) {
				var li2 = document.createElement("li");
				eul.appendChild(li2);
				
				var p = document.createElement("p");
				p.textContent = data[i][n];
				li2.appendChild(p);
			}
			
			
		}
		li.appendChild(btn);
		
	}
}


function cookiemonster() {
	
	var cks = document.cookie.split(';');
	
	for (let i = 0; i < cks.length; i++) {
		cke = cks[i].trim().split('=')[0];
		document.cookie = cke + "=; expires=Fri, 01 Nov 2002 00:00:00 GMT";
	}
	
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
		document.getElementById("log").textContent = "Existing user data has been found!";
	} else {
		bake("plantbaby", xrs.seedDate());
	}
	
	//shuffle data according to seed
	for (let i = 0; i < data.length; i++)
		xrs.shuffle(data[i]);
	
	//run randomizer until caught up with user
	ketchup(bottle);
	
	
	buildSeriesButtons();
	
}

main()