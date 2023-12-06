/*
userSettings.js
*/


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
	
	
}

main()