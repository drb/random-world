var names = (function(){

	var names 		= require('./data/names'),
		_ 			= require('underscore');
	
	function getFullName (options) {

		return [
			getFirstName(options), 
			getLastName(options)
		].join(' ');
	}

	function getFirstName (options) {

		var foreNames = _.union(names.female, names.male);
		return foreNames[_.random(foreNames.length)];
	}

	function getLastName (options) {

		var surnames = names.surnames;
		return surnames[_.random(surnames.length)];
	}

	function getTitle (options) {

		var titles = names.titles;
		return titles[_.random(titles.length)];
	}

	return {
		firstName: 	getFirstName,
		lastName: 	getLastName,
		fullName: 	getFullName,
		title: 		getTitle
	};

})();

module.exports = names;