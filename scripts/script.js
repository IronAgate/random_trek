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
	
	var totalEps = 0;
	for (let i = 0; i < data.length; i++) {
		totalEps += data[i].length;
	}
	
	x = Math.floor(Math.random() * totalEps);
	
	for (let i = 0; i < data.length; i++) {
		if (data[i].length < x) {
			x -= data[i].length;
		} else {
			OUT.textContent = seriesNames[i] + ": " + data[i][x];
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
		}
	}
	
	return to;
}

function main() {
	
	data = parseData(retrieveData(seriesNames));
	
	//todo: detect pre-existing user & load their cookies, if so
		//display to user that user files have been located
		//give options to edit user episode data
		
	//todo: options to select only certain series
}
main()