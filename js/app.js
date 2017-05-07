/*============== MODEL =============*/
var model = {
	currentCat: null,
	cats: [{
		clickCount: 0,
		name: 'Tabby',
		imgSrc: 'images/Tabby.jpg',
		imgAttribution: 'Tabby image'

	}, {
		clickCount: 0,
		name: 'Tiger',
		imgSrc: 'images/Tabby.jpg',
		imgAttribution: 'Tiger image'

	}]
};

/*========= Controller ============ */
var octopus = {
	init: function () {
		// sets the current cat to first cat
		model.currentCat = model.cats[0];

		//Initialize the List and Cat View
		catListView.init();
		catView.init();
	},

	getCurrentCat: function () {
		return model.currentCat;
	},

	getCats: function () {
		return model.cats;
	},

	setCurrentCat: function (cat) {
		model.currentCat = cat;
	},

	incrementCounter: function () {
		model.currentCat.clickCount++;
		catView.render();
	}
};

/* ======= View ======= */

var catView = {

	init: function () {
		// store pointers to our DOM elements for easy access later
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('cat-name');
		this.catImageElem = document.getElementById('cat-img');
		this.countElem = document.getElementById('cat-count');

		// on click, increment the current cat's counter
		this.catImageElem.addEventListener('click', function () {
			octopus.incrementCounter();
		});

		// render this view (update the DOM elements with the right values)
		this.render();
	},

	render: function () {
		// update the DOM elements with values from the current cat
		var currentCat = octopus.getCurrentCat();
		this.countElem.textContent = currentCat.clickCount;
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.imgSrc;
	}
};

var catListView = {

	init: function () {
		// store the DOM element for easy access later
		this.catListElem = document.getElementById('cat-list');

		// render this view (update the DOM elements with the right values)
		this.render();
	},

	render: function () {
		var cat, elem, i;
		// get the cats we'll be rendering from the octopus
		var cats = octopus.getCats();

		// empty the cat list
		this.catListElem.innerHTML = '';

		// loop over the cats
		for (i = 0; i < cats.length; i++) {
			// this is the cat we're currently looping over
			cat = cats[i];

			// make a new cat list item and set its text
			elem = document.createElement('li');
			elem.textContent = cat.name;


			/*=======================NOTE THIS(event listeners and closures)========================= */
			// on click, setCurrentCat and render the catView
			// (this uses our closure-in-a-loop trick to connect the value
			//  of the cat variable to the click event function)
			elem.addEventListener('click', (function (catCopy) {
				return function () {
					octopus.setCurrentCat(catCopy);
					catView.render();
				};
			})(cat));

			// finally, add the element to the list
			this.catListElem.appendChild(elem);
		}
	}
};

// make it go!
octopus.init();