/*
script.js
23/12/04
Grey Keenan
*/

var data; //global var to hold episode lists

var seriesNames = [
		"The_Original_Series",
		"The_Next_Generation",
		"Deep_Space_9",
		"Voyager",
		"Enterprise",
	];

var OUT = document.getElementById("output");

function generate() {
	
	//todo: filter out user's already-watched episodes
	
	var cbs = document.getElementById("seriesToggles").children;
	
	var totalEps = 0;
	for (let i = 0; i < data.length; i++) {
		if (cbs[i].firstChild.checked) {
			totalEps += data[i].length;
		}
	}
	
	if (totalEps == 0) {
		OUT.textContent = "Nothing!";
	}
	
	x = Math.floor(Math.random() * totalEps);
	
	for (let i = 0; i < data.length; i++) {
		if (cbs[i].firstChild.checked) {
			if (data[i].length < x) {
				x -= data[i].length;
			} else {
				OUT.textContent = seriesNames[i].replace(/_/g, ' ') + ": " + data[i][x];
				break;
			}
		}
	}
	
}

function retrieveData(seriesNames) {
	
	//https://stackoverflow.com/questions/27761044/list-server-directory-using-javascript-xhr
		//trying to request directory instead of file
	//https://javascript.info/xmlhttprequest#the-basics
	//https://stackoverflow.com/questions/48261908/how-to-read-files-in-directory-in-javascript
		//guess you cant without hacky workarounds?
	
	var to = []
	
	for (let i = 0; i < seriesNames.length; i++) {
		var xmlreq = new XMLHttpRequest();
		xmlreq.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				to[i] = this.response;
			} else if (this.readyState == 4) {
				console.log("| Unable to load data from: " + seriesNames[i] + " |");
				seriesNames.splice(i, 1);
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

function main() {
	
	data = parseData(retrieveData(seriesNames));
	
	buildToggles();
	
	//todo: detect pre-existing user & load their cookies, if so
		//display to user that user files have been located
		//give options to edit user episode data
		
}
main()