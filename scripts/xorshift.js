/*
xorshift.js
Be gentle; this is my first time trying to implement my own prng

honestly idrk how to choose a prng, but this is what im doing for now

starting with basic xorshift32
	consider trying to implement xoroshiro128 later
	but i think this will be plenty for what I need
*/

var state = 0;

function seed(newseed) {
	if (newseed >>> 0 === 0) 
		return false;
	else
		state = newseed >>> 0;
		return true;
}

function seedDate() {
	var newseed = 0;
	for ( 
			newseed = Date.now() >>> Math.floor(Math.random());
			seed(newseed) == false;
			newseed = Date.now() >>> Math.floor(Math.random())
		)
	return newseed;
}

function random() {
	
	//values here from wikipedia
	//period: 2^32 - 1
	state ^= state << 13;
	state ^= state >>> 17;
	state ^= state << 5;
	
	state = state >>> 0; //force unsigned
	
	return state / 4294967296;
}



function press() {
	/* called by html button
	for testing purposes */
	
	
	var container = [];
	
	var x = 10;
	
	for (container.push(0); container.length < x; container.push(0));
	
	for (i = 0; i < 5000; i++) {
		var y = Math.floor(random() * x);
		container[y] += 1;
	}
	
	console.log(container);
	
}

console.log(seedDate());



/* notes

Javascript Bitwise Operators
	https://www.w3schools.com/js/js_bitwise.asp
	
	from what I understand, javascripts bitwise operators perform as though are 32bit integers

github xorshift128
	https://github.com/fanatid/xorshift.js/blob/master/lib/xorshift128plus.js
	
wikipedia xorshift
	https://en.wikipedia.org/wiki/Xorshift

unsigned integers in javascript
	https://stackoverflow.com/questions/1908492/unsigned-integer-in-javascript
	
	use '>>>' to force unsigned, essentially

javascript-specific		 <---
	https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript

*/