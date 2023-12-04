/*
core.js
23/12/04
Grey Keenan

The script that every page needs. Handles:
	- mobile burger button
*/

function burger() {
	var d_mobile_nav = document.getElementById("mobile_nav");
	//var d_mobile_burger = document.getElementById("mobile_burger");
	if (d_mobile_nav.style.display == "block") {
		d_mobile_nav.style.display = "none";
	} else {
		d_mobile_nav.style.display = "block";
	}

}