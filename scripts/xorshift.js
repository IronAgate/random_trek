/*
xorshift.js
Be gentle; this is my first time trying to implement my own prng

honestly idrk how to choose a prng, but this is what im doing for now

starting with basic xorshift32
	consider trying to implement xoroshiro128 later
	but i think this will be plenty for what I need
*/
class Xorshift {
	constructor() {
		this.state = 0;
		this.runs = 0;
	}
	seed(newseed) {
		if (newseed >>> 0 === 0) 
			return false;
		else
			this.state = newseed >>> 0;
			return true;
	}
	seedDate() {
		var newseed = 0;
		for ( 
				newseed = Date.now() >>> Math.floor(Math.random());
				this.seed(newseed) == false;
				newseed = Date.now() >>> Math.floor(Math.random())
			)
		return newseed;
	}
	random() {
		
		//values here from wikipedia
		//period: 2^32 - 1
		this.state ^= this.state << 13;
		this.state ^= this.state >>> 17;
		this.state ^= this.state << 5;
		
		this.state = this.state >>> 0; //force unsigned
		this.runs += 1;
		
		return this.state / 4294967296;
	}
	range(a, b=0) {
		return Math.floor((this.random() * a) + b)
	}
	shuffle(l) {
		for (let i = 0; i < l.length; i++) {
			var destination = this.range(l.length);
			var second_item = l[destination];
			l[destination] = l[i];
			l[i] = second_item;
		}
	}
	
}

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