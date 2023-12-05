/*
script.js
*/

var xrs = new Xorshift();
var ketchupbottle = 0;

var seriesIndexes = [
	0,
	0,
	0,
	0,
	0,
];
var currentSeries = null;

var data; //global var to hold episode lists
var seriesNames = [
	"The_Original_Series",
	"The_Next_Generation",
	"Deep_Space_9",
	"Voyager",
	"Enterprise",
]; //list of series, corresponds to txt files in 'data/'

var out = document.getElementById("output"); //the paragraph element to print text to

function generate() {
	/* called by generate button element
	outputs a randomly selected episode to the OUT variable
	considers series checkboxes
	*/
	
	
	if (currentSeries != null) {
		seriesIndexes[currentSeries] += 1;
		bake(seriesNames[currentSeries], seriesIndexes[currentSeries]);
		
		ketchupbottle += 1;
		bake("ketchupbottle", ketchupbottle);
	}
	
	
	var cbs = document.getElementById("seriesToggles").children;
	
	var totalEps = 0;
	for (let i = 0; i < data.length; i++) {
		if (cbs[i].firstChild.checked) {
			totalEps += data[i].length - seriesIndexes[i];
		}
	}
	
	if (totalEps == 0) {
		out.textContent = "Nothing!";
	}
	
	x = xrs.range(totalEps);
	
	for (let i = 0; i < data.length; i++) {
		if (cbs[i].firstChild.checked) {
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

function retrieveData(seriesNames) {
	/*called by main() in parseData()
	retrieves text data from 'data/'
	returns array of data
	based off of seriesName global list
	*/
	
	var to = []
	
	for (let i = 0; i < seriesNames.length; i++) {
		var xmlreq = new XMLHttpRequest();
		xmlreq.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				to[i] = this.response;
			} else if (this.readyState == 4) {
				console.log("| Unable to load data from: " + seriesNames[i] + " |");
				seriesNames.splice(i, 1);
				seriesIndexes.splice(i, 1);
				i--;
			}
		}
		xmlreq.open("get", "https://ironagate.github.io/random_trek/data/" + seriesNames[i] + ".txt", false);
		xmlreq.send();
		//is a synchronous request
	}
	return to;
}
function parseData(textDatas) {
	/* called by main()
	go over text-formatting of data & convert to array of eps
	*/
	
	var to = [];
	
	for (let series = 0; series < textDatas.length; series++) {
		to[series] = [];
		splitData = textDatas[series].split('\n');
		for (let episode = 0; episode < splitData.length; episode++) {
			to[series][episode] = splitData[episode].split(': ')[1];
			//ERR: if title has ':', will break
				//can limit split to 1 time with custom function
				//or reformat data files with tab or smth instead
				//not urgent since none of the eps have ':'
		}
	}
	return to;
}

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
		cb.checked = true;
		li.appendChild(cb);
		
		var lbl = document.createElement("label");
		lbl.setAttribute("for", "cb" + seriesNames[i].replace(/_/g, ''));
		lbl.innerHTML = ' ' + seriesNames[i].replace(/_/g, ' ');
		li.appendChild(lbl);
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

function ketchup(count) {
	for (let i = 0; i < count; i++)
		xrs.random();
}

function bake(name, value) {
	document.cookie = name + '=' + String(value) + ';';
}


function main() {
	
	data = parseData(retrieveData(seriesNames));
	
	//get cookies
	//bake("plantbaby", 1);
	//bake("ketchupbottle", 5);
	//var fakecookie = "plantbaby=1;ketchupbottle=5;Enterprise=10";
	//var fakecookie = "";
	
	//var cks = fakecookie.split(';');
	var cks = String(document.cookies).split(';');
	
	var plantbaby = null;
	//ketchupbottle is a global
	
	for (let i = 0; i < cks.length; i++) {
		cke = cks[i].split('=');
		if (cke[0] === "plantbaby")
			plantbaby = Number(cke[1]);
		else if (cke[0] === "ketchupbottle")
			ketchupbottle = Number(cke[1]);
		else
			for (let n = 0; n < seriesNames.length; n++)
				if (cke[0] === seriesNames[n])
					seriesIndexes[n] = Number(cke[1]);
	}
	
	//set seed | based on user seed if necessary
	if (plantbaby != null)
		xrs.seed(plantbaby);
	else
		bake("plantbaby", xrs.seedDate());
	
	//shuffle data
	for (let i = 0; i < data.length; i++)
		xrs.shuffle(data[i]);
	
	//run randomizer until caught up with user
	ketchup(ketchupbottle);
	
	
	buildToggles();
	
}

main()