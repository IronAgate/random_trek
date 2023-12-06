/*
script.js
*/

var xrs = new Xorshift();

var bottle = 0;
var seriesIndexes = [
	0,
	0,
	0,
	0,
	0,
];

var data; //global var to hold episode lists
var seriesNames = [ //if changing, need to update seriesIndexes & checks
	"The_Original_Series",
	"The_Next_Generation",
	"Deep_Space_9",
	"Voyager",
	"Enterprise",
]; //list of series, corresponds to txt files in 'data/'

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

function ketchup(count) {
	for (let i = 0; i < count; i++)
		xrs.random();
}

function bake(name, value) {
	document.cookie = name + '=' + String(value) + "; expires=Tue, 19 Jan 2038 04:14:07 GMT";
}





