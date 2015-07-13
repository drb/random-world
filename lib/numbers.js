var numbers = (function(){
	
	function getInt (options) {

		return Math.ceil(Math.random());
	}

	return {
		integer: getInt
	};

})();

module.exports = numbers;